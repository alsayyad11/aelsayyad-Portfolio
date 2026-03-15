/* ════════════════════════════════════════
   AHMED M ELSAYYAD — PORTFOLIO SCRIPT
   ════════════════════════════════════════ */

/* ── Progress bar ── */
window.addEventListener('scroll', () => {
  const s = document.documentElement.scrollTop;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('pgbar').style.width = (s / h * 100) + '%';
  const btn = document.getElementById('backTop');
  if (btn) btn.classList.toggle('visible', s > window.innerHeight * 0.8);
}, { passive: true });

/* ── Nav stuck ── */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('stuck', scrollY > 28);
}, { passive: true });

/* ── Nav entrance ── */
document.getElementById('nav').style.cssText = 'opacity:0;transform:translateY(-20px)';
requestAnimationFrame(() => requestAnimationFrame(() => {
  const n = document.getElementById('nav');
  n.style.transition = 'opacity .6s ease,transform .6s ease';
  n.style.opacity = '1';
  n.style.transform = 'none';
}));

/* ── Logo → scroll to top ── */
document.querySelectorAll('.n-logo, [data-totop]').forEach(el => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

/* ── Back-to-top button ── */
const backTopBtn = document.getElementById('backTop');
if (backTopBtn) backTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── IntersectionObserver reveal ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal,.reveal-x,.reveal-r').forEach(el => io.observe(el));

/* ── Counter animation ── */
function animCount(el) {
  const raw = el.dataset.target || ''; const suffix = el.dataset.suffix || '';
  const num = parseFloat(raw); if (isNaN(num)) return;
  const dur = 1600; const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * num) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const cio = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animCount(e.target); cio.unobserve(e.target); } });
}, { threshold: .5 });
document.querySelectorAll('.st-n[data-target]').forEach(el => cio.observe(el));

/* ── Skill bars animation ── */
const sbio = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { const bar = e.target; setTimeout(() => { bar.style.width = (bar.dataset.val || '0') + '%'; }, 100); sbio.unobserve(bar); } });
}, { threshold: .2 });
document.querySelectorAll('.sb-fill').forEach(el => sbio.observe(el));

/* ── Theme ── */
let dark = true;
document.getElementById('themeBtn').addEventListener('click', function () {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  this.textContent = dark ? '☽' : '☀';
});

/* ── Mobile menu ── */
const hbg = document.getElementById('hbg'), mm = document.getElementById('mm');
hbg.addEventListener('click', () => {
  mm.classList.toggle('open');
  const s = hbg.querySelectorAll('span');
  if (mm.classList.contains('open')) { s[0].style.transform = 'translateY(6.5px) rotate(45deg)'; s[1].style.opacity = '0'; s[2].style.transform = 'translateY(-6.5px) rotate(-45deg)'; }
  else { s.forEach(x => { x.style.transform = ''; x.style.opacity = ''; }); }
});
function closeMM() { mm.classList.remove('open'); hbg.querySelectorAll('span').forEach(x => { x.style.transform = ''; x.style.opacity = ''; }); }

/* ── Project tabs ── */
function showProject(id, btn) {
  document.querySelectorAll('.pp').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
  document.getElementById('pp-' + id).classList.add('active');
  btn.classList.add('active');
}

