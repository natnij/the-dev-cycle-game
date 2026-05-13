# The Dev Cycle

The Dev Cycle is a browser-based narrative card game about navigating a software career under structural pressure. You draw scenario and support cards, manage tradeoffs across several score tracks, clear or absorb status effects, and try to reach the ending without burning out or collapsing one of the final-stage fronts. It is inspired by a Korean board game called [Lee Ji-hye's Game 이지혜게임](https://tumblbug.com/jihyegame). 

## What the game is

- **Single-page browser game** built from `index.html` and `game.js`
- **Scenario-driven progression** across six career stages
- **Stat management** around Tech Cred, Energy, Support, Burnout, and later Work Front / Home Front
- **Review and promotion flow** where some stages require a successful review before advancing

## Running the game locally

### Option 1: open the file directly

You can open the game directly in a browser:

```bash
open index.html
```

Or open:

```text
file:///path/to/wit-game/index.html
```

### Option 2: run a local server

For browser testing and a closer-to-development workflow:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

## Development setup

### Requirements

- Node.js 18+
- Python 3
- npm
- Playwright browser dependencies

Install dependencies:

```bash
npm install
npx playwright install
```

## Tests

This project has both unit tests and browser tests.

Run everything:

```bash
npm test
```

Run unit tests only:

```bash
npm run test:unit
```

Run end-to-end tests only:

```bash
npm run test:e2e
```

Notes:
- Playwright uses `python3 -m http.server 4173` via `playwright.config.js`.
- If port `4173` is already in use, stop the other server before running browser tests.

## Project structure

- `index.html` — main UI, rendering, interaction wiring
- `game.js` — state model, stage rules, deck logic, reviews, endings
- `tests/game.test.js` — unit tests for rules/state behavior
- `tests/e2e.spec.js` — browser regressions for gameplay flows and UI behavior
- `LICENSE` — GNU GPL v3 license text

## Developing the game with Claude Code

This repository works well with Claude Code for iterative game design and implementation.

### Install Claude Code

Use Anthropic’s Claude Code CLI and sign in according to its installation instructions. Once it is installed, open this project directory in Claude Code.

Typical workflow:

```bash
cd /path/to/the-dev-cycle-game
claude
```

If you need help in Claude Code itself, use:

```text
/help
```

### Good prompts to use

Claude Code works best when you ask for concrete, testable changes. Examples:

- “Add three new Junior Hunt scenario cards in the same tone as the existing ones.”
- “Rebalance Maternity Leave so it is slightly less punishing, then update tests.”
- “Add a regression test for a bug where draw buttons look enabled but do nothing after stage advance.”
- “Improve the landing-page instructions so first-time players understand goals, stats, and game-over rules.”
- “Audit stage transition logic and tell me which paths can leave the UI in a stuck state.”

### Prompting tips

Be specific about:
- **what to change**
- **what not to change**
- **how to verify it**
- **whether you want code, tests, copy, or design suggestions**

Good example:

> Add two support cards that can help clear burnout-related pressure in mid-game. Keep the existing tone. Update tests and do not rebalance unrelated decks.

Less useful example:

> Make the game better.

### What Claude should be careful about in this repo

When using Claude Code here, it should generally:

- prefer **small, targeted changes** over broad rewrites
- preserve the game’s existing tone and card structure
- avoid inventing new systems unless explicitly requested
- verify gameplay changes with tests
- check browser behavior for UI-facing changes, not just code correctness
- avoid committing local-only artifacts like temporary test output unless explicitly requested

## How to evaluate changes

When you or Claude make a change, evaluate it in three layers.

### 1. Rule correctness

Ask:
- Do stage requirements still work?
- Do promotion reviews still behave correctly?
- Do status effects apply and clear as intended?
- Do end states still trigger at the right thresholds?

Use unit tests for this.

### 2. UI behavior

Ask:
- Do buttons enable and disable correctly?
- Does the active card always show the expected next action?
- After stage changes, can the player actually keep playing?
- Does the landing page explain enough for a first-time player?

Use Playwright plus a real browser check for this.

### 3. Design quality

Ask:
- Is the new text clear and readable?
- Do new cards match the project’s tone?
- Is the change interesting without making the game noisier?
- Does a rebalance make the game more legible, or just easier/harder?

This part still needs human judgment.

## Recommended development loop

A practical loop for working with Claude Code on this project:

1. Describe the change clearly.
2. Ask Claude to identify the files it expects to touch.
3. Have Claude implement the smallest reasonable version.
4. Run tests.
5. Open the game and play the affected flow manually.
6. Refine copy, balance, or UX after seeing it in context.

## Common pitfalls

Things to watch for when extending this game:

- **UI looks enabled but actions do nothing** — verify `actionsRemaining`, open-turn state, and button gating.
- **Stage transitions behave differently by path** — check manual advance, auto-advance, review pass, review fail, and final-stage behavior separately.
- **Copy additions make the main card too noisy** — prefer concise, readable guidance.
- **Tests pass but the actual browser flow still feels wrong** — manually click through the affected path.
- **Temporary files get mixed into commits** — check `git status` before committing.

## License

This project includes a `LICENSE` file with the **GNU General Public License v3.0**.

In normal open-source practice, that means the repository is intended to be distributed under GPLv3. If you redistribute or modify the project, review the license terms in `LICENSE` carefully.

## Contributing and extending

If you want to keep developing the game, useful areas to extend include:

- adding new scenario or support cards
- rebalancing stage thresholds and reviews
- improving onboarding and player clarity
- expanding endings or late-game branching
- strengthening browser regressions for tricky UI flows

When making larger changes, prefer adding or updating tests in the same change so the gameplay behavior stays stable.
