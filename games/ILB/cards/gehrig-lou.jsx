// /cards/players/lou-gehrig.jsx
import { useState } from "react";

const GEHRIG_DATA = {
  name: "Lou Gehrig",
  nickname: "The Iron Horse",
  year: 1927,
  team: "New York Yankees",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "1B",
  bats: "L",
  throws: "L",
  height: '6\'0"',
  weight: "200 lbs",
  born: "June 19, 1903 — New York, NY",
  died: "June 2, 1941 — New York, NY (age 37)",
  hof: "Inducted 1939 — special election, five-year waiting period waived. First player to have his number (#4) retired. Voted greatest first baseman of all time (BBWAA, 1969). Leading vote-getter on MLB All-Century Team (1999).",

  real_stats: {
    season: 1927,
    games: 155,
    at_bats: 584,
    hits: 218,
    doubles: 52,
    triples: 18,
    home_runs: 47,
    rbi: 175,
    stolen_bases: 10,
    batting_avg: ".373",
    obp: ".474",
    slg: ".765",
    ops: "1.240",
    runs_scored: 149,
    walks: 109,
    strikeouts: 84,
    war: 12.8,
    total_bases: 447,
    extra_base_hits: 117,
    career_avg: ".340",
    career_hits: 2721,
    career_hr: 493,
    career_rbi: 1995,
    career_runs: 1888,
    career_obp: ".447",
    career_slg: ".632",
    career_ops: "1.080",
    career_war: 113.8,
    career_2b: 534,
    career_3b: 163,
    career_grand_slams: 23,
    consecutive_games: 2130,
    ws_titles: 6,
    ws_appearances: 7,
    ws_avg: ".361",
    ws_slg: ".731",
    ws_hr: 10,
    ws_rbi: 35,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION — 1927 SEASON
  //
  // CON: .373 BA → tier 5 (.330+). 218 H. .474 OBP. Career .340. 2,721 H. CON = 5 (MAXIMUM).
  // POW: 47 HR → tier 4 (40-49). .765 SLG. 175 RBI. But career: 493 HR, .632 SLG, 23 grand slams, 185 RBI (1931). SLG bonus → +1. POW = 5 (MAXIMUM).
  // SPD: 10 SB (1927). Career high 15. Good baserunner (163 career triples). SPD = 1.
  // DEF: Solid 1B. Not a Gold Glover. Good hands, reliable. DEF = 0.
  // CLU: 6 of 7 WS won. .361 WS BA. .731 WS SLG. 10 WS HR. 35 WS RBI. CLU = 3 (MAXIMUM).
  // OVR: CON×2(10) + POW×1.5(7.5) + SPD×1(1) + DEF×0.5(0) = 18.5 → normalized ~12
  // OVR = 12 (LEGEND) — second highest possible. One step below Ruth. Always one step below. That is the tragedy.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 12,     // LEGEND — The second-highest rating in ILB. One below Ruth. Always one below Ruth. Gehrig's 1927 was arguably better than Ruth's 1927 — he outhit Ruth (.373 to .356), nearly matched him in OBP (.474 to .486), and had more RBI (175 to 164). But Ruth hit 60 HR, and 60 > 47, and the world chose its hero. Gehrig was the best player to ever be second-best on his own team. OVR 12 is not a consolation — it is a monument. But it is a monument in Ruth's shadow.
    con: 5,      // MAXIMUM. .373 in 1927. .340 career. 218 H (1927). 2,721 career. .474 OBP (1927). .447 career. 8 seasons with 200+ hits. 7 seasons with 200+ hits AND 100+ walks. He was the most complete hitter of his era — possibly any era. Ruth reached base more, but Gehrig hit for average AND power AND discipline at a level no first baseman has ever matched.
    pow: 5,      // MAXIMUM. 47 HR in 1927. 49 in both 1934 and 1936. 493 career. .765 SLG (1927). .632 career (3rd all-time). 23 career grand slams (record for 70+ years). 185 RBI in 1931 (AL record, still stands). Three of the six highest RBI seasons in history. He hit the ball as hard as Ruth — just less often over the fence. The power was relentless, not spectacular, which is why it was overlooked.
    spd: 1,      // 10 SB in 1927. Career high 15. 163 career triples (excellent for a 1B). Good baserunner, smart on the paths. Not fast, but efficient. The triples are the tell — he ran hard every time because that's who he was. SPD = 1.
    def: 0,      // Solid, reliable first baseman. Good hands, consistent. But not a defensive standout — no Gold Gloves (award didn't exist), no reputation as elite with the glove. He was there every day and he caught what came to him. DEF = 0.
    clu: 3,      // MAXIMUM. 6 of 7 World Series won. .361 WS BA. .731 WS SLG. 10 WS HR. 35 WS RBI in just 34 games. 1.214 WS OPS — tied with Ruth for 3rd best in WS history. He was BETTER in October than in the regular season — .361 vs .340 BA, .731 vs .632 SLG. Gehrig didn't just perform in the postseason — he elevated. CLU = 3.
  },

  stat_justification: {
    con: ".373 in 1927 — higher than Ruth's .356. Career .340. 2,721 hits in just 17 seasons (shortened by ALS). 218 H in 1927. 8 seasons with 200+ H. .474 OBP in 1927, .447 career. Seven times he achieved 200+ H AND 100+ BB in the same season — a feat of combined contact and discipline almost no one else has matched. From 1927-37, every single season: .300+ BA, .424+ OBP, .583+ SLG. Eleven straight years of that. Only Cobb, Ruth, and Bonds also produced 11 qualifying seasons with 165+ OPS+. Rating of 5 — MAXIMUM.",
    pow: "47 HR in 1927 — would have been the record in almost any other year, but Ruth hit 60. 493 career HR. .765 SLG (1927). .632 career SLG (3rd all-time behind Ruth and Williams). 23 career grand slams — record for over 70 years. 185 RBI in 1931 — the AL record, which STILL stands. Three of the six highest RBI seasons in history (185, 175, 173). 534 career 2B. 447 TB in 1927 (3rd all-time). 117 XBH in 1927 (2nd all-time to Ruth's 119). Triple Crown 1934: .363/49/166. The power was as immense as Ruth's — the difference was 13 HR in one season and the world decided who was king. Rating of 5 — MAXIMUM.",
    spd: "10 SB in 1927. 163 career triples — remarkable for a first baseman, indicating real speed in his prime. He was considered an excellent baserunner until ALS began to affect his coordination. Not a speed threat, but not slow either. He ran hard on every play because he didn't know another way. Rating of 1.",
    def: "Solid, reliable, there every day. Led AL 1B in assists 3 times, putouts 3 times. Good hands. But not elite — not in the class of Sisler or Hal Chase defensively. His value was almost entirely offensive. The 2,130 consecutive games are a testament to his durability, not his glove. Rating of 0.",
    clu: "The postseason numbers are staggering. .361 WS BA — higher than his career .340. .731 WS SLG — higher than his career .632. 10 WS HR and 35 WS RBI in just 34 games. The Yankees won 6 of the 7 World Series he played in. His 1.214 WS OPS ties Ruth for 3rd-best in WS history. He got better when it mattered. In 1928 WS, he hit .545 with 4 HR and 9 RBI in a 4-game sweep. In 1932 WS (the Called Shot game), Gehrig hit 3 HR and 8 RBI — overshadowed by Ruth's legend. He was the greatest postseason hitter of the pre-modern era. Rating of 3 — MAXIMUM.",
  },

  personality: {
    leadership_style: "Quiet authority. Gehrig was named Yankees captain in 1935 — the team didn't name another captain until Thurman Munson in 1976. He led by presence, by showing up every single day, by never complaining, never missing a game, never asking for anything. His teammates revered him in a way they never revered Ruth — not with awe, but with deep respect. He was the foundation. Ruth was the weather; Gehrig was the ground.",
    temperament: "Reserved, humble, dutiful. The son of German immigrants who valued work above all else. His father was a metalworker often out of work; his mother Christina took in laundry, cooked, cleaned. Lou absorbed their ethic — head down, work hard, don't complain, don't show off. He was painfully shy. He lived with his parents until age 30. His mother ruined every romance until Eleanor Twitchell. He was the antithesis of Ruth in every way except one: at the plate, they were equals.",
    work_ethic: "ABSOLUTE. The streak — 2,130 consecutive games — is the physical proof. He played through broken fingers (X-rays taken after his death revealed multiple fractures nobody knew about). He played through back spasms. He was hit in the head by a pitch and stayed in the game. His GM once faked a rainout when Gehrig was sick, to protect the streak. His wife tried to trick him into stopping at 1,999 games. He played every single day for fourteen years because that was what his parents would have wanted, because that was what the team needed, because that was who he was.",
    lifestyle: "Modest, almost ascetic compared to Ruth. Earned well but lived simply. Married Eleanor in 1933 — she was his first real relationship, his mother having driven away all previous girlfriends. They were devoted to each other. Eleanor never remarried after Lou's death and spent the rest of her life (until 1984) preserving his legacy. He didn't drink to excess, didn't carouse, didn't make headlines. The press nicknamed him 'Biscuit Pants' — a gentle tease for his quiet, doughy earnestness.",
    era_adaptability: "SUPREME. Gehrig's .340/.447/.632 career line would be elite in any era. His 113.8 WAR is the highest of any first baseman in history. His plate discipline (11 seasons with 100+ walks) and power (.632 SLG) translate perfectly to modern baseball. He would be the best first baseman in any era, which is exactly what he was in his own.",
    clubhouse_impact: "STABILIZING. If Ruth was the weather, Gehrig was the thermostat. He kept the temperature even. He showed up. He performed. He didn't create drama. In ILB: Gehrig provides +1 to team discipline and +1 to team morale — not through charisma but through reliability. Every teammate knows that Gehrig will be in the lineup tomorrow. Every teammate knows that Gehrig will produce. The certainty itself is a form of leadership.",
    dark_side: "The shadow. Gehrig spent his entire career in someone else's shadow — first Ruth, then McGraw (who stole his 4-HR headlines), then Ruth again (the Called Shot overshadowed Gehrig's 2 HR in the same game), then DiMaggio. He was the greatest first baseman alive and the second-most famous player on his own team for 12 of his 17 seasons. The shadow ate at him. He and Ruth had a famous falling-out — reportedly over a comment Ruth's wife made about Eleanor's parenting — and the two didn't speak for years. They reconciled at the Luckiest Man speech. The other shadow: ALS. The disease that took his body at 37 and his life at 37. He went from 200 hits and 100 RBI to .143 and unable to field in less than a year. He took himself out of the lineup on May 2, 1939, because he knew he was hurting the team. The last act of the Iron Horse was recognizing that the horse was broken. In ILB: 'The Iron Horse Breaks' — mandatory late-career event. At a random point after age 34, Gehrig's stats begin declining. The decline is irreversible. It cannot be treated. It is the cruelest card in ILB.",
  },

  chemistry_traits: [
    { tag: "The Iron Horse", desc: "2,130 consecutive games. In ILB, Gehrig cannot be benched, cannot be rested, cannot be injured for more than 0 games. He plays every game. Period. The streak is not a stat — it is a law of physics." },
    { tag: "Ruth's Shadow", desc: "As long as Ruth is on the same team, Gehrig's OVR appears as 10 instead of 12 to the public. His stats are unchanged — only his visibility is reduced. If Ruth is traded or retires, Gehrig's true OVR is revealed. Cross-reference: Ruth's 'Ruth's Shadow' trait on Sisler." },
    { tag: "The Luckiest Man", desc: "If Gehrig is forced to retire (via 'The Iron Horse Breaks'), trigger the Luckiest Man speech. +3 to entire team's morale permanently. +2 to league-wide attendance for the remainder of the season. The speech is the most powerful morale event in ILB." },
    { tag: "Twenty-Three Grand Slams", desc: "When Gehrig bats with bases loaded, automatic +3 CON and +3 POW. 23 career grand slams — the most for 70+ years. In pressure situations with runners on, Gehrig becomes the most dangerous hitter in ILB." },
    { tag: "The Iron Horse Breaks", desc: "MANDATORY EVENT. At a random point after season age 34, Gehrig's stats begin a permanent, irreversible decline: -1 to CON and POW per season. Cannot be stopped. Cannot be treated. The disease has no name in 1939. This is the cruelest card in ILB. It must be played." },
    { tag: "Murderers' Row", desc: "When Gehrig bats behind Ruth (or any OVR 10+ player), +1 to POW — pitchers can't pitch around Gehrig without facing Ruth. The most feared back-to-back in baseball history." },
    { tag: "Number Four", desc: "First retired number in baseball history. Gehrig's #4 cannot be worn by any other player on his team, in his era, or in ILB. The number itself is a monument." },
    { tag: "Columbia Man", desc: "Attended Columbia University. +1 to intelligence-based plays (situational hitting, baserunning decisions). Gehrig was not just a ballplayer — he was educated, thoughtful, and strategic." },
  ],

  preferred_locations: [
    { location: "Yankee Stadium", affinity: "MAXIMUM", note: "17 seasons. 1,065 of 2,130 streak games. The Luckiest Man speech. Number retired. He IS Yankee Stadium as much as Ruth is." },
    { location: "Batter's Box — Cleanup", affinity: "MAXIMUM", note: "Batting 4th, behind Ruth (#3). .340/.447/.632. 1,995 RBI. He hit cleanup for a decade behind the greatest hitter alive and was his equal." },
    { location: "World Series", affinity: "MAXIMUM", note: ".361/.483/.731. Better in October than the regular season. 6 of 7 WS won. 10 HR, 35 RBI in 34 games." },
    { location: "First Base", affinity: "HIGH", note: "2,130 consecutive games at first base. The position is his. The ground is his. He will be there tomorrow." },
    { location: "Home Plate — July 4, 1939", affinity: "SACRED", note: "'Today I consider myself the luckiest man on the face of the earth.' 61,808 people. Babe Ruth embraced him. The most important speech in sports history." },
  ],

  momentum: {
    hot_triggers: [
      "Every day — Gehrig's defining quality was consistency. From 1927-37, he hit .300+ with .424+ OBP and .583+ SLG EVERY season. He didn't have hot streaks — he had a 13-year baseline of excellence.",
      "Bases loaded — 23 career grand slams. When runners were on, Gehrig was the most dangerous hitter alive.",
      "World Series — .361 BA, .731 SLG. He was better in October. The 1928 WS: .545 BA, 4 HR, 9 RBI in a 4-game sweep.",
      "After Ruth performs — when Ruth hit 3 HR in the 1928 WS, Gehrig hit 4 HR. When Ruth had his Called Shot, Gehrig hit the next pitch for a HR. He elevated alongside Ruth, not in spite of him.",
    ],
    cold_triggers: [
      "1938 — The beginning of the end. .295 BA, 29 HR. 'I tired mid-season. I don't know why.' The body was failing and nobody knew why.",
      "1939 spring — .143 BA. Unable to field routine grounders. Teammates noticed. He noticed. The end was coming.",
      "Being overshadowed — his 4 HR game was buried by McGraw's retirement. His 2 HR in the Called Shot game were forgotten. When visibility is stolen, a quiet -1 to all stats.",
      "Mother's interference — Christina Gehrig dominated Lou's personal life until Eleanor. Personal turmoil -1 to focus.",
    ],
    pressure_response: "GRANITE. Gehrig's response to pressure was to become MORE himself — more consistent, more reliable, more present. His WS stats (.361/.731) exceed his regular season stats (.340/.632). He didn't rise to the occasion — he was already at the occasion, every day, and the occasion simply recognized him when it mattered. The Iron Horse didn't bend under pressure. Iron doesn't bend. It holds until it breaks, and then it holds some more, and then it breaks forever. CLU 3.",
  },

  action_card_seeds: [
    {
      title: "Two Thousand One Hundred Thirty",
      type: "Legacy",
      text: "Your first baseman played yesterday. He will play today. He will play tomorrow. He played with broken fingers nobody knew about until the X-rays after his death. He played when his GM faked a rainout to protect him. He played when his wife tried to trick him into stopping at 1,999. He plays because his parents were poor German immigrants who taught him that the only thing a man has is his work, and you do not miss work. Not for fourteen years. Not for 2,130 games.",
      origin: "June 1, 1925 to May 2, 1939. 2,130 consecutive games. The record stood for 56 years until Cal Ripken Jr. surpassed it in 1995.",
    },
    {
      title: "The Luckiest Man",
      type: "Drama",
      text: "July 4, 1939. Yankee Stadium. Sixty-one thousand eight hundred and eight people. Your first baseman is dying. He knows it. They know it. He steps to the microphone and says: 'Today I consider myself the luckiest man on the face of the earth.' Babe Ruth, who hasn't spoken to him in years, walks across the field and embraces him. The stadium weeps. The nation weeps. The game stops.",
      origin: "Lou Gehrig Appreciation Day. Gehrig's farewell speech. He and Ruth had been estranged over a personal dispute. Ruth embraced Gehrig at the ceremony. Gehrig died less than two years later.",
    },
    {
      title: "Wally Pipp's Headache",
      type: "Action",
      text: "June 2, 1925. Your starting first baseman has a headache. Your manager puts the kid from Columbia in his place. The kid from Columbia will not leave the lineup for fourteen years. Wally Pipp will become the most famous man in baseball history to lose his job to a headache.",
      origin: "Miller Huggins benched Wally Pipp for a slumping lineup. Gehrig replaced him and never left. 'Wally Pipp'd' entered the baseball lexicon as a cautionary tale.",
    },
    {
      title: "The Shadow",
      type: "Drama",
      text: "June 3, 1932. Your first baseman hits four home runs in a single game — the first American Leaguer to do it in the modern era. The next morning, the headlines are about John McGraw retiring from the Giants. Your first baseman says nothing. He never says anything. He just shows up tomorrow and hits.",
      origin: "Gehrig's 4 HR game at Shibe Park was overshadowed by McGraw's retirement. In the 1932 WS, Gehrig's 3 HR and 8 RBI were overshadowed by Ruth's Called Shot. It happened his entire career.",
    },
    {
      title: "One Hundred Eighty-Five",
      type: "Game Action",
      text: "Your first baseman drives in 185 runs in a single season. It is the American League record. It will still be the American League record in 2026. Nobody talks about it because Hack Wilson drove in 190 the year before. Your first baseman is the second-most prolific run producer in a single season, on a team with the most prolific home run hitter alive, and somehow both of those things make him invisible.",
      origin: "1931: 185 RBI — the AL record, still standing. Second all-time behind Hack Wilson's 190 (NL, 1930). Gehrig also hit .341 with 46 HR that year.",
    },
    {
      title: "May Second",
      type: "Drama",
      text: "May 2, 1939. Your first baseman walks to the manager's office. He has a .143 batting average. He cannot field a routine grounder. He doesn't know what's wrong. He says: 'I'm not helping the team.' The manager says nothing because there is nothing to say. The Iron Horse removes himself from the lineup for the first time in fourteen years. In Detroit, the opposing players give him a standing ovation. He tips his cap and weeps in the dugout.",
      origin: "Gehrig voluntarily ended his streak at 2,130 games. He was diagnosed with ALS the following month. He never played again.",
    },
    {
      title: "Murderers' Row",
      type: "Game Action",
      text: "Your lineup reads: Combs, Koenig, Ruth, Gehrig, Meusel, Lazzeri. The 1927 Yankees. One hundred and ten wins. A nineteen-game pennant lead. A four-game World Series sweep. Pittsburgh's players watched your team take batting practice before Game 1 and lost the Series before it started. Your first baseman hit .373 with 47 HR and 175 RBI, won the MVP, and was the second-most talked-about player on his own team.",
      origin: "The 1927 Yankees — Murderers' Row — are widely considered the greatest team in baseball history. Gehrig won the MVP. Ruth hit 60 HR. The Pirates were reportedly demoralized watching BP.",
    },
    {
      title: "Number Four",
      type: "Legacy",
      text: "Your first baseman's number is retired. It is the first time any team in any sport has done this. Number four will never be worn again by a New York Yankee. It will hang in the stadium forever. They retired the number because the man who wore it will never play again, and no one should pretend to replace him.",
      origin: "July 4, 1939. The Yankees retired #4 — the first retired number in MLB history, and the first in major American professional sports.",
    },
  ],

  art_direction: {
    face: "6'0\" 200 lbs. Broad-shouldered, thick-armed, powerful but not imposing. The face is open, earnest, almost boyish — square jaw, clear eyes, dark hair parted neatly. He looks like a man who would help you move your furniture. He looks like someone's son. He looks like he's trying very hard not to be noticed, which makes you notice him more.",
    attire: "New York Yankees 1927 pinstripes — same uniform as Ruth, same team, same year. But where Ruth's card is mid-swing with the ball already gone, Gehrig's should be at the ready — bat on shoulder, or in his stance, waiting. Always waiting. Always prepared. The #4 on the back should be visible. The uniform should be slightly dirty — he's been in the game every day.",
    mood: "QUIET PERMANENCE. This card should feel like bedrock. Where Ruth is a supernova, Gehrig is the earth beneath it. The mood is steady, warm, certain — like knowing your father will be home when you get there. There should be no flash. There should be no drama. There should be only the absolute certainty that this man will be here tomorrow, and the day after, and the day after that, until the day he can't be here anymore, and then the world will break.",
    style: "Full color — Bashers era — but where Ruth's card blazes with saturated navy and gold, Gehrig's should be warmer, more grounded. Rich earth tones beneath the pinstripes. Golden late-afternoon light at Yankee Stadium, but the light of 5:30 PM, not high noon — the light that says the day is almost over but there's still work to do. The card border should be iron-gray, not gold. Iron, not gold. The Iron Horse.",
    reference: "Ruth is the solar system. Gehrig is the axis the solar system spins on. Without Ruth, baseball is still great. Without Gehrig, the Yankees don't win 6 of 7 World Series. He is the most important player no one talks about first. His card should feel like the thing you didn't know you needed until it was gone. It should feel like reliability. It should feel like love expressed through presence rather than words. It should feel like a man who, upon learning he was dying, told sixty thousand people he was lucky.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [{ range: "No Gold Glove", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "No postseason", value: 0 },{ range: "PS BA < .250", value: 0 },{ range: "PS BA .250-.299", value: 1 },{ range: "PS BA .300+", value: 2 }], bonus: "World Series hero moment → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", ironGray: "#5a5f6b", navyDeep: "#1c2841", ironBorder: "#6b7080" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.ironGray}12`, border: `1px solid ${C.ironGray}35`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.warmRed, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.ironGray, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.ironGray}40`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function LouGehrigCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = GEHRIG_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.ironGray} 0%, #2a2d33 50%, ${C.ironGray} 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.cream, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>LEGEND CARD — Bashers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `4px solid ${C.ironBorder}`, boxShadow: `0 0 0 2px ${C.navyDeep}, 0 0 20px ${C.ironGray}30, 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.ironGray}, #4a4f5a, ${C.ironGray})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.cream, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.ironBorder}`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.ironGray}20, ${C.gold}10, ${C.ironGray}15)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>🔩</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE IRON HORSE</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.ironGray, color: C.cream, padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace", boxShadow: `0 2px 8px ${C.ironGray}60` }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}ee`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.ironGray}dd`, color: C.cream, padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>LEGEND</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.hotRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.ironGray}, #4a4f5a)`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS", val: d.real_stats.ops },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "R", val: d.real_stats.runs_scored },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} MURDERERS' ROW — AL MVP — 218 H / 52 2B / 18 3B / 47 HR / 175 RBI</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.ironGray}12`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.ironGray}25` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "CAR OPS", val: d.real_stats.career_ops },{ label: "CONSEC", val: "2,130" },{ label: "WS TITLES", val: d.real_stats.ws_titles },{ label: "WS AVG", val: d.real_stats.ws_avg },{ label: "HOF", val: "1939" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.ironGray, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER — 17 SEASONS • 493 HR • .340/.447/.632 • 113.8 WAR • 6 WS TITLES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛️ HOF 1939 (Special Election)", "🏆 6× WS Champion", "🔩 2,130 Consecutive Games", "💪 185 RBI (AL Record)", "🎯 .361 WS Batting Avg", "👑 23 Career Grand Slams", "4️⃣ First Retired Number", "📜 'The Luckiest Man'"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.ironGray}15`, border: `1px solid ${C.ironGray}30`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>LEGEND DOSSIER — {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.ironGray}25`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.ironGray : "transparent", color: tab === t.id ? C.cream : C.medBrown, border: `1px solid ${tab === t.id ? C.ironGray : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.warmRed }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "MAXIMUM" ? `${C.gold}20` : l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.warmRed}20`, color: l.affinity === "MAXIMUM" ? C.gold : l.affinity === "HIGH" ? C.traitGreen : C.warmRed, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Gehrig's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.ironGray}06`, border: `1px solid ${C.ironGray}20`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Legacy" ? `${C.ironGray}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section>
                <Section title="Gehrig's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.ironGray}, #4a4f5a, ${C.ironGray})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB LEGEND #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
