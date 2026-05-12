export const STAGES = [
  { name: "Junior Hunt", goal: "Complete 2 projects and reach 28 Tech Cred while managing early-career bias.", threshold: 28, projectsRequired: 2, review: null },
  { name: "Senior Promotion", goal: "Complete 3 projects, reach 58 Tech Cred, and pass a promotion review shaped by burnout, sponsorship, and bias.", threshold: 58, projectsRequired: 3, review: { base: 8, target: 15 } },
  { name: "Leadership Leap", goal: "Build influence without getting trapped in invisible labor. Complete 3 projects, reach 88 Tech Cred, and keep burnout under 75.", threshold: 88, projectsRequired: 3, review: null },
  { name: "Management Track", goal: "Choose IC or management, complete 4 projects, and show sustained impact with 118 Tech Cred.", threshold: 118, projectsRequired: 4, review: { base: 7, target: 15 } },
  { name: "Maternity Leave", goal: "Complete 2 projects and protect your momentum through transition while reaching 145 Tech Cred.", threshold: 145, projectsRequired: 2, review: null },
  { name: "The Default Caretaker", goal: "Complete 3 projects, reach 178 Tech Cred, and finish with burnout below 100 while your work and home fronts both hold.", threshold: 178, projectsRequired: 3, review: { base: 9, target: 16 } }
];