/* ── TIPS DATA — 100+ entries ── */
const TIPS = [
  // DISCOVERY
  { cat: 'discovery', title: 'The 5-Why Root Cause Method', back: 'Ask why five times before proposing a solution. The first answer is a symptom. The fifth is the real root cause worth solving.', action: 'Use in every discovery sprint' },
  { cat: 'discovery', title: 'Never Start an Interview With Your Product', back: 'Open with: "Walk me through the last time you tried to solve [problem]." Context reveals truths direct questions never will.', action: 'Apply before your next interview' },
  { cat: 'discovery', title: 'Validate the Problem Before the Solution', back: 'Most failed products solved a problem not painful enough to change behavior. Confirm users actively seek workarounds today.', action: 'Look for workarounds in the wild' },
  { cat: 'discovery', title: 'Jobs to Be Done Over Feature Requests', back: 'Users ask for faster horses. Your job is to find the underlying job. Features are hypotheses. Jobs are truths.', action: 'Reframe every request as a job' },
  { cat: 'discovery', title: 'Use Friction Logs to Find Real Pain', back: 'Ask power users to narrate every frustration as they use the product for 30 minutes. The friction log is your highest-signal artifact.', action: 'Run one friction log this week' },
  { cat: 'discovery', title: 'The Assumption Map Prevents Wasted Builds', back: 'Before any sprint, list all assumptions behind the feature. Rank by importance and certainty. Build tests for the risky ones first.', action: 'Map assumptions on your next PRD' },
  { cat: 'discovery', title: 'Recruit Users Who Already Have the Problem', back: 'Interviewing people without the problem is like asking non-swimmers about drowning. Filter ruthlessly for the right participant profile.', action: 'Revise your screener questions' },
  { cat: 'discovery', title: 'Silence Is a Discovery Technique', back: 'After a user answers, count to five before speaking. The pause often prompts the most honest, unfiltered follow-up they give.', action: 'Practice the 5-second pause today' },
  { cat: 'discovery', title: 'Quantify Pain Before Qualifying Solutions', back: 'How many times a week does this happen? How long does it take? Quantified pain is fundable pain.', action: 'Add pain metrics to your interview guide' },
  { cat: 'discovery', title: 'Map the Workaround Before the Feature', back: 'If users have a workaround, study it deeply. The workaround reveals the mental model the product should match.', action: 'Document one workaround pattern this sprint' },
  { cat: 'discovery', title: 'Desirability ≠ Viability ≠ Feasibility', back: 'A wanted feature might not be buildable, or not buildable profitably. All three lenses must pass before committing.', action: 'Run the DVF check on your next roadmap item' },
  { cat: 'discovery', title: 'Diary Studies Reveal What Interviews Miss', back: 'Interviews capture recollections. Diary studies capture reality. Ask users to log a task for one week before you draw conclusions.', action: 'Plan a 7-day diary study' },

  // STRATEGY
  { cat: 'strategy', title: 'Outcome-Based Roadmaps Beat Feature Lists', back: 'Replace "Build X" with "Enable users to achieve Y so business gets Z." This keeps the team focused on value, not output.', action: 'Rewrite your next roadmap item' },
  { cat: 'strategy', title: 'Find the Gap All Competitors Overlooked', back: 'Real advantage is found by asking why everyone made the same tradeoff. That shared omission is your opportunity.', action: 'Map competitor blind spots this week' },
  { cat: 'strategy', title: 'Activation Is the Most Underrated Growth Lever', back: 'Fix activation before spending on acquisition. A user who misses their first aha moment will churn whatever you paid.', action: 'Map your activation funnel today' },
  { cat: 'strategy', title: 'Kill Features That Cost More Than They Return', back: 'Every feature has a maintenance cost. A graveyard of underused features is a tax on every engineer.', action: 'Schedule a quarterly feature audit' },
  { cat: 'strategy', title: 'The Strategic Narrative Is the Roadmap', back: 'Before the items, write the story: who you serve, what they need, why you win. The items should prove the story, not contradict it.', action: 'Write a one-page product narrative' },
  { cat: 'strategy', title: 'Know Your Business Model Before Writing Specs', back: 'Features that don\'t serve the monetization model are hobby projects. Every spec should trace to revenue, retention, or cost reduction.', action: 'Audit your current roadmap for business alignment' },
  { cat: 'strategy', title: 'The Adjacent Possible Is Where Growth Lives', back: 'The next feature is rarely a moonshot. It\'s the thing one step beyond what users already trust you to do.', action: 'List 5 adjacent use cases your users already attempt' },
  { cat: 'strategy', title: 'Platform Thinking Compounds. Feature Thinking Doesn\'t', back: 'Features add linearly. Platforms multiply. Ask: can this be a capability others build on?', action: 'Identify one platform opportunity in your product' },
  { cat: 'strategy', title: 'Competitive Moats Are Earned, Not Announced', back: 'Network effects, switching costs, and data advantages take years to build. Seed them intentionally from day one.', action: 'Identify which moat your product is building' },
  { cat: 'strategy', title: 'Speed Is a Strategy', back: 'Shipping faster than competitors compounds. Every sprint delayed is a sprint gifted. Protect velocity fiercely.', action: 'Remove one approval step from your release process' },
  { cat: 'strategy', title: 'Your North Star Should Predict Revenue', back: 'If improving your North Star Metric doesn\'t reliably lead to more revenue, it\'s a vanity metric in disguise.', action: 'Validate the revenue correlation of your NSM' },
  { cat: 'strategy', title: 'Saying No Is a Product Strategy', back: 'A product that does 3 things excellently beats one that does 30 things adequately. Clarity of purpose is itself a competitive advantage.', action: 'List what your product explicitly does not do' },

  // DELIVERY
  { cat: 'delivery', title: 'Scope Is a Product Decision Not an Engineering One', back: 'Every time scope expands without PM sign-off, the team makes product decisions by accident. Keep a weekly scope log.', action: 'Create a shared scope log today' },
  { cat: 'delivery', title: 'The PRD Engineers Actually Read', back: 'A great PRD answers three questions on page one: what problem, how will we know we succeeded, and what is out of scope.', action: 'Rewrite your PRD\'s first page' },
  { cat: 'delivery', title: 'Ship the Smallest Testable Thing', back: 'Minimize what you build until the test is still valid. Then ship. The best test is a real user doing a real task.', action: 'Ask: what is the minimum valid test?' },
  { cat: 'delivery', title: 'Feature Flags Are a Product Tool, Not Just Engineering', back: 'Flag every significant feature. This lets you roll back, A/B test, and give sales "coming soon" demos without breaking production.', action: 'Introduce feature flags to your next sprint' },
  { cat: 'delivery', title: 'Definition of Done Includes Instrumentation', back: 'A feature is not done until the analytics are firing. Ship the tracking before the feature, not after.', action: 'Add analytics to your definition of done' },
  { cat: 'delivery', title: 'Acceptance Criteria Are Contracts, Not Suggestions', back: 'Write acceptance criteria testable by a non-technical person. If it requires engineering knowledge to verify, rewrite it.', action: 'Review your current sprint\'s acceptance criteria' },
  { cat: 'delivery', title: 'Release Notes Are a Growth Tool', back: 'Users who read release notes have higher retention. Write them in plain language with the user benefit, not the engineering description.', action: 'Rewrite your last release note from the user\'s perspective' },
  { cat: 'delivery', title: 'The Rollback Plan Is Part of the Launch Plan', back: 'Every launch should have a written rollback procedure. If you can\'t roll it back safely, you haven\'t finished building it.', action: 'Write a rollback plan before your next release' },
  { cat: 'delivery', title: 'Pair QA With Product to Close the Understanding Gap', back: 'QA engineers catch bugs. PMs catch the bugs that don\'t look like bugs — the behavior that\'s technically correct but wrong.', action: 'Join one QA session per sprint' },
  { cat: 'delivery', title: 'Scope Creep Is Always a People Problem', back: 'Features don\'t add themselves. Scope creep is a symptom of unclear ownership, unclear success criteria, or fear of saying no.', action: 'Identify the source of your last scope expansion' },

  // METRICS
  { cat: 'metrics', title: 'Set Your Success Metric Before You Design', back: 'Define what working looks like in numbers before a single mockup is drawn. Metric-first thinking changes every decision downstream.', action: 'Write the metric on the PRD cover' },
  { cat: 'metrics', title: 'One North Star Beats Fifteen Dashboards', back: 'If your team cannot instantly name the metric that captures user value, you don\'t have a strategy.', action: 'Answer: what is your North Star?' },
  { cat: 'metrics', title: 'Cohort Analysis Reveals What Averages Hide', back: 'An average retention rate can hide a stellar cohort masked by a failing one. Always segment before concluding anything.', action: 'Segment your next retention report' },
  { cat: 'metrics', title: 'Leading Indicators Are More Valuable Than Lagging Ones', back: 'Revenue is a lagging indicator. Session depth, feature adoption rate, and return visits are leading. Manage what predicts, not what reports.', action: 'Identify three leading indicators for your next feature' },
  { cat: 'metrics', title: 'Metric Trees Connect Actions to Outcomes', back: 'Build a tree from your NSM to the sub-metrics teams can actually move. Without this, everyone optimizes locally and hurts the whole.', action: 'Draw your metric tree this week' },
  { cat: 'metrics', title: 'Percentages Without Sample Size Are Misleading', back: '"Conversion improved 50%" means nothing if the cohort is 10 people. Always show the denominator.', action: 'Audit your last metrics report for missing denominators' },
  { cat: 'metrics', title: 'Net Promoter Score Is a Direction, Not a Number', back: 'NPS is most valuable when tracked over time and segmented by user behavior, not as an absolute score.', action: 'Correlate NPS segments with product usage patterns' },
  { cat: 'metrics', title: 'The Aha Moment Is Measurable', back: 'The aha moment is the action that most strongly predicts long-term retention. Find it using cohort analysis and protect the path to it.', action: 'Run a correlation analysis to find your aha moment' },
  { cat: 'metrics', title: 'Error Rates Are Product Metrics', back: 'A spike in 404s, payment failures, or form errors is a product signal, not just a technical one. Own the error dashboard.', action: 'Add error rates to your weekly review' },
  { cat: 'metrics', title: 'Time-to-Value Is Often More Important Than Usage Frequency', back: 'How fast can a new user reach the core value? Compressing time-to-value often improves retention more than adding features.', action: 'Measure time-to-value for your last 100 new users' },

  // LEADERSHIP
  { cat: 'leadership', title: 'Influence Without Authority Starts With Curiosity', back: 'Before pushing your priorities, understand what your stakeholders are measured on. Frame your ask in terms of their goals.', action: 'Ask what success looks like for them' },
  { cat: 'leadership', title: 'How to Say No and Build Trust Simultaneously', back: 'Never just say no. Say: here is what we are choosing instead and why it creates more value.', action: 'Use the yes-and-when reframe' },
  { cat: 'leadership', title: 'Make Your Thinking Visible in Writing', back: 'PMs who write well build more influence than PMs who present well. Written thinking forces clarity and scales beyond the room.', action: 'Write a weekly product memo' },
  { cat: 'leadership', title: 'Credibility Is Built in Sprints, Lost in Seconds', back: 'Every commitment you make and keep builds credibility. Every slipped date or missed metric chips at it. Guard your word carefully.', action: 'Audit your outstanding commitments today' },
  { cat: 'leadership', title: 'The PM\'s Superpower Is Asking the Right Question', back: 'The best PMs don\'t have the most answers. They ask the questions that reframe the problem and unlock the team.', action: 'Prepare three questions before your next meeting' },
  { cat: 'leadership', title: 'Radical Candor Beats Polite Silence', back: 'Withholding honest feedback to protect feelings is cowardice, not kindness. The team deserves the truth delivered with care.', action: 'Give one piece of direct feedback this week' },
  { cat: 'leadership', title: 'Alignment Is a System, Not a Meeting', back: 'Weekly memos, decision logs, and shared dashboards create alignment that survives staff turnover. Meetings are too fragile.', action: 'Build one alignment artifact that doesn\'t require your presence' },
  { cat: 'leadership', title: 'Own the Failure, Share the Win', back: 'When something goes wrong, own it fully before the team does. When something goes right, elevate every contributor publicly.', action: 'Reflect on your last team failure — did you own it clearly?' },
  { cat: 'leadership', title: 'The PM\'s Job Is to Reduce Uncertainty, Not Eliminate It', back: 'Some uncertainty is irreducible. Your job is to identify which uncertainty is worth testing and which must simply be accepted.', action: 'Classify your current uncertainties as testable vs acceptable' },
  { cat: 'leadership', title: 'Conviction Without Arrogance Is the Rarest Skill', back: 'Push for what you believe in — but remain genuinely open to being wrong. Certainty about the problem; humility about the solution.', action: 'Identify a belief you\'re currently holding too tightly' },

  // COMMUNICATION
  { cat: 'communication', title: 'Write the Decision Not Just the Meeting Notes', back: 'After every important decision write: context, options considered, decision made, and who owns it.', action: 'Send decision docs same day' },
  { cat: 'communication', title: 'Disagree and Commit With Integrity', back: 'When you disagree, say so clearly once. If overruled, commit fully and track the outcome. That data is your credibility.', action: 'State disagreement then ship' },
  { cat: 'communication', title: 'The Executive Summary Is the Product', back: 'Executives don\'t read PRDs — they read the top third of page one. Master the executive summary or nothing else matters.', action: 'Rewrite your last document\'s executive summary' },
  { cat: 'communication', title: 'Async Communication Beats Meetings for Most Updates', back: 'A well-written Loom or memo preserves context, allows reply at the reader\'s pace, and creates a record. Meetings are for decisions.', action: 'Replace one recurring meeting with a written update' },
  { cat: 'communication', title: 'The Three-Line Email Rule', back: 'If your email requires more than three lines to understand, it\'s a document, not an email. Know which one you\'re sending.', action: 'Reformat your next long email as a document' },
  { cat: 'communication', title: 'Frame Everything From the Audience\'s Perspective', back: 'An engineer hears "we need to refactor." A CFO hears "we\'re spending two sprints per quarter on waste." Same truth, different frame.', action: 'Rewrite your next stakeholder update for their vocabulary' },
  { cat: 'communication', title: 'Silence After a Proposal Is Information', back: 'When you present and no one pushes back, they either agree, don\'t understand, or don\'t care. Ask which one it is.', action: 'Call for explicit objections in your next presentation' },
  { cat: 'communication', title: 'Roadmap Presentations Are Sales Calls', back: 'You are selling a prioritization decision to people who didn\'t make it. Anticipate objections and address them before they\'re raised.', action: 'Prepare three objection responses before your next roadmap review' },
  { cat: 'communication', title: 'Show the Work, Not Just the Answer', back: 'Walking stakeholders through your reasoning builds trust in the decision even when they would have chosen differently.', action: 'Add a "how we decided" section to your next recommendation' },
  { cat: 'communication', title: 'Overcommunicate in Ambiguity, Undercommunicate in Stability', back: 'When things are uncertain, teams need more information more often. When things are stable, noise is the enemy.', action: 'Calibrate your communication frequency to team uncertainty level' },

  // PRIORITIZATION
  { cat: 'prioritization', title: 'RICE Scoring Requires Real Data', back: 'Without behavioral data, RICE becomes a confidence interval for guesswork. The model is only as good as its inputs.', action: 'Identify which RICE inputs are assumptions vs data' },
  { cat: 'prioritization', title: 'Opportunity Scoring Finds the Underserved', back: 'Ask: how important is this job? How satisfied are users today? High importance + low satisfaction = your biggest opportunity.', action: 'Run an opportunity scoring session with users' },
  { cat: 'prioritization', title: 'Sequence by Dependency, Not Just Value', back: 'A high-value feature that unlocks three others should come before the highest-value standalone item. Map the dependency graph first.', action: 'Draw a dependency map for your next three quarters' },
  { cat: 'prioritization', title: 'Technical Debt Is a Business Prioritization Decision', back: 'Debt isn\'t an engineering failure — it\'s a product choice to deliver faster now and pay later. Own the tradeoff explicitly.', action: 'Add a debt repayment line to your quarterly roadmap' },
  { cat: 'prioritization', title: 'The 80/20 Rule Applies to Users, Not Features', back: '20% of your users generate 80% of your revenue. Prioritize features for them before widening to the long tail.', action: 'Identify and profile your top 20% users' },
  { cat: 'prioritization', title: 'Now / Next / Later Is a Strategy, Not a Laziness', back: 'The three-horizon roadmap forces the team to separate what\'s certain (Now) from what\'s directional (Later). Clarity at every horizon.', action: 'Rebuild your roadmap in three horizons' },
  { cat: 'prioritization', title: 'Cost of Delay Is Underused', back: 'Ask: what does it cost to do this in Q3 vs Q2? For some features, delay means missed market window — not just slower growth.', action: 'Calculate cost of delay for your highest-priority items' },

  // GROWTH
  { cat: 'growth', title: 'Virality Is Designed, Not Discovered', back: 'Build the invite mechanic, the share trigger, and the referral incentive into the product from day one. It doesn\'t emerge organically.', action: 'Map the natural viral loops in your product' },
  { cat: 'growth', title: 'Onboarding Is Your First Retention Intervention', back: 'Users who don\'t reach the aha moment in session one rarely come back. Onboarding is a retention problem, not a UX nice-to-have.', action: 'Measure day-1 completion rate for your onboarding flow' },
  { cat: 'growth', title: 'Reactivation Campaigns Beat Acquisition for ROI', back: 'A churned user already knows your product. Reactivation costs less and converts higher than cold acquisition.', action: 'Build a reactivation segment and test one message' },
  { cat: 'growth', title: 'Power Users Are Your Growth Engine', back: 'Identify your most engaged users. Study their behavior. Build features that bring others to that same depth of engagement.', action: 'Interview three power users this month' },
  { cat: 'growth', title: 'Frequency Drives Retention More Than Satisfaction', back: 'Users who use a product frequently forgive small problems. Users who use it rarely become churned users despite high satisfaction scores.', action: 'Increase touchpoints in your core user loop' },
  { cat: 'growth', title: 'The Paid Growth Ceiling Reveals Product-Market Fit', back: 'If CAC rises as you scale paid channels, organic acquisition isn\'t working. That\'s a product signal, not a marketing problem.', action: 'Plot CAC vs scale for the last 6 months' },
  { cat: 'growth', title: 'Email Is Still the Highest-ROI Retention Channel', back: 'For most B2B and mid-touch B2C products, a well-segmented email sequence outperforms every other retention channel. Don\'t ignore it.', action: 'Audit your email lifecycle triggers' },

  // EXECUTION
  { cat: 'execution', title: 'The Weekly PM Memo Keeps Everyone Aligned', back: 'A 500-word Friday memo covering what shipped, what\'s blocked, and what changed eliminates most "catch-up" meetings.', action: 'Write your first PM memo today' },
  { cat: 'execution', title: 'Block Time for Deep Work or It Won\'t Happen', back: 'PMs who live in Slack and meetings write mediocre specs. Protect two-hour blocks for writing and thinking.', action: 'Block 4 hours this week for focused work' },
  { cat: 'execution', title: 'The Sprint Review Is a Product Sales Tool', back: 'Real stakeholders in sprint reviews means faster alignment and fewer surprises at launch. Make attendance visible and valuable.', action: 'Invite one key stakeholder to your next sprint review' },
  { cat: 'execution', title: 'Post-Mortems Build Better Products Than Roadmaps', back: 'A rigorous post-mortem on a failed launch is worth more than three planning sessions. Make them blameless and mandatory.', action: 'Run a post-mortem on your last three launches' },
  { cat: 'execution', title: 'Meetings Without Decisions Are Rehearsals', back: 'Every meeting should produce a decision, an action, or an agreement to reschedule. Meetings that produce only discussion are waste.', action: 'End every meeting with a written decision or action item' },
  { cat: 'execution', title: 'Prototypes Test Hypotheses, Not Designs', back: 'A prototype is a tool for learning, not a commitment. The question isn\'t "does this look good?" — it\'s "does this answer our question?"', action: 'Define the hypothesis your next prototype is testing' },
  { cat: 'execution', title: 'Never Negotiate Requirements in Public Channels', back: 'Requirements discussions in group Slack create noise, invite opinions, and erode focus. Use structured intake and async review.', action: 'Move your requirements process out of Slack' },

  // BUSINESS ANALYSIS
  { cat: 'ba', title: 'Requirements Without Context Are Instructions Without Purpose', back: 'Every requirement needs a business goal attached. "The system shall..." without "so that the business can..." is incomplete.', action: 'Add a business goal to every requirement you write' },
  { cat: 'ba', title: 'Event Storming Reveals Hidden Business Complexity', back: 'Map the domain as events, not entities. Teams that event-storm before writing requirements discover integration points that would have caused post-launch incidents.', action: 'Run one event storming session before your next feature' },
  { cat: 'ba', title: 'Use Cases Bridge Business and Technical', back: 'Use cases are the contract between what the business needs and what engineering builds. Write them in user language, not system language.', action: 'Convert your next feature spec into a use case format' },
  { cat: 'ba', title: 'The As-Is Process Is Always Different From the Documented Process', back: 'Before designing the new process, spend one day observing the real one. The gap between documented and real is where problems live.', action: 'Shadow one user through their current workflow' },
  { cat: 'ba', title: 'Impact Mapping Connects Features to Business Outcomes', back: 'Draw the map: business goal → actor → impact on actor → feature that enables impact. If you can\'t draw the line, don\'t build the feature.', action: 'Build an impact map for your next epics' },
  { cat: 'ba', title: 'Non-Functional Requirements Are Often the Critical Ones', back: 'Performance, security, scalability, and accessibility are requirements, not afterthoughts. Capture them explicitly in every spec.', action: 'Add a non-functional requirements section to your template' },
  { cat: 'ba', title: 'Gap Analysis Before Solution Design', back: 'Document the current state, the desired state, and the gap. Only then begin proposing solutions. The gap is the brief.', action: 'Run a formal gap analysis on your next initiative' },

  // UX
  { cat: 'ux', title: 'Progressive Disclosure Reduces Cognitive Load', back: 'Show only what the user needs at each step. Every additional element on screen competes for attention and reduces action rates.', action: 'Identify one screen to simplify with progressive disclosure' },
  { cat: 'ux', title: 'Error Messages Are a UX Opportunity', back: 'Most error messages tell users what went wrong. Great error messages tell users exactly how to fix it.', action: 'Rewrite the three most common error messages in your product' },
  { cat: 'ux', title: 'Consistency Beats Novelty in Product Design', back: 'Users who learn your product once should be able to use any feature. Novel patterns require re-learning. Protect your interaction patterns.', action: 'Audit your product for inconsistent interaction patterns' },
  { cat: 'ux', title: 'The Empty State Is a Growth Feature', back: 'An empty state that teaches users what to do first reduces drop-off dramatically. Treat it as conversion copy, not a placeholder.', action: 'Redesign your product\'s empty states' },
  { cat: 'ux', title: 'Accessibility Is a Business Metric', back: 'WCAG compliance expands your addressable market. Users with disabilities represent 15% of the global population. They spend money too.', action: 'Run an accessibility audit on your most-used screen' },
];

