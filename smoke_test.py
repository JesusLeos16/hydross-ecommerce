import sys

from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")

BASE_URL = "http://127.0.0.1:5173"
MAINTENANCE_HEADING = "La tienda está en construcción."


def assert_maintenance(page):
    page.wait_for_selector(".maintenance-overlay")
    assert page.get_by_role("heading", name=MAINTENANCE_HEADING).is_visible()
    assert page.get_by_role("button", name="Entrar al demo").count() == 0
    assert page.locator(".maintenance-lock").is_visible()
    assert page.locator(".maintenance-app[aria-hidden='true']").count() == 1
    assert "blur" in page.locator(".maintenance-app").evaluate("element => getComputedStyle(element).filter")
    assert page.locator(".maintenance-app[inert]").count() == 1
    assert page.evaluate("document.body.style.overflow === 'hidden'")


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)

        page = browser.new_page(viewport={"width": 1440, "height": 1000})
        page.goto(BASE_URL, wait_until="domcontentloaded")
        page.wait_for_timeout(250)
        assert_maintenance(page)
        assert page.locator(".hero").count() == 1
        assert page.locator("link[rel='icon'][href='/brand/drop-favicon.svg']").count() == 1
        page.screenshot(
            path="C:/Users/Jesus Enrique Leos M/AppData/Local/Temp/hydross-maintenance-smoke.png",
            full_page=True,
        )

        page.goto(f"{BASE_URL}/shop", wait_until="domcontentloaded")
        page.wait_for_timeout(250)
        assert_maintenance(page)
        assert page.locator(".shop-page").count() == 1

        page.goto(f"{BASE_URL}/product/serum-luz", wait_until="domcontentloaded")
        page.wait_for_timeout(250)
        assert_maintenance(page)
        assert page.locator(".product-page").count() == 1

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        mobile.goto(BASE_URL, wait_until="domcontentloaded")
        mobile.wait_for_timeout(250)
        assert_maintenance(mobile)
        assert mobile.evaluate("document.documentElement.scrollWidth === document.documentElement.clientWidth")
        mobile.screenshot(
            path="C:/Users/Jesus Enrique Leos M/AppData/Local/Temp/hydross-maintenance-mobile-smoke.png",
            full_page=True,
        )

        mobile.close()
        page.close()
        browser.close()

    print("Maintenance smoke test passed")


if __name__ == "__main__":
    main()
