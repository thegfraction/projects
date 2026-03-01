import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: JOHNNY EVERS
// Era: 1910 · Archetype: Firebrand
// "The Crab" — 125 Pounds of Fury and Genius
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Johnny Evers",
  nickname: "The Crab",
  year: 1913,
  team: "Chicago Cubs",
  era: "1910s",
  ilb_team: "Gloves",
  archetype: "Firebrand",
  born: "July 21, 1881 — Troy, NY",
  died: "March 28, 1947 — Albany, NY (age 65)",
  hof: "Inducted 1946 (Veterans Committee). Elected with Tinker and Chance — the inseparable trio. Died of cerebral hemorrhage less than a year after induction.",
  height: '5\'9"',
  weight: "125 lbs",

  record: {
    career_wins: 180,
    career_losses: 192,
    win_pct: ".484",
    pennants: 0,
    world_series: 0,
    seasons_managed: 3,
    ejections: "Constant — 9 ejections in 1914 alone (as player-captain). As manager: combative with everyone.",
    peak_team: "1914 Miracle Braves (as player-captain/MVP, not official manager)",
    managerial_stints: ["Chicago Cubs player-manager (1913)", "Chicago Cubs manager (1921, fired Aug 2)", "Chicago White Sox manager (1924, fired after 1 season)"],
    notable: "180-192 career managerial record. BUT: as player — 4 WS appearances, 2 WS wins (1907, 1908), 1 WS win as captain (1914 Miracle Braves), 1914 Chalmers Award (MVP). The Merkle play (1908). Co-authored 'Touching Second' — the first analytical baseball book. 30-year feud with Joe Tinker.",
    playing_career: ".270 BA, 324 SB, 919 runs. 5 pennants as player (Cubs 1906-08-10, Braves 1914). 3 WS wins. 1914 MVP. Teams never finished worse than 3rd in 15 years.",
    tragedies: "1910-11: daughter died, lost life savings in failed business, drove car that killed his best friend, suffered nervous breakdown and pneumonia.",
  },

  ilb_ratings: {
    tac: 5,  // Maximum. The Merkle play was pure tactical brilliance — reading the rulebook and exploiting what nobody else saw. Co-wrote the first analytical baseball book. "A master strategist."
    pit: 2,  // Evers was a position player. No evidence of special pitching management. His managing tenure was too short and unsuccessful to demonstrate this.
    lin: 3,  // Adequate. His genius was in the field — defensive positioning, baserunning decisions, rulebook exploitation. Lineup construction was secondary to his tactical obsessions.
    adp: 2,  // Low. Evers's intensity was unsustainable. Fired twice as manager. His nervous breakdowns show he couldn't adapt to the grind. His one mode was maximum intensity, always.

    dis: 4,  // Low. Evers couldn't discipline himself, let alone others. "Constantly involved in altercations with umpires, opponents and even teammates." He expected everyone to be as obsessed as he was — and nobody was.
    ego: 3,  // Poor. Feuded with Tinker for 30 years. "During the turbulent days of his career he was on the outs with almost everyone he knew." His ego management was nonexistent — he demanded perfection and despised anything less.
    har: 3,  // Poor. "He'd make you want to punch him," teammate Rabbit Maranville recalled. The Crab nickname fit his personality more than his fielding. Toxic to harmony.
    int: 10, // Maximum. "The fiercest competitor this side of Ty Cobb." "A keen little umpire-fighting bundle of nerves." His intensity burned through everything — teammates, opponents, umpires, his own sanity.
    str: 5,  // Moderate-low. Evers was a brilliant tactical mind but a poor organizational strategist. 180-192 career record. Fired twice. His genius was on the field in the moment, not in building a roster.
    flx: 3,  // Poor. One gear: maximum. Couldn't adjust his approach, couldn't calm down, couldn't manage people who weren't as intense as him. Two nervous breakdowns prove it.

    ovr: 7,  // Contender tier. His playing career and tactical mind were extraordinary, but his managerial record (180-192, fired twice) holds him back. The gap between his genius and his results is the tragedy of Johnny Evers.
  },

  rating_justification: {
    tac: "Maximum. The Merkle play — calling out Fred Merkle for not touching second base, forcing a forfeit that decided the 1908 NL pennant — was the single greatest tactical observation in baseball history. Evers SAW what nobody else saw because he had studied the rulebook obsessively. He co-authored 'Touching Second' with Hugh Fullerton — the first analytical baseball book. 'It's a case of think, think, all the time.' Rating of 5.",
    pit: "Evers was a position player whose managerial tenure was too brief and unsuccessful to demonstrate pitching management. No evidence of innovative pitching strategy. His genius was elsewhere. Rating of 2.",
    lin: "Adequate. Evers understood baseball at a deep analytical level — he was decades ahead of his time in understanding the value of each run and each out. But his managerial record doesn't show lineup innovation. His gift was in-game tactical decisions, not pre-game construction. Rating of 3.",
    adp: "Low. Evers had one mode: maximum intensity. When told to calm down, he couldn't. When his players didn't match his obsession, he raged at them. He suffered two nervous breakdowns because he couldn't adapt his emotional investment to his physical/mental limits. Fired twice because he couldn't adjust to managing adults who weren't as driven as he was. Rating of 2.",
    dis: "Poor. Evers couldn't discipline himself — 9 ejections in 1914, constant altercations, suspensions. He 'couldn't understand why his Chicago players couldn't do the right thing when he had told them what to do. He couldn't understand that there is such a thing as instinct.' His expectations were inhuman. Rating of 4.",
    ego: "Poor. The 30-year feud with Joe Tinker is the most famous interpersonal conflict in baseball history. They didn't speak for three decades — HOF teammates. 'During the turbulent days of his career he was on the outs with almost everyone he knew.' The Crab was universally combative. Rating of 3.",
    har: "Poor. 'He'd make you want to punch him,' teammate Rabbit Maranville recalled, 'but you knew Johnny was only thinking of the team.' The saving grace: his teammates acknowledged his intentions were pure. The destruction was collateral damage from an obsession with winning that had no off switch. Rating of 3.",
    int: "Maximum. 'The fiercest competitor this side of Ty Cobb.' 'A keen little umpire-fighting bundle of nerves.' 125 pounds of pure, relentless, exhausting intensity. His war cry wasn't a shout — it was his entire existence. He literally broke his own mind with intensity. Twice. Rating of 10.",
    str: "Moderate-low. 180-192 career record. Fired by the Cubs in August 1921 (41-55). One season with the White Sox in 1924. His strategic genius was real-time and improvisational — the Merkle play, defensive positioning, baserunning calls. But building a roster and managing a season required patience and people skills he didn't have. Rating of 5.",
    flx: "Poor. One speed. Maximum. Always. Evers couldn't throttle down, couldn't adapt to different player personalities, couldn't accept that other people processed baseball differently than he did. Two nervous breakdowns. Two firings. The inflexibility wasn't stubbornness — it was genuine inability to operate at any speed other than full. Rating of 3.",
  },

  personality: {
    leadership_style: "Obsessive perfectionist. Evers led by demanding that everyone match his intensity — and no one could. He ran teammates ragged in practice. He 'took it as a personal insult when anyone didn't put forth their best effort.' His leadership was combustion: brilliant, inspiring, and ultimately self-destructive. The players who survived his intensity became champions. Many didn't survive it.",
    temperament: "Volcanic and brilliant. 'One of the smartest men that ever played baseball. He was the crabbiest, fightin'est, most sarcastic, meanest-tongued player that ever wore a spiked shoe — and at the same time one of the nicest and finest little gentlemen that ever lived. His enmity was a thing to fear; his friendship a possession to be treasured.' The duality is the key: Evers was simultaneously the best and worst teammate you could have.",
    work_ethic: "Obsessive to the point of self-destruction. 'It's a case of think, think, all the time, and the fellow who trusts to luck and does not see to it that he has his brains under full steam every minute will not last long.' He literally couldn't stop working. The nervous breakdowns were the inevitable result of a mind that refused to rest.",
    lifestyle: "Born in Troy, New York. Irish Catholic. Failed marriage. Bankrupt businesses. Daughter died in 1910. Killed his best friend in a car accident the same year. Lost his life savings. Nervous breakdown. Came back. Won the MVP. Had another breakdown. Co-authored a book. Managed. Got fired. Managed again. Got fired again. Suffered a stroke. Elected to the Hall of Fame. Died a year later. A life of triumph and devastation in equal measure.",
    communication_style: "Combative and relentless. 'My favorite umpire is a dead one.' He argued with everyone — umpires, opponents, teammates, managers. But he also wrote eloquently about baseball: 'When you have to get out, day in and day out, for six or seven months, and play, think you not it is likely to grow rather monotonous and wearisome?' He understood his own condition perfectly — and couldn't change it.",
    loyalty_expectations: "Total commitment or nothing. Evers demanded the same obsessive dedication from every player that he demanded from himself. When players fell short — and they always did — he exploded. The loyalty was real but the standard was impossible. Only the most driven players could earn his respect.",
    dark_side: "The breakdowns. Evers broke himself twice — nervous collapses in 1910-11 and again in 1915. His daughter died. He killed his best friend. His marriage failed. His businesses went bankrupt. And through all of it, he kept coming back to baseball because baseball was the only thing that made sense to him — and the thing that destroyed him. In ILB: Evers carries 'The Breaking Point' — his intensity is the highest in the game, and the cost is the highest too.",
  },

  playbook: {
    roster_philosophy: "Outthink every opponent, every day, every play. Evers didn't build rosters — he demanded that every player on the roster think as hard as he did. His philosophy was that baseball was a mental game first, physical second: 'the fellow who trusts to luck and does not see to it that he has his brains under full steam every minute will not last long.' This works if you're managing geniuses. For everyone else, it's exhausting.",
    conflict_response: "CREATE. Evers didn't respond to conflict — he generated it. He fought with umpires, opponents, teammates, and himself. Conflict was his natural state. The question isn't how he handled conflict; it's whether anyone could survive being around him during it.",
    clique_strategy: "ALIENATE. Evers was on the outs with almost everyone. Cliques formed around avoiding him. The Tinker feud lasted 30 years. His managing style created factions: those who admired his brilliance and those who couldn't stand his personality. There was no middle ground with The Crab.",
    player_types_that_thrive: [
      "Mentally tough, high-IQ players who match Evers's obsessive analysis",
      "Players who are motivated by criticism and combativeness",
      "Small, scrappy, overachieving players — Evers was 125 lbs himself",
      "Players willing to endure personal conflict for the chance to win",
      "Defensive specialists — Evers's tactical genius was defense-first",
    ],
    player_types_that_struggle: [
      "Sensitive players who need encouragement — Evers offers criticism, not comfort",
      "Players who need personal harmony to perform — The Crab destroys harmony",
      "Power hitters who rely on physical tools over mental engagement",
      "Veterans set in their ways — Evers demands constant adaptation and study",
      "Anyone who values work-life balance — Evers has none and expects none",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 2,
      max_volatility: "UNLIMITED — Evers IS volatility. He creates it, thrives in it, and eventually drowns in it.",
      discipline_floor: "NONE — Evers can't discipline others because he can't discipline himself. The standard is impossible.",
      star_exception: "No exceptions. Evers treated everyone the same: with brilliant, relentless, unsustainable intensity.",
    },
  },

  chemistry_impact: {
    team_fit: { effect: "VOLATILE", desc: "+3 Team Fit when winning (the fire is inspiring). -3 Team Fit when losing (the fire becomes blame). No middle ground. The Crab runs hot or cold." },
    volatility: { effect: "MASSIVELY INCREASED", desc: "+3 Volatility for all players. Evers creates chaos. Every game is a roller coaster. Every interaction is a potential explosion. The intensity is contagious — and dangerous." },
    discipline: { effect: "DECREASED", desc: "-2 Discipline. Evers's own lack of self-control undermines team discipline. How can the manager demand composure when he's been ejected 9 times this season?" },
    ego: { effect: "AGGRAVATED", desc: "+2 Ego for all players. Evers's combativeness breeds combativeness. The Tinker feud becomes the template — players start feuding with each other." },
    work_habits: { effect: "STRONGLY INCREASED", desc: "+2 Work Habits. Whatever else you can say about Evers, he worked harder than anyone alive. His obsessive preparation is infectious — even his enemies acknowledged his dedication." },
    adaptability: { effect: "DECREASED", desc: "-1 Adaptability. Evers has one mode. His teams play one way. There is no plan B because plan A is 'think harder, fight harder, play harder' — and that's all there is." },
  },

  chemistry_traits: [
    { tag: "The Merkle Play", desc: "Evers sees what nobody else sees. Once per game, Evers can force a rulebook review that overturns a play in his favor. The umpire must check the rulebook — and Evers has already memorized it." },
    { tag: "125 Pounds of Fury", desc: "Evers was one of the smallest men in baseball. Players with low physical stats but high mental stats gain +2 to their highest stat under Evers. Brain beats brawn." },
    { tag: "The Crab", desc: "Evers's sour disposition affects everyone. All opposing players within earshot have a 10% chance of 'Rattled' status. But all friendly players have a 10% chance of 'Frustrated' (-1 Harmony)." },
    { tag: "My Favorite Umpire", desc: "'My favorite umpire is a dead one.' Evers has a 20% chance of ejection per game. When ejected, all players gain +1 Intensity for the remainder (rallying around the martyred Crab)." },
    { tag: "30-Year Feud", desc: "Evers and Tinker didn't speak for 30 years but played brilliantly together. If two players on the team have a 'Feud' status, they BOTH gain +1 DEF when playing adjacent positions. Hatred sharpens focus." },
    { tag: "Touching Second", desc: "Evers co-wrote the first analytical baseball book. +1 Tactics for all defensive plays. Evers invented modern defensive theory in 1910." },
    { tag: "The Miracle", desc: "The 1914 Braves went from last place to World Series champions. If your team is in last place after 10 games, all players gain +2 Clutch for the remainder. The impossible is Evers's specialty." },
    { tag: "The Breaking Point", desc: "After 15 games, there's a 15% chance per game of a 'Breakdown' event — Evers is removed for 3 games. When he returns, Intensity is reduced by 2 permanently. The mind has limits." },
  ],

  preferred_locations: [
    { location: "Second Base / Infield", affinity: "HIGH", note: "Where Evers invented modern defensive positioning. The crablike stance. The pivot. The place where he was a genius." },
    { location: "Umpire's Face", affinity: "HIGH", note: "'My favorite umpire is a dead one.' Evers spent more time arguing with umpires than most managers spend in the dugout." },
    { location: "Study / Library", affinity: "HIGH", note: "Co-authored 'Touching Second.' Studied the rulebook obsessively. Found the Merkle loophole. The thinking man's ballplayer." },
    { location: "Troy, New York", affinity: "MEDIUM", note: "Born and buried there. Irish Catholic community. The place that made him and the place he returned to." },
    { location: "Practice Field", affinity: "MEDIUM", note: "'He ran his teammates ragged in practice.' If you survived Evers's practice sessions, you were ready for anything." },
    { location: "Hospital / Sanatorium", affinity: "LOW", note: "Two nervous breakdowns. Pneumonia. Stroke. The places where the 125-pound body paid for the 10-ton intensity." },
    { location: "Dugout / Manager's Office", affinity: "LOW", note: "180-192 career record. Fired twice. The dugout was where Evers's genius met its limits." },
  ],

  momentum: {
    hot_triggers: [
      "Pennant race intensity — Evers thrived when every game mattered (the Merkle play came in a pennant race)",
      "Underdog status — the Miracle Braves were in last place before Evers arrived",
      "Rulebook exploitation — when Evers found an edge, he was unstoppable",
      "Rivalry games — the hatred fueled his best performances",
    ],
    cold_triggers: [
      "Extended losing without hope — Evers needed the possibility of winning to function",
      "Personal tragedy — daughter's death, car accident, business failures broke him",
      "Team resistance to his intensity — when players tuned him out, he spiraled",
      "Physical/mental exhaustion — the breakdowns were cumulative, not sudden",
    ],
    pressure_response: "EXTRAORDINARY IN SINGLE MOMENTS, UNSUSTAINABLE OVER SEASONS. The Merkle play. The 1914 Miracle Braves. The 1907-08 World Series wins. In the moment of maximum pressure, Evers was among the greatest ever. But over a full season as manager: 180-192, fired twice. His pressure response is a spike, not a sustained elevation. In ILB: Evers provides +3 Clutch in single pivotal moments (elimination games, critical at-bats). But -2 Clutch over the course of a full season. The Crab is a weapon, not a system.",
  },

  action_card_seeds: [
    {
      title: "The Merkle Play",
      type: "Game Action",
      text: "Your manager spots a rule violation nobody else sees. Overturn one play in your favor this game. The opposing manager may challenge — roll d6. On 1-4, your ruling stands (Evers memorized the rulebook). On 5-6, the challenge succeeds and your manager is ejected.",
      origin: "September 23, 1908: Fred Merkle of the Giants failed to touch second base on a walkoff hit. Nobody noticed — except Johnny Evers. He called for the ball, touched second, and the game was forfeited. The Cubs won the pennant by one game.",
    },
    {
      title: "The Miracle Run",
      type: "Action",
      text: "Your team is in last place. Your manager's fury transforms into inspiration. All players gain +2 to their lowest stat for the next 10 games. If you climb out of last place, the bonuses become permanent. The impossible is possible.",
      origin: "The 1914 Boston Braves were 26-40 in early July — dead last. With Evers as player-captain, they went 68-19 the rest of the way and won the World Series. It remains the greatest turnaround in baseball history.",
    },
    {
      title: "Touching Second",
      type: "Action",
      text: "Your manager literally wrote the book on baseball strategy. +2 DEF for all infielders this game. All defensive plays are resolved with a +1 bonus. The first analytical baseball book, published in 1910.",
      origin: "Evers co-authored 'Touching Second' with sportswriter Hugh Fullerton in 1910 — the first book to apply analytical thinking to baseball strategy. It covered defensive positioning, baserunning, and tactical theory decades before sabermetrics.",
    },
    {
      title: "The 30-Year Feud",
      type: "Drama",
      text: "Two of your players develop an intense personal feud. They refuse to speak to each other off the field. But on the field, they gain +2 DEF when playing adjacent positions. Hatred sharpens focus. 'These are the saddest of possible words.'",
      origin: "Evers and Tinker didn't speak for 30 years after Tinker fired a baseball at Evers and injured his hand. Despite this, they formed the most famous defensive combination in history and were inducted into the Hall of Fame together in 1946.",
    },
    {
      title: "The Year Everything Broke",
      type: "Drama",
      text: "Your manager suffers catastrophic personal losses: -3 to all ratings. But if he survives 5 more games, he gains +2 Intensity and +1 Clutch permanently. What doesn't kill The Crab makes him angrier.",
      origin: "In 1910: Evers's daughter died, he lost his life savings in a failed business, he was the driver in a car accident that killed his best friend, and he suffered a nervous breakdown. He came back to win the MVP in 1914.",
    },
    {
      title: "My Favorite Umpire Is a Dead One",
      type: "Game Action",
      text: "Your manager assaults the umpire with words so vicious that the umpire loses composure. All close calls go your way for the next 3 innings. But your manager is ejected and suspended for the next game.",
      origin: "Evers was ejected 9 times in the 1914 season alone. His hatred of umpires was legendary and unrelenting. The quote 'my favorite umpire is a dead one' was delivered without irony.",
    },
  ],

  art_direction: {
    face: "Small, wiry, fierce. 5'9\" but only 125 pounds — the smallest man on any field he played. Red-faced with intensity, jaw set, eyes burning with concentration or fury (often both). Irish features. The face of a man who weighs nothing but carries the weight of the world. He looks like he's about to argue with whoever's looking at the card.",
    attire: "Chicago Cubs uniform, 1908 era. In his signature crablike fielding stance — crouched low, hands forward, ready to pounce on a ground ball. Or standing at second base, pointing at the base and screaming at the umpire about the Merkle play. The body is small but the energy is enormous — he takes up more space than his frame suggests.",
    mood: "Furious intelligence. Not dumb rage — brilliant rage. The look of a man who has figured out exactly what's wrong and cannot understand why everyone else hasn't. There's pain behind the fury — the breakdowns, the losses, the daughter's death — but the fury is always in front. The Crab is always attacking.",
    style: "Hot sepia with orange-red flame undertones — the Firebrand palette at maximum temperature. Wrigley Field / West Side Park suggested in the background. The card should feel unstable — slightly tilted, slightly overexposed, like it's vibrating with barely contained energy. Border should feel cracked and frayed, like a document that's been through a fire. Crab motifs in the corner. The card should feel like it might explode.",
    reference: "Where Tebeau's Firebrand card is a barroom brawler, Evers is an intellectual on fire. The violence is cerebral, not physical (mostly). The Crab is the most dangerous kind of Firebrand — one who's smarter than everyone AND angrier than everyone. His card should feel like a contradiction: tiny and enormous, brilliant and broken, loving and hateful. 'His enmity was a thing to fear; his friendship a possession to be treasured.'",
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
  archOrange: "#e8a030", archDark: "#8a5a10",
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
  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: `${C.archOrange}15`, border: `1px solid ${C.archOrange}30`, color: C.archOrange, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</span>
);

