"""Render a short vertical reel (1080x1920, 30 fps) featuring "Nika" —
an AI business-blogger character — with captions and a synthesized soundtrack.

Usage:  pip install pillow numpy imageio-ffmpeg
        python render_reel.py            # -> nika_reel.mp4
"""
import math
import subprocess
import wave
from pathlib import Path

import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageFont

OUT_DIR = Path(__file__).parent
W, H, FPS = 1080, 1920, 30
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

HANDLE = "@nika.biz.ai"
ACCENT = (255, 204, 64)       # yellow highlight
VIOLET = (140, 92, 255)
SKIN = (241, 199, 170)
SKIN_SHADOW = (222, 170, 140)
HAIR = (38, 26, 58)
HAIR_HI = (112, 72, 214)
BLAZER = (28, 38, 70)
BLAZER_DARK = (19, 26, 50)

# Script: (start, end, tag, headline lines, words to highlight, spoken line)
SCENES = [
    (0.0, 4.6, "ИИ-БИЗНЕС-БЛОГЕР", ["3 ошибки, которые", "тормозят твой бизнес"], {"3", "ошибки,"},
     "Привет, я Ника. Разберём три ошибки, которые тормозят твой бизнес."),
    (4.6, 10.2, "ОШИБКА 01", ["Работаешь В бизнесе,", "а не НАД ним"], {"В", "НАД"},
     "Первая: ты делаешь всё сам. Собственник строит систему, а не тушит пожары."),
    (10.2, 15.6, "ОШИБКА 02", ["Не считаешь", "юнит-экономику"], {"юнит-экономику"},
     "Вторая: ты не знаешь, сколько стоит клиент и сколько он приносит."),
    (15.6, 21.0, "ОШИБКА 03", ["Боишься", "поднять цены"], {"поднять", "цены"},
     "Третья: демпинг. Дешевле — не значит больше продаж."),
    (21.0, 26.5, "КАЖДЫЙ ДЕНЬ", ["1 разбор бизнеса", "за 60 секунд"], {"1", "60"},
     "Подписывайся: каждый день — один разбор бизнеса за минуту."),
]
DURATION = SCENES[-1][1]
N_FRAMES = int(DURATION * FPS)
VOWELS = set("аеёиоуыэюяАЕЁИОУЫЭЮЯ")


def font(path, size, _cache={}):
    key = (path, size)
    if key not in _cache:
        _cache[key] = ImageFont.truetype(path, size)
    return _cache[key]


def ease_out_back(x):
    x = min(max(x, 0.0), 1.0)
    c1, c3 = 1.70158, 2.70158
    return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2


def scene_at(t):
    for i, s in enumerate(SCENES):
        if s[0] <= t < s[1]:
            return i, s
    return len(SCENES) - 1, SCENES[-1]


# ---------------------------------------------------------------- background
def make_background():
    y = np.linspace(0, 1, H)[:, None]
    top, bottom = np.array([14, 16, 38]), np.array([46, 20, 84])
    grad = (top * (1 - y) + bottom * y)[:, None, :].repeat(W, axis=1)
    img = Image.fromarray(grad.reshape(H, W, 3).astype(np.uint8), "RGB").convert("RGBA")
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(grid)
    for x in range(0, W, 90):
        d.line([(x, 0), (x, H)], fill=(255, 255, 255, 12), width=1)
    for yy in range(0, H, 90):
        d.line([(0, yy), (W, yy)], fill=(255, 255, 255, 12), width=1)
    return Image.alpha_composite(img, grid)


rng = np.random.default_rng(7)
PARTICLES = [(rng.uniform(0, W), rng.uniform(0, H), rng.uniform(8, 30), rng.uniform(2, 5)) for _ in range(40)]


def draw_chart(d, t, scene_idx):
    # animated line chart behind the character; trends up in the final scene
    pts = []
    trend = 1.0 if scene_idx in (0, 4) else -0.25
    for i in range(13):
        x = -40 + i * 95
        base = 1250 - trend * i * 38
        y = base + 45 * math.sin(i * 1.3 + t * 1.6) + 25 * math.sin(i * 0.7 - t)
        pts.append((x, y))
    d.line(pts, fill=VIOLET + (90,), width=6, joint="curve")
    for x, y in pts[1:-1]:
        d.ellipse((x - 7, y - 7, x + 7, y + 7), fill=VIOLET + (130,))
    for px, py, sp, r in PARTICLES:
        yy = (py - sp * t * 3) % H
        d.ellipse((px - r, yy - r, px + r, yy + r), fill=(255, 255, 255, 40))


# ---------------------------------------------------------------- character
CW, CH = 1400, 1700  # drawn at 2x, then downscaled for anti-aliasing