export const SCENARIO_DECKS = {
  0: [
    {
      title: "The Coffee Mistake",
      text: "You are asked to organize lunch and collect coffee orders because you are 'so organized.' It steals time from the bug you're trying to close.",
      agree: { label: "Agree", summary: "Take on the organizing task to keep the room comfortable.", effects: { techCred: -5, burnout: 8, support: 6 }, status: "Office Housework", result: "You keep the room comfortable, and the room learns to expect it from you. Office Housework now drains 2 Energy each next turn until you clear it." },
      decline: { label: "Decline", summary: "Protect your engineering time instead of absorbing the extra labor.", effects: { burnout: 5, support: -5 }, result: "You defend your engineering time, but some teammates quietly mark you down for it." }
    },
    {
      title: "The Double-Check",
      text: "A male peer ships buggy code and gets a quick comment. You submit polished work and get buried under nitpicks about tone, naming, and style.",
      agree: { label: "Address every comment", summary: "Answer every nitpick so the work looks beyond reproach.", effects: { techCred: 12, burnout: 15, energy: -6 }, result: "You deliver something unimpeachable, but the invisible tax is real." },
      decline: { label: "Push back on the review", summary: "Challenge the unequal standard instead of overcompensating.", effects: { techCred: 3, burnout: 7, support: -3 }, result: "You defend your judgment, but your confidence is read as attitude." }
    },
    {
      title: "First Team, Familiar Pattern",
      text: "On your first engineering team, you notice the infrastructure tasks are quietly going to men while you are praised for communication and steered toward coordination work.",
      agree: { label: "Play along for now", summary: "Accept the coordination lane to stay easy to work with.", effects: { support: 5, techCred: -3, burnout: 5 }, status: "Pigeonholed", result: "You keep relationships smooth, but your technical path starts narrowing around other people's assumptions." },
      decline: { label: "Push toward systems work", summary: "Ask for infrastructure work that grows your technical path.", effects: { techCred: 7, burnout: 6 }, result: "You insist on harder technical scope early and make your ambitions explicit." }
    },
    {
      title: "Only Woman on the Backend Rotation",
      text: "You are the only woman on a backend-heavy rotation. You can keep your head down and prove yourself through output, or insist on visible ownership from the start.",
      agree: { label: "Keep quiet, outship everyone", summary: "Stay heads-down and prove yourself through sheer output.", effects: { techCred: 9, burnout: 8, energy: -5 }, result: "Your work speaks loudly, but the pressure to be flawless starts immediately." },
      decline: { label: "Claim visible ownership", summary: "Ask to be named clearly as the owner from the start.", effects: { support: 6, burnout: 3 }, result: "You set expectations about authorship and technical leadership before bad patterns settle in." }
    },
    {
      title: "Late-Night Networking",
      text: "The team heads to drinks at 8 PM where real decisions often get previewed. You do not feel fully safe or comfortable there.",
      agree: { label: "Go anyway", summary: "Attend the after-hours networking event to stay in the loop.", effects: { support: 10, energy: -8, burnout: 5 }, result: "You pick up useful context, but you pay for access with your evening." },
      decline: { label: "Skip it", summary: "Protect your evening instead of paying the access tax.", effects: { support: -8, burnout: 2 }, result: "You protect your boundaries and lose some informal influence." }
    },
    {
      title: "The Demo That Gets Redirected",
      text: "You present a fix in standup, and questions keep getting redirected to a male teammate who barely touched the work.",
      agree: { label: "Over-explain every decision", summary: "Spell out every technical detail so no one can blur your ownership.", effects: { techCred: 8, burnout: 7, energy: -4 }, result: "You make your ownership undeniable, but the extra proof costs real energy." },
      decline: { label: "Correct the room briefly", summary: "Redirect the credit cleanly without turning it into a speech.", effects: { techCred: 4, burnout: 4, support: -2 }, result: "You redirect credit back to yourself, even if the room gets a little tense." }
    },
    {
      title: "Volunteer Note-Taker",
      text: "A manager asks if you can capture meeting notes because you are 'great at detail,' even though you are trying to land visible technical work.",
      agree: { label: "Take the notes", summary: "Accept the meeting labor so the team keeps moving.", effects: { support: 6, techCred: -4, burnout: 6 }, status: "Office Housework", result: "You help the team immediately, and the invisible labor pattern gets reinforced. Office Housework now drains 2 Energy each next turn until you clear it." },
      decline: { label: "Protect technical time", summary: "Decline the note-taking request and stay on engineering work.", effects: { burnout: 5, support: -4, techCred: 3 }, result: "You keep your hands on engineering work and accept that someone may call it attitude." }
    },
    {
      title: "Shadow Ownership",
      text: "You are assigned 'supporting work' on a major feature even though you are capable of owning the whole thing.",
      agree: { label: "Accept the support role", summary: "Take the smaller role instead of fighting for full ownership.", effects: { support: 5, techCred: -2, burnout: 5 }, status: "Pigeonholed", result: "You stay easy to work with, but the team keeps under-scoping you." },
      decline: { label: "Ask to own the feature", summary: "Push to own the whole feature instead of assisting around the edges.", effects: { techCred: 9, burnout: 7, energy: -3 }, result: "You push for full ownership and make your growth path harder to ignore." }
    },
    {
      title: "Prototype Nobody Budgeted",
      text: "A hack-week prototype you built starts attracting attention, but no one has allocated time to turn it into real product work.",
      agree: { label: "Carry it into production", summary: "Keep owning the prototype even though the work is not resourced properly.", effects: { techCred: 11, burnout: 9, energy: -7 }, result: "You turn side-project momentum into real technical signal, but you absorb the missing budget with your own capacity." },
      decline: { label: "Force a staffing decision", summary: "Refuse to grow the prototype until the team makes it real work with real ownership.", effects: { support: -4, techCred: 6, burnout: 3 }, result: "You make the resourcing gap visible and force the team to decide whether the idea is serious." }
    },
    {
      title: "Pairing Trap",
      text: "A struggling teammate keeps getting routed to you for rescue sessions, and soon your own harder systems work is slipping behind.",
      agree: { label: "Become the default helper", summary: "Keep rescuing the work personally so the team does not stall.", effects: { support: 9, techCred: -3, burnout: 7 }, status: "Office Housework", result: "You become indispensable in the moment, and your own technical arc gets displaced by maintenance labor." },
      decline: { label: "Set office hours", summary: "Offer bounded help without letting rescue work consume your schedule.", effects: { support: 3, burnout: 2, energy: -1, techCred: 4 }, result: "You still help, but on terms that protect your own engineering time and make the pattern harder to normalize." }
    },
    {
      title: "Skip the Optional Demo Circuit",
      text: "A run of optional demos, brown bags, and visibility rituals is eating your evenings. Stepping back would give you actual recovery time, but people may read the quieter profile as less momentum.",
      agree: { label: "Pull back from the circuit", summary: "Trade some visibility and goodwill for real recovery time.", effects: { burnout: -7, energy: 5, support: -3, techCred: -2 }, result: "You get real evenings back and feel more human, even if the room notices you are suddenly less available for optional visibility work." },
      decline: { label: "Keep showing up", summary: "Preserve momentum and familiarity by staying visible everywhere.", effects: { support: 5, techCred: 3, burnout: 5, energy: -4 }, result: "You stay legible and connected, but the extra appearances keep eating into your actual recovery." }
    }
  ],
  1: [
    {
      title: "Stalled Promotion",
      text: "A peer with less visible impact is promoted first. You are told to keep doing what you are doing because everyone relies on you.",
      agree: { label: "Ask for specifics", summary: "Press for concrete reasons instead of accepting vague praise.", effects: { techCred: 6, burnout: 9, energy: -4 }, status: "The Glue", result: "You get more detail, but it becomes painfully clear your invisible labor is propping up the team." },
      decline: { label: "Keep your head down", summary: "Say nothing and absorb the disappointment privately.", effects: { burnout: 10, support: 2 }, result: "You avoid a fight in the moment, but the unfairness sinks deeper." }
    },
    {
      title: "Calibration Meeting",
      text: "Leadership describes you as 'helpful' and 'high potential' while using words like 'technical depth' for your male peer with similar output.",
      agree: { label: "Bring receipts", summary: "Bring concrete evidence of your impact into the calibration discussion.", effects: { techCred: 10, burnout: 8, support: 2 }, result: "You force the room to compare measurable impact instead of vibes." },
      decline: { label: "Let your manager handle it", summary: "Trust your manager to advocate for you instead of stepping in directly.", effects: { support: 6, burnout: 4 }, result: "You rely on management advocacy and hope it translates into action." }
    },
    {
      title: "The Double Standard",
      text: "A mistake that would be read as growth for someone else is framed as evidence you are not ready yet.",
      agree: { label: "Work twice as hard", summary: "Respond to the double standard by massively overperforming.", effects: { techCred: 12, burnout: 14, energy: -6 }, result: "You overcompensate and produce undeniable results, but the standard itself stays in place." },
      decline: { label: "Name the inconsistency", summary: "Call out the unfair comparison instead of absorbing it.", effects: { support: -4, burnout: 5 }, result: "You call out the unequal bar and leave the conversation steadier than the room expected." }
    },
    {
      title: "Still Treated Like the Organized One",
      text: "Even at promotion time, your strongest technical work is described as teamwork while peers are described as deep or strategic.",
      agree: { label: "Lean into the helpful image", summary: "Accept the likable framing instead of contesting it.", effects: { support: 7, techCred: -4, burnout: 6 }, status: "Pigeonholed", result: "You stay likable in the room, but the room keeps narrowing how it sees you." },
      decline: { label: "Reframe your impact technically", summary: "Shift the conversation back to architecture and measurable technical work.", effects: { techCred: 8, burnout: 6 }, result: "You push the conversation back toward architecture, systems thinking, and measurable outcomes." }
    },
    {
      title: "Promotion Packet Homework",
      text: "You realize your promotion packet needs far more evidence than your peers seem to provide, so nights start filling with screenshots, docs, and impact summaries.",
      agree: { label: "Build the exhaustive packet", summary: "Assemble a detailed proof file so the case cannot be ignored.", effects: { techCred: 10, burnout: 10, energy: -6 }, result: "You create a bulletproof case, but you do unpaid after-hours labor to do it." },
      decline: { label: "Submit a lean case", summary: "Refuse the extra homework and submit a lighter case.", effects: { burnout: 4, techCred: 3, support: -2 }, result: "You refuse to overperform for the process, even if it may cost you credit." }
    },
    {
      title: "Feedback Without a Rubric",
      text: "You are told to be more strategic, but no one can explain what that means in a way that can actually guide your next six months.",
      agree: { label: "Translate it yourself", summary: "Decode the vague feedback on your own and turn it into a plan.", effects: { techCred: 7, burnout: 7, energy: -4 }, result: "You reverse-engineer the expectations and do the emotional translation work alone." },
      decline: { label: "Force concrete criteria", summary: "Push for explicit, measurable promotion criteria.", effects: { support: -3, burnout: 5, techCred: 5 }, result: "You insist on measurable expectations and make the vagueness visible." }
    },
    {
      title: "He Sounds Senior, You Sound Helpful",
      text: "In a calibration discussion, a peer's confidence is described as leadership while your similar confidence is described as strong collaboration.",
      agree: { label: "Stay agreeable", summary: "Keep the tone smooth even if it shrinks how your work is framed.", effects: { support: 6, techCred: -3, burnout: 5 }, result: "You preserve the relationship but accept a smaller frame for your contribution." },
      decline: { label: "Challenge the framing", summary: "Push back on the language and name the leadership plainly.", effects: { techCred: 7, burnout: 6, support: -2 }, result: "You push back on the language and force the room to hear your leadership as technical leadership." }
    },
    {
      title: "Acting Lead Without the Title",
      text: "A manager goes on leave and you start handling roadmap calls, escalations, and staffing questions without anyone formally updating your scope.",
      agree: { label: "Do the acting role", summary: "Take on the unofficial lead work to prove you can already do it.", effects: { techCred: 8, support: 5, burnout: 10, energy: -5 }, status: "The Glue", result: "You keep the team moving and create more proof, but the role expansion arrives without the protection of the title." },
      decline: { label: "Ask for formal scope first", summary: "Push for a real mandate before taking on the acting-lead burden.", effects: { support: -3, techCred: 6, burnout: 4 }, result: "You make the hidden promotion stretch visible and force the org to decide whether it actually wants to resource it." }
    },
    {
      title: "Calibration Spreadsheet Shock",
      text: "You finally see the promotion matrix and realize your peers are being judged on fewer dimensions than you are, with softer language hiding harder standards.",
      agree: { label: "Audit the matrix", summary: "Spend time dissecting the rubric so you can game it back on its own terms.", effects: { techCred: 5, burnout: 8, energy: -4, support: 2 }, result: "You decode the machinery well enough to navigate it, but the emotional cost of studying it is real." },
      decline: { label: "Build outside leverage", summary: "Stop treating this rubric as the whole world and invest in sponsors and external signal instead.", effects: { support: 8, techCred: 4, burnout: 3 }, result: "You stop worshipping the spreadsheet and make yourself harder to trap inside one internal process." }
    },
    {
      title: "Withdraw the Stretch Case",
      text: "You can keep forcing a high-intensity stretch narrative for promotion, or temporarily step back to something sustainable and accept that the room may read the shift as less ambition.",
      agree: { label: "Choose the sustainable pace", summary: "Recover some capacity by stepping back from the stretch performance cycle.", effects: { burnout: -8, energy: 6, techCred: -3, support: -2 }, result: "You stop living inside a constant promotion audition and regain some actual capacity, while paying for it in visible momentum." },
      decline: { label: "Keep the pressure on", summary: "Stay in full proving mode so your ambition remains unmistakable.", effects: { techCred: 6, support: 3, burnout: 6, energy: -4 }, result: "You keep your trajectory loudly visible, but the pace keeps cutting directly into your reserves." }
    }
  ],
  2: [
    {
      title: "Interrupted in Meetings",
      text: "You introduce an architecture idea, get talked over, and hear the same point praised when repeated later by someone else.",
      agree: { label: "Reclaim the point", summary: "Interrupt the rewrite of your idea and name it as yours.", effects: { techCred: 9, burnout: 8 }, result: "You name your contribution and keep your authorship visible." },
      decline: { label: "Let it pass", summary: "Let the moment go instead of fighting for authorship in public.", effects: { burnout: 10, support: -5 }, result: "You preserve the room's comfort and lose influence you already earned." }
    },
    {
      title: "From Helpful to Technical Leader",
      text: "You are already leading cross-team work, but people still introduce you as the person who keeps things organized rather than the person driving architecture.",
      agree: { label: "Keep proving it through output", summary: "Add even more execution so no one can dismiss your leadership.", effects: { techCred: 10, burnout: 9, energy: -5 }, result: "You pile on more execution to make your leadership undeniable." },
      decline: { label: "Claim technical authorship directly", summary: "Name your leadership plainly instead of hoping people infer it.", effects: { techCred: 7, support: -2, burnout: 5 }, result: "You make the leadership explicit and accept that not everyone likes being corrected." }
    },
    {
      title: "Mentor Everyone",
      text: "You are the person junior women and interns feel safe going to, but that labor is invisible in the promotion packet.",
      agree: { label: "Keep doing it all", summary: "Continue carrying the mentoring load even though it is invisible.", effects: { support: 12, burnout: 12 }, status: "The Glue", result: "You become essential to people, but not necessarily legible to the ladder." },
      decline: { label: "Protect your scope", summary: "Set limits on mentoring so your core work stays protected.", effects: { burnout: 4, support: -4 }, result: "You reduce the emotional load and accept that not everyone will like your limits." }
    },
    {
      title: "Tone Feedback",
      text: "You deliver direct technical feedback and are told you seem intense, while sharper feedback from male peers is treated as leadership.",
      agree: { label: "Soften everything", summary: "Rewrite your tone so the feedback lands more comfortably for others.", effects: { support: 6, burnout: 7, energy: -4 }, result: "You become easier for others to hear and harder for yourself to sustain." },
      decline: { label: "Stay direct", summary: "Keep the technical feedback clear even if it reads harsher.", effects: { techCred: 7, burnout: 6 }, result: "You protect your technical clarity and absorb some social friction." }
    },
    {
      title: "Glue Work Spiral",
      text: "Your cross-team project succeeds because you quietly coordinate everyone, but the visible story becomes that the team just clicked naturally.",
      agree: { label: "Keep filling the gaps", summary: "Continue doing the invisible coordination that keeps everything working.", effects: { support: 10, burnout: 10 }, status: "The Glue", result: "You keep the machine running and become even more trapped by being indispensable." },
      decline: { label: "Let gaps stay visible", summary: "Stop patching every hole so the hidden work becomes visible.", effects: { burnout: 5, techCred: 6, support: -3 }, result: "You stop hiding structural problems and make your leadership legible through what breaks without it." }
    },
    {
      title: "Strategy Deck, Execution Tax",
      text: "Leadership wants your strategic input on a roadmap, but you are still expected to carry the same execution load underneath it.",
      agree: { label: "Do both layers", summary: "Carry strategy and execution at the same time to prove range.", effects: { techCred: 11, burnout: 11, energy: -6 }, result: "You show staff-level range, but the combined expectation is punishing." },
      decline: { label: "Trade execution for strategy", summary: "Push to drop some delivery work if strategic work is expected.", effects: { techCred: 7, burnout: 4, support: -2 }, result: "You protect your capacity by forcing a conversation about what you can actually carry." }
    },
    {
      title: "Attribution Cleanup",
      text: "A cross-functional partner keeps summarizing your architectural decisions as group outcomes rather than your direction.",
      agree: { label: "Clean up attribution privately", summary: "Repair the credit story in private instead of challenging it publicly.", effects: { support: 5, techCred: 4, burnout: 4 }, result: "You restore some credit quietly, even if it feels like extra maintenance labor." },
      decline: { label: "Correct it in the room", summary: "Name the attribution problem out loud while everyone is present.", effects: { techCred: 8, burnout: 6, support: -2 }, result: "You make your authorship visible in public and accept the discomfort it creates." }
    },
    {
      title: "Delegation Debt",
      text: "You finally have influence, but work still bottlenecks through you because everyone expects you to be the reliable last reviewer, translator, and fixer.",
      agree: { label: "Keep the quality choke point", summary: "Stay the final checkpoint so nothing breaks on your watch.", effects: { techCred: 7, support: 6, burnout: 9, energy: -5 }, status: "The Glue", result: "You protect short-term quality and quietly deepen the dependency on your invisible coordination." },
      decline: { label: "Let others own the misses", summary: "Push ownership outward even if some rough edges show up publicly.", effects: { burnout: 4, support: -4, techCred: 8 }, result: "You give other people enough rope to learn, and the system becomes less dependent on your private catch-up labor." }
    },
    {
      title: "Headcount Trade",
      text: "You can use your political capital to hire a strong engineer for your domain or spend it on a broader org need that helps everyone but weakens your own team first.",
      agree: { label: "Fight for your own team", summary: "Use your influence to strengthen your immediate technical surface area.", effects: { techCred: 9, support: -3, burnout: 3 }, result: "You secure sharper local leverage and accept the optics of being less universally generous." },
      decline: { label: "Spend it on the shared problem", summary: "Use your scarce leverage on the wider org issue instead of your own team.", effects: { support: 10, burnout: 6, techCred: 2 }, result: "You become known as a leader who sees the whole board, even as your own lane stays thinner than it could have been." }
    },
    {
      title: "Let a Noncritical Fire Cool",
      text: "A noisy but noncritical cross-team problem keeps dragging you into emergency posture. You could stop treating it like a personal referendum on your leadership, but doing so may cost you some political credit.",
      agree: { label: "Step back from the fire", summary: "Recover by refusing to make every noisy problem your personal emergency.", effects: { burnout: -6, energy: 5, support: -4, techCred: -2 }, result: "You stop donating your nervous system to a solvable problem and get some capacity back, though a few people decide you were less heroic than usual." },
      decline: { label: "Stay in emergency mode", summary: "Keep carrying the issue personally so nothing slips on your watch.", effects: { support: 5, techCred: 4, burnout: 7, energy: -5 }, result: "You preserve your reputation as the stabilizer, but your own reserves keep absorbing the cost." }
    }
  ],
  3: [
    {
      title: "Management Suggestion, Technical Doubt",
      text: "Leadership keeps suggesting management because you are 'great with people,' while treating your path to top technical roles as less obvious.",
      agree: { label: "Take the management lane", summary: "Accept the leadership track they are steering you toward.", effects: { support: 12, burnout: 10, techCred: 5 }, status: "People Drama", result: "You gain formal influence and inherit a heavier share of emotional labor." },
      decline: { label: "Insist on the IC path", summary: "Defend your path to senior technical work instead of switching lanes.", effects: { techCred: 12, burnout: 6 }, result: "You defend your technical ambition and sharpen your specialist credibility." }
    },
    {
      title: "Prestige Path or Support Network",
      text: "A new high-visibility opportunity appears. One version gives you executive exposure but little air cover. Another comes with stronger allies but less status.",
      agree: { label: "Take the prestige-heavy option", summary: "Choose the higher-status path even without much air cover.", effects: { techCred: 11, support: -4, burnout: 6 }, result: "You choose the route with more status and less protection." },
      decline: { label: "Choose the support-heavy option", summary: "Prioritize backing and coalition over pure prestige.", effects: { techCred: 6, support: 9, burnout: 2 }, result: "You build a stronger coalition, even if the title bump is smaller." }
    },
    {
      title: "Staff Without Sponsorship",
      text: "The work expected for Staff is already on your plate, but no one is explicitly naming you as ready.",
      agree: { label: "Do the work first", summary: "Take on staff-level work before anyone agrees to sponsor you.", effects: { techCred: 11, burnout: 11, energy: -6 }, result: "You operate at the level before you are recognized at the level." },
      decline: { label: "Demand sponsorship", summary: "Push for explicit sponsorship instead of proving yourself indefinitely.", effects: { support: 5, burnout: 5 }, result: "You force a conversation about who gets advocated for and by whom." }
    },
    {
      title: "Invisible Manager Track",
      text: "You are suddenly getting people-problem work, conflict mediation, and retention concerns because everyone trusts you with emotions, not just systems.",
      agree: { label: "Carry the people load", summary: "Take on the extra people problems because you are trusted with them.", effects: { support: 9, burnout: 9 }, status: "People Drama", result: "You become central to organizational stability and drift further from protected technical time." },
      decline: { label: "Refocus on technical scope", summary: "Push the role back toward engineering instead of emotional cleanup work.", effects: { techCred: 7, burnout: 5, support: -3 }, result: "You redirect your role back toward engineering impact, even if some people call it less collaborative." }
    },
    {
      title: "Executive Exposure, Thin Safety Net",
      text: "You get a chance to present to senior leadership, but the opportunity comes without the prep, air cover, or sponsor your peers often seem to get.",
      agree: { label: "Take the slot anyway", summary: "Take the leadership exposure even without preparation or backing.", effects: { techCred: 10, burnout: 8, energy: -5 }, result: "You take the visibility and absorb the prep cost yourself." },
      decline: { label: "Ask for backing first", summary: "Ask for real prep and sponsor support before accepting the slot.", effects: { support: 6, burnout: 3, techCred: 3 }, result: "You insist that visibility should come with support, not just exposure." }
    },
    {
      title: "Leadership Persona Audit",
      text: "You are told to look more executive, sound more certain, and stay approachable all at once.",
      agree: { label: "Perform the full persona", summary: "Spend energy matching the exact executive image being asked of you.", effects: { support: 6, burnout: 8, energy: -4 }, result: "You spend real effort managing how you are perceived instead of just what you deliver." },
      decline: { label: "Stay technically grounded", summary: "Stick to substance instead of performing the approved persona.", effects: { techCred: 7, burnout: 5, support: -2 }, result: "You center substance over performance and accept that some evaluators will read that as less polished." }
    },
    {
      title: "Reorg Whisper Campaign",
      text: "A reorg is being shaped in side conversations. You can spend political energy joining the whisper network or stay out and react later from a weaker position.",
      agree: { label: "Enter the backchannel", summary: "Spend social capital in the informal process so your org is not designed around you.", effects: { support: 8, burnout: 7, energy: -4, techCred: 3 }, result: "You buy influence in the informal arena and keep yourself from being reorganized as an afterthought." },
      decline: { label: "Stay out of it", summary: "Refuse the gossip economy and preserve your capacity for direct work.", effects: { burnout: 3, support: -5, techCred: 4 }, result: "You keep your dignity and your time, but you give up some say over the shape of the coming org chart." }
    },
    {
      title: "Staff Meeting, Parent-Teacher Conflict",
      text: "A mandatory offsite for senior leaders lands on the same day as a major school meeting you cannot easily move, and both sides assume you will accommodate them.",
      agree: { label: "Protect the leadership room", summary: "Attend the staff event and absorb the fallout at home.", effects: { techCred: 7, support: 3, burnout: 8, homeFront: -10 }, result: "You stay visible in the leadership room and pay for it by destabilizing the already fragile logistics at home." },
      decline: { label: "Protect the home obligation", summary: "Choose the school commitment and accept the executive-visibility loss.", effects: { techCred: -4, burnout: 3, workFront: -8, homeFront: 6 }, result: "You keep the home front from slipping and accept that some people at work will quietly call it a missed signal." }
    }
  ],
  4: [
    {
      title: "The Handover",
      text: "You need to hand over a visible project before leave. A clean handover protects your credibility, but it is a lot of extra work before you go.",
      agree: { label: "Comprehensive handover", summary: "Do a full handover so your work survives your absence clearly.", effects: { energy: -17, support: 4, burnout: 3 }, result: "You document everything and make it harder for your impact to be erased while you are gone." },
      decline: { label: "Quick exit", summary: "Leave quickly to protect your energy and accept a rougher return.", effects: { techCred: -12, energy: 3, burnout: 2 }, status: "Skill Gap", result: "You preserve your remaining energy now, but re-entry gets rougher later." }
    },
    {
      title: "The Mommy Track",
      text: "When you return, leadership suggests a maintenance team because it is 'more manageable' for your new situation.",
      agree: { label: "Accept the lower-visibility role", summary: "Take the more manageable role even though it limits visibility.", effects: { burnout: -3, techCred: -15, support: 4 }, status: "Pigeonholed", result: "The work becomes easier to carry and harder to leverage." },
      decline: { label: "Demand your old level of scope", summary: "Push to return at your old level instead of accepting downscoping.", effects: { techCred: 10, burnout: 13, energy: -4 }, result: "You insist your ambition did not go on leave even if assumptions about you did." }
    },
    {
      title: "Out of Sight",
      text: "A stack change happens while you are away, and the team starts talking like you are behind now.",
      agree: { label: "Study during leave", summary: "Use leave time to keep up with the changing stack.", effects: { techCred: 6, burnout: 11, energy: -10 }, result: "You keep your skills current by spending personal recovery time on catch-up." },
      decline: { label: "Stay logged off", summary: "Protect the leave fully and catch up only when you return.", effects: { techCred: -8, burnout: -4 }, result: "You protect your leave and accept the extra ramp-up cost later." }
    },
    {
      title: "Coverage Assumption",
      text: "People assume you will still be informally available during leave for context, clarifications, and rescue questions.",
      agree: { label: "Answer the pings", summary: "Stay partially available during leave so the team can keep leaning on you.", effects: { support: 5, burnout: 9, energy: -7 }, result: "You smooth the transition for everyone else and lose a chunk of your actual leave." },
      decline: { label: "Keep the boundary", summary: "Hold the leave boundary and refuse the rescue requests.", effects: { burnout: 3, support: -4, techCred: 1 }, result: "You protect the leave and let the handover stand on its own." }
    },
    {
      title: "Return to a Smaller Role",
      text: "After leave, a high-impact initiative moves on without you and your re-entry plan is framed as easing back in slowly.",
      agree: { label: "Accept the smaller scope", summary: "Take the gentler re-entry even though it cuts your momentum.", effects: { burnout: -2, techCred: -11, support: 4 }, status: "Pigeonholed", result: "You get a softer landing at the cost of visible momentum." },
      decline: { label: "Push for equivalent impact", summary: "Fight to return at full impact instead of easing in smaller.", effects: { techCred: 8, burnout: 11, support: -2, energy: -3 }, result: "You insist that leave did not reduce your level, even if reclaiming it is exhausting." }
    },
    {
      title: "Re-Onboarding Tax",
      text: "You are back, but no one has made time to reintroduce context, systems changes, or stakeholder shifts in a serious way.",
      agree: { label: "Self-onboard after hours", summary: "Catch yourself up alone by using nights and leftover energy.", effects: { techCred: 8, burnout: 10, energy: -8 }, result: "You recover your footing by adding unpaid catch-up work to an already difficult return." },
      decline: { label: "Demand structured ramp-up", summary: "Push for a real re-entry plan instead of improvising alone.", effects: { support: 5, burnout: 5, techCred: 2 }, result: "You make the re-entry burden visible and ask the organization to own part of it." }
    },
    {
      title: "Returning to Your Own Replacement",
      text: "A contractor who covered your leave is now treated like the default owner of your old area, and the team expects you to just slide in around that reality.",
      agree: { label: "Share the ownership", summary: "Accept the split so you can re-enter with less immediate conflict.", effects: { burnout: 5, support: 5, techCred: -7 }, status: "Pigeonholed", result: "You reduce the immediate friction, but the smaller frame for your technical role starts hardening." },
      decline: { label: "Reclaim the area directly", summary: "Push to be recognized again as the true owner of the work.", effects: { techCred: 9, burnout: 10, support: -3, energy: -3 }, result: "You reassert your technical claim and force an uncomfortable correction instead of slowly disappearing around it." }
    },
    {
      title: "Calendar Full of Soft Work",
      text: "Your return schedule fills with catch-up coffees, empathy syncs, and culture conversations while the deeper technical work you need for momentum keeps getting pushed later.",
      agree: { label: "Do the social re-entry", summary: "Spend the time rebuilding social context even though it crowds out technical depth.", effects: { support: 9, burnout: 9, techCred: -6, energy: -3 }, result: "You become legible and easy to work with again, but your technical recovery slows under the softer work." },
      decline: { label: "Block rebuild time", summary: "Protect uninterrupted technical hours even if people call it abrupt.", effects: { techCred: 8, burnout: 5, support: -3, energy: -7 }, result: "You rebuild your technical footing faster and accept that some relationships will feel less tended in the short term." }
    },
    {
      title: "Use the Slow Return Window",
      text: "There is a narrow chance to take a genuinely lighter week and rebuild your body and sleep, but it would mean letting your re-entry look less impressive than you hoped.",
      agree: { label: "Take the lighter week", summary: "Recover some energy now by accepting slower visible momentum.", effects: { burnout: -9, energy: 7, techCred: -8, support: -2 }, result: "You use the lighter week to actually recover instead of performing a heroic return, and your body thanks you even if your momentum briefly looks quieter." },
      decline: { label: "Push a strong return", summary: "Stay visibly sharp and productive so no one mistakes leave for a loss of pace.", effects: { techCred: 6, support: 3, burnout: 7, energy: -4 }, result: "You make your return look strong and seamless, but the extra effort comes directly out of your remaining reserves." }
    }
  ],
  5: [
    {
      title: "Sick Child vs. Release",
      text: "Your child has a fever on the day of a major release. No option lets both worlds remain untouched.",
      agree: { label: "Work from home", summary: "Attempt to cover the release and the sick child at once.", effects: { burnout: 15, techCred: -5 }, result: "You try to hold everything together and end the day feeling split in half." },
      decline: { label: "Take the day fully", summary: "Choose caregiving first and let work absorb the hit.", effects: { techCred: -15, burnout: -4 }, result: "You choose care over optics and pay for it at work." }
    },
    {
      title: "The 24/7 Culture",
      text: "A VP pings you late at night asking for numbers by morning, assuming someone senior is always on.",
      agree: { label: "Reply now", summary: "Answer the late-night request immediately to stay politically safe.", effects: { techCred: 10, burnout: 10 }, result: "You gain immediate political credit and lose tomorrow's breathing room." },
      decline: { label: "Reply tomorrow", summary: "Wait until morning and accept the optics cost of that boundary.", effects: { techCred: -5, burnout: 2 }, result: "You hold the line and accept the small reputational hit." }
    },
    {
      title: "The Guilt Card",
      text: "You miss a family milestone because production is on fire, and then feel guilty in both directions.",
      agree: { label: "Internalize it", summary: "Carry the guilt privately instead of sharing the conflict with anyone.", effects: { burnout: 18 }, result: "You carry the guilt alone and it spills into everything else." },
      decline: { label: "Lean on community", summary: "Reach out for help so you do not have to carry both fronts alone.", effects: { support: -6, burnout: -8 }, result: "You ask for help and let support interrupt the spiral." }
    },
    {
      title: "School Event vs. Site Incident",
      text: "A caregiving commitment collides with an incident that senior leadership suddenly cares about, and everyone turns to whoever is known to be reliable.",
      agree: { label: "Handle both badly", summary: "Try to satisfy both work and caregiving instead of choosing cleanly.", effects: { burnout: 16, techCred: -4 }, result: "You split yourself across both fronts and feel like you failed each one a little." },
      decline: { label: "Choose one cleanly", summary: "Protect one obligation fully and knowingly disappoint the other.", effects: { burnout: 6, support: -3, techCred: -6 }, result: "You protect one front by consciously disappointing the other." }
    },
    {
      title: "Always-On Reputation",
      text: "Because you have been dependable for years, the organization now treats instant responsiveness like part of your identity.",
      agree: { label: "Keep the reputation up", summary: "Maintain the always-on image even though it keeps costing you.", effects: { techCred: 9, burnout: 11 }, result: "You preserve the image of reliability and feed the culture that drains you." },
      decline: { label: "Reset expectations", summary: "Deliberately lower the responsiveness expectation for the future.", effects: { burnout: 4, support: -4, techCred: 2 }, result: "You make a healthier pattern possible, but not everyone thanks you for it." }
    },
    {
      title: "Second Shift Sprint",
      text: "A critical work deadline lands during an already overloaded week at home, and the only obvious path is to steal rest from yourself.",
      agree: { label: "Work after everyone sleeps", summary: "Steal rest from yourself so neither side slips right away.", effects: { techCred: 8, burnout: 14, energy: -8 }, result: "You preserve both fronts temporarily by taking the cost directly into your own body." },
      decline: { label: "Let one deadline slip", summary: "Allow one side to be imperfect instead of buffering both with your body.", effects: { burnout: 5, techCred: -7, support: 2 }, result: "You accept an imperfection now instead of turning yourself into the buffer forever." }
    },
    {
      title: "Community Save",
      text: "Support is available, but using it means admitting that you cannot personally absorb every collision between work and home.",
      agree: { label: "Ask for help", summary: "Use the support that exists instead of proving you can absorb it all.", effects: { burnout: -10, support: -4, homeFront: 5 }, result: "You let community carry part of the load and buy back actual capacity." },
      decline: { label: "Carry it yourself", summary: "Keep proving you can handle it alone, even at real personal cost.", effects: { burnout: 12, support: 2 }, result: "You protect the image of self-sufficiency and pay for it with real depletion." }
    },
    {
      title: "Invisible Logistics Spreadsheet",
      text: "You quietly become the person coordinating school forms, medicine pickups, coverage swaps, and release timing because no one else is holding the full picture together.",
      agree: { label: "Keep the spreadsheet in your head", summary: "Continue absorbing the hidden logistics work to keep both fronts from wobbling.", effects: { support: 5, burnout: 10, homeFront: 4, workFront: 3 }, status: "People Drama", result: "Everything keeps moving because you keep the whole system in your head, and the cost lands invisibly inside your own bandwidth." },
      decline: { label: "Make the labor visible", summary: "Push the planning burden outward so other people have to carry real pieces of it.", effects: { burnout: 5, support: -3, homeFront: -4 }, result: "You stop being the silent operating system for everyone else, even if the handoff is messier than doing it all yourself." }
    },
    {
      title: "Travel Request, No Childcare Buffer",
      text: "A strategically useful work trip comes up with almost no notice, and taking it means rebuilding home coverage from scratch while pretending this is normal.",
      agree: { label: "Make the trip happen", summary: "Take the opportunity and rebuild home logistics around it at high cost.", effects: { techCred: 10, burnout: 9, homeFront: -8, workFront: 4 }, result: "You secure the career signal and force the home system to bend around it again." },
      decline: { label: "Stay local", summary: "Protect the home system and accept missing the visible career moment.", effects: { techCred: -5, burnout: 2, homeFront: 5, workFront: -3 }, result: "You keep the home front steadier and pay for it with a quieter professional footprint this round." }
    }
  ]
};

