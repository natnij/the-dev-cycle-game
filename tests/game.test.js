import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STAGES,
  SCENARIO_DECKS,
  PROJECT_SCENARIOS,
  SUPPORT_DECK,
  SUPPORT_DECKS,
  BURNOUT_SPIRAL_STATUS,
  BURNOUT_SPIRAL_THRESHOLD,
  BURNOUT_SPIRAL_RECOVERY,
  STATUS_EXPLANATIONS,
  createStatusAnnouncement,
  createInitialState,
  applyEffects,
  spendAction,
  addStatus,
  removeStatus,
  maybeApplyPassiveStatuses,
  checkRequirementsForStage,
  rollReview,
  checkGameState,
  startNextTurn,
  getProjectScenarioChance,
  getProjectScenarioDeckForTier,
  getSupportDeckForStage,
  getSupportCardForStatus,
  getResolvedSupportEffects,
  getSupportStatusRemoval,
  getReviewModifiers,
  syncBurnoutSpiralStatus,
  drawScenarioCard
} from '../game.js';

test('creates the initial game state', () => {
  const state = createInitialState();
  assert.equal(state.stage, 0);
  assert.equal(state.energy, 40);
  assert.equal(state.actionsRemaining, 2);
  assert.equal(state.log.length, 1);
  assert.deepEqual(state.usedScenarioTitles, []);
});

test('applyEffects clamps numeric stats', () => {
  const state = createInitialState();
  applyEffects(state, { burnout: 150, energy: -100, techCred: -500, support: -500, workFront: 200, homeFront: -200 });
  assert.equal(state.burnout, 100);
  assert.equal(state.energy, 0);
  assert.equal(state.techCred, -25);
  assert.equal(state.support, -10);
  assert.equal(state.workFront, 100);
  assert.equal(state.homeFront, 0);
});

test('spendAction consumes available actions', () => {
  const state = createInitialState();
  assert.equal(spendAction(state), true);
  assert.equal(state.actionsRemaining, 1);
  assert.equal(spendAction(state, 2), false);
});

test('status effects can be added and removed', () => {
  const state = createInitialState();
  addStatus(state, 'Office Housework');
  assert.deepEqual(state.statusEffects, ['Office Housework']);
  removeStatus(state, 'Office Housework');
  assert.deepEqual(state.statusEffects, []);
});

test('passive statuses modify state on next turn', () => {
  const state = createInitialState();
  addStatus(state, 'Office Housework');
  addStatus(state, 'The Glue');
  maybeApplyPassiveStatuses(state);
  assert.equal(state.energy, 37);
  assert.equal(state.support, 22);
});

test('burnout spiral status activates at the threshold', () => {
  const state = createInitialState();
  state.burnout = BURNOUT_SPIRAL_THRESHOLD;

  const change = syncBurnoutSpiralStatus(state);

  assert.equal(change, 'gained');
  assert.equal(state.statusEffects.includes(BURNOUT_SPIRAL_STATUS), true);
});

test('burnout spiral status clears once burnout drops below threshold', () => {
  const state = createInitialState();
  addStatus(state, BURNOUT_SPIRAL_STATUS);
  state.burnout = BURNOUT_SPIRAL_THRESHOLD - 1;

  const change = syncBurnoutSpiralStatus(state);

  assert.equal(change, 'cleared');
  assert.equal(state.statusEffects.includes(BURNOUT_SPIRAL_STATUS), false);
});

test('burnout spiral drains 5 energy each turn', () => {
  const state = createInitialState();
  addStatus(state, BURNOUT_SPIRAL_STATUS);

  maybeApplyPassiveStatuses(state);

  assert.equal(state.energy, 35);
});

test('each stage has a support card that clears burnout spiral at recovery target', () => {
  STAGES.forEach((stage, index) => {
    const card = getSupportCardForStatus(index, BURNOUT_SPIRAL_STATUS);
    assert.equal(Boolean(card), true, `${stage.name} should have a burnout recovery card`);

    const state = createInitialState();
    state.burnout = BURNOUT_SPIRAL_THRESHOLD + 12;
    addStatus(state, BURNOUT_SPIRAL_STATUS);
    const resolvedEffects = getResolvedSupportEffects(card, state);
    applyEffects(state, resolvedEffects);
    removeStatus(state, card.removeStatus);
    syncBurnoutSpiralStatus(state);

    assert.equal(state.burnout, BURNOUT_SPIRAL_RECOVERY);
    assert.equal(state.statusEffects.includes(BURNOUT_SPIRAL_STATUS), false);
  });
});

test('stage three burnout recovery support card drops burnout to recovery target', () => {
  const state = createInitialState();
  state.stage = 3;
  state.burnout = 82;
  addStatus(state, BURNOUT_SPIRAL_STATUS);
  const card = getSupportCardForStatus(3, BURNOUT_SPIRAL_STATUS);

  const resolvedEffects = getResolvedSupportEffects(card, state);
  applyEffects(state, resolvedEffects);
  removeStatus(state, card.removeStatus);
  syncBurnoutSpiralStatus(state);

  assert.equal(state.burnout, BURNOUT_SPIRAL_RECOVERY);
  assert.equal(state.statusEffects.includes(BURNOUT_SPIRAL_STATUS), false);
});

test('promotion review failure at high burnout can trigger burnout spiral', () => {
  const state = createInitialState();
  state.stage = 1;
  state.techCred = 58;
  state.support = 0;
  state.burnout = 60;

  rollReview(state, 1);
  const change = syncBurnoutSpiralStatus(state);

  assert.equal(change, 'gained');
  assert.equal(state.statusEffects.includes(BURNOUT_SPIRAL_STATUS), true);
});

test('burnout recovery support cards still carry status removal metadata', () => {
  STAGES.forEach((stage, index) => {
    const card = getSupportCardForStatus(index, BURNOUT_SPIRAL_STATUS);
    assert.equal(card?.removeStatus, BURNOUT_SPIRAL_STATUS, `${stage.name} should remove burnout spiral`);
  });
});

test('each stage has support cards that clear skill gap and pigeonholed', () => {
  STAGES.forEach((stage, index) => {
    const skillGapCard = getSupportCardForStatus(index, 'Skill Gap');
    const pigeonholedCard = getSupportCardForStatus(index, 'Pigeonholed');

    assert.equal(Boolean(skillGapCard), true, `${stage.name} should have a skill gap recovery card`);
    assert.equal(Boolean(pigeonholedCard), true, `${stage.name} should have a pigeonholed recovery card`);
    assert.equal(skillGapCard?.removeStatus, 'Skill Gap');
    assert.equal(pigeonholedCard?.removeStatus, 'Pigeonholed');
  });
});

test('support cards can clear skill gap and pigeonholed statuses', () => {
  const state = createInitialState();
  addStatus(state, 'Skill Gap');
  addStatus(state, 'Pigeonholed');

  removeStatus(state, getSupportCardForStatus(0, 'Skill Gap').removeStatus);
  removeStatus(state, getSupportCardForStatus(0, 'Pigeonholed').removeStatus);

  assert.equal(state.statusEffects.includes('Skill Gap'), false);
  assert.equal(state.statusEffects.includes('Pigeonholed'), false);
});


