import { useState } from "react";

const DEAN_DATA = {
  name: "Dizzy Dean",
  nickname: "The Great Man / Ol' Diz",
  year: 1934,
  team: "St. Louis Cardinals",
  league: "National League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "SP",
  bats: "R",
  throws: "R",
  height: "6'2\"",
  weight: "182 lbs",
  born: "January 16, 1910 — Lucas, Arkansas (public school through second grade; mother died of TB when he was 8; grew up in poverty across Arkansas, Oklahoma, and Texas)",
  died: "July 17, 1974 — Reno, Nevada (age 64, heart attack)",
  hof: "Inducted 1953 (BBWAA). 4× All-Star (1934-37). NL MVP 1934. Last NL pitcher to win 30 games (still, as of 2026). 150-83 (.644), 3.02 ERA, 1,163 K, 154 CG, 26 SHO. Led NL in K 4× consecutive (1932-35). Led NL in CG 3×, IP 3×, SHO 4× consecutive. Cardinals #17 retired. Cardinals HOF inaugural class 2014.",

  real_stats: {
    season: 1934, wins: 30, losses: 7, era: "2.66",
    games: 50, games_started: 33, complete_games: 24,
    shutouts: 7, saves: 7, innings_pitched: "311.2",
    hits_allowed: 288, walks: 75, strikeouts: 195,
    whip: "1.165", win_pct: ".811", era_plus: 156,
    war: 9.1,
    career_wins: 150, career_losses: 83, career_era: "3.02",
    career_k: 1163, career_war: 43.4,
    career_cg: 154, career_sho: 26,
  },

  ilb_stats: {
    ovr: 11,     // Legend — 30-7 in 1934. NL MVP. 9.1 WAR. Last NL 30-game winner. 82-32 from 1934-36. HOF 1953. The peak was as dominant as any pitcher in the 1930s. Career cut short by toe injury — without it, potentially top-10 all-time. 43.4 career WAR despite only ~5.5 full effective seasons.
    stf: 4,      // 195 K in 1934 (led NL). Led NL in K 4 consecutive years. Overpowering fastball + "crooky" curve. Red Smith: "Nobody ever taught him baseball and he never had to learn." Pepper Martin: "When ole Diz was out there pitching it was more than just another ballgame." Not quite STF 5 (that's reserved for absolute K monsters like Grove's 300+ K years), but 4 is right.
    ctl: 3,      // 1.165 WHIP in 1934. 75 BB in 311.2 IP (2.2 BB/9). "Pinpoint control." He had a fastball, a curve, and a changeup — and he knew where they were all going. "The dumber a pitcher is, the better. When he gets smart and tries to experiment with a lot of different pitches, he's in trouble. All I ever had was a fastball, a curve and a change up and I did pretty good." CTL 3.
    sta: 4,      // 311.2 IP in 1934. 24 CG. 50 games (33 starts + 17 relief appearances, 7 saves). Led NL in IP 3× (1932, 1935, 1936: 286, 325, 315). Led NL in CG 3×. Won 3 games in 5 days in August 1932. The man was a workhorse — he pitched until his arm fell off. STA 4.
    def: 0,      // Adequate fielder. No particular defensive reputation. The contribution is purely on the mound. DEF 0.
    clu: 3,      // Won 2 games in 1934 WS (including CG shutout in Game 7 — 11-0 over Tigers). Despite being knocked unconscious by a throw to the head as a pinch-runner in Game 4, came back to pitch. Dean brothers combined for all 4 Cardinals wins. In the biggest moment: 6-hitter shutout in Game 7. .150-83 (.644) career record. "Who won the pennant? Me and Paul. Who's going to win the Series? Me and Paul." CLU 3.
  },
  
  stat_justification: {
    stf: "195 K in 1934 — led NL. Led NL in K 4 consecutive years (1932-35: 191, 199, 195, 190). Dominant fastball plus his 'crooky' curve. Red Smith: 'Nobody ever taught him baseball and he never had to learn. He was just doing what came naturally.' 17 K in one game (1933, then a modern-era record). Rating of 4 — elite stuff, just short of the absolute peak tier.",
    ctl: "1.165 WHIP in 1934. 75 BB in 311.2 IP (2.2 BB/9). 'Pinpoint control' with a simple repertoire — fastball, curve, changeup. Career 1.206 WHIP. He didn't walk people and he didn't overthink. Rating of 3.",
    sta: "311.2 IP in 1934. 24 CG. 50 games (33 starts, 17 relief, 7 saves). Led NL in IP 3× and CG 3×. In August 1932, won 3 games in 5 days. In 1935: 325 IP, 29 CG. The workhorse of the 1930s NL. Rating of 4.",
    def: "Adequate fielder on the mound. No particular defensive reputation. Used as a pinch-runner in the WS (which is how he got hit in the head). Rating of 0.",
    clu: "1934 WS: won Games 1 and 7. Game 7 was a CG 6-hit shutout, 11-0, striking out Hank Greenberg 3 times. Got knocked unconscious as a pinch-runner in Game 4 (throw hit him in the head, headline: 'X-ray of Dean's head reveals nothing'). Came back and pitched anyway. Predicted 'Me and Paul will win 45 games' — they won 49. 'If ya done it, it ain't braggin.' Rating of 3 — maximum clutch.",
  },

  personality: {
    leadership_style: "The Folk Hero. Dean led through sheer charisma, self-belief, and entertainment. He was the Depression's answer to despair — a second-grade-educated Arkansas farm boy who could throw a baseball harder than anyone and talk funnier than anyone. He made predictions and backed them up. He told batters what was coming and struck them out anyway. He was the Gashouse Gang's soul — not the ringleader (that was Collins), not the muscle (that was Medwick), but the spirit. Pepper Martin: 'When ole Diz was out there pitching it was more than just another ballgame. It was a regular three-ring circus and everybody was wide awake and enjoying being alive.'",
    temperament: "Brash, joyful, fearless, self-mocking. He announced he was the greatest pitcher in the world and then proved it. He boasted about his ignorance ('The good Lord was good to me. He gave me a strong body, a good right arm, and a weak mind'). He was impossible to anger because he laughed at everything, including himself. Goose Goslin: 'This Dizzy Dean they're all talking about told the boys what he's going to do to them, but after listening for a while I kind of liked the kid. There's no real harm in him.' He was the most likable braggart in baseball history.",
    work_ethic: "Natural talent beyond comprehension. Red Smith: 'As a ballplayer, Dean was a natural phenomenon, like the Grand Canyon or the Great Barrier Reef. Nobody ever taught him baseball and he never had to learn.' His Army sergeant found him throwing peeled potatoes at garbage can lids. A scout saw him on a Texas sandlot. He went from poverty to 30 wins in four years. The effort was in the arm — the brain was blissfully unoccupied. 'The dumber a pitcher is, the better.'",
    lifestyle: "Arkansas poverty to national fame to the broadcast booth. Mother died of TB when he was 8. Public school through second grade. Joined the Army, where he was discovered. Married Patricia Nash in 1931 — she managed his business affairs for life (no children). After playing: broadcaster for Cardinals, Browns, Yankees, CBS/NBC Game of the Week (1941-1965). Mangled the English language gloriously ('He slud into third'). 'Let the teachers teach English and I will teach baseball. There is a lot of people in the United States who say \"isn't\" and they ain't eating.' A quarter-century of broadcasting made him more famous than his pitching did.",
    era_adaptability: "MODERATE. The raw stuff — fastball, curve, pinpoint control — translates to any era. But Dean's 311 IP and 50 games in 1934 would never happen in modern baseball. His value was concentrated in workload. In a 5-man rotation with pitch counts, Dean would be a 15-20 game winner with a sub-3.00 ERA and 200+ K — an ace, but not a 30-game winner. The personality would be worth $50M in endorsements. He'd be the most followed pitcher on social media in history.",
    clubhouse_impact: "MAXIMUM JOY. Dean made baseball fun. He made the Depression bearable. He made the Gashouse Gang a national sensation. The Mississippi Mudcats band. The predictions. The self-deprecating jokes. The absolute confidence. Branch Rickey spent 'four mortal hours conversing with a person named Dizzy Dean' and couldn't explain why. Everyone wanted to be around him. He was the most infectious personality in baseball history.",
    dark_side: "The toe. July 7, 1937 — All-Star Game. Earl Averill's line drive broke Dean's left big toe. Dean came back 10 days later, too soon. He altered his delivery to compensate for the pain. The altered mechanics destroyed his arm. Before the toe: 120-62 from 1932-36 (82-32 from 1934-36). After: 30-21 in 6 years with no dominant seasons. The career that should have been 300+ wins was cut to 150. He was 27 when the toe broke. Twenty-seven. The Gashouse Gang's greatest pitcher was stolen by a broken toe and impatience. Jim Murray, after Dean died: 'Well, we're all ten years older today. Dizzy Dean is dead and 1934 is gone forever.'",
  },

  chemistry_traits: [
    { tag: "It Ain't Braggin'", desc: "+1 STF and +1 team morale permanently. Dean makes predictions and backs them up. 'Me and Paul will win 45 games.' They won 49. When Dean announces what he'll do, the odds of him doing it increase." },
    { tag: "Gashouse Gang Soul", desc: "When 2+ Gashouse Gang members on roster: +2 team entertainment, +1 morale. Dean is the spirit of the team. Collins is the ringleader, Medwick is the muscle, Martin is the chaos agent. Dean is the soul." },
    { tag: "Mississippi Mudcats", desc: "Dean, Collins, Martin, and Vance formed a washboard band on KMOX radio. +1 publicity, +1 team morale. The most entertaining chemistry trait in the game." },
    { tag: "The Broken Toe", desc: "Once per career, in an All-Star game or exhibition: 5% chance a line drive breaks Dean's toe. If triggered: Dean rushes back too soon, alters his delivery, and permanently loses -2 STF and -1 STA. The career splits in half. Based on Earl Averill's line drive in the 1937 ASG." },
    { tag: "X-Ray Reveals Nothing", desc: "Dean is immune to concussion effects. After being hit in the head by a throw in the 1934 WS, the headline read: 'X-ray of Dean's head reveals nothing.' He pitched the next game and won Game 7 with a shutout." },
    { tag: "Son, What Kind of Pitch Would You Like to Miss?", desc: "Once per game, Dean can tell the batter what pitch is coming. 60% chance of a strikeout anyway (the stuff is that good). 40% chance the batter makes contact. +2 entertainment regardless." },
    { tag: "Me and Paul", desc: "When paired with brother Paul 'Daffy' Dean: combined win total increases by +5 per season. They predicted 45 and won 49. The brothers feed off each other." },
    { tag: "Pinto Bean English", desc: "As broadcaster (post-career): +3 national fame, +2 entertainment. 'He slud into third.' 'Let the teachers teach English and I will teach baseball.' Dean made millions more famous through talking than through pitching." },
  ],

  preferred_locations: [
    { location: "Sportsman's Park / St. Louis", affinity: "HIGH", note: "6 full seasons. 30 wins. WS champion. NL MVP. The Gashouse Gang's mound." },
    { location: "The Mound — Any Park", affinity: "HIGH", note: "311.2 IP. 50 games. 24 CG. 7 SHO. Dean owned the mound. It was his stage, his circus ring." },
    { location: "KMOX Radio / Broadcast Booth", affinity: "HIGH", note: "25 years of broadcasting. CBS/NBC Game of the Week. 'I'm just gonna speak plain ol' ordinary pinto bean English.'" },
    { location: "Game 7 of the World Series", affinity: "HIGH", note: "CG 6-hit shutout, 11-0 over Tigers. K'd Greenberg 3 times. The defining performance." },
    { location: "Lucas, Arkansas / Rural America", affinity: "MEDIUM", note: "Born in poverty. Mother died of TB. School through 2nd grade. The farm built the arm." },
    { location: "Fort Sam Houston / U.S. Army", affinity: "MEDIUM", note: "Where the nickname came from. Throwing potatoes at garbage can lids. The sergeant: 'You dizzy son-of-a-bitch!'" },
    { location: "All-Star Game", affinity: "LOW", note: "4× All-Star. But the 1937 ASG killed his career — Averill's line drive broke his toe." },
  ],

  momentum: {
    hot_triggers: [
      "Predictions — when Dean announces what he'll do, the confidence becomes self-fulfilling.",
      "Gashouse Gang energy — Collins, Medwick, Martin, Frisch around him, the circus compounds.",
      "Workhorse mode — 311 IP, 50 games. The more Dean pitches, the better he gets.",
      "Big games — WS Game 7 shutout. He lives for the spotlight.",
    ],
    cold_triggers: [
      "Post-toe injury — altered mechanics destroy the arm. The fastball loses velocity permanently.",
      "Rushing back from injury — Dean cannot be patient. He'll pitch hurt and make it worse.",
      "Isolation — without the Gashouse Gang chemistry, Dean is still great but less magical.",
      "Late career decline — after the toe, 30-21 in 6 diminished years.",
    ],
    pressure_response: "BORN FOR THE BIGGEST STAGE. 1934 WS: Won Games 1 and 7. Game 7: CG 6-hit shutout, 11-0, struck out Hank Greenberg 3 times. In Game 4: sent in as a pinch-runner, got hit in the head by a throw, knocked unconscious. Hospital. X-ray of his head revealed nothing. Came back to pitch the next day. Lost Game 5, then watched Paul win Game 6. Then threw the shutout of his life in Game 7. Before the 1934 season: 'Me and Paul will win 45 games.' They won 49. Before the WS: 'Who's going to win the Series? Me and Paul.' They did. 'If ya done it, it ain't braggin'.'",
  },

  action_card_seeds: [
    {
      title: "Thirty Wins",
      type: "Game Action",
      text: "Your pitcher wins 30 games. Thirty. He leads the league in wins, winning percentage (.811), strikeouts (195), and shutouts (7). He starts 33 games and relieves in 17 more, also saving 7 games. He pitches 311 innings. He wins the MVP. No pitcher in the National League will ever win 30 again.",
      origin: "1934: Dean went 30-7 with a 2.66 ERA. He remains the last NL pitcher to win 30 games.",
    },
    {
      title: "Me and Paul Will Win 45 Games",
      type: "Action",
      text: "Before the season, your ace predicts he and his brother will combine for 45 wins. Everyone laughs. By September 21, the brothers pitch a doubleheader against Brooklyn — your ace throws a 2-hit shutout in Game 1, his brother throws a no-hitter in Game 2. By season's end, they've won 49.",
      origin: "Dean predicted 45 combined wins with brother Paul in 1934. They won 49 (Dizzy 30, Paul 19).",
    },
    {
      title: "X-Ray of Dean's Head Reveals Nothing",
      type: "Drama",
      text: "Game 4 of the World Series. Your ace is sent in as a pinch-runner. The batter hits into a double play. Your ace throws himself in front of the throw to first. The ball hits him in the head. He's knocked unconscious and taken to the hospital. The next morning's headline: 'X-RAY OF DEAN'S HEAD REVEALS NOTHING.' He pitches the next game.",
      origin: "1934 WS Game 4: Dean was hit in the head while running the bases. He pitched Game 5 the next day.",
    },
    {
      title: "Game 7: The Shutout",
      type: "Game Action",
      text: "Game 7 of the World Series. Your ace takes the mound two days after a loss. He throws a complete game 6-hit shutout. 11-0. He strikes out the opposing team's biggest star three times. Your team wins the championship. He predicted this. He delivered this.",
      origin: "1934 WS Game 7: Dean CG shutout, 11-0 over Tigers. Struck out Hank Greenberg 3 times.",
    },
    {
      title: "The Broken Toe That Stole a Career",
      type: "Drama",
      text: "Your ace is the starting pitcher in the All-Star Game. A line drive breaks his toe. It seems minor. He comes back 10 days later — too soon. He pitches through the pain, altering his delivery. The altered mechanics destroy his arm. Before the toe: 120-62 in five years. After: 30-21 in six years. The career that should have been 300 wins becomes 150. He was 27.",
      origin: "1937 ASG: Earl Averill's line drive broke Dean's toe. Rushing back altered his mechanics and destroyed his arm.",
    },
    {
      title: "Son, What Kind of Pitch Would You Like to Miss?",
      type: "Action",
      text: "Your ace steps off the mound and asks the batter: 'Son, what kind of pitch would you like to miss?' The batter is confused. Your ace throws the exact pitch he just announced. Strike three. The batter walks back to the dugout in disbelief.",
      origin: "One of Dean's most famous quotes, reflecting his habit of telling batters what was coming — and striking them out anyway.",
    },
    {
      title: "The Mississippi Mudcats Take the Stage",
      type: "Action",
      text: "Your ace, your first baseman, your outfielder, and your relief pitcher form a washboard band. They play on the radio every week. The music is objectively terrible. The ratings are tremendous. The team is loose, happy, and winning the pennant.",
      origin: "Dean, Collins, Martin, and Vance formed the Mississippi Mudcats, performing on KMOX radio in St. Louis.",
    },
    {
      title: "It Ain't Braggin' If You Can Back It Up",
      type: "Action",
      text: "Your ace announces to the press that he is the greatest pitcher in the world. The press asks for evidence. Your ace points to the scoreboard: 30-7, 2.66 ERA, NL MVP, World Series champion. 'If ya done it, it ain't braggin'.'",
      origin: "Dean's signature philosophy. He bragged constantly and delivered constantly.",
    },
    {
      title: "Talking's My Game Now",
      type: "Drama",
      text: "Your retired ace comes back to pitch at age 37 — for the other team's crosstown rival, as a promotional stunt. He throws 4 scoreless innings and raps a single. Then he pulls his hamstring rounding first. Back in the broadcast booth, he says: 'I said I can pitch better than nine of the ten guys on the staff, and I can. But I'm done. Talking's my game now, and I'm just glad that muscle I pulled wasn't in my throat.'",
      origin: "1947: Dean, age 37, pitched 4 scoreless innings for the St. Louis Browns as a promotional stunt, then retired permanently.",
    },
  ],

  art_direction: {
    face: "Tall, lanky, grinning. 6'2\" 182 lbs — lean and loose. The face should be pure joy — the man who loved baseball more than anyone, who could barely read but could throw a ball through a brick wall. The grin is real. The confidence is real. The ignorance is real. All of it works together.",
    attire: "St. Louis Cardinals 1934 home whites with the birds-on-the-bat. Sportsman's Park behind him. The windup — high leg kick, right arm drawn back, the fastball about to be unleashed. Or: the broadcast booth, microphone in hand, mid-sentence, mangling English gloriously.",
    mood: "Pure Americana. The Depression-era folk hero. The farm boy who became the greatest show in baseball. The card should feel like a tent revival, a county fair, a radio broadcast on a warm summer evening. Joy, chaos, confidence, and a 95 mph fastball.",
    style: "Gashouse Gang warmth — Cardinals red, Missouri dust, Sportsman's Park steel. But brighter than the other Gashouse cards. Dean is sunshine where Medwick is fury and Collins is mischief. The colors should be warm, saturated, alive. This is the happiest card in the set.",
    reference: "The card of the last NL 30-game winner. The man whose X-ray revealed nothing. The man who told batters what was coming. The man who threw a Game 7 shutout two days after losing. The man whose career was stolen by a broken toe at 27. The man who became more famous talking about baseball than playing it. Dizzy Dean — the soul of the Gashouse Gang, the spirit of the Depression, and the most joyful pitcher who ever lived.",
  },
};

