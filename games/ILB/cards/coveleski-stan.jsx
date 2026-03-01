// /cards/players/stan-coveleski.jsx
import { useState } from "react";

const COVELESKI_DATA = {
  name: "Stan Coveleski",
  nickname: "Covey / The Big Pole",
  year: 1920,
  team: "Cleveland Indians",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '5\'11"',
  weight: "166 lbs",
  born: "July 13, 1889 — Shamokin, Pennsylvania (born Stanislaus Kowalewski)",
  died: "March 20, 1984 — South Bend, Indiana (age 94)",
  hof: "Inducted 1969 (Veterans Committee). 215-142, 2.89 ERA, 224 CG, 38 shutouts. Five 20-win seasons. 1920 WS: 3 CG wins, 0.67 ERA (still WS record). Bill James ranked him 24th greatest RHP all-time. Babe Ruth and Ty Cobb both called him one of the toughest pitchers they ever faced.",

  real_stats: {
    season: 1920,
    wins: 24,
    losses: 14,
    era: "2.49",
    games: 41,
    games_started: 37,
    complete_games: 28,
    shutouts: 3,
    innings_pitched: "315.1",
    strikeouts: 133,
    walks: 65,
    hits_allowed: 284,
    war: 7.1,
    whip: "1.107",
    ws_wins: 3,
    ws_era: "0.67",
    ws_ip: "27.0",
    ws_hits: 15,
    ws_walks: 2,
    career_wins: 215,
    career_losses: 142,
    career_era: "2.89",
    career_cg: 224,
    career_shutouts: 38,
    career_ip: "3,082",
    career_k: 981,
    career_bb: 764,
    twenty_win_seasons: 5,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION — 1920 SEASON
  //
  // For pitchers: STF (Stuff), CTL (Control), STA (Stamina), replacing CON/POW/SPD
  //
  // STF: Spitball was devastating — Sewell: "like hitting a butterfly." Led AL in K (1920).
  //      But not an overpowering pitcher — relied on movement and deception. Ruth & Cobb called him toughest.
  //      Peak season K/9 around 3.8 — not high, but the spitball was unhittable when on.
  //      STF = 3 (elite movement pitcher, not a power arm).
  //
  // CTL: "Why should I throw seven or eight times to a batter when I can get 'em out with a single pitch?"
  //      Complete games on 72, 78, 81 pitches in the 1920 WS. WHIP 1.107. Career BB/9 ~2.2.
  //      CTL = 4 (NEAR-MAXIMUM — among the best control pitchers of his era).
  //
  // STA: 315 IP (1920). 28 CG. 19-inning CG (1918). Career 224 CG, 3,082 IP.
  //      Four consecutive 20-win seasons. Routinely threw 275+ IP.
  //      STA = 4 (NEAR-MAXIMUM — an iron man on the mound).
  //
  // DEF: Adequate fielder for a pitcher. DEF = 0.
  // CLU: 1920 WS — 3 CG wins, 0.67 ERA (WS record). 1925 WS (lost). CLU = 3 (MAXIMUM).
  // OVR: STF×2(6) + CTL×1.5(6) + STA×1(4) + DEF×0.5(0) = 16 → normalized ~9
  // OVR = 9 (ELITE / MVP) — the greatest WS pitching performance in history earns the tier.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 9,
    stf: 3,    // Stuff — the spitball. "It would break from your head down to the ground, like hitting a butterfly." Not a power arm — a movement pitcher whose primary weapon (the spitball) was unhittable when located. Led AL in K (1920) but K/9 was modest (~3.8). The stuff was deception, not velocity. Rating of 3.
    ctl: 4,    // Control — NEAR-MAXIMUM. "Why should I throw seven or eight times to a batter when I can get 'em out with a single pitch?" Pitched 1920 WS games on 72, 78, and 81 pitches. Career BB/9 around 2.2. WHIP 1.107 in 1920. He was a perfectionist who didn't waste pitches. Rating of 4.
    sta: 4,    // Stamina — NEAR-MAXIMUM. 315 IP in 1920. 28 CG. Career 224 CG, 3,082 IP. Pitched a 19-inning CG in 1918 (Cleveland franchise record). Four consecutive 20-win seasons. Routinely threw 275+ IP. The son of coal miners — endurance was in his blood. Rating of 4.
    def: 0,    // Adequate fielder. Not a factor.
    clu: 3,    // MAXIMUM. The 1920 WS may be the greatest individual pitching performance in WS history. 3 complete game wins. 0.67 ERA — STILL the WS record. 5 hits per game. 2 walks in 27 innings. He won Games 1, 4, and 7, the clincher being a shutout. "Pitched that game and won it, and walked back alone to the clubhouse. And nobody said a word except maybe 'Nice game, Covey.'" CLU = 3.
  },

  stat_justification: {
    stf: "The spitball was Coveleski's primary weapon — a pitch that was legal when he learned it and illegal by the time he mastered it. Joe Sewell: 'I've seen him throw that spitball to a right-handed hitter, and he'd fall to the ground and that ball would break over the plate. It would break from your head down to the ground, like hitting a butterfly.' In addition to the spitter, he threw a fastball, curveball, and changeup. He led the AL in strikeouts in 1920 (133). But his K/9 was modest — around 3.8 — because he didn't try to strike batters out. He tried to get them out on one pitch. The stuff was filthy; the approach was economical. Rating of 3.",
    ctl: "'Why should I throw seven or eight times to a batter when I can get 'em out with a single pitch?' This is the defining quote of Coveleski's career. In the 1920 WS, he threw his three complete game victories on 72, 78, and 81 pitches respectively. That's an average of 77 pitches per complete game. His career BB/9 was approximately 2.2 — elite by any standard. His WHIP in 1920 was 1.107. He was a control pitcher who happened to throw the most devastating single pitch in baseball. Rating of 4.",
    sta: "315.1 IP in 1920. 28 complete games. Career: 3,082 IP, 224 CG. He pitched a 19-inning complete game on May 24, 1918 — still the Cleveland franchise record for longest CG by a single pitcher. He won 20+ games in four consecutive seasons (1918-1921: 22, 24, 24, 23). He routinely threw 275+ innings. He worked in coal mines 12 hours a day, 7 days a week starting at age 12. If anyone was built for endurance, it was Covey. Rating of 4.",
    def: "Adequate pitcher's fielding. Not a factor in his value. Rating of 0.",
    clu: "THE 1920 WORLD SERIES. Three complete game victories. 0.67 ERA — the World Series record, still standing after 100+ years. In 27 innings, he allowed 15 hits (5 per game), 2 earned runs, and walked only 2 batters. He won Games 1, 4, and 7 — the clincher was a shutout against fellow spitballer Burleigh Grimes. He threw 72, 78, and 81 pitches in those three games. It was the most efficient, dominant individual World Series pitching performance in baseball history. He also went 20-5 with a 2.84 ERA for the 1925 Senators and pitched in that WS (losing). 'Pitched that game and won it, and walked back alone to the clubhouse. And nobody said a word except maybe Nice game, Covey. Just another ball game.' Rating of 3 — MAXIMUM.",
  },

  personality: {
    leadership_style: "Quiet professionalism. Coveleski didn't inspire with speeches or fire — he led by being impossibly efficient. He threw fewer pitches per game than almost any pitcher in history. He completed what he started. He didn't waste effort. His leadership was the leadership of a man who grew up in coal mines: you do the work, you don't complain, you go home.",
    temperament: "Worried, meticulous, perfectionist. 'The pressure never lets up. Don't matter what you did yesterday. That's history. It's tomorrow that counts. So you worry all the time. It never ends. Lord, baseball is a worrying thing.' Coveleski was not carefree. He was a worrier — a man who understood that his arm was his only way out of the mines, and every pitch was a step further from Shamokin.",
    work_ethic: "COAL MINE CALIBER. At age 12, Coveleski quit school to work 12 hours a day, 7 days a week in the Shamokin coal mines for $3.75 a week. He threw rocks at tin cans to develop his arm. His brother Harry made the majors first and showed Stan the way. Everything about Coveleski's pitching style — the efficiency, the endurance, the refusal to waste anything — came from the mines. You don't throw eight pitches when one will do, because you don't swing the pick eight times when one will break the coal.",
    lifestyle: "From coal mines to the mound and back to earth. After baseball, Coveleski opened a gas station in South Bend, Indiana. He gave free pitching lessons to neighborhood kids in a field behind his garage. He dropped the 'e' from Coveleskie because he never corrected anyone who misspelled it. He lived to 94 — outlasting almost every player he ever faced. He was a quiet, solid, unpretentious man who happened to throw the greatest World Series in history.",
    era_adaptability: "COMPLICATED. The spitball — Coveleski's primary weapon — is illegal in modern baseball. Without it, he would need to reinvent himself entirely. But his control (2.2 BB/9), efficiency (77 pitches per CG), and endurance would translate to any era. If he adapted to a modern pitch mix (cutter, sinker, changeup), his command profile would make him elite. With the spitball? He'd be the most dominant pitcher alive.",
    clubhouse_impact: "STEADY. Coveleski wasn't a clubhouse leader in the vocal sense. He was the guy who took the ball every fifth day and won. He hunted with Smoky Joe Wood in the offseason — the quiet connection between two workhorse pitchers. In ILB, Coveleski provides +1 to team pitching staff morale — his consistency reassures everyone that at least one game a week is handled.",
    dark_side: "The worry. Coveleski's quote — 'The pressure never lets up... Lord, baseball is a worrying thing' — reveals a man who never relaxed, never felt secure, never believed yesterday's success protected him from tomorrow's failure. The mines were always behind him, always waiting. If the arm went, he went back to Shamokin. That fear drove him to be efficient, to never waste a pitch, to complete every game — because every game was proof that he was still here, still above ground. In ILB: 'The Worrier' — Coveleski cannot benefit from rest days. He worries MORE on days off. His stats improve when he pitches regularly and decline when idle. The mines are always behind him.",
  },

  chemistry_traits: [
    { tag: "The Last Legal Spitball", desc: "Coveleski was grandfathered when the spitball was banned in 1920 — one of 17 pitchers allowed to keep throwing it. In ILB, Coveleski's spitball is a unique pitch type: +2 STF on every pitch, but if the opposing manager 'challenges' the pitch (once per game), d6: on 1, the ump rules it illegal and Coveleski is ejected." },
    { tag: "Coal Miner's Son", desc: "Quit school at 12 to work 12 hours/day in the mines for $3.75/week. In ILB, Coveleski has +2 to stamina — he cannot be fatigued. The mines taught him endurance no training regimen could match." },
    { tag: "Seventy-Two Pitches", desc: "Threw a WS complete game on 72 pitches. In ILB, Coveleski's pitch count decays at half the normal rate. He can throw 9 innings on what costs other pitchers 5." },
    { tag: "The Worrier", desc: "'Lord, baseball is a worrying thing.' Coveleski's stats decline on rest days — he worries MORE when idle. +1 when pitching on regular rest, -1 when rested extra days." },
    { tag: "Sewell's Battery", desc: "Joe Sewell was Coveleski's teammate on the 1920 Indians. When paired: +1 to both players' stats. Sewell's 'Chapman's Heir' trait links to the 1920 championship context." },
    { tag: "Smoky Joe's Hunting Partner", desc: "Coveleski hunted with Smoky Joe Wood in the offseason. Cross-era link to Muggers. When both are in the same ILB collection: +1 to pitcher bonding — the quiet fraternity of arms." },
    { tag: "Brother's Path", desc: "Stan's brother Harry was also a ML pitcher — first siblings to both win 20 in a season. They agreed never to pitch against each other. In ILB, if both Coveleskis are in the game, neither can face the other's team." },
    { tag: "Point-Six-Seven", desc: "0.67 ERA in the 1920 WS — still the record after 100+ years. In ILB, during the World Series, Coveleski receives +2 to all pitching stats. He is the WS record holder. The record IS the trait." },
  ],

  preferred_locations: [
    { location: "League Park, Cleveland", affinity: "MAXIMUM", note: "9 seasons. 172 wins (Indians record at the time). Four consecutive 20-win seasons. The 1920 championship." },
    { location: "World Series Mound", affinity: "MAXIMUM", note: "0.67 ERA — still the WS record. 3 CG wins. 27 IP, 2 BB, 2 ER. The greatest individual WS pitching performance ever." },
    { location: "Pitcher's Mound (Any)", affinity: "HIGH", note: "3,082 career IP. 224 CG. He was built for the mound. He threw fewer pitches than anyone and went deeper than everyone." },
    { location: "South Bend, Indiana", affinity: "HOME", note: "Where he lived after baseball. Gas station. Free pitching lessons for kids. Stadium named after him. Died there at 94." },
    { location: "Shamokin, Pennsylvania", affinity: "ORIGIN", note: "The coal mines. $3.75/week. 12 hours/day. Everything he did was running from here — and he never stopped running." },
  ],

  momentum: {
    hot_triggers: [
      "Regular rest — Coveleski was at his best on normal rest. He worried when idle. 'The pressure never lets up.'",
      "World Series — 0.67 ERA. He elevated in October unlike almost any pitcher in history.",
      "Complete games — the deeper he went, the better he got. 28 CG in 1920. 224 career. He was built to finish.",
      "Economy — when Coveleski was throwing fewer pitches, he was at his most dominant. 72 pitches for a CG.",
    ],
    cold_triggers: [
      "Extra rest — too many days off and the worrying consumed him. He needed the routine of the rotation.",
      "1925 WS — charged with 2 losses as the Senators fell to Pittsburgh. Even the best falter eventually.",
      "Cleveland — despite his success, Coveleski 'didn't really like playing there.' Something about the city wore on him.",
      "Losing control — when the spitball wasn't breaking, he had fewer options than pitchers with multiple plus pitches.",
    ],
    pressure_response: "TRANSCENDENT IN OCTOBER. Coveleski in the regular season was excellent — 215-142, 2.89 ERA. Coveleski in the World Series was immortal — 0.67 ERA, 3 CG wins, 5 hits per game, 2 walks in 27 innings. The gap between his regular season and his October is one of the largest in baseball history. He worried all year, and then in October, when the pressure was greatest, the worry transformed into focus. The mines had taught him: when the ceiling is lowest, you work hardest. CLU = 3.",
  },

  action_card_seeds: [
    {
      title: "Point-Six-Seven",
      type: "Game Action",
      text: "Three games. Three complete games. Three victories. Fifteen hits allowed — five per game. Two walks in twenty-seven innings. Seventy-two pitches, seventy-eight pitches, eighty-one pitches. An ERA of 0.67. It is the greatest individual pitching performance in World Series history. It is still the record. It will be the record when you read this. Your pitcher walks back to the clubhouse alone. Nobody says a word except maybe 'Nice game, Covey.' Just another ball game.",
      origin: "1920 WS: Coveleski won Games 1, 4, and 7. 0.67 ERA — still the WS record. 'Pitched that game and won it, and walked back alone to the clubhouse.'",
    },
    {
      title: "The Coal Mines",
      type: "Drama",
      text: "At twelve years old, your pitcher quits school. He goes into the coal mines of Shamokin, Pennsylvania. Twelve hours a day. Seven days a week. Three dollars and seventy-five cents. He throws rocks at tin cans to develop his arm because rocks are free and tin cans are everywhere and the mines will kill him if he stays. His brother Harry makes the majors first. Stan follows. He never goes back underground.",
      origin: "Coveleski was born Stanislaus Kowalewski in the coal town of Shamokin, PA. Worked in the mines from age 12. His brother Harry reached the majors first, showing him the path.",
    },
    {
      title: "The Spitball",
      type: "Action",
      text: "In 1920, Major League Baseball bans the spitball. Your pitcher has built his entire career on the pitch. They let him keep throwing it — he is one of seventeen pitchers grandfathered in. The pitch that was his salvation becomes his secret, legal and illegal simultaneously. He is the last of his kind. When he retires, the spitball dies with him. Joe Sewell watches it break: 'From your head down to the ground. Like hitting a butterfly.'",
      origin: "The spitball was banned in 1920. Coveleski was one of 17 pitchers allowed to continue throwing it. He used chewing tobacco and later alum to doctor the ball.",
    },
    {
      title: "Seventy-Two Pitches",
      type: "Game Action",
      text: "Game 1 of the 1920 World Series. Your pitcher throws seventy-two pitches. He completes the game. He wins 3-1. Four days later, he throws seventy-eight pitches. Complete game. Wins 5-1. Three days after that, eighty-one pitches. Complete game shutout. He has thrown three complete World Series victories on fewer pitches than most modern pitchers throw in one start.",
      origin: "Coveleski's pitch counts in his three 1920 WS wins: 72, 78, 81. Average of 77 pitches per complete game. 'Why should I throw seven or eight times to a batter when I can get 'em out with a single pitch?'",
    },
    {
      title: "Lord, Baseball Is a Worrying Thing",
      type: "Drama",
      text: "'The pressure never lets up. Don't matter what you did yesterday. That's history. It's tomorrow that counts. So you worry all the time. It never ends. Lord, baseball is a worrying thing.' Your pitcher says this and means it. He is not at peace. He is never at peace. The mines are always behind him. Every pitch is one more day above ground.",
      origin: "Coveleski's most famous quote. His HOF plaque quote. The defining statement of a man who understood that talent is not protection — only work is protection.",
    },
    {
      title: "Nineteen Innings",
      type: "Game Action",
      text: "May 24, 1918. Your pitcher takes the mound and does not leave it for nineteen innings. He wins 3-2 in New York. It is still the longest complete game by a single pitcher in Cleveland franchise history. Nobody tells him to stop. Nobody needs to. He is from the coal mines. He does not stop until the work is done.",
      origin: "Coveleski pitched a 19-inning complete game on May 24, 1918 — a Cleveland franchise record that still stands.",
    },
    {
      title: "The Brothers",
      type: "Drama",
      text: "Stan and Harry Kowalewski — now Coveleski — are the first siblings in baseball history to each win twenty games in a season. They play in the same league. They make an agreement: they will never pitch against each other. The coal mines produced them both. The game will not set them against one another.",
      origin: "Harry Coveleski won 20 for the 1914 Tigers. Stan won 20 for the 1918 Indians. They agreed never to face each other on the mound.",
    },
    {
      title: "The Gas Station",
      type: "Legacy",
      text: "After the last pitch, your pitcher moves to South Bend, Indiana. He opens a gas station. He gives free pitching lessons to neighborhood kids in a field behind his garage. He lives to ninety-four. They name the baseball stadium after him. He drops the 'e' from the end of his name because he never corrects anyone who misspells it. It doesn't matter how you spell it. What matters is the 0.67.",
      origin: "Coveleski ran Coveleski Service Station in South Bend. Taught local kids for free. The minor league stadium bears his name. Died 1984 at age 94.",
    },
  ],

  art_direction: {
    face: "5'11\" 166 lbs — lean, sinewy, no bulk. The face of a man who has worked underground. Polish-American features — strong cheekbones, deep-set eyes, a face that has seen darkness and emerged from it. Not handsome, not ugly — weathered. The eyes are the key: they are watchful, worried, calculating. He is always thinking about the next pitch. He is always thinking about the mines.",
    attire: "Cleveland Indians 1920 home whites. Mid-delivery — the spitball in flight. The fingers should be slightly wet. The ball should be leaving the hand at an angle that suggests movement, not speed. Or: on the mound, glove raised, looking in for the sign, ready to throw one pitch and end the at-bat. The uniform should be clean — Coveleski didn't sweat much because he didn't throw hard. He threw smart.",
    mood: "WORRIED MASTERY. This card should feel like the inside of a coal mine — dark, confined, pressurized, and yet somehow productive. Coveleski's card is not joyful like Ruth or steady like Gehrig or fierce like Cochrane. It is ANXIOUS — a man who is never at ease, who worries about tomorrow even after winning today. But the worry IS the mastery. The worry is what makes him throw 72 pitches in a World Series complete game. The mood is twilight before the game — the quiet dread that precedes the focus.",
    style: "Full color — Bashers era — but DARK and COOL. Cleveland colors: navy, red, white. But the dominant tone is the gray-blue of coal dust, of pre-dawn Shamokin, of a man who spent his formative years underground. Where the St. Louis cards are warm and dusty and the New York cards blaze, the Cleveland card is cool and close. The border should be coal-dark — charcoal, almost black. The color of the mine, the color of the ball when it's wet with alum, the color of worry.",
    reference: "Ruth is the solar system. Gehrig is the axis. Sisler is the sun. Coveleski is the MINESHAFT — deep, dark, productive, and built for pressure. He goes deeper than anyone. He works in places others can't breathe. His card should feel like descending — like the ceiling is getting lower but the work is getting better. 0.67. The number itself is the image.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", coalDark: "#1a1d22", clevNavy: "#0c2340", clevRed: "#c8102e" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.coalDark}10`, border: `1px solid ${C.coalDark}25`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.warmRed, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.clevNavy, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.clevNavy}30`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function StanCoveleskiCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = COVELESKI_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.coalDark} 0%, #0a0c10 50%, ${C.coalDark} 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.cream, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ELITE / MVP CARD — Bashers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.coalDark}`, boxShadow: `0 0 0 2px ${C.clevNavy}, 0 0 20px ${C.coalDark}40, 0 10px 36px rgba(0,0,0,0.6), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.clevNavy}, #1a2a4a, ${C.clevNavy})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.cream, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.coalDark}40`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.coalDark}20, ${C.clevRed}08, ${C.clevNavy}15)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>⛏️</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE COAL MINER'S SON</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.clevNavy, color: C.cream, padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.clevRed}ee`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.clevNavy}dd`, color: C.cream, padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ELITE / MVP</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.clevRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.traitGreen} />
              <StatBar label="DEF" value={s.def} max={3} color={C.coldBlue} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.clevNavy}, #1a2a4a)`, borderRadius: 4, padding: 10 }}>
              {[{ label: "W", val: d.real_stats.wins },{ label: "L", val: d.real_stats.losses },{ label: "ERA", val: d.real_stats.era },{ label: "CG", val: d.real_stats.complete_games },{ label: "IP", val: "315" },{ label: "K", val: d.real_stats.strikeouts },{ label: "BB", val: d.real_stats.walks },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1920 — LED AL IN K — 1920 WS: 3 CG WINS, 0.67 ERA (STILL WS RECORD)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.clevNavy}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.clevNavy}20` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR IP", val: "3,082" },{ label: "CAR SO", val: d.real_stats.career_shutouts },{ label: "20-W SZN", val: d.real_stats.twenty_win_seasons },{ label: "HOF", val: "1969" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.clevNavy, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.6 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛️ HOF 1969", "🏆 1920 WS Champion", "📊 0.67 WS ERA (Record)", "💧 Legal Spitballer", "⛏️ Coal Miner's Son", "🦋 'Like Hitting a Butterfly'", "5️⃣ Five 20-Win Seasons", "📜 'Lord, Baseball Is Worrying'"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.clevNavy}10`, border: `1px solid ${C.clevNavy}20`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ELITE DOSSIER — {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.clevNavy}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.clevNavy : "transparent", color: tab === t.id ? C.cream : C.medBrown, border: `1px solid ${tab === t.id ? C.clevNavy : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.warmRed }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "MAXIMUM" ? `${C.gold}20` : l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "HOME" ? `${C.coldBlue}20` : `${C.warmRed}20`, color: l.affinity === "MAXIMUM" ? C.gold : l.affinity === "HIGH" ? C.traitGreen : l.affinity === "HOME" ? C.coldBlue : C.warmRed, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Coveleski's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.clevNavy}05`, border: `1px solid ${C.clevNavy}15`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Legacy" ? `${C.sepia}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.clevNavy}, #1a2a4a, ${C.clevNavy})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ELITE #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