test('burnout recovery support card can coexist with support draw cost rules', () => {
  const state = createInitialState();
  state.burnout = 78;
  addStatus(state, BURNOUT_SPIRAL_STATUS);
  const card = getSupportCardForStatus(0, BURNOUT_SPIRAL_STATUS);

  const resolvedEffects = getResolvedSupportEffects(card, state);

  assert.equal(resolvedEffects.support, -15);
  assert.equal(resolvedEffects.burnout, BURNOUT_SPIRAL_RECOVERY - 78);
});

test('burnout spiral threshold constant is 70 with recovery at 60', () => {
  assert.equal(BURNOUT_SPIRAL_THRESHOLD, 70);
  assert.equal(BURNOUT_SPIRAL_RECOVERY, 60);
});

test('burnout spiral does not re-trigger when already active above threshold', () => {
  const state = createInitialState();
  addStatus(state, BURNOUT_SPIRAL_STATUS);
  state.burnout = 85;

  const change = syncBurnoutSpiralStatus(state);

  assert.equal(change, null);
});

test('burnout spiral does not clear while burnout remains at threshold', () => {
  const state = createInitialState();
  addStatus(state, BURNOUT_SPIRAL_STATUS);
  state.burnout = BURNOUT_SPIRAL_THRESHOLD;

  const change = syncBurnoutSpiralStatus(state);

  assert.equal(change, null);
  assert.equal(state.statusEffects.includes(BURNOUT_SPIRAL_STATUS), true);
});

test('burnout spiral recovery support cards are present in the flattened support deck', () => {
  assert.equal(SUPPORT_DECK.some((card) => card.removeStatus === BURNOUT_SPIRAL_STATUS), true);
});

test('burnout spiral passive drain stacks with office housework', () => {
  const state = createInitialState();
  addStatus(state, 'Office Housework');
  addStatus(state, BURNOUT_SPIRAL_STATUS);

  maybeApplyPassiveStatuses(state);

  assert.equal(state.energy, 33);
});

test('burnout spiral status can be removed manually before sync confirms recovery', () => {
  const state = createInitialState();
  addStatus(state, BURNOUT_SPIRAL_STATUS);
  state.burnout = BURNOUT_SPIRAL_RECOVERY;
  removeStatus(state, BURNOUT_SPIRAL_STATUS);

  const change = syncBurnoutSpiralStatus(state);

  assert.equal(change, null);
  assert.equal(state.statusEffects.includes(BURNOUT_SPIRAL_STATUS), false);
});

test('burnout spiral support recovery leaves burnout below leadership stage burnout cap', () => {
  const state = createInitialState();
  state.stage = 2;
  state.burnout = 90;
  addStatus(state, BURNOUT_SPIRAL_STATUS);
  const card = getSupportCardForStatus(2, BURNOUT_SPIRAL_STATUS);

  const resolvedEffects = getResolvedSupportEffects(card, state);
  applyEffects(state, resolvedEffects);
  removeStatus(state, card.removeStatus);
  syncBurnoutSpiralStatus(state);

  assert.equal(state.burnout < 75, true);
});

test('burnout spiral support recovery can restore an advance-eligible burnout level', () => {
  const state = createInitialState();
  state.stage = 2;
  state.techCred = STAGES[2].threshold;
  state.stageProjectsCompleted = STAGES[2].projectsRequired;
  state.burnout = 82;
  addStatus(state, BURNOUT_SPIRAL_STATUS);
  const card = getSupportCardForStatus(2, BURNOUT_SPIRAL_STATUS);

  const resolvedEffects = getResolvedSupportEffects(card, state);
  applyEffects(state, resolvedEffects);
  removeStatus(state, card.removeStatus);
  syncBurnoutSpiralStatus(state);

  assert.equal(checkRequirementsForStage(state), true);
});

test('burnout spiral support recovery effect targets the same 60 burnout across stages', () => {
  STAGES.forEach((stage, index) => {
    const state = createInitialState();
    state.burnout = 88;
    const card = getSupportCardForStatus(index, BURNOUT_SPIRAL_STATUS);
    const resolvedEffects = getResolvedSupportEffects(card, state);
    assert.equal(state.burnout + resolvedEffects.burnout, BURNOUT_SPIRAL_RECOVERY, `${stage.name} should recover to 60 burnout`);
  });
});

test('any support draw while burnout spiral is active can clear it down to 60', () => {
  const state = createInitialState();
  state.stage = 1;
  state.burnout = 78;
  addStatus(state, BURNOUT_SPIRAL_STATUS);
  const card = getSupportDeckForStage(1)[0];

  const resolvedEffects = getResolvedSupportEffects(card, state);
  applyEffects(state, resolvedEffects);
  removeStatus(state, getSupportStatusRemoval(card, state));
  syncBurnoutSpiralStatus(state);

  assert.equal(state.burnout, BURNOUT_SPIRAL_RECOVERY);
  assert.equal(state.statusEffects.includes(BURNOUT_SPIRAL_STATUS), false);
});

test('burnout spiral activation does not alter unrelated stats directly', () => {
  const state = createInitialState();
  state.techCred = 12;
  state.support = 18;
  state.energy = 31;
  state.burnout = BURNOUT_SPIRAL_THRESHOLD;

  syncBurnoutSpiralStatus(state);

  assert.equal(state.techCred, 12);
  assert.equal(state.support, 18);
  assert.equal(state.energy, 31);
});

test('burnout spiral can be present alongside other statuses', () => {
  const state = createInitialState();
  addStatus(state, 'Office Housework');
  state.burnout = BURNOUT_SPIRAL_THRESHOLD;

  syncBurnoutSpiralStatus(state);

  assert.equal(state.statusEffects.includes('Office Housework'), true);
  assert.equal(state.statusEffects.includes(BURNOUT_SPIRAL_STATUS), true);
});

test('burnout spiral recovery cards are stage-specific support options', () => {
  assert.equal(getSupportDeckForStage(0).some((card) => card.removeStatus === BURNOUT_SPIRAL_STATUS), true);
  assert.equal(getSupportDeckForStage(5).some((card) => card.removeStatus === BURNOUT_SPIRAL_STATUS), true);
});

test('burnout spiral activation after passive burnout growth can be detected by sync', () => {
  const state = createInitialState();
  addStatus(state, 'People Drama');
  state.burnout = 68;

  maybeApplyPassiveStatuses(state);
  const change = syncBurnoutSpiralStatus(state);

  assert.equal(state.burnout, 70);
  assert.equal(change, 'gained');
});

test('burnout spiral cleared state stays cleared below threshold across later syncs', () => {
  const state = createInitialState();
  addStatus(state, BURNOUT_SPIRAL_STATUS);
  state.burnout = 40;

  syncBurnoutSpiralStatus(state);
  const second = syncBurnoutSpiralStatus(state);

  assert.equal(second, null);
  assert.equal(state.statusEffects.includes(BURNOUT_SPIRAL_STATUS), false);
});

