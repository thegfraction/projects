// /cards/players/carl-mays.jsx
import { useState } from "react";

const MAYS_DATA = {
  name: "Carl Mays",
  nickname: "Sub",
  year: 1921,
  team: "New York Yankees",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "SP",
  bats: "L",
  throws: "R",
  height: '5\'11"',
  weight: "195 lbs",
  born: "November 12, 1891 — Liberty, Kentucky",
  died: "April 4, 1971 — El Cajon, California (age 79)",
  hof: "NOT INDUCTED. 207-126, .623 W%, 2.92 ERA, 29 shutouts, 5× 20-win seasons, 4 WS champion teams. Bill James: 'Perhaps the only pitcher from his era to be fully qualified for the Hall of Fame but not to have been voted in.' The Chapman incident, personality, and 1921 WS fix rumors kept him out. The door to Cooperstown was closed by a pitch.",

  real_stats: {
    season: 1921,
    wins: 27,
    losses: 9,
    era: "3.05",
    games: 49,
    games_started: 38,
    complete_games: 30,
    shutouts: 7,
    innings_pitched: "336.2",
    strikeouts: 70,
    walks: 76,
    war: 7.6,
    win_pct: ".750",
    season_1920: "26-11, 2.65 ERA, 26 CG, 312 IP — the season Chapman died",
    career_wins: 207,
    career_losses: 126,
    career_era: "2.92",
    career_cg: 231,
    career_shutouts: 29,
    career_ip: "3,021.1",
    career_win_pct: ".623",
    ws_record: "3 W, 4 L (pitched in 3 WS)",
    twenty_win_seasons: 5,
    batting_avg: ".268 (career, as pitcher)",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION — 1921 SEASON
  //
  // STF: Submarine delivery — "like a cross between an octopus and a bowler."
  //      Knuckles scraped the dirt. Ball sailed and dipped unpredictably.
  //      "His fastball has a sudden dip to it that never gives a batter a chance to dodge."
  //      Not a high-K pitcher (70 K in 336 IP) — got outs through deception and movement.
  //      Led AL in HBP (1917). Known for pitching inside. The ball moved dangerously.
  //      STF = 4 (NEAR-MAXIMUM — the submarine delivery was devastating and unique).
  //
  // CTL: 76 BB in 336.2 IP (2.03 BB/9) — good but not elite control.
  //      The ball moved so much that even Mays couldn't always place it precisely.
  //      The HBP rate was high — the pitch sailed inside.
  //      CTL = 2 (adequate — he could locate but the submarine had a mind of its own).
  //
  // STA: 336.2 IP. 30 CG. 49 G. Led AL in all three. 231 career CG. 3,021 IP.
  //      Once threw two 9-inning CG victories on the same day (Aug 30, 1918).
  //      STA = 4 (NEAR-MAXIMUM — an absolute workhorse).
  //
  // DEF: "Regarded as an exceptional fielder." Also used as pinch-hitter (.268 career BA).
  //      DEF = 1 (good for a pitcher — contributed in ways beyond pitching).
  //
  // CLU: 4 WS champion teams (1915, 1916, 1918 Red Sox; 1923 Yankees).
  //      First Yankee to start a WS game (shutout Game 1, 1921 WS).
  //      But: 3-4 WS record overall. 1921 WS fix rumors (unproven).
  //      1916 WS: save in Game 1 (bases loaded, got final out), lost Game 3.
  //      CLU = 1 (capable in October but inconsistent, tainted by rumors).
  //
  // OVR: STF×2(8) + CTL×1.5(3) + STA×1(4) + DEF×0.5(0.5) + CLU×1.5(1.5) = 17 → normalized ~8
  // OVR = 8 (ALL-STAR) — the stats say HOF. The story says exile.
  // The gap between his statistical OVR and his reputation is the defining tension of the card.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,
    stf: 4,    // The submarine. "Like a cross between an octopus and a bowler." Knuckles on the dirt. Ball sailed and dipped. "His fastball has a sudden dip that never gives a batter a chance to dodge." The pitch moved in ways other pitches didn't. It moved in ways that killed a man.
    ctl: 2,    // Adequate. 2.03 BB/9 in 1921. But the submarine was inherently wild — it sailed inside. He led the AL in HBP. The pitch went where the pitch wanted to go. Sometimes that place was a man's temple.
    sta: 4,    // NEAR-MAXIMUM. 336.2 IP, 30 CG, 49 G — all led the AL. 231 career CG. 3,021 career IP. Two CG victories in one day (1918). An absolute horse.
    def: 1,    // Good fielder for a pitcher. Used as pinch-hitter (.268 career BA — extraordinary for a pitcher).
    clu: 1,    // 4 WS champion teams. First Yankee WS starter (shutout). But 3-4 WS record. Fix rumors (unproven). The cloud follows him everywhere — even into October.
  },

  stat_justification: {
    stf: "Carl Mays threw with a submarine delivery so pronounced that he sometimes scraped his knuckles on the mound. Baseball Magazine (1918): 'He shoots the ball in at the batter at such unexpected angles that his delivery is hard to find.' The ball sailed and dipped unpredictably. Ty Cobb: 'He was a submariner with a delivery that started around his knees, resulting in curious breaks of the ball and a tendency for it to sail toward a batter's skull.' He was not a strikeout pitcher (70 K in 336 IP), but the movement was devastating — batters couldn't track the ball. He led the AL in HBP in 1917 because the pitch moved so much. On August 16, 1920, the ball moved into Ray Chapman's temple. Chapman never moved. He probably never saw it. Rating of 4.",
    ctl: "Mays walked 76 batters in 336.2 IP in 1921 — a BB/9 of 2.03, which is respectable but not elite. His submarine delivery was inherently unpredictable — the ball sailed inside frequently. He led the AL in hit batsmen in 1917 and was known throughout his career as a pitcher who threw inside aggressively. The question with Mays was never whether he could throw strikes — he could — but whether the pitch would stay where he intended. The submarine had a mind of its own. Rating of 2.",
    sta: "336.2 innings pitched in 1921 — led the AL. 30 complete games — led the AL. 49 games pitched — led the AL. Career: 3,021.1 IP, 231 CG. On August 30, 1918, he threw two complete game victories on the same day against the Philadelphia Athletics (12-0 and 4-1) — the only Red Sox pitcher to ever accomplish this. He was a workhorse who could pitch every day if needed. Rating of 4.",
    def: "Mays was described as 'an exceptional fielder' and was used as a pinch-hitter throughout his career, posting a .268 batting average — extraordinary for a pitcher. He was a complete baseball player whose value extended beyond pitching. Rating of 1.",
    clu: "Mays was on four World Series champion teams (1915, 1916, 1918 Red Sox; 1923 Yankees). He was the first Yankee pitcher to start a World Series game — and he threw a shutout (Game 1, 1921 WS vs Giants). In the 1916 WS, he recorded a save by getting the final out with the bases loaded and the tying run on third. But his overall WS record is 3-4, and persistent (unproven) rumors that he threw games in the 1921 WS have shadowed his October legacy. Rating of 1.",
  },

  personality: {
    leadership_style: "ANTI-LEADERSHIP. Mays was the opposite of a clubhouse leader. He yelled at teammates who made errors. He fought them physically. He walked off the mound mid-game when he felt the Red Sox weren't trying, refused to return, and demanded a trade. He was not a leader — he was a force that teammates endured because he won 27 games a year. His 'leadership' was the leadership of a weapon: you don't follow it, you aim it and get out of the way.",
    temperament: "HOSTILE ISOLATION. F.C. Lane: 'A strange, cynical figure who aroused more ill will, more positive resentment than any other ballplayer on record.' Teammate Bob Shawkey, decades later: 'A stinker.' Mays had no friends in baseball. His father, a Methodist minister, died when Carl was 12. He 'internalized his grief, settling into a surly persona with few if any close friends.' This was a man built from loss and hardened by it — not sealed like Rice, but ARMORED. The armor repelled everyone.",
    work_ethic: "RELENTLESS. Whatever else Mays was, he was not lazy. 27 wins. 336 innings. 30 complete games. Two complete game victories in one day. He worked harder than almost anyone on any staff. The work was the only thing no one could criticize. 'I have long since ceased to care what most people think about me. I have a few good friends I can depend on and that is all I need and all I want. In the meantime, I have a wife and a family to support.'",
    lifestyle: "Minister's son from Kentucky to Oklahoma to Portland to New York to exile. Mays's life followed the arc of a man who was never welcome anywhere for long. Red Sox — walked off, forced a trade. Yankees — won 27 games, then the Chapman death, then the fix rumors. Reds, Giants — diminished roles. After baseball, he scouted for the Cleveland Indians — Chapman's team. He worked with kids, teaching them 'safety in baseball.' He returned to rural Oregon each offseason with hip waders stuffed with baseballs for local children. There was gentleness somewhere inside the armor.",
    era_adaptability: "HIGH. The submarine delivery would be devastating in modern baseball — there are very few true submariners, and the unfamiliarity factor alone would make Mays effective. His durability (336 IP) would obviously not translate to modern usage patterns, but his pitch characteristics — extreme movement, deception, ground balls — are exactly what modern teams value. He'd be a high-leverage reliever or a quirky starter who limited damage through movement.",
    clubhouse_impact: "NEGATIVE. Mays made teams worse in chemistry while making them better in the standings. He won games and lost friends. In ILB, Mays provides -2 to team morale while providing +2 to team wins. The tradeoff is the entire card: do you want to win, or do you want to be happy? Mays forces the question.",
    dark_side: "AUGUST 16, 1920. There is no avoiding it. Carl Mays threw the pitch that killed Ray Chapman — the only on-field death in MLB history. The pitch was a submarine fastball that sailed inside on a dark, overcast afternoon. Chapman never moved. The sound was so loud Mays thought it hit the bat. He fielded the ball and threw to first. Chapman died the next morning. Mays claimed the ball was wet and scuffed. He said he never intended to hit Chapman. Most witnesses believe Chapman simply never saw the ball. Mays: 'It was the most regrettable incident of my career, and I would give anything if I could undo what has happened.' He returned to the mound seven days later and threw a shutout. He won 27 games the next year. He was never forgiven. In ILB: 'The Death Pitch' — this is not a chemistry trait. It is a PERMANENT CONDITION. When Mays pitches, there is a non-zero chance of catastrophic HBP. The card carries weight that no other card carries. It is the heaviest card in ILB.",
  },

  chemistry_traits: [
    { tag: "The Submarine", desc: "Delivery so low his knuckles scraped the mound. 'Like a cross between an octopus and a bowler.' In ILB, Mays's pitches have +2 to movement but -1 to control. The ball dips and sails in ways other pitches don't. The unpredictability is the weapon and the danger." },
    { tag: "The Death Pitch", desc: "August 16, 1920: The pitch that killed Ray Chapman. In ILB, when Mays pitches inside, there is a small but real chance of catastrophic HBP. Roll d100 on every HBP: on 1, the batter is out for the season. This mechanic exists to honor the weight of what happened. It cannot be removed." },
    { tag: "Chapman's Shadow", desc: "The death follows Mays everywhere. In ILB, opposing batters who face Mays have +1 to fear-based K rate BUT -1 to comfort at the plate. Mays is more effective AND more dangerous simultaneously. Teams must decide if the wins are worth the risk." },
    { tag: "The Exile", desc: "HOF-caliber stats. No plaque. .623 W%, 207 W, 2.92 ERA, 5× 20-win seasons. In ILB, Mays's OVR cannot exceed 8 despite stat-qualifying for 9+. The exile is permanent. The door is closed." },
    { tag: "The Walkoff", desc: "In 1919, Mays walked off the mound mid-game with the Red Sox, refused to return, and demanded a trade. In ILB, if team morale drops below threshold, Mays may refuse to pitch (d6: on 1, he walks off). He can only be returned to the rotation through a trade or managerial confrontation." },
    { tag: "Coveleski's Opponent", desc: "August 16, 1920: Mays vs Coveleski. Both 18-8/18-9. The two best pitchers in the AL. The game in which Chapman died. In ILB, when Mays and Coveleski are matched against each other, the game carries +3 narrative weight. Something will happen. Something always happens." },
    { tag: "Four Rings, No Plaque", desc: "WS champion with 1915, 1916, 1918 Red Sox and 1923 Yankees. First Yankee to start a WS game (shutout). But 3-4 WS record and fix rumors. In ILB, Mays's WS ring count is highest in the Bashers but his reputation is lowest." },
    { tag: "The Minister's Son", desc: "Father was a Methodist minister who died when Carl was 12. 'Internalized his grief.' After baseball, Mays taught kids pitching and safety. Returned to Oregon with baseballs for children. In ILB, post-career Mays provides +1 to youth development. There was gentleness inside the armor." },
  ],

  preferred_locations: [
    { location: "The Polo Grounds, New York", affinity: "MAXIMUM / HAUNTED", note: "Where he won 27 games in 1921. Where Chapman died on August 16, 1920. The best and worst moments of his career happened in the same building." },
    { location: "The Mound", affinity: "MAXIMUM", note: "3,021 career IP. 231 CG. The mound was the only place Mays was fully himself — submarine delivery, knuckles on the dirt, ball sailing unpredictably toward the plate." },
    { location: "Fenway Park, Boston", affinity: "COMPLICATED", note: "Where he became a star (1915-1919). Where he walked off the mound and demanded a trade. Where he threw two CG victories in one day." },
    { location: "Kingfisher, Oklahoma", affinity: "ORIGIN", note: "Where he learned to play baseball after his father died. Where a cousin taught him the game. Museum exhibit in his honor at The Chisholm." },
    { location: "Cooperstown (Absent)", affinity: "EXILE", note: "He never went. .623 W%, 207 wins, 2.92 ERA. The door is closed. 'I have long since ceased to care what most people think about me.'" },
  ],

  momentum: {
    hot_triggers: [
      "The submarine working — when the ball is dipping and sailing, Mays is untouchable. 27 wins in a season.",
      "Hostility — Mays pitched better when he was angry, which was most of the time.",
      "Isolation — he performed best when he didn't care what anyone thought. Which was always.",
      "Proving them wrong — every year after 1920 was a year of proving the world wrong. He won 100 more games after Chapman.",
    ],
    cold_triggers: [
      "Teammates failing — Mays's breaking point was always teammates' errors. He'd rage, then collapse.",
      "The fix suspicion — the shadow of the 1921 WS rumors undercut his October credibility.",
      "Sympathy-seeking — Mays was at his worst when he tried to explain himself. His words always made things worse.",
      "Late career decline — after leaving the Yankees, his effectiveness dropped sharply. The exile was physical too.",
    ],
    pressure_response: "COMPLICATED AND CONTRADICTORY. Mays threw a WS shutout (Game 1, 1921) and went 3-4 overall in the WS. He won 27 games in the year after killing a man. He returned to the mound seven days after Chapman's death and threw a shutout. He performed under pressure — but the pressure itself was always moral, not athletic. The question with Mays was never 'can he pitch?' It was 'should he?' CLU = 1 reflects the ambiguity.",
  },

  action_card_seeds: [
    {
      title: "August Sixteenth",
      type: "Tragedy / Core Event",
      text: "August 16, 1920. Dark, overcast afternoon. The Polo Grounds. Your pitcher is Carl Mays, 18-8. The opposing pitcher is Stan Coveleski, 18-9. Two of the best in the American League. Ray Chapman leads off the fifth inning. Your pitcher delivers a submarine fastball, rising inside. The sound is so loud your pitcher thinks it hit the bat. He fields the ball and throws to first. Chapman is bleeding from his left ear. The umpire screams for a doctor. Chapman dies the next morning. He is the only player in Major League Baseball history to die from an on-field injury. Your pitcher claims the ball was wet and scuffed. Most witnesses say Chapman never moved. He never saw the ball. Your pitcher will win 100 more games after this day. He will never be forgiven.",
      origin: "The death of Ray Chapman, August 16, 1920. Mays vs Coveleski. Chapman died the following morning at St. Lawrence Hospital.",
    },
    {
      title: "The Submarine",
      type: "Mechanic",
      text: "'He shoots the ball in at the batter at such unexpected angles that his delivery is hard to find, generally, until along about 5 o'clock, when the hitters get accustomed to it — and when the game is about over.' Your pitcher throws from so low that his knuckles scrape the dirt on the mound. He looks like a cross between an octopus and a bowler. The ball rises from below the batter's knees and dips unpredictably as it crosses the plate. Nobody can read it. Nobody can dodge it. Nobody can hit it. Sometimes nobody can survive it.",
      origin: "Baseball Magazine (1918) description of Mays's submarine delivery.",
    },
    {
      title: "Twenty-Seven",
      type: "Season Arc",
      text: "The year after he killed a man, your pitcher wins twenty-seven games. He leads the American League in wins, innings pitched, games pitched, and winning percentage. He is the ace of the New York Yankees. He starts Game 1 of the World Series — the first Yankee pitcher to start a World Series game — and throws a shutout. He is the best pitcher in the league. Nobody wants to be in the same room with him.",
      origin: "1921: Mays went 27-9, led AL in W/IP/G/W%. First Yankee WS starter — threw a shutout in Game 1 vs Giants.",
    },
    {
      title: "The Walkoff",
      type: "Character",
      text: "1919. Your pitcher is 5-11 with the Boston Red Sox. He believes his teammates are not trying. He walks off the mound in the middle of a game. He leaves the ballpark. He refuses to return. He demands to be traded. The Red Sox trade him to the New York Yankees. He goes 9-3 the rest of the season. He goes 26-11 the next year. He goes 27-9 the year after that. He was right about the Red Sox. He was wrong about everything else.",
      origin: "Mays's walkoff in 1919 — left the Red Sox mid-game, refused to return, forced trade to Yankees.",
    },
    {
      title: "The Minister's Son",
      type: "Origin",
      text: "Your pitcher's father was a Methodist minister in Liberty, Kentucky. He died when your pitcher was twelve. Your pitcher internalized the grief. He settled into a surly persona with few if any close friends. He carried the loss into every clubhouse, every mound, every confrontation. The father who preached forgiveness raised a son the world would never forgive.",
      origin: "Mays's father, William Henry Mays, was a Methodist minister. He died when Carl was 12. The family moved to Oklahoma.",
    },
    {
      title: "The Scar",
      type: "Rivalry",
      text: "Ty Cobb and your pitcher have a running battle. Your pitcher throws inside. Cobb charges the mound. Cobb spikes your pitcher badly — the wound requires many stitches. For the rest of his life, your pitcher shows off the scar, almost as a badge of honor. Perhaps to prove he could take as good as he could give. 'I will say that Carl Mays and I never got along,' Cobb says later. 'I dodged a lot of them from him which gave me dark suspicions.'",
      origin: "Cobb's spiking of Mays during their feud. Mays showed the scar for the rest of his life.",
    },
    {
      title: "The Baseballs in the Waders",
      type: "Legacy / Redemption",
      text: "After baseball, your pitcher returns to rural Oregon each offseason with his hip waders stuffed with baseballs. The baseballs find their way into the hands of children. He works with kids. He teaches them pitching. He teaches them safety. 'I love working with kids, especially the pitchers. I try to teach them everything. But the big thing I do is teach them safety in baseball.' The man who threw the pitch that killed a man spends his remaining years teaching children how to be safe on a baseball field.",
      origin: "Mays's post-career work with youth baseball. He returned to Oregon with baseballs for local children and coached kids, emphasizing safety.",
    },
    {
      title: "Ceased to Care",
      type: "Character / Epitaph",
      text: "'I have long since ceased to care what most people think about me. I have a few good friends I can depend on and that is all I need and all I want. In the meantime, I have a wife and a family to support.' Your pitcher said this after Chapman died. He meant it. He won 100 more games. He was never inducted into the Hall of Fame. He died in 1971. He is buried in Portland, Oregon. The world still has opinions about Carl Mays. Carl Mays ceased to care.",
      origin: "Mays's statement to the press after Chapman's death. He was 28 years old.",
    },
  ],

  art_direction: {
    face: "5'11\" 195 lbs — solid, thick, not tall. A HARD face. Not cruel — CLOSED. Dark eyes that give nothing away. A jaw set against the world. This is the face of a man who was disliked by everyone and stopped caring decades ago. The face should suggest someone who has been judged and has judged back. There is no warmth in this face. There might be sorrow, deeply buried, but if it's there, it's armored over.",
    attire: "New York Yankees 1921 pinstripes. In the submarine delivery — arm sweeping up from below the knees, knuckles grazing the dirt, ball leaving the hand at an impossible angle. The body should be contorted, unnatural, serpentine. This is not a normal pitching motion. This is something alien. Or: on the mound, standing, staring at the batter with no expression. The uniform should be clean — Mays was a professional. The dirt is on his knuckles, not his clothes.",
    mood: "DARK WEIGHT. This is the heaviest card in ILB. Not sad like Rice. Not worried like Coveleski. HEAVY — the weight of having killed a man with a baseball and continuing to pitch for eleven more years. The mood is the moment after the crack of the ball against the skull — the silence before anyone understands what has happened. The mood is a man who threw a shutout seven days later. The mood is armor.",
    style: "Full color — Bashers era — but DARKEST in the set. Darker than Coveleski's coal. Deep blacks, charcoal, storm-gray. The ONLY card where the background suggests threat — not violence, but CONSEQUENCE. The Polo Grounds on an overcast afternoon. The light should be failing — late afternoon, dark clouds, the ball impossible to see. The border should be BLACK — pure, unrelieved, the color of the headline the next morning. This is not a card you display with pride. This is a card you hold with both hands because of the weight.",
    reference: "Ruth is the solar system. Gehrig is the axis. Coveleski is the mineshaft. Rice is the sealed envelope. Mays is THE BLACK PITCH — the darkest object in the Bashers constellation. The one that carries the most gravity. The one that changes everything it touches. Chapman is in the Muggers set. Sewell replaced Chapman and is in the Bashers. Burns gave Sewell the bat. Coveleski was pitching for Cleveland that day. Mays is the event that connects them all — the pitch that killed a man and birthed a decade. The card should feel like holding something that could break.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", stormBlack: "#0a0a0f", yankNavy: "#0c2340", charcoal: "#2a2a30" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.stormBlack}10`, border: `1px solid ${C.charcoal}25`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.warmRed, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.charcoal, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.charcoal}30`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function CarlMaysCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = MAYS_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.stormBlack} 0%, #050508 50%, ${C.stormBlack} 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.cream, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.charcoal, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ALL-STAR CARD — Bashers Era — ⚠ WEIGHTED</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.stormBlack}`, boxShadow: `0 0 0 2px ${C.charcoal}, 0 0 30px ${C.stormBlack}40, 0 12px 40px rgba(0,0,0,0.7), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.stormBlack}, ${C.charcoal}, ${C.stormBlack})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.cream, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.stormBlack}40`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.stormBlack}20, ${C.charcoal}10, ${C.warmRed}05)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>⚫</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE BLACK PITCH</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.stormBlack, color: C.cream, padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}ee`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.stormBlack}dd`, color: C.cream, padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ALL-STAR • ⚠ WEIGHTED</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.stormBlack} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.warmRed} />
              <StatBar label="STA" value={s.sta} max={5} color={C.charcoal} />
              <StatBar label="DEF" value={s.def} max={3} color={C.coldBlue} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.stormBlack}, ${C.charcoal})`, borderRadius: 4, padding: 10 }}>
              {[{ label: "W", val: d.real_stats.wins },{ label: "L", val: d.real_stats.losses },{ label: "ERA", val: d.real_stats.era },{ label: "W%", val: d.real_stats.win_pct },{ label: "CG", val: d.real_stats.complete_games },{ label: "SHO", val: d.real_stats.shutouts },{ label: "IP", val: "336" },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.warmRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1921 — LED AL IN W/IP/G/W% — FIRST YANKEE WS STARTER (SHUTOUT)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.stormBlack}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.charcoal}20` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR IP", val: "3,021" },{ label: "20-W SZN", val: d.real_stats.twenty_win_seasons },{ label: "WS RINGS", val: "4" },{ label: "HOF", val: "❌" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.charcoal, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.6 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["❌ Not in Hall of Fame", "📊 207-126, 2.92 ERA", "⚫ Chapman's Death (1920)", "🏆 4× WS Champion", "🐙 Submarine Delivery", "🚶 Walked Off Mound (1919)", "⚾ .268 Career BA (pitcher)", "🔇 'Ceased to Care'"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.stormBlack}08`, border: `1px solid ${C.charcoal}20`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.charcoal, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ALL-STAR DOSSIER — {d.year} — ⚠ WEIGHTED</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.charcoal}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.stormBlack : "transparent", color: tab === t.id ? C.cream : C.medBrown, border: `1px solid ${tab === t.id ? C.stormBlack : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ AUGUST 16, 1920" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.warmRed }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity.includes("HAUNTED") ? `${C.warmRed}20` : l.affinity === "EXILE" ? `${C.stormBlack}20` : l.affinity === "MAXIMUM" ? `${C.gold}20` : `${C.coldBlue}20`, color: l.affinity.includes("HAUNTED") ? C.warmRed : l.affinity === "EXILE" ? C.charcoal : l.affinity === "MAXIMUM" ? C.gold : C.coldBlue, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.warmRed, fontStyle: "italic" }}>⚠ These events carry weight. Handle with care.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.stormBlack}05`, border: `1px solid ${C.charcoal}15`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type.includes("Tragedy") ? `${C.warmRed}20` : a.type.includes("Redemption") ? `${C.traitGreen}20` : `${C.charcoal}15`, color: a.type.includes("Tragedy") ? C.warmRed : a.type.includes("Redemption") ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.stormBlack}, ${C.charcoal}, ${C.stormBlack})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ALL-STAR #{d.ilb_team} • ⚠</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