def mouth_open(t):
    idx, (s, e, *_rest, speech) = scene_at(t)
    talk_s, talk_e = s + 0.25, e - 0.45
    if not talk_s <= t < talk_e:
        return 0.0
    pos = (t - talk_s) / (talk_e - talk_s) * len(speech)
    ch = speech[min(int(pos), len(speech) - 1)]
    if ch in " .,:—":
        return 0.05
    frac = pos - int(pos)
    amp = 1.0 if ch in VOWELS else 0.45
    return amp * (0.55 + 0.45 * math.sin(frac * math.pi))


def blink(t):
    phase = t % 3.7
    return 0.1 if 3.55 < phase < 3.68 else 1.0


def draw_character(t):
    img = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    bob = 8 * math.sin(t * 2.2)
    tilt_x = 6 * math.sin(t * 1.1)
    cx = 700

    # hair (back) — bob haircut
    hx, hy = cx + tilt_x, bob
    d.rounded_rectangle((hx - 290, 470 + hy, hx + 290, 1150 + hy), radius=220, fill=HAIR)

    # body / blazer
    d.ellipse((140, 1170, 1260, 2150), fill=BLAZER)
    d.polygon([(cx - 120, 1150), (cx + 120, 1150), (cx, 1440)], fill=(245, 245, 250))
    d.polygon([(cx - 150, 1160), (cx, 1450), (cx - 70, 1500), (cx - 330, 1215)], fill=BLAZER_DARK)
    d.polygon([(cx + 150, 1160), (cx, 1450), (cx + 70, 1500), (cx + 330, 1215)], fill=BLAZER_DARK)
    # neck + necklace
    d.rounded_rectangle((cx - 85, 980, cx + 85, 1230), radius=40, fill=SKIN_SHADOW)
    d.arc((cx - 110, 1080, cx + 110, 1300), 20, 160, fill=(232, 190, 90), width=6)
    d.ellipse((cx - 14, 1285, cx + 14, 1313), fill=(232, 190, 90))
    # badge on the lapel
    d.rounded_rectangle((cx + 170, 1330, cx + 290, 1390), radius=14, fill=VIOLET)
    d.text((cx + 230, 1360), "AI", font=font(FONT_BOLD, 40), fill="white", anchor="mm")

    # head
    x0 = cx + tilt_x
    y0 = bob
    d.ellipse((x0 - 225, 530 + y0, x0 + 225, 1070 + y0), fill=SKIN)
    # blush
    blush = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    bd = ImageDraw.Draw(blush)
    for sx in (-1, 1):
        bx = x0 + sx * 130
        bd.ellipse((bx - 55, 880 + y0, bx + 55, 930 + y0), fill=(240, 120, 140, 70))
    img.alpha_composite(blush)
    d = ImageDraw.Draw(img)

    # eyes
    b = blink(t)
    look = 6 * math.sin(t * 0.8)
    for sx in (-1, 1):
        ex, ey = x0 + sx * 95, 790 + y0
        eh = 34 * b
        d.ellipse((ex - 42, ey - eh, ex + 42, ey + eh), fill="white")
        if b > 0.5:
            d.ellipse((ex - 23 + look, ey - 23, ex + 23 + look, ey + 23), fill=(58, 110, 165))
            d.ellipse((ex - 11 + look, ey - 11, ex + 11 + look, ey + 11), fill=(15, 15, 25))
            d.ellipse((ex - 2 + look, ey - 14, ex + 8 + look, ey - 4), fill="white")
        d.arc((ex - 46, ey - eh - 6, ex + 46, ey + eh + 6), 190, 350, fill=(30, 20, 40), width=7)
        # eyebrows — raise slightly while emphasising
        raise_ = 10 * max(0.0, math.sin(t * 3.0)) if mouth_open(t) > 0.6 else 0
        d.arc((ex - 55, ey - 105 - raise_, ex + 55, ey - 35 - raise_), 200, 340, fill=HAIR, width=12)

    # nose
    d.arc((x0 - 22, 840 + y0, x0 + 22, 900 + y0), 20, 160, fill=SKIN_SHADOW, width=6)

    # mouth
    m = mouth_open(t)
    my = 965 + y0
    if m < 0.15:
        d.arc((x0 - 60, my - 40, x0 + 60, my + 20), 20, 160, fill=(200, 80, 105), width=10)
    else:
        mh = 12 + 46 * m
        d.ellipse((x0 - 52, my - mh / 2, x0 + 52, my + mh / 2), fill=(120, 30, 50),
                  outline=(214, 96, 120), width=8)
        d.rectangle((x0 - 30, my - mh / 2 + 6, x0 + 30, my - mh / 2 + 16), fill="white")

    # hair (front) — fringe with a violet highlight streak
    d.chord((x0 - 250, 480 + y0, x0 + 250, 820 + y0), 180, 360, fill=HAIR)
    d.polygon([(x0 - 250, 650 + y0), (x0 - 150, 580 + y0), (x0 + 60, 560 + y0), (x0 + 250, 650 + y0),
               (x0 + 245, 720 + y0), (x0 + 120, 640 + y0), (x0 - 60, 650 + y0), (x0 - 240, 680 + y0)], fill=HAIR)
    d.arc((x0 - 225, 500 + y0, x0 + 225, 860 + y0), 205, 245, fill=HAIR_HI, width=18)
    d.arc((x0 - 225, 500 + y0, x0 + 225, 860 + y0), 290, 310, fill=HAIR_HI, width=10)
    # side locks framing the face
    d.rounded_rectangle((x0 - 285, 650 + y0, x0 - 205, 1130 + y0), radius=40, fill=HAIR)
    d.rounded_rectangle((x0 + 205, 650 + y0, x0 + 285, 1130 + y0), radius=40, fill=HAIR)

    return img.resize((1100, 1336), Image.LANCZOS)