/* ── CHALLENGES DATA — 100+ entries ── */
const CHALLENGES_DATA = [
  // STAKEHOLDERS
  { cat: 'stakeholders', prob: 'Stakeholders kept changing requirements mid-sprint', sol: 'Introduced a formal change control process: any change after sprint start required PM sign-off and a written reason. Mid-sprint changes dropped 80%.' },
  { cat: 'stakeholders', prob: 'Two executives disagreed on product direction in front of the team', sol: 'Documented both positions, mapped implications on a one-pager, and scheduled a private decision meeting with both present. Resolved in 48 hours.' },
  { cat: 'stakeholders', prob: 'Sales kept promising unbuilt features to close deals', sol: 'Set up a monthly product-sales sync. Sales could only promise what was in the confirmed roadmap. Expectation mismatches dropped 70%.' },
  { cat: 'stakeholders', prob: 'A senior stakeholder bypassed the PM and went directly to engineering', sol: 'Had a direct conversation about the impact on sprint focus, then proposed a weekly stakeholder office hour as a structured channel. Bypasses stopped.' },
  { cat: 'stakeholders', prob: 'Customer success escalated feature requests as urgent without business context', sol: 'Introduced a simple intake template: who is affected, frequency of impact, estimated revenue at risk. Triage became objective instead of emotional.' },
  { cat: 'stakeholders', prob: 'Marketing announced a feature launch date without consulting product', sol: 'Implemented a launch readiness checklist requiring PM sign-off before any external announcement. Date misalignments went to zero.' },
  { cat: 'stakeholders', prob: 'Legal blocked a feature launch two days before release', sol: 'Created a legal review checkpoint at spec completion rather than at launch. Early review shortened release cycles by 12 days on average.' },
  { cat: 'stakeholders', prob: 'A key stakeholder went silent and stopped responding to product updates', sol: 'Switched from broadcast updates to one-on-one conversations tailored to their specific concerns. Re-engagement happened in one meeting.' },
  { cat: 'stakeholders', prob: 'The CEO added features directly to sprints without going through backlog', sol: 'Proposed a lightweight intake process: any idea goes into a shared backlog with a 3-line problem statement. Within a month the CEO was writing intake tickets himself.' },
  { cat: 'stakeholders', prob: 'Two departments claimed ownership of the same feature area', sol: 'Facilitated a RACI session to document who was Responsible, Accountable, Consulted, and Informed for each product area. Ownership conflict resolved permanently.' },

  // PRIORITIZATION
  { cat: 'prioritization', prob: 'Had 200 feature requests and no objective way to compare them', sol: 'Built a RICE scoring model with the team. Ran a scoring session for all 200 items. Within two hours we had a defensible rank. Shipped the top 10 in 60 days.' },
  { cat: 'prioritization', prob: 'Product had 40 features but none were excellent', sol: 'Ran a feature audit using usage data and NPS correlation. Cut roadmap to focus on making the top 8 features excellent for one quarter.' },
  { cat: 'prioritization', prob: 'Every team claimed their initiative was P1', sol: 'Ran a forced ranking session with stakeholders. Required everyone to compare items head-to-head. Consensus emerged after 90 minutes of structured debate.' },
  { cat: 'prioritization', prob: 'A/B test results kept coming back inconclusive', sol: 'Discovered we were testing too many variables and underestimating sample size. Rebuilt the experiment design process with a statistician.' },
  { cat: 'prioritization', prob: 'Low-effort features kept displacing high-impact ones because they were "quick wins"', sol: 'Added a minimum impact threshold to our sprint planning criteria. Quick wins required a measurable outcome hypothesis before being scheduled.' },
  { cat: 'prioritization', prob: 'The roadmap had 60 items and no one could remember what we were building or why', sol: 'Collapsed 60 items into 8 strategic themes with clear success metrics. Team alignment improved measurably in the following retrospective.' },
  { cat: 'prioritization', prob: 'Difficulty comparing a retention feature vs an acquisition feature', sol: 'Converted both to common currency: projected LTV impact per dollar spent. Retention won by 3x on unit economics.' },
  { cat: 'prioritization', prob: 'Technical work had no visibility in roadmap conversations', sol: 'Created a "product health" section in roadmap reviews alongside user-facing features. Engineering confidence improved and technical debt dropped 30%.' },

  // TECHNICAL
  { cat: 'technical', prob: 'Engineering said a feature was technically impossible', sol: 'Sat down with the lead engineer for two hours. Discovered it was an architectural assumption from three years ago. Feature shipped in the next sprint.' },
  { cat: 'technical', prob: 'Third-party API changed its rate limits without warning', sol: 'Built a caching layer and graceful degradation fallback within 48 hours. Wrote a post-mortem that led to a new vendor risk policy.' },
  { cat: 'technical', prob: 'Legacy code made every new feature take 3x longer', sol: 'Pushed for 20% engineering capacity allocation to debt reduction. Wrote a one-page business case showing debt was costing two sprints per quarter.' },
  { cat: 'technical', prob: 'A key engineer left mid-sprint and took critical knowledge', sol: 'Instituted pair programming on critical systems and required architecture decision records for every major technical choice.' },
  { cat: 'technical', prob: 'Performance degraded significantly as user base scaled', sol: 'Added performance budgets to the definition of done. Ran load tests before every major release. Eliminated 4 post-launch performance incidents.' },
  { cat: 'technical', prob: 'Engineers kept building the wrong thing despite detailed specs', sol: 'Introduced structured spec walkthroughs with engineering before any sprint start. Misaligned builds dropped to near zero.' },
  { cat: 'technical', prob: 'Two microservices had undocumented dependencies causing cascading failures', sol: 'Built a service dependency map and added integration tests at the boundary. Cascading failures were eliminated in the following quarter.' },
  { cat: 'technical', prob: 'A critical feature could not be built without a complete database migration', sol: 'Broke the feature into pre-migration and post-migration phases. Shipped incremental value without waiting 4 months for the full migration.' },
  { cat: 'technical', prob: 'Mobile and web builds were diverging significantly in functionality', sol: 'Introduced a feature parity audit at the start of each quarter. Created a joint mobile/web sprint for the three largest gaps.' },
  { cat: 'technical', prob: 'Security review delayed launches by 3–4 weeks consistently', sol: 'Moved security review to the spec stage rather than the pre-launch stage. Security issues discovered early cost 90% less to fix.' },

  // DATA
  { cat: 'data', prob: 'No analytics were set up when I joined', sol: 'Negotiated two engineer-sprints to instrument the top 20 user flows. Within six weeks we had real behavioral data for the first time.' },
  { cat: 'data', prob: 'A/B test results kept coming back inconclusive', sol: 'Discovered we were testing too many variables and underestimating sample size. Rebuilt the experiment design process with a statistician.' },
  { cat: 'data', prob: 'Data pipeline had a 48-hour lag making real-time decisions impossible', sol: 'Worked with the data team to identify five metrics needing real-time visibility and built a lightweight real-time dashboard.' },
  { cat: 'data', prob: 'Different teams were using different data to make conflicting decisions', sol: 'Established a single source of truth by documenting metric definitions in a shared wiki. All cross-team reviews required referencing the canonical definitions.' },
  { cat: 'data', prob: 'Funnel analysis showed a big drop but no one knew why', sol: 'Added session recording to the drop-off point and found a broken form field on mobile. Fixed in two hours, conversion improved 22%.' },
  { cat: 'data', prob: 'Product decisions were being made based on anecdotal customer feedback alone', sol: 'Built a lightweight quantitative layer: weekly activation rate, day-7 retention, and feature adoption. Added to every planning meeting.' },
  { cat: 'data', prob: 'High aggregate satisfaction scores masked a churning power user segment', sol: 'Segmented NPS by usage tier. Discovered power users scoring 4/10 vs casual users scoring 9/10. Retention investment shifted to power users.' },
  { cat: 'data', prob: 'Engineers couldn\'t reproduce a bug that users reported consistently', sol: 'Added structured error logging with user session context. Engineers could reproduce within minutes instead of days.' },

  // USERS
  { cat: 'users', prob: 'Users said they wanted Feature A but kept using Feature B', sol: 'Ran friction logs on Feature A. Found users could not find it. Moved the entry point, adoption went up 60%.' },
  { cat: 'users', prob: 'Users churned at day 7 consistently across all cohorts', sol: 'Pulled session recordings for day-6 to day-8 users. Found a specific friction point. Fixed it. Day-7 retention improved 28%.' },
  { cat: 'users', prob: 'Shipped a feature and nothing happened', sol: 'Discovered the feature was live but only 4% of users could find it. Added entry points in two high-traffic screens. Adoption grew 10x in two weeks.' },
  { cat: 'users', prob: 'Users understood how to use the product but not why they should', sol: 'Redesigned onboarding to lead with the outcome, not the feature. Activation rate increased 45%.' },
  { cat: 'users', prob: 'Power users were unhappy with a simplification designed for new users', sol: 'Introduced a progressive disclosure model: simple by default, advanced on demand. Satisfaction improved across both segments.' },
  { cat: 'users', prob: 'User feedback was overwhelmingly positive but retention was declining', sol: 'Dug deeper into satisfaction surveys and found users loved the concept but found core workflows too slow. Speed optimization improved retention 18%.' },
  { cat: 'users', prob: 'Users reported the same bug differently making triage impossible', sol: 'Added an in-app feedback widget that automatically captured device, OS, and session context. Triage time reduced from 2 days to 2 hours.' },
  { cat: 'users', prob: 'International users had very different workflows that the product didn\'t support', sol: 'Conducted remote discovery sessions in three markets. Found two workflow differences that required product changes. Implemented in one sprint.' },
  { cat: 'users', prob: 'Users were using the product for a use case we never designed for', sol: 'Instead of blocking the use case, investigated it deeply. It became a new market segment representing 30% of next year\'s revenue.' },
  { cat: 'users', prob: 'New users were overwhelmed and leaving before experiencing value', sol: 'Cut onboarding from 12 steps to 4. Measured first session completion rate. It doubled. Activation rate increased 38% in four weeks.' },

  // TEAM
  { cat: 'team', prob: 'Engineering and design had never worked in the same room', sol: 'Introduced a weekly 30-minute design-engineer pairing session. Engineers started catching design feasibility issues before handoff.' },
  { cat: 'team', prob: 'A key engineer left mid-sprint and took critical knowledge', sol: 'Instituted pair programming on critical systems and required architecture decision records for every major technical choice.' },
  { cat: 'team', prob: 'The team was burning out from constant context switching', sol: 'Proposed a "focus week" model: two-week sprints with one dedicated theme. Context switching dropped, delivery quality improved.' },
  { cat: 'team', prob: 'Design was being bypassed because engineering wanted to ship faster', sol: 'Made design sign-off a hard gate in the sprint agreement. Simultaneously worked with design to reduce review cycle from 5 days to 2.' },
  { cat: 'team', prob: 'Engineers felt excluded from product decisions', sol: 'Opened discovery interviews to engineers who wanted to participate. Three engineers became deeply customer-aware advocates. Spec quality improved.' },
  { cat: 'team', prob: 'The team had no shared understanding of who they were building for', sol: 'Ran a 2-hour persona workshop with the full team. Built three validated personas together. Debate about features dropped significantly after.' },
  { cat: 'team', prob: 'Cross-team dependencies were causing consistent delays', sol: 'Created a dependency dashboard reviewed weekly. Any dependency older than 2 sprints was escalated to leadership immediately.' },
  { cat: 'team', prob: 'Retrospectives were surface-level and produced no real change', sol: 'Switched from generic formats to structured root cause retrospectives. Teams were required to trace problems to process, not people.' },
  { cat: 'team', prob: 'Junior PMs on the team were writing specs without enough discovery', sol: 'Introduced a discovery checklist as a gate before spec writing. Junior PM spec quality improved measurably within two months.' },
  { cat: 'team', prob: 'The team was demotivated after a major launch flopped', sol: 'Ran an honest post-mortem focused on learning, not blame. Shared the analysis with leadership. The team felt heard and re-engaged.' },

  // LAUNCH
  { cat: 'launch', prob: 'Major launch failed due to server overload', sol: 'Introduced load testing as a required pre-launch checklist item and wrote a capacity planning template.' },
  { cat: 'launch', prob: 'Shipped a feature and nothing happened', sol: 'Discovered the feature was live but only 4% of users could find it. Added entry points in two high-traffic screens. Adoption grew 10x in two weeks.' },
  { cat: 'launch', prob: 'A launch drove sign-ups but no activation', sol: 'Traced the problem to a mismatch between marketing messaging and product reality. Rewrote the onboarding to match the promised value. Activation recovered in 2 weeks.' },
  { cat: 'launch', prob: 'Support was overwhelmed immediately after launch', sol: 'Pre-wrote a launch support playbook with answers to the 20 most anticipated questions. Support volume peaked at 60% of the previous launch.' },
  { cat: 'launch', prob: 'A competitor launched a similar feature two weeks before us', sol: 'Instead of rushing, differentiated on depth rather than speed. Our version had 3 more workflow integrations. Positive reviews outperformed theirs.' },
  { cat: 'launch', prob: 'Post-launch metrics looked good but revenue didn\'t move', sol: 'Traced the disconnect to a gap between feature usage and paid plan triggers. Added a usage-triggered upgrade prompt. Revenue followed within 3 weeks.' },
  { cat: 'launch', prob: 'A feature launched that engineering was proud of but users ignored', sol: 'Post-launch discovery revealed users needed the feature but couldn\'t find it and didn\'t understand the value proposition. Repositioned and relaunched. Adoption increased 8x.' },

  // STRATEGY
  { cat: 'strategy', prob: 'Company wanted to target SMBs and enterprise simultaneously', sol: 'Used a needs vs. willingness-to-pay matrix to show the two segments required different products. Helped leadership choose one.' },
  { cat: 'strategy', prob: 'The product had no clear differentiation from competitors', sol: 'Ran a competitive gap analysis across 8 competitors. Found an underserved workflow segment. Roadmap was reprioritized around it.' },
  { cat: 'strategy', prob: 'Revenue growth had plateaued despite continued feature additions', sol: 'Conducted a growth audit. Found 80% of new features were being used by less than 5% of users. Shifted to deepening core workflows. Revenue moved again.' },
  { cat: 'strategy', prob: 'A new market opportunity appeared and leadership wanted to pivot immediately', sol: 'Built a structured evaluation framework: market size, strategic fit, cannibalization risk, time-to-revenue. The evaluation prevented a premature pivot that would have diluted focus.' },
  { cat: 'strategy', prob: 'The product was growing in usage but not in revenue', sol: 'Analyzed conversion from free to paid by feature. Identified that users who used Feature X were 4x more likely to convert. Made Feature X the onboarding goal.' },
  { cat: 'strategy', prob: 'International expansion was requested but no market research existed', sol: 'Ran 20 remote interviews across two target markets in two weeks. Delivered a market fit assessment that informed the go/no-go decision.' },
  { cat: 'strategy', prob: 'The product was being used by a segment we never designed for', sol: 'Investigated the emergent use case deeply. It became a planned product line representing 30% of the following year\'s revenue.' },
  { cat: 'strategy', prob: 'Two product lines were cannibalizing each other', sol: 'Mapped customer journeys across both products. Found the overlap was in the acquisition funnel, not the use case. Separated the marketing strategies, preserved both products.' },
];

