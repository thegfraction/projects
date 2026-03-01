import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}mcinnis-stuffy.png`;

const PLAYER_DATA = {
  name: "Stuffy McInnis",
  nickname: "That's the Stuff, Kid",
  year: 1912,
  team: "Philadelphia Athletics",
  era: "1910s",
  ilb_team: "Muggers 1910",
  position: "1B",
  bats: "R",
  throws: "R",
  height: '5\'9½"',
  weight: "170 lbs",
  born: "September 19, 1890 — Gloucester, MA",
  died: "February 16, 1960 — Ipswich, MA (age 69)",
  hof: "NOT IN HOF. .307 career BA. 2,405 H. 5× WS champion (4 played). .991 career fielding %. ONE ERROR in 152 games (1921). 1,300+ consecutive errorless chances. 163 consecutive errorless games. 384 sacrifice hits (3rd all-time). 251 K in 19 seasons. $100,000 Infield anchor. The stone wall who invented modern first-base defense. Should be in the Hall. Isn't.",

  real_stats: {
    season: 1912, games: 153, at_bats: 571, hits: 187, doubles: 22,
    triples: 6, home_runs: 3, rbi: 101, runs: 73, stolen_bases: "~12",
    batting_avg: ".327", obp: "~.360", slg: "~.400", ops: "~.760",
    ops_plus: "~123", war: "~5.0",
    season_1911: ".321 BA — joined $100,000 Infield at age 20",
    season_1913: ".326 BA — WS champion, A's beat Giants",
    season_1914: ".314 BA — WS (swept by Miracle Braves)",
    season_1915_17: ".314/.295/.303 — stayed loyal through 3 last-place finishes",
    season_1918_ws: "Drove in only run of Ruth's 1-0 WS Game 1 victory",
    season_1921: ".307 BA — ONE error in 152 games, .9993 fielding %",
    season_1925_ws: ".368 BA (best on Pirates) — 4th WS title",
    career_avg: ".307", career_hits: 2405, career_hr: 20,
    career_rbi: 1063, career_games: 2128, career_war: "~28",
    career_k: "251 (in 19 seasons)", career_sac: "384 (3rd all-time)",
    career_fielding: ".991",
    errorless_1921: "1 error in 152 games / 1,651 chances / .9993",
    errorless_streak: "1,700 chances without error / 163 consecutive games",
    ws_titles: "5 (1910, 1911, 1913 A's; 1918 Red Sox; 1925 Pirates)",
    ws_titles_played: "4 with 3 different teams",
    hundred_k_infield: "McInnis (1B), Collins (2B), Barry (SS), Baker (3B)",
    low_k_club: "One of 3 players with multiple 600+ PA seasons under 10 K (with Sewell, Keeler)",
    sporting_life: "'A stone wall in defense, an irresistible force in offensive play' — 1913",
  },

  ilb_stats: {
    ovr: 7,      // Veteran — The anchor of the $100,000 Infield. .307 career BA. 2,405 H. 5× WS champion. The greatest defensive 1B of the dead-ball era. But: 20 career HR. Zero power at a power position. The OVR reflects the offensive limitation: at 1B, you need power, and McInnis had none. His value was defense, contact, and winning. The formula punishes him for zero POW.
    con: 4,      // .327 BA in 1912 → tier 4 (.300-.329). OPS+ ~123 → misses ≥130 bonus. .307 career BA. 2,405 career H. .300+ in 12 of 19 seasons. 251 K in 19 seasons — almost impossible contact rate. One of only 3 players with multiple 600+ PA seasons under 10 K. 384 sac hits (3rd all-time). The bat was a laser; it just didn't go far. Rating: 4.
    pow: 0,      // 20 career HR. ~1-3 HR per peak season → tier 0 (0-9). SLG ~.380-.400 → misses ≥.500 bonus by a wide margin. Pure singles/line-drive hitter. 'A good contact line drive hitter' — the description itself says no power. 20 HR in 2,128 games. At first base, this is devastating. Rating: 0.
    spd: 1,      // 'Decent speed on the base paths.' ~10-15 SB in peak years → tier 1 (6-15). Not a runner, but mobile enough. Originally a shortstop (1909), converted to 1B — had some athleticism. Rating: 1.
    def: 3,      // MAXIMUM. The case is overwhelming: (1) ONE error in 152 games (1921) — .9993 fielding %. (2) 1,300+ consecutive errorless chances (season record for decades). (3) 163 consecutive errorless games / 1,700 consecutive chances (record until Youkilis 2008). (4) .991 career fielding %. (5) Invented the 'knee reach' (full split stretch at 1B). (6) First to wear claw-type 1B glove. (7) First to catch one-handed naturally (not flashy like Hal Chase). (8) 'A stone wall in defense' — Sporting Life, 1913. The greatest defensive first baseman of the dead-ball era, and an innovator of modern 1B technique. Rating: 3.
    clu: 2,      // 5× WS champion (4 played): 1911, 1913 A's, 1918 Red Sox, 1925 Pirates. WS with 3 different teams. .368 BA in 1925 WS (best on Pirates at age 35). Drove in the only run of Babe Ruth's 1-0 WS Game 1 pitching victory (1918). Solid October performer, steady contributor. Not the WS sensation (that was Schang in 1913, Baker in 1911), but always present, always winning. Rating: 2.
  },

  stat_justification: {
    con: ".327 BA in 1912 → tier 4 (.300-.329). OPS+ ~123 → misses ≥130 bonus. Career: .307 BA, 2,405 hits. Batted .300+ in 12 of 19 ML seasons. 251 K in 19 seasons — one of the lowest K rates in baseball history. One of only 3 players (with Joe Sewell and Willie Keeler) to have multiple seasons with 600+ PA and fewer than 10 strikeouts. 384 career sacrifice hits (3rd all-time MLB). The contact was supernatural; the OBP was merely good. Rating: 4.",
    pow: "20 career HR in 2,128 games (~1 HR per year). Peak season HR: 3 (1912). SLG ~.380-.400 in peak years — nowhere near the ≥.500 bonus threshold. Pure singles and line-drive hitter. The gap between McInnis's contact ability (elite) and his power (nonexistent) is one of the widest in dead-ball history. At first base, where power is expected even in this era, this is a critical limitation. Rating: 0.",
    spd: "'Decent speed on the base paths' — various sources. ~10-15 SB in peak years → tier 1 (6-15). Originally a shortstop (1909), so he had some athletic agility. Converted to 1B where speed is less critical. Not slow, not fast. Rating: 1.",
    def: "MAXIMUM. The evidence: ONE error in 152 games, 1,651 chances for a .9993 fielding percentage (1921). 1,300+ consecutive errorless chances (season record for decades). 163 consecutive errorless games / 1,700 consecutive chances without error (record stood until Kevin Youkilis in 2008). .991 career fielding percentage. Invented the 'knee reach' — the full ground-level split stretch for wide throws. First to wear the claw-type first baseman's glove. First to catch one-handed naturally and efficiently. Sporting Life (1913): 'A stone wall in defense.' SABR: 'One of the earliest first basemen to excel at catching throws one-handed... in a way that appeared natural and not flashy, as was often the case with Hal Chase.' He INVENTED modern 1B defense. Rating: 3.",
    clu: "Strong but not maximum. 5× WS champion (4 played): 1911 A's, 1913 A's, 1918 Red Sox, 1925 Pirates. Won WS with 3 different teams. .368 BA in 1925 WS (best on Pirates, age 35). Drove in the only run of Babe Ruth's 1-0 WS Game 1 pitching victory (1918 — a significant historical moment). But: no single WS performance was 'the sensation.' McInnis was the steady presence, not the hero. He contributed, he won, he didn't dominate. Rating: 2.",
  },

  personality: {
    leadership_style: "THE LOYAL ANCHOR. McInnis defined loyalty: when Mack dismantled the dynasty after 1914, selling Collins, Baker, Barry — McInnis stayed. For three straight last-place finishes (1915-17), the last member of the $100,000 Infield remained in Philadelphia, turning down more money from the Federal League out of loyalty to Connie Mack. He batted .314, .295, and .303 on 43-109, 36-117, and 55-98 teams. The leadership was in the staying.",
    temperament: "STEADY AND PROFESSIONAL. No feuds, no controversies, no tantrums. McInnis was the consummate professional — a 19-year career across 6 teams with nothing but production and good citizenship. The nickname 'Stuffy' came from admiration, not mockery: 'That's the stuff, kid!' He was the stuff — reliable, consistent, unbreakable.",
    work_ethic: "THE INNOVATOR. McInnis didn't just play first base — he reinvented it. The knee reach (full split stretch), the claw-type glove, one-handed catching technique. These weren't gimmicks; they were solutions to the problem of being 5'9½\" at a position that favored tall men. He overcame his stature through technique, and his technique became the standard.",
    lifestyle: "GLOUCESTER TO HARVARD. Born in Gloucester, MA — a fishing town. Played 19 ML seasons. After baseball: coached at Norwich University (1931-44) and Harvard University (1949-54). The son of Gloucester became a professor's colleague at the nation's oldest university. The trajectory is American in the best sense.",
    era_adaptability: "LIMITED BY POWER. McInnis's .307 average and supernatural contact translate to any era. His defense innovated techniques still used today. But: 20 career HR. In modern baseball, a 1B who hits .307 with 1 HR per year does not play. The position demands power. McInnis in 2024 would need to add significant power or move to a utility role. His defensive innovations, however, changed the position forever.",
    clubhouse_impact: "THE GLUE. McInnis was the youngest member of the $100,000 Infield and outlasted them all. His loyalty through the cellar years (1915-17) set the tone for the organization. His quiet professionalism on 5 WS championship teams suggests a man who elevated everyone around him. The 'stone wall' wasn't just defense — it was character. +2 team stability, +1 infield morale, +1 loyalty.",
    dark_side: "The power void. In 2,128 games, McInnis hit 20 home runs. That's one HR per 106 games. At first base — even in the dead-ball era — this limited his offensive ceiling. His .307 average masked an OBP that was merely good (.357 career), not great. The lack of walks (compared to Schang's .393 OBP) and power meant McInnis was an elite contact hitter at a position that wanted more. Also: he's not in the Hall of Fame, and unlike Schang, the case for his inclusion is weaker — the 20 HR and modest OBP at 1B make it harder to argue.",
  },

  chemistry_traits: [
    { tag: "The $100,000 Infield", desc: "With Collins (2B), Baker (3B), and Barry (SS), McInnis forms the greatest infield of the dead-ball era. When all four are present, +2 DEF for entire infield, +1 team strategy, +1 RBI production. Bill James: greatest infield of all time (1914 edition)." },
    { tag: "The Stone Wall", desc: "ONE error in 152 games. .9993 fielding %. McInnis cannot commit more than 1 error per 150 games played. The wall does not break." },
    { tag: "The Last Man Standing", desc: "When Mack sold everyone, McInnis stayed. +2 loyalty. +1 morale for the team. But: -1 team quality (he's playing on a last-place team). Loyalty has a cost." },
    { tag: "The Knee Reach", desc: "McInnis invented the full-split stretch at 1B. +1 DEF on throws in the dirt. +1 DEF on wide throws. Balls that pass other 1B are caught by McInnis." },
    { tag: "251 Strikeouts in 19 Years", desc: "McInnis almost never strikes out. K rate reduced by 50%. When facing overpowering pitchers, McInnis makes contact. The ball is always in play." },
    { tag: "The Innovator's Glove", desc: "First claw-type 1B glove. First one-handed catching technique. McInnis's defensive innovations give +1 DEF to all future 1B who play on his team." },
    { tag: "Five Rings", desc: "5× WS champion with 3 different teams. Like Schang, wherever McInnis goes, the team wins. +1 team championship luck." },
    { tag: "Gloucester Grit", desc: "Born in a fishing town. The toughness of the sea. +1 durability. McInnis played 19 ML seasons and 2,128 games. The body held up." },
  ],

  preferred_locations: [
    { location: "First Base", affinity: "HIGH", note: "INVENTED modern 1B defense. Knee reach, claw glove, one-handed catching. ONE error in 152 games. The position belongs to him." },
    { location: "Batter's Box (RH)", affinity: "HIGH", note: ".307 career BA. 2,405 H. 251 K in 19 years. Contact machine from the right side." },
    { location: "Shibe Park / Philadelphia", affinity: "HIGH", note: "1909-1917. $100,000 Infield. 3 pennants. 2 WS titles. Stayed through 3 last-place years." },
    { location: "The World Series", affinity: "HIGH", note: "5× champion. .368 in 1925 WS. Drove in only run of Ruth's 1-0 WS Game 1 (1918)." },
    { location: "Gloucester, MA", affinity: "HOME", note: "Born in the fishing town. Massachusetts kid who coached at Harvard." },
  ],

  momentum: {
    hot_triggers: [
      "With the $100,000 Infield — McInnis thrives with elite teammates. The infield as a unit is greater than its parts.",
      "Contact streaks — 251 K in 19 years. McInnis is always in play, always producing.",
      "Defensive dominance — when the glove is working, NOTHING gets through. The stone wall holds.",
      "Championship situations — 5× WS champion. McInnis rises when the stakes rise.",
    ],
    cold_triggers: [
      "On losing teams — 3 straight last-place finishes (1915-17). McInnis produces individually but the context degrades.",
      "Facing overpowering stuff — his .307 average masks limited walks and zero power. Elite pitchers can limit him.",
      "When teammates leave — the $100,000 Infield was sold piece by piece. Each departure costs chemistry.",
      "Late-career fade — batted .264 in his final 3 seasons. The contact eventually declined.",
    ],
    pressure_response: "STEADY AND RELIABLE. McInnis was never the WS sensation (Baker in 1911, Schang in 1913), but he was always there, always producing, always winning. His 5 WS titles speak to a man who performed when it mattered. The .368 BA in the 1925 WS — at age 35, with his 4th championship team — shows the pressure response held up across his entire career. In ILB: McInnis is the steady 1B you never have to worry about. He won't win the WS by himself. He won't lose it, either.",
  },

  action_card_seeds: [
    { title: "One Error in One Hundred Fifty-Two", type: "Game Action", text: "Your first baseman plays 152 games. He handles 1,651 chances. He commits ONE error. His fielding percentage is .9993 — the closest thing to perfection a human has ever achieved at the position. The record will stand for decades. +5 DEF. +3 all-time record. The stone wall does not break.", origin: "1921: McInnis committed only 1 error in 152 games, handling 1,651 chances for a .9993 fielding percentage." },
    { title: "The Knee Reach", type: "Game Action", text: "The throw sails wide. Other first basemen watch it pass. Your first baseman drops into a full split — legs spreading impossibly wide, glove stretched to the limit — and catches the ball. The runner is out. He invented this move. It didn't exist before him. +2 DEF. +1 innovation. The position is forever changed.", origin: "McInnis invented the 'knee reach' — a full ground-level split to stretch for wide throws. He also pioneered the claw-type 1B glove and one-handed catching." },
    { title: "Ruth's Only Run", type: "Game Action", text: "Game 1 of the World Series. Babe Ruth is on the mound, pitching the Red Sox toward a 1-0 victory over the Cubs. The game's only run is driven in by your first baseman. Ruth gets the glory; your first baseman gets the win. +2 CLU. +1 quiet heroism. The run that won the game nobody remembers.", origin: "1918 WS Game 1: McInnis drove in the only run of Babe Ruth's 1-0 pitching victory over the Cubs." },
    { title: "The Last Man Standing", type: "Drama", text: "Collins is sold to Chicago. Baker goes to New York. Barry is sent to Boston. The $100,000 Infield is destroyed, piece by piece. Your first baseman stays. The Federal League offers more money. He stays. The Athletics go from first to last. He stays. Three consecutive last-place finishes. He stays. He bats .314, .295, .303. He stays. Loyalty has a cost. +3 loyalty. +2 integrity. -2 team quality. The stone wall stands alone.", origin: "1915-17: McInnis was the sole remaining member of the $100,000 Infield, staying loyal to Mack through 3 consecutive last-place finishes." },
    { title: "A Stone Wall in Defense", type: "Drama", text: "'A stone wall in defense, an irresistible force in offensive play, it is a matchless machine, in all human probability the finest that has ever been gathered together.' Sporting Life writes this about the $100,000 Infield in 1913. Your first baseman is the wall. The others are the force. Together, they win everything. +3 DEF. +2 team chemistry. The finest infield ever gathered.", origin: "Sporting Life, 1913, described the $100,000 Infield as 'the finest that has ever been gathered together.'" },
    { title: "That's the Stuff, Kid", type: "Drama", text: "A boy plays baseball in the suburban leagues of Boston. His play is spectacular. The crowd shouts: 'That's the stuff, kid!' The name sticks. He becomes Stuffy. He plays 19 seasons, wins 5 World Series, and coaches at Harvard. But he was always the stuff. +2 identity. +1 origin story. The nickname that told the truth.", origin: "McInnis gained his nickname from spectators in Boston suburban leagues who shouted 'that's the stuff, kid!' at his spectacular play." },
    { title: "Three-Sixty-Eight at Thirty-Five", type: "Game Action", text: "Your first baseman is 35 years old. He is on his sixth team. The World Series begins. He bats .368 — the best average on the Pittsburgh Pirates. They beat Walter Johnson's Senators. It is his fourth championship ring. Age has not slowed the contact. +3 CON. +2 CLU. +1 longevity. The stuff endures.", origin: "1925 WS: McInnis, age 35, hit .368 (best on the Pirates) as Pittsburgh beat the Senators for the championship." },
    { title: "From Gloucester to Harvard", type: "Drama", text: "Your first baseman retires. He was born in a fishing town. He coached at Norwich for 13 years. Then Harvard calls. The son of Gloucester coaches at the nation's oldest university. He teaches boys who will be senators and CEOs the same thing he taught himself: stay low, stretch wide, catch the ball. +3 post-career legacy. +1 education. The stuff transcends.", origin: "After playing, McInnis coached baseball at Norwich University (1931-44) and Harvard University (1949-54)." },
  ],

  art_direction: {
    face: "BOYISH, SPRY, DETERMINED. 5'9½\" 170 lbs — small for a first baseman, compact and wiry. SABR describes a 'boyish face' — younger-looking than his years, fresh, eager. The face should be BRIGHT and ALERT — the look of a man who was always ready, always in position, always where he needed to be. Not the weathered farmer (Baker) or the gentle giant (Jackson) or the intellectual (Collins) — McInnis is the EAGER KID who never stopped being eager. Gloucester, Massachusetts features — coastal New England, the salt air, the fishing-town toughness. Eyes sharp, expression focused, the look of a man about to stretch into a full split to save a wide throw.",
    attire: "Philadelphia Athletics uniform circa 1912 — white wool jersey with the iconic Old English 'A' on the left chest, elephant insignia, baggy flannel pants, flat cap. THE POSE: the stretch — McInnis in the full 'knee reach' he invented, legs in a ground-level split, glove extended to its maximum reach, catching a wide throw. The pose should emphasize his SHORT STATURE (5'9½\") and how he OVERCAME it through technique — the split stretch made him play taller than he was. The first baseman's glove should be visible — the claw-type he pioneered. Or: the batting stance — right-handed, compact, the line-drive swing that produced .307 over 19 years and only 251 strikeouts. Bat control personified. Or: standing with the full $100,000 Infield — McInnis at 1B, Collins at 2B, Barry at SS, Baker at 3B — 'the finest infield ever gathered.'",
    mood: "GRANITE AND PRECISION. McInnis's card should feel like NEW ENGLAND STONE — the granite of Gloucester's breakwater, the fieldstone walls of Massachusetts farms. Solid, angular, precise. Where Baker is warm earth and Crawford is open prairie, McInnis is CUT STONE — shaped, measured, exact. The mood should suggest engineering, the precision of a man who committed one error in 152 games.",
    style: "Sepia-toned with COOL GRANITE undertones — the gray of New England stone, the silver-blue of Gloucester harbor, the muted precision of a man who played defense like clockwork. The coolest palette yet — not the warm steel-blue of Schang, but GRANITE GRAY — harder, more angular, the color of the stone wall he was named for. The McInnis palette is PRECISION AND PERMANENCE.",
    reference: "Think the stretch — McInnis in the full split, glove extended, the ball about to hit leather. Or: the $100,000 Infield in formation, four men across the diamond, 'the finest ever gathered.' Or: McInnis alone at first base during the cellar years (1915-17) — the last man standing, the stone wall with no one behind it. The card should capture the tension between precision and isolation — the perfect first baseman on an imperfect team.",
  },
};

const C = {
  parchment: "#ece6d8", darkBrown: "#2d2319", medBrown: "#5e4a36",
  gold: "#b8974a", warmRed: "#7a3328", sepia: "#8f7858",
  cream: "#f7f1e5", ink: "#221a10", hotRed: "#b03d2e",
  coldBlue: "#3a6b8c", traitGreen: "#3f6b4d",
  silver: "#8a9098", granite: "#7a7f85",
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e0d8c6", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function StuffyMcInnisCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #221a10 0%, #171210 50%, #221a10 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.silver, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Muggers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.granite}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.granite, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.granite}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.granite}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 4 }}>
                <span style={{ background: `${C.warmRed}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>❌ NOT IN HOF</span>
                <span style={{ background: `${C.granite}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>VETERAN</span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.granite, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2, fontWeight: 700 }}>"THAT'S THE STUFF, KID"</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>{d.team} — {d.year}</div>
              <div style={{ fontSize: 10, color: C.warmRed, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>The Stone Wall • 1 Error in 152 Games</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ background: `${C.traitGreen}10`, border: `1px solid ${C.traitGreen}30`, borderRadius: 4, padding: 6, marginBottom: 12, textAlign: "center" }}>
              <span style={{ fontSize: 9, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>🧱 1 ERROR / 152 GAMES / .9993 FIELDING % • 1,700 CONSECUTIVE ERRORLESS CHANCES</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: ".327" },{ label: "OBP", val: "~.360" },{ label: "OPS+", val: "~123" },{ label: "WAR", val: "~5.0" },{ label: "H", val: "187" },{ label: "2B", val: "22" },{ label: "RBI", val: "101" },{ label: "K", val: "~12" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.silver, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1912 — .327 BA / 101 RBI / $100,000 INFIELD ERA</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: ".307" },{ label: "CAR H", val: "2,405" },{ label: "CAR K", val: "251" },{ label: "CAR SAC", val: "384" },{ label: "WS TITLES", val: "5" },{ label: "FLD %", val: ".991" },{ label: "'25 WS", val: ".368" },{ label: "CAR HR", val: "20" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.granite, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>$100,000 INFIELD • 251 K IN 19 YEARS • 384 SAC HITS (3RD ALL-TIME)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 5× WS Champion", "❌ Not in HOF", "🧱 Stone Wall Defense", "💰 $100,000 Infield", "✋ Invented Knee Reach", "⚾ 251 K in 19 Years", "🏟 Coached at Harvard", "🎣 Gloucester, MA"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.granite}15`, border: `1px solid ${C.granite}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.granite, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — MUGGERS 1910</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.granite}20`, color: l.affinity === "HIGH" ? C.traitGreen : C.granite, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : `${C.coldBlue}20`, color: a.type === "Drama" ? C.warmRed : C.coldBlue, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Stat Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.silver, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
