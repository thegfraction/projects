// /cards/players/kiki-cuyler.jsx
import { useState } from "react";

const CUYLER_DATA = {
  name: "Kiki Cuyler",
  nickname: "The Flint Flash",
  year: 1925,
  team: "Pittsburgh Pirates",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "RF",
  bats: "R",
  throws: "R",
  height: '5\'10"',
  weight: "180 lbs",
  born: "August 30, 1898 — Harrisville, Michigan (as Hazen Shirley Cuyler)",
  died: "February 11, 1950 — Ann Arbor, Michigan (age 51). Heart attack. Coaching for the Red Sox. Died 18 years before his HOF induction.",
  hof: "INDUCTED 1968 (Veterans Committee — posthumous). .321 career BA, 2,299 H, 328 SB, 157 3B, 1,305 R. Led NL in SB 4×, runs 2×. 10× .300 hitter. The 1925 WS hero who was benched for the 1927 WS. 'Cuyler can hit, run, field and throw with the best of 'em.' Elected 18 years after his death — the accomplishments too great to be obscured by time.",

  real_stats: {
    season: 1925,
    batting_avg: ".357",
    obp: ".419",
    slg: ".598",
    ops: "1.017",
    hits: 220,
    doubles: 43,
    triples: 26,
    home_runs: 18,
    rbi: 102,
    runs: 144,
    stolen_bases: 41,
    total_bases: 369,
    games: 153,
    war: 7.4,
    inside_the_park_hr: 8,
    mvp_voting: "2nd (behind Hornsby's .403)",
    career_batting_avg: ".321",
    career_hits: 2299,
    career_doubles: 394,
    career_triples: 157,
    career_hr: 128,
    career_rbi: 1065,
    career_runs: 1305,
    career_sb: 328,
    career_sb_titles: 4,
    ws_1925: ".269 BA, 2 HR (incl. Game 2), Game 7 winning double vs Walter Johnson",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB BATTER STAT CONVERSION — 1925 SEASON
  //
  // CON: .357 BA, 220 H, 10 consecutive hits over 3 games (NL record tie).
  //      Career .321. 10× .300 seasons. "Solid line-drive hitter."
  //      First-pitch hitter — aggressive, attacked the ball.
  //      CON = 4 (NEAR-MAXIMUM — .357 is elite. Not quite .400 territory
  //      but close. The consistency across a full season earns the 4.)
  //
  // POW: 18 HR, 43 2B, 26 3B, 369 TB, .598 SLG, 1.017 OPS.
  //      "Surprising power" for a speed player. 8 inside-the-park HR.
  //      But the power was gap-based — triples and doubles, not deep
  //      fly balls. The HR were helped by speed (8 IPHR).
  //      POW = 2 (SOLID — real gap power. 26 triples, 43 doubles.
  //      But 18 HR in 1925's offensive environment is moderate.
  //      The power was running power, not fence power.)
  //
  // SPD: 41 SB. Led NL 4× in career. 26 3B (2nd most post-1900).
  //      8 IPHR. "Uncanny speed." "The Flint Flash." "Quick reflexes."
  //      Max Carey tutored him in baserunning. 328 career SB.
  //      Also played all-star BASKETBALL in offseason.
  //      SPD = 5 (MAXIMUM — this is the fastest card in the Bashers.
  //      41 SB, 26 3B, 8 IPHR. He was electric on the bases.)
  //
  // DEF: "Powerful arm." "Speed in the field." Good range in RF/CF.
  //      Not a Gold Glove caliber defender by modern standards but
  //      excellent for the era. Could play RF, CF, and LF.
  //      DEF = 2 (GOOD — the arm was strong, the range was elite
  //      thanks to the speed. Versatile across all OF positions.)
  //
  // CLU: 1925 WS Game 7: BASES LOADED, 8th inning, game tied 7-7,
  //      vs WALTER JOHNSON. Hit a 2-run ground-rule double that won
  //      the World Series. Also HR in Game 2. Pirates came back from
  //      3-1 to win 4-3. FIRST TEAM EVER to come back from 3-1 in
  //      best-of-7 WS.
  //      BUT: Benched for the 1927 WS — didn't play a single game.
  //      Pirates swept by Yankees. The hero denied.
  //      CLU = 3 (MAX — the 1925 WS performance alone earns this.
  //      Bases loaded, Walter Johnson, Game 7, 8th inning. The
  //      benching is a CHARACTER trait, not a CLU failure.)
  //
  // OVR: CON×2(8) + POW×1(2) + SPD×1.5(7.5) + DEF×0.5(1) + CLU×1.5(4.5) = 23 → normalized ~9
  // OVR = 9 (ELITE) — the complete package. Speed, contact, power,
  // defense, clutch. The first NL player in the Bashers and the
  // fastest card in the set. The stutterer who echoed through October.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 9,
    con: 4,    // .357 BA, 220 H, 10 consecutive hits (NL record tie). Career .321. 10× .300 seasons. First-pitch aggression. Line-drive machine.
    pow: 2,    // 18 HR, 43 2B, 26 3B, 369 TB. Gap power, not fence power. 8 inside-the-park HR — the speed was the power. The triples tell the truth.
    spd: 5,    // MAXIMUM. 41 SB, 26 3B, 8 IPHR. Led NL in SB 4×. "The Flint Flash." Fastest card in the Bashers. All-star basketball player. Electric.
    def: 2,    // Strong arm, elite range from speed, versatile (RF/CF/LF). Good, not transcendent. The speed elevated everything.
    clu: 3,    // MAX. 1925 WS Game 7: bases loaded, Walter Johnson, 8th inning, game tied. Two-run double. Won the World Series. First 3-1 comeback in WS history.
  },

  stat_justification: {
    con: "Kiki Cuyler hit .357 in 1925 with 220 hits — tying the Pirates single-season record. He tied the NL record with 10 consecutive hits over three games (September 18-21), then went 4-for-4 the next game for 14 hits in 16 at-bats. Career: .321 BA, 2,299 hits, 10× .300 seasons. He batted over .350 four times. He was an aggressive, first-pitch hitter who attacked the ball. Fred Clarke: 'Cuyler might become a second Cobb.' Rating of 4.",
    pow: "Cuyler hit 18 HR with 43 2B, 26 3B, and 369 total bases in 1925. The .598 SLG and 1.017 OPS are impressive. But the power was gap-based — the 26 triples (2nd most post-1900) and 8 inside-the-park home runs tell the story: Cuyler drove the ball into gaps and ran it into extra bases. Only 10 of his 18 HR cleared a fence. The power was RUNNING power, not fence power. In the context of 1925 (a high-offense era), 18 HR from an outfielder is moderate. Rating of 2.",
    spd: "The defining attribute. 41 stolen bases in 1925 (led NL 4× in career, 328 career SB). 26 triples — the 2nd most in any post-1900 season. 8 inside-the-park home runs. 'The Flint Flash.' Max Carey, who led the NL in steals 10 times, tutored Cuyler in baserunning technique. Cuyler was also an all-star basketball player in offseasons — the athletic base was extraordinary. This is the fastest card in the entire Bashers set. Sam Rice (SPD 4) is fast. Cuyler is faster. Rating of 5.",
    def: "Cuyler had 'a powerful arm' and elite range from his speed. He played all three outfield positions (RF, CF, LF) effectively. SABR: 'Blessed with uncanny speed, quick reflexes, and a powerful arm.' He was not a transcendent defensive player but the speed made him excellent in the outfield. Rating of 2.",
    clu: "1925 World Series, Game 7, bottom of the 8th inning. Score tied 7-7. Bases loaded. Two outs. The pitcher is Walter Johnson — the Big Train, widely considered the greatest pitcher who ever lived. Johnson had already won Games 1 and 4 of this series. The Pirates trailed 3-1 in games and came back. Cuyler swung. The ball rocketed down the right field line, dropped fair, rolled into the tarp — ruled a ground-rule double. Two runs scored. Pirates 9, Senators 7. It held. The Pirates won. It was the first time a team had ever come back from a 3-1 deficit in a best-of-7 World Series. Cuyler also hit a 2-run HR in Game 2. This is maximum clutch — the defining hit, against the greatest pitcher, in the ultimate game. Rating of 3.",
  },

  personality: {
    leadership_style: "QUIET EXAMPLE. Cuyler was not a vocal leader. He was 'polite, shy, and kind.' 'A model on and off the field.' He led by being the best player on the field, not by talking. The stutter may have contributed to the reticence — a man who struggled with his own name learned to let his bat speak instead. Joe Cronin: 'He was one of the finest and cleanest living fellows I ever met in baseball. Cuyler was an established star when I joined the Pirates in 1925 but he was always willing to help.'",
    temperament: "SHY LONER WITH A STUBBORN STREAK. 'He was a loner. He kept to himself. He liked to dance, and he'd go out, never palled around with a single player on the club. They didn't really dislike him, but he wasn't one of the boys.' (Woody English). But beneath the shyness was stubbornness — he held out after 1925, feuded with Donie Bush, refused to break up a double play. The loner had a spine. The shy man had pride. It cost him a World Series.",
    work_ethic: "ATHLETIC AND DEDICATED. Cuyler attended West Point during WWI. He worked in the Buick factory in Flint after the war. He didn't sign a professional baseball contract until age 22 — older than most prospects. He hit .254 in his first minor league season. He became a Hall of Famer. The work ethic was not flashy — it was patient, persistent, and ultimately explosive. The Flint Flash was a slow burn before he was a flash.",
    lifestyle: "SMALL-TOWN MICHIGAN. Born in Harrisville (population tiny), attended West Point, worked at Buick in Flint, signed at 22, played until 38. Devout Catholic — signed the cross before every at-bat, rare in the 1920s. Played all-star basketball in offseasons. His son opened Ki Cuyler's Bar & Grill in Harrisville after his death (burned down 2018). Coached for Cubs and Red Sox after playing. Died at 51 — heart attack, like Shocker, like so many 1920s players whose hearts gave out too soon.",
    era_adaptability: "VERY HIGH. Cuyler's skill set — speed, contact, gap power, defensive versatility — is the template for the modern five-tool outfielder. He'd be a centerfielder in today's game, batting leadoff or third, stealing 40+ bases, hitting .300, playing elite defense. The inside-the-park home run power wouldn't translate (modern fences), but the stolen bases, triples-to-doubles conversion, and line-drive approach would make him an MVP candidate in any era.",
    clubhouse_impact: "NEUTRAL TO SLIGHTLY NEGATIVE. The loner quality meant Cuyler didn't build deep clubhouse bonds. He wasn't disliked — 'they didn't really dislike him' — but he wasn't embraced either. The stubbornness with Bush damaged team chemistry in 1927. In ILB, Cuyler provides +0 to team morale but +3 to team offensive production. He makes teams better without making them closer.",
    tragic_element: "THE BENCHING. Kiki Cuyler hit .357 and won the 1925 World Series. Two years later, he was the best hitter on a pennant-winning team and DID NOT PLAY A SINGLE GAME in the 1927 World Series. He sat on the bench while the Pirates were swept by Ruth, Gehrig, and Murderers' Row. The 'Cuyler Case' almost overshadowed the Series itself. The fans wanted him. The manager didn't. The shy stutterer could not talk his way back into the lineup. The bat that beat Walter Johnson went silent when it mattered most — not because it failed, but because it was never allowed to swing.",
  },

  chemistry_traits: [
    { tag: "The Flint Flash", desc: "41 SB, 26 3B, 8 IPHR. 328 career SB. Fastest card in the Bashers. In ILB, Cuyler has +3 to baserunning, +2 to defensive range, and +1 to infield hit probability. Speed is not just a stat — it is a DIMENSION of play that affects everything." },
    { tag: "The Stutter", desc: "Cuyler stuttered — the nickname 'Kiki' may have originated from the way he said his own name. In ILB, Cuyler has -1 to all verbal interactions (negotiations, arguments with umpires, clubhouse speeches). But +1 to all non-verbal expression (the bat, the legs, the glove). The stutter taught him to communicate through action." },
    { tag: "Game Seven", desc: "1925 WS, Game 7, 8th inning, bases loaded, game tied 7-7, two outs, facing Walter Johnson. Two-run ground-rule double. First 3-1 comeback in WS history. In ILB, when Cuyler bats with bases loaded in a tie game in October, +3 to all offensive stats. This is the signature moment. It cannot be replicated in regular season play." },
    { tag: "The Benching", desc: "1927: Best hitter on a pennant-winning team. Benched by Donie Bush. Did not play in the World Series. Pirates swept by Yankees. In ILB, Cuyler has a non-zero chance of being benched by manager conflict. Roll d20 at start of each month: on 1, benched for the month. Cannot be overridden. The pride and the stubbornness are inseparable from the talent." },
    { tag: "Rice's Catch", desc: "1925 WS Game 3: Sam Rice tumbled over the fence catching Cuyler's line drive. Or did he? Rice's sealed letter wasn't opened until 1974. In ILB, when Cuyler and Rice are in the same game, one spectacular defensive play per game is UNCERTAIN — the result is sealed and revealed only after the game ends." },
    { tag: "The Catholic Sign", desc: "Devout Catholic. Signed the cross before every at-bat — rare in the 1920s. In ILB, Cuyler has +1 to composure in high-pressure situations. The ritual centers him. The faith is the foundation beneath the speed." },
    { tag: "Carey's Student", desc: "Max Carey — 10× NL stolen base leader — tutored Cuyler in baserunning: sliding technique, avoiding pickoffs, reading pitchers. In ILB, if Cuyler has played alongside a SPD 3+ teammate previously, his SB success rate improves permanently by 10%. The student eventually surpassed the teacher." },
    { tag: "The Factory Worker", desc: "Cuyler worked at the Buick plant in Flint, Michigan before signing at age 22. Hit .254 his first minor league season. In ILB, Cuyler has +1 to late-career durability. Men who worked in factories before playing baseball understood that baseball was easier than real work. The baseline was iron." },
  ],

  preferred_locations: [
    { location: "Forbes Field, Pittsburgh", affinity: "MAXIMUM / GLORY", note: "1925 WS Game 7: the double that beat Walter Johnson. 1924-1927 — the years when 'Cuy Cuy' echoed through the stands. .336 career BA with the Pirates (3rd all-time)." },
    { location: "The Basepaths", affinity: "MAXIMUM", note: "41 SB, 26 3B, 8 IPHR in 1925 alone. The basepaths were his canvas. He painted them with speed." },
    { location: "Wrigley Field, Chicago", affinity: "HIGH / SECOND ACT", note: "1928-1935. .328 BA with the Cubs. 228 H in 1930. Two NL pennants. The second life after Pittsburgh." },
    { location: "Harrisville, Michigan", affinity: "HOME", note: "Born there. Buried there. His son's bar was there until it burned down in 2018. Cuyler Park hosts an annual old-timers game." },
    { location: "The Bench (1927 WS)", affinity: "EXILE", note: "Sat while the Pirates were swept by Murderers' Row. The bat that beat Walter Johnson went silent. Not because it failed — because it was never allowed to swing." },
  ],

  momentum: {
    hot_triggers: [
      "Postseason — 1925 WS: .269 BA, 2 HR, the Game 7 double. Cuyler elevated in October. The bigger the moment, the better the bat.",
      "Late-season surges — .385 by mid-August 1925. 14 hits in 16 at-bats in late September. Cuyler finished seasons in 'a blaze of glory.'",
      "Running — when Cuyler was on the bases, everything accelerated. Stolen bases led to runs, runs led to wins, wins led to confidence.",
      "New teams — .285 his first year with the Cubs (injured), then .360 the next. The fresh start unlocked him.",
    ],
    cold_triggers: [
      "Manager conflict — the Bush feud destroyed his 1927 season. Cuyler's stubbornness meant the dispute could not be resolved quietly.",
      "Injuries — torn ankle ligaments (1927), injured hand running into wall (1928). The speed made him reckless. The recklessness cost him games.",
      "Second-half fades — .381 by June 11, 1926, then .288 in the second half. The blazing starts sometimes burned out.",
      "Isolation — the loner quality meant no one advocated for him when Bush benched him. No clubhouse allies to broker peace.",
    ],
    pressure_response: "TRANSCENDENT IN OCTOBER, FRAGILE IN POLITICS. Cuyler is the most paradoxical CLU card in the Bashers. He hit the WS-winning double against Walter Johnson in Game 7 — maximum clutch. But he was benched for the NEXT World Series by his own manager. The athletic pressure? He thrived. The interpersonal pressure? He crumbled. CLU = 3 reflects the on-field reality. The Benching reflects the off-field cost.",
  },

  action_card_seeds: [
    {
      title: "Bases Loaded, Walter Johnson",
      type: "Signature Moment / Maximum Clutch",
      text: "October 15, 1925. Forbes Field, Pittsburgh. Game Seven. Rain falling. Fog so thick the outfielders are shadows. Score tied 7-7. Bottom of the eighth. Two outs. Bases loaded. The pitcher is Walter Johnson — the Big Train, the greatest pitcher alive, winner of Games 1 and 4, pitching on a lame leg in the rain. Your right fielder steps in. He has hit .357 this season with 26 triples and 18 home runs. He signs the cross. Johnson pitches. Your right fielder swings. The ball rockets down the right field line. It drops fair. It rolls into the tarp. Two runs score. The umpires rule it a ground-rule double. Pirates 9, Senators 7. It holds. The World Series is over. Your right fielder has beaten Walter Johnson with the bases loaded in a tie game in the eighth inning of Game Seven. No team had ever come back from 3-1 to win a best-of-seven World Series. Until now.",
      origin: "1925 WS Game 7 — Cuyler's 2-run ground-rule double off Walter Johnson. First 3-1 comeback in WS history.",
    },
    {
      title: "The Bench",
      type: "Tragedy / Character",
      text: "1927. Your right fielder has hit .357, won the World Series, and led the National League in stolen bases. He is the most popular player in Pittsburgh. The fans chant his name — Cuy-Cuy, Cuy-Cuy — at Forbes Field. His new manager does not like him. On August 6, your right fielder fails to slide into second base on a force play. He is fined fifty dollars. He is benched. He does not start another game for the rest of the season. The Pirates win the pennant. They face the New York Yankees — Ruth, Gehrig, Murderers' Row — in the World Series. Your right fielder sits on the bench for all four games. He does not play. The Pirates are swept. The 'Cuyler Case' almost overshadows the Series itself. Your right fielder is traded to Chicago. The bat that beat Walter Johnson never swings in Pittsburgh again.",
      origin: "The Cuyler-Bush feud, 1927. Cuyler benched for the season and the WS. Traded to Cubs.",
    },
    {
      title: "Cuy Cuy",
      type: "Origin / Identity",
      text: "Your right fielder's real name is Hazen Shirley Cuyler. He stutters. When he tries to say his own name, it comes out doubled — Cuy-Cuy, Cuy-Cuy. Or: every time he chases a fly ball, the shortstop yells 'Cuy' and the second baseman echoes 'Cuy' and the fans start chanting 'Cuy Cuy' and the papers shorten it to Kiki. Either way: the name is an echo. The stutterer's echo. The fielder's echo. The crowd's echo. The name became the man. Kiki Cuyler — pronounced like two eyes opening.",
      origin: "Two origin stories for 'Kiki' — the stutter or the fielding calls. Both involve repetition, echo, doubling.",
    },
    {
      title: "The Factory and the Flash",
      type: "Origin",
      text: "Your right fielder attended West Point during the war. When the war ended, he went to work at the Buick plant in Flint, Michigan. He played industrial league baseball on weekends. At twenty-two — ancient for a prospect — he signed with the Michigan-Ontario League team in Bay City. He hit .254 his first year. He hit .354 his second year in the majors. The Flint Flash was not born fast. He was built in a factory, tested on an assembly line, and released into the world two years late, fully formed, and running.",
      origin: "Cuyler's path: West Point → Buick factory in Flint → minor leagues at 22 → .354 rookie season in Pittsburgh at 25.",
    },
    {
      title: "Rice's Catch",
      type: "Cross-Link / Mystery",
      text: "1925 World Series, Game 3. Your right fielder hits a line drive to right field. Washington's Sam Rice races to the fence. He leaps. He tumbles over the railing into the stands. He disappears. Seconds pass. He emerges with the ball. The umpire calls your right fielder out. The Pirates protest — a fan stuffed the ball into Rice's glove. Rice says nothing. He says nothing for forty-nine years. When he dies in 1974, a sealed letter is opened: 'At no time did I lose possession of the ball.' Your right fielder's line drive became the most famous catch — or non-catch — in World Series history. Two sealed letters in this set: Rice's catch and Rice's tornado. Both involve balls that disappeared and men who kept secrets.",
      origin: "Sam Rice's controversial catch in the 1925 WS Game 3 — the ball Cuyler hit. Rice's sealed letter opened after his death in 1974.",
    },
    {
      title: "Twenty-Six Triples",
      type: "Speed / Signature",
      text: "1925. Your right fielder hits twenty-six triples. Twenty-six. The second most in any season after 1900. He also steals forty-one bases and hits eight inside-the-park home runs. He scores one hundred forty-four runs. He has three hundred sixty-nine total bases. The Pirates' record. Everything about this season is RUNNING — running to first, running to second, running to third, running home. The ball leaves the bat and the legs take over. The Flint Flash doesn't hit home runs over fences. He hits triples into gaps and arrives before the throw. The speed is the power.",
      origin: "Cuyler's 26 3B in 1925 — 2nd most in any post-1900 season. Combined with 41 SB and 8 IPHR.",
    },
  ],

  art_direction: {
    face: "5'10\" 180 lbs — compact, athletic, FAST-looking. A handsome, shy face — the kind of face that looks away from the camera. Brown eyes that are alert but not assertive. There is something GENTLE in this face, something that doesn't match the violence of the swing or the aggression of the steal. This is the face of a man who signs the cross before he swings, who stutters when he says his own name, who dances alone at night. The shyness is not weakness — it is the shell around the speed.",
    attire: "Pittsburgh Pirates 1925 home whites. In full sprint — rounding second, heading for third, body leaning into the turn, dust rising. Or: in the batter's box, making the sign of the cross, bat cocked, eyes already reading the pitch. The body should look FAST even when still — the way a sprinter looks fast at the starting blocks before the gun fires. The uniform should be dirty — Cuyler slid, Cuyler dove, Cuyler ran into walls.",
    mood: "BRIGHT SPEED. This is the brightest card in the Bashers — not golden like Heilmann, not warm like Uhle, but ELECTRIC. The mood is the moment between the bat crack and the ball landing — that instant of pure kinetic possibility when nobody knows if it's a single, a double, or a triple. The mood is RUNNING. The mood is also SHY — there is a quiet center inside the speed, a stillness inside the flash. The cross before the swing.",
    style: "Full color — Bashers era — VIVID AND FAST. Bright greens (Forbes Field grass), sharp blacks (Pirates uniform), speed-blur whites. This card should feel like it's MOVING — the colors slightly streaked, the edges slightly blurred, as if Cuyler is running even on cardboard. The border should be BRIGHT GREEN — the color of fresh-cut outfield grass, the color of the gap where triples are born. THE ECHO — Cuy-Cuy, the name that doubles itself, the speed that multiplies. The card vibrates.",
    reference: "Ruth is the solar system. Gehrig is the axis. Rice is the sealed envelope. Cuyler is THE ECHO — the sound that doubles, the name that repeats, the speed that reverberates. He is the fastest object in the Bashers constellation — the one that moves so quickly it appears to be in two places at once. First base and third base. The batter's box and the outfield. The 1925 World Series and the 1927 bench. The hero and the exile. Cuy-Cuy.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", flashGreen: "#2d8a4e", pirateBlack: "#1a1a2e", speedWhite: "#f0f8f0", grassGreen: "#3a8b3a" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.flashGreen}10`, border: `1px solid ${C.flashGreen}25`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.flashGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.flashGreen, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.flashGreen}30`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function KikiCuylerCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = CUYLER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.pirateBlack} 0%, ${C.flashGreen}30 50%, ${C.pirateBlack} 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.cream, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.flashGreen, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ELITE CARD — Bashers Era — The Echo</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.flashGreen}`, boxShadow: `0 0 0 2px ${C.grassGreen}, 0 0 30px ${C.flashGreen}20, 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.pirateBlack}, ${C.flashGreen}, ${C.pirateBlack})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.cream, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.flashGreen}30`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.speedWhite}, ${C.flashGreen}08, ${C.grassGreen}05)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>⚡</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.flashGreen, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE ECHO</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.flashGreen, color: "#fff", padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.pirateBlack}ee`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.flashGreen}dd`, color: "#fff", padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ELITE • HOF 1968</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.flashGreen, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>born Hazen Shirley Cuyler • pronounced KY-KY KY-ler</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.flashGreen} />
              <StatBar label="POW" value={s.pow} max={5} color={C.pirateBlack} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.grassGreen} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.pirateBlack}, ${C.flashGreen}cc)`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OPS", val: d.real_stats.ops },{ label: "H", val: d.real_stats.hits },{ label: "3B", val: d.real_stats.triples },{ label: "HR", val: d.real_stats.home_runs },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "R", val: d.real_stats.runs },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.flashGreen, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1925 — NL MVP RUNNER-UP — 26 3B (2ND MOST POST-1900) — 8 INSIDE-THE-PARK HR</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.flashGreen}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.flashGreen}20` }}>
              {[{ label: "CAR AVG", val: ".321" },{ label: "CAR H", val: "2,299" },{ label: "CAR SB", val: "328" },{ label: "CAR 3B", val: "157" },{ label: "SB TITLES", val: "4" },{ label: ".300 SZN", val: "10" },{ label: "WS RINGS", val: "1" },{ label: "HOF", val: "✓" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.flashGreen, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.6 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ background: `${C.gold}15`, border: `1px solid ${C.gold}30`, borderRadius: 4, padding: 8, marginTop: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 900, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, marginBottom: 4, textAlign: "center" }}>1925 WORLD SERIES — GAME 7 — 8TH INNING</div>
              <div style={{ fontSize: 11, color: C.ink, textAlign: "center", lineHeight: 1.5 }}>Bases loaded • Tied 7-7 • Two outs • Facing Walter Johnson</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: C.flashGreen, textAlign: "center", fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>TWO-RUN DOUBLE → WORLD SERIES CHAMPIONS</div>
              <div style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", textAlign: "center", marginTop: 4, fontStyle: "italic" }}>First 3-1 comeback in best-of-7 WS history</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⚡ Fastest Basher", "🏆 WS Hero (1925)", "🚫 Benched for WS (1927)", "✝️ Devout Catholic", "🏭 Buick Factory Worker", "🗣️ Stutterer", "🏀 All-Star Basketball", "🎖️ West Point"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.flashGreen}08`, border: `1px solid ${C.flashGreen}20`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.flashGreen, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ELITE DOSSIER — {d.year} — THE ECHO</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.flashGreen}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.flashGreen : "transparent", color: tab === t.id ? "#fff" : C.medBrown, border: `1px solid ${tab === t.id ? C.flashGreen : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "tragic_element" ? "⚠ THE BENCHING" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "tragic_element" ? { color: C.warmRed } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.flashGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity.includes("GLORY") ? `${C.gold}20` : l.affinity.includes("EXILE") ? `${C.warmRed}20` : l.affinity.includes("HOME") ? `${C.traitGreen}20` : `${C.flashGreen}20`, color: l.affinity.includes("GLORY") ? C.gold : l.affinity.includes("EXILE") ? C.warmRed : l.affinity.includes("HOME") ? C.traitGreen : C.flashGreen, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.flashGreen }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.flashGreen}05`, border: `1px solid ${C.flashGreen}15`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type.includes("Maximum") ? `${C.gold}20` : a.type.includes("Tragedy") ? `${C.warmRed}20` : `${C.flashGreen}15`, color: a.type.includes("Maximum") ? C.gold : a.type.includes("Tragedy") ? C.warmRed : C.flashGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.pirateBlack}, ${C.flashGreen}, ${C.pirateBlack})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ELITE #{d.ilb_team} • HOF</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
