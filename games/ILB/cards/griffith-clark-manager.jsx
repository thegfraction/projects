import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: CLARK GRIFFITH
// Era: 1900 · Archetype: Opportunist
// "The Old Fox" — Pitcher, Manager, Owner, Founder
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Clark Griffith",
  nickname: "The Old Fox",
  year: 1901,
  team: "Chicago White Sox",
  era: "1900s",
  ilb_team: "Banners",
  archetype: "Opportunist",
  born: "November 20, 1869 — Clear Creek, MO",
  died: "October 27, 1955 — Washington, DC (age 85)",
  hof: "Inducted 1946. Life in baseball spanned 70 years: pitcher, manager, owner, league founder.",
  height: '5\'6"',
  weight: "156 lbs",

  record: {
    career_wins: 1491,
    career_losses: 1367,
    win_pct: ".522",
    pennants: 1,
    world_series: 0,
    seasons_managed: 20,
    ejections: "Moderate — cagey, not volcanic",
    peak_team: "1901 Chicago White Sox",
    peak_record: "83-53 (.610) — first AL pennant ever",
    teams_managed: ["Chicago White Sox (1901-02)", "New York Highlanders (1903-08)", "Cincinnati Reds (1909-11)", "Washington Senators (1912-20)"],
    notable: "Won first-ever AL pennant (1901) while going 24-7 as pitcher. Recruited 39 of 40 targeted NL stars for AL. Managed 4 franchises. As owner: built 'cheapest championship team of all-time' (1924 WS). Pioneered Cuban player pipeline — 35 Cuban players under his watch.",
    pitching_record: "237-146, .619 W-L% as pitcher. 6 consecutive 20-win seasons (1894-1899).",
    owner_pennants: "3 pennants as owner (1924, 1925, 1933). 1 World Series (1924).",
  },

  ilb_ratings: {
    // Game Management (1-5)
    tac: 3,  // Cunning but not innovative. "The Old Fox" — crafty, not revolutionary. Won through guile, not systems.
    pit: 4,  // Elite pitcher himself (237 wins). Understood pitching deeply. Had Walter Johnson as owner. Managed pitching staffs well.
    lin: 3,  // Adequate lineup construction. His genius was acquiring players, not optimizing their arrangement.
    adp: 5,  // Maximum. Managed 4 franchises across 2 leagues over 20 years. Jumped from NL to AL. Transitioned from pitcher to manager to owner. The ultimate adapter.

    // Clubhouse Management (1-10)
    dis: 5,  // Moderate. Not a disciplinarian — a dealmaker. Rules mattered less than results.
    ego: 6,  // Good handler of personalities. Goose Goslin: "He was more than a father to me." But traded his niece's husband (Cronin) without sentiment.
    har: 6,  // Functional harmony. Not a team-builder like Hanlon — more of a family patriarch. Raised 7 orphaned nieces/nephews.
    int: 5,  // Moderate fire. Born in a log cabin, performed in Wild West shows, mortgaged his ranch twice. Resilient, not volcanic.
    str: 8,  // Elite dealmaker. Recruited 39/40 targeted NL stars. Built cheapest championship team ever. Cuban pipeline. Shoestring budget genius.
    flx: 9,  // Near-maximum. Managed in 4 cities, 2 leagues, across 3 decades. Transitioned from player to manager to owner seamlessly. Survived everything.

    ovr: 9,  // Elite tier. Not a legendary on-field manager, but the total package — player, manager, owner, founder — is unmatched. 70 years in baseball.
  },

  rating_justification: {
    tac: "Crafty, not systematic. His pitching career was built on guile: 'cagier, a more crafty, if not a more brainy, proposition' than Mathewson. He brought that deception to managing — tricks and timing, not grand strategy. Won the 1901 pennant through shrewd moves, not tactical innovation. Rating of 3.",
    pit: "237 wins as a pitcher with 6 consecutive 20-win seasons. He understood pitching at an elite level. As Senators owner, he had Walter Johnson — the greatest pitcher alive. He managed pitching staffs instinctively, from his own experience on the mound. Rating of 4.",
    lin: "Adequate. Griffith's genius was acquiring talent, not arranging it. His lineups were functional but not innovative. No evidence of platoon innovation or lineup optimization. He found the right players and let them play. Rating of 3.",
    adp: "Maximum. This is Griffith's signature stat. Managed FOUR franchises (White Sox, Highlanders, Reds, Senators) across TWO leagues over 20 years. Jumped from NL pitcher to AL player-manager. Transitioned from managing to owning. Performed in Wild West shows when baseball didn't pay. Mortgaged his ranch — twice. The man adapted to everything. Rating of 5.",
    dis: "Moderate. Griffith wasn't a disciplinarian — he was a pragmatist. Rules served his purposes. He played favorites when it suited him (hiring his nephews, marrying his niece to his star player) but also traded family members when the deal was right (Cronin to Boston). Discipline was transactional. Rating of 5.",
    ego: "Good. Goslin called him 'more than a father.' He raised 7 orphaned nieces and nephews and employed them all. He built personal loyalty. But he also traded Joe Cronin — his own niece's husband — to the Red Sox without sentiment. Ego management through a mix of warmth and cold calculation. Rating of 6.",
    har: "Functional. Griffith created a family atmosphere — literally hiring family. The Senators were 'the family business.' But it was patriarch harmony, not democratic harmony. He was the boss, and everyone knew it. Rating of 6.",
    int: "Moderate but resilient. Born in a log cabin. Father killed in a hunting accident when Clark was a child. Performed in Wild West shows in San Francisco's Barbary Coast. Mortgaged his Montana ranch twice. Survived near-breakdown from overwork. His intensity was endurance, not explosion. Rating of 5.",
    str: "Elite dealmaker. Single-handedly recruited 39 of 40 targeted NL stars for the American League ('all but Honus Wagner'). Built the 'cheapest championship team of all-time' per the NYT. Created the Cuban player pipeline — 35 Cuban players over 44 years. Ran a profitable franchise on a shoestring for 21 consecutive years. Rating of 8.",
    flx: "Near-maximum. Managed in Chicago, New York, Cincinnati, and Washington. Played in the NL, jumped to the AL, went back to the NL, returned to the AL. Transitioned from pitcher (237 wins) to player-manager to full-time manager to owner. Even umpired 5 games. Nobody in baseball history wore more hats. Rating of 9.",
  },

  personality: {
    leadership_style: "Patriarch-opportunist. Griffith led through a combination of fatherly warmth and cold calculation. He'd mortgage his ranch for you today and trade you tomorrow. 'He wasn't like a boss, more like a father' — but a father who'd sell the family cow if the price was right. His leadership was personal, transactional, and surprisingly effective across 70 years.",
    temperament: "Shrewd and resilient. 'The Old Fox' — the nickname says everything. Not hot-tempered, not cold — calculating. When things went wrong in New York, he resigned and blamed 'fate' rather than rage-quitting. When tuberculosis-era baseball economics squeezed him, he hosted football games and Negro League games at his stadium. Always another angle, always another move.",
    work_ethic: "Relentless survivor. Log cabin to Wild West shows to pitching mound to manager's chair to owner's box. Every phase required reinvention. He worked himself to near-breakdown in 1907 New York. He mortgaged his Montana ranch twice to buy into the Senators. The work ethic was survival-driven — not obsessive like Selee, but desperate and indefatigable.",
    lifestyle: "Pioneer family origins. Born in a covered wagon (nearly — his family was heading to Oklahoma Territory). Father killed by hunters. Raised in Bloomington, Illinois. Married Anne Robertson in 1900. Raised 7 orphaned nieces and nephews as his own. Lived in Washington DC for 44 years as baseball's equivalent of a senator. Befriended presidents — literally forgot Calvin Coolidge was his guest during the 1924 World Series.",
    communication_style: "Folksy cunning. Griffith could talk anyone into anything. He recruited 39 of 40 targeted NL players through personal persuasion. He charmed presidents and Cuban scouts alike. His communication was warm, personal, and always strategic. Every conversation had an agenda, but it didn't feel that way.",
    loyalty_expectations: "Family loyalty — with an asterisk. Griffith hired his nephews, married his niece to his star player, and treated the Senators as a family business. But he traded Cronin to Boston when the price was right. Loyalty was expected but not unconditional. The family came first, but the family was the business.",
    dark_side: "The thrift. Griffith was famously cheap — he ran the Senators on a shoestring, refused to install lights for night games, and penny-pinched his way through decades. His teams were profitable but rarely championship-caliber after the 1920s. He exploited Cuban players who had fewer options. His family business model meant nepotism and control. In ILB: Griffith carries 'Penny-Wise' — he saves money but sometimes loses championships because of it.",
  },

  playbook: {
    roster_philosophy: "Find value where nobody's looking. Griffith's entire career was built on arbitrage — finding undervalued players, jumping to leagues where the talent was cheaper, exploiting pipelines (Cuba) that others ignored. He built the 'cheapest championship team of all-time' because he understood that talent doesn't always cost what the market says. Shoestring genius.",
    conflict_response: "EXPLOIT. Griffith didn't suppress conflict or mediate it — he used it. When the NL and AL were at war, he recruited NL stars. When his team was struggling, he resigned and found a better opportunity. When family and business collided, he made the trade that served the business. Conflict was opportunity.",
    clique_strategy: "TOLERATE. Griffith's teams were loosely managed. He created a family atmosphere but didn't require deep bonding. Players worked for the patriarch, respected the patriarch, and went home. Cliques formed and dissolved naturally — Griffith didn't manage them, he managed around them.",
    player_types_that_thrive: [
      "Undervalued players — Griffith finds diamonds others miss",
      "Cuban and Latin American players — Griffith was the first to scout the Caribbean systematically",
      "Young players willing to play cheap — Griffith trusted youth over experience when budget demanded",
      "Crafty, guile-over-power types — reflecting Griffith's own pitching philosophy",
      "Family-oriented players who respond to a paternal management style",
    ],
    player_types_that_struggle: [
      "Expensive superstars who demand top dollar — Griffith won't overpay",
      "Players who need cutting-edge facilities or resources — Griffith runs lean",
      "Night-game specialists — Griffith hated lights (as owner, he resisted them for decades)",
      "Players who need a structured tactical system — Griffith manages by instinct",
      "Loners who don't respond to the 'family' dynamic",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 4,
      max_volatility: "MODERATE — Griffith prefers calm, professional players but can handle some heat",
      discipline_floor: "MODERATE — professionalism expected, but Griffith's real red line is cost, not behavior",
      star_exception: "Stars are welcome if affordable. When they get expensive, they get traded — even if they're family.",
    },
  },

  chemistry_impact: {
    team_fit: { effect: "MODERATE", desc: "Griffith creates a family atmosphere but it's centered on him, not the team. +1 Team Fit when 2+ players have been signed or traded by Griffith." },
    volatility: { effect: "SLIGHTLY REDUCED", desc: "Griffith's calm, calculating presence dampens volatility. -1 Volatility for all players. The Old Fox doesn't panic." },
    discipline: { effect: "STABLE", desc: "Neither strongly enforced nor neglected. Griffith expects professionalism but won't police behavior. Discipline stays at current levels." },
    ego: { effect: "MODERATE TOLERANCE", desc: "Griffith handles egos through the patriarch model — respect the boss and you'll be taken care of. But don't expect to be the center of attention." },
    work_habits: { effect: "INCREASED", desc: "Griffith worked his way up from a log cabin. Players who see his story tend to work harder. +1 Work Habits for players in their first 5 games under Griffith." },
    adaptability: { effect: "STRONGLY INCREASED", desc: "Griffith's entire career was adaptation. +2 Adaptability for all players. His teams transition between eras and situations better than anyone's." },
  },

  chemistry_traits: [
    { tag: "The Old Fox", desc: "Griffith survives everything. Once per game, when a negative event occurs (ejection, injury, error), Griffith can nullify it. Cunning trumps catastrophe." },
    { tag: "League Founder", desc: "Griffith helped create the American League. When playing in AL-era squares, all players gain +1 to their highest stat. He built this world." },
    { tag: "The Recruiter", desc: "Griffith signed 39 of 40 targeted NL stars. Once per series, Griffith can poach any one Free Agent at no cost. 'All but Honus Wagner.'" },
    { tag: "Cuban Pipeline", desc: "Griffith pioneered Latin American scouting. Cuban and Latin players gain +2 Team Fit under Griffith. +1 to any stat for Latin players in their first 5 games." },
    { tag: "Shoestring Championship", desc: "Built the 'cheapest championship team of all-time.' When your total roster value is below the game median, +1 to all stats. Poverty is a weapon." },
    { tag: "Wild West Show", desc: "Griffith performed in Wild West shows when baseball didn't pay. +1 Adaptability for all players. Your team can survive anything — including being broke." },
    { tag: "Penny-Wise", desc: "Griffith's thrift is both strength and weakness. All trades under Griffith yield +1 value. But after 15 games, one random player demands a raise — if unpaid, -2 morale." },
    { tag: "The Patriarch", desc: "Griffith raised 7 orphans and ran the Senators as a family. +1 Harmony when 2+ players share a 'Family' or 'Loyal' trait. But if a key player is traded, -2 Team Fit." },
  ],

  preferred_locations: [
    { location: "Owner's Box / Front Office", affinity: "HIGH", note: "Where Griffith truly thrived — deals, scouting, the business of baseball. His natural habitat." },
    { location: "Washington DC / Political Circles", affinity: "HIGH", note: "Befriended presidents. 'Forgot Calvin Coolidge was my guest' at the 1924 World Series. Baseball patriarch of the capital." },
    { location: "Cuba / Latin America", affinity: "HIGH", note: "Pioneered the Cuban pipeline. 35 Cuban players over 44 years. Saw talent where others saw foreigners." },
    { location: "Hotel Lobby / Recruitment Meeting", affinity: "HIGH", note: "Where Griffith signed 39 of 40 NL stars for the AL. Every meeting was an opportunity to make a deal." },
    { location: "Montana Ranch", affinity: "MEDIUM", note: "Mortgaged it twice to buy into baseball. The ranch was his backup plan — and his collateral." },
    { location: "Practice Field", affinity: "MEDIUM", note: "Former 237-game winner. Understood the mechanics of pitching. Could still teach, but preferred to deal." },
    { location: "Wild West Show / Barbary Coast", affinity: "LOW", note: "Performed in variety shows in San Francisco's red-light district when baseball didn't pay. Survival mode." },
  ],

  momentum: {
    hot_triggers: [
      "New opportunity — Griffith thrived when given a fresh franchise or a new challenge",
      "Underdog situation — the 'cheapest championship team' mentality fueled him",
      "Pennant race — 'I was so all-fired excited I forgot Calvin Coolidge was my guest'",
      "Player acquisition — his energy peaked when recruiting and dealing",
    ],
    cold_triggers: [
      "Budget constraints preventing moves — when thrift became a cage, not a weapon",
      "Extended losing without hope of reinforcement — stuck with what he had",
      "Franchise instability — his 1908 resignation was born from frustration, not rage",
      "Aging roster — Griffith's penny-pinching meant he sometimes held on too long",
    ],
    pressure_response: "CRAFTY AND UNEVEN. Won the first-ever AL pennant (1901) in the league's inaugural season — but as manager, that was his only flag. As owner, the 1924 World Series victory was his greatest moment. He was better at building teams than driving them in the clutch. In ILB: Griffith provides +1 Adaptability in all situations, but no pressure bonus. His teams survive — they don't always triumph. The Old Fox escapes traps; he doesn't always conquer kingdoms.",
  },

  action_card_seeds: [
    {
      title: "The Great Raid",
      type: "Trade",
      text: "Your manager raids the opposing league for talent. Take 2 players from any other era's Free Agent pool and add them to your roster at no cost. But one of your current players must be released to make room. The fox raids the henhouse.",
      origin: "Griffith single-handedly recruited 39 of 40 targeted NL stars for the new American League. He was the engine that made the AL viable. Only Honus Wagner refused.",
    },
    {
      title: "Mortgage the Ranch",
      type: "Action",
      text: "Your manager bets everything on a bold move. Sacrifice 2 points from any single stat across your roster to gain +3 to any other stat across your roster. The fox risks the farm — literally.",
      origin: "Griffith mortgaged his Montana ranch to buy a stake in the Washington Senators. He mortgaged it again to buy a controlling interest. Both times, the gamble paid off.",
    },
    {
      title: "The Cuban Connection",
      type: "Trade",
      text: "Your manager discovers an untapped talent pipeline. Draw 2 Free Agent Cards and choose one — that player gains +1 to their highest stat and the 'International' trait. The world is bigger than the NL and AL.",
      origin: "Griffith pioneered the Cuban player pipeline. During his 44 years in Washington, 35 Cuban players broke into the majors with the Senators. He saw talent where others saw obstacles.",
    },
    {
      title: "The Cheapest Championship",
      type: "Game Action",
      text: "Your manager builds a winner with nothing. If your total roster OVR is below the game median, all players gain +2 to their highest stat for this series. The New York Times called it 'the cheapest championship team of all-time.'",
      origin: "The 1924 Senators won the World Series with a roster built on youth, bargains, and Griffith's shoestring budget. They beat the heavily favored New York Giants in 7 games.",
    },
    {
      title: "Wild West Survival",
      type: "Action",
      text: "Your team is broke and desperate. But desperation breeds creativity. All players gain +1 Adaptability permanently. When you have nothing to lose, you can try anything.",
      origin: "When baseball didn't pay, young Griffith performed in Wild West variety shows on San Francisco's Barbary Coast. He survived by reinventing himself, over and over, for 70 years.",
    },
    {
      title: "I Forgot the President",
      type: "Drama",
      text: "Your team wins a championship and your manager is so excited he forgets protocol. +3 Intensity for the next series as the celebration continues. But a rival manager files a formal complaint — gain 1 Drama Card.",
      origin: "'Of all the 10,000 afternoons I have spent in a ball park during the last 55 years, that afternoon is my pet. I was so all-fired excited, I forgot that Calvin Coolidge was my guest.' — Griffith on the 1924 World Series.",
    },
    {
      title: "Trade the Family",
      type: "Trade",
      text: "Your manager trades his best player — even though the player is family. Trade any player on your roster for +3 value in return. But all remaining players with the 'Loyal' trait lose -1 morale. Business is business.",
      origin: "Griffith traded Joe Cronin — his own niece's husband and the team's star player — to the Red Sox in 1934. He also later sold his nephew to the Athletics. Family was the business, but the business came first.",
    },
  ],

  art_direction: {
    face: "Small, wiry, foxy face. 5'6\" 156 lbs — the smallest manager in the Banners set. Sharp, intelligent eyes with a permanent look of calculation. Thin mustache, prematurely weathered skin from years of outdoor baseball and ranch life. The face of a man who's been counting angles since he was 13 years old.",
    attire: "Split image possibility: half in a White Sox player-manager uniform (1901), half in an owner's three-piece suit (1920s). Or a single image in civilian clothes with a baseball visible in one hand and a contract in the other. The duality of player and executive, field and front office.",
    mood: "Shrewd contentment. Not fierce, not gentle — satisfied. The look of a man who just got the better end of a deal and knows it. There's warmth in the eyes (the patriarch) and sharpness in the jaw (the businessman). A fox who's eaten well and is already thinking about tomorrow's chicken coop.",
    style: "Warm sepia with purple-brown undertones — the Opportunist palette. Richer and more varied than the other cards, reflecting Griffith's many lives. Multiple cities suggested in the background — a collage of Chicago, New York, and Washington. Border should feel ornate but slightly chaotic — like a man who wore too many hats. Covered wagon motifs mixed with baseball iconography.",
    reference: "Griffith is the connector card in the 1900 Era. He bridges the NL and AL, the 19th century and the 20th, the playing field and the owner's box. His card should feel like a passport — stamps from everywhere, connections to everything. Not as imposing as McGraw, not as cerebral as Selee, not as warm as Hanlon, not as dangerous as Tebeau — but more adaptable than all of them combined.",
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
  archPurple: "#b070cc", archDark: "#6a3a8a",
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
  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: `${C.archPurple}15`, border: `1px solid ${C.archPurple}30`, color: C.archPurple, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</span>
);

