import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: LEO DUROCHER
// Era: 1930 · Archetype: Authoritarian
// "The Lip" — Nice Guys Finish Last, 95 Ejections, 2,008 Wins
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Leo Durocher",
  nickname: "The Lip",
  year: 1951,
  team: "New York Giants",
  era: "1930s",
  ilb_team: "Iron",
  archetype: "Authoritarian",
  born: "July 27, 1905 — West Springfield, MA",
  died: "October 7, 1991 — Palm Springs, CA (age 86)",
  hof: "Inducted 1994 (posthumously, Veterans Committee). Only baseball figure cited in Bartlett's Familiar Quotations. 2,008 career wins (11th all-time at retirement). Second only to John McGraw in NL wins when he retired.",
  height: '5\'10"',
  weight: "160 lbs",

  record: {
    career_wins: 2008,
    career_losses: 1709,
    win_pct: ".540",
    pennants: 3,
    world_series: 1,
    seasons_managed: 24,
    ejections: "95 — among the highest in baseball history. 'The Lip' argued with umpires as a way of life. Kicking dirt, going toe-to-toe, screaming until the vein in his neck bulged. The ejection was the performance; the performance was the point.",
    peak_team: "1954 New York Giants",
    peak_record: "97-57, swept heavily favored Cleveland Indians (111-43) in World Series",
    teams_managed: ["Brooklyn Dodgers (1939-46, 1948): NL pennant 1941, 738-565", "New York Giants (1948-55): NL pennants 1951 & 1954, WS 1954, 637-523", "Chicago Cubs (1966-72): 9½ game collapse 1969, 535-526", "Houston Astros (1972-73): 98-95"],
    notable: "Suspended entire 1947 season by Commissioner Chandler for 'accumulation of unpleasant incidents' including association with gamblers (friends with Bugsy Siegel), affair with married actress Laraine Day, and feud with Larry MacPhail. Dodgers won pennant without him. Jumped from Dodgers to rival Giants mid-1948 — considered treason by Brooklyn fans. Led Giants' 13½ game comeback in 1951, climaxing in Bobby Thomson's 'Shot Heard Round the World.' Swept the 111-win Indians in 1954 WS. Defended Jackie Robinson: 'I do not care if the guy is yellow or black, or if he has stripes like a fuckin' zebra. I'm the manager of this team, and I say he plays.' 1969 Cubs collapsed from 9½ game lead, losing to Miracle Mets. Gashouse Gang shortstop. Pool hustler. Four marriages. 'Nice guys finish last.' 95 ejections. The most theatrical manager in baseball history.",
  },

  ilb_ratings: {
    tac: 4,  // High. Durocher was a shrewd tactical manager — not innovative like Huggins, but sharp and aggressive. Used platoons, employed psychological warfare, made bold in-game moves. The 1954 WS sweep of the 111-win Indians required brilliant tactical play.
    pit: 4,  // High. Managed excellent pitching staffs across multiple teams. Knew when to pull pitchers. But pitching wasn't his signature — aggression was.
    lin: 4,  // High. Excellent at constructing lineups around available talent. The 1951 Giants had a balanced attack. The 1941 Dodgers were well-constructed. Durocher knew how to build a batting order.
    adp: 4,  // High. Managed across 4 decades (1939-1973) and 4 teams. Adapted from Gashouse Gang era to integration to expansion. But his combative personality eventually wore out everywhere, limiting maximum adaptation.

    dis: 9,  // Very high. Durocher demanded total effort and compliance. He was tyrannical but effective — players feared and respected him. 95 ejections show he didn't just discipline players — he disciplined the entire game. But not McCarthy's 10 because Durocher's own behavior violated every standard he imposed.
    ego: 6,  // Moderate. Durocher managed big egos through force of personality. He handled Robinson, Mays, Ernie Banks. But he also created ego conflicts — his personality was so dominant that it clashed with strong personalities. He managed egos through domination, not diplomacy.
    har: 3,  // Low. "Nice guys finish last." Durocher didn't care about harmony — he cared about winning. His teams were tense, combative, and often internally divided. But they won. The low harmony was a feature, not a bug: tension created performance.
    int: 9,  // Very high. Durocher's intensity was legendary and theatrical. 95 ejections. Toe-to-toe with umpires. Kicking dirt. Screaming. But also: the intensity of a man who cared about winning more than anything. The Lip was always on.
    str: 6,  // Moderate-high. Durocher developed some players well (Willie Mays especially — he protected the young Mays when he started 0-for-12). But his combative style also damaged players. His greatest gift was identifying talent and extracting maximum performance through pressure.
    flx: 5,  // Moderate. Durocher adapted across decades but his essential personality never changed. The combativeness that worked in the 1940s became counterproductive in the 1970s. The 1969 Cubs collapse was partly Durocher's refusal to rest his players — the same stubbornness that won in 1951.

    ovr: 11, // Legend tier. 2,008 wins, 3 pennants, 1 WS, the Shot Heard Round the World, the 1954 sweep, Jackie Robinson's defender. The cultural impact alone (Bartlett's Quotations, "nice guys finish last") plus the winning record earn Legend. Not Mythic because only 1 WS title and the 1969 collapse.
  },

  rating_justification: {
    tac: "High. Durocher was tactically sharp and aggressive. He employed platoons, used psychological warfare (beanballs, bench jockeying), and made bold in-game decisions. The 1954 World Series sweep of the 111-43 Indians required brilliant tactical management — including ordering the Mays catch and the subsequent squeeze plays. Not revolutionary, but relentlessly effective. Rating of 4.",
    pit: "High. Durocher managed excellent pitching staffs: the 1941 Dodgers, the 1951 Giants (Sal Maglie, Larry Jansen), the 1954 Giants. He knew when to pull pitchers and wasn't afraid of unconventional moves. But pitching wasn't his signature — intimidation was. Rating of 4.",
    lin: "High. Durocher was excellent at lineup construction. The 1951 Giants had a balanced attack. He understood how to build a batting order around available talent and wasn't afraid to bench veterans for hot rookies. He trusted his eye for talent over conventional wisdom. Rating of 4.",
    adp: "High. Managed across 4 decades and 4 teams. Adapted from the Depression-era Gashouse Gang through integration, the 1950s golden age, expansion, and the counterculture 1970s. But his combative personality eventually wore out welcomes everywhere — he was fired or pushed out of every job. The adaptation was real but ultimately limited by his nature. Rating of 4.",
    dis: "Very high. Durocher was tyrannical. His players feared him, and fear produced discipline. He demanded total effort and tolerated nothing less. The 95 ejections show a man who imposed his will on the entire game — not just his players but the umpires and opponents. But not McCarthy's perfect 10 because Durocher himself was the least disciplined man in baseball — gamblers, actresses, suspensions. He demanded rules he didn't follow. Rating of 9.",
    ego: "Moderate. Durocher managed through force of personality — his ego was so large it dominated every room. This worked with some players (he protected young Willie Mays, handled Robinson) but created friction with others. He couldn't share the spotlight. His ego management was: MY ego is bigger than yours, so submit. Effective but limited. Rating of 6.",
    har: "Low. 'Nice guys finish last.' Durocher deliberately cultivated tension because he believed tension produced wins. His clubhouses were combative, his relationships adversarial. He jumped from Dodgers to Giants — the ultimate anti-harmony move. But the low harmony was strategic: Durocher's teams played angry, and angry teams sometimes play great. Rating of 3.",
    int: "Very high. Durocher's intensity was theatrical and relentless. 95 ejections. He was always performing — for his players, for the umpires, for the crowd. The Lip was a stage name, and every game was a performance. But the intensity was also genuine: Durocher cared about winning with pathological depth. The theater was real because the passion was real. Rating of 9.",
    str: "Moderate-high. Durocher's greatest player development achievement was Willie Mays. When Mays started 0-for-12 and wanted to quit, Durocher told him: 'You're my center fielder.' That protection and confidence allowed Mays to become the greatest all-around player in history. But Durocher also ground down players — the 1969 Cubs collapsed partly because he refused to rest them. He built up some players and burned out others. Rating of 6.",
    flx: "Moderate. Durocher managed across four decades, adapting to very different baseball eras. But his essential personality — combative, theatrical, dominating — never changed. What worked in 1941 worked less well in 1969. The 1969 Cubs collapse was partly a failure of adaptation: Durocher managed a modern team like a wartime team. He was the same man in every era — sometimes that was enough, sometimes it wasn't. Rating of 5.",
  },

  personality: {
    leadership_style: "Theatrical domination through force of personality. Durocher led by being the loudest, most aggressive, most intense presence on the field. He wasn't just the manager — he was the show. The 95 ejections weren't failures of temperament; they were strategic performances designed to fire up his team and intimidate opponents. 'As long as I've got a chance to beat you, I'm going to take it.' The leadership was combat: every game was a war, and Durocher was always the general standing at the front.",
    temperament: "Volcanic, theatrical, and calculating. Durocher's temper was real but also weaponized. He knew when to explode and when to whisper. The pool hustler's instinct: read the room, identify the weakness, exploit it. Factory kid from Springfield who slapped a teacher and never went back to school. French-Canadian railroad worker's son who learned to fight before he learned to read the box scores. The temperament of a man who'd been fighting his whole life and found a profession that rewarded fighting.",
    work_ethic: "Relentless and totalizing. Durocher's work ethic for WINNING was supreme. He studied opponents, planned strategy, worked the phones. But his work ethic for EVERYTHING ELSE was zero: his personal life was a disaster of gambling, affairs, suspensions, and divorces. Four marriages. Friends with mobsters. Suspended for a full season. The work ethic was narrow and absolute: win the game, and nothing else matters.",
    lifestyle: "Glamorous, reckless, and intoxicating. Pool hustler. Gambler. Friends with Bugsy Siegel and George Raft. Married actress Laraine Day. Four marriages total. Suspended from baseball for a year. Celebrity friends, Hollywood parties, the high life. Durocher lived like a movie star because he thought of himself as one. The factory kid from Springfield became the most famous manager in America — and spent money like fame was infinite.",
    communication_style: "The Lip. Durocher talked constantly, loudly, and with maximum impact. He argued with umpires (95 ejections). He baited opponents from the bench (legendary bench jockey). He gave locker room speeches that were part sermon, part profanity, part psychology. He communicated through volume and confrontation — but also through genuine moments of tenderness (protecting young Mays). The Lip had one volume: maximum. But occasionally, it dropped to a whisper, and the whisper was devastating.",
    loyalty_expectations: "Total commitment to winning. Nothing else. Durocher didn't care about your personality, your background, your race ('stripes like a zebra'), your religion, or your feelings. He cared about whether you could help him win. If you could: you played. If you couldn't: you were gone. The loyalty was to victory, not to people — which made him both progressive (Robinson) and ruthless (everyone else).",
    dark_side: "The 1969 collapse and the cost of never changing. The 1969 Cubs held a 9½ game lead in August. Durocher refused to rest his players in the Chicago summer heat. The team collapsed. The Miracle Mets won. It was Durocher's greatest failure — and it was caused by his greatest strength. The same relentless intensity that won in 1951 destroyed in 1969. The Lip couldn't stop being The Lip, even when The Lip was wrong. In ILB: Durocher carries 'The Collapse' — his intensity provides a huge bonus when chasing, but a devastating penalty when leading. The hunter becomes the hunted.",
  },

  playbook: {
    roster_philosophy: "Get players who want to fight, and fight with them. Durocher built teams around aggression, talent, and hunger. He preferred scrappy, combative players who mirrored his own personality — but he also recognized and protected transcendent talent (Mays, Robinson). The roster was a weapon, and Durocher wielded it with maximum violence.",
    conflict_response: "ESCALATE AND DOMINATE. Durocher didn't resolve conflict — he won it. Every disagreement was a battle, and Durocher fought to win every battle. With umpires: screaming matches (95 ejections). With owners: power struggles. With players: my way or out. With opponents: beanballs and bench jockeying. Conflict wasn't a problem — it was the natural state of Durocher's world.",
    clique_strategy: "UNITE AGAINST THE ENEMY. Durocher's teams bonded through shared combativeness. The enemy was always external: the other team, the umpires, the league, the world. Internal cliques were dissolved by external war. When you're fighting everyone else, you don't have time to fight each other.",
    player_types_that_thrive: [
      "Aggressive competitors who mirror Durocher's intensity — the Gashouse Gang mentality",
      "Young, scared talents who need protection — Durocher shielded Mays, believed in Robinson",
      "Players who respond to fear — Durocher's authority is absolute and terrifying",
      "Players who need a stage — Durocher's theatrics make every game feel important",
      "Any player regardless of race, background, or personality who can help win — 'I don't care if he has stripes like a zebra'",
    ],
    player_types_that_struggle: [
      "Nice guys — 'Nice guys finish last.' Durocher had contempt for passivity",
      "Players who need rest or careful management — the 1969 Cubs collapse proves he'll run you into the ground",
      "Players who need emotional stability — Durocher's volatility creates chaos",
      "Veterans who resist authority — Durocher's ego can't coexist with challenges to his authority",
      "Quiet, introverted players who need space — The Lip fills every room with noise",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 2,
      max_volatility: "HIGH — Durocher thrives in volatility. He IS volatility. But there's a ceiling: too much chaos even for The Lip.",
      discipline_floor: "HIGH through fear and domination. Not through systems (McCarthy) or morals (McKechnie) — through the pure force of Durocher's personality.",
      star_exception: "Stars play if they produce. Durocher backed Robinson when no one else would. He protected Mays when Mays wanted to quit. But stars who challenge Durocher's authority are gone — no exceptions.",
    },
  },

  chemistry_impact: {
    team_fit: { effect: "VOLATILE", desc: "+2 Team Fit when winning (war bonds the unit), -3 Team Fit when losing (Durocher's intensity becomes poison). The fit is conditional on success." },
    volatility: { effect: "MASSIVELY INCREASED", desc: "+3 Volatility for all players. Durocher is chaos. 95 ejections. The Lip is always talking, always fighting, always escalating. Every day is a crisis." },
    discipline: { effect: "STRONGLY INCREASED", desc: "+2 Discipline. Through fear and domination. Durocher's players play hard because the alternative is Durocher's rage. But the discipline is fragile — it breaks when Durocher loses credibility." },
    ego: { effect: "DOMINATED", desc: "-2 Ego for all players (suppressed by Durocher's overwhelming presence). But +2 Ego for Durocher himself. The room has one ego, and it's The Lip's." },
    work_habits: { effect: "STRONGLY INCREASED", desc: "+2 Work Habits. Durocher's relentless intensity is contagious. His teams play harder than anyone — sometimes too hard. The 1969 Cubs worked themselves into exhaustion." },
    adaptability: { effect: "DECREASED", desc: "-1 Adaptability. Durocher's way is the only way. Players adapt to HIM, not the other way around." },
  },

  chemistry_traits: [
    { tag: "Nice Guys Finish Last", desc: "Passive players lose -2 to all stats under Durocher. Aggressive players gain +1 to all stats. The Lip rewards combativeness and punishes softness. The phrase entered Bartlett's Quotations. It entered the game too." },
    { tag: "The Lip", desc: "Durocher argues with umpires once per game (guaranteed). 20% chance of ejection. If ejected: team gains +1 INT for remainder (fired up by the spectacle). If NOT ejected: +1 TAC (Durocher stayed to manage)." },
    { tag: "The Suspension", desc: "10% chance per season of Durocher being suspended for 'accumulation of unpleasant incidents.' If suspended: team plays without manager for 1-5 games. 30% chance the team wins the pennant anyway (it happened in 1947)." },
    { tag: "I Say He Plays", desc: "Durocher ignores racial, social, and personality prejudices entirely. Players from any background gain +1 Team Fit. Players who are discriminated against by teammates gain +2 under Durocher — he will protect them. 'I don't care if he has stripes like a zebra.'" },
    { tag: "The Shot Heard Round the World", desc: "When trailing by 5+ games with 20 games remaining, Durocher's team gains +2 to all stats. The 13½ game comeback lives as a mechanic: Durocher is BETTER when chasing. The hunter, not the hunted." },
    { tag: "The 1969 Collapse", desc: "When leading by 5+ games with 20 games remaining, all players lose -1 to all stats from fatigue. Durocher refuses to rest anyone. The same intensity that fuels comebacks causes collapses. The hunter can't become the guardian." },
    { tag: "The Pool Hustler", desc: "Durocher reads opponents perfectly. All opposing manager Tactics are reduced by -1 (Durocher anticipates their moves). But Durocher's gambling costs 5% chance per game of a 'distraction' — -1 all ratings that game." },
    { tag: "You're My Center Fielder", desc: "If a young player (under 5 games experience) starts 0-for-10 or worse, Durocher protects them: +2 to all stats for 5 games. 'You're my center fielder.' The tenderness behind The Lip. Mays became Mays because Durocher believed." },
  ],

  preferred_locations: [
    { location: "Home Plate / Umpire's Face", affinity: "MAXIMUM", note: "95 ejections. Where The Lip performed his greatest theater: toe-to-toe, dirt-kicking, vein-bulging arguments with umpires. Every ejection was a show." },
    { location: "Polo Grounds / New York", affinity: "HIGH", note: "Where the 1951 comeback and 1954 sweep happened. Durocher's greatest moments were at the Polo Grounds." },
    { location: "Ebbets Field / Brooklyn", affinity: "HIGH", note: "Where Durocher began his managerial career. Where he defended Robinson. Where he committed treason by leaving for the Giants." },
    { location: "Hollywood / Beverly Hills", affinity: "HIGH", note: "Married Laraine Day. Friends with actors and mobsters. Durocher lived like a movie star because the factory kid decided he deserved to." },
    { location: "Pool Hall", affinity: "HIGH", note: "Where Durocher learned to read people, hustle, and dominate. The pool table was his first dugout." },
    { location: "Commissioner's Office", affinity: "LOW", note: "Suspended for the entire 1947 season. Called in repeatedly. The Commissioner's office was where The Lip went to get punished." },
  ],

  momentum: {
    hot_triggers: [
      "Chasing a lead — the 1951 Giants erased 13½ games. Durocher is a hunter, not a guardian",
      "Theatrical moments — ejections, confrontations, big-stage games energize the entire team",
      "Defending an underdog — Durocher backed Robinson, protected Mays. He fights hardest for the vulnerable",
      "Rivalry games — Dodgers vs Giants, any bitter rivalry. Durocher feeds on hatred",
    ],
    cold_triggers: [
      "Protecting a lead — the 1969 Cubs collapsed from 9½ games up. Durocher can't coast",
      "August/September fatigue — refuses to rest players, grinds them into dust",
      "Off-field scandals — suspensions, gambling, personal chaos. The Lip can't stop generating controversy",
      "Late career — same personality, diminishing returns. What thrilled in 1941 exhausted in 1972",
    ],
    pressure_response: "EXTRAORDINARY WHEN CHASING, CATASTROPHIC WHEN LEADING. The 1951 13½ game comeback is the greatest pressure performance in baseball history. The 1954 WS sweep of the 111-win Indians is the greatest upset. But the 1969 Cubs collapse is the greatest choke. In ILB: Durocher provides +3 Clutch when trailing, -2 Clutch when leading by a significant margin. The Lip is the greatest hunter and the worst guardian in baseball history.",
  },

  action_card_seeds: [
    {
      title: "Nice Guys Finish Last",
      type: "Action",
      text: "Your manager declares war on passivity. All aggressive players gain +2 to all stats for 10 games. All passive players lose -1. Nice guys are benched. Mean guys are unleashed. 'The nice guys are all over there, in seventh place.'",
      origin: "July 6, 1946: Durocher, looking at the last-place Giants, told reporters that all their nice guys were in seventh place. The quote was condensed, immortalized in Bartlett's, and became the most famous sentence in baseball history.",
    },
    {
      title: "The Shot Heard Round the World",
      type: "Game Action",
      text: "Your team trails by 10+ games. Your manager refuses to quit. All players gain +3 to all stats for the final stretch. If you win: +5 morale permanently. The impossible comeback. The pennant on one swing.",
      origin: "August 11, 1951: the Giants trailed the Dodgers by 13½ games. They went 37-7 to force a playoff. Bobby Thomson's home run in the 9th inning of Game 3 won the pennant. Durocher's never-say-die leadership made it possible.",
    },
    {
      title: "I Say He Plays",
      type: "Action",
      text: "Your manager defends a player that others want to exclude. That player gains +3 to all stats permanently. The team gains +2 Team Fit. Durocher didn't care about color, background, or popularity. He cared about winning.",
      origin: "'I do not care if the guy is yellow or black, or if he has stripes like a fuckin' zebra. I'm the manager of this team, and I say he plays. What's more, I say he can make us all rich.' Durocher defending Jackie Robinson, 1947.",
    },
    {
      title: "The Suspension",
      type: "Drama",
      text: "Your manager is suspended for 'accumulation of unpleasant incidents.' He's gone for 5 games. 30% chance the team wins the pennant without him. If they do: the irony is permanent (+1 Team Fit — they proved they could survive anything).",
      origin: "1947: Commissioner Chandler suspended Durocher for the entire season. The Dodgers won the pennant under Burt Shotton. The irony consumed Durocher. The team he built won without the man who built it.",
    },
    {
      title: "The 1969 Collapse",
      type: "Drama",
      text: "Your team leads by 8+ games in August. Your manager refuses to rest anyone. All players gain 'Fatigue' — -1 to all stats, cumulative. If the lead disappears: -3 morale permanently. The greatest failure of intensity.",
      origin: "August 1969: Durocher's Cubs led by 9½ games. He refused to rest his regulars in the Chicago heat. They collapsed. The Miracle Mets won. Durocher's relentless intensity, his greatest asset, became his greatest liability.",
    },
    {
      title: "You're My Center Fielder",
      type: "Action",
      text: "A young player wants to quit after a terrible start. Your manager tells him: 'You're my center fielder.' The player gains +3 to all stats permanently and can never develop 'Quit' status. Behind The Lip: genuine tenderness.",
      origin: "1951: Willie Mays started 0-for-12 and went to Durocher's office crying, asking to be sent down. Durocher told him: 'You're my center fielder.' Mays became the greatest all-around player in baseball history. Because Durocher believed.",
    },
  ],

  art_direction: {
    face: "Sharp, angular, electric. 5'10\" 160 lbs — wiry, intense, coiled. The face of a pool hustler who became a general: narrow eyes that miss nothing, a jaw always moving (The Lip is always talking), high cheekbones, slicked-back dark hair. The smile is dangerous — it means he's about to say something devastating. Not handsome in a Hollywood way but magnetic in a way that drew Hollywood to him. Four wives. Bugsy Siegel's friend. The most charismatic dangerous man in baseball.",
    attire: "New York Giants uniform from the early 1950s — the moment of maximum glory. Or: the split image — Dodgers blue on one side, Giants orange on the other. The betrayal visualized. Durocher should be in motion: pointing, arguing, gesticulating. He was never still. Even in a portrait, The Lip should look like he's about to leap out of the frame and argue with the viewer.",
    mood: "Electrical storm. Not the cold of McCarthy or the warmth of McKechnie — pure electricity. The card should crackle. There's danger and excitement and menace and charisma all at once. The mood is Saturday night in a pool hall: anything could happen, and the most dangerous man in the room is smiling at you. Dramatic lighting — high contrast, sharp shadows. The Lip emerging from darkness.",
    style: "Red Authoritarian palette but more theatrical than McGraw or McCarthy — this is showbiz authority, not military authority. Polo Grounds in the background, dramatic night-game lighting. The card should feel like a movie poster from the 1950s: bold, dramatic, slightly dangerous. Gold and red accents. The border should feel like a stage frame — because Durocher was always performing.",
    reference: "The Authoritarian Spectrum: McGraw (1900) rules through volcanic fear. Jennings (1910) rules through joyful energy. McCarthy (1920) rules through cold systems. Durocher (1930) rules through theatrical domination. Four different kinds of authority across four eras: fear → energy → systems → performance. Durocher is the first Authoritarian who is also an entertainer. His authority comes not from being right (McCarthy) or being feared (McGraw) but from being the most compelling person in any room. The Lip as leading man.",
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
  archRed: "#e05555", archDark: "#8a2020",
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
  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: `${C.archRed}15`, border: `1px solid ${C.archRed}30`, color: C.archRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</span>
);

