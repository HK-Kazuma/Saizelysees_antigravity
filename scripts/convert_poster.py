import os
from PIL import Image, ImageEnhance, ImageOps

src_path = r"C:\Users\aston\.gemini\antigravity\brain\7b94d64e-003f-45ea-a095-3cdebd227e94\.user_uploaded\media_1795433732363_69691619.jpg"
out_dir = r"c:\Users\aston\Documents\GitHub\Saizelysees_antigravity\public\assets"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src_path).convert("RGB")
w, h = img.size
aspect = h / w

# 1. 高画質オリジナルコピー
img.save(os.path.join(out_dir, "poster_original.jpg"), quality=95)

# 2. 壁掛け用・詳細ドット絵ポスター (160x320 程度にリサイズ -> 最近傍拡大)
pixel_w = 160
pixel_h = int(pixel_w * aspect)

# コントラストと彩度をピクセルアート向けに少し強調
enhancer = ImageEnhance.Color(img)
img_enhanced = enhancer.enhance(1.25)
enhancer2 = ImageEnhance.Contrast(img_enhanced)
img_enhanced = enhancer2.enhance(1.15)

small = img_enhanced.resize((pixel_w, pixel_h), Image.Resampling.BILINEAR)

# 32色または48色に量子化
small_quant = small.quantize(colors=48, method=Image.Quantize.MEDIANCUT).convert("RGB")

# 原寸ピクセルアート (160x...)
small_quant.save(os.path.join(out_dir, "poster_pixel_small.png"))

# レトロスケーリング（最近傍法でくっきり拡大したポスター画像 480x...）
scale = 4
pixel_art_scaled = small_quant.resize((pixel_w * scale, pixel_h * scale), Image.Resampling.NEAREST)
pixel_art_scaled.save(os.path.join(out_dir, "poster_pixel_art.png"))

# 3. 店内アイソメトリック壁用（額縁付きミニスプライト）
frame_w = 72
frame_h = int(frame_w * aspect)
frame_small = img_enhanced.resize((frame_w - 6, frame_h - 6), Image.Resampling.BILINEAR)
frame_small_q = frame_small.quantize(colors=32).convert("RGB")

# 額縁（ゴールド＆ウッドフレーム）を追加
framed_img = Image.new("RGBA", (frame_w, frame_h), (0, 0, 0, 0))
from PIL import ImageDraw
draw = ImageDraw.Draw(framed_img)
# 枠線
draw.rectangle([0, 0, frame_w - 1, frame_h - 1], fill=(92, 51, 23, 255), outline=(218, 165, 32, 255), width=2)
draw.rectangle([2, 2, frame_w - 3, frame_h - 3], outline=(139, 69, 19, 255), width=1)
# 内部に画像をペースト
framed_img.paste(frame_small_q, (3, 3))
framed_img.save(os.path.join(out_dir, "wall_poster_framed.png"))

print("Pixel art generation completed!")