test('burnout spiral support recovery cards preserve other stage support deck variety', () => {
  STAGES.forEach((stage, index) => {
    assert.equal(getSupportDeckForStage(index).length >= 7, true, `${stage.name} should still have a full support deck`);
  });
});

test('stage requirements depend on threshold and project count', () => {
  const state = createInitialState();
  state.techCred = STAGES[0].threshold;
  state.stageProjectsCompleted = STAGES[0].projectsRequired;
  assert.equal(checkRequirementsForStage(state), true);
});

test('stage project requirements match the intended progression', () => {
  assert.equal(STAGES[0].projectsRequired, 2);
  assert.equal(STAGES[1].projectsRequired, 3);
  assert.equal(STAGES[2].projectsRequired, 3);
  assert.equal(STAGES[3].projectsRequired, 4);
  assert.equal(STAGES[4].projectsRequired, 2);
  assert.equal(STAGES[5].projectsRequired, 3);
});

test('maternity leave stage goal reflects the lower project requirement', () => {
  assert.match(STAGES[4].goal, /Complete 2 projects/);
});

test('maternity leave scenarios keep high burnout, energy, or tech cred penalties', () => {
  SCENARIO_DECKS[4].forEach((card) => {
    const choices = [card.agree, card.decline];
    const hasHighPenalty = choices.some((choice) => {
      const effects = choice.effects ?? {};
      return (effects.burnout ?? 0) >= 9 || (effects.energy ?? 0) <= -7 || (effects.techCred ?? 0) <= -7;
    });

    assert.equal(hasHighPenalty, true, `${card.title} should keep a high stage-5 penalty profile`);
  });
});

test('scenario choices expose short summaries for the UI', () => {
  assert.equal(typeof SCENARIO_DECKS[1][1].agree.summary, 'string');
  assert.equal(SCENARIO_DECKS[1][1].agree.summary, 'Bring concrete evidence of your impact into the calibration discussion.');
  assert.equal(typeof PROJECT_SCENARIOS[0].decline.summary, 'string');
});

test('scenario decks include multiple recovery choices that lower burnout and raise energy', () => {
  const recoveryChoices = Object.values(SCENARIO_DECKS)
    .flatMap((deck) => deck)
    .flatMap((card) => [card.agree, card.decline])
    .filter((choice) => (choice.effects?.burnout ?? 0) < 0 && (choice.effects?.energy ?? 0) > 0);

  assert.equal(recoveryChoices.length >= 4, true);
});

test('scenario recovery choices carry balancing downsides', () => {
  const recoveryChoices = Object.values(SCENARIO_DECKS)
    .flatMap((deck) => deck)
    .flatMap((card) => [card.agree, card.decline])
    .filter((choice) => (choice.effects?.burnout ?? 0) < 0 && (choice.effects?.energy ?? 0) > 0);

  assert.equal(recoveryChoices.every((choice) => (choice.effects?.techCred ?? 0) < 0 || (choice.effects?.support ?? 0) < 0), true);
});

test('status explanations describe ongoing effects and clearing guidance', () => {
  assert.equal(STATUS_EXPLANATIONS['People Drama'].active, 'This adds 2 Burnout at the start of every turn.');
  assert.equal(STATUS_EXPLANATIONS['The Glue'].active, 'This adds 2 Support and drains 1 Energy at the start of every turn.');
  assert.match(STATUS_EXPLANATIONS['The Glue'].removal, /boundary|delegation|load-shedding/i);
  assert.match(STATUS_EXPLANATIONS['The Glue'].clear, /1 Energy drain/);
  assert.match(STATUS_EXPLANATIONS['Office Housework'].removal, /Boundary Setting/);
  assert.match(STATUS_EXPLANATIONS[BURNOUT_SPIRAL_STATUS].removal, /below 70/);
});

 test('each stage has a support card that clears the glue status', () => {
  STAGES.forEach((stage, index) => {
    const glueCard = getSupportCardForStatus(index, 'The Glue');

    assert.equal(Boolean(glueCard), true, `${stage.name} should have a glue-clearing support card`);
    assert.equal(glueCard?.removeStatus, 'The Glue');
  });
});

 test('support cards can clear the glue status', () => {
  const state = createInitialState();
  addStatus(state, 'The Glue');

  removeStatus(state, getSupportCardForStatus(0, 'The Glue').removeStatus);

  assert.equal(state.statusEffects.includes('The Glue'), false);
});

 test('glue passive support gain and energy drain stack together', () => {
  const state = createInitialState();
  addStatus(state, 'The Glue');

  maybeApplyPassiveStatuses(state);

  assert.equal(state.support, 22);
  assert.equal(state.energy, 39);
});

 test('glue-clearing support cards are present in every support deck', () => {
  STAGES.forEach((stage, index) => {
    assert.equal(getSupportDeckForStage(index).some((card) => card.removeStatus === 'The Glue'), true, `${stage.name} should include a glue-clearing card`);
  });
});

 test('status announcement helper builds glue gain and clear messages', () => {
  const gained = createStatusAnnouncement('The Glue', 'gained');
  const cleared = createStatusAnnouncement('The Glue', 'cleared');

  assert.match(gained.text, /adds 2 Support and drains 1 Energy/);
  assert.match(cleared.text, /2 Support gain and 1 Energy drain/);
});

 test('glue-clearing support cards remain repeatable because support draws are with replacement', () => {
  assert.equal(SUPPORT_DECK.some((card) => card.removeStatus === 'The Glue'), true);
});

 test('glue passive drain stacks with office housework', () => {
  const state = createInitialState();
  addStatus(state, 'Office Housework');
  addStatus(state, 'The Glue');

  maybeApplyPassiveStatuses(state);

  assert.equal(state.energy, 37);
  assert.equal(state.support, 22);
});

 test('glue passive gain respects support floor and ceiling handling', () => {
  const state = createInitialState();
  addStatus(state, 'The Glue');
  state.support = 99;

  maybeApplyPassiveStatuses(state);

  assert.equal(state.support, 100);
});

 test('glue passive drain respects energy floor handling', () => {
  const state = createInitialState();
  addStatus(state, 'The Glue');
  state.energy = 0;

  maybeApplyPassiveStatuses(state);

  assert.equal(state.energy, 0);
});

 test('glue-clearing support lookup coexists with other removable statuses', () => {
  const stageZeroStatuses = ['The Glue', 'Skill Gap', 'Pigeonholed', BURNOUT_SPIRAL_STATUS];

  stageZeroStatuses.forEach((status) => {
    assert.equal(Boolean(getSupportCardForStatus(0, status)), true, `stage 0 should have support for ${status}`);
  });
});

