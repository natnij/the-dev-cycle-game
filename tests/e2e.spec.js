import { test, expect } from '@playwright/test';

test('landing page renders how-to-play copy in the main card', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('The Dev Cycle')).toBeVisible();
  await expect(page.locator('#draw-scenario-btn')).toBeVisible();
  await expect(page.locator('#draw-support-btn')).toBeVisible();
  await expect(page.locator('#draw-project-btn')).toHaveCount(0);
  await expect(page.locator('#active-card')).toContainText('Choose your next move');
  await expect(page.locator('#active-card')).toContainText('How to play');
  await expect(page.locator('#active-card')).toContainText('Draw scenario cards to face career moments');
});

test('scenario choices show short summaries and generic guidance', async ({ page }) => {
  await page.goto('/');
  await page.locator('#draw-scenario-btn').click();

  const firstChoice = page.locator('#active-card .choice').first();
  const secondChoice = page.locator('#active-card .choice').nth(1);

  await expect(firstChoice).toContainText('Often the higher-compliance or higher-overperformance route.');
  await expect(secondChoice).toContainText('Often the boundary-setting or self-protective route.');

  const firstText = (await firstChoice.textContent()) || '';
  const secondText = (await secondChoice.textContent()) || '';
  expect(firstText.replace('Often the higher-compliance or higher-overperformance route.', '').trim().length).toBeGreaterThan(0);
  expect(secondText.replace('Often the boundary-setting or self-protective route.', '').trim().length).toBeGreaterThan(0);
});

test('resolved scenario screen only shows next turn action', async ({ page }) => {
  await page.goto('/');
  await page.locator('#draw-scenario-btn').click();
  const scenarioTitle = ((await page.locator('#active-card h2').textContent()) || '').replace('[Project] ', '');
  await page.locator('#active-card .choice-buttons button').first().click();
  await expect(page.locator('#log-list')).toContainText(scenarioTitle);
  await expect(page.locator('#active-card .choice-buttons button')).toHaveCount(1);
  await expect(page.locator('#active-card .choice-buttons')).toContainText('Next turn');
  await expect(page.locator('#active-card')).toContainText('Next draw odds');
  await expect(page.locator('#active-card')).toContainText('next scenario draw is a project card');
});

test('restart resets the game state', async ({ page }) => {
  await page.goto('/');
  await page.locator('#draw-scenario-btn').click();
  await page.getByRole('button', { name: 'Restart game' }).click();
  await expect(page.locator('#status-badges')).toContainText('No active status');
  await expect(page.locator('#stats')).toContainText('Project Draw %');
  await expect(page.locator('#stats')).toContainText('14%');
  await expect(page.locator('#active-card')).toContainText('Choose your next move');
});

test('scenario pile can surface project scenarios', async ({ page }) => {
  await page.addInitScript(() => {
    const sequence = [0.01, 0.99, 0.99];
    let index = 0;
    Math.random = () => sequence[index++] ?? 0.99;
  });
  await page.goto('/');
  await page.locator('#draw-scenario-btn').click();
  await expect(page.locator('#active-card .card-tag')).toContainText('Project scenario');
});

test('support cards still resolve into next turn flow', async ({ page }) => {
  await page.goto('/');
  await page.locator('#draw-support-btn').click();
  await expect(page.locator('#active-card')).toContainText('Next draw odds');
  await expect(page.locator('#active-card .choice-buttons')).toContainText('Next turn');
});

test('next turn re-enables draw buttons', async ({ page }) => {
  await page.goto('/');
  await page.locator('#draw-scenario-btn').click();
  await page.locator('#active-card .choice-buttons button').first().click();
  await expect(page.locator('#draw-scenario-btn')).toBeDisabled();
  await page.locator('#active-card .choice-buttons button').click();
  await expect(page.locator('#draw-scenario-btn')).toBeEnabled();
  await expect(page.locator('#draw-support-btn')).toBeEnabled();
});

