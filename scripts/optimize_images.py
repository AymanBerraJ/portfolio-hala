from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "image"
OUT_DIR = ROOT / "image" / "optimized"

JOBS = [
    {"src": "image 1.png", "out": "henna-mariage-voiture.jpg", "max_width": 1920, "crop": None},
    {"src": "image 2.png", "out": "henna-mariage-mains.jpg", "max_width": 1400, "crop": None},
    {"src": "image 3.png", "out": "henna-mariage-parapluie.jpg", "max_width": 1400, "crop": None},
    {"src": "image 4.png", "out": "henna-lifestyle.jpg", "max_width": 1400, "crop": None},
    {"src": "image 5.png", "out": "henna-detail-bague.jpg", "max_width": 1400, "crop": None},
    {
        "src": "image 7.png",
        "out": "henna-session-application.jpg",
        "max_width": 1400,
        "crop": (0.0, 0.0, 0.92, 0.94),
    },
]


def process_image(src_path: Path, dst_path: Path, max_width: int, crop_box=None) -> None:
    img = Image.open(src_path)
    if crop_box:
        w, h = img.size
        left = int(w * crop_box[0])
        top = int(h * crop_box[1])
        right = int(w * crop_box[2])
        bottom = int(h * crop_box[3])
        img = img.crop((left, top, right, bottom))

    if img.mode not in ("RGB", "L"):
        background = Image.new("RGB", img.size, (255, 255, 255))
        if img.mode == "RGBA":
            background.paste(img, mask=img.split()[3])
        else:
            background.paste(img)
        img = background
    elif img.mode == "L":
        img = img.convert("RGB")

    width, height = img.size
    if width > max_width:
        ratio = max_width / width
        img = img.resize((max_width, int(height * ratio)), Image.Resampling.LANCZOS)

    img = img.filter(ImageFilter.UnsharpMask(radius=1.6, percent=135, threshold=2))
    img = ImageEnhance.Sharpness(img).enhance(1.2)
    img = ImageEnhance.Contrast(img).enhance(1.06)

    dst_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(dst_path, "JPEG", quality=90, optimize=True, progressive=True)
    print(f"OK  {dst_path.name}  ({img.size[0]}x{img.size[1]})")


def main() -> None:
    for job in JOBS:
        src = SRC_DIR / job["src"]
        dst = OUT_DIR / job["out"]
        if not src.exists():
            raise FileNotFoundError(src)
        process_image(src, dst, job["max_width"], job.get("crop"))


if __name__ == "__main__":
    main()
