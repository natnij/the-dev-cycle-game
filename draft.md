Designing a game like Zhihui's Life for a woman in software engineering is a powerful way to simulate the unique professional and personal hurdles in tech. Below is a framework for "The Dev Cycle," a card-based survival and strategy game.
## Game Overview
Objective: Navigate the seven career stages while maintaining your "Burnout Meter" and "Tech Cred" (reputation). If your Burnout Meter fills up, you "exit the industry" and lose the game.
## 1. Key Roles & Resources

* Player Character: You start as a Student with base stats: Confidence, Logic, and Resilience.
* Support System Cards: These represent mentors, supportive managers, or peer networks that help you navigate obstacles.
* Imposter Syndrome Deck: A deck of negative status cards that can be "dealt" to you by certain events, lowering your stats.
* Resources:
* Tech Cred: Earned by completing technical projects or certifications.
   * Energy: A finite resource used to take actions each turn.
   * Burnout Meter: Increases with high-stress events; decreased by "Self-Care" actions or "Support" cards.

## 2. The Seven Career Stages (The Game Board)
The game progresses through a deck of Scenario Cards for each life stage:

   1. The University Choice: Decisions between "Pure CS" (higher Cred, higher Burnout risk due to isolation) vs. "Interdisciplinary Tech" (lower initial Cred, higher Support).
   2. The Junior Hunt: You must "apply" for roles by spending Energy. Obstacles include "Hidden Requirements" or "Culture Fit" (bias).
   3. The Senior Promotion: Requires a specific amount of Tech Cred. You might face the "Stalled Promotion" card, where a male peer with less Cred is promoted over you.
   4. Leadership Leap: You transition to Lead. Challenges include "Being Interrupted in Meetings" or "Unrecognized Glue Work" (soft labor that doesn't count toward promo).
   5. The Management Track: A fork in the road—stay individual contributor (IC) or move to Management. Management offers higher salary but higher "People Drama" Burnout.
   6. Maternity Leave: A "Life Event" card. You must choose how to hand over projects. Risks include "The Motherhood Penalty" (being given less-impactful work upon return).
   7. The Balance: Managing your "Work/Life Balance" stat. You must play "Family" and "Work" cards simultaneously.

## 3. Rulebook & Game Interaction

* The "Double Standards" Mechanic: Occasionally, a scenario card will have a "Male Peer" comparison. If a male character would take 1 Burnout for a mistake, the female player takes 2.
* Project Cards: To progress, you must "ship" code. Some projects have "Tech Debt" (higher difficulty), representing messy legacy systems often dumped on women.
* Interaction: If playing with others, players can "Boost" each other with "Allyship" cards or "Mentor" younger players to lower their Burnout.
* Winning: You win by reaching "Retirement" or "C-Suite" with a Burnout Meter below 100%.

As examples:

In the Junior Engineer Stage, the goal is to survive the first 1–2 years of your career while building enough Tech Cred to qualify for a promotion to Senior.
Below are specific examples for the Scenario Cards and how they interact with the game mechanics:
## Scenario Cards: Junior Engineer Stage
These cards are drawn from the Junior Deck each turn.

| Card Name | Scenario Text | Player Choice / Interaction |
|---|---|---|
| The Coffee Mistake | You are asked to organize the team lunch and take coffee orders because you’re "so organized." | • Agree: -5 Tech Cred, +1 Burnout (you lose coding time). • Decline: +5 Burnout (risk being labeled "not a team player"). |
| The "Double-Check" | A male peer submits code with a bug and gets a quick "fix it next time." You submit perfect code, but your Senior Reviewer leaves 50+ nitpicky comments. | • Address each comment: +10 Tech Cred, +15 Burnout. • Push back: -5 Tech Cred, +5 Burnout. |
| Imposter Syndrome Flare-up | You see your male cohort-mate building a complex feature while you’re stuck on CSS tweaks. You feel like a "fraud." | • Draw from Imposter Deck: Take a random negative status card (e.g., "Hesitation" – -2 to next Cred roll). |
| The Invisible Bug | You find a critical bug in a senior dev’s code. | • Speak up in Slack: +10 Tech Cred, but gain "The Threat" status (some peers may be less helpful). • DM him privately: +5 Tech Cred, +5 Support. |
| Networking Happy Hour | The team is going for drinks at 8 PM to "talk shop." You have a personal commitment or don't feel comfortable. | • Go: -10 Energy, +10 Support. • Skip: -10 Support (lose out on "tribal knowledge"). |

------------------------------
## Expanded Game Mechanics## 1. The "Support System" Interaction
You can play Support Cards to mitigate the effects of the Scenarios above.

* Mentor Card: "Play this when you receive 'Nitpicky Review' to clear 10 Burnout."
* Allyship Card: "Play this during 'The Coffee Mistake' to have a peer volunteer instead, negating the penalty."

## 2. Status Cards (Modifiers)
Some scenarios "deal" you a long-term status that stays in your play area:

* "The Glue" (Junior Stage): You are so good at documentation and helping others that management keeps you there. Effect: You gain +5 Support every turn, but need 20% more Tech Cred to reach the Senior Stage.
* "Office Housework": You’ve been assigned administrative tasks. Effect: -5 Energy each turn until you play a 'Boundary Setting' card. [1, 2, 3] 

## 3. Stage Transition: The Promotion Review
To move from Stage 2 (Junior) to Stage 3 (Senior), you must trigger a "Performance Review" event.

* The Roll: Roll a 6-sided die. Add your current Tech Cred.
* The Bias Penalty: Subtract 5 if you have the "Glue" status or if your Burnout is above 50.
* Requirement: You must score a 15+ to move to the next stage. If you fail, you stay a Junior for another round and take +10 Burnout. [4, 5] 

Would you like to see the Stage 6 & 7 (Maternity & Balance) cards, which introduce different mechanics like "Time Resources"?

[1] [https://www.linkedin.com](https://www.linkedin.com/pulse/facing-microaggressions-woman-tech-youre-alone-limor-bergman-8xvlf)
[2] [https://everydayfeminism.com](https://everydayfeminism.com/2015/09/microaggressions-tech-industry/)
[3] [https://www.linkedin.com](https://www.linkedin.com/pulse/microaggressions-women-workplace-aline-martins-rn3xf)
[4] [https://www.womentech.net](https://www.womentech.net/how-to/what-challenges-do-women-face-in-climbing-software-engineering-ladder)
[5] [https://thefemaleprogrammer.medium.com](https://thefemaleprogrammer.medium.com/sexism-in-the-software-industry-makes-it-difficult-for-female-programmers-b37f2aa80d62)


For Stages 6 and 7, the game shifts. In previous stages, you were fighting for reputation; now, you are fighting for Time.
In these stages, you introduce a new resource: Time Slots (TS). You only have 10 TS per round to divide between "The Sprint" (Work) and "The Home" (Family).
## Stage 6: The Maternity Leave (The "Pause" Mechanic)
In this stage, you are physically removed from the "Office Board" for a set number of turns. The goal is to prevent your Tech Cred from decaying while you are away.

| Card Name | Scenario Text | Player Choice / Interaction |
|---|---|---|
| The Handover | You need to transition your high-visibility project before leave. | • Comprehensive Handover: -20 Energy, but your Tech Cred is "Locked" (won't decay). • Quick Exit: +10 Energy now, but -5 Tech Cred per turn you are away. |
| Out of Sight... | While on leave, a major architectural decision is made that changes the stack you use. | • Study on Leave: -15 Energy, +5 Tech Cred (avoids "Skill Gap" status). • Stay Logged Off: +20 Resilience, but take "Skill Gap" card (higher difficulty on next Stage). |
| The "Mommy Track" | You return to find you've been assigned to a "maintenance" team because it's "lower stress" for a new mom. | • Accept: -10 Tech Cred, +10 Energy (easier turns). • Demand your old role: +10 Tech Cred, +20 Burnout. |

------------------------------
## Stage 7: The Balance (The "Split Board" Mechanic)
This is the final "Endless Mode" of the game. You must play on two boards simultaneously. If either board "fails," you lose.
The Rule of "The Second Shift": Every "Work" card you play increases the difficulty of the "Home" card you draw next.

| Card Name | Scenario Text | Player Choice / Interaction |
|---|---|---|
| The Sick Child vs. The Release | Your child has a fever on the day of a major production release. | • Work from Home: +15 Burnout, -5 Tech Cred (perceived as distracted). • Take a Sick Day: +10 Resilience (Home), -15 Tech Cred (Work). |
| The "24/7" Culture | A late-night Slack ping from the VP asking for a report by morning. | • Reply Now: +10 Tech Cred, -2 Time Slots from your next "Home" turn. • Reply Tomorrow: -5 Tech Cred, +5 Resilience. |
| The Guilt Card | You missed the school play for a deployment. | • Internalize: +20 Burnout. • Support System: Play a "Community Card" to negate Burnout (requires high Support stat). |

------------------------------
## End-Game Conditions: How to "Win"
Unlike traditional games, there isn't always a "victory lap." You win by:

   1. Reaching Retirement: Finishing the deck with Burnout < 100%.
   2. The "CTO" Ending: If your Tech Cred is > 200, you move to the C-Suite and change the rules for all players (e.g., "Maternity Leave" no longer causes Cred decay).
   3. The "Mentor" Ending: If you helped at least 3 other players reach the Senior stage, you win via "Legacy" even if your Burnout is high.