test('burnout spiral status announcement appears in the main window', async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0.99;
  });
  await page.goto('/');
  await page.evaluate(() => {
    window.__gameState.burnout = 66;
    window.__gameState.activeCard = {
      title: 'Threshold test',
      text: 'Force burnout across the threshold.',
      agree: {
        label: 'Push through',
        effects: { burnout: 4 },
        result: 'Burnout crosses the threshold.'
      },
      decline: {
        label: 'Hold back',
        effects: { burnout: 0 },
        result: 'No change.'
      },
      tags: []
    };
    window.__gameState.cardType = 'scenario';
    window.render();
  });
  await page.locator('#active-card .choice-buttons button').first().click();

  await expect(page.locator('#status-badges')).toContainText('Burnout Spiral');
  await expect(page.locator('#active-card')).toContainText('Burnout Spiral');
  await expect(page.locator('#active-card')).toContainText('drains 5 Energy at the start of every turn');
  await expect(page.locator('#active-card')).toContainText('reducing Burnout below 70');
});

test('burnout recovery support in review flow clears burnout spiral and shows the cleared announcement', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__gameState.stage = 1;
    window.__gameState.support = 40;
    window.__gameState.burnout = 78;
    window.__gameState.statusEffects = ['Burnout Spiral'];
    window.__gameState.pendingReview = true;
    window.__gameState.reviewResult = null;
    window.__gameState.actionsRemaining = 1;
    window.render();
  });

  await page.getByRole('button', { name: 'Draw more cards' }).click();
  await page.locator('#draw-support-btn').click();

  await expect(page.locator('#active-card')).toContainText('Burnout Spiral cleared');
  await expect(page.locator('#active-card')).toContainText('Burnout is back below 70');
  await expect(page.locator('#active-card')).toContainText('extra 5 Energy drain at the start of each turn has ended');
  await expect(page.locator('#status-badges')).not.toContainText('Burnout Spiral');
  await expect(page.locator('#stats')).toContainText('60 / 100');
});

test('gaining people drama shows effect and clearing guidance', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__gameState.stage = 3;
    window.__gameState.activeCard = {
      title: 'People drama test',
      text: 'Force a people-drama status gain.',
      agree: {
        label: 'Take the load',
        effects: {},
        status: 'People Drama',
        result: 'You take on the extra people load.'
      },
      decline: {
        label: 'Refuse',
        effects: {},
        result: 'No status gained.'
      },
      tags: []
    };
    window.__gameState.cardType = 'scenario';
    window.render();
  });

  await page.locator('#active-card .choice-buttons button').first().click();

  await expect(page.locator('#status-badges')).toContainText('People Drama');
  await expect(page.locator('#active-card')).toContainText('People Drama');
  await expect(page.locator('#active-card')).toContainText('adds 2 Burnout at the start of every turn');
  await expect(page.locator('#active-card')).toContainText('There is currently no direct support card that clears this status');
});

test('clearing office housework shows that the ongoing drain has ended', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__gameState.statusEffects = ['Office Housework'];
    window.__gameState.support = 40;
    window.__gameState.activeCard = null;
    window.__gameState.cardType = null;
    const targetTitle = 'Boundary Setting';
    const originalRandom = Math.random;
    const stageSupportDeck = window.getSupportDeckForStageForTest(0);
    const index = stageSupportDeck.findIndex((card) => card.title === targetTitle);
    Math.random = () => (index + 0.01) / stageSupportDeck.length;
    window.__restoreRandom = () => { Math.random = originalRandom; };
    window.render();
  });

  await page.locator('#draw-support-btn').click();
  await expect(page.locator('#active-card')).toContainText('Office Housework cleared');
  await expect(page.locator('#active-card')).toContainText('extra 2 Energy drain at the start of each turn has ended');
  await expect(page.locator('#active-card')).toContainText('Boundary Setting');
  await expect(page.locator('#status-badges')).not.toContainText('Office Housework');

  await page.evaluate(() => {
    window.__restoreRandom?.();
  });
});

