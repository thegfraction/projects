import { useState } from "react";

const WARNEKE_DATA = {
  name: "Lon Warneke",
  nickname: "The Arkansas Hummingbird",
  year: 1932,
  team: "Chicago Cubs",
  league: "National League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "SP",
  bats: "R",
  throws: "R",
  height: "6'2\"",
  weight: "185 lbs",
  born: "March 28, 1909 — Mount Ida, Arkansas (Owley community, Montgomery County; no paved roads, no electricity, no running water; father homesteaded 160 acres)",
  died: "June 23, 1976 — Hot Springs, Arkansas (age 67, heart attack at home)",
  hof: "Not inducted. Near-miss candidate. 192-121 (.613), 3.18 ERA, 192 CG, 30 SHO, 1,140 K. 5× All-Star (1933-34, 1936, 1939, 1941). Led NL in W/ERA/SHO/W% in 1932 (2nd in MVP). 3× 20-game winner. 2-1 WS record (2.63 ERA). Pie Traynor named him to his era's All-Star team alongside Hubbell, Alexander, and Vance. Only person to play AND umpire in both an ASG and a WS.",

  real_stats: {
    season: 1932, wins: 22, losses: 6, era: "2.37",
    games: 35, games_started: 32, complete_games: 25,
    shutouts: 4, saves: 2, innings_pitched: "277",
    hits_allowed: 247, walks: 75, strikeouts: 106,
    whip: "1.163", win_pct: ".786", era_plus: 161,
    war: 7.7,
    career_wins: 192, career_losses: 121, career_era: "3.18",
    career_k: 1140, career_war: 39.2,
    career_cg: 192, career_sho: 30,
  },

  ilb_stats: {
    ovr: 8,      // All-Star — 22-6 with a 2.37 ERA and 7.7 WAR in 1932 is elite. But: not HOF (no induction despite strong candidacy). 192-121 career is very good but not legendary. 39.2 career WAR. He was the #3 NL pitcher of the era behind Hubbell and Dean, consistently mentioned alongside them but never quite at their level. OVR 8 — strong All-Star.
    stf: 2,      // 106 K in 277 IP (3.4 K/9) in 1932. Not a strikeout pitcher. His best pitch was an overhand curveball plus a darting fastball (hence "Hummingbird") and a changeup. Phil Cavarretta: "His best pitch was an overhand curve ball. He had a good change and a good fastball — his fastball had good movement." The stuff was more about movement and deception than raw power. STF 2.
    ctl: 3,      // 1.163 WHIP in 1932. 2.37 ERA (led NL). Held opponents to .212 BA (2nd in NL). Excellent command. "A pitcher who will not go through a long period of ineffectiveness." Career 3.18 ERA. CTL 3.
    sta: 4,      // 277 IP in 1932. 25 CG (led NL in 1933 with 26). 192 career CG in 15 seasons. 8 seasons of 200+ IP. Opening Day starter for Cubs 4 consecutive years (won all 4). Massive workhorse. STA 4.
    def: 1,      // Set a MLB fielding record for pitchers — 221 chances without an error in 154 game appearances (1938). Good fielding pitcher. DEF 1.
    clu: 1,      // 2-1 WS record with 2.63 ERA (1932, 1935 WS). Won 2 games in 1935 WS vs. Tigers. But: Cubs lost both WS he appeared in (1932 swept by Yankees, 1935 lost in 7). Also: first-ever ASG — struck out Ruth and Gehrig, hit the first triple, scored the first NL run. Solid in big moments but never won the big one. CLU 1.
  },
  
  stat_justification: {
    stf: "106 K in 277 IP (3.4 K/9). Not a strikeout pitcher. His dominance came from movement, deception, and command. Overhand curveball was his best pitch, plus a darting fastball (the 'Hummingbird' fastball) and a changeup. Cavarretta: 'one of the best pitchers I've ever seen.' But the K rate is low even for the era. Rating of 2.",
    ctl: "2.37 ERA in 1932 — led NL. 1.163 WHIP. .212 opponent BA (2nd in NL). 75 BB in 277 IP (2.4 BB/9). Career 3.18 ERA over 15 seasons. Excellent command of all three pitches. 'The sort of pitcher who will not go through a long period of ineffectiveness.' Rating of 3.",
    sta: "277 IP in 1932. 25 CG. Led NL in CG in 1933 (26). 192 career CG. 8 seasons of 200+ IP. Opening Day starter for Cubs 4 consecutive years — won all 4. In 1935: 261 IP. In 1934: 291 IP. Massive workhorse who thrived on heavy usage. Rating of 4.",
    def: "Set MLB fielding record for pitchers: 221 consecutive chances without an error across 154 game appearances (1938). Active, athletic fielder on the mound. Rating of 1.",
    clu: "2-1 WS record with 2.63 ERA. Won 2 games in 1935 WS vs. Tigers (both CG). First-ever ASG (1933): struck out Babe Ruth and Lou Gehrig, hit the first triple in ASG history, scored the first NL run. But: Cubs lost both WS (1932 swept, 1935 in 7). Never won the championship. Rating of 1.",
  },

  personality: {
    leadership_style: "The Quiet Ace. Where Dean was the showman and Hubbell was the scientist, Warneke was the dependable craftsman who simply won. Opening Day starter four straight years. Won all four. Led the NL in ERA, wins, shutouts, and winning percentage in 1932 at age 23. Phil Cavarretta, who saw them all, called him 'one of the best pitchers I've ever seen.' He didn't brag, didn't predict, didn't self-promote. He just took the ball and won.",
    temperament: "Country boy with a wild streak. Grew up on a 160-acre farm in the Ouachita Mountains — no electricity, no running water, no paved roads. Caught snakes in swamps and cracked them like whips. Got tossed from a game for smuggling snakes into the dugout. Traveled with a ukulele. Played guitar, fiddle, and banjo in the Mississippi Mudcats. A Cleveland scout scouted him, watched him pantomime rowing to second base in a rain delay, and wrote: 'He's a screwball. Forget him.'",
    work_ethic: "Self-made from nothing. Failed to make his high school team as a freshman. Didn't even become a pitcher until 1927, when an emergency forced him onto the mound in the 7th inning against a salaried team. A teammate noticed he was pitching while looking at his feet instead of the catcher — corrected the flaw and became the NL's best pitcher within a year. The 1932 Sporting News: 'He's just a great pitcher, such as pops up once in a lifetime.'",
    lifestyle: "Arkansas roots to the end. 'Heck, I can live a whole winter down home for $50. I can't live a week up North for that.' After playing: became an NL umpire (1949-55) — 'a players' umpire' who never ejected anyone. Then became County Judge of Garland County, Arkansas (1963-72). Married Erma Charlyne Shannon, a schoolteacher, in 1933. Two children. Died at home in Hot Springs. Buried in the family cemetery at Owley — his tombstone reads 'Arkansas Hummingbird' beneath an iris bouquet designed by his daughter.",
    era_adaptability: "MODERATE. The control and movement would translate, but the low K rate (3.4 K/9 even for the 1930s) would be a concern in modern baseball. He'd profile as a high-ground-ball, soft-contact pitcher — a modern Kyle Hendricks type. The workhorse mentality would clash with modern pitch counts. He'd be a solid #2-3 starter in any era — reliable, durable, but not a strikeout ace.",
    clubhouse_impact: "WARM AND STEADY. Warneke was the guy who played guitar in the clubhouse, told snake stories from Arkansas, and kept everyone grounded. He wasn't the loudest (that was Dean) or the most intense (that was Medwick), but he was the most consistently pleasant. As an umpire, he 'never needed to eject a player, preferring to let them speak their piece.' That temperament served him everywhere — the mound, the dugout, the umpire's position, and the judge's bench.",
    dark_side: "The near-misses. Warneke's Cubs lost every World Series he appeared in (1932, 1935). His Cardinals contended but never quite got there. He finished 2nd in NL MVP in 1932 — lost to Chuck Klein. He was never inducted into the Hall of Fame despite 192 wins, 30 shutouts, and Traynor naming him alongside Hubbell, Alexander, and Vance. His gravestone says 'Arkansas Hummingbird' — but Cooperstown doesn't. The quiet ace was too quiet for history.",
  },

  chemistry_traits: [
    { tag: "The Arkansas Hummingbird", desc: "Darting fastball with late movement. +1 CTL permanently. Opponents describe the ball as 'humming' and darting unpredictably. Named by Roy Stockton of the St. Louis Post-Dispatch." },
    { tag: "Opening Day Ace", desc: "Opening Day starter 4 consecutive years — won all 4. +1 STF/CTL on Opening Day and first game of any series. He was born to start seasons." },
    { tag: "The First All-Star", desc: "Pitched in the inaugural 1933 ASG: struck out Ruth and Gehrig, hit the first triple in ASG history, scored the first NL run. Once per career, in an exhibition/ASG: +2 all stats for a defining performance." },
    { tag: "Snake Wrangler", desc: "Caught snakes in swamps, cracked them like whips, smuggled them into dugouts. 5% chance per game of a snake prank. If triggered: -1 team discipline, +2 entertainment. Once got ejected for it." },
    { tag: "Mississippi Mudcats Guitarist", desc: "Played guitar, fiddle, and banjo with the Mudcats when traded to the Cardinals. +1 morale when paired with Martin, Dean, Collins, or Vance." },
    { tag: "Player-Umpire-Judge", desc: "Only person to play AND umpire in both ASG and WS. After retirement: +2 legacy for unique career arc. As umpire: 'never ejected anyone.' As judge: served Garland County for 9 years." },
    { tag: "The Screwball Scout Report", desc: "A Cleveland scout saw Warneke pantomiming rowing in a rainstorm and wrote: 'He's a screwball. Forget him.' -1 scouting reputation means other teams undervalue Warneke in trades." },
    { tag: "Fifty Dollars a Winter", desc: "'Heck, I can live a whole winter down home for $50.' Warneke never demands a big contract. +1 team budget. The cheapest ace in baseball." },
  ],

  preferred_locations: [
    { location: "Wrigley Field / Chicago", affinity: "HIGH", note: "7 seasons. 22-6 in 1932. Opening Day ace. Led NL in ERA. 2 WS appearances." },
    { location: "Sportsman's Park / St. Louis", affinity: "HIGH", note: "5 seasons with Cardinals. No-hitter 1941. Mississippi Mudcats guitarist. Led staff with 18 wins in 1937." },
    { location: "Owley, Arkansas", affinity: "HIGH", note: "Born here. Buried here. 160-acre farm. No electricity, no water, no roads. Tombstone: 'Arkansas Hummingbird.'" },
    { location: "Comiskey Park (1933 ASG)", affinity: "HIGH", note: "First-ever ASG. K'd Ruth and Gehrig. Hit the first triple. Scored the first NL run." },
    { location: "Hot Springs, Arkansas", affinity: "MEDIUM", note: "Businessman, county judge (1963-72). Home until death. Married here." },
    { location: "Umpire's Position", affinity: "MEDIUM", note: "NL umpire 1949-55. 'Players' umpire.' Never ejected anyone. Umpired 1952 ASG and 1954 WS." },
    { location: "The Swamp", affinity: "MEDIUM", note: "Bus broke down. Warneke waded in, caught a snake, cracked it like a whip. The scout: 'He's a screwball.'" },
  ],

  momentum: {
    hot_triggers: [
      "Opening Day — won all 4 consecutive Opening Day starts. He thrives when the season begins.",
      "Back-to-back one-hitters — April 1934. When the curveball is darting, nobody hits him.",
      "April dominance — 18-4 record in April across his career. Spring is Warneke's season.",
      "Quiet confidence — when the spotlight is on someone else, Warneke thrives in the shadows.",
    ],
    cold_triggers: [
      "World Series losses — Cubs lost both WS he pitched in. The big one always slips away.",
      "Being undervalued — traded for Ripper Collins, a downgrade in franchise's eyes. The quiet ace gets overlooked.",
      "Post-trade adjustment — slight dip in performance when traded from Cubs to Cardinals.",
      "Late career decline — after WWII military service, never regained peak form.",
    ],
    pressure_response: "EXCELLENT BUT STAR-CROSSED. 2-1 WS record with 2.63 ERA. Won 2 CG in the 1935 WS vs. Tigers. First-ever ASG: struck out Ruth and Gehrig, hit the first triple, scored the first NL run — the defining individual performance of the inaugural Midsummer Classic. But: Cubs lost both WS. Cardinals never made it. He did everything right and never got the ring. The Arkansas Hummingbird sang beautifully — the scoreboard just didn't always listen.",
  },

  action_card_seeds: [
    {
      title: "The First All-Star Game",
      type: "Game Action",
      text: "July 6, 1933. Comiskey Park. The first All-Star Game in baseball history. Your pitcher relieves in the early innings. He strikes out Babe Ruth. He strikes out Lou Gehrig. He hits the first triple in All-Star history. He scores the first National League run in All-Star history. Nobody remembers this. They should.",
      origin: "1933 ASG: Warneke K'd Ruth and Gehrig, hit the first ASG triple, and scored the first NL run.",
    },
    {
      title: "Back-to-Back One-Hitters",
      type: "Game Action",
      text: "Your ace opens the 1934 season on the road at Cincinnati. He carries a no-hitter into the 9th inning before a dribbler ruins it. One hit. Five days later, his next start — another one-hitter. Two consecutive starts, two hits allowed total. The season is five days old and your ace has already announced himself.",
      origin: "April 17 and 22, 1934: Warneke opened the season with back-to-back one-hitters.",
    },
    {
      title: "He's a Screwball — Forget Him",
      type: "Drama",
      text: "A scout watches your prospect during a rain delay. Instead of sitting in the dugout, your prospect wades onto the flooded field and pantomimes rowing to second base. The scout writes in his notebook: 'He's a screwball. Forget him.' Your prospect goes on to win 192 games.",
      origin: "Cleveland scout Cy Slapnicka watched Warneke pantomime rowing during a rainstorm and rejected him.",
    },
    {
      title: "Snakes in the Dugout",
      type: "Action",
      text: "Your pitcher's bus breaks down near a swamp. He wades in, catches a snake bare-handed, and cracks it like a whip to amuse his teammates. Later that season, he smuggles snakes into the dugout during a game. He gets ejected — not for pitching, but for reptiles.",
      origin: "Warneke caught snakes in swamps and was ejected from a game for smuggling snakes into the dugout.",
    },
    {
      title: "The No-Hitter",
      type: "Game Action",
      text: "August 30, 1941. Your team is in a pennant race, trailing by a game and a half. Your pitcher throws a no-hitter — only 3 batters reach base. The franchise's third no-hitter. The pennant race continues. The hummingbird sings his finest song.",
      origin: "Warneke threw a no-hitter for the Cardinals on August 30, 1941 vs. Cincinnati during a tight pennant race.",
    },
    {
      title: "From Pitcher to Umpire to Judge",
      type: "Drama",
      text: "Your retired ace becomes a National League umpire. He never ejects anyone. He umpires in the All-Star Game and the World Series — the same events he played in. Then he becomes a county judge in Arkansas. Pitcher, umpire, judge. Three careers, three lives, one man.",
      origin: "Warneke is the only person to play AND umpire in both an ASG (played 1933, umpired 1952) and WS (played 1932/35, umpired 1954). He served as County Judge of Garland County, Arkansas, 1963-72.",
    },
    {
      title: "Fifty Dollars a Winter",
      type: "Action",
      text: "Your ace is asked about his offseason plans. His response: 'Heck, I can live a whole winter down home for fifty dollars. I can't live a week up North for that.' He goes back to Arkansas, hunts, fishes, rides horses, and waits for spring. The cheapest ace in baseball.",
      origin: "Warneke's famous quote about his frugal Arkansas lifestyle.",
    },
    {
      title: "The Tombstone Says 'Arkansas Hummingbird'",
      type: "Drama",
      text: "Your pitcher dies at home in Hot Springs at 67. He's buried in the family cemetery at Owley, Arkansas — six miles from where he was born. His daughter designs the tombstone: an iris bouquet, and below it, the words 'Arkansas Hummingbird.' He came from nothing, won 192 games, struck out Ruth and Gehrig, umpired the World Series, judged a county, and went home to Owley.",
      origin: "Warneke's tombstone in Owley Cemetery, Montgomery County, Arkansas, reads 'Arkansas Hummingbird' beneath an iris bouquet designed by his daughter Lonnie Pat.",
    },
  ],

  art_direction: {
    face: "Tall, lean, red-haired (the Warnekes had red hair). 6'2\" 185 lbs. Country boy face — open, honest, slightly mischievous. Not as flashy as Dean, not as intense as Hubbell. The face of a man who could pitch a one-hitter, catch a snake, play the banjo, and judge a county court — all with the same calm expression.",
    attire: "Chicago Cubs 1932 home whites. Wrigley Field behind him. The windup — overhand curve delivery, the 'hummingbird' fastball about to dart. Or: the Arkansas backdrop — Ouachita Mountains, dirt roads, the 160-acre farm. A banjo or guitar leaning against the dugout wall.",
    mood: "Rural Americana meets big-league craft. The card should feel like a warm spring morning in Arkansas — the sun coming up over the mountains, the ball humming out of his hand. Not flashy, not dramatic. Steady, beautiful, and slightly wild (there's a snake somewhere in this picture).",
    style: "Warmer than the other pitching cards. Cubs blue and white, or Cardinals red, but always with Arkansas green and brown underneath. The Ouachita Mountains in the background. This is the card of a man who lived his whole life between the mound and the mountains.",
    reference: "The card of the Arkansas Hummingbird. The man who struck out Ruth and Gehrig in the first All-Star Game and nobody remembers. The man whose scout wrote 'screwball, forget him.' The man who smuggled snakes into dugouts. The man who became an umpire and never ejected anyone. The man who became a county judge. The man whose tombstone says 'Arkansas Hummingbird.' Lon Warneke — the quietest great pitcher of the 1930s.",
  },
};