export const PROJECT_SCENARIOS = [
  {
    title: "Legacy Cleanup No One Wanted",
    text: "A brittle legacy service is failing quietly in production. It is essential, risky, and less glamorous than the new work getting praise.",
    projectTier: 1,
    tags: ["Tech Debt", "Invisible"],
    agree: { label: "Take ownership", summary: "Volunteer for the messy critical work and own the rescue.", effects: { techCred: 14, burnout: 9, energy: -8 }, result: "You stabilize critical infrastructure and earn hard-won credibility through unattractive work." },
    decline: { label: "Protect your bandwidth", summary: "Say no to becoming the default fixer for a brittle system.", effects: { support: -2, burnout: 2, energy: 3 }, result: "You avoid becoming the default fixer, but someone else gets the visible rescue story." }
  },
  {
    title: "Rewrite the Onboarding Docs",
    text: "The onboarding path is full of tribal knowledge gaps that hit outsiders hardest. Fixing it would help future hires, but it is classic undervalued glue work.",
    projectTier: 1,
    tags: ["Glue Work", "Community"],
    agree: { label: "Do the docs rewrite", summary: "Fix the onboarding gaps even though the work is undervalued.", effects: { techCred: 8, support: 10, burnout: 4 }, status: "The Glue", result: "You materially improve the team and make future entry easier, even if the promo rubric barely sees it." },
    decline: { label: "Prioritize core engineering", summary: "Leave the docs gap alone and stay focused on technical scope.", effects: { techCred: 5, burnout: 1, support: -2 }, result: "You keep focus on technical scope and leave the documentation gap unresolved for now." }
  },
  {
    title: "Internal Tool Nobody Owns",
    text: "A flaky internal developer tool keeps slowing everyone down. Fixing it will make the whole engineering org faster, but the impact will be spread out and hard to narrate.",
    projectTier: 1,
    tags: ["Developer Experience", "Shared Infrastructure"],
    agree: { label: "Adopt the tool", summary: "Take ownership of the neglected internal tool and improve the developer experience quietly.", effects: { techCred: 10, support: 7, burnout: 5 }, result: "You remove pain across the org and become the reason many people move faster, even if the credit diffuses outward." },
    decline: { label: "Leave it untouched", summary: "Skip the thankless tooling work and keep your effort on narrower visible tasks.", effects: { techCred: 6, burnout: 1, support: -1 }, result: "You preserve some focus for your own lane, but the shared pain continues and someone else may eventually get the gratitude for fixing it." }
  },
  {
    title: "Data Backfill Weekend",
    text: "A messy data repair can be done now with a quiet weekend push or deferred into a slower, more public process involving three teams and a lot more coordination.",
    projectTier: 1,
    tags: ["Data", "Tradeoff"],
    agree: { label: "Do the quiet fix", summary: "Take the contained but personally costly path and solve it fast yourself.", effects: { techCred: 11, burnout: 8, energy: -7 }, result: "You solve a real operational problem quickly, but the speed comes directly out of your own off-hours capacity." },
    decline: { label: "Force the visible process", summary: "Push the repair into the official multi-team process instead of quietly absorbing it.", effects: { support: 5, burnout: 3, techCred: 4 }, result: "You make the organizational cost visible and avoid privately subsidizing the fix, even if the repair takes longer." }
  },
  {
    title: "Accessibility Retrofit With No PM",
    text: "A product flow is excluding users and needs meaningful accessibility work, but there is no PM driving it and no roadmap slot protecting the effort.",
    projectTier: 1,
    tags: ["Accessibility", "Product Gap"],
    agree: { label: "Drive the retrofit", summary: "Take on the accessibility overhaul even without clear product sponsorship.", effects: { techCred: 9, support: 9, burnout: 6 }, status: "The Glue", result: "You materially improve the product and widen who it works for, while absorbing the coordination burden that nobody staffed." },
    decline: { label: "Wait for product backing", summary: "Refuse to own the retrofit until the organization gives it real sponsorship.", effects: { support: -2, burnout: 2, techCred: 5 }, result: "You avoid becoming the unpaid engine for a neglected priority and force the gap to stay visible." }
  },
  {
    title: "Prove You Can Scale It",
    text: "A high-risk infrastructure effort opens up, and no one is naturally assuming you belong on it. Taking it would be a stretch with real upside.",
    projectTier: 2,
    tags: ["Stretch", "Systems"],
    agree: { label: "Volunteer for the scale work", summary: "Step into the stretch systems project before anyone offers it to you.", effects: { techCred: 18, burnout: 12, energy: -10 }, result: "You take the hardest technical lane in the room and make your systems depth impossible to ignore." },
    decline: { label: "Wait for safer scope", summary: "Pass on the stretch work and wait for a safer opportunity.", effects: { support: 2, burnout: -1, techCred: 2 }, result: "You avoid the overperformance trap for now, but the prestige work goes elsewhere." }
  },
  {
    title: "Ship the Feature You Were Finally Trusted With",
    text: "After fighting for scope, you finally get a critical feature with real visibility and very little margin for error.",
    projectTier: 2,
    tags: ["Visibility", "Proof"],
    agree: { label: "Push it over the line", summary: "Drive the high-visibility feature through even under heavy pressure.", effects: { techCred: 16, burnout: 10, energy: -8 }, result: "You deliver under pressure and convert rare trust into visible technical proof." },
    decline: { label: "Ask for narrower scope", summary: "Reduce the ask so the risk stays manageable.", effects: { support: -1, burnout: 2, techCred: 4 }, result: "You reduce the risk surface, but the biggest upside shrinks with it." }
  },
  {
    title: "Conference Talk After Hours",
    text: "A technical talk could raise your profile, but the prep will land mostly on nights and weekends because your workday is already full.",
    projectTier: 2,
    tags: ["Brand", "Extra Labor"],
    agree: { label: "Prepare the talk", summary: "Use your off-hours to turn expertise into public visibility.", effects: { techCred: 13, burnout: 8, support: 5, timeSlots: -1 }, result: "You build public technical credibility by converting personal time into career signal." },
    decline: { label: "Keep evenings protected", summary: "Protect your evenings instead of spending them on reputation work.", effects: { burnout: -2, energy: 4, techCred: 3 }, result: "You preserve recovery time and accept a slower path to external recognition." }
  },
  {
    title: "Cross-Team Migration With No PM",
    text: "A risky migration needs engineering leadership, stakeholder wrangling, and a delivery plan, but no product manager is actually carrying the coordination.",
    projectTier: 2,
    tags: ["Migration", "Coordination"],
    agree: { label: "Lead the whole migration", summary: "Own both the technical and cross-functional load so the work actually lands.", effects: { techCred: 15, support: 7, burnout: 9, energy: -6 }, status: "The Glue", result: "You deliver a hard migration by covering both systems work and org glue, and the success depends more on your invisible coordination than anyone admits." },
    decline: { label: "Demand a real owner", summary: "Refuse to absorb the missing product and program work yourself.", effects: { techCred: 6, burnout: 3, support: -2 }, result: "You keep the missing role visible and stop the migration from being financed by your private extra labor." }
  },
  {
    title: "Emergency Hiring Panel",
    text: "A senior hiring loop is falling apart and you are asked to rebuild the panel, rewrite the exercise, and keep the candidate process from collapsing.",
    projectTier: 2,
    tags: ["Hiring", "Org Health"],
    agree: { label: "Rescue the process", summary: "Take over the hiring machinery so the candidate experience and team needs do not crater.", effects: { support: 10, techCred: 7, burnout: 8, energy: -5 }, result: "You save an important process and become more trusted across the org, but the technical upside is less legible than the effort you spent." },
    decline: { label: "Protect engineering scope", summary: "Let the org feel the staffing failure instead of privately preventing it.", effects: { techCred: 9, burnout: 2, support: -4 }, result: "You protect your engineering trajectory and force the team to confront the real cost of under-resourcing hiring work." }
  },
  {
    title: "AI Pilot With Unknown Risk",
    text: "Leadership wants a fast AI pilot in production, but the governance, evaluation, and rollback plans are all hand-wavy at best.",
    projectTier: 2,
    tags: ["AI", "Ambiguity"],
    agree: { label: "Shape the pilot carefully", summary: "Take the experiment on, but build the missing safeguards yourself.", effects: { techCred: 17, burnout: 7, energy: -5, support: 3 }, result: "You turn hype into something technically credible, but you have to invent the responsible process while shipping it." },
    decline: { label: "Refuse the fake deadline", summary: "Push back on the pilot until success and risk are defined more honestly.", effects: { support: -3, burnout: 4, techCred: 7 }, result: "You stop a vague mandate from becoming your problem in disguise and accept that some leaders will read caution as resistance." }
  },
  {
    title: "Zero-Downtime Launch Promise",
    text: "Sales has promised a client a clean cutover with no downtime, and engineering can either absorb the promise or publicly renegotiate it.",
    projectTier: 2,
    tags: ["Customer", "Negotiation"],
    agree: { label: "Honor the promise", summary: "Carry the technical burden needed to make the commitment true.", effects: { techCred: 16, burnout: 10, energy: -8 }, result: "You pull off a hard launch and convert someone else's promise into engineering reality at real personal cost." },
    decline: { label: "Renegotiate the scope", summary: "Push the client promise back toward something engineering can sustain honestly.", effects: { support: 4, burnout: 2, techCred: 5 }, result: "You make the constraint legible and protect the team from a fake inevitability, even if the room briefly prefers optimism to truth." }
  },
  {
    title: "Platform Rewrite With Your Name on It",
    text: "A platform rewrite suddenly has executive attention and enough ambiguity to become a career-defining success or failure.",
    projectTier: 3,
    tags: ["Visibility", "Architecture"],
    agree: { label: "Lead the rewrite", summary: "Put your name on the rewrite and carry the organizational risk.", effects: { techCred: 22, burnout: 14, energy: -12 }, result: "You attach your name to one of the biggest technical bets in the org and carry the pressure that comes with it." },
    decline: { label: "Stay on steadier work", summary: "Choose the steadier path instead of tying yourself to the rewrite.", effects: { support: 3, burnout: -1, techCred: 5 }, result: "You choose a more sustainable path and let someone else absorb the rewrite's volatility." }
  },
  {
    title: "Global Incident Command Rotation",
    text: "Leadership wants you to create and run a new incident command model across regions, which means visibility, politics, and a lot of operational load that will be remembered if it fails.",
    projectTier: 3,
    tags: ["Operations", "Executive Visibility"],
    agree: { label: "Own the command model", summary: "Take on the high-stakes operating model and make yourself accountable for it end to end.", effects: { techCred: 20, support: 9, burnout: 13, energy: -9 }, result: "You become synonymous with a critical operating system and gain real authority, but the pager-shaped cost to your life and body is immediate." },
    decline: { label: "Stay out of command", summary: "Avoid letting operations leadership swallow the rest of your technical agenda.", effects: { techCred: 7, burnout: 1, support: -3 }, result: "You protect your longer-term technical surface area and let someone else become the face of the operational regime." }
  },
  {
    title: "Org-Wide Cost Reduction Mandate",
    text: "You are asked to lead a visible cost-cutting program that will reshape architecture, vendor choices, and team habits while putting you in conflict with nearly every comfort zone in the org.",
    projectTier: 3,
    tags: ["Strategy", "Finance"],
    agree: { label: "Lead the mandate", summary: "Take responsibility for the hard cost program and the politics that come with it.", effects: { techCred: 21, burnout: 12, support: -2, energy: -8 }, result: "You build real strategic credibility by changing the economics of the platform, but plenty of people will associate you with the pain needed to get there." },
    decline: { label: "Offer technical advice only", summary: "Contribute selectively without becoming the political owner of the whole cutover.", effects: { techCred: 10, burnout: 3, support: 2 }, result: "You keep your expertise in the room without making yourself the central target for every consequence of the mandate." }
  },
  {
    title: "Acquisition System Merger",
    text: "Your company acquires another team and the systems need to be merged fast enough for leadership optics but safely enough to avoid a long, expensive failure tail.",
    projectTier: 3,
    tags: ["Integration", "Politics"],
    agree: { label: "Run the merger", summary: "Take the integration helm and manage both architecture and competing org loyalties.", effects: { techCred: 23, burnout: 11, support: 4, energy: -10 }, result: "You prove you can integrate systems and organizations under real pressure, but the complexity and politics both land directly on you." },
    decline: { label: "Limit your blast radius", summary: "Stay on a bounded slice instead of owning the full merger story.", effects: { techCred: 9, burnout: 2, support: 5 }, result: "You avoid becoming the single point of failure and let someone else take on the integration myth-making at the top." }
  }
]

