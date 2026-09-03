import sys

from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 1000})
        page.goto("http://127.0.0.1:5173", wait_until="networkidle")
        assert "Cuidado claro" in page.locator("h1").first.inner_text()
        page.screenshot(path="C:/Users/Jesus Enrique Leos M/AppData/Local/Temp/hydross-home-smoke.png", full_page=True)

        page.get_by_role("link", name="Tienda").first.click()
        page.wait_for_load_state("networkidle")
        assert page.url.endswith("/shop")
        assert "productos" in page.locator("body").inner_text().lower()

        page.get_by_role("link", name="Sérum Luz").first.click()
        page.wait_for_selector(".product-detail-copy h1")
        assert page.url.endswith("/product/serum-luz")
        assert page.locator(".product-detail-copy h1").is_visible()
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

        page.goto("http://127.0.0.1:5173/find", wait_until="networkidle")
        for index in range(3):
            page.locator(".ritual-options button").nth(0).click()
        assert page.get_by_text("Tu selección inicial").is_visible()

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        mobile.goto("http://127.0.0.1:5173", wait_until="networkidle")
        assert mobile.locator(".mobile-menu").is_visible()
        mobile.close()
        browser.close()
    print("Smoke test passed")


if __name__ == "__main__":
    main()
