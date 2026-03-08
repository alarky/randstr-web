const { test, expect } = require('@playwright/test');

test.describe('initial state', () => {
  test('generates 12 strings of length 16 by default', async ({ page }) => {
    await page.goto('/');
    const items = page.locator('.results li');
    await expect(items).toHaveCount(12);
    const texts = await items.allTextContents();
    for (const t of texts) {
      expect(t).toHaveLength(16);
    }
  });

  test('default checkboxes are correct', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('input[type="checkbox"]').nth(0)).toBeChecked();     // a-z
    await expect(page.locator('input[type="checkbox"]').nth(1)).toBeChecked();     // A-Z
    await expect(page.locator('input[type="checkbox"]').nth(2)).toBeChecked();     // 0-9
    await expect(page.locator('input[type="checkbox"]').nth(3)).not.toBeChecked(); // symbols
  });

  test('default results contain only alphanumeric chars', async ({ page }) => {
    await page.goto('/');
    const texts = await page.locator('.results li').allTextContents();
    for (const t of texts) {
      expect(t).toMatch(/^[a-zA-Z0-9]+$/);
    }
  });
});

test.describe('count and length', () => {
  test('changing count updates number of results', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('input[type="text"]').first();
    await input.fill('5');
    await expect(page.locator('.results li')).toHaveCount(5);
  });

  test('changing length updates string length', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('input[type="text"]').nth(1);
    await input.fill('8');
    const texts = await page.locator('.results li').allTextContents();
    for (const t of texts) {
      expect(t).toHaveLength(8);
    }
  });
});

test.describe('character sets', () => {
  test('unchecking a-z removes lowercase from results', async ({ page }) => {
    await page.goto('/');
    const checkbox = page.locator('input[type="checkbox"]').nth(0);
    await checkbox.uncheck();
    const texts = await page.locator('.results li').allTextContents();
    for (const t of texts) {
      expect(t).not.toMatch(/[a-z]/);
    }
  });

  test('unchecking A-Z removes uppercase from results', async ({ page }) => {
    await page.goto('/');
    const checkbox = page.locator('input[type="checkbox"]').nth(1);
    await checkbox.uncheck();
    const texts = await page.locator('.results li').allTextContents();
    for (const t of texts) {
      expect(t).not.toMatch(/[A-Z]/);
    }
  });

  test('unchecking 0-9 removes digits from results', async ({ page }) => {
    await page.goto('/');
    const checkbox = page.locator('input[type="checkbox"]').nth(2);
    await checkbox.uncheck();
    const texts = await page.locator('.results li').allTextContents();
    for (const t of texts) {
      expect(t).not.toMatch(/[0-9]/);
    }
  });

  test('all unchecked produces no results', async ({ page }) => {
    await page.goto('/');
    await page.locator('input[type="checkbox"]').nth(0).uncheck();
    await page.locator('input[type="checkbox"]').nth(1).uncheck();
    await page.locator('input[type="checkbox"]').nth(2).uncheck();
    await expect(page.locator('.results li')).toHaveCount(0);
  });
});

test.describe('symbols', () => {
  test('symbols checkbox toggles all symbol checkboxes on', async ({ page }) => {
    await page.goto('/');
    const symbolsCheckbox = page.locator('input[type="checkbox"]').nth(3);
    await symbolsCheckbox.check();
    const symbolItems = page.locator('.symbol-item input[type="checkbox"]');
    const count = await symbolItems.count();
    for (let i = 0; i < count; i++) {
      await expect(symbolItems.nth(i)).toBeChecked();
    }
  });

  test('symbols checkbox toggles all symbol checkboxes off', async ({ page }) => {
    await page.goto('/?sym=all');
    const symbolsCheckbox = page.locator('input[type="checkbox"]').nth(3);
    await symbolsCheckbox.uncheck();
    const symbolItems = page.locator('.symbol-item input[type="checkbox"]');
    const count = await symbolItems.count();
    for (let i = 0; i < count; i++) {
      await expect(symbolItems.nth(i)).not.toBeChecked();
    }
  });

  test('checking all individual symbols syncs symbols checkbox', async ({ page }) => {
    await page.goto('/');
    const symbolItems = page.locator('.symbol-item input[type="checkbox"]');
    const count = await symbolItems.count();
    for (let i = 0; i < count; i++) {
      await symbolItems.nth(i).check();
    }
    await expect(page.locator('input[type="checkbox"]').nth(3)).toBeChecked();
  });

  test('symbol max limits symbol ratio', async ({ page }) => {
    await page.goto('/?c=20&l=100&ch=a&sym=all&sm=10');
    const texts = await page.locator('.results li').allTextContents();
    for (const t of texts) {
      const symbolCount = [...t].filter(c => /[^a-zA-Z0-9]/.test(c)).length;
      expect(symbolCount).toBeLessThanOrEqual(10);
    }
  });
});

test.describe('Generate and Reset', () => {
  test('Generate produces new strings', async ({ page }) => {
    await page.goto('/');
    const before = await page.locator('.results li').allTextContents();
    await page.locator('button', { hasText: 'Generate' }).click();
    const after = await page.locator('.results li').allTextContents();
    // Extremely unlikely to be identical
    expect(before.join('')).not.toBe(after.join(''));
  });

  test('Reset restores defaults and clears URL', async ({ page }) => {
    await page.goto('/?c=5&l=8&ch=a');
    await page.locator('button.secondary').click();
    await expect(page.locator('.results li')).toHaveCount(12);
    const texts = await page.locator('.results li').allTextContents();
    for (const t of texts) {
      expect(t).toHaveLength(16);
    }
    const url = new URL(page.url());
    expect(url.search).toBe('');
  });
});

test.describe('URL state', () => {
  test('settings are saved to URL params', async ({ page }) => {
    await page.goto('/');
    await page.locator('input[type="text"]').first().fill('5');
    const url = new URL(page.url());
    expect(url.searchParams.get('c')).toBe('5');
    expect(url.searchParams.get('ch')).toContain('a');
  });

  test('state restores from URL params', async ({ page }) => {
    await page.goto('/?c=3&l=10&ch=a0');
    await expect(page.locator('.results li')).toHaveCount(3);
    const texts = await page.locator('.results li').allTextContents();
    for (const t of texts) {
      expect(t).toHaveLength(10);
      expect(t).toMatch(/^[a-z0-9]+$/);
    }
  });

  test('sym=all enables all symbols', async ({ page }) => {
    await page.goto('/?sym=all');
    await expect(page.locator('input[type="checkbox"]').nth(3)).toBeChecked();
    const symbolItems = page.locator('.symbol-item input[type="checkbox"]');
    const count = await symbolItems.count();
    for (let i = 0; i < count; i++) {
      await expect(symbolItems.nth(i)).toBeChecked();
    }
  });

  test('individual symbol in URL', async ({ page }) => {
    await page.goto('/?ch=a&sym=!');
    const texts = await page.locator('.results li').allTextContents();
    for (const t of texts) {
      expect(t).toMatch(/^[a-z!]+$/);
    }
  });
});

test.describe('clipboard', () => {
  test('clicking a result copies to clipboard and shows toast', async ({ page }) => {
    await page.goto('/');
    const firstItem = page.locator('.results li').first();
    const text = await firstItem.textContent();
    await firstItem.click();
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe(text);
    await expect(firstItem.locator('.toast')).toBeVisible();
  });
});