# ---------------------------------------------------------------- captions
def headline_card(scene):
    _, _, tag, lines, hl, _ = scene
    card = Image.new("RGBA", (980, 480), (0, 0, 0, 0))
    d = ImageDraw.Draw(card)
    d.rounded_rectangle((0, 0, 979, 479), radius=48, fill=(255, 255, 255, 22), outline=(255, 255, 255, 60), width=3)
    tf = font(FONT_BOLD, 38)
    tw = d.textlength(tag, font=tf)
    d.rounded_rectangle((50, 50, 50 + tw + 50, 110), radius=30, fill=VIOLET)
    d.text((75, 80), tag, font=tf, fill="white", anchor="lm")
    size = 80
    while max(d.textlength(l, font=font(FONT_BOLD, size)) for l in lines) > 880:
        size -= 2
    hf = font(FONT_BOLD, size)
    y = 195
    for line in lines:
        x = 50
        for word in line.split(" "):
            color = ACCENT if word in hl else (255, 255, 255)
            d.text((x, y), word, font=hf, fill=color, anchor="lm")
            x += d.textlength(word + " ", font=hf)
        y += 110
    d.text((50, 425), "Сохрани, чтобы не потерять", font=font(FONT_REG, 30), fill=(255, 255, 255, 140), anchor="lm")
    return card


CARDS = [headline_card(s) for s in SCENES]


def wrap(words, fnt, max_w, d):
    lines, cur = [], []
    for w in words:
        test = " ".join(cur + [w])
        if cur and d.textlength(test, font=fnt) > max_w:
            lines.append(cur)
            cur = [w]
        else:
            cur.append(w)
    if cur:
        lines.append(cur)
    return lines


def draw_subtitles(frame, t):
    idx, (s, e, *_rest, speech) = scene_at(t)
    talk_s, talk_e = s + 0.25, e - 0.45
    progress = (t - talk_s) / (talk_e - talk_s) * len(speech)
    d = ImageDraw.Draw(frame)
    f = font(FONT_BOLD, 46)
    words = speech.split(" ")
    lines = wrap(words, f, 940, d)
    box_h = 64 * len(lines) + 46
    top = H - box_h - 60
    d.rounded_rectangle((50, top, W - 50, top + box_h), radius=36, fill=(10, 10, 25, 190))
    spoken_chars, y = 0, top + 25 + 35
    for line in lines:
        text_w = d.textlength(" ".join(line), font=f)
        x = (W - text_w) / 2
        for w in line:
            said = spoken_chars <= progress
            d.text((x, y), w, font=f, fill=(255, 255, 255) if said else (255, 255, 255, 90), anchor="lm")
            x += d.textlength(w + " ", font=f)
            spoken_chars += len(w) + 1
        y += 64


def draw_topbar(frame, t):
    d = ImageDraw.Draw(frame)
    d.rounded_rectangle((50, 60, W - 50, 70), radius=5, fill=(255, 255, 255, 50))
    d.rounded_rectangle((50, 60, 50 + (W - 100) * t / DURATION, 70), radius=5, fill=ACCENT)
    d.ellipse((50, 100, 130, 180), fill=VIOLET)
    d.text((90, 140), "N", font=font(FONT_BOLD, 44), fill="white", anchor="mm")
    d.text((150, 125), "Ника · бизнес без воды", font=font(FONT_BOLD, 36), fill="white", anchor="lm")
    d.text((150, 165), HANDLE, font=font(FONT_REG, 30), fill=(255, 255, 255, 160), anchor="lm")