test('clearing skill gap shows that the tech cred drain has ended', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__gameState.statusEffects = ['Skill Gap'];
    window.__gameState.support = 40;
    window.__gameState.activeCard = null;
    window.__gameState.cardType = null;
    const targetTitle = 'Foundations Reset';
    const originalRandom = Math.random;
    const stageSupportDeck = window.getSupportDeckForStageForTest(0);
    const index = stageSupportDeck.findIndex((card) => card.title === targetTitle);
    Math.random = () => (index + 0.01) / stageSupportDeck.length;
    window.__restoreRandom = () => { Math.random = originalRandom; };
    window.render();
  });

  await page.locator('#draw-support-btn').click();
  await expect(page.locator('#active-card')).toContainText('Skill Gap cleared');
  await expect(page.locator('#active-card')).toContainText('extra 1 Tech Cred loss at the start of each turn has ended');
  await expect(page.locator('#active-card')).toContainText('skill refresh support card');
  await expect(page.locator('#status-badges')).not.toContainText('Skill Gap');

  await page.evaluate(() => {
    window.__restoreRandom?.();
  });
});

test('clearing pigeonholed shows that the tech cred drain has ended', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__gameState.statusEffects = ['Pigeonholed'];
    window.__gameState.support = 40;
    window.__gameState.activeCard = null;
    window.__gameState.cardType = null;
    const targetTitle = 'Scope Reframe';
    const originalRandom = Math.random;
    const stageSupportDeck = window.getSupportDeckForStageForTest(0);
    const index = stageSupportDeck.findIndex((card) => card.title === targetTitle);
    Math.random = () => (index + 0.01) / stageSupportDeck.length;
    window.__restoreRandom = () => { Math.random = originalRandom; };
    window.render();
  });

  await page.locator('#draw-support-btn').click();
  await expect(page.locator('#active-card')).toContainText('Pigeonholed cleared');
  await expect(page.locator('#active-card')).toContainText('extra 1 Tech Cred loss at the start of each turn has ended');
  await expect(page.locator('#active-card')).toContainText('sponsorship or repositioning support card');
  await expect(page.locator('#status-badges')).not.toContainText('Pigeonholed');

  await page.evaluate(() => {
    window.__restoreRandom?.();
  });
});

test('open turn card does not duplicate the top draw buttons', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.render();
  });

  await expect(page.locator('#draw-scenario-btn')).toBeVisible();
  await expect(page.locator('#draw-support-btn')).toBeVisible();
  await expect(page.locator('#active-card')).toContainText('Choose your next move');
  await expect(page.locator('#active-card')).toContainText('Use the Draw scenario and Draw support buttons above');
  await expect(page.locator('#active-card')).toContainText('How to play');
  await expect(page.locator('#active-card')).toContainText('Draw scenario cards to face career moments');
  await expect(page.locator('#active-card button')).toHaveCount(0);
});