const STAT_ENGINE = {
  stuff: { metric: "K + Dominance", tiers: [{ range: "K < 100", value: 0 },{ range: "K 100-149", value: 1 },{ range: "K 150-199", value: 2 },{ range: "K 200-249", value: 3 },{ range: "K 250-299", value: 4 },{ range: "K 300+", value: 5 }], bonus: "None for Warneke — K rate was low" },
  control: { metric: "WHIP + BB/9", tiers: [{ range: "WHIP > 1.40", value: 0 },{ range: "WHIP 1.30-1.40", value: 1 },{ range: "WHIP 1.15-1.29", value: 2 },{ range: "WHIP 1.00-1.14", value: 3 },{ range: "WHIP < 1.00", value: 4 }], bonus: "Led NL in ERA → +1 (cap 4)" },
  stamina: { metric: "IP + CG", tiers: [{ range: "IP < 180", value: 0 },{ range: "IP 180-219", value: 1 },{ range: "IP 220-259", value: 2 },{ range: "IP 260-299", value: 3 },{ range: "IP 300+", value: 4 }], bonus: "20+ CG → +1 (cap 5)" },
  overall_sp: { formula: "STFx2 + CTLx2 + STAx1 + DEFx1 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / Ace" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason + signature moments", tiers: [{ range: "No PS or poor PS", value: 0 },{ range: "Average PS", value: 1 },{ range: "Good PS", value: 2 },{ range: "WS hero", value: 3 }] },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function LonWarnekeCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = WARNEKE_DATA;
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Tall, red-haired, overhand curve delivery, Cubs whites, Wrigley Field, Ouachita Mountains in the distance, banjo in the dugout]</div>
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
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1932 — LED NL IN W/ERA/SHO/W% — NL MVP RUNNER-UP</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ 5× All-Star", "📊 192-121 (.613)", "🏆 2-1 WS (2.63 ERA)", "🎵 Mudcats Guitarist", "🐍 Snake Wrangler", "⚖️ County Judge", "👔 NL Umpire", "🏔️ Owley, Arkansas"].map((a, i) => (
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
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Warneke's real life, playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Pitcher Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Warneke's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
