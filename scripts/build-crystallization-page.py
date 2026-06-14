import importlib.util
from pathlib import Path

spec = importlib.util.spec_from_file_location(
    "gen", Path(__file__).resolve().parent / "generate-dairy-product-pages.py"
)
gen = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gen)

product = next(p for p in gen.PRODUCTS if p["slug"] == "crystallization-tank")
gen.build_page(product)
print("Built product-crystallization-tank.html")
