// /cards/players/irish-meusel.jsx
import { useState } from "react";

const MEUSEL_DATA = {
  name: "Irish Meusel",
  nickname: "The Goldfish",
  year: 1923,
  team: "New York Giants",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "LF",
  bats: "R",
  throws: "R",
  height: '5\'11"',
  weight: "178 lbs",
  born: "June 9, 1893 — Oakland, California",
  died: "March 1, 1963 — Long Beach, California (age 69). Heart attack. He was working as a security guard at the Santa Anita race track. The man who dressed better than anyone in baseball died guarding a gate.",
  hof: "NOT IN HALL OF FAME. Never seriously considered. Career: .310 BA, 106 HR, 819 RBI, 17.4 WAR in 11 seasons. Short career, low WAR, no signature accolade beyond RBI titles. But: 4 consecutive NL pennants, 2 WS rings, .276 WS BA with 17 RBI in 23 WS games. The only brothers to both lead their respective leagues in RBI — Irish NL 1923 (125), Bob AL 1925 (138). Neither brother in Cooperstown.",

  real_stats: {
    season: 1923,
    batting_avg: ".297",
    obp: ".341",
    slg: ".481",
    ops: ".822",
    hits: 177,
    doubles: 22,
    triples: 14,
    home_runs: 19,
    rbi: 125,
    runs: 102,
    stolen_bases: 8,
    strikeouts: 16,
    walks: 38,
    games: 146,
    at_bats: 595,
    war: "~2.5",
    note: "LED NL IN RBI (125). 4th NL in HR (19). 5th NL in 3B (14). Only 16 strikeouts in 595 AB — one every 37.2 AB. Third consecutive NL pennant.",
    career_batting_avg: ".310",
    career_hits: 1521,
    career_hr: 106,
    career_rbi: 819,
    career_slg: ".464",
    career_triples: 93,
    career_doubles: 250,
    career_sb: 113,
    career_games: 1289,
    career_seasons: 11,
    ws_championships: "2 (1921, 1922)",
    ws_appearances: "4 consecutive (1921-1924)",
    ws_batting: ".276 (24-87), 3 HR, 17 RBI in 23 games",
    peak_rbi: "4 consecutive 100+ RBI seasons (1922-1925): 132, 125, 102, 111",
    brothers_rbi_titles: "Irish NL 1923 (125), Bob AL 1925 (138) — ONLY brothers to both lead their leagues in RBI",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB BATTER STAT CONVERSION — 1923 SEASON
  //
  // CON: .297 BA in 1923. Career .310. 204 H in 1922.
  //      .343 in 1921 (combined). .331 in 1922. .328 in 1925.
  //      16 K in 595 AB (1 per 37.2 AB) — nearly unstrikeoutable.
  //      "Joe Jackson type" hitter — natural, instinctive.
  //      CON = 3 (STRONG — .310 career, consistently above .300
  //      in prime. The absurdly low strikeout rates show elite
  //      bat-to-ball skills. Not a batting champion but always
  //      a threat. .297 in the card year is slightly below his
  //      standard — but 16 K in 595 AB is extraordinary.)
  //
  // POW: 19 HR in 1923 (4th NL). 125 RBI led NL.
  //      Career: 106 HR, 819 RBI in 1,289 games.
  //      14 triples (5th NL). 93 career triples.
  //      4 consecutive 100+ RBI seasons.
  //      1925: 21 HR with only 19 K — more HR than K.
  //      "Vicious hitter" — "slugging propensities."
  //      POW = 3 (STRONG — consistent RBI production,
  //      led NL in 1923. 4 straight 100+ RBI. Career 106 HR.
  //      Not a pure slugger like Ruth/Wilson but a legitimate
  //      run producer with gap power + triples power.)
  //
  // SPD: 8 SB in 1923. Career 113 SB. Led PCL with 69 SB
  //      in 1917. 93 career triples (significant).
  //      Good speed in youth, diminishing in Giants years.
  //      SPD = 2 (ABOVE AVERAGE — the triples (93 career)
  //      and SB (113 career) show real speed. Not elite by
  //      1923 but still a factor.)
  //
  // DEF: SORE THROWING ARM developed 1919. "Irish had one of
  //      the weakest arms in the NL while 'Long Bob' possessed
  //      a bazooka." Fielding % .959 career — adequate for era.
  //      Played LF primarily. McGraw pulled him mid-game 1926.
  //      DEF = 1 (BELOW AVERAGE — the weak arm was a real
  //      liability. Adequate range but the arm was notably poor.
  //      STARK CONTRAST with brother Bob's legendary arm.)
  //
  // CLU: 4 consecutive WS (1921-1924). 2 championships.
  //      .345 in 1921 WS (10-29), 7 RBI — led all players.
  //      .276 career WS, 17 RBI in 23 games.
  //      HR in 3 consecutive World Series (1921-1923).
  //      Helped Giants erase 7½ game deficit in 1921.
  //      CLU = 3 (MAXIMUM — .345 in 1921 WS, 7 RBI leading
  //      all players. HR in 3 straight WS. 17 WS RBI total.
  //      Meusel was a CLUTCH postseason performer.)
  //
  // OVR: CON×2(6) + POW×1(3) + SPD×1.5(3) + DEF×0.5(0.5) + CLU×1.5(4.5) = 17 → normalized ~7
  // OVR = 7 (ALL-STAR) — Irish Meusel. The Goldfish.
  // The man who was imperturbable as a goldfish. The RBI machine.
  // The brother who played left field at the Polo Grounds while
  // his brother played right field across the Harlem River.
  // Three World Series against each other. Thanksgiving dinner
  // bets. The same apartment building. The best-dressed
  // ballplayer in baseball. The German who looked Irish.
  // The man McGraw bought to win a pennant — and did.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,
    con: 3,    // .297 BA 1923, career .310. 16 K in 595 AB. "Joe Jackson type." Natural hitter. .343 in 1921.
    pow: 3,    // 125 RBI led NL. 19 HR. 4 straight 100+ RBI. Career 106 HR, 819 RBI. Gap + triples power.
    spd: 2,    // 8 SB 1923. Career 113 SB. 93 career triples. Led PCL with 69 SB (1917). Still a factor.
    def: 1,    // Sore arm since 1919. "Weakest arm in NL." Adequate range but the arm was a real liability.
    clu: 3,    // MAXIMUM — .345 in 1921 WS, 7 RBI led all. HR in 3 straight WS. 17 WS RBI in 23 games. 4 straight WS.
  },

  stat_justification: {
    con: "Meusel hit .297 in 1923, slightly below his .310 career mark but still solid. His career line: .343 (1921), .331 (1922), .297 (1923), .292 (1924), .328 (1925) — consistently around .300-plus in his prime. What elevates the contact rating is his remarkable ability to avoid strikeouts: only 16 K in 595 AB in 1923, one per 37.2 at-bats. In 1925 he had MORE home runs (21) than strikeouts (19). In 1919 he struck out only 13 times in 521 AB. A Washington Post reporter compared him to Joe Jackson as a natural hitter. Rating of 3.",
    pow: "Meusel led the NL with 125 RBI in 1923, the signature stat of his career. He drove in 100+ runs in four consecutive seasons (1922-1925): 132, 125, 102, 111. Career: 106 HR, 819 RBI in 1,289 games. He also hit 14 triples in 1923 (5th NL), showing genuine gap power — his 93 career triples are substantial. He was the NL's premier run producer for this four-year stretch. Rating of 3.",
    spd: "Meusel stole 8 bases in 1923. His career total was 113 SB, and he led the PCL with 69 SB in 1917. His 93 career triples confirm real speed — you don't hit that many triples without it. By 1923, at age 30, he was slowing somewhat, but still contributed on the bases. Rating of 2.",
    def: "Meusel developed a sore throwing arm in the winter of 1918-1919, and it never fully recovered. One source states bluntly: 'Irish had one of the weakest arms in the NL while Long Bob possessed a bazooka.' The contrast with his brother's legendary arm is stark. His .959 career fielding percentage was adequate but not special. McGraw pulled him mid-game in 1926 for misplaying two balls. The arm was a genuine weakness. Rating of 1.",
    clu: "Meusel appeared in 4 consecutive World Series (1921-1924), winning 2 championships. In the 1921 WS, he hit .345 (10-for-29) with 7 RBI — leading ALL players in the Series. He hit a home run in three consecutive World Series (1921, 1922, 1923). Career WS: .276, 17 RBI in 23 games. He helped the Giants erase a 7½-game deficit in the second half of 1921 after being acquired mid-season from Philadelphia. He was a proven October performer. Rating of 3 (maximum).",
  },

  personality: {
    leadership_style: "SERENE COMPETENCE. Irish Meusel was 'personable, with an ever-present smile' and a 'calm, serene demeanor.' He was named captain of the 1921 Phillies — the team was terrible but Meusel was respected. With the Giants, he was not a vocal leader but a reliable presence in McGraw's lineup. The man who smiled through everything.",
    temperament: "'As imperturbable as a goldfish' — the definitive description, from Thomas Holmes of the Brooklyn Daily Eagle. Nothing bothered him. Not the pennant race pressure, not the World Series against his own brother, not the mid-season trade from last place to first. He was CALM. He was STEADY. He was, in his way, UNFLAPPABLE.",
    work_ethic: "NATURAL TALENT OVER GRIND. Meusel was described as a 'natural hitter' from the beginning — 'a vicious hitter of the Joe Jackson type.' He didn't appear to work at his craft the way some did. The talent was innate. The approach was instinctive. The contact was automatic. He simply HIT.",
    lifestyle: "THE BEST-DRESSED BALLPLAYER. Holmes called him 'the best dressed ball player' he'd ever seen. After baseball: bartender in Glendale, California (his neighbor was his former teammate Casey Stengel). Small roles in SEVEN baseball-themed Hollywood movies (1920-1935), including 'Death on the Diamond' and 'Alibi Ike.' Security guard at Santa Anita and Hollywood Park race tracks. The most stylish man in baseball ended up guarding the gate.",
    era_adaptability: "MODERATE. Meusel's raw ability (.310 BA, 100+ RBI seasons) would translate, but his weak arm and declining speed would limit him in modern baseball. His incredible bat-to-ball skills (16 K in 595 AB) would be extraordinary in any era. In a modern context, his contact-oriented approach would be rare and valued.",
    clubhouse_impact: "POSITIVE — the ever-present smile, the calm demeanor, the style. Meusel was the kind of teammate who made the clubhouse lighter without trying. Not a rah-rah leader but a presence of ease. In ILB: +1 team morale when Irish Meusel is in the lineup. The goldfish effect.",
    tragic_element: "THE BROTHERS. Irish Meusel and Bob Meusel lived in the same apartment building in New York. They played in three consecutive World Series against each other (1921, 1922, 1923). They bet on Thanksgiving dinner. They re-hashed the games at home. They formed a barnstorming team together in the offseason and played against Negro League stars. They were the only brothers to both lead their respective leagues in RBI. Neither made the Hall of Fame. Their careers were mirrors: .310 career BA (Irish) vs .309 (Bob). They grew up in Oakland, their father wanted them all to be ballplayers, and two of them played in the World Series against each other on the same field in the same city at the same time. The tragedy is not death or failure — it is that this beautiful story is almost entirely forgotten.",
  },

  chemistry_traits: [
    { tag: "The Brother", desc: "Bob Meusel plays for the Yankees. Irish plays for the Giants. They live in the same apartment building. They play in three consecutive World Series against each other. In ILB, if both Meusels exist in the same league: each receives +1 CLU when playing against each other. The loser buys Thanksgiving dinner." },
    { tag: "McGraw's Purchase", desc: "McGraw bought Meusel mid-season from the last-place Phillies to win a pennant — and it worked. In ILB, Meusel provides +2 to all stats for the first 60 games after a mid-season acquisition. The pennant-buyer delivers." },
    { tag: "The RBI Machine", desc: "125 RBI led NL in 1923. 4 consecutive 100+ RBI seasons. In ILB, Meusel receives +1 POW when batting with runners in scoring position. The runs come in. They always come in." },
    { tag: "Imperturbable as a Goldfish", desc: "Nothing bothered Irish Meusel. Nothing. In ILB, Meusel is IMMUNE to pressure effects, cold streaks caused by external factors (trades, injuries to teammates, pennant races), and momentum swings. The goldfish swims in its bowl regardless of the world outside." },
    { tag: "The Weak Arm", desc: "Sore throwing arm since 1919. 'Weakest arm in the NL.' In ILB, runners advance an extra base on Meusel 25% more often than on other outfielders. The arm was the price he paid." },
    { tag: "Best-Dressed Ballplayer", desc: "'The best dressed ball player I ever saw' (Thomas Holmes). In ILB, Meusel provides +1 team morale (the goldfish effect). Style matters. Presence matters. The smile matters." },
    { tag: "Unstrikeoutable", desc: "16 K in 595 AB (1923). 13 K in 521 AB (1919). More HR than K in 1925. In ILB, Meusel has a MINIMUM contact guarantee: cannot strike out more than once per series. The bat finds the ball." },
    { tag: "The Hollywood Actor", desc: "Small roles in 7 baseball movies (1920-1935). In ILB, Meusel's fame and recognition are higher than his stats would suggest. +1 to All-Star selection odds. The camera loved the goldfish." },
  ],

  preferred_locations: [
    { location: "Polo Grounds, New York", affinity: "MAXIMUM / HOME", note: "1921-1926. Four consecutive pennants. Two championships. The left field where the goldfish swam serenely while his brother played across the river." },
    { location: "The Apartment Building", affinity: "IDENTITY", note: "Irish and Bob lived in the same building. After each World Series game they'd go home, re-hash, brag, and rib. This is where baseball becomes family." },
    { location: "Hollywood", affinity: "SECONDARY", note: "Seven baseball movies. 'Death on the Diamond,' 'Alibi Ike,' 'Fast Company.' The best-dressed ballplayer was also a movie extra." },
    { location: "Santa Anita Race Track", affinity: "CODA", note: "Security guard after baseball. The man who played in four World Series guarded the gate at the track. The goldfish in a smaller bowl." },
  ],

  momentum: {
    hot_triggers: [
      "Mid-season acquisitions — Meusel hit .392 over 43 games after a cold start with the Giants in 1921. The new team energizes the goldfish.",
      "Runners in scoring position — the RBI machine activates with men on base. 125 RBI with only 19 HR means he drove them in with singles, doubles, triples.",
      "World Series games — .345 in 1921 WS, HR in 3 straight WS. October was Irish Meusel's month.",
      "Hitting streaks — 21-game streak in 1920 (.420). 10 consecutive hits (1929 ASG-era record). When hot, the goldfish is scalding.",
    ],
    cold_triggers: [
      "Transition periods — .195 in first 19 games as a Giant (1921). Needs time to adjust to new surroundings.",
      "Defensive assignments — the weak arm affected his confidence and his managers' confidence. When the arm hurt, everything hurt.",
      "Late career decline — from .328 in 1925 to .292 in 1926 to being released in 1927. The goldfish's bowl got smaller.",
      "Playing against his brother's team (when losing) — the loser has to stand for some ribbing.",
    ],
    pressure_response: "GOLDFISH LEVEL CALM. Irish Meusel was the most serene player in the Bashers set. He didn't get rattled. He didn't get excited. He just hit. .345 in the 1921 World Series. HR in three straight WS. The goldfish doesn't know it's in a bowl. The goldfish just swims.",
  },

  action_card_seeds: [
    {
      title: "Thanksgiving Dinner",
      type: "Rivalry / Family",
      text: "Your left fielder and his brother live in the same apartment building in New York. Your left fielder plays for the Giants. His brother plays for the Yankees. They face each other in the World Series — not once, not twice, but three consecutive years. Before the first game, they make a bet: the brother with the lower batting average buys Thanksgiving dinner. After each game, they go home to the same building. They sit down together. The winner brags. The loser takes it. They do this for three Octobers in a row. The greatest rivalry in baseball is also the warmest family dinner.",
      origin: "Irish and Bob Meusel's Thanksgiving dinner bet during 3 consecutive World Series (1921-1923).",
    },
    {
      title: "The Pennant Purchase",
      type: "Acquisition / Controversy",
      text: "Your team is 4½ games out of first in late July. Your manager sees a left fielder hitting .353 on the last-place Phillies. He buys him. Cash and two players nobody remembers. The newspapers scream that you're buying a pennant. The commissioner, distracted by the Black Sox scandal, lets it stand. Your new left fielder hits .195 in his first 19 games. Then he hits .392 over the next 43. He drives in the go-ahead run in the 12th inning in Cincinnati. He drives in four runs to beat St. Louis. Your team overtakes the Pirates. You win the pennant. You were buying a pennant. You bought one.",
      origin: "McGraw's mid-season acquisition of Meusel from the Phillies in July 1921.",
    },
    {
      title: "The Goldfish",
      type: "Identity / Temperament",
      text: "'As imperturbable as a goldfish.' That's what the sportswriter called your left fielder. Nothing bothered him. Not the trade from last place to the pennant race. Not the World Series against his own brother. Not the sore arm. Not the contract disputes. Not the eventual decline and release. He smiled. He dressed better than anyone. He hit line drives. He drove in runs. He went home and re-hashed the games with his brother. He made seven movies. He tended bar for Casey Stengel's neighbor. He guarded the gate at Santa Anita. He died of a heart attack at 69. The goldfish swam until the water ran out.",
      origin: "Thomas Holmes's description: 'as imperturbable as a goldfish.' The defining quality of Irish Meusel.",
    },
    {
      title: "The Only Brothers",
      type: "Legacy / Record",
      text: "Irish Meusel led the National League with 125 RBI in 1923. Two years later, his younger brother Bob led the American League with 138 RBI. They are the only brothers in baseball history to both lead their respective leagues in runs batted in. Their career batting averages: .310 (Irish) and .309 (Bob). Their fielding percentages: .959 (Irish) and .960 (Bob). Mirror images. One in left field, one in right. One for the Giants, one for the Yankees. One with a weak arm, one with the strongest arm in the game. Neither in the Hall of Fame. Both forgotten. Both deserving of this card.",
      origin: "The Meusel brothers' parallel careers and unique shared RBI record.",
    },
  ],

  art_direction: {
    face: "5'11\" 178 lbs — not big, but SOLID. Handsome face with an EVER-PRESENT SMILE. Red hair (the source of the 'Irish' nickname — he was German). Pale skin. The face of a man who is genuinely, permanently CALM. Not stoic — SERENE. There is a difference. Stoic means suppression. Serene means absence of disturbance. The goldfish doesn't suppress its reaction to the bowl. The goldfish simply doesn't notice the bowl. WELL-DRESSED even in uniform — the uniform fits PERFECTLY, everything clean, sharp, pressed. 'The best dressed ball player I ever saw.'",
    attire: "New York Giants 1923 home whites — 'NY' interlocking logo. RIGHT-HANDED batting stance — natural, compact, the swing of a man who puts bat to ball with instinctive ease. The stance should look EFFORTLESS — not lazy, but NATURAL, like breathing. Or: in left field, throwing — but the arm is slightly wrong, slightly stiff, the one imperfection in the goldfish's world. The body is athletic, balanced, capable. Not imposing but RELIABLE.",
    mood: "SERENE AND WARM. This is the CALMEST card in the Bashers. Where Hornsby is cold and Ruth is hot, Irish Meusel is ROOM TEMPERATURE — perfectly comfortable, perfectly balanced, perfectly still. The mood is CONTENTMENT — the man who dressed well, smiled always, hit line drives, drove in runs, went home to his brother, and never seemed to want anything more. Not tragic. Not ecstatic. PRESENT.",
    style: "Full color — Bashers era — GIANTS ORANGE AND GOLDFISH GOLD. Giants warm orange, California gold, cream, warm brown. No gray, no shadow, no darkness — this card is ALL WARMTH. The goldfish lives in warm water. The border should be GOLDFISH GOLD — warm amber, the color of late-afternoon California sunlight, the color of Santa Anita in autumn, the color of a man who was comfortable everywhere. THE GOLDFISH — the most comfortable card in the Bashers. Every other card WANTS something — glory, recognition, redemption, respect. The goldfish just wants to swim.",
    reference: "Ruth is the solar system. Hornsby is the blade. Frisch is the flash. Irish Meusel is THE GOLDFISH — the card that doesn't want anything, doesn't fear anything, and drives in 125 runs anyway. He is the Bashers' great EASE — the player who made it look easy because, for him, it WAS easy. Not the most talented. Not the most driven. The most comfortable. The goldfish swims. The goldfish hits. The goldfish smiles.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", giantsOrange: "#e06e2c", goldfish: "#d4a230", amber: "#c49530" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.goldfish}15`, border: `1px solid ${C.goldfish}30`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.amber, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.giantsOrange, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.giantsOrange}20`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function IrishMeuselCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = MEUSEL_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.goldfish}20 0%, ${C.giantsOrange}12 50%, ${C.goldfish}20 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.ink, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.goldfish, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ALL-STAR CARD — Bashers Era — The Goldfish</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.goldfish}`, boxShadow: `0 0 0 2px ${C.giantsOrange}20, 0 8px 30px rgba(0,0,0,0.25), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.goldfish}, ${C.giantsOrange}, ${C.goldfish})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#fff", fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.goldfish}20`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.cream}, ${C.goldfish}08, ${C.giantsOrange}03)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>🐟</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.goldfish, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE GOLDFISH</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.goldfish, color: "#fff", padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.giantsOrange}ee`, color: "#fff", padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.goldfish}dd`, color: "#fff", padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ALL-STAR • 1923 NL RBI CHAMPION • 2× WS CHAMPION</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.goldfish, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>German who looked Irish • Imperturbable • Best-dressed ballplayer</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.giantsOrange} />
              <StatBar label="POW" value={s.pow} max={5} color={C.goldfish} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.sepia} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.giantsOrange}, ${C.goldfish})`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: ".297" },{ label: "OPS", val: ".822" },{ label: "HR", val: "19" },{ label: "RBI", val: "125" },{ label: "H", val: "177" },{ label: "R", val: "102" },{ label: "K", val: "16" },{ label: "3B", val: "14" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ background: `${C.goldfish}08`, border: `1px solid ${C.goldfish}20`, borderRadius: 4, padding: 8, marginTop: 10, textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: C.giantsOrange, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>16 STRIKEOUTS IN 595 AT-BATS</div>
              <div style={{ fontSize: 10, color: C.ink, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>ONE K EVERY 37.2 AB — UNSTRIKEOUTABLE</div>
              <div style={{ fontSize: 9, color: C.sepia, fontStyle: "italic", marginTop: 4 }}>Led NL with 125 RBI while striking out less than once per week.</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.goldfish}06`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.goldfish}12` }}>
              {[{ label: "CAR AVG", val: ".310" },{ label: "CAR RBI", val: "819" },{ label: "CAR HR", val: "106" },{ label: "GAMES", val: "1,289" },{ label: "WS RINGS", val: "2" },{ label: "WS RBI", val: "17" },{ label: "PENNANTS", val: "4" },{ label: "MOVIES", val: "7" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.goldfish, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 11, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🐟 Imperturbable Goldfish", "🏆 1923 NL RBI Leader", "👔 Best-Dressed Player", "👬 Brother vs Brother", "🎬 Hollywood Actor", "⚾ 3 Straight WS HRs", "🦅 McGraw's Purchase"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.goldfish}08`, border: `1px solid ${C.goldfish}15`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.goldfish, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ALL-STAR DOSSIER — {d.year} — THE GOLDFISH</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.goldfish}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.goldfish : "transparent", color: tab === t.id ? "#fff" : C.medBrown, border: `1px solid ${tab === t.id ? C.goldfish : C.sepia}30`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "tragic_element" ? "👬 THE BROTHERS" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "tragic_element" ? { color: C.amber } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.goldfish }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: `${C.goldfish}15`, color: C.goldfish, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.goldfish }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.goldfish}05`, border: `1px solid ${C.goldfish}12`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: `${C.giantsOrange}10`, color: C.giantsOrange, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.goldfish}, ${C.giantsOrange}, ${C.goldfish})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ALL-STAR #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
