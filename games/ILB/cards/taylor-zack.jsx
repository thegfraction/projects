// /cards/players/zack-taylor.jsx
import { useState } from "react";

const PLAYER_DATA = {
  name: "Zack Taylor",
  nickname: "The Man Who Sent Up a Midget",
  year: 1925,
  team: "Brooklyn Robins",
  era: "1920s",
  ilb_team: "Bashers NL1920",
  position: "C",
  bats: "R",
  throws: "R",
  height: '5\'11"',
  weight: "175 lbs",
  born: "July 27, 1898 — Yulee, FL (turpentine distiller's son)",
  died: "September 19, 1974 — Orlando, FL (age 76)",
  hof: "Not inducted. 58 years in professional baseball. Caught for Rollins College at age 14. Managed the worst teams in AL history. Sent Eddie Gaedel to bat. The most eventful career of any journeyman in baseball history.",

  real_stats: {
    season: 1925, games: 105, at_bats: 337, hits: 104, doubles: 22, triples: 5,
    home_runs: 3, rbi: 44, runs: 36, stolen_bases: 2, strikeouts: 19, walks: 15,
    batting_avg: ".310", obp: ".341", slg: ".415", ops: ".756", ops_plus: 96, war: 1.8,
    career_avg: ".261", career_hits: 748, career_hr: 9, career_rbi: 311,
    career_sb: 14, career_ops_plus: 61, career_war: 5.3, career_games: 918,
    career_cs_pct: "49.63% (19th all-time)",
    ws_1929: ".231 (3 H in 13 AB), cited as unsung defensive hero",
    managed: "1948-51 St. Louis Browns: 222-393 (.361 W%)",
    gaedel_date: "August 19, 1951",
  },

  // ═══════════════════════════════════════════════════════════════
  // STAT ENGINE
  // CON: .310 BA in best year → tier 4 (.300-.329). OPS+ 96 → no bonus. CON 4.
  // POW: 3 HR → tier 0 (0-9). SLG .415 → no bonus. POW 0.
  // SPD: 2 SB → tier 0 (0-5). Catcher. SPD 0.
  // DEF: Led NL C 3× in CS, 3× in range factor. 49.63% CS% (19th all-time). Spitball specialist. Personal catcher for Burleigh Grimes. DEF 2.
  // CLU: .231 in 1929 WS but cited as "unsung hero" for defense. Only 1 WS. CLU 1.
  // OVR: CON(4)×2 + POW(0)×1.5 + SPD(0)×1 + DEF(2)×0.5 = 8+0+0+1 = 9 → normalized ~4 (Bench Player)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 4,
    con: 4,  // .310 in 1925 (career high). Career .261 is weak, but his best year shows he could hit. Low walk rate though.
    pow: 0,  // 3 HR in his best year, 9 career. Zero power. A slap hitter behind the plate.
    spd: 0,  // 2 SB in 1925, 14 career. Catcher with no speed.
    def: 2,  // Led NL catchers 3× in CS, 3× in range factor, 2× in assists. 49.63% career CS% (#19 all-time). Spitball catching specialist — personal catcher for Burleigh Grimes (last legal spitballer). Helped develop Lon Warneke. Guided Cubs to 14 shutouts and 2nd-lowest NL ERA in 1929. DEF 2.
    clu: 1,  // .231 in 1929 WS (3-for-13) but cited as "unsung hero" for defensive work. Only 1 WS appearance as player. Tier 0 for BA but +1 for defensive hero recognition. CLU 1.
  },

  stat_justification: {
    con: ".310 BA in 1925 — his career year. But career .261 is below average. He only exceeded .280 twice in 16 seasons. Taylor was kept in lineups for his defense, game-calling, and ability to handle difficult pitchers (especially spitballers), not his bat. Rating of 4 reflects his peak, not his career norm.",
    pow: "3 HR in 1925, 9 career in 918 games. He didn't hit his first major-league HR until his 5th season (June 1, 1924). Zero power by any standard. Rating of 0.",
    spd: "2 SB in 1925, 14 career. A 175-lb catcher with no running game. Rating of 0.",
    def: "This is where Taylor earned his 16-year career. Led NL catchers 3× in range factor and caught stealing, 2× in assists, 1× in fielding percentage. His 49.63% career CS rate ranks 19th all-time. He was the personal catcher for Burleigh Grimes, the last pitcher legally allowed to throw the spitball — catching a spitball is extraordinarily difficult. He helped the 1929 Cubs to a league-leading 14 shutouts and 2nd-best ERA. Rogers Hornsby credited Taylor with developing Lon Warneke (22-win 1932 season). Rating of 2.",
    clu: ".231 in the 1929 WS (3-for-13) — poor offensively. But he was cited as an 'unsung hero in a losing cause' for his defensive work behind the plate. His consistent, unwavering defense kept the Cubs competitive in that series despite losing. One postseason appearance. Rating of 1.",
  },

  personality: {
    leadership_style: "The Invisible Man. Taylor spent 58 years in professional baseball — player, coach, manager, scout — and almost nobody knows his name, except for one stunt he didn't dream up. His leadership was quiet, competent, and completely unrewarded. He caught for Rollins College at 14, played in the majors for 16 years, coached championship teams, managed losing ones, and kept showing up. His gift wasn't talent — it was persistence, adaptability, and knowing more about the game than anyone in the room.",
    temperament: "STOIC AND SARDONIC. Taylor managed the worst teams in AL history (222-393, .361 W%) and never complained publicly. When Veeck bought the Browns and started pulling stunts, Taylor went along — he produced Gaedel's contract when the umpire protested, he held up signs for 'Grandstand Managers Night' while the fans voted on his decisions. He had learned from McGraw and McCarthy — two of the greatest managers ever — and ended up managing a team where the fans literally managed for him. The comedy of it must have been devastating, but Taylor took it with quiet dignity.",
    work_ethic: "58 YEARS IN BASEBALL. Caught for a college team at 14. Played in the minors at 16. Made the majors at 21. Played 16 seasons. Coached. Managed. Scouted. His career spanned from 1915 to 1973 — from the dead-ball era to the DH era. He saw everything: spitballs, the lively ball, World Wars, integration, expansion, and a 3'7\" man batting in an official game. Nobody in baseball history had a more complete view of the game's evolution than Zack Taylor.",
    lifestyle: "Small-town Florida boy. Born in Yulee, FL — population barely 500. Father was a turpentine distiller. Named 'Zack' after President Zachary Taylor by a teammate's stepdaughter who ribbed him about being related to 'old Rough and Ready.' He never was. Modest, unassuming, professional. The kind of man who spent 58 years doing a job and never asked for credit.",
    era_adaptability: "LOW as a player (his .261 career BA and 9 HR wouldn't cut it in any era). HIGH as a baseball mind — his defensive skills, game management, and pitcher development would be valued by any modern team. He'd be a catching coach or minor-league manager in the modern game, not a starter. But his knowledge would be irreplaceable.",
    clubhouse_impact: "THE GLUE MAN. Taylor was the backup catcher, the veteran presence, the guy who helped young pitchers develop. He caught spitballs from Grimes, caught Dazzy Vance's one-hitter, helped Warneke become a 22-game winner, guided the 1929 Cubs pitching staff to excellence. He was never the star — he was the infrastructure that made stars possible. He was also good friends with every teammate he had, including his platoon rival Hank DeBerry (they ribbed each other constantly about who could catch Vance better).",
    dark_side: "The Cruelest Punchline. Taylor managed the Browns for four years: 59-94, 53-101, 58-96, 52-102. Four consecutive last-place finishes. Good players were sold off to pay debts. Then Bill Veeck bought the team and used Taylor as a straight man for stunts — the midget, the fan-managed game. Taylor, who had learned from McGraw and McCarthy, was reduced to producing a 3'7\" man's contract while an umpire screamed 'What the hell?' He was fired after the 1951 season. 58 years in baseball, and his legacy is a punchline. In ILB: Taylor carries the 'Straight Man' trait — he enables other people's moments. The spotlight never finds him.",
  },

  chemistry_traits: [
    { tag: "The Straight Man", desc: "Enables other people's legendary moments. +2 to any teammate or owner's event/stunt. Taylor himself gets -1 to personal legacy." },
    { tag: "Spitball Whisperer", desc: "Personal catcher for Burleigh Grimes (last legal spitballer). +2 to any spitball pitcher's STF. Can handle unhittable/illegal pitches." },
    { tag: "58 Years", desc: "The longest career in baseball history. Taylor cannot be removed from the game — he's always there, in some capacity. Coach, scout, manager, advisor." },
    { tag: "The Gaedel Contract", desc: "Can produce a legitimate contract for any unusual player, bypassing protests. One-time use per season. The most famous piece of paper in baseball history." },
    { tag: "Pitcher Developer", desc: "+1 to any young pitcher's development. Credited with developing Lon Warneke. Guided staffs to league-leading stats." },
    { tag: "Grandstand Manager", desc: "Once per season, can let the fans manage the team. 70% chance of winning (the fans went 1-0). -1 to Taylor's dignity." },
    { tag: "Backup Catcher", desc: "Taylor is always the backup, never the starter. +1 when replacing an injured starter (see: filling in for Hartnett, 1929)." },
    { tag: "Yulee, Florida", desc: "Small-town roots. +1 humility, +1 adaptability. Immune to big-city pressure. Nothing fazes a turpentine distiller's son." },
  ],

  preferred_locations: [
    { location: "Behind the Plate (Backup)", affinity: "HIGH", note: "16 years as backup/platoon catcher. His natural habitat." },
    { location: "Coaching Box / Dugout", affinity: "HIGH", note: "Coach for Cubs, Browns, Pirates. The dugout is where he belongs." },
    { location: "Minor Leagues", affinity: "HIGH", note: "Player-manager in minors. Scout for decades. The backbone of organized baseball." },
    { location: "Sportsman's Park, St. Louis", affinity: "MIXED", note: "Managed the worst teams in history here. Also: the Gaedel game. Joy and misery in one building." },
    { location: "Spotlight / Press Conference", affinity: "LOW", note: "Taylor hated attention. He was the man behind the scenes, never in front of the camera." },
    { location: "Manager's Office (Big Leagues)", affinity: "LOW", note: "222-393 record. The job that broke him. Good players sold off, stunts instead of strategy." },
  ],

  momentum: {
    hot_triggers: [
      "Backing up an injured star — Taylor thrived as the 'next man up' (1929 Cubs pennant run)",
      "Handling difficult pitchers — spitballers, rookies, anyone who needed special attention",
      "Quiet competence — Taylor performed best when nobody was watching",
      "Teaching mode — developing young pitchers and catchers was his real gift",
    ],
    cold_triggers: [
      "Being the featured player — Taylor wasn't built to be the star",
      "Losing streaks — managed 4 consecutive 90+ loss seasons with the Browns",
      "Owner's stunts — being used as a straight man for Veeck's promotions",
      "Front office sabotage — good players being sold off, talent stripped from the roster",
    ],
    pressure_response: "CALM AND INVISIBLE. Taylor's 1929 WS performance was .231 at the bat but excellent behind the plate — 'unsung hero in a losing cause.' His pressure response is defensive, not offensive. He won't hit in October, but he'll call a great game, throw out runners, and keep the pitching staff together. In ILB: Taylor is the catcher you want for his defense and game management, not his bat. His pressure response is: the team around him performs better.",
  },

  action_card_seeds: [
    {
      title: "Send Up the Midget",
      type: "Game Action",
      text: "Your owner has signed a 3'7\" man to a legitimate contract. Bottom of the first inning. You, the manager, call back the leadoff hitter and send the tiny man to bat. The umpire screams 'What the hell?' You produce the contract. The man walks on four pitches. Baseball is never the same. +5 notoriety, +10,000 fans at the next game. -1 dignity. Banned by the Commissioner the next day.",
      origin: "August 19, 1951. Sportsman's Park. Zack Taylor sent Eddie Gaedel (3'7\", wearing uniform #1/8, popped out of a birthday cake between games) to bat against the Detroit Tigers. Taylor produced the contract. Gaedel walked on four pitches. It was voted baseball's #1 'Unusual and Unforgettable Moment' of the century.",
    },
    {
      title: "Grandstand Managers Night",
      type: "Game Action",
      text: "Your owner announces that tonight, the FANS will manage the team. You, the actual manager, hold up signs: 'Should we bunt?' 'Take out the pitcher?' 'Steal?' The fans vote yes or no. You follow their decisions. You win 5-3. The fans go 1-0 as managers. The next day, a fireworks display reads: 'Thanks GS Managers for a swell job. Zack manages tomorrow.'",
      origin: "August 24, 1951. Bill Veeck hosted 'Grandstand Managers Night.' Over 4,000 fans submitted lineups. Two were chosen to manage on the field. Taylor held up signs. The Browns won 5-3. It was the most democratic moment in baseball history.",
    },
    {
      title: "The Spitball Catcher",
      type: "Game Action",
      text: "Your catcher is the only man on the team who can handle the spitball — the nastiest, most unpredictable pitch in baseball. He becomes the personal catcher for the last legal spitball pitcher. +2 to the pitcher's STF when Taylor is catching. Without Taylor, the spitball is wild and uncatchable.",
      origin: "Taylor was Burleigh Grimes' personal catcher. Grimes was the last pitcher legally allowed to throw the spitball (grandfathered after the 1920 ban). Catching a spitball requires exceptional reflexes and soft hands.",
    },
    {
      title: "The Boy at Rollins",
      type: "Action",
      text: "A 14-year-old boy is so good at catching that the baseball coach at a college brings him up to catch for the college team. He's playing against men twice his age. He holds his own. Four years later, he's in the big leagues.",
      origin: "Taylor was recruited by the Rollins College baseball coach at age 14 to catch for the college team in Winter Park, Florida. He turned pro at 16 with the Valdosta Millionaires.",
    },
    {
      title: "McGraw's Idea",
      type: "Drama",
      text: "Your manager tells you a story: the great John McGraw once had the idea of keeping a very small person on the roster, to be used when the team needed a walk in the ninth inning. Twenty years later, an owner asks if you'd be willing to actually do it. You say yes. You tell him it's not even a new idea.",
      origin: "When Veeck approached Taylor about the Gaedel stunt, Taylor told him that John McGraw — under whom Taylor had played — had once had the same idea. Taylor had literally heard this idea from the greatest manager in baseball history decades earlier.",
    },
    {
      title: "222 Wins, 393 Losses",
      type: "Drama",
      text: "You manage a team for four years. You lose 100 games twice. Your best players are sold to pay debts. Your owner uses you as a prop for publicity stunts. You are fired. Your career record: 222-393. You learned managing from John McGraw and Joe McCarthy — two of the greatest ever — and this is what the game gave you.",
      origin: "Taylor managed the Browns from 1948-51: 59-94, 53-101, 58-96, 52-102. He was fired after the Gaedel season. The Browns' talent was constantly stripped to pay debts.",
    },
    {
      title: "Catching the One-Hitter",
      type: "Game Action",
      text: "Your regular catcher is unavailable, so you step in to catch for the team's ace. The ace throws a one-hitter, winning 1-0. Your rival — the regular catcher — tells you: 'I guess I showed you how to catch him.' Five days later, the ace throws a no-hitter with the regular catcher. Ribbing restored.",
      origin: "September 1925. Taylor caught Dazzy Vance's one-hitter (1-0 win). Rival catcher Hank DeBerry said Taylor didn't know how to catch Vance. Five days later, DeBerry caught Vance's no-hitter (10-1). Taylor admitted DeBerry earned the last word.",
    },
    {
      title: "The 58-Year Man",
      type: "Action",
      text: "A man spends 58 years in professional baseball: player, coach, manager, scout. He sees the dead-ball era, the live ball, two World Wars, integration, expansion, and a midget at bat. He never makes the Hall of Fame. He never manages a winning team. But he's always there — the constant in a changing game.",
      origin: "Zack Taylor was in professional baseball from 1915 to 1973. 58 years. Player (1920-35), coach (1941-47, 1951-53), manager (1946, 1948-51), scout (various). He saw everything the game had to offer.",
    },
  ],

  art_direction: {
    face: "Weathered, competent, unassuming. 5'11\" 175 lbs — lean, durable, built for squatting. Age 27 in 1925. Not handsome, not ugly — forgettable in the best sense. The face of a man who shows up every day for 58 years and never asks for credit. Quiet eyes that have seen everything. A slight sardonic twist to the mouth — he's in on the joke, even when the joke is on him.",
    attire: "Brooklyn Robins 1925 home whites for the player card. Catcher's gear — chest protector, shin guards, mask pushed up. The backup catcher's slightly rumpled look — he's been sitting on the bench and was just called into the game. Practical, functional, unflashy.",
    mood: "Quiet competence shading into weary humor. Taylor's card should feel like the most unassuming card in the collection — you'd almost skip past it. But the back of the card contains some of the most extraordinary stories in baseball history. The mood is: the unremarkable man in the most remarkable situations.",
    style: "Muted sepia, the least flashy card in the Bashers collection. No gold highlights, no dramatic lighting — just honest, workmanlike tones. The card should feel like a utility infielder's card that someone accidentally left in the pack. Then you flip it over and discover Eddie Gaedel, Grandstand Managers Night, Burleigh Grimes' spitball, and 58 years of baseball.",
    reference: "Think of the least valuable card in a pack that turns out to be the most interesting one. Zack Taylor is the card that nobody wants to pull but everybody wants to read. The front says 'backup catcher.' The back says 'the most eventful career in baseball history.'",
  },
};