export default function LeoDurocherCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("playbook");
  const d = MANAGER_DATA;
  const r = d.ilb_ratings;
  const archColor = C.archetypes[d.archetype] || C.archRed;

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
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, #2a0a0a 0%, #3a1a1a 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.12 }}>👄</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>AUTHORITARIAN</div>
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
              <ClubhouseBar label="DISCPLN" value={r.dis} color={archColor} />
              <ClubhouseBar label="EGO MGT" value={r.ego} color={C.warmRed} />
              <ClubhouseBar label="HARMONY" value={r.har} color={C.traitGreen} />
              <ClubhouseBar label="INTSITY" value={r.int} color={"#e8a030"} />
              <ClubhouseBar label="STRATGY" value={r.str} color={"#5588cc"} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={"#b070cc"} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "WS WINS", val: d.record.world_series },
                { label: "EJECTS", val: "95" },
                { label: "SUSPEND", val: "1 yr" },
                { label: "WIVES", val: "4" },
                { label: "INT", val: "9 🔥" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>NICE GUYS FINISH LAST — BARTLETT'S QUOTATIONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ HOF 1994", "🏆 1954 WS Sweep", "💥 Shot Heard '51", "👄 'The Lip' — 95 Ejects", "🚫 Suspended 1947", "✊ Defended Robinson", "📉 1969 Collapse", "🎬 Married Actress"].map((a, i) => (
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
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("MASSIVELY") || effect.includes("VOLATILE") || effect.includes("DECREASED") ? `${C.warmRed}20` : effect.includes("STRONGLY") || effect.includes("DOMINATED") ? `${C.traitGreen}20` : `${C.gold}20`, color: effect.includes("MASSIVELY") || effect.includes("VOLATILE") || effect.includes("DECREASED") ? C.warmRed : effect.includes("STRONGLY") || effect.includes("DOMINATED") ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Durocher's real life, become universal cards playable in any game.</p>
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
