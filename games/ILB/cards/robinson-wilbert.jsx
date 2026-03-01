import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: WILBERT ROBINSON
// Era: 1920 · Archetype: Players' Manager
// "Uncle Robbie" — Grapefruit, Daffiness Boys, One Win Over .500
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Wilbert Robinson",
  nickname: "Uncle Robbie",
  year: 1920,
  team: "Brooklyn Robins",
  era: "1920s",
  ilb_team: "Lumber",
  archetype: "Players' Manager",
  born: "June 29, 1864 — Bolton, MA",
  died: "August 8, 1934 — Atlanta, GA (age 70)",
  hof: "Inducted 1945 (Old Timers Committee). First 20th century Dodger in the Hall. His dying words: 'Don't worry about it, fellas. I'm an old Oriole. I'm too tough to die.' He was wrong.",
  height: '5\'8"',
  weight: "215-250 lbs (grew considerably during managing career)",

  record: {
    career_wins: 1399,
    career_losses: 1398,
    win_pct: ".500",
    pennants: 2,
    world_series: 0,
    seasons_managed: 19,
    ejections: "Rare — Robinson ran his club far differently than the despotic McGraw. Freedom, not fear.",
    peak_team: "1920 Brooklyn Robins",
    peak_record: "93-61, won NL Pennant (lost World Series to Cleveland)",
    teams_managed: ["Baltimore Orioles AL (1902): brief stint", "Brooklyn Robins/Dodgers (1914-31): 1375-1341"],
    notable: "1,399-1,398 — ONE WIN over .500 in 19 seasons. 2 NL pennants (1916, 1920), 0 World Series wins. The team was literally renamed 'Robins' after him. 'Daffiness Boys' — the most entertainingly chaotic team in baseball. Grapefruit dropped from airplane incident. 17-year feud with John McGraw. Star catcher for 1890s Orioles dynasty (3 pennants). 7-for-7 game in 1892 (11 RBI). Pitching guru — developed Dazzy Vance, Burleigh Grimes, Rube Marquard. Weighed 250 lbs by end of career. Casey Stengel protégé.",
    playing_career: ".273 BA, 1,388 hits, 17 seasons. Star catcher for Baltimore Orioles dynasty (1894-96 pennants). 7-for-7 with 11 RBI on June 10, 1892. First catcher to play directly behind batter at all times. Caught triple-header in 1896.",
  },

  ilb_ratings: {
    tac: 3,  // Moderate. "No special system of playing won the 1920 pennant." Robinson managed by instinct and relationships, not tactical innovation. His genius was elsewhere.
    pit: 5,  // Maximum. Robinson was a catcher who became baseball's greatest pitching guru. Developed Dazzy Vance, Burleigh Grimes, Rube Marquard, Jeff Tesreau. "He knew baseball as the spotted setter knows the secrets of quail hunting, by instinct and experience."
    lin: 3,  // Moderate. Robinson got the most from castoffs and characters but never built a consistently powerful lineup. The "Daffiness Boys" were entertaining, not optimized.
    adp: 3,  // Moderate. 18 years with one franchise. He adapted to what he had — castoffs, characters, limited budgets — but didn't evolve his approach over time.

    dis: 3,  // Low. Robinson gave his players freedom. "Running his club far differently than the despotic McGraw." The Daffiness Boys were undisciplined but functional — sometimes.
    ego: 7,  // Good. Robinson handled Dazzy Vance, Babe Herman, Casey Stengel, and a parade of colorful characters without cracking. His jovial approach defused ego clashes through humor rather than authority.
    har: 10, // Maximum. The team was literally named after him. "Uncle Robbie" — the avuncular nickname says everything. Players loved him unconditionally. He created the most beloved team culture in baseball history.
    int: 4,  // Low-moderate. Robinson was jolly, not intense. His energy was warmth, not fire. The 250-pound frame and the grapefruit and the stories — this was a man who made baseball fun, not frightening.
    str: 6,  // Moderate. Great at developing pitchers, poor at building complete teams. 5th place or worse 12 out of 18 seasons. Two surprise pennants with teams "not given a pre-season chance" — the rest was lovable mediocrity.
    flx: 5,  // Moderate. Adapted to whatever characters walked through the door. Didn't have a rigid system — everything was personality-based, which is inherently flexible but unsystematic.

    ovr: 9,  // Elite tier. Two pennants, the pitching development, the culture he created, and the sheer longevity earn Elite. But 1,399-1,398 and zero World Series titles prevent Legend.
  },

  rating_justification: {
    tac: "Moderate. Robinson managed by feel, not formula. 'No special system of playing won the 1920 pennant for the Brooklyn Superbas.' He wasn't a tactical innovator — he was a people person who happened to manage baseball. The tactical decisions were instinctive and inconsistent. Rating of 3.",
    pit: "Maximum. Robinson was the greatest pitching developer of his generation. As a catcher, he understood pitchers at a molecular level. He developed Dazzy Vance from a career minor leaguer into an MVP and strikeout king. He integrated Burleigh Grimes into multiple 20-win seasons. He nurtured Rube Marquard with the Giants. His pitching staff management was 'instinct and experience' at the highest level. Rating of 5.",
    lin: "Moderate. Robinson's lineups were assembled from castoffs and characters — 'a roster of unproven youngsters and over-the-hill castoffs.' He maximized bad hands through personality management rather than lineup optimization. The Daffiness Boys were entertaining, not efficient. Rating of 3.",
    adp: "Moderate. 18 years with one franchise is longevity, not necessarily adaptability. Robinson's approach — jovial, permissive, personality-driven — didn't change much. He adapted to the players he had, but he didn't evolve as the game evolved. Rating of 3.",
    dis: "Low. 'Running his club far differently than the despotic McGraw.' Robinson gave players freedom — and the Daffiness Boys were the result. Babe Herman once tripled into a triple play. Three Dodgers ended up on third base simultaneously. The chaos was charming but not disciplined. Rating of 3.",
    ego: "Good. Robinson handled some of the most colorful personalities in baseball — Dazzy Vance (eccentric HOF pitcher), Babe Herman (hilariously bad fielder), Casey Stengel (prankster extraordinaire) — with humor and patience. He defused ego clashes by making everyone feel like family. Uncle Robbie didn't fight egos; he absorbed them into the family. Rating of 7.",
    har: "Maximum. The team was renamed 'Robins' in his honor. 'Uncle Robbie' — the nickname itself is the rating justification. Players loved him. Fans loved him. Sportswriters loved him. 'His conversation was a continuous flow of homely philosophy, baseball lore, and good humor.' No manager in baseball history created more genuine affection. Rating of 10.",
    int: "Low-moderate. Robinson was not an intense manager. He was jovial, rotund, and easy-going. His energy was warmth and humor, not fire and fury. The 250-pound frame suggested comfort, not competition. But underneath, he was a 'never-say-die competitor' — the intensity was there, just buried under layers of charm and body mass. Rating of 4.",
    str: "Moderate. Elite at pitcher development (Vance, Grimes, Marquard) but poor at building complete teams. 5th place or worse 12 out of 18 seasons. Two pennants with teams nobody expected to contend — but no sustainable talent pipeline. The roster strategy was 'make the best of what you've got' rather than 'build something great.' Rating of 6.",
    flx: "Moderate. Robinson's permissive style was inherently flexible — he adapted to whatever characters appeared. But the flexibility was passive, not strategic. He didn't change his approach; he simply accepted whatever came. Rating of 5.",
  },

  personality: {
    leadership_style: "Avuncular permissiveness. Uncle Robbie led through warmth, humor, and unconditional acceptance. He didn't demand discipline — he gave freedom. He didn't impose standards — he told stories. He didn't fine players — he laughed with them. The result was a team culture so beloved that the franchise was renamed after him. The inverse McCarthy: where Marse Joe demanded compliance, Uncle Robbie offered belonging.",
    temperament: "Jovial, warm, and endlessly entertaining. 'Like Falstaff, he was not only witty himself but the cause of wit in others.' Robinson weighed 250 pounds, wore bright red-and-yellow caps, caught grapefruits from airplanes, and told stories that made everyone feel like they were part of something special. The temperament wasn't an act — Robinson genuinely loved baseball and the people who played it.",
    work_ethic: "Instinctive rather than systematic. Robinson didn't study statistics or plan strategies — he watched, listened, and responded. His pitching development came from decades of catching, not from analysis. His managing came from understanding people, not from understanding systems. The work ethic was relational, not procedural.",
    lifestyle: "Rotund, social, expansive. Robinson owned a hunting camp called Dover Hall near Brunswick, Georgia. He and McGraw once co-owned a billiards parlor in Baltimore. He was married to Mary O'Brien, known as 'Ma Robinson,' who became part of the Brooklyn family. The lifestyle was generous, communal, and thoroughly unpretentious.",
    communication_style: "Storytelling and homely philosophy. 'His conversation was a continuous flow of homely philosophy, baseball lore, and good humor.' Robinson communicated through anecdotes, jokes, and gentle ribbing. He chewed out players but without malice — the criticism was wrapped in affection. Even his mistakes became stories. The grapefruit is the ultimate Robinson communication: something went wrong, everyone laughed, and it became legend.",
    loyalty_expectations: "Play hard, have fun, don't embarrass the family. Robinson didn't demand perfection — he demanded effort and good spirit. His players could be eccentric, error-prone, or undisciplined, as long as they were part of the family. The loyalty was tribal, not contractual.",
    dark_side: "The lovable losing. 1,399-1,398 — one win over .500 in 19 seasons. Fifth place or worse 12 times. Zero World Series titles. The Daffiness Boys were charming but incompetent. Three runners on third base. Babe Herman tripling into a triple play. Robinson's permissiveness enabled chaos that cost games. The warmth that made Brooklyn love him was the same warmth that couldn't make Brooklyn WIN consistently. And the 17-year feud with McGraw — the one relationship Robinson couldn't repair, the one failure of his universal warmth. In ILB: Robinson carries 'The Lovable Losers' — his teams are the happiest in the game, but happiness doesn't always win championships.",
  },

  playbook: {
    roster_philosophy: "Collect characters, develop pitchers, and let personality carry the team. Robinson didn't build rosters — he adopted families. His teams were assembled from 'unproven youngsters and over-the-hill castoffs,' held together by Robinson's warmth and the pitching staff he nurtured. The philosophy was social, not strategic: create an environment where people want to play, and they'll play their best. Sometimes.",
    conflict_response: "DEFUSE THROUGH HUMOR. Robinson turned conflicts into stories. When something went wrong — and with the Daffiness Boys, something always went wrong — Robinson laughed, told a story, and moved on. The grapefruit incident is the template: disaster becomes comedy, comedy becomes legend. Conflict can't survive laughter.",
    clique_strategy: "EMBRACE ALL FACTIONS. Under Robinson, there were no outcasts. Everyone was part of Uncle Robbie's family. Cliques couldn't form because the family was the only clique that mattered. Even the eccentrics — Stengel, Herman, Vance — were welcome at the table.",
    player_types_that_thrive: [
      "Pitchers — Robinson developed more great pitchers than almost any manager in history",
      "Eccentric personalities who need freedom to express themselves — the Daffiness Boys archetype",
      "Castoffs and rejects from rigid systems — Robinson's warmth rehabilitated careers",
      "Young players who need a nurturing, patient environment — Uncle Robbie, not Drill Sergeant",
      "Players who respond to humor and belonging rather than discipline and fear",
    ],
    player_types_that_struggle: [
      "Disciplined professionals who expect structure — Robinson's teams are organized chaos",
      "Players who need accountability — Robinson's permissiveness enables bad habits",
      "Win-at-all-costs competitors who can't tolerate losing — 1,399-1,398 requires patience",
      "Defensive specialists — the Daffiness Boys committed errors that defied physics",
      "Players who resent being part of a circus — Brooklyn was, lovably, a circus",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 5,
      max_volatility: "HIGH — Robinson absorbs volatility through humor. The crazier the situation, the better the story.",
      discipline_floor: "VERY LOW — Robinson barely enforces discipline. The freedom is the feature.",
      star_exception: "Everyone gets the same warmth. Stars and benchwarmers alike are part of Uncle Robbie's family.",
    },
  },

  chemistry_impact: {
    team_fit: { effect: "MAXIMUM INCREASE", desc: "+3 Team Fit for all players. The team is literally named after the manager. Everyone belongs. Everyone is family. The most cohesive culture in baseball." },
    volatility: { effect: "SLIGHTLY REDUCED", desc: "-1 Volatility. Robinson's humor absorbs tension. But only slightly — the Daffiness Boys were themselves volatile, just in an entertaining rather than destructive way." },
    discipline: { effect: "DECREASED", desc: "-2 Discipline. Robinson's permissiveness comes at a cost. 'Running his club far differently than the despotic McGraw.' Freedom creates joy AND chaos." },
    ego: { effect: "ABSORBED", desc: "-1 Ego for all players. Uncle Robbie's warmth deflates ego naturally. It's hard to be a prima donna when the manager is a 250-pound teddy bear who caught a grapefruit from an airplane." },
    work_habits: { effect: "MODERATE", desc: "+1 Work Habits. Robinson expected effort and good spirit. Not maximum intensity — but genuine enjoyment of the work." },
    adaptability: { effect: "INCREASED", desc: "+1 Adaptability. Robinson's permissive environment lets players find their own way. The lack of rigid systems forces creative adaptation." },
  },

  chemistry_traits: [
    { tag: "Uncle Robbie", desc: "All players gain +2 morale upon joining. No player can develop 'Disgruntled' status under Robinson. The family doesn't let you feel unwanted." },
    { tag: "The Pitching Whisperer", desc: "Robinson was a catcher who became the greatest pitching developer of his era. All pitchers gain +2 to their highest pitching stat. Dazzy Vance went from nobody to MVP under Robinson." },
    { tag: "The Daffiness Boys", desc: "Robinson's permissiveness enables spectacular chaos. Once per game, there's a 10% chance of a 'Daffiness' event: a comically bad defensive play that costs 1 run. But all players gain +1 morale afterward (it's funny)." },
    { tag: "The Grapefruit", desc: "Once per series, Robinson falls for a prank. He loses -1 Tactics for one inning. But the story becomes legend: +1 Team Fit permanently. 'It was always Robinson's ability to turn embarrassment into bonding.'" },
    { tag: "Named After the Manager", desc: "The team identity IS the manager. +2 Team Fit when playing at home. The fans love Uncle Robbie, and the players love the fans who love Uncle Robbie. The feedback loop of affection." },
    { tag: "The Anti-McGraw", desc: "Robinson and McGraw feuded for 17 years. When playing against a McGraw-archetype manager (high Discipline, low Harmony), Robinson's players gain +1 to all stats. Freedom beats fear — sometimes." },
    { tag: "One Win Over .500", desc: "1,399-1,398. Robinson's career record is the most perfectly mediocre in baseball history. After every loss, there's a 5% chance of a 'Rally' — +2 to all stats next game. Uncle Robbie always believed tomorrow would be better." },
    { tag: "Old Oriole", desc: "'I'm an old Oriole. I'm too tough to die.' Robinson played with McGraw on the 1890s Orioles dynasty. Players with 10+ games under Robinson gain the 'Old Oriole' trait: +1 to all stats in elimination games." },
  ],

  preferred_locations: [
    { location: "Ebbets Field / Brooklyn", affinity: "HIGH", note: "18 years in Brooklyn. The team was named after him. The fans adored him. Ebbets Field was his living room." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Where Uncle Robbie told stories, laughed with players, and turned disasters into legends. The family gathered here." },
    { location: "Spring Training / Daytona Beach", affinity: "HIGH", note: "Where the grapefruit incident happened. Where Robinson evaluated his castoffs and characters each year." },
    { location: "Dover Hall / Georgia", affinity: "MEDIUM", note: "Robinson's hunting camp near Brunswick. His retreat from baseball. Where he first learned he'd been replaced." },
    { location: "Baltimore / Billiards Parlor", affinity: "MEDIUM", note: "Where Robinson and McGraw were partners and friends — before the 17-year feud that defined both their careers." },
    { location: "Pitching Mound / Behind Home Plate", affinity: "HIGH", note: "Robinson was a catcher for 17 years. The mound and the plate were his classroom — where he taught pitchers to be great." },
  ],

  momentum: {
    hot_triggers: [
      "Surprise pennant runs — both 1916 and 1920 pennants were unexpected. Uncle Robbie thrived as an underdog",
      "Pitching staff performing — when Robinson's pitchers were dominant, the team could compete with anyone",
      "Team chemistry peaking — when the family was happy, the Robins played above their talent level",
      "Playing against McGraw's Giants — the 17-year rivalry fueled Brooklyn's best performances",
    ],
    cold_triggers: [
      "Extended losing without hope — Robinson couldn't motivate during truly hopeless seasons (12 finishes 5th or worse)",
      "Defensive disasters — the Daffiness Boys' errors demoralized even Uncle Robbie",
      "Front office interference — when ownership got involved, Robinson's permissive culture clashed with demands for results",
      "Loss of key pitchers — Robinson's success depended disproportionately on his pitching staff",
    ],
    pressure_response: "WARM IN LOW PRESSURE, ADEQUATE IN HIGH PRESSURE. Robinson won two pennants with underdog teams — solid pressure performance. But 0-2 in World Series. The warmth that built the culture couldn't quite carry the team through the highest-pressure moments. In ILB: Robinson provides +1 Clutch in pennant races (the belief is contagious). -1 Clutch in championship games (warmth isn't enough when the stakes are highest). The lovable loser's paradox.",
  },

  action_card_seeds: [
    {
      title: "The Grapefruit",
      type: "Drama",
      text: "Your manager agrees to catch a baseball dropped from an airplane. Someone substitutes a grapefruit. It explodes on impact. Your manager believes he's dying. Then everyone laughs. +2 Team Fit permanently. Baseball is absurd and wonderful.",
      origin: "1915 spring training: Robinson bragged he could catch a ball dropped 525 feet from an airplane. The pilot (or Casey Stengel) substituted a grapefruit. It exploded on Robinson's chest. He thought he was covered in his own blood. The team laughed for decades.",
    },
    {
      title: "The Daffiness Play",
      type: "Game Action",
      text: "Three of your baserunners end up on the same base simultaneously. You lose 2 runs. But the story is so funny that all players gain +2 morale for 3 games. 'Only in Brooklyn.'",
      origin: "The Daffiness Boys committed baseball errors that defied physics. The most famous: Babe Herman tripled into a double play when three Dodgers ended up on third base at the same time. Robinson's reaction: a sigh, a laugh, and another story.",
    },
    {
      title: "Uncle Robbie's Pitching Clinic",
      type: "Action",
      text: "Your manager, a former star catcher, works personally with your pitching staff. All pitchers gain +2 to their highest pitching stat permanently. Robinson developed Dazzy Vance from minor league washout to MVP.",
      origin: "Robinson was baseball's greatest pitching developer. He turned Dazzy Vance (minor league journeyman) into an MVP (28 wins, 2.16 ERA, 262 Ks in 1924). He integrated Burleigh Grimes into a multi-20-win pitcher. He nurtured Rube Marquard with the Giants.",
    },
    {
      title: "The Anti-McGraw",
      type: "Action",
      text: "Your manager runs his club the opposite way from the tyrant across town. When facing a high-Discipline opponent, all your players gain +2 to all stats. Freedom beats fear — at least for one game.",
      origin: "Robinson and McGraw were teammates, friends, business partners — then enemies for 17 years. They represented opposite managing philosophies: McGraw's iron fist vs Robinson's warm embrace. Brooklyn vs Manhattan. 'Running his club far differently than the despotic McGraw.'",
    },
    {
      title: "Named After the Manager",
      type: "Action",
      text: "Your team is officially renamed after your manager. +3 Team Fit permanently. The fans, the players, and the manager are one identity. 'The Robins.'",
      origin: "Sportswriters renamed the Brooklyn Dodgers as the 'Brooklyn Robins' in Robinson's honor. The name lasted his entire 18-year tenure. Even after he left, sportswriters called the team 'the Flock' — Robinson's birds.",
    },
    {
      title: "Too Tough to Die",
      type: "Drama",
      text: "Your manager suffers a serious injury or health crisis. He declares: 'I'm an old Oriole. I'm too tough to die.' All players gain +2 Intensity for 3 games. If the manager survives: +1 to all ratings permanently. If he doesn't: the team gains 'Old Oriole' trait forever.",
      origin: "Robinson fell in his hotel room in 1934, breaking his arm and hitting his head. He told concerned attendants: 'Don't worry about it, fellas. I'm an old Oriole. I'm too tough to die.' He died of a brain hemorrhage hours later.",
    },
  ],

  art_direction: {
    face: "Round, ruddy, beaming. 5'8\" 250 lbs — the most rotund manager in baseball history. The face is all smile: wide, genuine, infectious. Irish features. Small eyes sparkling with humor above puffy cheeks. The face of a man who has heard every joke, told most of them, and is already thinking of the next one. He looks like your favorite uncle at Thanksgiving — the one who lets you have a second piece of pie.",
    attire: "Brooklyn Robins uniform, straining against his frame. Or: the famous bright red-and-yellow cap that earned him attention around Brooklyn. The uniform doesn't quite fit — it couldn't possibly contain this much personality. His catcher's mitt might be nearby, a reminder that Uncle Robbie was once the best catcher in baseball, before he became the most beloved manager.",
    mood: "Pure warmth. Not fierce (McGraw), not calm (McCarthy), not intense (Evers) — warm. The card should make you smile. Robinson is the only manager card that should radiate genuine happiness. There's sadness underneath — the 17-year feud, the 12 losing seasons, the death in a hotel room — but the warmth is always on top. The Falstaff of baseball.",
    style: "Warm sepia with gold and robin's-egg blue undertones — the Players' Manager palette at its most inviting. Ebbets Field in the background, intimate and beloved. The card should feel like a family photo — slightly overexposed, slightly imperfect, completely charming. Border should be soft and rounded, not angular. A robin (the bird) in one corner. A grapefruit in the other.",
    reference: "Where Mack's Players' Manager card (1910 Era) is patriarchal dignity, Robinson's is patriarchal warmth. Both are beloved. Both HAR 9-10. But Mack's love is quiet and earned through decades of silence. Robinson's love is loud and immediate — you walk into the clubhouse and you're family. Mack is the grandfather who nods approvingly. Robinson is the uncle who bear-hugs you and tells you a story about the time a grapefruit almost killed him.",
  },
};