const STAT_ENGINE = {
  stuff: { metric: "K + Dominance", tiers: [{ range: "K < 100", value: 0 },{ range: "K 100-149", value: 1 },{ range: "K 150-199", value: 2 },{ range: "K 200-249", value: 3 },{ range: "K 250-299", value: 4 },{ range: "K 300+", value: 5 }], bonus: "4× consecutive K leader → +2 (cap 5)" },
  control: { metric: "WHIP + BB/9", tiers: [{ range: "WHIP > 1.40", value: 0 },{ range: "WHIP 1.30-1.40", value: 1 },{ range: "WHIP 1.15-1.29", value: 2 },{ range: "WHIP 1.00-1.14", value: 3 },{ range: "WHIP < 1.00", value: 4 }], bonus: "BB/9 < 2.5 → +1 (cap 4)" },
  stamina: { metric: "IP + CG", tiers: [{ range: "IP < 180", value: 0 },{ range: "IP 180-219", value: 1 },{ range: "IP 220-259", value: 2 },{ range: "IP 260-299", value: 3 },{ range: "IP 300+", value: 4 }], bonus: "20+ CG → +1 (cap 5)" },
  overall_sp: { formula: "STFx2 + CTLx2 + STAx1 + DEFx1 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / Ace" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason + signature moments", tiers: [{ range: "No PS or poor PS", value: 0 },{ range: "Average PS", value: 1 },{ range: "Good PS", value: 2 },{ range: "WS hero", value: 3 }] },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function DizzyDeanCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = DEAN_DATA;
  const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card Generator — Test Output</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Tall, lanky, grinning, high leg kick windup, Cardinals birds-on-bat, Sportsman's Park, pure joy and confidence]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.coldBlue}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>NL CROSSOVER</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={4} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "K", val: d.real_stats.strikeouts },{ label: "IP", val: d.real_stats.innings_pitched },{ label: "CG", val: d.real_stats.complete_games },{ label: "SHO", val: d.real_stats.shutouts },{ label: "WHIP", val: d.real_stats.whip },{ label: "WAR", val: d.real_stats.war }].map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1934 — LAST NL 30-GAME WINNER — NL MVP — WS CHAMPION</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛 HOF 1953", "🏆 1934 WS Champion", "🏅 NL MVP 1934", "⭐ 4× All-Star", "💪 30 Wins (Last NL)", "🔥 4× NL K Leader", "📊 150-83 (.644)", "🎵 Mississippi Mudcats"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>)}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>)}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Dean's real life, playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Pitcher Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Dean's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team} (NL)</span><span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, league: d.league, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