test('status announcement helper builds gained and cleared messages', () => {
  const gained = createStatusAnnouncement('People Drama', 'gained');
  const cleared = createStatusAnnouncement('Office Housework', 'cleared');

  assert.equal(gained.title, 'People Drama');
  assert.match(gained.text, /adds 2 Burnout/);
  assert.match(gained.text, /how to get rid of it|Clear it|There is currently no direct support card/i);
  assert.equal(cleared.title, 'Office Housework cleared');
  assert.match(cleared.text, /extra 2 Energy drain/);
});


test('promotion review can pass with strong stats', () => {
  const state = createInitialState();
  state.stage = 1;
  state.techCred = 60;
  state.support = 45;
  const result = rollReview(state, 6);
  assert.equal(result.passed, true);
});

test('review modifiers add extra tech and project draw bonuses when thresholds are met', () => {
  const state = createInitialState();
  state.stage = 1;
  state.techCred = 187;
  state.support = 40;

  const modifiers = getReviewModifiers(state);

  assert.equal(modifiers.techBonus, 2);
  assert.equal(modifiers.extraTechBonus, 2);
  assert.equal(modifiers.supportBonus, 2);
  assert.equal(modifiers.projectDrawBonus, 2);
  assert.equal(modifiers.projectDrawPercent >= 70, true);
});

test('promotion review failure increases burnout', () => {
  const state = createInitialState();
  state.stage = 1;
  state.techCred = 58;
  state.support = 0;
  state.burnout = 60;
  const result = rollReview(state, 1);
  assert.equal(result.passed, false);
  assert.equal(state.burnout, 70);
});

test('promotion review failure leaves the player below the updated stage project requirement', () => {
  const state = createInitialState();
  state.stage = 1;
  state.techCred = 58;
  state.support = 0;
  state.burnout = 60;
  state.stageProjectsCompleted = 0;

  const result = rollReview(state, 1);

  assert.equal(result.total, 9);
  assert.equal(result.target, 15);
  assert.equal(result.passed, false);
  assert.equal(state.pendingReview, false);
  assert.equal(state.reviewResult.passed, false);
  assert.equal(checkRequirementsForStage(state), false);
});


test('energy at zero ends the game immediately', () => {
  const state = createInitialState();
  state.energy = 0;
  state.actionsRemaining = 2;

  checkGameState(state);

  assert.equal(state.gameOver, true);
  assert.equal(state.ending, 'Exhaustion');
});

test('balance stage collapse ends the game', () => {
  const state = createInitialState();
  state.stage = 5;
  state.workFront = 0;
  checkGameState(state);
  assert.equal(state.gameOver, true);
  assert.equal(state.ending, 'Balance Collapse');
});

test('next turn resets actions when exhausted', () => {
  const state = createInitialState();
  state.energy = 43;
  state.actionsRemaining = 0;
  const advanced = startNextTurn(state);
  assert.equal(advanced, true);
  assert.equal(state.actionsRemaining, 2);
  assert.equal(state.turn, 2);
  assert.equal(state.energy, 43);
});

test('project scenario chance rises with tech cred', () => {
  assert.equal(Number(getProjectScenarioChance(0).toFixed(2)), 0.14);
  assert.equal(Number(getProjectScenarioChance(20).toFixed(2)), 0.20);
  assert.equal(Number(getProjectScenarioChance(50).toFixed(2)), 0.29);
  assert.equal(Number(getProjectScenarioChance(200).toFixed(2)), 0.74);
});

test('drawScenarioCard can return a normal scenario', () => {
  const state = createInitialState();
  const card = drawScenarioCard(state, 0.9, 0.2, 0);
  assert.equal(card.isProjectScenario, false);
  assert.equal(card.kind, 'Scenario');
  assert.equal(card.title, 'The Coffee Mistake');
});

test('drawScenarioCard biases toward higher-tier project scenarios at high tech cred', () => {
  const state = createInitialState();
  state.techCred = 150;
  const tierThreeTitles = getProjectScenarioDeckForTier(3).map((card) => card.title);
  const card = drawScenarioCard(state, 0.1, 0.2, 0.99);
  assert.equal(card.isProjectScenario, true);
  assert.equal(card.projectTier, 3);
  assert.equal(card.kind, 'Project Scenario');
  assert.equal(tierThreeTitles.includes(card.title), true);
});


test('project scenario choices can satisfy project progression', () => {
  const state = createInitialState();
  state.stageProjectsCompleted = 1;
  state.techCred = 20;
  const card = drawScenarioCard(state, 0.1, 0.1, 0);
  applyEffects(state, card.agree.effects);
  state.projectsCompleted += 1;
  state.stageProjectsCompleted += 1;
  assert.equal(checkRequirementsForStage(state), true);
});

test('each stage deck has expanded beyond the original baseline size', () => {
  assert.equal(SCENARIO_DECKS[0].length > 8, true);
  assert.equal(SCENARIO_DECKS[1].length > 7, true);
  assert.equal(SCENARIO_DECKS[2].length > 7, true);
  assert.equal(SCENARIO_DECKS[3].length > 6, true);
  assert.equal(SCENARIO_DECKS[4].length > 6, true);
  assert.equal(SCENARIO_DECKS[5].length > 7, true);
});

test('each project tier now has multiple cards available', () => {
  assert.equal(getProjectScenarioDeckForTier(1).length >= 5, true);
  assert.equal(getProjectScenarioDeckForTier(2).length >= 7, true);
  assert.equal(getProjectScenarioDeckForTier(3).length >= 4, true);
});

test('scenario draws stay globally unique across stage changes within one run', () => {
  const state = createInitialState();

  const first = drawScenarioCard(state, 0.9, 0.2, 0);
  assert.equal(first.title, 'The Coffee Mistake');

  state.stage = 1;
  state.usedScenarioTitles.push('Calibration Meeting');

  const second = drawScenarioCard(state, 0.9, 0.2, 0);
  assert.notEqual(second.title, 'Calibration Meeting');
  assert.deepEqual(state.usedScenarioTitles, ['The Coffee Mistake', 'Calibration Meeting', 'Stalled Promotion']);
});

test('drawScenarioCard returns null when every normal and project scenario has been used across stages', () => {
  const state = createInitialState();
  state.stage = 5;
  state.techCred = 200;
  state.usedScenarioTitles = [
    ...Object.values(SCENARIO_DECKS).flat().map((card) => card.title),
    ...PROJECT_SCENARIOS.map((card) => card.title)
  ];

  const card = drawScenarioCard(state, 0.1, 0.5, 0.5);

  assert.equal(card, null);
});

test('drawing a normal scenario does not change tracked stats before choice', () => {
  const state = createInitialState();
  const before = {
    techCred: state.techCred,
    energy: state.energy,
    support: state.support,
    burnout: state.burnout
  };

  const card = drawScenarioCard(state, 0.9, 0.2, 0);

  assert.equal(card.isProjectScenario, false);
  assert.deepEqual(
    {
      techCred: state.techCred,
      energy: state.energy,
      support: state.support,
      burnout: state.burnout
    },
    before
  );
  assert.deepEqual(state.usedScenarioTitles, ['The Coffee Mistake']);
});

