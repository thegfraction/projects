import { useState } from "react";

const MUNGO_DATA = {
  name: "Van Lingle Mungo",
  nickname: "The Name That Became a Song",
  year: 1936,
  team: "Brooklyn Dodgers",
  league: "National League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "SP",
  bats: "R",
  throws: "R",
  height: "6'2\"",
  weight: "185 lbs",
  born: "June 8, 1911 — Pageland, South Carolina (mother's maiden name 'Lingle' became his middle name; drew scouts at age 15 with blazing fastball)",
  died: "February 12, 1985 — Pageland, South Carolina (age 73, heart attack; returned home after retirement, never left)",
  hof: "Not inducted. 120-115 (.511), 3.47 ERA, 1,242 K, 2,113 IP. 5× All-Star (1933-34, 1936-37, 1944). Led NL in K (238 in 1936). Led NL in K/9 three consecutive years (1935-37). The only quality pitcher on some very bad Dodgers teams. Dave Frishberg wrote a jazz song called 'Van Lingle Mungo' in 1969 — the name was too perfect not to sing.",

  real_stats: {
    season: 1936, wins: 18, losses: 14, era: "3.35",
    games: 37, games_started: 35, complete_games: 22,
    shutouts: 1, saves: 1, innings_pitched: "311.1",
    hits_allowed: 290, walks: 118, strikeouts: 238,
    whip: "1.311", win_pct: ".563", era_plus: 119,
    war: 5.9,
    career_wins: 120, career_losses: 115, career_era: "3.47",
    career_k: 1242, career_war: 23.9,
    career_cg: "unreported", career_ip: 2113,
  },

  ilb_stats: {
    ovr: 7,      // All-Star — 238 K on a bad team is impressive. 5× All-Star. Led NL in K. But: 120-115 career record (.511) dragged down by terrible Dodgers teams. 23.9 career WAR. Arm injury in 1937 cut short his prime. He averaged 16 wins/year from 1932-36 on teams that rarely finished above .500. The stuff was electric; the wins weren't there because the team wasn't there. OVR 7.
    stf: 4,      // 238 K in 1936 — led NL. Led NL in K/9 from 1935-37 (three consecutive years). 1,242 career K. Blazing fastball — Tommy Lasorda was nicknamed "Mungo" for his fastball. Casey Stengel and every successive manager believed Mungo would be a surefire star. The stuff was elite. STF 4.
    ctl: 0,      // 118 BB in 311.1 IP (3.4 BB/9). Led NL in walks in 1932, 1934, AND 1936. 1.311 WHIP. The fastball was electric but he had no idea where it was going. Erratic is the defining word. CTL 0.
    sta: 3,      // 311.1 IP in 1936. 22 CG. Averaged 250+ IP from 1932-36. He was a workhorse who threw hard for a long time — until his arm gave out in 1937. STA 3.
    def: 0,      // .960 fielding percentage — about league average. No particular defensive reputation. DEF 0.
    clu: 0,      // Never appeared in a World Series (Dodgers were terrible). Never pitched in October. The Dodgers finally won the pennant in 1941 — Mungo pitched only 2 games that year and was gone. The postseason never happened for him. CLU 0.
  },
  
  stat_justification: {
    stf: "238 K in 1936 — led NL. Led NL in K/9 for three consecutive years (1935-37). 1,242 career K. Blazing fastball that inspired his name being given to Tommy Lasorda as a nickname. Every manager who had him — Casey Stengel, Max Carey, Leo Durocher — believed he'd be a star. 'Known for a great fastball.' The stuff was undeniably elite. Rating of 4.",
    ctl: "118 BB in 311.1 IP (3.4 BB/9) in 1936. Led the NL in walks in 1932, 1934, AND 1936. 1.311 WHIP. The 'erratic fastball' description is universal. He threw hard but wild. Career 3.47 ERA despite elite stuff because the walks killed him. Rating of 0 — maximum wildness.",
    sta: "311.1 IP in 1936. 22 CG. Averaged 250+ IP from 1932-36 before the arm injury. He threw hard and he threw a lot — until his arm couldn't take it anymore. After 1937, won only 13 games over the next 6 years. Rating of 3.",
    def: ".960 fielding percentage — league average. No particular defensive reputation. Rating of 0.",
    clu: "Never appeared in a World Series. The Dodgers were terrible throughout his prime (1932-37). When Brooklyn finally won the pennant in 1941, Mungo pitched only 2 games and was sent to Montreal. He never got the October stage. Rating of 0.",
  },

  personality: {
    leadership_style: "The Lone Gunslinger. Mungo was the only quality pitcher on some of the worst teams in the NL. He'd average 16 wins a year from 1932-36 on teams that finished in the second division. Every season, he'd promise to win 20 games. Every season, the Dodgers would fail around him. The annual announcement became part of baseball's language: Brooklyn would solemnly declare that Mungo 'will win 20 games for us next season.' It was becoming 'part of the language, like the Gettysburg Address.' He was a one-man staff on a team that didn't deserve him.",
    temperament: "Volcanic. Erratic. Self-destructive. Magnificent. Mungo 'probably paid more in fines than any player of his era.' He punched a woman's husband in Havana, got attacked with a machete, and had to be smuggled out of Cuba in a laundry cart to a seaplane. When outfielder Tom Winsett botched a fly ball that cost him a win, Mungo destroyed the clubhouse and sent his wife a telegram: 'Pack up your bags and come to Brooklyn, honey. If Winsett can play in the big leagues, it's a cinch you can, too.' Leo Durocher said he 'sounded like Edgar Bergen doing Mortimer Snerd from the bottom of a well.' He fought with teammates, managers, opponents, and umpires — often all in the same week.",
    work_ethic: "Raw, untamed talent. Scout found him at 15 with a blazing fastball. He went from Pageland, South Carolina to the big leagues at 20. His debut: 9-inning shutout, 12 K, 3 hits against the Braves. He wore Dazzy Vance's shoes that day because he'd split the sole of his own. He stepped into Vance's shoes 'literally as well as figuratively' — the new ace of Brooklyn. But unlike Vance, nobody could teach Mungo control. The talent was God-given. The wildness was, too.",
    lifestyle: "Small-town South Carolina boy who never left. Born in Pageland. Died in Pageland. After retirement, he purchased and operated a movie theater called the Ball Theatre. He built a balcony to accommodate Black patrons who had previously been denied access — a quietly progressive act in Jim Crow South Carolina. He lived simply, ran his theater, and was surprised when Dave Frishberg wrote a jazz song around his name in 1969. The name was too musical to resist.",
    era_adaptability: "MODERATE-HIGH. The fastball velocity and strikeout rate would absolutely translate to modern baseball. Led the NL in K/9 for three straight years — that's a modern metric king. But the walks (118 in 311 IP) would terrify modern analytics departments. He'd be a high-K, high-BB flamethrower — think a 1930s version of Nolan Ryan with less longevity and more fistfights. Modern pitch design might have turned his fastball into something unhittable. Or modern media might have gotten him suspended.",
    clubhouse_impact: "COMBUSTIBLE. Mungo was beloved by fans and feared by teammates. He destroyed clubhouses. He sent insulting telegrams. He got into fights in Havana. He was fined constantly. But he was also the only reason anyone came to Ebbets Field during the worst Dodgers years. Without Mungo, Brooklyn had nothing. He was simultaneously the team's greatest asset and its most dangerous liability.",
    dark_side: "The arm injury. After the 1937 season — when he was still only 26 — Mungo's arm gave out. He'd thrown 311 IP in 1936 and continued to throw hard through '37. The arm simply couldn't sustain the workload and the velocity. After arm surgery in 1940, he switched from fastball to finesse and hung on for a few more years, but the electric version of Mungo was gone. Before the injury: 107-84 from 1932-37 with multiple All-Star appearances. After: 13-31 in 7 diminished years. Like Dean, a career cut in half by overuse. Unlike Dean, no World Series ring to show for it.",
  },

  chemistry_traits: [
    { tag: "The Erratic Fastball", desc: "+2 STF permanently from raw velocity. But CTL stays at 0 — he led the NL in walks 3 times. The fastball is unhittable when it's in the zone. It's just rarely in the zone." },
    { tag: "Havana Laundry Cart Escape", desc: "Once per career, Mungo gets into a fight in a foreign country and must be smuggled out in a laundry cart to a seaplane. -$200 fine, -1 discipline, +5 entertainment, +3 legend." },
    { tag: "The Winsett Telegram", desc: "When a teammate commits a critical error behind Mungo: 50% chance Mungo destroys the clubhouse and sends his wife a telegram insulting the teammate. -1 team morale, +2 entertainment." },
    { tag: "Twenty Wins Next Year", desc: "Every offseason, Brooklyn announces Mungo will win 20 games. He never does. +1 hope in spring, -1 hope in September. The annual tradition is 'part of the language, like the Gettysburg Address.'" },
    { tag: "Dazzy Vance's Shoes", desc: "Mungo wore Vance's shoes in his debut (split his own sole). He stepped into the ace role 'literally and figuratively.' When inheriting a franchise legacy: +1 STF for first season." },
    { tag: "The Most Fined Player", desc: "Mungo paid more fines than any player of his era. -$50-200 per incident. Incidents occur at a rate of ~5 per season. The fines never change his behavior." },
    { tag: "One-Man Staff", desc: "When Mungo is the only quality SP on the roster: +1 STF and +1 STA (he rises to the occasion). But -1 W because the team behind him can't hit or field." },
    { tag: "The Song", desc: "In 1969, jazz musician Dave Frishberg writes a song called 'Van Lingle Mungo' because the name is too perfect not to sing. +10 post-career fame. The name outlasts the career." },
  ],

  preferred_locations: [
    { location: "Ebbets Field / Brooklyn", affinity: "HIGH", note: "11 years. The only quality arm. The fans loved him even when the team was terrible." },
    { location: "The Mound — Strikeout Zone", affinity: "HIGH", note: "238 K in 1936. Led NL in K/9 three straight years. When the fastball works, nobody touches it." },
    { location: "Pageland, South Carolina", affinity: "HIGH", note: "Born here. Died here. Ran the Ball Theatre. Built a balcony for desegregation. Never left." },
    { location: "The Clubhouse (post-loss)", affinity: "MEDIUM", note: "Where he destroyed equipment and sent telegrams after errors. The clubhouse feared him." },
    { location: "Havana, Cuba", affinity: "LOW", note: "Punched a husband. Attacked with a machete. Escaped in a laundry cart to a seaplane. Never going back." },
    { location: "October / Postseason", affinity: "NONE", note: "Never appeared. The Dodgers were terrible. The stage he deserved was the stage he never got." },
  ],

  momentum: {
    hot_triggers: [
      "Strikeout streaks — when the fastball is humming, he K's everyone. 238 K in 1936.",
      "Anger — after a teammate's error, Mungo gets furious and throws even harder.",
      "Early season — he always starts strong. The '20 wins' promise fuels April confidence.",
      "Debut energy — his first game was a 12-K shutout. When facing a new opponent, +1 STF.",
    ],
    cold_triggers: [
      "Walks — 118 BB in 1936. When the control goes, everything goes. The plate disappears.",
      "Teammate errors — Winsett moments. Mungo loses focus and loses composure.",
      "Arm fatigue — after 250+ IP, the velocity drops and the arm starts to fail.",
      "Off-field chaos — Havana. Fines. Suspensions. The distractions pile up.",
    ],
    pressure_response: "UNKNOWN — HE NEVER GOT THE CHANCE. Mungo never pitched in a World Series. The Dodgers were terrible throughout his prime. When Brooklyn finally won the 1941 pennant, Mungo pitched only 2 games and was sent to the minors. The most tantalizing what-if in 1930s baseball: what would Van Lingle Mungo have done in October? We'll never know. The fastball that struck out 238 in a season never got to hum under the World Series lights.",
  },

  action_card_seeds: [
    {
      title: "The Name That Became a Song",
      type: "Drama",
      text: "Your pitcher retires. Twenty-four years later, a jazz musician writes a song. The song is nothing but baseball players' names — but the title, the chorus, the hook, is your pitcher's name. Because the name is too perfect. Van Lingle Mungo. It sounds like music already. The song becomes a classic. The name outlasts the career.",
      origin: "1969: Dave Frishberg wrote 'Van Lingle Mungo,' a jazz song composed entirely of baseball player names. The song is now a classic.",
    },
    {
      title: "The Havana Laundry Cart",
      type: "Drama",
      text: "Your pitcher is in Havana during spring training. He gets involved with a woman. The woman's husband appears. Your pitcher punches the husband in the eye. The husband attacks with a butcher knife. A team executive smuggles your pitcher into a laundry cart, wheels him to a wharf, and loads him onto a seaplane. He escapes Cuba in a laundry basket. He is fined $200.",
      origin: "Mungo's infamous Havana incident — punched a husband, fled a machete, escaped in a laundry cart to a seaplane.",
    },
    {
      title: "If Winsett Can Play in the Big Leagues",
      type: "Action",
      text: "Your pitcher is protecting a slim lead. Your outfielder drops a routine fly ball. The lead is gone. Your pitcher retreats to the clubhouse, destroys everything he can destroy, and throws into the field what he cannot destroy. Then he sends his wife a telegram: 'Pack up your bags and come to Brooklyn, honey. If Winsett can play in the big leagues, it's a cinch you can, too.'",
      origin: "After Tom Winsett botched a fly ball, Mungo destroyed the clubhouse and sent his wife the famous telegram.",
    },
    {
      title: "Twenty Wins Next Year",
      type: "Action",
      text: "Every December, your team solemnly announces that your star pitcher 'will win 20 games next season.' He never does. But the announcement keeps coming. Year after year. It becomes tradition. It becomes ritual. It becomes 'part of the language, like the Gettysburg Address.'",
      origin: "Brooklyn's annual declaration that Mungo would win 20 games became a national joke. He never did.",
    },
    {
      title: "Dazzy Vance's Shoes",
      type: "Action",
      text: "Your rookie pitcher splits the sole of his shoe before his debut. The only pair that fits belongs to the aging ace — the legend whose job your rookie is about to take. Your rookie wears the legend's shoes. He throws a 9-inning shutout with 12 strikeouts. He steps into the ace role literally and figuratively.",
      origin: "Mungo wore Dazzy Vance's shoes in his MLB debut — a 12-K shutout of the Braves.",
    },
    {
      title: "238 Strikeouts on a Last-Place Team",
      type: "Game Action",
      text: "Your pitcher leads the National League in strikeouts — 238 of them. He also leads the league in walks. He throws 311 innings. His team finishes in the second division. He makes the All-Star team. He is magnificent and cursed in equal measure.",
      origin: "1936: Mungo led NL in K (238) and BB (118) while pitching 311 IP for a bad Dodgers team.",
    },
    {
      title: "The Ball Theatre",
      type: "Drama",
      text: "Your retired pitcher goes home to small-town South Carolina. He buys a movie theater called the Ball Theatre. In Jim Crow country, he builds a balcony so Black patrons can finally watch movies — they'd been denied access before. The man who punched husbands in Havana and destroyed clubhouses in Brooklyn quietly desegregates entertainment in Pageland.",
      origin: "After retirement, Mungo operated the Ball Theatre in Pageland, SC, and built a balcony to accommodate Black patrons previously denied access.",
    },
    {
      title: "The Arm That Gave Out",
      type: "Drama",
      text: "Your ace is 26 years old. He's thrown 311 innings. He's thrown harder than almost anyone in the league for five straight years. His arm finally breaks. After surgery, he switches from fastball to finesse. Before: 107-84, 5× All-Star. After: 13-31 in 7 diminished years. The fastest arm in the NL is gone at 26.",
      origin: "Mungo's arm gave out after 1937. After surgery in 1940, he switched styles but was never the same.",
    },
  ],

  art_direction: {
    face: "Young, intense, Southern. 6'2\" 185 lbs — lean, athletic, wound tight. The face should show volatility — this is the man who punched husbands, destroyed clubhouses, and threw 238 strikeouts. Not calm. Not composed. Coiled, about to explode. The fastball is in the eyes before it's in the hand.",
    attire: "Brooklyn Dodgers 1936 road grays. Ebbets Field behind him — or better, the empty stands of a bad Dodgers team. The delivery — high leg kick, fastball about to be uncorked. Maybe a laundry cart visible in the corner, a subtle Havana easter egg.",
    mood: "Electricity and frustration. The card should feel like a thunderstorm — all that power with nowhere to go. The Dodgers are losing. The fastball is blazing. The walks are piling up. The telegram is being written. Everything about Mungo is excess — too much velocity, too much temper, too much talent for too little team.",
    style: "1930s Brooklyn — Ebbets Field brick, Flatbush Avenue grit. But also Pageland, South Carolina — the Ball Theatre, the quiet retirement, the small-town decency beneath the big-league chaos. The card should have two layers: the volcano on the mound and the man who desegregated his movie theater.",
    reference: "The card of the name that became a jazz song. The man who escaped Havana in a laundry cart. The man who telegrammed his wife about Tom Winsett. The man who led the league in strikeouts and walks in the same year. The man who was promised to win 20 games every year and never did. The man who opened a movie theater and quietly integrated it. Van Lingle Mungo — the most beautiful name in baseball history, attached to the most chaotic career.",
  },
};