export function getProjectScenarioChance(techCred) {
  return clamp(0.14 + techCred * 0.003, 0.14, 0.74);
}

export function getProjectScenarioTier(techCred, roll = Math.random()) {
  if (techCred >= 140) return roll < 0.6 ? 3 : 2;
  if (techCred >= 90) return roll < 0.35 ? 3 : 2;
  if (techCred >= 45) return roll < 0.7 ? 2 : 1;
  return 1;
}

export function getProjectScenarioDeckForTier(tier) {
  return PROJECT_SCENARIOS.filter((card) => card.projectTier === tier);
}

function getAvailableCards(cards, usedScenarioTitles = []) {
  return cards.filter((card) => !usedScenarioTitles.includes(card.title));
}

function chooseCard(deck, cardRoll) {
  if (!deck.length) return null;
  return deck[Math.floor(cardRoll * deck.length)] ?? deck[deck.length - 1];
}

export function drawScenarioCard(state, scenarioRoll = Math.random(), tierRoll = Math.random(), cardRoll = Math.random()) {
  const projectChance = getProjectScenarioChance(state.techCred);
  const useProjectScenario = scenarioRoll < projectChance;
  const usedScenarioTitles = state.usedScenarioTitles ?? [];
  const normalDeck = getAvailableCards(SCENARIO_DECKS[state.stage], usedScenarioTitles);
  const tier = getProjectScenarioTier(state.techCred, tierRoll);
  const projectDeck = getAvailableCards(getProjectScenarioDeckForTier(tier), usedScenarioTitles);
  const preferredDeck = useProjectScenario ? projectDeck : normalDeck;
  const fallbackDeck = useProjectScenario ? normalDeck : projectDeck;
  const chosenCard = chooseCard(preferredDeck, cardRoll) ?? chooseCard(fallbackDeck, cardRoll);

  if (!chosenCard) {
    return null;
  }

  state.usedScenarioTitles = [...usedScenarioTitles, chosenCard.title];

  if (projectDeck.some((card) => card.title === chosenCard.title)) {
    return { ...chosenCard, kind: 'Project Scenario', isProjectScenario: true, projectTier: chosenCard.projectTier, projectChance };
  }

  return { ...chosenCard, kind: 'Scenario', isProjectScenario: false, projectChance };
}