test('drawing a project scenario does not change tracked stats before choice', () => {
  const state = createInitialState();
  const before = {
    techCred: state.techCred,
    energy: state.energy,
    support: state.support,
    burnout: state.burnout
  };

  const card = drawScenarioCard(state, 0.1, 0.1, 0);

  assert.equal(card.isProjectScenario, true);
  assert.deepEqual(
    {
      techCred: state.techCred,
      energy: state.energy,
      support: state.support,
      burnout: state.burnout
    },
    before
  );
  assert.deepEqual(state.usedScenarioTitles, ['Legacy Cleanup No One Wanted']);
});

test('tracked stats change only after project scenario choice resolves', () => {
  const state = createInitialState();
  const card = getTrackedProjectCard();

  assert.equal(card.title, getTrackedCardTitle());
  applyEffects(state, getTrackedCardEffects());

  assert.deepEqual(
    {
      techCred: state.techCred,
      energy: state.energy,
      support: state.support,
      burnout: state.burnout
    },
    getExpectedTrackedStateForAssertion()
  );
});

function getProjectCardsWithoutRepeats(cardRoll) {
  const state = createInitialState();
  const first = drawScenarioCard(state, 0.1, 0.1, cardRoll);
  const second = drawScenarioCard(state, 0.1, 0.1, cardRoll);
  return { first, second, used: state.usedScenarioTitles };
}

function getTierOneProjectTitles() {
  return getProjectScenarioDeckForTier(1).map((card) => card.title);
}

function getFirstStageZeroNormalTitle() {
  return SCENARIO_DECKS[0][0].title;
}

function getFirstTierOneProjectTitle() {
  return getProjectScenarioDeckForTier(1)[0].title;
}

function getSecondTierOneProjectTitle() {
  return getProjectScenarioDeckForTier(1)[1].title;
}

function getProjectCardByTitle(title) {
  return PROJECT_SCENARIOS.find((card) => card.title === title);
}

function getScenarioCardByTitle(title) {
  return Object.values(SCENARIO_DECKS).flat().find((card) => card.title === title);
}

function getProjectCardByTierRoll(cardRoll) {
  const state = createInitialState();
  return drawScenarioCard(state, 0.1, 0.1, cardRoll);
}

function getTierThreeTitles() {
  return getProjectScenarioDeckForTier(3).map((card) => card.title);
}

function isTierThreeCardTitle(title) {
  return getTierThreeTitles().includes(title);
}

function getProjectChoiceSnapshot(card, choiceKey = 'agree') {
  const state = createInitialState();
  applyEffects(state, card[choiceKey].effects);
  return {
    techCred: state.techCred,
    energy: state.energy,
    support: state.support,
    burnout: state.burnout
  };
}

function getStatDelta(effects = {}) {
  return {
    techCred: effects.techCred ?? 0,
    energy: 40 + (effects.energy ?? 0),
    support: 20 + (effects.support ?? 0),
    burnout: effects.burnout ?? 0
  };
}

function getAllScenarioTitles() {
  return [
    ...Object.values(SCENARIO_DECKS).flat().map((card) => card.title),
    ...PROJECT_SCENARIOS.map((card) => card.title)
  ];
}

function getUniqueTitleCount() {
  return new Set(getAllScenarioTitles()).size;
}

function getTotalTitleCount() {
  return getAllScenarioTitles().length;
}

function getNormalFallbackState() {
  const state = createInitialState();
  state.usedScenarioTitles = [...getTierOneProjectTitles()];
  return state;
}

function getProjectFallbackState() {
  const state = createInitialState();
  state.usedScenarioTitles = SCENARIO_DECKS[0].map((card) => card.title);
  return state;
}

function getSecondUniqueProjectCard(cardRoll) {
  return getProjectCardsWithoutRepeats(cardRoll).second;
}

function getFirstUniqueProjectCard(cardRoll) {
  return getProjectCardsWithoutRepeats(cardRoll).first;
}

function getRepeatedProjectUsedTitles(cardRoll) {
  return getProjectCardsWithoutRepeats(cardRoll).used;
}

function getTrackedProjectCard() {
  return getProjectCardByTitle('Rewrite the Onboarding Docs');
}

function getFirstNormalScenarioCard() {
  return getScenarioCardByTitle(getFirstStageZeroNormalTitle());
}

function getFirstTierOneProjectCard() {
  return getProjectCardByTitle(getFirstTierOneProjectTitle());
}

function getSecondTierOneProjectCard() {
  return getProjectCardByTitle(getSecondTierOneProjectTitle());
}

function getExpectedStateFromCard(card, choiceKey = 'agree') {
  return getStatDelta(card[choiceKey].effects);
}

function getTitlePoolSize() {
  return getTotalTitleCount();
}

function getUniquePoolSize() {
  return getUniqueTitleCount();
}

function getNormalFallbackCard() {
  return drawScenarioCard(getNormalFallbackState(), 0.1, 0.1, 0);
}

function getProjectFallbackCard() {
  return drawScenarioCard(getProjectFallbackState(), 0.9, 0.1, 0);
}

function getTrackedProjectAgreeState() {
  return getProjectChoiceSnapshot(getTrackedProjectCard());
}

function getExpectedTrackedProjectAgreeState() {
  return getExpectedStateFromCard(getTrackedProjectCard());
}

function getRepeatedProjectCards() {
  return getProjectCardsWithoutRepeats(0.25);
}

function getExpectedRepeatedProjectTitles() {
  return [getFirstTierOneProjectTitle(), getSecondTierOneProjectTitle()];
}

function getExpectedNormalFallbackTitle() {
  return getFirstStageZeroNormalTitle();
}

function getExpectedProjectFallbackTitle() {
  return getFirstTierOneProjectTitle();
}

function getFirstProjectCardTitle() {
  return getFirstUniqueProjectCard(0.25).title;
}

function getSecondProjectCardTitle() {
  return getSecondUniqueProjectCard(0.25).title;
}

function getProjectRepeatUsedTitles() {
  return getRepeatedProjectUsedTitles(0.25);
}

function getNormalFallbackTitle() {
  return getNormalFallbackCard().title;
}

function getProjectFallbackTitleValue() {
  return getProjectFallbackCard().title;
}

function getExpectedTierThreeTitles() {
  return getTierThreeTitles();
}

function isExpectedTierThreeTitle(title) {
  return isTierThreeCardTitle(title);
}

function getUniqueScenarioTitleCount() {
  return getUniquePoolSize();
}

function getScenarioTitleCount() {
  return getTitlePoolSize();
}

function getTrackedProjectTitle() {
  return getTrackedProjectCard().title;
}

function getTrackedProjectAgreeEffects() {
  return getTrackedProjectCard().agree.effects;
}

function getFirstNormalScenarioTitle() {
  return getFirstNormalScenarioCard().title;
}

function getFirstTierOneProjectCardTitle() {
  return getFirstTierOneProjectCard().title;
}

function getSecondTierOneProjectCardTitle() {
  return getSecondTierOneProjectCard().title;
}

