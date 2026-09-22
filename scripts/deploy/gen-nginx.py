"""Генерирует конфиг nginx для cleanroom.uz из vercel.json.

Источник правды для редиректов и заголовков — vercel.json, чтобы конфиг
сервера не разъехался с тем, что работает сейчас. Запускать после любой
правки vercel.json:

    python scripts/deploy/gen-nginx.py
    python scripts/deploy/test-nginx.py   # проверка на реальной статике

Пишет два файла:
  deploy/nginx/cleanroom.uz.conf        -> /etc/nginx/sites-available/
  deploy/nginx/cleanroom-headers.conf   -> /etc/nginx/snippets/

Почему заголовки вынесены в сниппет: в nginx add_header на уровне location
отменяет все add_header, унаследованные с уровня server. Любой location,
который задаёт свой Cache-Control, обязан подключить сниппет заново, иначе
страница уедет без заголовков безопасности (проверено test-nginx.py).
"""
import io
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
cfg = json.load(io.open(os.path.join(ROOT, 'vercel.json'), encoding='utf-8'))

redirects = []
for r in cfg.get('redirects', []):
    src, dst = r['source'], r['destination']
    assert re.match(r'^/[A-Za-z0-9/_.-]*$', src), 'нестандартный source: ' + src
    redirects.append((src, dst, 308 if r.get('permanent', True) else 307))

headers = []
for group in cfg.get('headers', []):
    if group.get('source') == '/(.*)':
        for h in group['headers']:
            headers.append((h['key'], h['value']))

SNIPPET_PATH = '/etc/nginx/snippets/cleanroom-headers.conf'
snippet = '# Заголовки из vercel.json. СГЕНЕРИРОВАН scripts/deploy/gen-nginx.py.\n'
snippet += '\n'.join('add_header %s "%s" always;' % (k, v) for k, v in headers) + '\n'

redirect_block = '\n'.join(
    '    location = %s { return %d %s; }' % (s, c, d) for s, d, c in redirects)

CONF = r'''# cleanroom.uz — статический экспорт Next.js (output: "export").
# СГЕНЕРИРОВАН scripts/deploy/gen-nginx.py из vercel.json — руками не править:
# правьте vercel.json и перегенерируйте, иначе редиректы разъедутся с текущими.
#
# Раскладка экспорта: /blog/slug.html, /catalog/<категория>/<артикул>.html,
# 404.html. Наружу адреса отдаются без расширения и без слеша на конце —
# ровно так, как их сейчас отдаёт Vercel и как они проиндексированы.

server {
    listen 80;
    listen [::]:80;
    server_name cleanroom.uz www.cleanroom.uz;
    return 301 https://cleanroom.uz$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.cleanroom.uz;

    ssl_certificate     /etc/letsencrypt/live/cleanroom.uz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cleanroom.uz/privkey.pem;

    # Канонический хост — без www, как сейчас на Vercel.
    return 301 https://cleanroom.uz$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name cleanroom.uz;

    ssl_certificate     /etc/letsencrypt/live/cleanroom.uz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cleanroom.uz/privkey.pem;

    root /var/www/cleanroom.uz/current;
    index index.html;

    charset utf-8;
    server_tokens off;

    include __SNIPPET__;

    gzip on;
    gzip_comp_level 6;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_vary on;
    gzip_types text/plain text/css text/xml application/javascript application/json
               application/xml image/svg+xml application/manifest+json;

    # --- Постоянные редиректы (источник: vercel.json) ---
__REDIRECTS__

    # Слеш на конце убираем 308-м, как делает Vercel при trailingSlash: false.
    location ~ ^/(.+)/$ {
        include __SNIPPET__;
        return 308 https://$host/$1;
    }

    # Хеш-ассеты Next неизменяемы: имя файла меняется вместе с содержимым.
    location /_next/static/ {
        include __SNIPPET__;
        add_header Cache-Control "public, max-age=31536000, immutable" always;
        try_files $uri =404;
    }

    # Картинки, шрифты, документы.
    location ~* \.(?:jpg|jpeg|png|webp|avif|gif|ico|svg|woff|woff2|pdf|docx)$ {
        include __SNIPPET__;
        add_header Cache-Control "public, max-age=2592000" always;
        try_files $uri =404;
    }

    location = /sitemap.xml {
        include __SNIPPET__;
        add_header Cache-Control "public, max-age=3600" always;
        try_files $uri =404;
    }

    location = /robots.txt {
        include __SNIPPET__;
        add_header Cache-Control "public, max-age=3600" always;
        try_files $uri =404;
    }

    # Основное правило: /путь -> /путь.html -> /путь/index.html -> 404.
    location / {
        include __SNIPPET__;
        add_header Cache-Control "public, max-age=0, must-revalidate" always;
        try_files $uri $uri.html $uri/index.html =404;
    }

    error_page 404 /404.html;
    location = /404.html {
        include __SNIPPET__;
        internal;
    }

    access_log /var/log/nginx/cleanroom.uz.access.log;
    error_log  /var/log/nginx/cleanroom.uz.error.log;
}
'''

CONF = CONF.replace('__SNIPPET__', SNIPPET_PATH).replace('__REDIRECTS__', redirect_block)

conf_out = os.path.join(ROOT, 'deploy', 'nginx', 'cleanroom.uz.conf')
snip_out = os.path.join(ROOT, 'deploy', 'nginx', 'cleanroom-headers.conf')
io.open(conf_out, 'w', encoding='utf-8', newline='\n').write(CONF)
io.open(snip_out, 'w', encoding='utf-8', newline='\n').write(snippet)
print('записано: %s и %s (редиректов %d, заголовков %d)'
      % (os.path.basename(conf_out), os.path.basename(snip_out), len(redirects), len(headers)))