export const BURNOUT_SPIRAL_STATUS = "Burnout Spiral";
export const BURNOUT_SPIRAL_THRESHOLD = 70;
export const BURNOUT_SPIRAL_RECOVERY = 60;

export const STATUS_EXPLANATIONS = {
  'Office Housework': {
    active: 'This drains 2 Energy at the start of every turn.',
    clear: 'The extra 2 Energy drain at the start of each turn has ended.',
    removal: 'Clear it with support that resets invisible labor expectations, like Boundary Setting.'
  },
  'The Glue': {
    active: 'This adds 2 Support and drains 1 Energy at the start of every turn.',
    clear: 'The extra 2 Support gain and 1 Energy drain at the start of each turn have ended.',
    removal: 'Clear it with a stage-appropriate boundary, delegation, or load-shedding support card that stops the invisible coordination burden from staying stuck to you.'
  },
  'People Drama': {
    active: 'This adds 2 Burnout at the start of every turn.',
    clear: 'The extra 2 Burnout at the start of each turn has ended.',
    removal: 'There is currently no direct support card that clears this status, so avoid choices that add it and play around the ongoing effect.'
  },
  'Skill Gap': {
    active: 'This lowers Tech Cred by 1 at the start of every turn.',
    clear: 'The extra 1 Tech Cred loss at the start of each turn has ended.',
    removal: 'Clear it with a stage-appropriate skill refresh support card that rebuilds your footing.'
  },
  'Pigeonholed': {
    active: 'This lowers Tech Cred by 1 at the start of every turn.',
    clear: 'The extra 1 Tech Cred loss at the start of each turn has ended.',
    removal: 'Clear it with a stage-appropriate sponsorship or repositioning support card that reopens your lane.'
  },
  [BURNOUT_SPIRAL_STATUS]: {
    active: 'This drains 5 Energy at the start of every turn.',
    clear: 'The extra 5 Energy drain at the start of each turn has ended.',
    removal: 'Clear it by reducing Burnout below 70, usually through the stage-specific recovery support card.'
  }
};

