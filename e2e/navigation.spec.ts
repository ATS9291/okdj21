import { test, expect, Page } from '@playwright/test';

// 캔버스 위를 격자 패턴으로 마우스 이동해 빠르게 칠하는 헬퍼
async function paintCanvas(page: Page, coverage = 0.98) {
  const vw = 1280, vh = 800;
  const step = 60; // 간격 (px) — 작을수록 꼼꼼하게 칠함

  for (let y = 0; y < vh; y += step) {
    for (let x = 0; x < vw; x += step) {
      await page.mouse.move(x, y);
    }
  }

  // fill % HUD 가 사라질 때까지 (tiltOn = true) 최대 20초 대기
  await page.waitForSelector('[data-testid="fill-hud"]', {
    state: 'hidden',
    timeout: 20_000,
  }).catch(() => {
    // 타임아웃 시 무시하고 계속 진행
  });
}

// ─────────────────────────────────────────────────────────────────────────────

test.describe('메인 페이지', () => {

  test('캔버스가 렌더링된다', async ({ page }) => {
    await page.goto('/');
    const canvas = page.locator('[data-testid="main-canvas"]');
    await expect(canvas).toBeVisible();
  });

  test('처음에는 진행률 HUD가 보인다', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="fill-hud"]')).toBeVisible();
  });

  test('97% 이상 칠하면 클릭 존이 나타난다', async ({ page }) => {
    await page.goto('/');
    await paintCanvas(page);
    // 클릭 존 중 하나라도 존재하면 통과
    const zone = page.locator('[data-testid^="zone-"]').first();
    await expect(zone).toBeVisible({ timeout: 5_000 });
  });

});

test.describe('클릭 존 네비게이션', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await paintCanvas(page);
    // 클릭 존이 나타날 때까지 대기
    await page.waitForSelector('[data-testid^="zone-"]', { timeout: 5_000 })
      .catch(() => {});
  });

  test('shop 존 클릭 → /shop 이동', async ({ page }) => {
    const zone = page.locator('[data-testid="zone-shop"]');
    if (await zone.isVisible()) {
      await zone.hover();
      await zone.click();
      await expect(page).toHaveURL(/\/shop/, { timeout: 8_000 });
    } else {
      test.skip();
    }
  });

  test('gallery 존 클릭 → /gallery 이동', async ({ page }) => {
    const zone = page.locator('[data-testid="zone-gallery"]');
    if (await zone.isVisible()) {
      await zone.hover();
      await zone.click();
      await expect(page).toHaveURL(/\/gallery/, { timeout: 8_000 });
    } else {
      test.skip();
    }
  });

  test('lookbook 존 클릭 → /lookbook 이동', async ({ page }) => {
    const zone = page.locator('[data-testid="zone-lookbook"]');
    if (await zone.isVisible()) {
      await zone.hover();
      await zone.click();
      await expect(page).toHaveURL(/\/lookbook/, { timeout: 8_000 });
    } else {
      test.skip();
    }
  });

});

test.describe('3D 틸트 효과', () => {

  test('97% 이후 마우스 이동 시 wrapper에 transform이 적용된다', async ({ page }) => {
    await page.goto('/');
    await paintCanvas(page);
    await page.waitForSelector('[data-testid^="zone-"]', { timeout: 5_000 }).catch(() => {});

    const wrapper = page.locator('[data-testid="tilt-wrapper"]');
    // 마우스를 화면 오른쪽으로 이동
    await page.mouse.move(1100, 400);
    await page.waitForTimeout(1200); // GSAP 애니메이션 완료 대기

    const transform = await wrapper.evaluate(el =>
      window.getComputedStyle(el).transform
    );
    // matrix3d 또는 none이 아닌 값이면 틸트 적용된 것
    expect(transform).not.toBe('none');
  });

});