/* ── LOAD MORE ── */
let tipsPage = 0, tipsActive = 'all';
let chPage = 0, chActive = 'all';
const PER = 10;

function renderTips(reset = false) {
  if (reset) tipsPage = 0;
  const all = [...document.querySelectorAll('#tipsStore .fc')];
  const filtered = tipsActive === 'all' ? all : all.filter(c => c.dataset.cat === tipsActive);
  const grid = document.getElementById('fcgrid'); grid.innerHTML = '';
  const slice = filtered.slice(0, PER * (tipsPage + 1));
  slice.forEach((c, i) => {
    const cl = c.cloneNode(true);
    cl.style.cssText = `opacity:0;transform:translateY(18px);transition:opacity .4s ${i * .03}s ease,transform .4s ${i * .03}s ease`;
    grid.appendChild(cl);
    requestAnimationFrame(() => requestAnimationFrame(() => { cl.style.opacity = '1'; cl.style.transform = 'none'; }));
  });
  const btn = document.getElementById('tipsLM');
  const shown = slice.length, total = filtered.length;
  btn.disabled = shown >= total;
  btn.innerHTML = shown >= total ? `All ${total} Loaded ✓` : `Load More <span class="lm-c">${shown}/${total}</span>`;
}

function filterTips(cat) {
  tipsActive = cat; tipsPage = 0;
  document.querySelectorAll('.ff').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
  renderTips();
}