test('promotion review screen allows rolling now and drawing more cards before and after a failed review', async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0;
  });
  await page.goto('/');
  await page.evaluate(() => {
    window.__gameState.stage = 1;
    window.__gameState.techCred = 58;
    window.__gameState.support = 20;
    window.__gameState.burnout = 59;
    window.__gameState.stageProjectsCompleted = 3;
    window.__gameState.reviewResult = null;
    window.__gameState.pendingReview = true;
    window.render();
  });

  await expect(page.locator('#active-card')).toContainText('Promotion review');
  await expect(page.locator('#active-card .choice-buttons button')).toHaveCount(2);
  await expect(page.locator('#active-card .choice-buttons')).toContainText('Roll review');
  await expect(page.locator('#active-card .choice-buttons')).toContainText('Draw more cards');
  await expect(page.locator('#active-card')).toContainText('You can roll now, or wait and draw more cards on later turns');
  await expect(page.locator('#active-card')).toContainText('What counts right now');
  await expect(page.locator('#active-card')).toContainText('Base 8');
  await expect(page.locator('#active-card')).toContainText('Tech Cred +2');
  await expect(page.locator('#active-card')).toContainText('If you fail');

  await page.getByRole('button', { name: 'Draw more cards' }).click();
  await expect(page.locator('#active-card')).toContainText('Choose your next move');
  await expect(page.locator('#draw-scenario-btn')).toBeEnabled();
  await expect(page.locator('#draw-support-btn')).toBeEnabled();
  await expect(page.locator('#active-card button')).toHaveCount(0);

  await page.locator('#draw-scenario-btn').click();
  await expect(page.locator('#active-card h2')).not.toContainText('Choose your next move');
  await expect(page.locator('#active-card .choice-buttons button')).toHaveCount(2);

  await page.evaluate(() => {
    window.__gameState.pendingReview = true;
    window.__gameState.activeCard = null;
    window.__gameState.cardType = null;
    window.__gameState.actionsRemaining = 1;
    window.render();
  });
  await page.getByRole('button', { name: 'Roll review' }).click();
  await expect(page.locator('#active-card')).toContainText('review failed');
  await expect(page.locator('#active-card')).toContainText('Total 11 vs target 15');
  await expect(page.locator('#active-card .choice-buttons')).toContainText('Next turn');
  await expect(page.locator('#active-card .choice-buttons')).toContainText('Draw more cards');

  await page.getByRole('button', { name: 'Draw more cards' }).click();
  await expect(page.locator('#active-card')).toContainText('Choose your next move');
  await expect(page.locator('#draw-scenario-btn')).toBeEnabled();
  await expect(page.locator('#draw-support-btn')).toBeEnabled();
  await expect(page.locator('#active-card button')).toHaveCount(0);

  await page.evaluate(() => {
    window.__gameState.pendingReview = true;
    window.render();
  });
  await expect(page.locator('#active-card')).toContainText('Promotion review');
  await expect(page.locator('#active-card')).toContainText('Roll review');
});

test('advancing from junior hunt shows a promotion announcement on the next move card', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.render();
  });

  await expect(page.getByRole('button', { name: 'Advance stage' })).toBeEnabled();
  await expect(page.locator('#stage-title')).toContainText('1. Junior Hunt');

  await page.getByRole('button', { name: 'Advance stage' }).click();
  await expect(page.locator('#stage-title')).toContainText('2. Senior Promotion');
  await expect(page.locator('#active-card')).toContainText('Choose your next move');
  await expect(page.locator('#active-card')).toContainText('Congratulations');
  await expect(page.locator('#active-card')).toContainText('Junior Hunt into Senior Promotion');
  await expect(page.locator('#draw-scenario-btn')).toBeEnabled();
  await page.locator('#draw-scenario-btn').click();
  await expect(page.locator('#active-card h2')).not.toContainText('Choose your next move');
  await expect(page.locator('#active-card .choice-buttons button')).toHaveCount(2);

  await page.evaluate(() => {
    window.__gameState.stage = 5;
    window.__gameState.stageAdvanceAnnouncement = null;
    window.__gameState.activeCard = null;
    window.__gameState.cardType = null;
    window.__gameState.actionsRemaining = 1;
    window.render();
  });
  await page.getByRole('button', { name: 'Advance stage' }).click();
  await expect(page.locator('#stage-title')).toContainText('1. Junior Hunt');
});

test('advancing into leadership leap leaves top draw buttons usable', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__gameState.stage = 1;
    window.__gameState.activeCard = null;
    window.__gameState.cardType = null;
    window.__gameState.actionsRemaining = 1;
    window.__gameState.stageAdvanceAnnouncement = null;
    window.render();
  });

  await page.getByRole('button', { name: 'Advance stage' }).click();
  await expect(page.locator('#stage-title')).toContainText('3. Leadership Leap');
  await expect(page.locator('#active-card')).toContainText('Choose your next move');
  await expect(page.locator('#draw-scenario-btn')).toBeEnabled();
  await expect(page.locator('#draw-support-btn')).toBeEnabled();
  await page.locator('#draw-support-btn').click();
  await expect(page.locator('#active-card h2')).not.toContainText('Choose your next move');
});

