"""python/ papkasidagi fayllarni js/kodlar.js ga joylaydi (Python kod o'zgarsa qayta ishga tushiring)."""
import json, pathlib
ild = pathlib.Path(__file__).parent
kod = {p.name: p.read_text(encoding="utf-8") for p in sorted((ild / "python").glob("*.py"))}
(ild / "js" / "kodlar.js").write_text("/* Avtomatik yaratilgan: build_kodlar.py */\nwindow.KODLAR = " + json.dumps(kod, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
print(len(kod), "ta fayl joylandi")