const RATING_ENGINE = { overall: { tiers: [
  { range: "3-4", label: "Filler" }, { range: "5-6", label: "Solid Skipper" },
  { range: "7-8", label: "Contender" }, { range: "9-10", label: "Elite" },
  { range: "11-12", label: "Legend" }, { range: "13", label: "Mythic" },
]}};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14",
  archGreen: "#55b877", archDark: "#2a6a3a",
  hotRed: "#c44040", coldBlue: "#4a7a9a", traitGreen: "#5a8a5a",
  archetypes: {
    Authoritarian: "#e05555", "Players' Manager": "#55b877",
    Firebrand: "#e8a030", "Tactical Purist": "#5588cc", Opportunist: "#b070cc",
  },
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
    <span style={{ width: 32, fontSize: 10, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, textAlign: "right" }}>{label}</span>
    <div style={{ flex: 1, height: 12, background: `${C.sepia}30`, borderRadius: 2, overflow: "hidden" }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 2 }} />
    </div>
    <span style={{ width: 18, fontSize: 11, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "center" }}>{value}</span>
  </div>
);
const ClubhouseBar = ({ label, value, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
    <span style={{ width: 60, fontSize: 9, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{label}</span>
    <div style={{ flex: 1, height: 8, background: `${C.sepia}20`, borderRadius: 2, overflow: "hidden" }}>
      <div style={{ width: `${(value / 10) * 100}%`, height: "100%", background: color, borderRadius: 2 }} />
    </div>
    <span style={{ width: 14, fontSize: 9, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace" }}>{value}</span>
  </div>
);
const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);
const ChemTag = ({ tag }) => (
  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: `${C.archGreen}15`, border: `1px solid ${C.archGreen}30`, color: C.archGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</span>
);

export default function WilbertRobinsonCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("playbook");
  const d = MANAGER_DATA;
  const r = d.ilb_ratings;
  const archColor = C.archetypes[d.archetype] || C.archGreen;

  const tabs = [
    { id: "playbook", label: "Playbook" }, { id: "personality", label: "Dossier" },
    { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" },
    { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Rating Engine" },
    { id: "art", label: "Art Notes" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Manager Card — {d.ilb_team} Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${archColor}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Playbook ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, #0a2a1a 0%, #1a3a2a 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.15 }}>🍊</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>PLAYERS' MANAGER</div>
              <div style={{ position: "absolute", bottom: 50, left: 12, background: `${C.ink}aa`, color: C.gold, padding: "3px 8px", borderRadius: 2, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.era}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 10, color: archColor, fontFamily: "'Courier Prime', monospace", marginTop: 6, letterSpacing: 3, fontWeight: 900 }}>◆ MANAGER ◆</div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 6, textTransform: "uppercase" }}>Game Management</div>
              <StatBar label="TAC" value={r.tac} max={5} color={archColor} />
              <StatBar label="PIT" value={r.pit} max={5} color={C.gold} />
              <StatBar label="LIN" value={r.lin} max={5} color={C.coldBlue} />
              <StatBar label="ADP" value={r.adp} max={5} color={C.traitGreen} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 6, textTransform: "uppercase" }}>Clubhouse Management</div>
              <ClubhouseBar label="DISCPLN" value={r.dis} color={"#e05555"} />
              <ClubhouseBar label="EGO MGT" value={r.ego} color={C.warmRed} />
              <ClubhouseBar label="HARMONY" value={r.har} color={archColor} />
              <ClubhouseBar label="INTSITY" value={r.int} color={"#e8a030"} />
              <ClubhouseBar label="STRATGY" value={r.str} color={C.coldBlue} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={"#b070cc"} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "WS WINS", val: d.record.world_series },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "WEIGHT", val: "250lb" },
                { label: "FEUD YRS", val: "17" },
                { label: "GRAPEFRT", val: "1" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER MANAGERIAL RECORD — ONE WIN OVER .500</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["👑 2 Pennants", "🍊 Grapefruit Incident", "⭐ HOF 1945", "🐦 Team Named 'Robins'", "🤪 Daffiness Boys", "⚾ PIT 5 (Maximum)", "❤️ HAR 10 (Maximum)", "⚔️ 17-Year Feud w/ McGraw"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${archColor}15`, border: `1px solid ${archColor}30`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: archColor, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 900 }}>CLASSIFIED PLAYBOOK — {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>
              ))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "playbook" && (<>
                <Section title="Roster Philosophy"><p style={{ margin: 0, color: C.medBrown }}>{d.playbook.roster_philosophy}</p></Section>
                <Section title="Conflict Response"><p style={{ margin: 0 }}><span style={{ fontWeight: 900, color: archColor }}>{d.playbook.conflict_response.split(".")[0]}.</span> {d.playbook.conflict_response.split(".").slice(1).join(".")}</p></Section>
                <Section title="Clique Strategy"><p style={{ margin: 0 }}><span style={{ fontWeight: 900, color: archColor }}>{d.playbook.clique_strategy.split(".")[0]}.</span> {d.playbook.clique_strategy.split(".").slice(1).join(".")}</p></Section>
                <Section title="✅ Players Who Thrive">{d.playbook.player_types_that_thrive.map((p, i) => (<div key={i} style={{ padding: "3px 0", color: C.traitGreen, fontSize: 11 }}>▸ {p}</div>))}</Section>
                <Section title="⚠ Players Who Struggle">{d.playbook.player_types_that_struggle.map((p, i) => (<div key={i} style={{ padding: "3px 0", color: C.warmRed, fontSize: 11 }}>▸ {p}</div>))}</Section>
              </>)}
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("MAXIMUM") || effect.includes("STRONGLY") || effect.includes("INCREASED") ? `${C.traitGreen}20` : effect.includes("DECREASED") ? `${C.warmRed}20` : `${C.gold}20`, color: effect.includes("MAXIMUM") || effect.includes("STRONGLY") || effect.includes("INCREASED") ? C.traitGreen : effect.includes("DECREASED") ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Robinson's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (
                    <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                        <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span>
                      </div>
                      <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                      <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="🎩 Manager Rating Engine">{Object.entries(d.rating_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB MGR #{d.ilb_team}</span>
          <span>{d.era} • {d.archetype} • OVR {r.ovr}</span>
        </div>
      </div>
    </div>
  );
}