test('management-track review pass should advance into maternity leave with usable draw buttons', async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0.99;
  });
  await page.goto('/');
  await page.evaluate(() => {
    window.__gameState.stage = 3;
    window.__gameState.techCred = 177;
    window.__gameState.support = 40;
    window.__gameState.burnout = 20;
    window.__gameState.stageProjectsCompleted = 4;
    window.__gameState.pendingReview = true;
    window.__gameState.reviewResult = null;
    window.__gameState.activeCard = null;
    window.__gameState.cardType = null;
    window.__gameState.actionsRemaining = 1;
    window.render();
  });

  await page.getByRole('button', { name: 'Roll review' }).click();
  await expect(page.locator('#stage-title')).toContainText('5. Maternity Leave');
  await expect(page.locator('#active-card')).toContainText('Choose your next move');
  await expect(page.locator('#draw-scenario-btn')).toBeEnabled();
  await page.locator('#draw-scenario-btn').click();
  await expect(page.locator('#active-card h2')).not.toContainText('Choose your next move');
});


test('entering maternity leave does not grant the usual stage energy bump and keeps draw buttons usable', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__gameState.stage = 3;
    window.__gameState.energy = 40;
    window.__gameState.activeCard = null;
    window.__gameState.cardType = null;
    window.__gameState.actionsRemaining = 1;
    window.__gameState.stageAdvanceAnnouncement = null;
    window.render();
  });

  await page.getByRole('button', { name: 'Advance stage' }).click();
  await expect(page.locator('#stage-title')).toContainText('5. Maternity Leave');
  await expect(page.locator('#goal-text')).toContainText('Complete 2 projects');
  await expect(page.locator('#stats')).toContainText('Energy');
  await expect(page.locator('#stats')).toContainText('40 / 100');
  await expect(page.locator('#active-card')).toContainText('Choose your next move');
  await expect(page.locator('#draw-scenario-btn')).toBeEnabled();
  await page.locator('#draw-scenario-btn').click();
  await expect(page.locator('#active-card h2')).not.toContainText('Choose your next move');
});

test('final-stage review pass should go straight to the ending screen', async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0.99;
  });
  await page.goto('/');
  await page.evaluate(() => {
    window.__gameState.stage = 5;
    window.__gameState.techCred = 220;
    window.__gameState.support = 40;
    window.__gameState.burnout = 20;
    window.__gameState.stageProjectsCompleted = 3;
    window.__gameState.pendingReview = true;
    window.__gameState.reviewResult = null;
    window.__gameState.activeCard = null;
    window.__gameState.cardType = null;
    window.__gameState.actionsRemaining = 1;
    window.render();
  });

  await page.getByRole('button', { name: 'Roll review' }).click();
  await expect(page.locator('#active-card')).toContainText('CTO ending');
  await expect(page.locator('#active-card')).toContainText('Final state');
});















































































































































































































































































































































































































































































































































test('advancing into the default caretaker leaves top draw buttons usable', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__gameState.stage = 4;
    window.__gameState.activeCard = null;
    window.__gameState.cardType = null;
    window.__gameState.actionsRemaining = 1;
    window.__gameState.stageAdvanceAnnouncement = null;
    window.render();
  });

  await page.getByRole('button', { name: 'Advance stage' }).click();
  await expect(page.locator('#stage-title')).toContainText('6. The Default Caretaker');
  await expect(page.locator('#active-card')).toContainText('Choose your next move');
  await expect(page.locator('#draw-support-btn')).toBeEnabled();
  await page.locator('#draw-support-btn').click();
  await expect(page.locator('#active-card h2')).not.toContainText('Choose your next move');
});

