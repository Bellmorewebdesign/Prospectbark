"""Split the opening-screen logo into animatable layers.

Source: design/source-photos/17yrs_back_transparent.png, the 17 Years lockup
the client sent on 2026-10-16 as one flattened image (logo, stars and tagline
together on a 6912x3456 canvas). The stars and the tagline are separated out
here by shape, colour and position:

    stars    the small gold pieces around the lockup (every connected piece
             above the tagline that is gold and star-sized)
    tagline  everything below the BARK line: DOG WALKS + DAYCARE + BATHS +
             PET SITS, with the client's little stars between the words

(The 16 Years version used three separately supplied PNGs at the repo root:
logo_opening_screen.png / "stars_opening screen.png" / tagline.png.)

Outputs, which the site loader animates:

    public/brand/logo-mark.webp         the lockup with the stars removed
                                        (in public/ so index.html can preload it)
    src/assets/brand/logo-tagline.webp  the tagline
    src/assets/brand/star-NN.webp       every star cut out on its own
    src/assets/brand/manifest.json      each piece's position, as a percentage
                                        of the lockup's bounding box, plus the
                                        PROSPECT plate's rectangle

Only needed when the logo itself changes -- the generated files are
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

SOURCE = os.path.join(ROOT, 'design/source-photos/17yrs_back_transparent.png')
full = Image.open(SOURCE).convert('RGBA')


def split_layers(img):
    """Return (stars, tagline) as full-canvas RGBA images cut from img."""
    a = np.array(img)
    alpha = a[:, :, 3]
    lbl, _ = ndimage.label(alpha > 12, structure=np.ones((3, 3)))

    # The tagline is the last row of artwork: find the empty band of rows
    # between BARK and the tagline and cut there.
    rows = np.where(alpha.max(axis=1) > 12)[0]
    gaps = np.where(np.diff(rows) > 40)[0]
    tag_top = rows[gaps[-1] + 1]
    cut = (rows[gaps[-1]] + tag_top) // 2
    tag = np.zeros_like(a)
    tag[cut:] = a[cut:]

    # Stars: gold, roughly square, star-sized pieces above the tagline. The
    # "17", the pets and the plate are one huge piece; "Years" is teal and
    # BARK is green, so the colour test leaves them in the mark.
    stars = np.zeros_like(a)
    for i, sl in enumerate(ndimage.find_objects(lbl), start=1):
        ys, xs = sl
        if ys.start >= cut:
            continue
        w, h = xs.stop - xs.start, ys.stop - ys.start
        piece = lbl[sl] == i
        r, g, b = a[sl][piece][:, :3].mean(axis=0)
        gold = r > g > b and r - b > 35
        if not (gold and 12 <= w <= 200 and 12 <= h <= 200 and 0.7 < w / h < 1.4):
            continue
        # take the star plus its faint glow (alpha <= 12) around it, but
        # never pixels that belong to another piece
        y0, y1 = max(ys.start - 14, 0), ys.stop + 14
        x0, x1 = max(xs.start - 14, 0), xs.stop + 14
        grown = ndimage.binary_dilation(lbl[y0:y1, x0:x1] == i, iterations=12)
        mine = grown & ((lbl[y0:y1, x0:x1] == 0) | (lbl[y0:y1, x0:x1] == i))
        stars[y0:y1, x0:x1][mine] = a[y0:y1, x0:x1][mine]
    return Image.fromarray(stars, 'RGBA'), Image.fromarray(tag, 'RGBA')


stars, tag = split_layers(full)

# clear the previous logo's stars so a star count change leaves no orphans
for old in os.listdir(OUT):
    if old.startswith('star-') and old.endswith('.webp'):
        os.remove(os.path.join(OUT, old))

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
# drop near-invisible leftovers (alpha <= 12) that are not part of the
# lockup's own soft edge, so they cannot stretch the mark's bounding box
edge = ndimage.binary_dilation(mark[:, :, 3] > 12, iterations=6)
mark[:, :, 3][~edge] = 0
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

# ---------- 4. PROSPECT plate ----------
# The plate behind PROSPECT is white fading to transparent, so on a dark
# background the lower half takes on that colour and the black lettering sinks
# into it. Record the plate's inner rectangle so the loader can sit a light
# backing behind it (the artwork itself is untouched).
#   columns: whitish, translucent pixels spanning most of the plate's rows
#   rows:    measured on the plate's left edge strip, clear of the dog and cat
plate = (f[:, :, :3].min(axis=2) > 200) & (f[:, :, 3] > 8) & (f[:, :, 3] < 250)
p_rows = np.where(plate.sum(axis=1) > CW * 0.5)[0]
p_cols = np.where(plate[p_rows].sum(axis=0) > len(p_rows) * 0.5)[0]
px0, px1 = p_cols.min(), p_cols.max() + 1
edge_rows = np.where(plate[:, px0:px0 + (px1 - px0) // 8].mean(axis=1) > 0.6)[0]
py0, py1 = edge_rows.min(), edge_rows.max() + 1
manifest['plate'] = pct(px0, py0, px1 - px0, py1 - py0)
print('plate', manifest['plate'])

with open(os.path.join(OUT, 'manifest.json'), 'w') as fh:
    json.dump(manifest, fh, indent=2)
print(json.dumps({k: v for k, v in manifest.items() if k != 'stars'}, indent=2))