function getExpectedTrackedProjectState() {
  return getExpectedTrackedProjectAgreeState();
}

function getExpectedRepeatTitles() {
  return getExpectedRepeatedProjectTitles();
}

function getExpectedNormalTitle() {
  return getExpectedNormalFallbackTitle();
}

function getExpectedProjectTitle() {
  return getExpectedProjectFallbackTitle();
}

function getRepeatCards() {
  return getRepeatedProjectCards();
}

function getTrackedStateAfterAgree() {
  return getTrackedProjectAgreeState();
}

function getTrackedCardTitle() {
  return getTrackedProjectTitle();
}

function getTrackedCardEffects() {
  return getTrackedProjectAgreeEffects();
}

function getTotalScenarioTitleCount() {
  return getScenarioTitleCount();
}

function getTotalUniqueScenarioTitleCount() {
  return getUniqueScenarioTitleCount();
}

function getExpectedTierThreeTitlePool() {
  return getExpectedTierThreeTitles();
}

function getRepeatedUsedTitles() {
  return getProjectRepeatUsedTitles();
}

function getExpectedNormalFallbackCardTitle() {
  return getExpectedNormalTitle();
}

function getExpectedProjectFallbackCardTitle() {
  return getExpectedProjectTitle();
}

function getNormalFallbackCardTitle() {
  return getNormalFallbackTitle();
}

function getProjectFallbackCardResolvedTitle() {
  return getProjectFallbackTitleValue();
}

function isTierThreeTitleExpected(title) {
  return isExpectedTierThreeTitle(title);
}

function getRepeatedCardsForAssertion() {
  return getRepeatCards();
}

function getTrackedStateForAssertion() {
  return getTrackedStateAfterAgree();
}

function getExpectedTrackedStateForAssertion() {
  return getExpectedTrackedProjectState();
}

function getExpectedRepeatedTitlesForAssertion() {
  return getExpectedRepeatTitles();
}

function getExpectedNormalFallbackForAssertion() {
  return getExpectedNormalFallbackCardTitle();
}

function getExpectedProjectFallbackForAssertion() {
  return getExpectedProjectFallbackCardTitle();
}

function getNormalFallbackForAssertion() {
  return getNormalFallbackCardTitle();
}

function getProjectFallbackForAssertion() {
  return getProjectFallbackCardResolvedTitle();
}

function getRepeatedUsedTitlesForAssertion() {
  return getRepeatedUsedTitles();
}

function getTotalTitleCountForAssertion() {
  return getTotalScenarioTitleCount();
}

function getUniqueTitleCountForAssertion() {
  return getTotalUniqueScenarioTitleCount();
}

function getTierThreePoolForAssertion() {
  return getExpectedTierThreeTitlePool();
}

test('support cards encode gender-based support draw costs', () => {
  const mentor = SUPPORT_DECK.find((card) => card.title === 'Mentor');
  const allyship = SUPPORT_DECK.find((card) => card.title === 'Allyship');
  const sponsor = SUPPORT_DECK.find((card) => card.title === 'Sponsor');

  assert.equal(mentor?.supportDrawCost, 10);
  assert.equal(allyship?.supportDrawCost, 15);
  assert.equal(sponsor?.supportDrawCost, 10);
});

test('each stage has its own support deck with multiple cards', () => {
  STAGES.forEach((stage, index) => {
    assert.equal(Array.isArray(SUPPORT_DECKS[index]), true, `${stage.name} should have a support deck`);
    assert.equal(SUPPORT_DECKS[index].length >= 6, true, `${stage.name} should have at least 6 support cards`);
  });
});

test('getSupportDeckForStage returns the stage-specific support pool', () => {
  const juniorDeck = getSupportDeckForStage(0);
  const leaveDeck = getSupportDeckForStage(4);

  assert.equal(juniorDeck.some((card) => card.title === 'Pairing Session'), true);
  assert.equal(juniorDeck.some((card) => card.title === 'Leave Planner'), false);
  assert.equal(leaveDeck.some((card) => card.title === 'Leave Planner'), true);
  assert.equal(leaveDeck.some((card) => card.title === 'Pairing Session'), false);
});

test('support deck export stays flattened for shared metadata lookups', () => {
  assert.equal(SUPPORT_DECK.some((card) => card.title === 'Emergency Childcare'), true);
  assert.equal(SUPPORT_DECK.some((card) => card.title === 'Packet Review'), true);
});

test('stage-specific support cards preserve status-removal hooks', () => {
  const juniorDeck = getSupportDeckForStage(0);
  const boundarySetting = juniorDeck.find((card) => card.title === 'Boundary Setting');

  assert.equal(boundarySetting?.removeStatus, 'Office Housework');
});

test('stage-specific support selection can differ by stage for the same roll', () => {
  const stageZeroCard = getSupportDeckForStage(0)[0];
  const stageFiveCard = getSupportDeckForStage(5)[0];

  assert.notEqual(stageZeroCard.title, stageFiveCard.title);
});

test('support decks still include costed cards across multiple stages', () => {
  assert.equal(getSupportDeckForStage(0).some((card) => card.supportDrawCost === 10), true);
  assert.equal(getSupportDeckForStage(1).some((card) => card.supportDrawCost === 15), true);
  assert.equal(getSupportDeckForStage(3).some((card) => card.supportDrawCost === 10), true);
});

test('support decks can include stage-five front-balancing effects', () => {
  const stageFiveDeck = getSupportDeckForStage(5);
  assert.equal(stageFiveDeck.some((card) => typeof card.effects.homeFront === 'number'), true);
});

test('support decks no longer include stage-five time-slot effects', () => {
  const stageFiveDeck = getSupportDeckForStage(5);
  assert.equal(stageFiveDeck.every((card) => typeof card.effects.timeSlots !== 'number'), true);
});

test('requesting support for an unknown stage returns an empty deck', () => {
  assert.deepEqual(getSupportDeckForStage(99), []);
});

test('support deck titles remain unique within each stage pool', () => {
  STAGES.forEach((stage, index) => {
    const titles = getSupportDeckForStage(index).map((card) => card.title);
    assert.equal(new Set(titles).size, titles.length, `${stage.name} should not repeat support titles within its own deck`);
  });
});

test('support deck cards keep the existing object shape', () => {
  const card = getSupportDeckForStage(2)[0];
  assert.equal(typeof card.title, 'string');
  assert.equal(typeof card.text, 'string');
  assert.equal(typeof card.effects, 'object');
});

test('support draw threshold logic still composes with stage-specific decks', () => {
  const state = createInitialState();
  state.stage = 4;
  applyEffects(state, { support: -5 });
  assert.equal(state.support, 15);
  assert.equal(state.support < 15, false);
});

test('stage-specific support cards can still improve tech credibility', () => {
  const packetReview = getSupportDeckForStage(1).find((card) => card.title === 'Packet Review');
  assert.equal(packetReview.effects.techCred > 0, true);
});