test('senior-promotion review pass should advance into leadership leap with usable draw buttons', async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0.99;
  });
  await page.goto('/');
  await page.evaluate(() => {
    window.__gameState.stage = 1;
    window.__gameState.techCred = 87;
    window.__gameState.support = 40;
    window.__gameState.burnout = 20;
    window.__gameState.stageProjectsCompleted = 3;
    window.__gameState.pendingReview = true;
    window.__gameState.reviewResult = null;
    window.__gameState.activeCard = null;
    window.__gameState.cardType = null;
    window.__gameState.actionsRemaining = 1;
    window.render();
  });

  await page.getByRole('button', { name: 'Roll review' }).click();
  await expect(page.locator('#stage-title')).toContainText('3. Leadership Leap');
  await expect(page.locator('#active-card')).toContainText('Choose your next move');
  await expect(page.locator('#draw-scenario-btn')).toBeEnabled();
  await page.locator('#draw-scenario-btn').click();
  await expect(page.locator('#active-card h2')).not.toContainText('Choose your next move');
});



test('review follow-up draw-more path still re-enables top draw buttons', async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0;
  });
  await page.goto('/');
  await page.evaluate(() => {
    window.__gameState.stage = 1;
    window.__gameState.techCred = 58;
    window.__gameState.support = 20;
    window.__gameState.burnout = 59;
    window.__gameState.stageProjectsCompleted = 3;
    window.__gameState.reviewResult = null;
    window.__gameState.pendingReview = true;
    window.render();
  });

  await expect(page.locator('#active-card')).toContainText('Promotion review');
  await expect(page.locator('#active-card .choice-buttons button')).toHaveCount(2);
  await expect(page.locator('#active-card .choice-buttons')).toContainText('Roll review');
  await expect(page.locator('#active-card .choice-buttons')).toContainText('Draw more cards');
  await expect(page.locator('#active-card')).toContainText('You can roll now, or wait and draw more cards on later turns');
  await expect(page.locator('#active-card')).toContainText('What counts right now');
  await expect(page.locator('#active-card')).toContainText('Base 8');
  await expect(page.locator('#active-card')).toContainText('Tech Cred +2');
  await expect(page.locator('#active-card')).toContainText('If you fail');

  await page.getByRole('button', { name: 'Draw more cards' }).click();
  await expect(page.locator('#active-card')).toContainText('Choose your next move');
  await expect(page.locator('#draw-scenario-btn')).toBeEnabled();
  await expect(page.locator('#draw-support-btn')).toBeEnabled();
  await expect(page.locator('#active-card button')).toHaveCount(0);

  await page.locator('#draw-scenario-btn').click();
  await expect(page.locator('#active-card h2')).not.toContainText('Choose your next move');
  await expect(page.locator('#active-card .choice-buttons button')).toHaveCount(2);

  await page.evaluate(() => {
    window.__gameState.pendingReview = true;
    window.__gameState.activeCard = null;
    window.__gameState.cardType = null;
    window.__gameState.actionsRemaining = 1;
    window.render();
  });
  await page.getByRole('button', { name: 'Roll review' }).click();
  await expect(page.locator('#active-card')).toContainText('review failed');
  await expect(page.locator('#active-card')).toContainText('Total 11 vs target 15');
  await expect(page.locator('#active-card .choice-buttons')).toContainText('Next turn');
  await expect(page.locator('#active-card .choice-buttons')).toContainText('Draw more cards');

  await page.getByRole('button', { name: 'Draw more cards' }).click();
  await expect(page.locator('#active-card')).toContainText('Choose your next move');
  await expect(page.locator('#draw-scenario-btn')).toBeEnabled();
  await expect(page.locator('#draw-support-btn')).toBeEnabled();
  await expect(page.locator('#active-card button')).toHaveCount(0);

  await page.evaluate(() => {
    window.__gameState.pendingReview = true;
    window.render();
  });
  await expect(page.locator('#active-card')).toContainText('Promotion review');
  await expect(page.locator('#active-card')).toContainText('Roll review');
});