const STAT_ENGINE = {
  contact: { metric: "BA + OPS+", tiers: [{ range: ".200-.249", value: 1 }, { range: ".250-.269", value: 2 }, { range: ".270-.299", value: 3 }, { range: ".300-.329", value: 4 }, { range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "0-9", value: 0 }, { range: "10-19", value: 1 }, { range: "20-29", value: 2 }, { range: "30-39", value: 3 }], bonus: "SLG ≥ .500 → +1" },
  speed: { metric: "SB", tiers: [{ range: "0-5", value: 0 }, { range: "6-15", value: 1 }, { range: "16-30", value: 2 }] },
  defense: { metric: "GG + reputation", tiers: [{ range: "No GG / poor", value: 0 }, { range: "1-2 GG", value: 1 }, { range: "3-5 GG", value: 2 }, { range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13" },
  clutch: { metric: "PS BA + moments", tiers: [{ range: "< .250", value: 0 }, { range: ".250-.299", value: 1 }, { range: ".300+", value: 2 }], bonus: "WS hero → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };
const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function ZackTaylorCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}><div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div><div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Bashers Era</div></div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}</button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Unassuming backup catcher, Robins whites, slightly rumpled, competent gaze]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}><div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div><div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 1 }}>"{d.nickname}"</div><div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.team} — {d.year}</div></div>
            <div style={{ marginBottom: 16 }}><StatBar label="CON" value={s.con} max={5} color={C.gold} /><StatBar label="POW" value={s.pow} max={5} color={C.warmRed} /><StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} /><StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} /><StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg }, { label: "HR", val: d.real_stats.home_runs }, { label: "RBI", val: d.real_stats.rbi }, { label: "OPS+", val: d.real_stats.ops_plus }, { label: "CS%", val: "50%" }, { label: "GAMES", val: "918" }, { label: "YEARS", val: "58" }, { label: "WAR", val: d.real_stats.war }].map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1925 SEASON (PEAK) • 58 YEARS IN PRO BASEBALL</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🎂 Sent Gaedel to Bat (1951)", "🎯 50% CS Rate (#19 Ever)", "💧 Spitball Catcher (Grimes)", "⚾ 1929 WS (Cubs)", "📋 58 Years in Baseball", "🏟️ Grandstand Mgr Night", "👶 College Ball at Age 14", "📊 222-393 as Manager"].map((a, i) => (<span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}><div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div><div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>{tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}</div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{["leadership_style","temperament","work_ethic","lifestyle","era_adaptability","clubhouse_impact"].map(k => (<Section key={k} title={k.replace(/_/g," ")}><p style={{ margin: 0 }}>{d.personality[k]}</p></Section>))}<Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section></>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ display: "inline-flex", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{t.tag}</div>))}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events from Taylor's real life, universalized as playable cards.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Taylor's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}><span>ILB CARD #{d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span></div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), action_seeds: d.action_card_seeds.length }, null, 2)}</pre>
      </div>
    </div>
  );
}