document.getElementById('tipsLM').addEventListener('click', () => { tipsPage++; renderTips(); });

function renderChallenges(reset = false) {
  if (reset) chPage = 0;
  const all = [...document.querySelectorAll('#chStore .chc')];
  const filtered = chActive === 'all' ? all : all.filter(c => c.dataset.cat === chActive);
  const grid = document.getElementById('chgrid'); grid.innerHTML = '';
  const slice = filtered.slice(0, PER * (chPage + 1));
  slice.forEach((c, i) => {
    const cl = c.cloneNode(true);
    cl.style.cssText = `opacity:0;transform:translateY(16px);transition:opacity .38s ${i * .03}s ease,transform .38s ${i * .03}s ease`;
    grid.appendChild(cl);
    requestAnimationFrame(() => requestAnimationFrame(() => { cl.style.opacity = '1'; cl.style.transform = 'none'; }));
  });
  const btn = document.getElementById('chLM');
  const shown = slice.length, total = filtered.length;
  btn.disabled = shown >= total;
  btn.innerHTML = shown >= total ? `All ${total} Loaded ✓` : `Load More <span class="lm-c">${shown}/${total}</span>`;
}

function filterCh(cat) {
  chActive = cat; chPage = 0;
  document.querySelectorAll('.chf').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
  renderChallenges();
}