const STAT_ENGINE = {
  stuff: { metric: "K + Dominance", tiers: [{ range: "K < 100", value: 0 },{ range: "K 100-149", value: 1 },{ range: "K 150-199", value: 2 },{ range: "K 200-249", value: 3 },{ range: "K 250-299", value: 4 },{ range: "K 300+", value: 5 }], bonus: "Led NL K/9 3 consecutive years → +1 (cap 5)" },
  control: { metric: "WHIP + BB/9", tiers: [{ range: "WHIP > 1.40", value: 0 },{ range: "WHIP 1.30-1.40", value: 1 },{ range: "WHIP 1.15-1.29", value: 2 },{ range: "WHIP 1.00-1.14", value: 3 },{ range: "WHIP < 1.00", value: 4 }], bonus: "Led NL in BB 3× → -1 (floor 0)" },
  stamina: { metric: "IP + CG", tiers: [{ range: "IP < 180", value: 0 },{ range: "IP 180-219", value: 1 },{ range: "IP 220-259", value: 2 },{ range: "IP 260-299", value: 3 },{ range: "IP 300+", value: 4 }], bonus: "Arm injury cuts career short → -1" },
  overall_sp: { formula: "STFx2 + CTLx2 + STAx1 + DEFx1 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / Ace" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason + signature moments", tiers: [{ range: "No PS or poor PS", value: 0 },{ range: "Average PS", value: 1 },{ range: "Good PS", value: 2 },{ range: "WS hero", value: 3 }] },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function VanMungoCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = MUNGO_DATA;
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Intense, coiled, high leg kick, Dodgers road grays, Ebbets Field empty stands, fastball about to explode, laundry cart in the shadows]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.coldBlue}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>NL CROSSOVER</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
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
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "K", val: d.real_stats.strikeouts },{ label: "IP", val: d.real_stats.innings_pitched },{ label: "CG", val: d.real_stats.complete_games },{ label: "BB", val: d.real_stats.walks },{ label: "WHIP", val: d.real_stats.whip },{ label: "WAR", val: d.real_stats.war }].map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1936 — LED NL IN K (238) AND BB (118) — 5× ALL-STAR</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ 5× All-Star", "🔥 238 K (Led NL)", "💨 Led NL K/9 3 Yrs", "🚶 Led NL BB 3 Yrs", "🎵 Jazz Song Namesake", "🧺 Havana Escape", "🎬 Ball Theatre Owner", "📱 The Winsett Telegram"].map((a, i) => (
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
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Mungo's real life, playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Pitcher Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Mungo's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
