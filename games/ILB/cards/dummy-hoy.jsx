import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}hoy-dummy.png`;

const PLAYER_DATA = {
  name: 'William "Dummy" Hoy',
  nickname: "The Silent Star",
  year: 1894,
  team: "Cincinnati Reds",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "CF",
  bats: "L",
  throws: "R",
  height: '5\'4"',
  weight: "148 lbs",
  born: "May 23, 1862 — Houcktown, OH",
  died: "December 15, 1961 — Cincinnati, OH (age 99)",
  hof: "NOT in HOF. Campaign ongoing since 1990s. SABR 2018 Overlooked 19th-Century Legend. Cincinnati Reds HOF. American Athletic Association of the Deaf HOF (first inductee, unanimous). Career: .287 BA, 2,044 H, ~600 SB, 1,004 BB, .386 OBP. Record career OF putouts, total chances, CF games. Credited with inspiring hand signals for umpires.",

  real_stats: {
    season: 1894, games: 130, at_bats: 502, hits: 157, doubles: 23,
    triples: 7, home_runs: 5, rbi: 58, runs: 118, stolen_bases: 30,
    batting_avg: ".312", obp: ".397", slg: ".396", ops: ".793",
    ops_plus: 112, war: 4.2,
    of_assists: 45,
    career_avg: ".287", career_hits: 2044, career_hr: 40, career_sb: "~600",
    career_rbi: 726, career_runs: 1426,
    career_war: 32.5, career_obp: ".386", career_bb: 1004,
    career_games: 1798, career_of_po: 3958,
    career_of_tc: 4625, career_cf_games: 1726,
    deaf_since: "Age 2-3 (meningitis)",
    lived_to: 99,
  },

  ilb_stats: {
    ovr: 8,      // All-Star — the greatest deaf player in baseball history. Record-setting defensive CF. Elite OBP through walks. ~600 career SB. Changed the game itself through hand signals. The stats are All-Star; the impact is Mythic.
    con: 3,      // .312 BA in 1894 → tier 4 (.300-.329). But career .287 BA and OPS+ typically 110-120 (not ≥130 consistently). The walks (.386 career OBP, 1,004 BB) are elite but CON measures hitting. He was a good hitter, not a great one — the plate discipline and walks are captured in chemistry. Rating: 3.
    pow: 0,      // 5 HR in 1894. 40 career HR in 1,798 games. SLG .396 (no ≥.500 bonus). Zero power. He was 5'4" 148 lbs — the power was in his legs, not his bat. Rating: 0.
    spd: 3,      // 82 SB rookie year (led NL, 1888). ~600 career SB across multiple eras. Maximum speed. At 5'4", he was a blur on the basepaths. The speed also powered his CF defense — playing shallow, tracking down everything. Maximum: 3.
    def: 3,      // MAXIMUM. Record career OF putouts (3,958). Record total chances (4,625). Record CF games (1,726). 45 OF assists in one season (record). Threw out 3 runners at home plate from the outfield in ONE game. Led NL in OF putouts. Led majors in putouts, assists, AND fielding average in 1900 — only OF ever to lead all three. The deafness was an asset: no crowd noise, pure visual tracking of the ball. Maximum defense: 3.
    clu: 1,      // 1901 AL pennant (White Sox). Hit first AL grand slam. 4 pennant-winning teams. But no World Series (pre-1903 era). Last play of his career won a pennant. Rating: 1.
  },

  stat_justification: {
    con: ".312 BA in 1894 → tier 4 (.300-.329). Career .287 BA. OPS+ typically 110-120, not reaching the ≥130 bonus threshold consistently. He was a good contact hitter — left-handed, tiny strike zone (5'4\"), excellent plate discipline. But his value at the plate was OBP-driven: 1,004 career walks, .386 OBP. That discipline is captured in chemistry traits ('The Patience of Silence') rather than raw CON. Rating: 3.",
    pow: "5 HR in 1894. 40 career HR in 1,798 games. SLG .396 peak. He was 5'4\" and 148 pounds — there was no power. Zero home runs in most seasons. The bat produced singles, walks, and stolen bases, not extra-base hits. Rating: 0.",
    spd: "82 SB in his 1888 rookie year (led NL). ~600 career SB across multiple stolen base definitions. He was one of the fastest men in the league for over a decade. At 5'4\", the combination of quickness and baserunning intelligence was devastating. Connie Mack contemporaries called him one of the best baserunners alive. The speed also powered his outfield defense — he played shallow because he was fast enough to track down anything hit over his head. Maximum: 3.",
    def: "This is where Hoy transcends. Record career OF putouts: 3,958. Record total chances: 4,625. Record games in CF: 1,726. 45 OF assists in one season (1894) — a record. Threw out 3 runners at home plate from the outfield in ONE game (June 19, 1889) — only three players in history have done this. Led NL in OF putouts (359 in 1897). Led all majors in OF putouts, assists, AND fielding average in 1900 — the only outfielder ever to lead all three. His proudest personal achievement was the three thrown-out-at-home game. The deafness helped: no crowd noise distraction, pure visual concentration on the ball. He played shallow and relied on speed to compensate. Maximum defense: 3.",
    clu: "1901 AL pennant with Chicago White Sox. Hit the first grand slam in AL history. His last professional play (1903, Pacific Coast League) secured the pennant. Four pennant-winning teams across his career. But no World Series appearances (career ended before the 1903 WS). Rating: 1.",
  },

  personality: {
    leadership_style: "QUIET AUTHORITY. Hoy couldn't speak in the hearing world's language — so he led by example, by performance, by the sheer undeniable fact of his excellence. He taught his teammates sign language. He developed the signal system that coaches and umpires still use. He communicated through action, not words. In a sport defined by shouting and arguing, Hoy's silence was his loudest statement.",
    temperament: "Gentle, dignified, resolute. Never ejected from a game. Described as 'gentlemanly and polite, well-liked by teammates and fans.' Calm and collected in a sport that could be heated. Preferred to be called 'Dummy' — at age 95, he wrote to The Sporting News: 'Tell them to call me Dummy again, like they always did.' He wore the name they gave him and made it a badge of honor.",
    work_ethic: "RELENTLESS ADAPTATION. Hoy had to solve problems that hearing players never faced. He couldn't hear the umpire call balls and strikes — so he invented a signal system. He couldn't hear his coaches — so he developed visual cues. He couldn't hear the crowd — so the crowd invented Deaf Applause. Every obstacle became an innovation. Every limitation became a legacy.",
    lifestyle: "Ohio farm boy, shoe repairman, valedictorian, baseball pioneer, dairy farmer, personnel director for deaf workers at Goodyear, public speaker, umpire for Deaf baseball teams. Married Anna Marie Lowery. Ran a 60-acre dairy farm for 20 years. Lived to 99. Threw out the first pitch at the 1961 World Series at age 99. Died two months later. A life so full it needed a century to contain it.",
    era_adaptability: "PERFECTLY MODERN. Hoy's skill set — elite OBP, elite defense, elite speed, zero power — is the modern analytical prototype. He would be a leadoff hitter in any era. His disability would be better accommodated today. His plate discipline (.386 OBP) would be valued more than ever. And the signal system he inspired is still the foundation of baseball communication. He was playing Moneyball in 1894.",
    clubhouse_impact: "TRANSFORMATIVE. Hoy didn't just fit into teams — he changed how teams communicated. He taught teammates sign language. He developed signal systems that became universal. Fred Snodgrass (on Dummy Taylor's Giants): 'We could all read and speak the deaf-dumb sign language... he wanted to be one of us, to be a full-fledged member of the team.' Hoy's presence forced everyone around him to be more creative, more inclusive, more visual. In ILB: +2 team communication, +1 innovation.",
    dark_side: "The name. 'Dummy.' Every deaf player was called Dummy — Dummy Hoy, Dummy Taylor, Dummy Deegan, Dummy Leitner. It was the era's word for deaf-mute. Hoy wore it with grace — he preferred it to his given name. But the word itself carries the weight of a world that reduced deaf people to their disability. And the HOF exclusion: 99 years of life, 14 years of elite baseball, the signal system, the records — and still not in Cooperstown. The greatest overlooked player in baseball history remains overlooked.",
  },

  chemistry_traits: [
    { tag: "The Silence", desc: "Hoy is deaf. He cannot hear umpire calls, coach instructions, crowd noise, or opponent trash talk. Immune to all auditory distraction and intimidation. +1 focus permanently. The silence is a superpower." },
    { tag: "Signal Pioneer", desc: "Hoy's need for visual communication led to the development of umpire hand signals used in every baseball game ever played since. When Hoy is on the roster, all team communication is +1 efficiency. Signals replace shouting." },
    { tag: "Deaf Applause", desc: "Fans wave arms and hats instead of cheering. When Hoy makes a great play, the crowd performs Deaf Applause — +2 morale to all deaf/disabled players, +1 crowd energy. A new way to celebrate." },
    { tag: "The Patience of Silence", desc: "1,004 career walks. .386 OBP. He couldn't hear the calls so he learned to see the strike zone. +1 OBP permanently. Walks are not exciting but they are relentless." },
    { tag: "Smallest Giant", desc: "5'4\" 148 lbs — possibly the shortest CF in MLB history. -1 POW permanently. But: +1 SPD, +1 DEF (smaller target, lower center of gravity, faster first step). Size is not destiny." },
    { tag: "Three at the Plate", desc: "Threw out 3 runners at home plate from the outfield in one game (June 19, 1889). One of only three players in history. When Hoy is in CF, baserunners think twice. -1 opponent baserunning aggression." },
    { tag: "Valedictorian", desc: "Class valedictorian at Ohio School for the Deaf. Hoy is the smartest player on the field. +1 to all strategic decisions. He reads the game visually better than hearing players listen to it." },
    { tag: "Ninety-Nine Years", desc: "Hoy lived to 99. Threw out first pitch at 1961 World Series. He outlived nearly every player he ever played with or against. When Hoy retires from ILB, he remains in the game as a scout/coach/ambassador for 50+ additional years." },
  ],

  preferred_locations: [
    { location: "Center Field (shallow)", affinity: "HIGH", note: "Played shallow and used elite speed to track everything. Record CF games (1,726). Record OF putouts (3,958). The silent patrol." },
    { location: "The Basepaths", affinity: "HIGH", note: "~600 career SB. 82 SB as a rookie. The basepaths were where his size became an advantage — impossible to tag what you can't see." },
    { location: "Batter's Box (patient)", affinity: "HIGH", note: "1,004 career walks. .386 OBP. Tiny strike zone. He stood in the box and waited. The pitchers came to him." },
    { location: "Ohio / Cincinnati", affinity: "HIGH", note: "Born in Houcktown. Educated in Columbus. Five seasons with the Reds. Farm near Cincinnati. Died in Cincinnati. Ohio was home, always." },
    { location: "The Deaf Community", affinity: "HIGH", note: "Personnel director for deaf workers at Goodyear. Umpired Deaf baseball. Public speaker. First inductee in AAAD HOF. The community's champion." },
    { location: "Cooperstown", affinity: "LOW", note: "NOT THERE YET. 99 years of life. 2,044 hits. Record defense. Signal pioneer. Still waiting. The campaign continues." },
  ],

  momentum: {
    hot_triggers: [
      "Walking pitchers — each walk builds momentum. The patience compounds. By the 7th inning, he owns the zone.",
      "Visual tracking — he reads the pitcher's body language without auditory distraction. He sees what others hear.",
      "Stolen base situations — speed + intelligence + silence. The catcher never hears him coming.",
      "Defensive plays — every putout, every assist, every throw-out feeds his confidence. The glove is the engine.",
    ],
    cold_triggers: [
      "Power situations — when the team needs a home run, Hoy can't provide it. 40 career HR. The bat is singles and walks.",
      "Communication breakdowns — without proper signal systems, Hoy is at a disadvantage. Teams that don't adapt to his needs hurt him.",
      "Late-career decline — played until 42 but the speed faded. Without speed, the defense and baserunning drop.",
      "Dismissal — when opponents or media use 'Dummy' as mockery rather than respect, it stings even through the grace.",
    ],
    pressure_response: "STEADY AND RELIABLE. Hoy played for 4 pennant-winning teams across 4 different leagues. His last professional play won a pennant. He hit the first grand slam in AL history. He wasn't a dramatic clutch performer — he was a consistent, reliable presence who produced the same OBP, the same defense, the same baserunning in every situation. The silence steadied him. In ILB: he won't hit the walkoff homer, but he'll get on base, steal second, and score on a single. Every time.",
  },

  action_card_seeds: [
    { title: "The Signal System", type: "Origin", text: "Your deaf outfielder cannot hear the umpire's calls. He asks the third base coach to raise his right arm for a strike, left arm for a ball. The coach complies. Other players notice. Coaches adopt the system. Umpires adopt the system. Every baseball game played from this moment forward uses hand signals. One player's need becomes the sport's universal language. +5 legacy. +3 communication for all teams, all eras, forever.", origin: "Hoy is credited with inspiring the development of umpire hand signals for balls, strikes, and outs. While disputed by historians (Cy Rigler, Bill Klem, and Ed Dundon have competing claims), Hoy's need for visual communication was a driving force in the adoption of signals." },
    { title: "Three Thrown Out at Home", type: "Game Action", text: "Your 5'4\" center fielder throws out three baserunners at home plate — from the outfield — in a single game. One of only three players in baseball history to accomplish this. The arm is a cannon. The accuracy is surgical. The baserunners stop running. -3 opponent baserunning aggression for the rest of the series.", origin: "June 19, 1889: Hoy threw out 3 Indianapolis runners at home plate from center field. He later called it his proudest achievement in baseball." },
    { title: "Deaf Applause", type: "Drama", text: "Your player makes a spectacular catch. The crowd erupts — but he can't hear them. So they stand in the bleachers and wave their arms and hats, creating a silent ovation visible from center field. A new tradition is born. Deaf Applause. +3 crowd energy. +2 to all disabled players' morale. The world learns a new way to celebrate.", origin: "Fans at Hoy's games developed 'Deaf Applause' — waving arms and hats instead of cheering — so he could see their appreciation. The tradition persisted throughout his career." },
    { title: "The First Grand Slam", type: "Game Action", text: "Your outfielder hits the first grand slam in the history of the new league. The ball clears the fence — his 40th career home run isn't special for its distance but for its timing. Four runs score. History is made. +3 franchise legacy.", origin: "1901: Hoy hit the first grand slam in American League history while playing for the Chicago White Sox." },
    { title: "Forty-Five Assists", type: "Game Action", text: "Your center fielder records 45 assists from the outfield in one season — a record. Runners stop testing his arm. The outfield becomes a kill zone. +2 DEF for the entire season. -2 opponent baserunning.", origin: "1894: Hoy recorded 45 OF assists, a record that stood for decades. His arm from center field was devastatingly accurate." },
    { title: "Dummy vs. Dummy", type: "Game Action", text: "For the first and only time in Major League history, a deaf batter faces a deaf pitcher. Both communicate in sign language. The crowd is riveted. The umpire signals everything. The game within the game becomes visible. +3 cultural significance.", origin: "May 16, 1902: Hoy (batter) faced Dummy Taylor (pitcher, NY Giants) in the first and only all-deaf matchup in MLB history." },
    { title: "The Valedictorian", type: "Origin", text: "Your player graduated as valedictorian of the Ohio School for the Deaf. He opened a shoe repair shop. He played weekend baseball. A scout saw him hitting every pitch and told him to go to Milwaukee. The smartest kid in the school became the smartest player on the field. +1 to all strategic decisions. Intelligence compensates for everything.", origin: "Hoy was valedictorian at Ohio School for the Deaf. He opened a shoe repair business before being scouted for professional baseball." },
    { title: "Tell Them to Call Me Dummy", type: "Drama", text: "At age 95, your retired player writes to the sporting press: 'Tell them to call me Dummy again, like they always did.' The name they gave him — the word that meant deaf and mute and lesser — he wears it like a crown. He took their word and made it his name. +5 dignity. +3 legacy. The silence speaks.", origin: "At age 95, Hoy wrote to The Sporting News asking to be called Dummy, the name he'd carried his entire career. He died at 99 in 1961, two months after throwing out the first pitch at the World Series." },
  ],

  art_direction: {
    face: "SMALL. 5'4\" 148 lbs — the smallest man on any field he ever played on. But the face should radiate intelligence, dignity, and quiet intensity. Ohio farm boy features — honest, open, weathered. Eyes are the KEY: Hoy's eyes were his primary tool for processing the world. They should be sharp, alert, scanning — the eyes of a man who sees everything because he hears nothing. A gentle half-smile — the 'Dummy' who was the smartest man in the room.",
    attire: "Cincinnati Reds uniform circa 1894 — white wool jersey with red trim, 'CINCINNATI' or 'C' insignia, baggy flannel pants, flat cap. Hoy in center field: low ready crouch, positioned SHALLOW (closer to the infield than normal CF), eyes locked on the batter, glove ready. Or: the throwing motion — Hoy's arm cocked, about to fire a throw from CF to home plate, the runner already doomed. Or: at bat — tiny frame crowded over the plate, left-handed stance, the strike zone impossibly small. No number.",
    mood: "QUIET REVOLUTION. The card should feel like silence made visible — calm, focused, profound. Not the volcanic energy of Jennings or the golden speed of Lange. Hoy's card is STILL. The silence is the power. The field around him should feel almost hushed — as if the card itself has absorbed the noise.",
    style: "Sepia-toned with a distinctly SOFTER, warmer palette — gentler than other Banners cards. Where Jennings is furnace-red and Chesbro is autumn-amber, Hoy is WARM EARTH and QUIET GOLD. The palette suggests patience, dignity, and a life that lasted 99 years. The grain should be softer too — less aggressive, more contemplative. A card that rewards slow looking.",
    reference: "Think the shallow CF positioning — Hoy standing closer to the infield than any other outfielder, reading the batter's hands, the pitcher's release, the ball's trajectory. All visual. All silent. Or: Deaf Applause — the moment after the catch, Hoy looking up at the grandstand, fans waving arms and hats instead of screaming. He sees the love. He can't hear it. He doesn't need to. The card should capture that moment of silent connection between the player and his people.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", note: "Pre-1957: use historical defensive reputation. Records in OF putouts, total chances, CF games = maximum." },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "PS BA < .250", value: 0 },{ range: "PS BA .250-.299", value: 1 },{ range: "PS BA .300+", value: 2 }], bonus: "WS hero moment → +1 (cap 3)" },
};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536",
  coldBlue: "#3a6b8c", traitGreen: "#4a7c59",
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function DummyHoyCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Banners Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 4 }}>
                <span style={{ background: `${C.coldBlue}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>🤟 DEAF PIONEER</span>
                <span style={{ background: `${C.traitGreen}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>DEF 3</span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 10, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>Deaf since age 2. Changed baseball forever.</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ background: `${C.coldBlue}10`, border: `1px solid ${C.coldBlue}40`, borderRadius: 4, padding: 6, marginBottom: 12, textAlign: "center" }}>
              <span style={{ fontSize: 10, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>🤟 SIGNAL PIONEER — UMPIRE HAND SIGNALS TRACE TO HOY'S NEED</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "OF AST", val: d.real_stats.of_assists },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "RBI", val: d.real_stats.rbi },{ label: "R", val: d.real_stats.runs },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON — 45 OF ASSISTS (RECORD)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "CAR BB", val: d.real_stats.career_bb },{ label: "CAR OBP", val: d.real_stats.career_obp },{ label: "OF PO", val: d.real_stats.career_of_po },{ label: "OF TC", val: d.real_stats.career_of_tc },{ label: "AGE", val: d.real_stats.lived_to }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>LIVED TO 99 — THREW FIRST PITCH AT 1961 WORLD SERIES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🤟 Deaf Since Age 2", "✋ Signal Pioneer", "👐 Deaf Applause", "🏃 ~600 Career SB", "🧤 Record OF Putouts", "💪 3 Thrown Out at Home (1 Game)", "📖 Valedictorian", "🎯 45 OF Assists (Record)", "❌ Not in HOF"].map((a, i) => (
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
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
                      <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Hoy's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (
                    <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                        <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : a.type === "Origin" ? `${C.traitGreen}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : a.type === "Origin" ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span>
                      </div>
                      <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                      <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                      {data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Hoy's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