document.getElementById('chLM').addEventListener('click', () => { chPage++; renderChallenges(); });

/* ── Build data stores ── */
function buildStores() {
  const ts = document.getElementById('tipsStore'); const cs = document.getElementById('chStore');
  ts.innerHTML = ''; cs.innerHTML = '';
  TIPS.forEach((tip, i) => {
    const num = String(i + 1).padStart(2, '0');
    const catLabel = tip.cat.charAt(0).toUpperCase() + tip.cat.slice(1);
    const el = document.createElement('div'); el.className = 'fc'; el.dataset.cat = tip.cat;
    el.innerHTML = `<div class="fc-inner"><div class="fc-f"><div class="fc-cat">${catLabel}</div><div class="fc-num">${num}</div><div class="fc-tit">${tip.title}</div><div class="fc-hint">Hover to flip ↻</div></div><div class="fc-b"><div class="fc-bl">The Insight</div><div class="fc-bt">${tip.back}</div><div class="fc-ba">${tip.action}</div></div></div>`;
    ts.appendChild(el);
  });
  CHALLENGES_DATA.forEach((ch, i) => {
    const num = String(i + 1).padStart(2, '0');
    const catLabel = ch.cat.charAt(0).toUpperCase() + ch.cat.slice(1);
    const el = document.createElement('div'); el.className = 'chc'; el.dataset.cat = ch.cat;
    el.innerHTML = `<div class="ch-num">${num}</div><div class="ch-cat">${catLabel}</div><div class="ch-p">${ch.prob}</div><div class="ch-sl">How I Solved It</div><div class="ch-so">${ch.sol}</div>`;
    cs.appendChild(el);
  });
}

