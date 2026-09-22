"""Сверяет новый сервер с текущим боевым сайтом до переключения DNS.

Берёт все адреса из out/sitemap.xml, запрашивает их на обоих хостах и
сравнивает: код ответа, canonical, title, h1, наличие noindex и размер
страницы. Плюс проверяет, что все редиректы из vercel.json на новом хосте
отвечают 301 в тот же адрес.

    python scripts/deploy/parity-check.py https://staging.cleanroom.uz
    python scripts/deploy/parity-check.py https://staging.cleanroom.uz --limit 50

Новый хост обычно закрыт basic-auth или отдаёт noindex — для сверки это
нормально, скрипт про noindex сообщает отдельно и не считает расхождением.
"""
import io
import json
import os
import re
import ssl
import time
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
LIVE = 'https://cleanroom.uz'
UA = 'CRS-parity-check/1.0'
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE  # у staging часто самоподписанный сертификат


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


def fetch(url, tries=3):
    """Запрос без следования редиректам. Три попытки с паузой: канал бывает
    нестабилен, без повторов сверка даёт ложные расхождения. Если ответа нет и
    после повторов, адрес уходит в net_errors, а не в расхождения."""
    opener = urllib.request.build_opener(NoRedirect, urllib.request.HTTPSHandler(context=CTX))
    last = ''
    for attempt in range(tries):
        req = urllib.request.Request(url, headers={'User-Agent': UA})
        try:
            r = opener.open(req, timeout=20)
            return r.status, {k.lower(): v for k, v in r.headers.items()}, r.read().decode('utf-8', 'ignore')
        except urllib.error.HTTPError as e:
            return e.code, {k.lower(): v for k, v in e.headers.items()}, e.read().decode('utf-8', 'ignore')
        except Exception as e:  # сеть, TLS, таймаут
            last = str(e)
            time.sleep(1 + attempt * 2)
    return 0, {}, last


def grab(html):
    def one(pattern):
        m = re.search(pattern, html, re.I | re.S)
        return re.sub(r'\s+', ' ', m.group(1)).strip() if m else None
    return {
        'title': one(r'<title[^>]*>(.*?)</title>'),
        'canonical': one(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"'),
        'h1': one(r'<h1[^>]*>(.*?)</h1>'),
        'noindex': bool(re.search(r'<meta[^>]+name="robots"[^>]+noindex', html, re.I)),
        'size': len(html),
    }


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    new_base = sys.argv[1].rstrip('/')
    limit = None
    if '--limit' in sys.argv:
        limit = int(sys.argv[sys.argv.index('--limit') + 1])

    sm = ET.parse(os.path.join(ROOT, 'out', 'sitemap.xml')).getroot()
    ns = '{http://www.sitemaps.org/schemas/sitemap/0.9}loc'
    paths = [re.sub(r'^https?://[^/]+', '', e.text) or '/' for e in sm.iter(ns)]
    if limit:
        paths = paths[:limit]

    diffs, net_errors, noindex_pages = [], [], 0
    for i, p in enumerate(paths, 1):
        st_new, _, html_new = fetch(new_base + p)
        st_live, _, html_live = fetch(LIVE + p)
        if st_new == 0 or st_live == 0:
            # Ни один из хостов не ответил — это проблема канала, а не сайта.
            net_errors.append('%s: нет ответа (новый %s, боевой %s)' % (p, st_new, st_live))
            continue
        if st_new != 200 or st_live != 200:
            diffs.append('%s: код %s (новый) против %s (боевой)' % (p, st_new, st_live))
            continue
        a, b = grab(html_new), grab(html_live)
        if a['noindex'] and not b['noindex']:
            noindex_pages += 1
        for field in ('title', 'h1'):
            if a[field] != b[field]:
                diffs.append('%s: %s "%s" против "%s"' % (p, field, a[field], b[field]))
        # canonical на staging указывает на боевой домен — это правильно,
        # сравниваем только путь.
        ca = re.sub(r'^https?://[^/]+', '', a['canonical'] or '')
        cb = re.sub(r'^https?://[^/]+', '', b['canonical'] or '')
        if ca != cb:
            diffs.append('%s: canonical %s против %s' % (p, ca, cb))
        if b['size'] and abs(a['size'] - b['size']) / b['size'] > 0.10:
            diffs.append('%s: размер страницы отличается на %d%%'
                         % (p, round(abs(a['size'] - b['size']) * 100.0 / b['size'])))
        if i % 50 == 0:
            print('проверено %d из %d' % (i, len(paths)))

    vj = json.load(io.open(os.path.join(ROOT, 'vercel.json'), encoding='utf-8'))
    for r in vj.get('redirects', []):
        st, h, _ = fetch(new_base + r['source'])
        if st == 0:
            net_errors.append('редирект %s: нет ответа' % r['source'])
        elif st not in (301, 308) or not h.get('location', '').endswith(r['destination']):
            diffs.append('редирект %s: %s %s' % (r['source'], st, h.get('location')))

    print('\nстраниц сверено: %d' % len(paths))
    print('страниц с noindex на новом хосте: %d (для staging это норма)' % noindex_pages)
    print('расхождений: %d' % len(diffs))
    for d in diffs[:40]:
        print('  ', d)
    if net_errors:
        print('нет ответа (проблема канала, не сайта): %d' % len(net_errors))
        for e in net_errors[:10]:
            print('  ', e)
        print('повторите эти адреса перед переключением DNS')
    return 1 if diffs else 0


if __name__ == '__main__':
    sys.exit(main())
