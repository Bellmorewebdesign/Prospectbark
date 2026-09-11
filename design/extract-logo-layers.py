"""Split the supplied opening-screen logo pack into animatable layers.

The three PNGs at the repo root (logo_opening_screen.png / "stars_opening
screen.png" / tagline.png) share one 6912x3456 canvas, so the layers line up
exactly. This script turns them into the pieces the site loader animates:

    public/brand/logo-mark.webp         the lockup with the stars removed
                                        (in public/ so index.html can preload it)
    src/assets/brand/logo-tagline.webp  DOG WALKS - DAYCARE - BATHS - PET SITS
    src/assets/brand/star-NN.webp       every star cut out on its own
    src/assets/brand/manifest.json      each piece's position, as a percentage
                                        of the lockup's bounding box

Only needed when the logo pack itself changes -- the generated files are
committed, so a normal `npm run build` never runs this.

    pip install pillow numpy scipy
    python3 design/extract-logo-layers.py
"""
from PIL import Image
import numpy as np
from scipy import ndimage
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'src/assets/brand')
MARK_OUT = os.path.join(ROOT, 'public/brand')
os.makedirs(OUT, exist_ok=True)
os.makedirs(MARK_OUT, exist_ok=True)

full  = Image.open(os.path.join(ROOT, 'logo_opening_screen.png')).convert('RGBA')
stars = Image.open(os.path.join(ROOT, 'stars_opening screen.png')).convert('RGBA')
tag   = Image.open(os.path.join(ROOT, 'tagline.png')).convert('RGBA')

BOX = full.getchannel('A').getbbox()
CW, CH = BOX[2]-BOX[0], BOX[3]-BOX[1]

f = np.array(full.crop(BOX),  dtype=np.int16)
s = np.array(stars.crop(BOX), dtype=np.int16)
t = np.array(tag.crop(BOX),   dtype=np.int16)

manifest = {'box': {'w': CW, 'h': CH}}

def pct(x, y, w, h):
    return {'left': round(100*x/CW, 4), 'top': round(100*y/CH, 4),
            'width': round(100*w/CW, 4), 'height': round(100*h/CH, 4)}

# ---------- 1. mark (full minus stars minus tagline) ----------
mark = f.copy()
mark[:, :, 3] = np.clip(f[:,:,3] - s[:,:,3] - t[:,:,3], 0, 255)
mark_img = Image.fromarray(mark.astype(np.uint8), 'RGBA')
mb = mark_img.getchannel('A').getbbox()
mc = mark_img.crop(mb)
target_w = 1240
mc = mc.resize((target_w, round(mc.height*target_w/mc.width)), Image.LANCZOS)
mc.save(os.path.join(MARK_OUT, 'logo-mark.webp'), 'WEBP', quality=92, method=6)
manifest['mark'] = pct(mb[0], mb[1], mb[2]-mb[0], mb[3]-mb[1])
print('mark', mc.size, os.path.getsize(os.path.join(MARK_OUT, 'logo-mark.webp')))

# ---------- 2. tagline ----------
tag_img = Image.fromarray(t.astype(np.uint8), 'RGBA')
tb = tag_img.getchannel('A').getbbox()
tc = tag_img.crop(tb)
target_w = 1200
tc = tc.resize((target_w, max(1, round(tc.height*target_w/tc.width))), Image.LANCZOS)
tc.save(os.path.join(OUT, 'logo-tagline.webp'), 'WEBP', quality=92, method=6)
manifest['tagline'] = pct(tb[0], tb[1], tb[2]-tb[0], tb[3]-tb[1])
print('tagline', tc.size, os.path.getsize(os.path.join(OUT,'logo-tagline.webp')))

# ---------- 3. individual stars ----------
alpha = s[:, :, 3]
lbl, n = ndimage.label(alpha > 12, structure=np.ones((3,3)))
objs = ndimage.find_objects(lbl)
star_meta = []
for i, sl in enumerate(objs, start=1):
    ys, xs = sl
    x0, y0, x1, y1 = xs.start, ys.start, xs.stop, ys.stop
    w, h = x1-x0, y1-y0
    if w < 12 or h < 12:
        continue
    # isolate this component only
    comp = s.copy()
    comp[:, :, 3] = np.where(lbl == i, s[:, :, 3], 0)
    ci = Image.fromarray(comp.astype(np.uint8), 'RGBA').crop((x0, y0, x1, y1))
    scale = 2  # 2x source px keeps the tiny stars crisp without bloating the page
    ci = ci.resize((w*scale, h*scale), Image.LANCZOS)
    name = f'star-{len(star_meta)+1:02d}.webp'
    ci.save(os.path.join(OUT, name), 'WEBP', quality=88, method=6)
    m = pct(x0, y0, w, h)
    m['src'] = name
    m['area'] = int((lbl[sl] == i).sum())
    star_meta.append(m)

# order: largest first reads best for a staggered "pop"
star_meta.sort(key=lambda m: -m['area'])
manifest['stars'] = star_meta
print('stars:', len(star_meta),
      'bytes:', sum(os.path.getsize(os.path.join(OUT, m['src'])) for m in star_meta))

with open(os.path.join(OUT, 'manifest.json'), 'w') as fh:
    json.dump(manifest, fh, indent=2)
print(json.dumps({k: v for k, v in manifest.items() if k != 'stars'}, indent=2))