test('stage-specific support cards can still reduce burnout', () => {
  const emergencyChildcare = getSupportDeckForStage(5).find((card) => card.title === 'Emergency Childcare');
  assert.equal(emergencyChildcare.effects.burnout < 0, true);
});

test('stage-specific support cards can still affect home front in caregiving stage', () => {
  const partnerReset = getSupportDeckForStage(5).find((card) => card.title === 'Partner Reset');
  assert.equal(typeof partnerReset.effects.homeFront, 'number');
});

test('stage-specific support cards can still affect energy in leave stage', () => {
  const protectedRampUp = getSupportDeckForStage(4).find((card) => card.title === 'Protected Ramp-Up');
  assert.equal(typeof protectedRampUp.effects.energy, 'number');
});

test('stage-specific support cards can still affect tech cred in leadership stage', () => {
  const attributionEcho = getSupportDeckForStage(2).find((card) => card.title === 'Attribution Echo');
  assert.equal(typeof attributionEcho.effects.techCred, 'number');
});

test('stage-specific support cards can still affect support in management stage', () => {
  const coalitionCheckIn = getSupportDeckForStage(3).find((card) => card.title === 'Coalition Check-In');
  assert.equal(typeof coalitionCheckIn.effects.support, 'number');
});

test('stage-specific support cards can still be applied through existing effect handling', () => {
  const state = createInitialState();
  const card = getSupportDeckForStage(0).find((supportCard) => supportCard.title === 'Pairing Session');

  applyEffects(state, card.effects);

  assert.equal(state.techCred, 6);
  assert.equal(state.support, 25);
  assert.equal(state.burnout, 0);
});

test('stage-specific support cards remain repeatable because they are not tracked as used scenarios', () => {
  const state = createInitialState();
  const card = getSupportDeckForStage(3).find((supportCard) => supportCard.title === 'Executive Sponsor');

  applyEffects(state, card.effects);
  applyEffects(state, card.effects);

  assert.deepEqual(state.usedScenarioTitles, []);
});

test('stage-specific support decks do not change scenario title uniqueness assumptions', () => {
  const titles = [
    ...Object.values(SCENARIO_DECKS).flat().map((card) => card.title),
    ...PROJECT_SCENARIOS.map((card) => card.title)
  ];

  assert.equal(new Set(titles).size, titles.length);
});

test('stage-specific support decks can be selected deterministically by index', () => {
  const stageThreeCard = getSupportDeckForStage(3)[2];
  assert.equal(stageThreeCard.title, 'Peer Director Ally');
});

test('stage-specific support decks preserve legacy card availability where reused', () => {
  assert.equal(getSupportDeckForStage(0).some((card) => card.title === 'Mentor'), true);
  assert.equal(getSupportDeckForStage(1).some((card) => card.title === 'Community'), true);
  assert.equal(getSupportDeckForStage(2).some((card) => card.title === 'Therapy'), true);
});

test('stage-specific support decks are present for every numbered stage', () => {
  assert.deepEqual(Object.keys(SUPPORT_DECKS), ['0', '1', '2', '3', '4', '5']);
});

test('support deck flattening keeps total card count above original deck size', () => {
  assert.equal(SUPPORT_DECK.length > 6, true);
});

test('stage-specific support cards can still use gender-based cost metadata', () => {
  const executiveSponsor = getSupportDeckForStage(3).find((card) => card.title === 'Executive Sponsor');
  const peerDirectorAlly = getSupportDeckForStage(3).find((card) => card.title === 'Peer Director Ally');

  assert.equal(executiveSponsor.supportDrawCost, 10);
  assert.equal(peerDirectorAlly.supportDrawCost, 15);
});

test('stage-specific support cards can still omit extra cost metadata', () => {
  const roleCharter = getSupportDeckForStage(3).find((card) => card.title === 'Role Charter');
  assert.equal(roleCharter.supportDrawCost ?? 0, 0);
});

test('stage-specific support pools line up with stage count', () => {
  assert.equal(Object.keys(SUPPORT_DECKS).length, STAGES.length);
});

test('stage-specific support cards can still affect home front in caregiving stage', () => {
  const emergencyChildcare = getSupportDeckForStage(5).find((card) => card.title === 'Emergency Childcare');
  assert.equal(typeof emergencyChildcare.effects.homeFront, 'number');
});

test('stage-specific support cards can still affect home front in caregiving stage', () => {
  const careCollective = getSupportDeckForStage(5).find((card) => card.title === 'Care Collective');
  assert.equal(typeof careCollective.effects.homeFront, 'number');
});

test('stage-specific support cards can still affect burnout and energy together', () => {
  const therapy = getSupportDeckForStage(5).find((card) => card.title === 'Therapy');
  assert.equal(typeof therapy.effects.energy, 'number');
  assert.equal(therapy.effects.burnout < 0, true);
});

test('stage-specific support cards can still be looked up from the active stage', () => {
  const state = createInitialState();
  state.stage = 5;
  assert.equal(getSupportDeckForStage(state.stage)[0].title, 'Emergency Childcare');
});

test('stage-specific support cards can still include reused legacy titles in only one stage', () => {
  assert.equal(SUPPORT_DECK.filter((card) => card.title === 'Boundary Setting').length, 1);
  assert.equal(SUPPORT_DECK.filter((card) => card.title === 'Community').length, 1);
  assert.equal(SUPPORT_DECK.filter((card) => card.title === 'Therapy').length, 2);
});

test('stage-specific support cards still compose with support-cost application', () => {
  const state = createInitialState();
  const card = getSupportDeckForStage(3).find((supportCard) => supportCard.title === 'Peer Director Ally');

  applyEffects(state, { support: -(card.supportDrawCost ?? 0) });
  applyEffects(state, card.effects);

  assert.equal(state.support, 12);
});

test('stage-specific support cards can still affect multiple numeric systems at once', () => {
  const emergencyChildcare = getSupportDeckForStage(5).find((card) => card.title === 'Emergency Childcare');
  assert.equal(Object.keys(emergencyChildcare.effects).length >= 3, true);
});

test('stage-specific support cards can still preserve burnout floor handling', () => {
  const state = createInitialState();
  const card = getSupportDeckForStage(2).find((supportCard) => supportCard.title === 'Therapy');

  applyEffects(state, card.effects);

  assert.equal(state.burnout, 0);
});

test('stage-specific support decks are distinct across early and late stages', () => {
  assert.notDeepEqual(getSupportDeckForStage(0).map((card) => card.title), getSupportDeckForStage(5).map((card) => card.title));
});

test('stage-specific support decks can still expose cards that remove statuses', () => {
  const removable = SUPPORT_DECK.filter((card) => card.removeStatus);
  assert.equal(removable.length > 0, true);
});

test('stage-specific support cards can still improve support without tech cred changes', () => {
  const careCollective = getSupportDeckForStage(5).find((card) => card.title === 'Care Collective');
  assert.equal(typeof careCollective.effects.support, 'number');
  assert.equal('techCred' in careCollective.effects, false);
});