export default function ClarkGriffithCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("playbook");
  const d = MANAGER_DATA;
  const r = d.ilb_ratings;
  const archColor = C.archetypes[d.archetype] || C.archPurple;

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
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${C.darkBrown} 0%, #3a2a4a 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.15 }}>🦊</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>OPPORTUNIST</div>
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
              <ClubhouseBar label="INTSITY" value={r.int} color={"#e8a030"} />
              <ClubhouseBar label="STRATGY" value={r.str} color={C.coldBlue} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={archColor} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "TEAMS", val: "4" },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "P WINS", val: "237" },
                { label: "OWN WS", val: "1924" },
                { label: "CUBANS", val: "35" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER MANAGERIAL RECORD — {d.record.seasons_managed} SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["👑 1st AL Pennant", "⭐ HOF 1946", "🦊 The Old Fox", "⚾ 237 Pitching Wins", "🏟️ 4 Franchises", "🇨🇺 Cuban Pipeline", "💰 Shoestring Genius", "🤠 Wild West Shows"].map((a, i) => (
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
                <Section title="Franchise History"><div style={{ marginBottom: 8 }}>{d.record.teams_managed.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: archColor, fontSize: 11, fontWeight: 700 }}>◆ {t}</div>))}</div></Section>
                <Section title="Tolerance Thresholds">{Object.entries(d.playbook.tolerance_thresholds).map(([key, val]) => (<div key={key} style={{ marginBottom: 4 }}><span style={{ fontWeight: 700, color: C.ink, fontSize: 10, textTransform: "uppercase" }}>{key.replace(/_/g, " ")}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{typeof val === "number" ? val : val}</span></div>))}</Section>
              </>)}
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("STRONGLY") || effect.includes("HIGH") ? `${C.traitGreen}20` : effect.includes("LOW") || effect.includes("REDUCED") ? `${C.warmRed}20` : `${C.gold}20`, color: effect.includes("STRONGLY") || effect.includes("HIGH") ? C.traitGreen : effect.includes("LOW") || effect.includes("REDUCED") ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Griffith's real life, become universal cards playable in any game.</p>
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
                <Section title="Griffith's Derivation">{Object.entries(d.rating_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
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
  teams_managed: d.record.teams_managed,
  pitching_wins: 237,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
