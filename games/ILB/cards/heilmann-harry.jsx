// /cards/players/harry-heilmann.jsx
import { useState } from "react";

const HEILMANN_DATA = {
  name: "Harry Heilmann",
  nickname: "Slug / Harry the Horse",
  year: 1923,
  team: "Detroit Tigers",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "RF",
  bats: "R",
  throws: "R",
  height: '6\'1"',
  weight: "200 lbs",
  born: "August 3, 1894 — San Francisco, California",
  died: "July 9, 1951 — Southfield, Michigan (age 56, lung cancer)",
  hof: "Inducted 1952 (posthumous, BBWAA — 86.7%). .342 career BA (12th all-time, 3rd among RHH behind Hornsby and Delahanty). Four AL batting titles (1921, 1923, 1925, 1927). .403 BA in 1923 — one of six AL players to hit .400. 2,660 H, 542 2B, 1,543 RBI. #54 on Sporting News 100 Greatest Players (1998). Ty Cobb: 'Next to Rogers Hornsby, he was the best right-handed hitter of them all.'",

  real_stats: {
    season: 1923,
    batting_avg: ".403",
    obp: ".481",
    slg: ".632",
    ops: "1.113",
    hits: 211,
    runs: 121,
    doubles: 44,
    triples: 11,
    home_runs: 18,
    rbi: 115,
    walks: 74,
    strikeouts: 40,
    stolen_bases: 9,
    war: 9.3,
    career_batting_avg: ".342",
    career_obp: ".410",
    career_slg: ".520",
    career_ops: ".930",
    career_hits: 2660,
    career_hr: 183,
    career_rbi: 1543,
    career_2b: 542,
    career_war: 72.2,
    batting_titles: "4 (1921: .394, 1923: .403, 1925: .393, 1927: .398)",
    ops_plus: 148,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION — 1923 SEASON (PEAK)
  //
  // CON: .403 BA (hit .400!), .481 OBP, 211 H, 74 BB, 40 K. Four batting titles.
  //      12th highest BA in history. 12 consecutive .300 seasons. Career .342.
  //      Only struck out 40 times while hitting .403. "Near-perfect swing" — Cobb.
  //      Line drive hitter who sprayed gaps. CON = 5 (MAXIMUM — one of the purest hitters ever).
  //
  // POW: 18 HR, .632 SLG, 44 2B, 11 3B, 115 RBI, 331 TB. Hit a reported 610-foot HR (1921).
  //      Not a power hitter by modern standards, but enormous gap power — 542 career 2B (6th at retirement).
  //      .583 SLG in 1921-27 peak (4th in AL decade behind Ruth, Gehrig, Simmons).
  //      He hit LINE DRIVES, not fly balls. The power was in the doubles, not the HR.
  //      POW = 3 (elite gap power, not a homer hitter).
  //
  // SPD: Tommy Holmes: "Without doubt, the slowest moving great hitter who ever lived."
  //      Nickname "Slug" was for his slow speed, not his hitting. 9 SB in 1923. 113 career SB.
  //      Cobb's speed added 50 hits to his output; Heilmann's slowness robbed him of infield hits.
  //      SPD = 0 (MINIMUM — historically slow for a great player).
  //
  // DEF: Led AL 1B in errors both years at 1B (1919-20, 31 errors in 1919). In RF, adequate.
  //      Not a good fielder at any position. Played RF/1B/CF and struggled at all three.
  //      DEF = 0 (below average everywhere he played).
  //
  // CLU: ZERO postseason appearances. Detroit never won a pennant during his career.
  //      Closest: 4 games out in 1916. He never once played in October.
  //      BUT: won batting titles in contract years. "I always bear down real hard when a new contract is coming up."
  //      CLU = 0 (no postseason to judge, but the contract year clutch counts for something).
  //      Leaving at 0 because CLU in ILB measures postseason performance.
  //
  // OVR: CON×2(10) + POW×2(6) + SPD×0.5(0) + DEF×0.5(0) + CLU×1.5(0) = 16 → normalized ~8
  // OVR = 8 (ALL-STAR) — devastating bat dragged down by zero speed, poor defense, no postseason.
  // This is the gap between Heilmann and Sisler/Ruth/Gehrig: he could only hit. But LORD could he hit.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,
    con: 5,    // MAXIMUM. .403 in 1923. Four AL batting titles. .342 career (12th all-time, 3rd RHH). "Near-perfect swing." 12 consecutive .300 seasons. 40 K while hitting .400. The purest right-handed hitter in the American League.
    pow: 3,    // Elite gap power. 44 2B, .632 SLG, 542 career 2B (6th at retirement). 18 HR. Not a fly ball hitter — he lined drives into gaps. The 610-foot HR (1921) was the exception. The doubles were the rule.
    spd: 0,    // MINIMUM. "The slowest moving great hitter who ever lived." Called "Slug" for his speed, not his bat. Cobb: his slowness cost him 50 hits per year in infield singles.
    def: 0,    // Below average. Led AL 1B in errors both years at first. Mediocre in RF/CF. Tried multiple positions, struggled at all of them.
    clu: 0,    // Zero postseason. Detroit never won the pennant during his career. The closest was 4 games out in 1916. He literally never played a postseason game.
  },

  stat_justification: {
    con: "Harry Heilmann hit .403 in 1923. He is one of six players in AL history to reach .400. He won four batting titles — .394, .403, .393, .398 — all in odd years when his contract was up. His career .342 BA is 12th in history and 3rd among right-handed batters (behind only Hornsby and Delahanty). He hit over .300 for twelve consecutive seasons (1919-1930). In 1923, he struck out only 40 times in 524 AB while hitting .403 — that's a K rate below 8%. Ty Cobb: 'I never toyed with Heilmann's swing, it was already near-perfect.' Grantland Rice rated him the premier scholar in the 'School of Swat' ahead of Cobb and Ruth. He was the American League's answer to Rogers Hornsby. There is no higher rating than 5 for Contact.",
    pow: "Heilmann was a line drive hitter, not a fly ball slugger. His power came from doubles — 44 in 1923, 542 career (6th in history at retirement). He hit 18 HR in 1923 with a .632 SLG. In his 1921-27 peak, he averaged .583 SLG — 4th in the AL decade behind only Ruth, Gehrig, and Simmons. In 1921, he reportedly hit a 610-foot home run that made 'patrons gasp in astonishment.' But the HR totals (183 career) reflect a gap hitter, not a slugger. His eight 100-RBI seasons came from relentless doubles and triples production. Rating of 3.",
    spd: "Hall of Fame sportswriter Tommy Holmes: 'Heilmann was never much faster than an ice wagon on the base paths. Without doubt, he is the slowest moving great hitter who ever lived.' His nickname 'Slug' referred to his speed, not his hitting. Another writer noted that Cobb's speed added 50 hits per year to his output, while Heilmann's lack of speed robbed him of infield hits — the one thing keeping him from matching Hornsby. He stole 9 bases in 1923 and 113 for his career, mediocre numbers even for a slow era. Rating of 0.",
    def: "Heilmann led the AL in errors at first base in both 1919 (31 errors!) and 1920. In 1917, the Tigers tried him in right field (95 games), center field (28), and first base (27) — he was not particularly good at any position. He was moved back to right field in 1921, where he was adequate but never better. The Tigers kept him in the lineup purely because of his bat. Rating of 0.",
    clu: "Harry Heilmann never played in a single postseason game. The closest Detroit came during his tenure was 4 games behind in 1916. While he won batting titles in contract years ('I always bear down real hard when a new contract is coming up'), there is no October data to evaluate. In a system that weights clutch performance heavily, Heilmann's zero postseason exposure is a significant gap. Rating of 0.",
  },

  personality: {
    leadership_style: "QUIET GENEROSITY. Heilmann was not loud, not theatrical, not a showman. He went about his work 'calmly, methodically, almost bashfully.' He blushed when fans gave him standing ovations. He refused to talk about his Detroit River rescue. He sold insurance in the offseason and used his connections to help the Capuchin Soup Kitchen raise money for decades. His leadership was the leadership of a man who didn't know he was leading — the kind who inspires by example rather than declaration.",
    temperament: "Modest, warm, unpretentious. When journalists reported him leading the league, 'little comment is made.' He never courted applause. He was 'not a grandstander — not theatrical.' His parents initially feared he was doing something criminal because he was bringing home so much money from baseball. He was the kind of player whose greatness was recognized only by those paying close attention — and then often credited to Cobb's coaching. He bore the shadow gracefully.",
    work_ethic: "QUIET BUT RELENTLESS. Heilmann batted .282 in his first six seasons and .380 for the next seven. He didn't suddenly get talent — he learned. Whether Cobb coached him or the lively ball helped or he simply matured, Heilmann's improvement was one of the most dramatic in baseball history. He worked at his craft. He also worked as an insurance agent in the offseason. He later worked at broadcasting until he became beloved. He always worked.",
    lifestyle: "San Francisco kid, Detroit institution. Heilmann spent his entire adult life becoming part of Detroit's fabric. He rescued people from the river. He sold insurance. He called games on the radio for 17 years. He helped the Capuchin brothers feed the poor. He convinced Mickey Mantle and Ted Williams to attend charity fundraisers. He was a parishioner of the Shrine of the Little Flower. He became Detroit in a way that transcended baseball.",
    era_adaptability: "COMPLICATED. Heilmann's .403 season came in a high-offense era, and his line drive approach was perfectly suited to the dead/live ball transition. In a modern context, his zero speed and poor defense would limit his value. But .342 career BA with that contact rate? His bat-to-ball skill would translate. He'd be a DH in modern baseball — and an elite one. The K rate (sub-8% in 1923) is staggering by any era's standards.",
    clubhouse_impact: "BELOVED. Heilmann was friends with Babe Ruth despite beating him for batting titles. He sold Ruth life insurance. He worked fundraisers. He became the voice of the Tigers for a generation of fans. He was modest enough to never mention his river rescue. Walter Briggs upon his death: 'I doubt whether the death of any other person in the State of Michigan could cause more genuine regret.' In ILB, Heilmann provides +1 to team morale through sheer likability.",
    dark_side: "THE SHADOW. Heilmann played his entire career in someone else's shadow. First Cobb (his manager and outfield partner), then Ruth (who he beat for batting titles but who got all the headlines). A reporter wrote that his feats never got 'full credit' because 'there is nothing picturesque, nothing highly colored, nothing bombastic nor spectacular about his methods.' He was a man who hit .403 and finished third in MVP voting. His most famous baseball card isn't even his face — it's teammate Larry Woodall, mislabeled by the AP for decades. In death, he was elected to the Hall of Fame six months after he died. Cobb pushed for his election but it came too late for Harry to know. The shadow is the trait: in ILB, Heilmann's OVR appears 2 lower than actual when another player with OVR 10+ is on his team. He gets better — but nobody notices.",
  },

  chemistry_traits: [
    { tag: "The Odd-Year Man", desc: "Won batting titles in 1921, 1923, 1925, 1927 — every other year. 'Mr. Navin gives me contracts on a two-year basis. I always bear down real hard when a new contract is coming up.' In ILB, Heilmann's CON is +1 in contract years (odd-numbered seasons) and -1 in off-years (even-numbered)." },
    { tag: "Cobb's Shadow", desc: "Ty Cobb was Heilmann's teammate, manager, and outfield partner. Cobb: 'Next to Hornsby, the best right-handed hitter of them all.' But Heilmann got credit for nothing. In ILB, when paired with any OVR 10+ teammate, Heilmann's OVR appears 2 lower — but his actual stats are unaffected. The shadow hides the truth." },
    { tag: "The River Rescue", desc: "July 25, 1916: car goes into the Detroit River. Heilmann dives in. Saves three lives. Two die. His brother Walter drowned in 1908. In ILB, once per season, Heilmann can attempt a 'rescue play' — sacrifice his at-bat to save a teammate's injury roll. Automatic success." },
    { tag: "The Insurance Agent", desc: "Heilmann sold Babe Ruth a $50,000 life insurance policy after Ruth's WS share. In ILB, Heilmann provides +1 to team financial stability and contract negotiations. He's the guy who protects the investment." },
    { tag: "McManus's Victim", desc: "June 30, 1926: Marty McManus pulled the hidden ball trick on Heilmann, with Ty Cobb coaching third base. In ILB, Heilmann is vulnerable to the hidden ball trick — McManus's 'Hidden Ball Trick' trait automatically succeeds against Heilmann (no d6 roll). The cross-card link is built into the embarrassment." },
    { tag: "The Wrong Face", desc: "Heilmann's most famous baseball card (1960 Fleer) is actually teammate Larry Woodall. The mislabeled AP photo was used for decades. In ILB, Heilmann's card can be 'mistaken' for another player once per game — opponent's scouting report is wrong, granting +1 surprise factor on first AB." },
    { tag: "The Voice of Detroit", desc: "After retirement, Heilmann became the Tigers' radio broadcaster for 17 years (1934-1950). He became more beloved as a voice than as a player. In ILB, post-retirement Heilmann provides +2 to franchise popularity and fan engagement — he builds the legacy even after the bat goes silent." },
    { tag: "Four Hundred Three", desc: ".403 in 1923. One of six AL players to ever hit .400. In ILB, when Heilmann's running BA is above .400 at any point in the season, he enters 'The Zone' — +1 to all offensive stats until it drops below .400." },
  ],

  preferred_locations: [
    { location: "Navin Field, Detroit", affinity: "MAXIMUM", note: "15 seasons (1914-1929). The only home he ever knew in baseball. Four batting titles. Detroit River rescue nearby. Harry Heilmann Day (1926) — they gave him a car, a diamond pin, and a hunting dog." },
    { location: "The Batter's Box", affinity: "MAXIMUM", note: ".342 career BA. .403 peak. The batter's box was the one place Heilmann belonged completely — no shadow, no comparison, just the bat and the ball." },
    { location: "The Radio Booth", affinity: "HOME (Post-Career)", note: "17 years calling Tigers games (1934-1950). He became Detroit. 'You can take your Barbers and Gowdys and McNamees — we'll never have another like the Old Slug.'" },
    { location: "Detroit River", affinity: "SACRED", note: "Where he dove in to save drowning strangers on July 25, 1916. His brother Walter had drowned in San Francisco Bay in 1908. The river is where Heilmann became something more than a ballplayer." },
    { location: "San Francisco, California", affinity: "ORIGIN", note: "Born here. His brother Walter drowned here. Heilmann left and never came back. Detroit became his city." },
  ],

  momentum: {
    hot_triggers: [
      "Contract year — 'I always bear down real hard when a new contract is coming up.' .394, .403, .393, .398 in odd years.",
      "Line drive count — when Heilmann is hitting line drives, he enters a rhythm that's nearly impossible to break.",
      "Ty Cobb's approval — whether coaching or managing, Cobb's acknowledgment drove Heilmann to his peak.",
      "Doubles production — 44 2B in 1923. When the doubles are falling, Heilmann is locked in.",
    ],
    cold_triggers: [
      "Even years — .356, .346, .328 in the off-years. Still excellent. But not .400.",
      "Postseason pressure — not because he choked, but because he never got there. The absence is the cold trigger.",
      "Fielding demands — any time Heilmann is asked to do something other than hit, the performance drops.",
      "Arthritis (career-ending) — from 1928 on, his hands betrayed him. .328, .344, .333 — still good, but the .400 magic was gone.",
    ],
    pressure_response: "UNKNOWABLE. This is the tragedy of Harry Heilmann. He never played in a World Series. He never had a Game 7 at-bat. He won batting titles in contract years, which suggests he elevated under financial pressure — but the October pressure was never applied. We'll never know what .403 Harry Heilmann would have done in the World Series. CLU = 0 not because he failed, but because the test was never given. The absence is the loudest thing about his card.",
  },

  action_card_seeds: [
    {
      title: "Four Hundred Three",
      type: "Season Arc",
      text: "Your hitter bats .403. He is one of six men in American League history to reach .400. He leads the league in batting average by ten points over Babe Ruth. He finishes third in MVP voting. He goes home and sells Ruth a $50,000 life insurance policy. The world remembers Ruth. Your hitter sells the policy and goes back to work.",
      origin: "1923: Heilmann hit .403, denied Ruth the Triple Crown, finished 3rd in MVP behind Ruth and Collins, then sold Ruth life insurance in the offseason.",
    },
    {
      title: "The River",
      type: "Drama",
      text: "July 25, 1916. A car goes off a dock and into the Detroit River. Five people inside. Your hitter is driving nearby. He stops his car. He dives into the river. He saves three. Two die — a woman and her three-year-old daughter. Your hitter's brother Walter drowned in San Francisco Bay eight years ago. He was seventeen. Your hitter says nothing to the press. The next day, the crowd gives him a standing ovation. Reporters can see him blushing clear around to the back of his neck.",
      origin: "Heilmann's Detroit River rescue, July 25, 1916. Three saved, two died. His brother Walter drowned in 1908.",
    },
    {
      title: "The Odd Years",
      type: "Game Mechanic",
      text: ".394. .403. .393. .398. Every other year, your hitter wins the batting title. A reporter points out the pattern. Your hitter replies: 'Mr. Navin gives me contracts on a two-year basis. I always bear down real hard when a new contract is coming up.' Is he joking? Nobody knows. The numbers say he isn't.",
      origin: "Heilmann won AL batting titles in 1921, 1923, 1925, 1927 — exclusively in odd years. His explanation about contract cycles became one of baseball's great one-liners.",
    },
    {
      title: "The Wrong Face",
      type: "Legacy / Comedy",
      text: "In 1960, Fleer releases a baseball card with your hitter's name on it. The face belongs to Larry Woodall, a backup catcher. The AP mislabeled the photo decades ago. Nobody catches the error. The wrong face appears on trading cards, websites, and reference books for fifty years. Your hitter hit .403 and the world cannot even remember what he looked like.",
      origin: "The famous mislabeled AP photo of Larry Woodall used as 'Harry Heilmann' on the 1960 Fleer card and subsequent reprints, uncorrected until the 2010s.",
    },
    {
      title: "McManus's Trick",
      type: "Game Action",
      text: "June 30, 1926. Your hitter reaches third base. Ty Cobb is coaching third. Marty McManus of the St. Louis Browns has the ball hidden in his glove. Your hitter steps off the bag. Out. Ty Cobb — the greatest baseball mind of his generation — was standing right there and did not see it coming. Neither did your hitter. McManus smiles. The crowd gasps. In baseball, anyone can be fooled.",
      origin: "McManus pulled the hidden ball trick on Heilmann with Cobb coaching 3B, June 30, 1926. Cross-links to McManus card.",
    },
    {
      title: "The Slowest Great Hitter",
      type: "Character",
      text: "'Without doubt, he is the slowest moving great hitter who ever lived.' Your hitter does not beat out infield hits. Your hitter does not steal bases. Your hitter does not cover ground in the outfield. Your hitter hits .403 anyway. He hits line drives into gaps that no amount of speed could catch. He doesn't need legs. He needs the bat.",
      origin: "Tommy Holmes quote. Heilmann's nickname 'Slug' referred to his speed. The sportswriter estimated Cobb's speed added 50 hits per year while Heilmann's slowness cost him the same.",
    },
    {
      title: "The Voice",
      type: "Legacy",
      text: "After the bat goes silent, your hitter picks up a microphone. For seventeen years, he is the voice of the Detroit Tigers. He is clumsy at first — 'he met the English language and, ambushed, fled behind his Maginot Line.' But he works at it the way he worked at hitting. He gets better. He stays long enough to become beloved. He tells stories about Cobb and Ruth. He raises money for soup kitchens. He becomes Detroit in a way that transcends the box score. He dies three days before the All-Star Game at his home ballpark. They have a moment of silence.",
      origin: "Heilmann's 17-year radio career (1934-1950). Died July 9, 1951, days before the ASG at Briggs Field. Elected to HOF posthumously in Jan 1952.",
    },
    {
      title: "The Shadow's Shadow",
      type: "Drama",
      text: "First, Cobb's shadow. Then Ruth's. When the weekly averages are published, the headline reads 'Heilmann Leads Hitters' — and beyond that, little comment is made. He is not picturesque. He is not highly colored. He is not bombastic nor spectacular. He is the greatest right-handed hitter in the American League and nobody gives him full credit. He does not court the applause of the crowds. He is modest to a point where he almost shuns it. He proves that no matter how great a man and his deeds are, he must be something of an actor to win the ovations he so richly deserves.",
      origin: "Paraphrased from a 1920s sportswriter's lament about Heilmann's lack of recognition despite leading the AL in hitting.",
    },
  ],

  art_direction: {
    face: "6'1\" 200 lbs — big, broad, handsome in a plain way. Irish-German features. 'Pleasant-faced.' Not theatrical, not fierce — WARM. This is the face of a man who blushes when people applaud him. The eyes are intelligent but not piercing. He looks like a man who would sell you insurance and mean it. He looks like a man who would dive into a river to save a stranger and then refuse to talk about it.",
    attire: "Detroit Tigers 1923 home whites — the old English 'D' on the left chest. In a line-drive swing — the bat connecting with the ball, the ball launching on a rope into the right-center gap. Or: standing in the box, bat cocked, eyes steady, waiting for the pitch. The swing should suggest contact, not power. This is a man who hit .403 with line drives, not moon shots.",
    mood: "WARM OBSCURITY. This card should feel like a late afternoon in Detroit — golden light, unhurried, generous. There is no drama in this card, no menace, no fear. There is only the quiet excellence of a man who did his job better than almost anyone and was noticed by almost no one. The mood is the mood of a great radio broadcast — intimate, knowledgeable, present, and fading when the broadcast ends.",
    style: "Full color — Bashers era — but GOLDEN and SOFT. Detroit's old English D, tiger orange, white. The dominant tone is WARM AMBER — late afternoon tiger light, the glow of a radio dial in a living room, the color of a batting average that keeps climbing. NOT sharp like Cochrane. NOT dark like Coveleski. NOT blazing like Ruth. WARM. A card you want to hold. The border should be tiger-orange, fading to amber — the color of a voice on the radio, the color of a line drive in the gap, the color of a man who hit .403 and whose face nobody remembers.",
    reference: "Ruth is the solar system. Gehrig is the axis. Coveleski is the mineshaft. Heilmann is THE RADIO — everywhere, beloved, warm, and invisible. You hear the voice but you don't see the face. The card should feel like a broadcast — present and absent simultaneously. .403 and nobody noticed. The radio plays on.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", tigerOrange: "#d45b0b", tigerNavy: "#0c2340", amber: "#d4920b" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.tigerOrange}10`, border: `1px solid ${C.tigerOrange}25`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.warmRed, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.tigerNavy, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.tigerOrange}30`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function HarryHeilmannCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = HEILMANN_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.tigerNavy} 0%, #1a1510 50%, ${C.tigerNavy} 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.cream, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.amber, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ALL-STAR CARD — Bashers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.tigerOrange}`, boxShadow: `0 0 0 2px ${C.amber}, 0 0 20px ${C.tigerOrange}20, 0 10px 36px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.tigerNavy}, #1a2030, ${C.tigerNavy})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.cream, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.tigerOrange}40`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.amber}15, ${C.tigerOrange}08, ${C.gold}10)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>📻</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE RADIO</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.tigerNavy, color: C.cream, padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.tigerOrange}ee`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.tigerNavy}dd`, color: C.cream, padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ALL-STAR</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.tigerOrange} />
              <StatBar label="POW" value={s.pow} max={5} color={C.amber} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.tigerNavy}, #1a2030)`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS", val: d.real_stats.ops },{ label: "H", val: d.real_stats.hits },{ label: "2B", val: d.real_stats.doubles },{ label: "RBI", val: d.real_stats.rbi },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1923 — .403 BA — ONE OF SIX AL PLAYERS TO HIT .400 — 4× BATTING CHAMPION</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.tigerOrange}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.tigerOrange}20` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_batting_avg },{ label: "CAR H", val: "2,660" },{ label: "CAR 2B", val: d.real_stats.career_2b },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: "1,543" },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "HOF", val: "1952" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.tigerNavy, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.6 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛️ HOF 1952", "🏅 4× AL Batting Champ", "📊 .403 BA (1923)", "🐌 Slowest Great Hitter Ever", "🌊 Detroit River Hero", "📻 Voice of the Tigers", "💼 Sold Ruth Insurance", "🔄 Odd-Year Man"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.tigerOrange}10`, border: `1px solid ${C.tigerOrange}20`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ALL-STAR DOSSIER — {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.tigerOrange}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.tigerNavy : "transparent", color: tab === t.id ? C.cream : C.medBrown, border: `1px solid ${tab === t.id ? C.tigerNavy : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.warmRed }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "MAXIMUM" ? `${C.gold}20` : l.affinity === "HOME (Post-Career)" ? `${C.coldBlue}20` : l.affinity === "SACRED" ? `${C.warmRed}20` : `${C.traitGreen}20`, color: l.affinity === "MAXIMUM" ? C.gold : l.affinity === "HOME (Post-Career)" ? C.coldBlue : l.affinity === "SACRED" ? C.warmRed : C.traitGreen, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events from Heilmann's real life, transformed into universal action cards.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.tigerOrange}05`, border: `1px solid ${C.tigerOrange}15`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Legacy" ? `${C.sepia}20` : a.type === "Legacy / Comedy" ? `${C.amber}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.tigerNavy}, #1a2030, ${C.tigerNavy})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ALL-STAR #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