def draw_cta(frame, t):
    s = SCENES[-1][0]
    if t < s + 0.6:
        return
    k = ease_out_back((t - s - 0.6) / 0.5)
    press = 0.94 if 3.2 < (t - s) < 3.45 else 1.0
    bw, bh = int(560 * k * press), int(120 * k * press)
    if bw < 10:
        return
    btn = Image.new("RGBA", (bw, bh), (0, 0, 0, 0))
    bd = ImageDraw.Draw(btn)
    bd.rounded_rectangle((0, 0, bw - 1, bh - 1), radius=bh // 2, fill=(255, 64, 96))
    bd.text((bw / 2, bh / 2), "ПОДПИСАТЬСЯ", font=font(FONT_BOLD, max(8, int(50 * k * press))), fill="white", anchor="mm")
    frame.alpha_composite(btn, ((W - bw) // 2, 800 - bh // 2))


# ---------------------------------------------------------------- audio
def make_audio(path, sr=44100):
    n = int(DURATION * sr)
    t = np.arange(n) / sr
    out = np.zeros(n)
    bpm = 100
    beat = 60 / bpm
    # chord pad: Am - F - C - G, two bars each chord
    chords = [[220.0, 261.63, 329.63], [174.61, 220.0, 261.63], [196.0, 261.63, 329.63], [196.0, 246.94, 293.66]]
    bar = beat * 4
    for i in range(int(DURATION / bar) + 1):
        st = int(i * bar * sr)
        en = min(n, int((i + 1) * bar * sr))
        if st >= n:
            break
        tt = t[st:en] - t[st]
        env = np.minimum(1, tt / 0.4) * np.exp(-tt * 0.35)
        for f in chords[i % 4]:
            out[st:en] += 0.05 * env * (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(4 * np.pi * f * tt))
        # bass
        out[st:en] += 0.12 * env * np.sin(2 * np.pi * chords[i % 4][0] / 2 * tt)
    noise = np.random.default_rng(1).standard_normal(n)
    for k in range(int(DURATION / (beat / 2))):
        st = int(k * beat / 2 * sr)
        ln = min(int(0.25 * sr), n - st)
        if ln <= 0:
            break
        tt = np.arange(ln) / sr
        if k % 2 == 0:  # kick on each beat
            freq = 50 + 90 * np.exp(-tt * 30)
            out[st:st + ln] += 0.5 * np.sin(2 * np.pi * np.cumsum(freq) / sr) * np.exp(-tt * 12)
        if k % 4 == 2:  # clap on 2 and 4
            out[st:st + ln] += 0.12 * noise[st:st + ln] * np.exp(-tt * 25)
        hat = np.diff(noise[st:st + ln], prepend=0)  # crude high-pass
        out[st:st + ln] += 0.03 * hat * np.exp(-tt * 80)
    # whoosh at every scene change
    for s in SCENES[1:]:
        st = int((s[0] - 0.25) * sr)
        ln = int(0.5 * sr)
        tt = np.arange(ln) / sr
        env = np.sin(np.pi * tt / 0.5) ** 2
        out[st:st + ln] += 0.1 * noise[st:st + ln] * env
    fade = np.minimum(1, (DURATION - t) / 1.0)
    out *= np.minimum(1, t / 0.3) * fade
    out /= np.max(np.abs(out)) * 1.25
    pcm = (out * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(pcm.tobytes())


# ---------------------------------------------------------------- main
def render_frame(i, bg):
    t = i / FPS
    idx, scene = scene_at(t)
    frame = bg.copy()
    over = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw_chart(ImageDraw.Draw(over), t, idx)
    frame.alpha_composite(over)
    draw_topbar(frame, t)

    # headline card pops in at each scene start
    k = ease_out_back((t - scene[0]) / 0.45)
    card = CARDS[idx]
    if k < 0.999:
        cw, ch = max(1, int(card.width * k)), max(1, int(card.height * k))
        card = card.resize((cw, ch), Image.BILINEAR)
    frame.alpha_composite(card, ((W - card.width) // 2, 215 + (480 - card.height) // 2))

    char = draw_character(t)
    frame.alpha_composite(char, ((W - char.width) // 2, H - char.height + 60))
    draw_cta(frame, t)
    draw_subtitles(frame, t)
    return frame.convert("RGB")


def main():
    wav = OUT_DIR / "_music.wav"
    make_audio(wav)
    bg = make_background()
    out = OUT_DIR / "nika_reel.mp4"
    cmd = [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error",
           "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
           "-i", str(wav), "-c:v", "libx264", "-preset", "medium", "-crf", "23", "-pix_fmt", "yuv420p",
           "-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart", str(out)]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for i in range(N_FRAMES):
        f = render_frame(i, bg)
        proc.stdin.write(f.tobytes())
        if i == int(6 * FPS):
            f.save(OUT_DIR / "nika_preview.png")
    proc.stdin.close()
    proc.wait()
    wav.unlink()
    print("wrote", out)


if __name__ == "__main__":
    main()