function getStatusExplanation(status) {
  return STATUS_EXPLANATIONS[status] ?? null;
}

export function createStatusAnnouncement(status, change) {
  const explanation = getStatusExplanation(status);
  if (!explanation) return null;

  if (change === 'gained') {
    return {
      title: status,
      text: `${explanation.active} ${explanation.removal}`,
      kind: 'Status update'
    };
  }

  if (change === 'cleared') {
    return {
      title: `${status} cleared`,
      text: `${explanation.clear} ${explanation.removal}`,
      kind: 'Status update'
    };
  }

  return null;
}

export function createStatusAnnouncementFromChange(status, gained) {
  return createStatusAnnouncement(status, gained ? 'gained' : 'cleared');
}

export const SUPPORT_DECKS = {
  0: [
    { title: "Mentor", text: "A senior woman in tech helps you translate vague feedback into a strategy you can actually use.", effects: { burnout: -12, support: 8 }, supportDrawCost: 10 },
    { title: "Allyship", text: "A male peer credits your idea in the room and interrupts the pattern before it becomes normal.", effects: { burnout: -8, support: 10, techCred: 3 }, supportDrawCost: 15 },
    { title: "Boundary Setting", text: "You reset expectations around invisible labor and stop being the default organizer, note taker, and morale buffer.", effects: { burnout: -10, support: 4 }, removeStatus: "Office Housework" },
    { title: "Pairing Session", text: "A patient teammate stays in the weeds with you long enough for the hard systems work to start feeling like yours too.", effects: { techCred: 6, support: 5, burnout: -4 } },
    { title: "First Referral", text: "A woman engineer passes your name to another team that values your technical instincts more than your willingness to smooth things over.", effects: { support: 7, techCred: 5 }, supportDrawCost: 10 },
    { title: "Practice Interview Loop", text: "Friends run mock technical interviews with you until the answers start sounding like your own voice instead of a defensive script.", effects: { techCred: 6, burnout: -5, energy: 3 } },
    { title: "Foundations Reset", text: "A patient reset on core systems knowledge helps you close the confidence and context gap before it calcifies into reputation.", effects: { techCred: 4, burnout: -5 }, removeStatus: "Skill Gap" },
    { title: "Scope Reframe", text: "A manager and mentor help redraw your role around harder technical work before the early assumptions about you harden.", effects: { techCred: 5, support: 4 }, removeStatus: "Pigeonholed" },
    { title: "Hand Off the Extra Labor", text: "A manager and teammate finally absorb the coordination work you had been privately carrying, so being helpful stops meaning being permanently on call for everyone else's gaps.", effects: { support: 3, burnout: -4, energy: 2 }, removeStatus: "The Glue" },
    { title: "Real Weekend", text: "Someone takes the pressure off long enough for you to sleep, eat, and think like a person again instead of a survival machine.", effects: { burnout: BURNOUT_SPIRAL_RECOVERY - BURNOUT_SPIRAL_THRESHOLD }, removeStatus: BURNOUT_SPIRAL_STATUS }
  ],
  1: [
    { title: "Sponsor", text: "A woman with influence says your name in rooms you are not in and ties your impact to real opportunities.", effects: { support: 8, techCred: 8, burnout: -5 }, supportDrawCost: 10 },
    { title: "Packet Review", text: "A trusted staff engineer marks up your promotion packet and points out which examples actually prove scope.", effects: { techCred: 7, support: 5, burnout: -4 } },
    { title: "Calibration Whisper Network", text: "Other women compare notes on the promotion process and tell you exactly where the rubric is being applied unevenly.", effects: { support: 9, burnout: -6 } },
    { title: "Manager Rehearsal", text: "A male manager practices the promotion conversation with you and helps sharpen the language before the real meeting.", effects: { techCred: 4, support: 6, burnout: -3 }, supportDrawCost: 15 },
    { title: "Receipt Folder", text: "You finally gather the screenshots, launch notes, and outcome metrics into one place that can survive calibration politics.", effects: { techCred: 6, burnout: -4, energy: 2 } },
    { title: "Community", text: "Your network reminds you this is systemic, not personal, and gives you language for what is happening.", effects: { burnout: -15, support: 12 } },
    { title: "Promotion Study Group", text: "A structured practice loop closes the knowledge gap that the process kept turning into a verdict on your readiness.", effects: { techCred: 5, support: 4, burnout: -3 }, removeStatus: "Skill Gap" },
    { title: "Packet Repositioning", text: "A sponsor helps recast your work in unmistakably technical terms so the room stops boxing you into the helpful lane.", effects: { techCred: 5, support: 5 }, removeStatus: "Pigeonholed" },
    { title: "Scope Triage", text: "A manager helps cut the unofficial mentoring, process rescue, and translation work out of your week so your helpfulness stops being treated like an infinite resource.", effects: { support: 3, burnout: -4, energy: 2 }, removeStatus: "The Glue" },
    { title: "Protected Week", text: "A manager and sponsor close ranks around your calendar so you can recover before burnout turns into collapse.", effects: { burnout: BURNOUT_SPIRAL_RECOVERY - BURNOUT_SPIRAL_THRESHOLD }, removeStatus: BURNOUT_SPIRAL_STATUS }
  ],
  2: [
    { title: "Attribution Echo", text: "A cross-functional partner repeats your architectural call and names you as the source before the room can blur it into group effort.", effects: { techCred: 7, support: 6, burnout: -3 } },
    { title: "Boundary Script", text: "You get sharper language for protecting mentoring time from swallowing every hour you have left for technical work.", effects: { burnout: -8, support: 5 } },
    { title: "Staff Circle", text: "Other senior women share the private notes behind how they became legible as technical leaders, not just reliable glue.", effects: { support: 9, techCred: 5, burnout: -4 } },
    { title: "Skip-Level Backing", text: "A male director validates your architectural instincts in a room that suddenly hears the same idea differently.", effects: { techCred: 6, support: 7 }, supportDrawCost: 15 },
    { title: "Therapy", text: "You invest in a practice that helps you recover from chronic overperformance and hostile ambiguity.", effects: { burnout: -14, energy: 4 } },
    { title: "Documentation Credit", text: "You capture the roadmap decisions you already made so future status meetings stop rewriting who drove them.", effects: { techCred: 5, burnout: -3, support: 4 } },
    { title: "Systems Refresh", text: "A trusted peer helps you rebuild the missing context around the systems you were judged on before you were fully set up.", effects: { techCred: 5, burnout: -4, support: 3 }, removeStatus: "Skill Gap" },
    { title: "Architecture Sponsorship", text: "A senior ally deliberately repositions you around systems ownership so the room stops treating you as optional glue.", effects: { techCred: 6, support: 4 }, removeStatus: "Pigeonholed" },
    { title: "Delegation Reset", text: "A peer and manager help redistribute the invisible review, translation, and rescue work so your reliability stops depending on private overfunctioning.", effects: { support: 3, burnout: -4, energy: 2 }, removeStatus: "The Glue" },
    { title: "Load Shedding", text: "You cut optional commitments and get real backing for it before the exhaustion hardens into a permanent mode.", effects: { burnout: BURNOUT_SPIRAL_RECOVERY - BURNOUT_SPIRAL_THRESHOLD }, removeStatus: BURNOUT_SPIRAL_STATUS }
  ],
  3: [
    { title: "Executive Sponsor", text: "A woman leader gives your technical judgment air cover before a high-visibility decision can turn into a personality test.", effects: { techCred: 8, support: 8, burnout: -4 }, supportDrawCost: 10 },
    { title: "Role Charter", text: "You write down what your role is and is not, which cuts some of the people-work drift before it hardens into expectation.", effects: { burnout: -7, support: 5 } },
    { title: "Peer Director Ally", text: "A male peer with org credibility backs your technical path in meetings where management is treated as the default leadership lane.", effects: { techCred: 5, support: 7 }, supportDrawCost: 15 },
    { title: "Visibility Prep", text: "A trusted collaborator helps shape the story before the executive audience ever sees the slide deck.", effects: { techCred: 6, burnout: -5, energy: 3 } },
    { title: "IC Path Proof", text: "You get examples of other women who stayed deeply technical and still built broad influence, which steadies your own path.", effects: { support: 8, techCred: 4, burnout: -4 } },
    { title: "Coalition Check-In", text: "Your strongest allies quietly align before the big discussion so you are not carrying the whole case alone in the room.", effects: { support: 9, burnout: -3 } },
    { title: "Technical Reset Block", text: "You get protected time and direct support to rebuild confidence in the parts of the role that got treated like evidence you did not belong.", effects: { techCred: 4, burnout: -5, energy: 2 }, removeStatus: "Skill Gap" },
    { title: "Lane Expansion", text: "An executive ally reintroduces you through your technical strategy rather than your people labor, reopening the lane that had narrowed around you.", effects: { techCred: 5, support: 5 }, removeStatus: "Pigeonholed" },
    { title: "Role Load Audit", text: "A leader helps separate actual leadership from the emotional and coordination overflow that had silently attached itself to you as part of the job.", effects: { support: 3, burnout: -4, energy: 2 }, removeStatus: "The Glue" },
    { title: "Calendar Firewall", text: "Someone with authority protects your focus and strips the week back to what actually matters.", effects: { burnout: BURNOUT_SPIRAL_RECOVERY - BURNOUT_SPIRAL_THRESHOLD }, removeStatus: BURNOUT_SPIRAL_STATUS }
  ],
  4: [
    { title: "Leave Planner", text: "Another mother in tech shares the handover checklist she wishes she had before leave, and the future suddenly feels less improvised.", effects: { support: 8, burnout: -5, energy: 2 } },
    { title: "Re-Entry Buddy", text: "A woman who returned before you helps translate the stack changes, the politics, and the parts no one remembers to document.", effects: { techCred: 6, support: 7, burnout: -4 }, supportDrawCost: 10 },
    { title: "Protected Ramp-Up", text: "Your manager agrees to real ramp-up time instead of pretending you can absorb re-entry for free after hours.", effects: { burnout: -8, energy: 4, support: 4 } },
    { title: "Coverage Advocate", text: "A male teammate publicly shuts down the assumption that you should still be available during leave.", effects: { support: 6, burnout: -4 }, supportDrawCost: 15 },
    { title: "Skill Refresh Window", text: "You get protected hours to relearn the changed systems instead of paying the full re-onboarding tax with your evenings.", effects: { techCred: 5, energy: 3, burnout: -3 } },
    { title: "Family Logistics", text: "Childcare and home support finally line up long enough for you to think beyond the next interruption.", effects: { support: 7, energy: 4, burnout: -4 } },
    { title: "Reentry Study Window", text: "You get explicit protected time to relearn the stack and re-enter without having every gap treated like permanent proof.", effects: { techCred: 4, energy: 3, burnout: -4 }, removeStatus: "Skill Gap" },
    { title: "Scope Restoration", text: "A sponsor helps restore your role framing so re-entry does not lock you into the smaller lane people assumed for you.", effects: { techCred: 5, support: 5 }, removeStatus: "Pigeonholed" },
    { title: "Shared Reentry Plan", text: "Your manager and family align on a narrower, explicit re-entry scope so you stop being the default hidden coordinator for everybody else's comfort.", effects: { support: 3, burnout: -4, energy: 2 }, removeStatus: "The Glue" },
    { title: "Actual Recovery Block", text: "You finally get time that is truly off-limits to work, logistics, and proving you are still committed.", effects: { burnout: BURNOUT_SPIRAL_RECOVERY - BURNOUT_SPIRAL_THRESHOLD }, removeStatus: BURNOUT_SPIRAL_STATUS }
  ],
  5: [
    { title: "Emergency Childcare", text: "A community parent network absorbs the sudden collision so you do not have to be the only backstop again.", effects: { support: 8, burnout: -7, homeFront: 5 } },
    { title: "Partner Reset", text: "A blunt conversation at home turns invisible planning work into something shared instead of silently assumed.", effects: { support: 7, burnout: -5, homeFront: 6 } },
    { title: "Manager Coverage", text: "A male manager explicitly rebalances expectations so you are not treated like the default 24/7 buffer for the team.", effects: { burnout: -6, workFront: 5, support: 5 }, supportDrawCost: 15 },
    { title: "School Pickup Backup", text: "A friend or relative handles the pickup crisis, buying you actual capacity instead of just guilt with a different name.", effects: { support: 6, homeFront: 4, burnout: -4 } },
    { title: "Care Collective", text: "Other caregivers swap coverage, scripts, and sanity-preserving shortcuts that make the second shift less solitary.", effects: { support: 9, burnout: -6, homeFront: 4 } },
    { title: "Therapy", text: "You invest in a practice that helps you recover from chronic overperformance and hostile ambiguity.", effects: { burnout: -14, energy: 4 } },
    { title: "Confidence Rebuild Window", text: "Protected time and practical backup let you rebuild technical confidence instead of carrying every gap as more proof you are slipping.", effects: { techCred: 4, burnout: -4, energy: 2 }, removeStatus: "Skill Gap" },
    { title: "Role Reset Conversation", text: "A direct reset at work reopens the lane around your technical identity so care labor stops defining your whole role.", effects: { techCred: 5, support: 4, workFront: 4 }, removeStatus: "Pigeonholed" },
    { title: "Redistributed Care Load", text: "People at work and home finally take real ownership of the planning and coordination burden you had been carrying, so being the reliable one stops meaning doing everything.", effects: { support: 3, burnout: -4, energy: 2, homeFront: 3 }, removeStatus: "The Glue" },
    { title: "Weekend With No Backfill", text: "Other people truly cover both fronts for a moment, and your body finally comes out of emergency mode.", effects: { burnout: BURNOUT_SPIRAL_RECOVERY - BURNOUT_SPIRAL_THRESHOLD }, removeStatus: BURNOUT_SPIRAL_STATUS }
  ]
};