/* ── Blog filter ── */
document.querySelectorAll('.bfi').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.bfi').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.ba').forEach(c => {
      const show = cat === 'all' || c.dataset.cat === cat;
      c.style.opacity = show ? '1' : '.1';
      c.style.transform = show ? 'none' : 'scale(.97)';
      c.style.transition = 'opacity .25s,transform .25s';
    });
  });
});

/* ── FAQ ── */
document.querySelectorAll('.fbtn').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.fitem'), was = item.classList.contains('open');
    document.querySelectorAll('.fitem').forEach(i => i.classList.remove('open'));
    if (!was) item.classList.add('open');
  });
});

/* ── ARTICLES DATA ── */
const ARTS = {
  0: { cat: 'Product Strategy', date: 'Mar 2026', mins: 9, img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=65&auto=format&fit=crop', title: 'Why Most Roadmaps Are Just Wish Lists in Disguise', body: `<p>A roadmap without outcome targets is a delivery plan masquerading as strategy. After working on 30+ products, I've learned what separates a roadmap teams believe in from one that collapses the moment reality intervenes.</p><h3>The Core Problem</h3><p>Most roadmaps are built backwards. They start with features and retrofit justification. A real roadmap starts with the business outcome and works backwards to capabilities.</p><h3>The Outcome-First Framework</h3><ul><li>Define the problem in user terms, not product terms</li><li>Set a measurable success metric before writing requirements</li><li>Work backwards from the metric to the minimum capability needed</li><li>Sequence by dependency and risk, not by desire</li></ul><h3>What Good Looks Like</h3><p>A well-formed roadmap item reads: <strong>"Reduce day-7 churn from 34% to 22% by fixing the activation gap."</strong> Not: "Build onboarding flow v2." When your roadmap speaks in outcomes, engineering understands why, design knows what success looks like, and stakeholders stop asking for feature additions that don't move the metric.</p><blockquote><p>"The goal is not to ship features. The goal is to change user behavior in ways that improve business outcomes."</p></blockquote><h3>How to Fix Your Roadmap This Week</h3><p>Take your next three roadmap items. For each one, ask: what number changes when this ships? If you can't answer, you don't have a roadmap item — you have a hypothesis. Test it cheaply before building it expensively.</p>` },
  1: { cat: 'User Research', date: 'Feb 2026', mins: 7, img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=65&auto=format&fit=crop', title: 'The 5-Interview Rule: Validate Before You Build', body: `<p>You don't need 50 users to find a pattern. Five well-run interviews surface 80% of the insight that 50 would — and they cost 10% of the time. The secret is in how you run them, not how many you do.</p><h3>Why 5 Works</h3><p>Nielsen Norman's research established that five users uncover most major usability issues. By interview four, you're hearing the same themes. By five, you have enough signal to act. More interviews are valuable for edge cases — not for finding the core problem.</p><h3>The Setup That Matters</h3><ul><li>Recruit people who have recently experienced the problem</li><li>Open with story prompts: "Walk me through the last time you tried to…"</li><li>Never mention your solution in the first 30 minutes</li><li>Take verbatim notes — exact words reveal mental models</li><li>End with: "What would make this problem disappear for you?"</li></ul><h3>What to Do With What You Hear</h3><p>After five interviews, run an affinity mapping session. Group observations by theme. The themes that appear in 4 of 5 interviews are your signal. The ones that appear once are interesting but not actionable yet.</p><blockquote><p>"The best requirements document starts with a quote from a real user, not a feature request from an executive."</p></blockquote>` },
  2: { cat: 'Business Analysis', date: 'Jan 2026', mins: 8, img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=65&auto=format&fit=crop', title: 'How BAs Can Bridge the Gap Between Business and Tech in 2026', body: `<p>The business analyst role has evolved dramatically. In 2026, the best BAs aren't just requirements writers — they're translators, facilitators, and signal processors who sit at the intersection of business intent and technical reality.</p><h3>The Translation Problem</h3><p>When a business stakeholder says "I need a report," they mean "I need to make better decisions faster." When an engineer hears "report," they think database queries and UI components. The BA's job is to surface the decision, not just the deliverable.</p><h3>Modern BA Techniques That Actually Work</h3><ul><li><strong>Event Storming:</strong> Map business processes as domain events before touching requirements.</li><li><strong>Impact Mapping:</strong> Connect every feature to a behavior change, a user, and a business goal.</li><li><strong>Assumption Mapping:</strong> Categorize assumptions by importance and certainty. The high-importance, low-certainty quadrant is where you prototype, not build.</li><li><strong>User Story Mapping:</strong> Lay stories horizontally by user journey rather than vertically by priority.</li></ul><h3>The Skill BAs Are Missing</h3><p>Data literacy. In 2026, every BA needs to be able to pull a basic SQL query, read a funnel report, and interpret a cohort analysis. You cannot write requirements for a feature you can't measure.</p>` },
  3: { cat: 'Product Ownership', date: 'Dec 2025', mins: 6, img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=65&auto=format&fit=crop', title: "The Product Owner's Backlog Is Lying to You", body: `<p>A bloated backlog is a sign of a product owner who hasn't made hard choices. Every item sitting in your backlog untouched for more than 90 days is technical debt of the mind — it costs attention, creates false urgency, and obscures what actually matters.</p><h3>The 90-Day Backlog Rule</h3><p>Any item not touched in 90 days should be moved to an archive or deleted. If it matters, it will come back — louder, with more context, and from multiple sources. If it doesn't come back, it wasn't important.</p><h3>Writing User Stories That Engineers Trust</h3><ul><li>Every story needs an acceptance criterion testable by a non-technical person</li><li>Add a "definition of done" that includes instrumentation</li><li>Include the "why" in every story</li><li>Stories should be completable in a single sprint</li></ul><blockquote><p>"Your backlog is a statement of your product values. If it's bloated and unordered, your values are unclear to everyone, including yourself."</p></blockquote>` },
  4: { cat: 'Project Management', date: 'Nov 2025', mins: 9, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=65&auto=format&fit=crop', title: 'Why Agile Projects Fail: The 7 Mistakes PMs Make in Every Sprint', body: `<p>Agile is the most widely adopted and most widely misunderstood methodology in software development. Teams follow the rituals — standups, retrospectives, sprint reviews — but miss the principles.</p><h3>Mistake 1: Standups as Status Reports</h3><p>The daily standup exists to surface blockers, not report progress. The question is: "What's stopping you?" If nothing is, the standup is 30 seconds.</p><h3>Mistake 2: Sprint Goals That Aren't Goals</h3><p>A sprint goal isn't "finish the five stories in the sprint." A sprint goal is a statement of what the team will learn or prove: "We will confirm that the new onboarding reduces time-to-first-action below 3 minutes."</p><h3>Mistake 3: Velocity as a Performance Metric</h3><p>Velocity measures capacity, not value. When you use velocity to measure team performance, engineers inflate estimates. The number goes up. The output doesn't.</p><h3>Mistakes 4–7</h3><ul><li><strong>Skipping retrospectives:</strong> When a project is behind, retrospectives are the first thing cut. This is exactly backwards.</li><li><strong>No definition of done:</strong> Write it once. Include code review, tests passing, deployed to staging, instrumented, documented.</li><li><strong>Ignoring technical debt:</strong> Allocate 20% of every sprint to debt reduction.</li><li><strong>No stakeholder demo:</strong> Sprint reviews without real stakeholders are theater.</li></ul>` },
  5: { cat: 'Prioritization', date: 'Oct 2025', mins: 7, img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=65&auto=format&fit=crop', title: 'RICE vs MoSCoW: When to Use Each Framework', body: `<p>Every prioritization framework has a blind spot. RICE ignores strategic alignment. MoSCoW invites politics. The PMs who get this right don't pick one framework — they pick the right framework for the situation.</p><h3>When RICE Works Best</h3><p>RICE (Reach × Impact × Confidence ÷ Effort) works when you have quantitative data. It's best for mature products with analytics in place. Without data, RICE becomes a confidence interval for guesswork.</p><p><strong>Use RICE when:</strong> comparing growth initiatives with different audience sizes, you have behavioral data, and you're optimizing for measurable outcomes.</p><h3>When MoSCoW Works Best</h3><p>MoSCoW works best for scoping releases and communicating with non-technical stakeholders. It forces trade-off conversations in plain language.</p><p><strong>Use MoSCoW when:</strong> planning a fixed-scope release, aligning stakeholders on what gets cut, or working on a product with contractual deliverables.</p><h3>The Framework No One Talks About</h3><p>Opportunity Scoring: Ask users "How satisfied are you with [feature] today?" and "How important is [feature] to you?" Plot the gap. High importance + low satisfaction = your biggest opportunity.</p><blockquote><p>"A prioritization framework is a communication tool, not a decision machine. The decision is always yours."</p></blockquote>` },
};

/* ── Article modal ── */
function openArt(id) {
  const a = ARTS[id]; if (!a) return;
  const m = document.getElementById('artModal');
  document.getElementById('mHero').style.display = a.img ? 'block' : 'none';
  if (a.img) document.getElementById('mImg').src = a.img;
  document.getElementById('mCat').textContent = a.cat;
  document.getElementById('mTit').textContent = a.title;
  document.getElementById('mMet').textContent = a.date + ' · ' + a.mins + ' min read';
  document.getElementById('mCon').innerHTML = a.body;
  m.classList.add('open'); document.body.style.overflow = 'hidden';
}
function closeArt() { document.getElementById('artModal').classList.remove('open'); document.body.style.overflow = ''; }
function artClick(e) { if (e.target === e.currentTarget || e.target.classList.contains('amod-bd')) closeArt(); }

/* ── Reading progress in article modal ── */
document.getElementById('mCon') && document.getElementById('artModal').addEventListener('scroll', function () {
  const el = this; const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
  const bar = document.getElementById('artProgress');
  if (bar) bar.style.width = (pct * 100) + '%';
});

/* ── Init ── */
window.addEventListener('DOMContentLoaded', () => {
  buildStores(); renderTips(); renderChallenges();
});
