import sys

from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 1000})
        page.goto("http://127.0.0.1:5173", wait_until="domcontentloaded")
        page.wait_for_timeout(250)
        assert page.get_by_role("heading", name="Hydross está tomando forma.").is_visible()
        assert page.get_by_role("button", name="Entrar al demo").is_visible()
        page.screenshot(path="C:/Users/Jesus Enrique Leos M/AppData/Local/Temp/hydross-maintenance-smoke.png", full_page=True)
        page.get_by_role("button", name="Entrar al demo").click()
        assert "Cuidado claro" in page.locator("h1").first.inner_text()
        assert page.locator("link[rel='icon'][href='/brand/drop-favicon.svg']").count() == 1
        page.screenshot(path="C:/Users/Jesus Enrique Leos M/AppData/Local/Temp/hydross-home-smoke.png", full_page=True)

        page.reload()
        assert page.get_by_role("heading", name="Hydross está tomando forma.").is_visible()
        page.get_by_role("button", name="Entrar al demo").click()
        page.goto("http://127.0.0.1:5173/shop", wait_until="domcontentloaded")
        page.wait_for_timeout(250)
        assert page.get_by_role("heading", name="Hydross está tomando forma.").is_visible()
        page.get_by_role("button", name="Entrar al demo").click()
        assert page.url.endswith("/shop")

        page.get_by_role("link", name="Sobre Hydross").first.click()
        page.wait_for_timeout(700)
        assert page.url.endswith("/#essence")
        assert page.locator("#essence").bounding_box()["y"] < 320

        page.get_by_role("button", name="Buscar productos").click()
        page.wait_for_timeout(250)
        assert page.url.endswith("/shop?focus=search")
        assert page.locator("#catalog-search").evaluate("element => document.activeElement === element")
        page.locator("#catalog-search").fill("serum")
        page.wait_for_timeout(250)
        assert "q=serum" in page.url
        page.get_by_role("button", name="Quitar filtros").click()
        page.wait_for_timeout(250)
        page.get_by_role("combobox", name="Ordenar productos").select_option("price-desc")
        page.wait_for_timeout(250)
        assert page.url.endswith("/shop?sort=price-desc")
        assert page.locator(".product-name").first.inner_text() == "Aceite Noche"

        page.get_by_role("link", name="Sérum Luz").first.click()
        page.wait_for_selector(".product-detail-copy h1")
        assert page.url.endswith("/product/serum-luz")
        assert page.locator(".product-detail-copy h1").is_visible()
        assert page.get_by_role("button", name="Sobre este concepto").get_attribute("aria-expanded") == "true"
        page.get_by_role("button", name="Agregar selección").click()
        assert page.get_by_text("Agregado").is_visible()

        page.locator("button[aria-label^='Carrito con']").click()
        page.wait_for_selector(".cart-heading h1")
        assert page.locator(".cart-heading h1").is_visible()
        page.get_by_role("button", name="Continuar").click()
        inputs = page.locator(".checkout-form input")
        inputs.nth(0).fill("Cliente Demo")
        inputs.nth(1).fill("demo@hydross.test")
        inputs.nth(2).fill("Av. Demo 123")
        inputs.nth(3).fill("Ciudad de México")
        inputs.nth(4).fill("01000")
        page.get_by_role("button", name="Confirmar selección").click()
        assert page.locator(".success-page h1").is_visible()
        success_text = page.locator(".success-page").inner_text()
        assert "folio de" in success_text.lower()
        assert "cargo" in success_text.lower()

        page.goto("http://127.0.0.1:5173/find", wait_until="domcontentloaded")
        page.wait_for_timeout(250)
        page.get_by_role("button", name="Entrar al demo").click()
        for index in range(3):
            page.locator(".ritual-options button").nth(0).click()
        assert page.get_by_text("Tu selección inicial").is_visible()
        assert "Mostramos primero los conceptos de limpieza" in page.locator(".ritual-result").inner_text()

        page.goto("http://127.0.0.1:5173/product/protector-diario", wait_until="domcontentloaded")
        page.wait_for_timeout(250)
        page.get_by_role("button", name="Entrar al demo").click()
        assert page.locator(".related").count() == 0

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        mobile.goto("http://127.0.0.1:5173", wait_until="domcontentloaded")
        mobile.wait_for_timeout(250)
        assert mobile.get_by_role("heading", name="Hydross está tomando forma.").is_visible()
        mobile.get_by_role("button", name="Entrar al demo").click()
        assert mobile.locator(".mobile-menu").is_visible()
        assert mobile.locator(".brand-logo-header").is_visible()
        assert mobile.evaluate("document.documentElement.scrollWidth === document.documentElement.clientWidth")
        mobile.locator(".mobile-menu").click()
        assert mobile.locator(".mobile-menu").get_attribute("aria-expanded") == "true"
        mobile.locator(".mobile-menu").press("Escape")
        assert mobile.locator(".mobile-menu").get_attribute("aria-expanded") == "false"
        mobile.close()
        browser.close()
    print("Smoke test passed")


if __name__ == "__main__":
    main()