test('stage-specific support cards can still improve tech cred without support changes', () => {
  const skillRefreshWindow = getSupportDeckForStage(4).find((card) => card.title === 'Skill Refresh Window');
  assert.equal(typeof skillRefreshWindow.effects.techCred, 'number');
});


test('support draws use only the configured 15-point male-coded cost for support', () => {
  const cards = [
    SUPPORT_DECK.find((card) => card.title === 'Allyship'),
    getSupportDeckForStage(3).find((card) => card.title === 'Peer Director Ally'),
    getSupportDeckForStage(4).find((card) => card.title === 'Coverage Advocate')
  ];

  cards.forEach((card) => {
    const state = createInitialState();
    applyEffects(state, { ...card.effects, support: -(card.supportDrawCost ?? 15) });
    assert.equal(state.support, 5);
  });
});

test('support draws use only the configured 10-point woman-coded cost for support', () => {
  const cards = [
    SUPPORT_DECK.find((card) => card.title === 'Mentor'),
    SUPPORT_DECK.find((card) => card.title === 'Sponsor'),
    getSupportDeckForStage(3).find((card) => card.title === 'Executive Sponsor'),
    getSupportDeckForStage(4).find((card) => card.title === 'Re-Entry Buddy')
  ];

  cards.forEach((card) => {
    const state = createInitialState();
    applyEffects(state, { ...card.effects, support: -(card.supportDrawCost ?? 15) });
    assert.equal(state.support, 10);
  });
});

test('support draws charge 15 support when a card has no explicit draw cost', () => {
  const cards = [
    getSupportDeckForStage(3).find((card) => card.title === 'Role Charter'),
    getSupportDeckForStage(0).find((card) => card.title === 'Practice Interview Loop'),
    getSupportDeckForStage(5).find((card) => card.title === 'Care Collective')
  ];

  cards.forEach((card) => {
    const state = createInitialState();
    applyEffects(state, { ...card.effects, support: -(card.supportDrawCost ?? 15) });
    assert.equal(state.support, 5);
  });
});

test('support draws still apply non-support effects while support uses the configured cost', () => {
  const state = createInitialState();
  state.burnout = 20;
  const sponsor = SUPPORT_DECK.find((card) => card.title === 'Sponsor');

  applyEffects(state, { ...sponsor.effects, support: -(sponsor.supportDrawCost ?? 0) });

  assert.equal(state.support, 10);
  assert.equal(state.techCred, 8);
  assert.equal(state.burnout, 15);
});

test('support draw threshold boundary remains 15 after support-cost changes', () => {
  const state = createInitialState();
  applyEffects(state, { support: -5 });
  assert.equal(state.support, 15);
  assert.equal(state.support < 15, false);
  applyEffects(state, { support: -1 });
  assert.equal(state.support, 14);
  assert.equal(state.support < 15, true);
});

test('gendered helper wording matches configured support costs', () => {
  const mentor = SUPPORT_DECK.find((card) => card.title === 'Mentor');
  const allyship = SUPPORT_DECK.find((card) => card.title === 'Allyship');
  const sponsor = SUPPORT_DECK.find((card) => card.title === 'Sponsor');

  assert.equal(mentor.text.includes('woman'), true);
  assert.equal(allyship.text.includes('male'), true);
  assert.equal(sponsor.text.includes('woman'), true);
});

test('support cards without gendered helper keep zero extra cost', () => {
  const boundarySetting = SUPPORT_DECK.find((card) => card.title === 'Boundary Setting');
  const therapy = SUPPORT_DECK.find((card) => card.title === 'Therapy');

  assert.equal(boundarySetting?.supportDrawCost ?? 0, 0);
  assert.equal(therapy?.supportDrawCost ?? 0, 0);
});

test('normal scenarios are not repeated within one run', () => {
  const state = createInitialState();
  const first = drawScenarioCard(state, 0.9, 0.2, 0);
  const second = drawScenarioCard(state, 0.9, 0.2, 0);

  assert.equal(first.title, 'The Coffee Mistake');
  assert.equal(second.title, 'The Double-Check');
  assert.deepEqual(state.usedScenarioTitles, ['The Coffee Mistake', 'The Double-Check']);
});

test('project scenarios are not repeated within one run', () => {
  const state = createInitialState();
  const first = drawScenarioCard(state, 0.1, 0.1, 0.5);
  const second = drawScenarioCard(state, 0.1, 0.1, 0.5);
  const tierOneTitles = getProjectScenarioDeckForTier(1).map((card) => card.title);

  assert.equal(first.isProjectScenario, true);
  assert.equal(second.isProjectScenario, true);
  assert.equal(tierOneTitles.includes(first.title), true);
  assert.equal(tierOneTitles.includes(second.title), true);
  assert.notEqual(first.title, second.title);
  assert.deepEqual(state.usedScenarioTitles, [first.title, second.title]);
});

test('scenario draw falls back to remaining normal scenarios when project pool is exhausted', () => {
  const state = createInitialState();
  state.usedScenarioTitles = getProjectScenarioDeckForTier(1).map((card) => card.title);
  const card = drawScenarioCard(state, 0.1, 0.1, 0);

  assert.equal(card.isProjectScenario, false);
  assert.equal(card.title, 'The Coffee Mistake');
});

test('scenario draw falls back to remaining project scenarios when normal pool is exhausted', () => {
  const state = createInitialState();
  state.usedScenarioTitles = SCENARIO_DECKS[0].map((card) => card.title);
  const card = drawScenarioCard(state, 0.9, 0.1, 0);

  assert.equal(card.isProjectScenario, true);
  assert.equal(card.title, 'Legacy Cleanup No One Wanted');
});

test('scenario draw returns null when no scenario remains', () => {
  const state = createInitialState();
  state.usedScenarioTitles = [
    ...SCENARIO_DECKS[0].map((card) => card.title),
    ...getProjectScenarioDeckForTier(1).map((card) => card.title)
  ];

  const card = drawScenarioCard(state, 0.1, 0.1, 0);
  assert.equal(card, null);
});

test('restart resets used scenario history', () => {
  const state = createInitialState();
  drawScenarioCard(state, 0.9, 0.2, 0);
  assert.equal(state.usedScenarioTitles.length, 1);

  const fresh = createInitialState();
  assert.deepEqual(fresh.usedScenarioTitles, []);
});

test('support cards remain repeatable because they are not tracked as used scenarios', () => {
  const state = createInitialState();
  assert.deepEqual(state.usedScenarioTitles, []);
  const mentor = SUPPORT_DECK.find((card) => card.title === 'Mentor');
  applyEffects(state, mentor.effects);
  applyEffects(state, mentor.effects);
  assert.deepEqual(state.usedScenarioTitles, []);
});

test('title-based tracking is safe with current source data', () => {
  const titles = [
    ...Object.values(SCENARIO_DECKS).flat().map((card) => card.title),
    ...PROJECT_SCENARIOS.map((card) => card.title)
  ];

  assert.equal(new Set(titles).size, titles.length);
});
