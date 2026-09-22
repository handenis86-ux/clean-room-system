"""Поднимает deploy/nginx/cleanroom.uz.conf в Docker на реальной статике out/
и проверяет маршрутизацию до переезда: все адреса карты сайта, редиректы,
слеши, 404 и заголовки.

Запуск: python scripts/deploy/test-nginx.py
Требуется: Docker и собранный экспорт (npx next build -> out/).
"""
import io
import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CONF_PATH = os.path.join(ROOT, 'deploy', 'nginx', 'cleanroom.uz.conf')
CONF = io.open(CONF_PATH, encoding='utf-8').read()
PORT = 8099
NAME = 'crs-nginx-test'


def posix(p):
    return p.replace(os.sep, '/')


# Тестовый вариант того же конфига: без TLS и без канонического хоста.
# Правила маршрутизации остаются ровно теми же, что уедут на сервер.
test = CONF
test = re.sub(r'server \{\n    listen 80;.*?\n\}\n\n', '', test, flags=re.S)
test = re.sub(
    r'server \{\n    listen 443 ssl http2;\n    listen \[::\]:443 ssl http2;\n'
    r'    server_name www\.cleanroom\.uz;.*?\n\}\n\n',
    '', test, flags=re.S)
test = test.replace('listen 443 ssl http2;', 'listen 80;')
test = test.replace('listen [::]:443 ssl http2;', '')
test = re.sub(r'\n *ssl_certificate[^\n]*\n', '\n', test)
test = test.replace('root /var/www/cleanroom.uz/current;', 'root /site;')
test = test.replace('return 301 https://$host/$1;', 'return 301 http://$host:%d/$1;' % PORT)
test = re.sub(r'\n *(access_log|error_log)[^\n]*\n', '\n', test)
TMP = os.path.join(ROOT, 'scripts', 'deploy', '.test.conf')
io.open(TMP, 'w', encoding='utf-8', newline='\n').write(test)

env = dict(os.environ, MSYS_NO_PATHCONV='1')
subprocess.run(['docker', 'rm', '-f', NAME], capture_output=True, env=env)
run = subprocess.run([
    'docker', 'run', '-d', '--name', NAME, '-p', '%d:80' % PORT,
    '-v', '%s:/site:ro' % posix(os.path.join(ROOT, 'out')),
    '-v', '%s:/etc/nginx/conf.d/default.conf:ro' % posix(TMP),
    '-v', '%s:/etc/nginx/snippets/cleanroom-headers.conf:ro' % posix(
        os.path.join(ROOT, 'deploy', 'nginx', 'cleanroom-headers.conf')),
    'nginx:alpine'], capture_output=True, text=True, env=env)
if run.returncode:
    print('docker run упал:', run.stderr[:500])
    sys.exit(1)

fails = []
checks = 0


def check(name, cond, detail=''):
    global checks
    checks += 1
    if not cond:
        fails.append('%s %s' % (name, detail))


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


def req(path):
    url = 'http://127.0.0.1:%d%s' % (PORT, path)
    opener = urllib.request.build_opener(NoRedirect)
    try:
        r = opener.open(url, timeout=20)
        return r.status, {k.lower(): v for k, v in r.headers.items()}, r.read()
    except urllib.error.HTTPError as e:
        return e.code, {k.lower(): v for k, v in e.headers.items()}, e.read()


try:
    syntax = subprocess.run(['docker', 'exec', NAME, 'nginx', '-t'],
                            capture_output=True, text=True, env=env)
    out = (syntax.stderr or syntax.stdout).strip()
    print('nginx -t:', out.splitlines()[-1] if out else '(нет вывода)')
    if syntax.returncode:
        print(out)
        sys.exit(1)
    time.sleep(1.5)

    # 1. Все адреса карты сайта отдают 200.
    sm = ET.parse(os.path.join(ROOT, 'out', 'sitemap.xml')).getroot()
    ns = '{http://www.sitemaps.org/schemas/sitemap/0.9}loc'
    paths = [re.sub(r'^https?://[^/]+', '', e.text) or '/' for e in sm.iter(ns)]
    bad = []
    for p in paths:
        st, _, _ = req(p)
        if st != 200:
            bad.append('%s -> %d' % (p, st))
    check('карта сайта', not bad, '%d из %d не 200: %s' % (len(bad), len(paths), bad[:5]))
    print('адресов в карте сайта: %d, не 200: %d' % (len(paths), len(bad)))

    # 2. Редиректы из vercel.json.
    vj = json.load(io.open(os.path.join(ROOT, 'vercel.json'), encoding='utf-8'))
    for r in vj['redirects']:
        st, h, _ = req(r['source'])
        ok = st == 308 and h.get('location', '').endswith(r['destination'])
        check('редирект ' + r['source'], ok, '-> %s %s' % (st, h.get('location')))
    print('редиректов проверено: %d' % len(vj['redirects']))

    # 3. Слеш на конце -> 301 без слеша (как на Vercel).
    st, h, _ = req('/blog/bezvorsovye-salfetki-cleanroom-vybor/')
    check('слеш на конце', st == 308 and h.get('location', '').endswith(
        '/blog/bezvorsovye-salfetki-cleanroom-vybor'), '-> %s %s' % (st, h.get('location')))

    # 4. Несуществующий адрес -> 404 и наша страница 404.
    st, _, body = req('/blog/net-takoy-stranicy')
    check('404', st == 404 and b'<html' in body[:600].lower(), '-> %s' % st)

    # 5. Заголовки безопасности.
    st, h, _ = req('/')
    for k in ('x-frame-options', 'x-content-type-options', 'referrer-policy',
              'strict-transport-security', 'permissions-policy'):
        check('заголовок ' + k, k in h, 'отсутствует')

    # 6. Кеш неизменяемых ассетов.
    probe = None
    for d, _, files in os.walk(os.path.join(ROOT, 'out', '_next', 'static')):
        for f in files:
            if f.endswith('.js'):
                probe = posix(os.path.join(d, f)).replace(posix(os.path.join(ROOT, 'out')), '')
                break
        if probe:
            break
    if probe:
        st, h, _ = req(probe)
        check('кеш _next/static', st == 200 and 'immutable' in h.get('cache-control', ''),
              '%s %s' % (st, h.get('cache-control')))

    # 7. robots.txt и sitemap.xml.
    for p in ('/robots.txt', '/sitemap.xml'):
        st, _, _ = req(p)
        check(p, st == 200, '-> %s' % st)

    # 8. Документы для скачивания (лид-магниты).
    st, _, _ = req('/docs/annex1-2022-ru.pdf')
    check('/docs/annex1-2022-ru.pdf', st == 200, '-> %s' % st)

    print('\nпроверок: %d, провалов: %d' % (checks, len(fails)))
    for f in fails[:25]:
        print('  FAIL', f)
    sys.exit(1 if fails else 0)
finally:
    subprocess.run(['docker', 'rm', '-f', NAME], capture_output=True, env=env)
