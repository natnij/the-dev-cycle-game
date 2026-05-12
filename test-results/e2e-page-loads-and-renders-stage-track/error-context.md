# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.js >> page loads and renders stage track
- Location: tests/e2e.spec.js:3:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('.stage-node')
Expected: 6
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('.stage-node')
    9 × locator resolved to 0 elements
      - unexpected value "0"

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - complementary [ref=e3]:
    - generic [ref=e4]:
      - paragraph [ref=e5]: Digital prototype
      - heading "The Dev Cycle" [level=1] [ref=e6]
      - paragraph [ref=e7]: Draw cards, make choices, and survive the career track without burning out.
    - generic [ref=e8]:
      - strong [ref=e11]: Goal
      - strong [ref=e14]: Status effects
  - main [ref=e15]:
    - generic [ref=e17]:
      - generic [ref=e18]:
        - paragraph [ref=e19]: Career board
        - heading "Stage" [level=2] [ref=e20]
      - generic [ref=e21]:
        - button "Advance stage" [ref=e22] [cursor=pointer]
        - button "Restart game" [ref=e23] [cursor=pointer]
    - generic [ref=e24]:
      - generic [ref=e25]:
        - generic [ref=e26]:
          - paragraph [ref=e27]: Main deck
          - heading "Scenario pile" [level=3] [ref=e28]
          - paragraph [ref=e29]: Draw the next challenge from the current career stage. Higher Tech Cred raises the chance that this draw becomes a project scenario.
        - button "Draw scenario" [ref=e30] [cursor=pointer]
      - generic [ref=e31]:
        - generic [ref=e32]:
          - paragraph [ref=e33]: Safety deck
          - heading "Support pile" [level=3] [ref=e34]
          - paragraph [ref=e35]: Draw help from mentors, allies, and recovery resources.
        - button "Draw support" [ref=e36] [cursor=pointer]
    - complementary [ref=e39]:
      - generic [ref=e40]:
        - paragraph [ref=e41]: Activity
        - heading "Game log" [level=3] [ref=e42]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('page loads and renders stage track', async ({ page }) => {
  4  |   await page.goto('/');
  5  |   await expect(page.getByText('The Dev Cycle')).toBeVisible();
> 6  |   await expect(page.locator('.stage-node')).toHaveCount(6);
     |                                             ^ Error: expect(locator).toHaveCount(expected) failed
  7  |   await expect(page.locator('#draw-scenario-btn')).toBeVisible();
  8  |   await expect(page.locator('#draw-support-btn')).toBeVisible();
  9  |   await expect(page.locator('#draw-project-btn')).toHaveCount(0);
  10 |   await expect(page.locator('#status-badges')).not.toContainText('Turn');
  11 |   await expect(page.locator('#active-card')).not.toContainText('Next turn');
  12 |   await expect(page.locator('#stats')).toContainText('Project Draw %');
  13 |   await expect(page.locator('#stats')).not.toContainText('Actions');
  14 |   await expect(page.locator('#stats')).toContainText('14%');
  15 | });
  16 | 
  17 | test('resolved scenario screen only shows next turn action', async ({ page }) => {
  18 |   await page.goto('/');
  19 |   await page.locator('#draw-scenario-btn').click();
  20 |   const scenarioTitle = (await page.locator('#active-card h2').textContent()) || '';
  21 |   await page.locator('#active-card .choice-buttons button').first().click();
  22 |   await expect(page.locator('#log-list')).toContainText(scenarioTitle);
  23 |   await expect(page.locator('#active-card .choice-buttons button')).toHaveCount(1);
  24 |   await expect(page.locator('#active-card .choice-buttons')).toContainText('Next turn');
  25 |   await expect(page.locator('#active-card')).toContainText('Next draw odds');
  26 |   await expect(page.locator('#active-card')).toContainText('next scenario draw is a project card');
  27 | });
  28 | 
  29 | test('restart resets the game state', async ({ page }) => {
  30 |   await page.goto('/');
  31 |   await page.locator('#draw-scenario-btn').click();
  32 |   await page.getByRole('button', { name: 'Restart game' }).click();
  33 |   await expect(page.locator('#status-badges')).toContainText('No active status');
  34 |   await expect(page.locator('#stats')).toContainText('Project Draw %');
  35 |   await expect(page.locator('#stats')).toContainText('14%');
  36 |   await expect(page.locator('#active-card')).toContainText('Choose your next move');
  37 | });
  38 | 
  39 | test('scenario pile can surface project scenarios', async ({ page }) => {
  40 |   await page.addInitScript(() => {
  41 |     const sequence = [0.01, 0.99, 0.99];
  42 |     let index = 0;
  43 |     Math.random = () => sequence[index++] ?? 0.99;
  44 |   });
  45 |   await page.goto('/');
  46 |   await page.locator('#draw-scenario-btn').click();
  47 |   await expect(page.locator('#active-card .card-tag')).toContainText('Project scenario');
  48 | });
  49 | 
  50 | test('support cards still resolve into next turn flow', async ({ page }) => {
  51 |   await page.goto('/');
  52 |   await page.locator('#draw-support-btn').click();
  53 |   await expect(page.locator('#active-card')).toContainText('Next draw odds');
  54 |   await expect(page.locator('#active-card .choice-buttons')).toContainText('Next turn');
  55 | });
  56 | 
  57 | test('next turn re-enables draw buttons', async ({ page }) => {
  58 |   await page.goto('/');
  59 |   await page.locator('#draw-scenario-btn').click();
  60 |   await page.locator('#active-card .choice-buttons button').first().click();
  61 |   await expect(page.locator('#draw-scenario-btn')).toBeDisabled();
  62 |   await page.locator('#active-card .choice-buttons button').click();
  63 |   await expect(page.locator('#draw-scenario-btn')).toBeEnabled();
  64 |   await expect(page.locator('#draw-support-btn')).toBeEnabled();
  65 | });
  66 | 
  67 | 
```