export function syncBurnoutSpiralStatus(state) {
  const hasStatus = state.statusEffects.includes(BURNOUT_SPIRAL_STATUS);
  if (state.burnout >= BURNOUT_SPIRAL_THRESHOLD && !hasStatus) {
    addStatus(state, BURNOUT_SPIRAL_STATUS);
    return 'gained';
  }
  if (state.burnout < BURNOUT_SPIRAL_THRESHOLD && hasStatus) {
    removeStatus(state, BURNOUT_SPIRAL_STATUS);
    return 'cleared';
  }
  return null;
}

export function createBurnoutRecoveryEffects(currentBurnout) {
  return { burnout: BURNOUT_SPIRAL_RECOVERY - currentBurnout };
}

export function getSupportEffects(card, state = null) {
  const effects = { ...card.effects };
  if (state?.statusEffects?.includes(BURNOUT_SPIRAL_STATUS) && typeof state.burnout === 'number') {
    effects.burnout = Math.min(effects.burnout ?? 0, BURNOUT_SPIRAL_RECOVERY - state.burnout);
  } else if (card.removeStatus === BURNOUT_SPIRAL_STATUS && state) {
    effects.burnout = BURNOUT_SPIRAL_RECOVERY - state.burnout;
  }
  return effects;
}

export function shouldAutoClearBurnoutSpiralOnSupport(state) {
  return Boolean(state?.statusEffects?.includes(BURNOUT_SPIRAL_STATUS));
}