export default function JohnnyEversCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("playbook");
  const d = MANAGER_DATA;
  const r = d.ilb_ratings;
  const archColor = C.archetypes[d.archetype] || C.archOrange;

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
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, #2a1a0a 0%, #4a3010 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.15 }}>🦀</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>FIREBRAND</div>
              <div style={{ position: "absolute", bottom: 50, left: 12, background: `${C.ink}aa`, color: C.gold, padding: "3px 8px", borderRadius: 2, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.era}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
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
              <ClubhouseBar label="HARMONY" value={r.har} color={C.traitGreen} />
              <ClubhouseBar label="INTSITY" value={r.int} color={archColor} />
              <ClubhouseBar label="STRATGY" value={r.str} color={C.coldBlue} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={"#b070cc"} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "MGR W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "MGR PCT", val: d.record.win_pct },
                { label: "PLY WS", val: "3" },
                { label: "PLY MVP", val: "1914" },
                { label: "EJECTS", val: "9/yr" },
                { label: "WEIGHT", val: "125lb" },
                { label: "FEUDS", val: "30 yr" },
                { label: "BRKDWN", val: "2" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>MANAGERIAL + PLAYING CAREER — HALL OF FAME 1946</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ HOF 1946", "🏆 3 WS Wins (player)", "🦀 The Crab", "📖 Wrote the Book", "💥 Merkle Play", "🧠 TAC 5 (Maximum)", "⚡ INT 10 (Maximum)", "💔 2 Nervous Breakdowns"].map((a, i) => (
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
                <Section title="Tolerance Thresholds">{Object.entries(d.playbook.tolerance_thresholds).map(([key, val]) => (<div key={key} style={{ marginBottom: 4 }}><span style={{ fontWeight: 700, color: C.ink, fontSize: 10, textTransform: "uppercase" }}>{key.replace(/_/g, " ")}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{typeof val === "number" ? val : val}</span></div>))}</Section>
              </>)}
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("STRONGLY INCREASED") || effect.includes("HIGH") ? `${C.traitGreen}20` : effect.includes("DECREASED") || effect.includes("AGGRAVATED") ? `${C.warmRed}20` : `${C.gold}20`, color: effect.includes("STRONGLY INCREASED") || effect.includes("HIGH") ? C.traitGreen : effect.includes("DECREASED") || effect.includes("AGGRAVATED") ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span></div>))}</Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Evers's real life, become universal cards playable in any game.</p>
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
                <Section title="🎩 Manager Rating Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Managers use a dual rating system: Game Management (1-5) and Clubhouse Management (1-10).</p>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11, marginBottom: 4 }}>Overall Tier Scale</div>
                    {RATING_ENGINE.overall.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.label}</div>))}
                  </div>
                </Section>
                <Section title="Evers's Derivation">{Object.entries(d.rating_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
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
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({
  name: d.name, nickname: d.nickname, year: d.year, era: d.era,
  ilb_team: d.ilb_team, archetype: d.archetype,
  game_mgmt: { tac: r.tac, pit: r.pit, lin: r.lin, adp: r.adp },
  clubhouse: { dis: r.dis, ego: r.ego, har: r.har, int: r.int, str: r.str, flx: r.flx },
  ovr: r.ovr,
  chemistry_traits: d.chemistry_traits.map(t => t.tag),
  preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })),
  hot_triggers: d.momentum.hot_triggers,
  cold_triggers: d.momentum.cold_triggers,
  action_seeds: d.action_card_seeds.length,
  managerial_record: `${d.record.career_wins}-${d.record.career_losses}`,
  playing_ws_wins: 3,
  breakdowns: 2,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
