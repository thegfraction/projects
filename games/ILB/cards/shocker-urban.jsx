// /cards/players/urban-shocker.jsx
import { useState } from "react";

const SHOCKER_DATA = {
  name: "Urban Shocker",
  nickname: "The Silent Hero",
  year: 1921,
  team: "St. Louis Browns",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '5\'11"',
  weight: "175 lbs",
  born: "September 22, 1890 — Cleveland, Ohio (as Urbain Jacques Shockcor)",
  died: "September 9, 1928 — Denver, Colorado (age 37). Heart failure. Nearly 1,000 at funeral. Gehrig, Hoyt, Combs were pallbearers.",
  hof: "NOT INDUCTED. 187-117, .615 W%, 3.17 ERA, 4 consecutive 20-win seasons. Won more games than any other pitcher in baseball 1920-1924 (107 wins). Never had a losing season in 13 years. Went 18-6 with a 2.84 ERA for the 1927 'Murderers' Row' Yankees while dying of heart disease. Steve Steinberg's SABR biography: 'Silent Hero of Baseball's Golden Age.' Mark Gallagher: 'Quite possibly the most courageous man in sports history.' The Hall of Fame door is closed. The heart stopped first.",

  real_stats: {
    season: 1921,
    wins: 27,
    losses: 12,
    era: "3.55",
    games: 47,
    games_started: 38,
    complete_games: 30,
    shutouts: 2,
    innings_pitched: "326.2",
    strikeouts: 132,
    walks: 88,
    war: 5.8,
    win_pct: ".692",
    season_1922: "24-17, 2.97 ERA, 348 IP, 149 K (led AL)",
    season_1926: "19-11, 3.38 ERA (Yankees — first pennant)",
    season_1927: "18-6, 2.84 ERA (Murderers' Row — while dying)",
    career_wins: 187,
    career_losses: 117,
    career_era: "3.17",
    career_cg: 200,
    career_shutouts: 28,
    career_ip: "2,681.2",
    career_win_pct: ".615",
    career_k: 983,
    career_saves: 25,
    twenty_win_seasons: 4,
    losing_seasons: 0,
    era_plus: 109,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION — 1921 SEASON (PEAK)
  //
  // STF: Spitball (legal — grandfathered), fastball, curve, slow ball.
  //      The broken middle finger (1913) healed HOOKED — gave him
  //      a devastating breaking ball. "He had control. He had the best
  //      control of that spitball of anybody I ever saw." But also:
  //      "Most of the time I bluff" — the THREAT of the spitter was
  //      as effective as the pitch itself. 132 K in 326 IP (3.64 K/9).
  //      Led AL in K with 149 in 1922. Ruth: "a mighty smart hombre."
  //      STF = 3 (STRONG — movement, deception, variety. Not a power
  //      arm but a pitch-mixing genius with a hooked finger.)
  //
  // CTL: Led AL in BB/9 twice. Career 2.2 BB/9. "He had control. He
  //      had the best control of that spitball of anybody I ever saw."
  //      88 BB in 326 IP in 1921 (2.42 BB/9) — good but not elite
  //      in that particular season. Career: ELITE control.
  //      CTL = 4 (NEAR-MAXIMUM — the best spitball control ever. The
  //      bluff was as good as the pitch because he could put it
  //      anywhere he wanted.)
  //
  // STA: 326.2 IP, 30 CG, 47 G in 1921. Career: 2,681 IP, 200 CG.
  //      348 IP in 1922 (career high). But also: he broke down. The
  //      heart gave out. The workload killed him — literally.
  //      STA = 3 (STRONG — durable for his peak years, but the body
  //      was failing beneath the surface. The 4 would be dishonest.
  //      The heart limits the stamina rating.)
  //
  // DEF: "Best fielding pitcher I ever saw. He'd leave that mound and
  //      jump on the ball like a cat." .980 fielding pct, only 15
  //      errors in 769 chances. Elite for a pitcher.
  //      DEF = 2 (EXCELLENT — genuinely one of the best fielding
  //      pitchers of his era. "Like a cat.")
  //
  // CLU: 1927 Yankees — Murderers' Row. But he was too sick to pitch
  //      in the WS (George Pipgras took his start). 1926 WS: started
  //      Game 2, lost 6-2 (allowed 3-run HR to Southworth). 0-1 WS.
  //      1920 WS (Indians won — Shocker wasn't on their team).
  //      CLU = 1 (one WS ring with 1928 Yankees posthumously voted
  //      $500 for his widow. Too sick to pitch when it mattered most.
  //      The heart betrayed him in October.)
  //
  // OVR: STF×2(6) + CTL×1.5(6) + STA×1(3) + DEF×0.5(1) + CLU×1.5(1.5) = 17.5 → normalized ~8
  // OVR = 8 (ALL-STAR) — the silent hero. The card that carries the
  // most physical courage in the Bashers. He pitched while dying.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,
    stf: 3,    // Spitball, fastball, curve, slow ball. Broken finger healed hooked — gave him an extra breaking ball. The spitter bluff was as good as the pitch. "A mighty smart hombre." 132 K in 326 IP — movement and deception, not power.
    ctl: 4,    // NEAR-MAXIMUM. "The best control of that spitball of anybody I ever saw." Led AL in BB/9 twice. Career 2.2 BB/9. He could put the spitter anywhere. The bluff only worked because the control was real.
    sta: 3,    // 326 IP, 30 CG. 2,681 career IP. 200 career CG. Durable for his peak — but the heart was failing. The workload killed him. The stamina was borrowed against a body that was breaking down. The 3 honors both the durability and the cost.
    def: 2,    // "Best fielding pitcher I ever saw. He'd jump on the ball like a cat." .980 career fielding pct. Only 15 errors in 769 chances. Elite.
    clu: 1,    // 1927 Murderers' Row — but too sick for the WS. 1926 WS: 0-1, lost Game 2. The heart betrayed him in October. His widow received $500 from the 1928 WS share.
  },

  stat_justification: {
    stf: "Urban Shocker threw a spitball, a fastball, a curve, and a slow ball. In 1913, he broke the middle finger on his right hand — when it healed, it was permanently hooked, giving him an extra breaking ball that other pitchers couldn't replicate. His spitball was devastating, but more importantly, he bluffed it constantly: 'Most of the time I bluff. The batter doesn't know when I'm going to bluff so what good will the knowledge do him.' Babe Ruth called him 'a mighty smart hombre out there on the mound.' He led the AL in strikeouts with 149 in 1922. But his K/9 was moderate (3.64 in 1921) — he was a movement-and-deception pitcher, not a power arm. Rating of 3.",
    ctl: "Shocker led the AL in BB/9 twice and averaged 2.2 BB/9 for his career — elite control. Teammate: 'He had control. He had the best control of that spitball of anybody I ever saw.' The spitball bluff only worked because his control was genuine — batters couldn't tell which pitch was the real spitter because Shocker could locate everything. In 1921, he walked 88 in 326 IP (2.42 BB/9). Rating of 4.",
    sta: "326.2 IP in 1921. 348 IP in 1922. 200 career CG. 2,681 career IP. These are genuine workhorse numbers. But the body was failing — Shocker had a corroded heart valve that was killing him throughout his peak years. He dropped from 190 lbs to 115 lbs by 1928. He slept sitting or standing up because he would choke lying down. The stamina was real but borrowed — he was drawing on a body that could not sustain the load. The 3 reflects both the peak durability and the progressive physical collapse. Rating of 3.",
    def: "Frank Ellerbe (Browns 3B): 'Best fielding pitcher I ever saw. He could field that position, he'd leave that mound and jump on the ball like a cat.' Shocker committed only 15 errors in 769 total chances for a .980 fielding percentage — elite for any pitcher in his era. Rating of 2.",
    clu: "Shocker was part of the 1927 Yankees 'Murderers' Row' — widely considered the greatest team in baseball history. But by fall 1927, he was too ill to pitch in the World Series; George Pipgras took his start. In the 1926 WS, he started Game 2 and lost 6-2 (Billy Southworth hit a 3-run HR). His WS record: 0-1. The heart denied him October glory. His widow received $500 of the 1928 WS share. Rating of 1.",
  },

  personality: {
    leadership_style: "QUIET AUTHORITY. Shocker was not loud or demonstrative. He was described as 'brainy,' 'smart,' a student of the game who studied batters and found their weaknesses. He mentored younger pitchers (particularly Waite Hoyt) and led through competence rather than personality. This was a man who earned respect by winning 20 games four years in a row on a bad team, not by giving speeches. The silence was the leadership — you followed Shocker because he never stopped working, even when he was dying.",
    temperament: "COCKY AND PRIVATE. These seem contradictory but they weren't. Shocker was confident — borderline arrogant — about his pitching ability. He feuded with management, showed up late, demanded fair treatment. But about his personal life, his health, his fears — silence. He concealed the heart disease from teammates and managers for years. He pitched the 1927 season — 18 wins, 2.84 ERA — while secretly dying. The cockiness was the armor; the privacy was the seal. Like Sam Rice, but with a braver face.",
    work_ethic: "RELENTLESS UNTO DEATH. This is not metaphorical. Urban Shocker literally pitched himself to death. He threw 326 IP in 1921, 348 IP in 1922, and continued pitching through progressive heart failure until he collapsed on the mound at Comiskey Park in June 1928, 'ashen gray.' Mark Gallagher: 'Quite possibly the most courageous man in sports history.' He fought bravely in his last few years to play baseball and indeed for life itself. The work ethic was not a character trait — it was an existential choice.",
    lifestyle: "FROM CATCHER TO DYING ACE. Urbain Jacques Shockcor was born in Cleveland, moved to Michigan, played catcher in the Canadian Border League, broke his finger, became a pitcher, went to war (bayonet wound to the head), won 27 games, moved to New York, won 18 games while dying, opened a radio supplies shop in St. Louis, had interests in aviation, collapsed on a mound in Chicago, died in Denver at 37, and was buried while nearly 1,000 mourners wept and Lou Gehrig carried his casket. The name was made for baseball. The life was made for a novel.",
    era_adaptability: "MODERATE. The spitball is banned — Shocker would need to adapt. But his real weapons were control and intelligence, which translate to any era. The broken-finger breaking ball would still work. The bluffing would still work. He'd be a crafty mid-rotation starter who went deep into games through command and deception. Modern medicine might also have saved his life.",
    clubhouse_impact: "POSITIVE BUT COMPLICATED. Shocker mentored young pitchers and was respected by teammates. Ruth praised him. But he also feuded with Sisler (tardiness), clashed with management, and concealed his failing health. The complicated part: his teammates didn't know he was dying. The positive part: he kept winning anyway. In ILB, Shocker provides +1 team pitching staff morale and +1 mystery — nobody quite knows what's happening inside the armor.",
  },

  chemistry_traits: [
    { tag: "The Spitball Bluff", desc: "Legal spitball pitcher — but 'most of the time I bluff.' The batter doesn't know which pitch is the real spitter. In ILB, opposing batters have -1 to pitch recognition against Shocker. Every pitch MIGHT be the spitter. The uncertainty is the weapon." },
    { tag: "The Hooked Finger", desc: "Broke his middle finger in 1913 playing catcher. It healed permanently hooked. The deformity gave him an extra breaking ball nobody else could throw. In ILB, Shocker has +1 STF derived from an injury — the only pitcher whose stuff IMPROVED from being hurt. The hook IS the pitch." },
    { tag: "The Dying Ace", desc: "1927: 18-6, 2.84 ERA for Murderers' Row — while his heart was failing. Slept sitting up. Dropped to 115 lbs by 1928. In ILB, Shocker's stats do not decline with advancing health issues UNTIL he collapses. There is no gradual decay — he pitches at full capacity until the body simply stops. The shutdown is sudden and total." },
    { tag: "The Silent Hero", desc: "Concealed his heart disease from teammates and managers for years. Pitched through it. Won through it. Died of it. In ILB, Shocker's health condition is HIDDEN from the opponent's scouting report. They don't know he's dying. They only know he went 18-6." },
    { tag: "Sisler's Ace", desc: "Shocker was the ace of the Browns 1918-1924 while Sisler was the star. Sisler managed him, fined him, praised him: 'The greatest in the game when he takes care of himself.' In ILB, when paired with Sisler, Shocker has +1 CTL but -1 discipline (showing up late, clashing with management). The talent and the friction are inseparable." },
    { tag: "Uhle's Mentor", desc: "Shocker told George Uhle in 1920: 'You're tipping your pitches. And everybody in the league knows it.' This saved Uhle's career. In ILB, Shocker provides +1 to any teammate pitcher's STF (mentorship). He sees what others miss." },
    { tag: "Mays's Twin", desc: "1921: Shocker (27-12) and Carl Mays (27-9) tied for the AL lead in wins. Two very different men — Mays the pariah, Shocker the silent hero — with identical win totals. In ILB, when both are in the same game or same season sim, their win totals track each other within 2 games. They are yoked together." },
    { tag: "Never a Losing Season", desc: "13 years. NEVER a losing record. One of ~8 pitchers in MLB history with 10+ seasons and no sub-.500 marks. In ILB, Shocker's season W-L record CANNOT be below .500. If the simulation puts him below .500, he gains +2 to all stats until the record is corrected. The floor is winning." },
  ],

  preferred_locations: [
    { location: "Sportsman's Park, St. Louis", affinity: "MAXIMUM / HOME", note: "Seven seasons with the Browns. 126-80 in St. Louis. The Browns' all-time leader in wins and shutouts. This was where he became a star — in obscurity, on a weak team, winning 20 games a year." },
    { location: "Yankee Stadium, New York", affinity: "HIGH / FINAL", note: "1925-1928. Two pennants, one WS appearance. 18-6 while dying. The stage he deserved, found too late, enjoyed too briefly." },
    { location: "The Mound at Comiskey Park", affinity: "TRAGIC", note: "June 1928: Shocker collapsed during batting practice, 'ashen gray.' The last mound he ever stood on as a professional." },
    { location: "Denver, Colorado", affinity: "DEATH", note: "Sought recovery in Denver's thin mountain air. Died there, September 9, 1928, age 37. The air that was supposed to help his heart couldn't." },
  ],

  momentum: {
    hot_triggers: [
      "Against former teams — Shocker 'took unholy delight in standing his former team-mates on their heads.' After being traded FROM the Yankees, he dominated AGAINST them.",
      "Studying opponents — Shocker was a student of hitters. The more he knew about a batter, the better he pitched. Intelligence was the accelerant.",
      "Pitching through pain — the heart disease paradoxically focused him. When the body was failing, the mind sharpened.",
      "Big crowds — 40,000 at the Polo Grounds to see Ruth, and Shocker shut them down. He pitched UP in the spotlight.",
    ],
    cold_triggers: [
      "Physical collapse — when the heart finally broke through the armor, it was sudden and total. Ashen gray on the mound.",
      "Management friction — the feuds with Sisler, the tardiness, the contract disputes. Shocker was his own worst enemy off the mound.",
      "October — 0-1 in WS. Too sick for the 1927 Series. The heart betrayed him in the biggest moments.",
      "Isolation — the secrecy about his health meant he carried the burden alone. Nobody could help because nobody knew.",
    ],
    pressure_response: "EXTRAORDINARILY BRAVE BUT ULTIMATELY DEFEATED. Shocker pitched the 1927 season — for the greatest team ever assembled — while dying of heart disease. 18-6, 2.84 ERA. That is courage almost beyond comprehension. But he couldn't pitch in the World Series. And in 1926, when he did pitch in the WS, he lost. The bravery was real. The results in October were not. CLU = 1 reflects the cruel mathematics: the heart that let him pitch 18 regular season wins wouldn't let him pitch in the games that counted most.",
  },

  action_card_seeds: [
    {
      title: "Sleeping Upright",
      type: "Condition / Core",
      text: "Your pitcher cannot lie down. If he lies down, he chokes. His heart valve is corroded — the blood pools, the lungs fill, the air stops. So he sleeps sitting up. Sometimes standing. He has done this for years. His teammates do not know. His manager does not know. His wife knows. His doctor knows. He won 18 games last season. He pitched for the greatest team in baseball history. He did it sitting up at night, staring at a wall, waiting for morning so he could go to the ballpark and pretend nothing was wrong.",
      origin: "Shocker's heart valve disease caused choking sensations when lying down. He slept sitting or standing up. Concealed from teammates.",
    },
    {
      title: "The Hooked Finger",
      type: "Origin / Innovation",
      text: "1913. Your pitcher is a catcher in the Canadian Border League. He breaks the middle finger on his right hand. When it heals, the finger is permanently hooked. A normal man would adapt. Your pitcher discovers that the hooked finger lets him throw a breaking ball that nobody else can throw — the ball rolls off the deformity in a way that a straight finger cannot replicate. He stops catching. He starts pitching. He will win 187 games with a pitch born from a broken bone. The injury was the gift.",
      origin: "Shocker broke his middle finger playing catcher in 1913 in the Border League. The hooked finger gave him an unreplicable breaking ball.",
    },
    {
      title: "Twenty-Seven and Twenty-Seven",
      type: "Parallel / Rivalry",
      text: "1921. The American League's two best pitchers each win 27 games. Urban Shocker: 27-12, St. Louis Browns. Carl Mays: 27-9, New York Yankees. Mays threw the pitch that killed Ray Chapman. Shocker is dying of heart disease. One man is the most hated player in baseball. The other is the most privately brave. The same number. The same year. The same league. Nothing else the same.",
      origin: "1921: Shocker and Mays tied for the AL lead with 27 wins each. Mays was despised; Shocker was respected but obscure.",
    },
    {
      title: "The Bluff",
      type: "Mechanic / Philosophy",
      text: "'They call me a spitball pitcher and I guess I am one by courtesy. Sometimes I throw half a dozen spit balls in a regulation game; sometimes less. Most of the time I bluff. That's no secret to anyone. The batter doesn't know when I'm going to bluff so what good will the knowledge do him.' Your pitcher has the best pitch in baseball. He almost never throws it. The IDEA of the pitch is worth more than the pitch itself. In ILB, this is the fundamental Shocker mechanic: the threat is the weapon. The bluff is the truth.",
      origin: "Shocker's own description of his spitball strategy — he bluffed it most of the time and relied on fastball, curve, and slow ball.",
    },
    {
      title: "Everybody Knows",
      type: "Mentorship",
      text: "1920. George Uhle is getting hammered. 5.92 ERA. He can't understand why. Your pitcher walks over to him. 'You're tipping your pitches,' your pitcher says. 'And everybody in the league knows it.' Uhle changes his delivery. His ERA drops to 3.44 in the second half. He helps Cleveland win the pennant. He goes on to win 200 games. Your pitcher gave him the key. One sentence. The quiet hero saves careers with a whisper.",
      origin: "Shocker told Uhle he was tipping pitches in 1920. Uhle fixed it, helped Cleveland win the WS, and went on to a 200-win career.",
    },
    {
      title: "Ashen Gray",
      type: "Collapse / Tragedy",
      text: "June 1928. Comiskey Park, Chicago. Your pitcher is throwing batting practice. He has been fighting for months — against the contract disputes, against the weight loss, against the choking at night, against the knowledge that this is the end. He delivers a pitch. His face goes ashen gray. He collapses on the mound. They carry him off. He is 115 pounds. He was 190 two years ago. He pitched 18-6 last season. He will never pitch again. He will die in Denver in September, searching for air that cannot save him.",
      origin: "Shocker collapsed at Comiskey Park in June 1928 during batting practice. Released by Yankees in July. Died September 9, 1928.",
    },
    {
      title: "The Pallbearers",
      type: "Legacy / Elegy",
      text: "September 15, 1928. All Saints' Church, St. Louis. Nearly one thousand mourners. The pallbearers are Lou Gehrig, Waite Hoyt, Earle Combs, Gene Robertson, Mike Gazella, and Myles Thomas — his Yankee teammates. The Browns are there too. The man who pitched for both teams is carried by both teams. The Yankees give his widow Rene five hundred dollars from the World Series share. Your pitcher is dead at thirty-seven. His heart gave out. But his heart was never the problem — his heart was the bravest part of him.",
      origin: "Shocker's funeral — nearly 1,000 mourners. Yankee teammates served as pallbearers. His widow received $500 of the 1928 WS share.",
    },
    {
      title: "Murderers' Row",
      type: "Context / Team",
      text: "The 1927 New York Yankees: Ruth (.356, 60 HR, 164 RBI). Gehrig (.373, 47 HR, 173 RBI). Combs (.356). Lazzeri (.309, 18 HR). Meusel (.337). The greatest lineup ever assembled. The pitching staff: Hoyt (22-7). Pennock (19-8). Shocker (18-6). Pipgras (10-3). Moore (19-7). Your pitcher is the third-best arm on the greatest team in baseball history. He pitches every fifth day with a dying heart and wins eighteen games. He cannot pitch in the World Series. They win it without him. He watches from the stands — or the hospital. Nobody tells the fans why he isn't on the mound.",
      origin: "1927 Yankees — Murderers' Row. Shocker went 18-6 but was too ill for the WS. Pipgras took his rotation spot.",
    },
  ],

  art_direction: {
    face: "5'11\" 175 lbs — lean, wiry, SHARP. A fox's face, not a bull's. High cheekbones, intelligent eyes, the look of a man who is calculating something. The face should suggest SECRETS — he is smiling slightly, or not smiling at all, but either way you cannot tell what he is thinking. There is something behind the eyes that is not healthy — a thinness, a tiredness, a bravery. This is the face of a man who is dying and has decided not to tell anyone.",
    attire: "St. Louis Browns 1921 whites (peak season). Mid-delivery — the spitball motion, fingers touching the ball, the moment before the pitch leaves his hand. The question: is this the spitter or the bluff? You can't tell from the delivery. That's the point. Or: standing on the mound, looking in at the catcher, completely still, completely certain. The uniform should be slightly too big — foreshadowing the weight loss to come. 175 pounds becoming 115.",
    mood: "BRAVE QUIET. Not dark like Mays, not sealed like Rice, not warm like Uhle. BRAVE — the specific mood of a man who knows something terrible and has chosen to keep working. The mood is a hospital patient who puts on a uniform and wins 18 games. The mood is the space between the bluff and the truth. QUIET — because the courage is not performed, it is endured. The card should feel like a held breath.",
    style: "Full color — Bashers era — PALE AND SHARP. The color palette should be LIGHTER than the other Browns/Cleveland cards — silver-gray, cool white, a hint of blue like thin mountain air (Denver, where he died). Not warm like Uhle's brick, not dark like Mays's storm. ETHEREAL — the color of a man whose body is becoming transparent while his record gets brighter. The border should be SILVER-GRAY — the color of dawn when you've been sitting up all night because you cannot lie down. THE HELD BREATH — the card that is almost not there, almost gone, still winning.",
    reference: "Ruth is the solar system. Gehrig is the axis. Mays is the black pitch. Shocker is THE HELD BREATH — the card you have to look at twice because it's almost transparent, almost gone, but when you look closely, the record is 18-6 and the ERA is 2.84 and the heart is failing and the courage is absolute. He is the quietest card in the Bashers but might be the bravest. The card should feel like holding something fragile that turns out to be steel.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", silverGray: "#9ca3af", paleBlue: "#7b8fa3", dawnSilver: "#b8bfc9", breathWhite: "#e8edf2" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.silverGray}15`, border: `1px solid ${C.silverGray}30`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.paleBlue, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.paleBlue, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.silverGray}30`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function UrbanShockerCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = SHOCKER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.paleBlue} 0%, ${C.silverGray} 30%, ${C.dawnSilver} 70%, ${C.breathWhite} 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.ink, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.paleBlue, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ALL-STAR CARD — Bashers Era — The Held Breath</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.silverGray}`, boxShadow: `0 0 0 2px ${C.dawnSilver}, 0 0 30px ${C.silverGray}30, 0 12px 40px rgba(0,0,0,0.3), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.paleBlue}, ${C.silverGray}, ${C.paleBlue})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#fff", fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.silverGray}30`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.breathWhite}, ${C.dawnSilver}40, ${C.paleBlue}10)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8, opacity: 0.7 }}>🫁</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.paleBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE HELD BREATH</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.paleBlue, color: "#fff", padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.paleBlue}dd`, color: "#fff", padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ALL-STAR • SILENT HERO</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.paleBlue, fontFamily: "'Courier Prime', monospace", marginTop: 2, letterSpacing: 1, fontStyle: "italic" }}>born Urbain Jacques Shockcor</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.paleBlue} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.silverGray} />
              <StatBar label="STA" value={s.sta} max={5} color={C.warmRed} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.paleBlue}, ${C.silverGray})`, borderRadius: 4, padding: 10 }}>
              {[{ label: "W", val: d.real_stats.wins },{ label: "L", val: d.real_stats.losses },{ label: "ERA", val: d.real_stats.era },{ label: "W%", val: d.real_stats.win_pct },{ label: "CG", val: d.real_stats.complete_games },{ label: "SHO", val: d.real_stats.shutouts },{ label: "IP", val: "327" },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.paleBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1921 — LED AL IN WINS (27, TIED MAYS) — 4 CONSECUTIVE 20-WIN SEASONS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.paleBlue}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.silverGray}20` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "20-W SZN", val: d.real_stats.twenty_win_seasons },{ label: "LOSE SZN", val: "0" },{ label: "ERA+", val: d.real_stats.era_plus },{ label: "HOF", val: "❌" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.silverGray, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.6 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ background: `${C.paleBlue}10`, border: `1px solid ${C.paleBlue}25`, borderRadius: 4, padding: 8, marginTop: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 900, color: C.paleBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, marginBottom: 4, textAlign: "center" }}>1927 MURDERERS' ROW — WHILE DYING</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
                {[{ label: "W-L", val: "18-6" },{ label: "ERA", val: "2.84" },{ label: "WS", val: "Too ill" }].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.sepia }}>{s.label}</div><div style={{ fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace" }}>{s.val}</div></div>
                ))}
              </div>
              <div style={{ fontSize: 9, color: C.paleBlue, fontFamily: "'Courier Prime', monospace", textAlign: "center", marginTop: 4, fontStyle: "italic" }}>"Quite possibly the most courageous man in sports history"</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["💧 Legal Spitball Pitcher", "🫁 Slept Sitting Up", "🏆 1927 Murderers' Row", "🤫 Concealed Heart Disease", "🖐️ Hooked Finger Breaking Ball", "⚔️ WWI Veteran (bayonet wound)", "📊 Never a Losing Season", "💀 Died at 37"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.paleBlue}08`, border: `1px solid ${C.silverGray}20`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.paleBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ALL-STAR DOSSIER — {d.year} — SILENT HERO</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.silverGray}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.paleBlue : "transparent", color: tab === t.id ? "#fff" : C.medBrown, border: `1px solid ${tab === t.id ? C.paleBlue : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key.replace(/_/g, " ")}><p style={{ margin: 0 }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.paleBlue }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity.includes("TRAGIC") ? `${C.warmRed}20` : l.affinity.includes("DEATH") ? `${C.ink}15` : l.affinity.includes("HOME") ? `${C.traitGreen}20` : `${C.paleBlue}20`, color: l.affinity.includes("TRAGIC") ? C.warmRed : l.affinity.includes("DEATH") ? C.ink : l.affinity.includes("HOME") ? C.traitGreen : C.paleBlue, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.paleBlue }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.paleBlue}05`, border: `1px solid ${C.silverGray}15`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type.includes("Tragedy") || a.type.includes("Collapse") ? `${C.warmRed}20` : a.type.includes("Elegy") || a.type.includes("Legacy") ? `${C.paleBlue}20` : `${C.silverGray}15`, color: a.type.includes("Tragedy") || a.type.includes("Collapse") ? C.warmRed : a.type.includes("Elegy") || a.type.includes("Legacy") ? C.paleBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.paleBlue}, ${C.silverGray}, ${C.paleBlue})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ALL-STAR #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