export function getSupportStatusRemoval(card, state = null) {
  if (shouldAutoClearBurnoutSpiralOnSupport(state)) return BURNOUT_SPIRAL_STATUS;
  return card?.removeStatus ?? null;
}

export function getSupportCardForStatus(stage, status) {
  return getSupportDeckForStage(stage).find((card) => card.removeStatus === status) ?? null;
}

export function createBurnoutStatusMessage(change) {
  const message = createStatusAnnouncement(BURNOUT_SPIRAL_STATUS, change);
  if (!message) return null;

  if (change === 'gained') {
    return {
      ...message,
      text: `Burnout reached 70. ${message.text}`
    };
  }

  if (change === 'cleared') {
    return {
      ...message,
      text: `Burnout is back below 70. ${message.text}`
    };
  }

  return null;
}

export function shouldShowBurnoutStatusCard(change) {
  return change === 'gained' || change === 'cleared';
}

export function getSupportDrawCost(card) {
  return card.supportDrawCost ?? 15;
}

export function getResolvedSupportEffects(card, state) {
  return { ...getSupportEffects(card, state), support: -getSupportDrawCost(card) };
}

export function applySupportCard(state, card) {
  const resolvedEffects = getResolvedSupportEffects(card, state);
  applyEffects(state, resolvedEffects);
  if (card.removeStatus) removeStatus(state, card.removeStatus);
  return resolvedEffects;
}


export function getSupportDeckForStage(stage) {
  return SUPPORT_DECKS[stage] ?? [];
}

export const SUPPORT_DECK = Object.values(SUPPORT_DECKS).flat();

export function createInitialState() {
  return {
    stage: 0,
    techCred: 0,
    energy: 40,
    support: 20,
    burnout: 0,
    statusEffects: [],
    activeCard: null,
    cardType: null,
    log: ["The game begins. Draw a scenario to start your career."],
    gameOver: false,
    turn: 1,
    actionsRemaining: 2,
    projectsCompleted: 0,
    stageProjectsCompleted: 0,
    pendingReview: false,
    reviewResult: null,
    workFront: 100,
    homeFront: 100,
    projectScenarioChance: getProjectScenarioChance(0),
    usedScenarioTitles: [],
    ending: null
  };
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function addLog(state, message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 14);
}

export function applyEffects(state, effects = {}) {
  Object.entries(effects).forEach(([key, value]) => {
    if (typeof state[key] === "number") {
      state[key] += value;
    }
  });
  state.techCred = clamp(state.techCred, -25, 250);
  state.energy = clamp(state.energy, 0, 100);
  state.support = clamp(state.support, -10, 100);
  state.burnout = clamp(state.burnout, 0, 100);
  state.workFront = clamp(state.workFront, 0, 100);
  state.homeFront = clamp(state.homeFront, 0, 100);
}

export function spendAction(state, cost = 1) {
  if (state.actionsRemaining < cost || state.gameOver) return false;
  state.actionsRemaining -= cost;
  return true;
}

export function addStatus(state, status) {
  if (status && !state.statusEffects.includes(status)) {
    state.statusEffects.push(status);
    addLog(state, `Status gained: ${status}.`);
  }
}

export function removeStatus(state, status) {
  state.statusEffects = state.statusEffects.filter((item) => item !== status);
}

export function maybeApplyPassiveStatuses(state) {
  if (state.statusEffects.includes("Office Housework")) state.energy = clamp(state.energy - 2, 0, 100);
  if (state.statusEffects.includes("The Glue")) {
    state.support = clamp(state.support + 2, -10, 100);
    state.energy = clamp(state.energy - 1, 0, 100);
  }
  if (state.statusEffects.includes("People Drama")) state.burnout = clamp(state.burnout + 2, 0, 100);
  if (state.statusEffects.includes("Skill Gap")) state.techCred = clamp(state.techCred - 1, -25, 250);
  if (state.statusEffects.includes("Pigeonholed")) state.techCred = clamp(state.techCred - 1, -25, 250);
  if (state.statusEffects.includes(BURNOUT_SPIRAL_STATUS)) state.energy = clamp(state.energy - 5, 0, 100);
  if (state.stage === 5) {
    state.workFront = clamp(state.workFront - 4, 0, 100);
    state.homeFront = clamp(state.homeFront - 5, 0, 100);
  }
}

export function checkRequirementsForStage(state) {
  const stage = STAGES[state.stage];
  const thresholdMet = state.techCred >= stage.threshold;
  const projectsMet = !stage.projectsRequired || state.stageProjectsCompleted >= stage.projectsRequired;
  const burnoutMet = state.stage !== 2 || state.burnout < 75;
  return thresholdMet && projectsMet && burnoutMet;
}

export function triggerReviewIfNeeded(state) {
  const stage = STAGES[state.stage];
  if (!stage.review || state.pendingReview || state.reviewResult || !checkRequirementsForStage(state)) return false;
  state.pendingReview = true;
  return true;
}

export function getReviewModifiers(state) {
  const stage = STAGES[state.stage];
  const threshold = stage.threshold;
  const projectDrawPercent = Math.round(getProjectScenarioChance(state.techCred + (state.projectChanceBias ?? 0)) * 100);

  return {
    techBonus: state.techCred >= threshold ? 2 : 0,
    extraTechBonus: state.techCred >= threshold * 1.5 ? 2 : 0,
    supportBonus: state.support >= 40 ? 2 : 0,
    projectDrawBonus: projectDrawPercent >= 70 ? 2 : 0,
    gluePenalty: state.statusEffects.includes("The Glue") ? -2 : 0,
    pigeonholedPenalty: state.statusEffects.includes("Pigeonholed") ? -1 : 0,
    burnoutPenalty: state.burnout >= 60 ? -2 : 0,
    projectDrawPercent
  };
}

export function rollReview(state, die) {
  const review = STAGES[state.stage].review;
  const rolledDie = die ?? Math.floor(Math.random() * 6) + 1;
  const modifiers = getReviewModifiers(state);
  let total = rolledDie + review.base;
  total += modifiers.techBonus;
  total += modifiers.extraTechBonus;
  total += modifiers.supportBonus;
  total += modifiers.projectDrawBonus;
  total += modifiers.gluePenalty;
  total += modifiers.pigeonholedPenalty;
  total += modifiers.burnoutPenalty;
  const passed = total >= review.target;
  state.reviewResult = { die: rolledDie, total, target: review.target, passed };
  state.pendingReview = false;
  if (!passed) applyEffects(state, { burnout: 10, energy: -6 });
  return state.reviewResult;
}

export function updateAdvanceState(state) {
  const canAdvance = checkRequirementsForStage(state) && !STAGES[state.stage].review;
  triggerReviewIfNeeded(state);
  return canAdvance || Boolean(state.reviewResult?.passed);
}

export function finishGame(state) {
  if (state.techCred >= 200) state.ending = "CTO";
  else if (state.support >= 70 && state.projectsCompleted >= 6) state.ending = "Mentor";
  else state.ending = "Retirement";
  state.gameOver = true;
}

export function checkGameState(state) {
  const canAdvance = updateAdvanceState(state);
  if (state.burnout >= 100) {
    state.gameOver = true;
    state.ending = "Burnout";
  } else if (state.energy <= 0) {
    state.gameOver = true;
    state.ending = "Exhaustion";
  } else if (state.stage === 5 && (state.workFront <= 0 || state.homeFront <= 0)) {
    state.gameOver = true;
    state.ending = "Balance Collapse";
  } else if (state.stage === STAGES.length - 1 && state.reviewResult?.passed) {
    finishGame(state);
  }
  return canAdvance;
}

export function startNextTurn(state) {
  if (state.gameOver || state.actionsRemaining > 0) return false;
  state.turn += 1;
  state.actionsRemaining = 2;
  maybeApplyPassiveStatuses(state);
  addLog(state, `Turn ${state.turn} begins. Ongoing pressures apply.`);
  checkGameState(state);
  return true;
}
