import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}waddell-rube.png`;

const PLAYER_DATA = {
  name: "Rube Waddell",
  nickname: "The Sousepaw",
  year: 1905,
  team: "Philadelphia Athletics",
  era: "1900s",
  ilb_team: "Banners AL1900",
  position: "SP",
  bats: "R",
  throws: "L",
  height: '6\'1"',
  weight: "196 lbs",
  born: "October 13, 1876 — Bradford, PA (born on Friday the 13th)",
  died: "April 1, 1914 — San Antonio, TX (age 37). Died from tuberculosis, weakened by standing in icy flood waters doing relief work.",
  hof: "Inducted 1946 (Veterans Committee). Connie Mack: 'He had more stuff than any pitcher I ever saw.'",

  real_stats: {
    season: 1905, games: 46, wins: 26, losses: 11, era: "1.48",
    innings: "328.2", strikeouts: 287, walks: 90, complete_games: 27,
    shutouts: 7, whip: "0.96", war: 10.7,
    career_wins: 193, career_losses: 143, career_era: "2.16",
    career_strikeouts: 2316, career_cg: 261, career_shutouts: 50,
    career_war: 56.1, no_hitters: 0, perfect_games: 0,
  },

  // ═══════════════════════════════════════════════════════════════
  // PITCHER STAT ENGINE
  // STF: 1.48 ERA → tier 5 (<1.50). K/9 = 7.86 → +1 bonus = 6, capped at 5. STF = 5.
  // CTL: BB/9 = 2.46 → tier 2 (2.0-2.49). WHIP 0.96 → +1 bonus = 3. CTL = 3.
  // STA: 328.2 IP → tier 4 (300-349). STA = 4.
  // DEF: Decent. Rating 0 — he was too distracted to field well.
  // CLU: Never pitched in a WS (injured in 1905). Rating 0.
  // OVR: STF(5)×2 + CTL(3)×1.5 + STA(4)×1 + DEF(0)×0.5 = 10+4.5+4+0 = 18.5 → normalized ≈ 10 (Elite)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 10,     // Elite / MVP — the most talented arm ever, limited by everything else
    stf: 5,      // 1.48 ERA in 1905. 287 K (led AL). K/9 of 7.86 — the highest in the dead-ball era by far. 349 K in 1904. Led ML in K 6 consecutive years. Connie Mack: 'More stuff than any pitcher I ever saw.' Maximum 5.
    ctl: 3,      // BB/9 of 2.46 in 1905 — 90 walks in 328 IP. K/BB ratio of 3.19 (excellent). WHIP 0.96. Control was good but not Walsh/Young level. The walks came from moments of distraction, not lack of command. Rating 3.
    sta: 4,      // 328.2 IP in 1905 — heavy workload but not Walsh-level (464 IP). Career 2,961 IP in 13 seasons. Rating 4.
    def: 0,      // Waddell was too erratic to field his position reliably. His defense was his arm, not his glove. Rating 0.
    clu: 0,      // NEVER pitched in a World Series. Injured his shoulder roughhousing with a teammate before the 1905 WS. The greatest "what if" in dead-ball October. Rating 0.
  },

  stat_justification: {
    stf: "1.48 ERA in 1905 — pitching Triple Crown (led AL in W, K, ERA). 287 K, more than double the runner-up in some years. 349 K in 1904 — a record that stood for 61 years until Koufax (1965). Led the major leagues in strikeouts 6 consecutive years (1902-07). K/9 of 7.86 — absurdly high for the dead-ball era. Mack said he had 'more stuff than any pitcher I ever saw.' An electric fastball, devastating curve, and a screwball — the most purely talented arm in baseball. Maximum 5.",
    ctl: "BB/9 of 2.46 in 1905 — 90 walks in 328 IP. K/BB ratio of 3.19, nearly 3-to-1 career. WHIP of 0.96. Waddell's control was genuinely good — his strikeout-to-walk ratio was elite. But the walks per 9 (2.46) place him in tier 2, and the WHIP bonus pushes to 3. He's not Walsh or Young in terms of pure command, but he's well above average.",
    sta: "328.2 IP in 1905. Career 2,961 IP in 13 seasons. Waddell averaged 277 IP per year during his peak. He was durable when he actually showed up. The limitation isn't physical stamina — it's that Waddell would disappear for days, skip starts, chase fire trucks. His effective IP is lower than his physical capacity because of absenteeism. Rating 4.",
    def: "Waddell was not a reliable fielder. He was too distracted, too unpredictable. He once called his entire defense off the field and pitched alone for an inning. This is magnificent theater but terrible defensive fundamentals. Rating 0.",
    clu: "NEVER pitched in a World Series. In 1905, the A's won the AL pennant — Waddell's best season. But he injured his shoulder roughhousing with teammate Andy Coakley on a train in September. He missed the WS entirely. The A's lost to the Giants (Christy Mathewson threw 3 shutouts). Waddell's absence is one of the great 'what ifs' in baseball. Rating 0.",
  },

  personality: {
    leadership_style: "The Chaos Engine. Waddell didn't lead — he happened. His presence on a team was like a hurricane: spectacular when it was working, devastating when it wasn't. You couldn't predict him, control him, or ignore him. Mack was the only manager who could tolerate him for more than a season.",
    temperament: "Childlike, impulsive, chaotic, kind. Waddell chased fire trucks. He played marbles with children in the streets. He ran into the stands to pet puppies. He was fascinated by shiny objects. He left games to go fishing. He wrestled alligators in the offseason. He was bitten by a lion after punching it. He performed in a melodrama called 'The Stain of Guilt,' where he improvised every line because he couldn't memorize them — and threw the villain actor across the stage. Modern commentators (Bill James and others) have suggested he may have had ADHD, autism, or a developmental disability. Whatever the diagnosis, Waddell was deeply lovable. Harry Davis said: 'If a friend in need applied to him for assistance, he was never turned away.'",
    work_ethic: "UNPREDICTABLE. When Waddell was on the mound, he was the most dominant pitcher alive. When he wasn't on the mound, he could be anywhere — a firehouse, a fishing hole, a bar, a melodrama, a circus. Mack paid him in singles so he wouldn't blow his salary on alcohol. Mack sent Pinkerton agents to California to fetch him. Waddell's commitment to baseball was total in the moment and nonexistent between moments.",
    lifestyle: "Born Friday the 13th. Grew up in rural Pennsylvania. Threw rocks at crows to protect seed plantings — developed his arm on the farm. Married and divorced 3 times (said he lost count of how many wives). Wore red under his uniform in case a fire alarm rang. Slept in firehouses. Tended bar. Acted in melodramas. Played semi-pro football. In his final years, he stood in icy flood waters doing relief work in Hickman, Kentucky. The exposure weakened him, and he died of tuberculosis in San Antonio at 37 — weighing 130 lbs. Connie Mack and Ben Shibe paid for his medical care: 'No expenses should be spared.'",
    era_adaptability: "IMPOSSIBLE TO PREDICT. Waddell's arm would translate to any era — his stuff was generationally dominant. His K/9 rate was decades ahead of his time. But would a modern team tolerate him? He'd need an extraordinarily patient manager, a supportive clubhouse, and probably a team of therapists and handlers. If managed perfectly, Waddell is a perennial Cy Young. If not, he never makes it out of spring training.",
    clubhouse_impact: "WILDLY POLARIZING. Some teammates loved him (Davis: 'lovable disposition'). Others hated him — the fistfight over a straw hat on a cross-country train, the scuffles with Ossee Schreckengost. Waddell's antics created two factions: those who found him charming and those who found him insufferable. He was traded because teammates demanded it.",
    dark_side: "The death. Waddell died at 37, down to 130 lbs, from tuberculosis aggravated by standing in icy flood waters to help strangers during the 1912 Hickman, Kentucky floods. The most gifted arm in baseball was destroyed not by overwork (like Walsh) but by the same impulsive kindness that defined everything about him. He rushed into danger to help people — just like he rushed off the mound to chase fire trucks. In ILB: Waddell carries a 'Noble Ruin' trait — his greatest strength (impulsive compassion) is also what kills him.",
  },

  chemistry_traits: [
    { tag: "Most Stuff Ever", desc: "Mack: 'More stuff than any pitcher I ever saw.' When Waddell is focused, +3 STF. The problem is the 'when focused' part." },
    { tag: "6× Strikeout King", desc: "Led ML in K for 6 consecutive years (1902-07). 349 K in 1904 — record for 61 years. Opposing batters gain the 'Intimidated' trait." },
    { tag: "Fire Truck", desc: "CRITICAL FLAW: Before every start, roll a d6. On a 1, Waddell chases a fire truck and misses the game. On 2-6, he pitches normally." },
    { tag: "Childlike", desc: "Waddell plays marbles with children, pets puppies, and is fascinated by shiny objects. +2 fan loyalty with families. -1 discipline." },
    { tag: "Sousepaw", desc: "Alcoholism. After every game, 25% chance Waddell goes on a bender and misses the next start. Mack pays him in singles to limit damage." },
    { tag: "Pinkerton Delivery", desc: "If Waddell disappears, a manager can spend resources to send agents to retrieve him. 80% success rate. Takes 1-3 games." },
    { tag: "Noble Ruin", desc: "Waddell's kindness is compulsive. If a crisis happens near the ballpark, Waddell will help — regardless of the game. This is beautiful. This is what kills him." },
    { tag: "Mack's Atom Bomb", desc: "Mack called Waddell 'the atom bomb of baseball.' +2 chemistry with Connie Mack. -2 chemistry with every other manager." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "When he was there, he was the most dominant pitcher alive." },
    { location: "Fire Station", affinity: "HIGH", note: "Slept in firehouses. Wore red under his uniform. Fascinated by fire." },
    { location: "Fishing Hole / River", affinity: "HIGH", note: "Left games mid-inning to go fishing. Found peace near water." },
    { location: "Street / Playground", affinity: "HIGH", note: "Played marbles with children. Cartwheeled off the mound." },
    { location: "Theater / Stage", affinity: "MEDIUM", note: "Starred in 'The Stain of Guilt.' Improvised every line. Threw the villain." },
    { location: "Bar / Saloon", affinity: "HIGH", note: "Alcoholism. Spent signing bonuses on benders. Tended bar in offseason." },
    { location: "Circus / Zoo", affinity: "MEDIUM", note: "Wrestled alligators. Punched a lion. Was bitten." },
    { location: "Dugout / Bench", affinity: "LOW", note: "Waddell struggled to stay seated. He wanted to be anywhere else." },
  ],

  momentum: {
    hot_triggers: [
      "Crowd energy — Waddell was a showman who fed off big audiences",
      "Strikeout challenges — if someone bet him he couldn't strike out every batter, he'd try",
      "Connie Mack's patience — the only man who could manage him",
      "New situations — Waddell was brilliant when things were novel and exciting",
    ],
    cold_triggers: [
      "Boredom — if Waddell lost interest, he'd literally leave",
      "Alcohol — benders could derail him for days",
      "Teammate conflicts — the straw hat fight, Schreckengost disputes",
      "Routine — Waddell couldn't handle repetition or structure",
    ],
    pressure_response: "UNKNOWN — TRAGICALLY. Waddell never pitched in a World Series because he hurt his shoulder roughhousing. The 1905 WS — his one chance — was lost without him. We will never know if Waddell could have out-dueled Mathewson. In ILB: Waddell's pressure response is a permanent question mark. He might throw the greatest game in history. He might chase a fire truck. There is no middle ground.",
  },

  action_card_seeds: [
    { title: "Three Forty-Nine", type: "Game Action", text: "Your pitcher strikes out 349 batters in a single season — a record that will stand for 61 years. Opposing lineups gain the 'Demoralized' trait for the entire season. Your pitcher gains +1 STF permanently.", origin: "Waddell struck out 349 batters in 1904, a record unsurpassed until Sandy Koufax fanned 382 in 1965. In some seasons, he had more than double the K of the runner-up." },
    { title: "The Fire Truck", type: "Drama", text: "Your pitcher sees a fire truck during a game. He bolts from the mound and chases it. The game is forfeited. Your manager loses -2 morale. But the crowd? The crowd loves him more.", origin: "Waddell had a legendary fascination with fire trucks and reportedly chased them during games. He slept in firehouses and wore red under his uniform." },
    { title: "Send the Pinkertons", type: "Action", text: "Your star pitcher has vanished. He might be in California. You dispatch two Pinkerton agents to retrieve him. Roll a d6: on 3+, they bring him back. On 1-2, he's wrestling alligators and they can't catch him.", origin: "Mack dispatched Pinkerton agents to California to sneak Waddell back to Philadelphia for the 1902 season. It worked — Waddell went 24-7 in half a season." },
    { title: "Waving Off the Defense", type: "Game Action", text: "Your pitcher calls all 8 fielders off the field and pitches alone. If he strikes out the side, +5 fan loyalty and the 'Showman' trait. If any batter puts the ball in play, it's a guaranteed hit.", origin: "In semipro ball, Waddell repeatedly dismissed his entire defense and pitched with nobody behind him. He struck batters out anyway." },
    { title: "The Stain of Guilt", type: "Drama", text: "Your pitcher takes a role in a traveling melodrama. He can't memorize his lines, so he improvises. He physically throws the villain actor across the stage. The show is critically acclaimed. Your pitcher gains +1 reputation but misses 2 weeks of games.", origin: "Waddell starred in 'The Stain of Guilt,' improvising every line. He threw the actor playing the villain across the stage during a scene. The play was well-reviewed." },
    { title: "The Missing World Series", type: "Drama", text: "Your ace injures his shoulder roughhousing with a teammate on a train. He misses the World Series entirely. Your team loses. The greatest 'what if' in franchise history is born.", origin: "Waddell hurt his shoulder wrestling Andy Coakley on a train before the 1905 WS. He missed the entire series. The A's lost to Mathewson's Giants 4-1." },
    { title: "Bitten by a Lion", type: "Drama", text: "Your pitcher attends a rival show featuring lions. He gets angry at a lion and punches it. The lion bites his pitching hand. He fully recovers. Because of course he does.", origin: "After the 1903 season, Waddell went to see a show with lions, punched one, and was bitten on his left (pitching) hand. He healed completely." },
    { title: "The Flood", type: "Drama", text: "Your retired pitcher stands in icy flood waters for hours, saving strangers. The exposure weakens him fatally. He dies at 37, weighing 130 lbs. His former manager pays for his care: 'No expenses should be spared.' The most talented arm in baseball is gone.", origin: "In 1912, Waddell did flood relief work in Hickman, KY, standing in icy water for hours. The exposure led to tuberculosis. He died April 1, 1914, at 37." },
  ],

  art_direction: {
    face: "Wild, expressive, childlike face — 6'1\" 196 lbs but looks younger than his years. Wide eyes with wonder in them. Disheveled hair. A smile that's half mischief, half innocence. The face of a man who might strike you out or chase a puppy — you won't know until the first pitch. There's something heartbreaking in the eyes if you look closely.",
    attire: "Philadelphia Athletics 1905 whites. The uniform is slightly askew — not sloppy, but the way a kid wears dress clothes. Left-handed delivery captured mid-motion — the famous fastball, all arm speed and violence. Or: standing on the mound with arms raised in celebration, about to cartwheel off. Maybe a hint of red visible under the collar (his fire-truck preparedness).",
    mood: "Chaotic joy meeting tragic inevitability. Waddell's card should feel like catching lightning in a bottle — brilliant and unstable. Not serene like Young, not grim like Walsh, not fierce like Cobb. This is pure, unfiltered energy — the most talented and most unpredictable force in baseball. There should be movement in the image, as if Waddell can't hold still even for a portrait.",
    style: "The most kinetic sepia card in the set. Slightly lighter and more dynamic than the dark Walsh or authoritative Young. Fire-orange undertones in the sepia — suggesting both the fire trucks he chased and the flame that burned too bright. The border should feel slightly off-kilter, as if the card itself can't quite contain him. Aged paper with character marks — water stains, perhaps (a subtle reference to the flood that killed him).",
    reference: "This is the T206 card that makes you stop and read the back three times because you can't believe one person did all of this. ILB sepia at its most alive and most tragic. The card should make you simultaneously laugh and cry. The most human card in the entire collection.",
  },
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

export default function RubeWaddellCard() {
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
          {side === "front" ? "\u25bc Flip Card \u2014 View Dossier \u25bc" : "\u25b2 Flip Card \u2014 View Front \u25b2"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position} (L)</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" \u2014 {d.team} \u2014 {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "K", val: d.real_stats.strikeouts },{ label: "BB", val: d.real_stats.walks },{ label: "IP", val: d.real_stats.innings },{ label: "CG", val: d.real_stats.complete_games },{ label: "WHIP", val: d.real_stats.whip },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS \u2014 {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "K RECORD", val: "349" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS \u2014 13 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["\u2b50 HOF 1946", "\ud83d\udc51 6\u00d7 K Leader", "\ud83d\udd25 Pitching Triple Crown '05", "\ud83d\udca5 349 K Record (61 yrs)", "\ud83d\ude92 Fire Truck Chaser", "\ud83d\udc0a Alligator Wrestler", "\ud83e\udd81 Punched a Lion", "\ud83c\udfad Melodrama Actor"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER \u2014 {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "\u26a0 Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
                      <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> \u2014 {l.note}</span></div>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="\ud83d\udd25 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>\u25b8 {t}</div>))}</Section>
                <Section title="\u2744 Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>\u25b8 {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Waddell's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (
                    <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                        <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span>
                      </div>
                      <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                      <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="\u26be Pitcher Stat Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Pitchers use STF (Stuff) / CTL (Control) / STA (Stamina) / DEF / CLU.</p>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, fontSize: 11 }}>STUFF \u2014 ERA tiers</div>
                    <div style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>&lt;1.50\u21925 | 1.50-1.99\u21924 | 2.00-2.49\u21923 | 2.50-2.99\u21922 | 3.00-3.49\u21921 | 3.50+\u21920</div>
                    <div style={{ fontSize: 10, color: C.traitGreen }}>Bonus: K/9 \u2265 6.0 \u2192 +1 (cap 5)</div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, fontSize: 11 }}>CONTROL \u2014 BB/9 tiers</div>
                    <div style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>&lt;1.0\u21925 | 1.0-1.49\u21924 | 1.5-1.99\u21923 | 2.0-2.49\u21922 | 2.5-2.99\u21921 | 3.0+\u21920</div>
                    <div style={{ fontSize: 10, color: C.traitGreen }}>Bonus: WHIP \u2264 1.00 \u2192 +1 (cap 5)</div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, fontSize: 11 }}>STAMINA \u2014 Innings Pitched</div>
                    <div style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>&lt;150\u21920 | 150-199\u21921 | 200-249\u21922 | 250-299\u21923 | 300-349\u21924 | 350+\u21925</div>
                  </div>
                </Section>
                <Section title="Waddell's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} \u2022 {d.position} \u2022 OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, throws: d.throws, era: d.era, ilb_team: d.ilb_team, stats: { ovr: s.ovr, stf: s.stf, ctl: s.ctl, sta: s.sta, def: s.def, clu: s.clu }, chemistry_traits: d.chemistry_traits.map(t => t.tag), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
