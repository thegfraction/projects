// /cards/players/chick-hafey.jsx
import { useState } from "react";

const HAFEY_DATA = {
  name: "Chick Hafey",
  nickname: "The Lenses",
  year: 1931,
  team: "St. Louis Cardinals",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "LF",
  bats: "R",
  throws: "R",
  height: '6\'0"',
  weight: "185 lbs",
  born: "February 12, 1903 — Berkeley, California",
  died: "July 2, 1973 — Calistoga, California (age 70). Died 18 days before the 40th anniversary celebration of the first All-Star Game — the game where he recorded the very first hit. He'd made arrangements to attend. He never made it.",
  hof: "INDUCTED 1971 — Veterans Committee (Frisch era). Bill James lists him among 10 HOFers who don't deserve the honor. BUT: .317 career BA, 133 OPS+ (higher than Tony Gwynn, Rod Carew, Roberto Clemente, Jackie Robinson). Branch Rickey: 'If Hafey had been blessed with normal eyesight and good health, he might have been the best right-handed hitter baseball had ever known.' The Smoky Joe Wood Syndrome — exceptional talent, career curtailed by injury.",

  real_stats: {
    season: 1931,
    batting_avg: ".349",
    obp: ".404",
    slg: ".534",
    ops: ".938",
    hits: 157,
    doubles: 35,
    triples: 6,
    home_runs: 16,
    rbi: 95,
    runs: 101,
    stolen_bases: 5,
    total_bases: 240,
    games: 122,
    war: 5.9,
    note: "NL BATTING CHAMPION — .34889 beat Bill Terry (.34861) by .0002. Bottomley 3rd (.34821). Closest 3-way race in history. Won title with a hit in his final at-bat. MVP 5th.",
    career_batting_avg: ".317",
    career_hits: 1466,
    career_hr: 164,
    career_rbi: 833,
    career_slg: ".526",
    career_ops_plus: 133,
    career_games: 1283,
    career_seasons: "13 (1924-1937, many partial)",
    ws_championships: "2 (1926, 1931)",
    ws_appearances: 4,
    first_all_star_hit: "1933 — first hit in All-Star Game history",
    power_peak: "1928-1930: avg 27 HR, 114 RBI per season",
    glasses: "Three different pairs, rotated based on daily vision",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB BATTER STAT CONVERSION — 1931 SEASON
  //
  // CON: .349 BA — NL batting champion. Won by .0002
  //      over Terry. Career .317. .329+ in 7 straight years.
  //      10 consecutive hits (NL record tie, 1929).
  //      Hit .385 over final 77 games to win 1931 title.
  //      While wearing three rotating pairs of glasses.
  //      CON = 4 (NEAR-MAXIMUM — .349 to win the batting
  //      title while vision-impaired is extraordinary.
  //      Career .317 with 133 OPS+. Rickey thought he
  //      could have been the best RH hitter ever if healthy.
  //      The contact was elite DESPITE the disability.)
  //
  // POW: 16 HR in 1931 (122 games). Peak: 29 HR, 125 RBI
  //      (1929). Career: 164 HR, .526 SLG.
  //      "Line-drive slashing" — hit balls so hard that
  //      Freddie Lindstrom: "When Hafey hits that jackrabbit
  //      at you, you don't have time to think."
  //      POW = 3 (STRONG — 164 career HR, .526 career SLG.
  //      Peak of 29 HR and 125 RBI. Not Ruth/Wilson tier
  //      but legitimate power, especially for an injury-
  //      shortened career. Line-drive power that terrified
  //      infielders.)
  //
  // SPD: 5 SB in 1931. Rickey noticed his speed initially
  //      (running down the first base line). But not a
  //      basestealing threat. Adequate speed, not a weapon.
  //      SPD = 1 (BELOW AVERAGE — the speed existed but
  //      was not a significant tool after his injuries.)
  //
  // DEF: "RIFLE ARM." Threw from LF to cut down runners.
  //      1928 pennant race — threw from LF to save a game
  //      in the 11th inning, preserving the pennant.
  //      Known specifically for the arm.
  //      BUT: vision problems affected his ability to read
  //      fly balls. Three pairs of glasses for fielding
  //      vs hitting.
  //      DEF = 2 (GOOD — the arm was genuinely elite,
  //      one of the best in the NL. But the vision issues
  //      complicated his fly-ball reads. The arm compensates
  //      for the eyes. Balance = good, not great.)
  //
  // CLU: 4 World Series (1926, 1928, 1930, 1931).
  //      2 championships (1926, 1931).
  //      .205 career WS BA — poor hitting in October.
  //      But 2 rings. Won 1931 batting title AND WS.
  //      CLU = 2 (SOLID — 2 rings and 4 WS appearances
  //      are valuable. But .205 WS BA is significantly
  //      below his career .317. He faded in October.)
  //
  // OVR: CON×2(8) + POW×1(3) + SPD×1.5(1.5) + DEF×0.5(1) + CLU×1.5(3) = 16.5 → normalized ~7
  // OVR = 7 (ALL-STAR) — Chick Hafey. The Lenses.
  // The man who couldn't see and still hit .349.
  // Three pairs of glasses. Sinus problems from beanings.
  // Rickey's first farm system star. The quiet man in the
  // loud clubhouse. Another Frisch cronyism HOFer — but
  // with more talent than most critics acknowledge.
  // 133 OPS+ exceeds many inner-circle HOFers.
  // The body failed the talent. The eyes betrayed the hands.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,
    con: 4,    // .349 BA — NL champion by .0002. Career .317. 133 OPS+. Hit .385 over 77 games to win title. While wearing 3 rotating pairs of glasses. Vision-impaired excellence.
    pow: 3,    // 16 HR/1931 (122 G). Peak 29 HR/125 RBI (1929). Career 164 HR, .526 SLG. Line-drive terror. "You don't have time to think."
    spd: 1,    // 5 SB. Adequate speed, not a weapon. Injuries reduced athleticism.
    def: 2,    // RIFLE ARM — elite throwing arm from LF. Saved 1928 pennant with 11th-inning throw. But vision problems complicated fly-ball reads.
    clu: 2,    // 4 WS, 2 rings. But .205 career WS BA. October production faded below his standard.
  },

  stat_justification: {
    con: "Hafey hit .349 in 1931 to win the NL batting title in the closest three-way race in baseball history — beating Bill Terry (.34861) by .0002 and teammate Jim Bottomley (.34821) by .0007. He won the title with a hit in his final at-bat of the season. He hit .385 over the final 77 games after being at .281 on July 16th. Career: .317 BA with a 133 OPS+ (higher than Gwynn, Carew, Clemente, Jackie Robinson). He did all of this while rotating among THREE different pairs of glasses because his vision varied daily due to sinus problems from multiple beanings. 10 consecutive hits (NL record tie, 1929). The contact was elite DESPITE the disability. Rating of 4.",
    pow: "Hafey hit 16 HR in 122 games in 1931. His power peak was 1928-1930, averaging 27 HR and 114 RBI per season. Career: 164 HR, .526 SLG in only 1,283 games. Led NL in slugging in 1927 (.590). Freddie Lindstrom on Hafey's line drives: 'You don't have time to think. Only your instinct of self-preservation functions. You put up your hands to protect yourself.' The power was legitimate and terrifying — line-drive power that endangered infielders. Rating of 3.",
    spd: "Hafey stole 5 bases in 1931. Rickey initially noticed his speed (running to first), and he had some early athleticism, but after the beanings and sinus problems, speed was not a significant tool. Rating of 1.",
    def: "Hafey was known for his 'rifle arm' — one of the strongest throwing arms in the NL from left field. In 1928, he threw from LF in the 11th inning to cut down the potential winning run, saving a game that preserved the Cardinals' pennant lead. However, his vision problems — three pairs of glasses, daily fluctuation — complicated his ability to read fly balls and judge distance. He used separate glasses for hitting and fielding. The arm was elite; the eyes were unreliable. Rating of 2.",
    clu: "Hafey appeared in 4 World Series (1926, 1928, 1930, 1931) and won 2 championships (1926, 1931). However, his career WS batting average was .205 — significantly below his .317 career mark. He won the 1931 batting title AND the WS in the same year, but his October hitting was inconsistent. Rating of 2.",
  },

  personality: {
    leadership_style: "QUIET IN A LOUD ROOM. Hafey was 'soft-spoken' and 'shy' — overshadowed by the raucous Cardinals teammates who surrounded him. He was not a clubhouse leader or a vocal presence. He led by production — .349, the batting title, the rifle-arm throws. The leadership was SILENT COMPETENCE — the man who said nothing and hit everything.",
    temperament: "STUBBORN AND PROUD. Despite his quiet demeanor, Hafey was a fierce negotiator. He held out TWICE (1931, 1932), fighting Branch Rickey over salary. When Rickey refused to refund a $2,100 fine, Hafey jumped into his 1929 midnight blue Auburn sedan and drove home to California at ninety miles an hour. The quiet man had a steel spine. He would not be underpaid. He would not be disrespected.",
    work_ethic: "ADAPTATION TO DISABILITY. Hafey developed a sophisticated system: separate glasses for hitting and fielding, a 'patent lambs wool filter' in his nose for sinus infections, three pairs of glasses rotated based on daily vision. This is not just work ethic — this is ENGINEERING. He rebuilt his approach to the game around a deteriorating body. Every day was a new calibration.",
    lifestyle: "CALIFORNIA RANCHER. Born in Berkeley. Berkeley High School. After baseball: ranched near Berkeley/Calistoga, California wine country. Quiet rural life. Died in Calistoga at 70. The quiet man went home to quiet country and lived quietly until the end.",
    era_adaptability: "MODERATE TO HIGH. Hafey's raw hitting ability (.317, 133 OPS+, .526 SLG) would translate well. Modern sports medicine would likely address the sinus problems more effectively, potentially unlocking the talent Rickey saw — 'the best right-handed hitter baseball had ever known.' With modern vision correction and medical treatment, Hafey might have been a .330 hitter with 35 HR. The vision problems were the ONLY thing between Hafey and the inner circle.",
    clubhouse_impact: "NEUTRAL. Hafey was not a positive or negative clubhouse force. He was quiet, professional, and occasionally absent (holdouts). In ILB, Hafey provides +0 to team morale. He neither lifts the room nor weighs it down. He simply hits.",
    tragic_element: "THE EYES. Chick Hafey was beaned four times in 1926. The beanings caused sinus problems. The sinus problems deteriorated his vision. He wore three pairs of glasses. His vision varied daily. He couldn't always see the ball clearly. And he STILL hit .349 to win the batting title by .0002. Branch Rickey — the man who invented the farm system, who saw everything — said: 'If Hafey had been blessed with normal eyesight and good health, he might have been the best right-handed hitter baseball had ever known.' The eyes betrayed the hands. The hands never stopped trying. He died 18 days before the 40th anniversary of the first All-Star Game — the game where he recorded the very first hit. He'd made arrangements to attend. The eyes that couldn't see the ball couldn't see the celebration either.",
  },

  chemistry_traits: [
    { tag: "Three Pairs of Glasses", desc: "Vision varied daily. Separate glasses for hitting and fielding. In ILB, Hafey's CON fluctuates: d6 daily — on 1-2: CON 3 (bad vision day), on 3-4: CON 4 (standard), on 5-6: CON 5 (perfect vision day, elite). The glasses rotate. The talent is constant. The vision is not." },
    { tag: "The .0002", desc: "Won 1931 batting title over Terry (.34889 vs .34861). With a hit in his final at-bat. In ILB, when Hafey's BA is within .005 of the league leader, he receives +1 CON. The closer the race, the harder he swings." },
    { tag: "Rickey's First Star", desc: "First major success of Branch Rickey's farm system. In ILB, Hafey costs less to develop — he arrives through the farm system, not through trade or free agency. The system found him. The system made him." },
    { tag: "The Rifle Arm", desc: "Elite throwing arm from left field. Saved 1928 pennant with 11th-inning throw. In ILB, Hafey has +2 to outfield assists. Runners do not advance on Hafey's arm. The rifle doesn't need glasses." },
    { tag: "The Beaning", desc: "Hit by pitch 4 times in 1926. Caused sinus problems, vision deterioration. In ILB, each HBP has a 25% chance of triggering a 'sinus flare' that reduces CON by 1 for 2 weeks. The beanings keep punishing long after the bruises heal." },
    { tag: "The Holdout", desc: "Held out twice (1931, 1932). Drove home to California at 90 mph in a midnight blue Auburn. In ILB, Hafey has a 20% chance of starting each season late (holdout). When he returns, he hits .385 for the rest of the year. The holdout sharpens the blade." },
    { tag: "Bottomley's Race", desc: "1931: Hafey .34889, Terry .34861, Bottomley .34821. All three within .0007. In ILB, when Hafey and Bottomley are on the same team, the batting race is INTERNAL as well as external. The sunshine and the lenses compete for the same crown." },
    { tag: "The First All-Star Hit", desc: "1933 inaugural All-Star Game: Hafey singled off Lefty Gomez — first hit in ASG history. In ILB, Hafey receives +1 to all stats in exhibition/All-Star games. The first hit in a new format belongs to the man who couldn't see." },
  ],

  preferred_locations: [
    { location: "Sportsman's Park, St. Louis", affinity: "MAXIMUM / HOME", note: "1924-1931. Two WS rings. The batting title. The rifle-arm throws. The place where the glasses rotated." },
    { location: "The Batter's Box", affinity: "IDENTITY", note: "Three pairs of glasses. Patent lambs wool filter. Daily calibration. Then: .349. The box was the laboratory." },
    { location: "California Ranch", affinity: "HOME / REFUGE", note: "Berkeley origins. Calistoga retirement. The midnight blue Auburn driving 90 mph toward home. The quiet man in wine country." },
    { location: "The Pennant Race", affinity: "PEAK", note: "1931: .281 on July 16th → .349 by season's end. .385 over 77 games. The greatest late-season surge in batting title history." },
  ],

  momentum: {
    hot_triggers: [
      "Late-season surges — 1931: hit .385 over final 77 games after being at .281 on July 16th. Hafey heated up when the season demanded it.",
      "Good vision days — when the glasses worked and the sinuses cleared, Hafey was virtually unstoppable. 10 consecutive hits (1929).",
      "Batting races — the closer the competition, the harder Hafey hit. The .0002 title was won with a hit in his final at-bat.",
      "Post-holdout return — after missing spring training, Hafey would return and immediately produce at elite levels. The holdout sharpened him.",
    ],
    cold_triggers: [
      "Bad vision days — daily fluctuation meant some days Hafey simply couldn't see well. The glasses rotated but the world didn't always come into focus.",
      "Sinus flares — chronic sinus problems caused headaches, dizziness, and reduced capacity. Multiple games missed throughout career.",
      "Beanings — each HBP risked worsening the sinus condition. Pitchers knew he was vulnerable. The fear compounded the damage.",
      "Contract disputes — holdouts cost him conditioning time and early-season production. The first weeks of each disputed season were lost.",
    ],
    pressure_response: "CLUTCH IN THE REGULAR SEASON, FADING IN OCTOBER. Hafey's 1931 batting race performance — .385 over 77 games to win by .0002 — is one of the most clutch regular-season performances in history. But his .205 career WS BA suggests he faded under World Series pressure. The eyes that adapted to the pennant race couldn't adapt to October.",
  },

  action_card_seeds: [
    {
      title: "Three Pairs",
      type: "Identity / Disability",
      text: "Your outfielder wears glasses. Not one pair. Three. He rotates among them based on how his eyes feel that day. Some mornings the world is sharp and the seams on the baseball are visible from sixty feet. Some mornings the world is soft and the pitcher is a blur. He has separate glasses for hitting and fielding. He has a patent lambs wool filter in his nose to prevent sinus infections. He was beaned four times in 1926. The beanings caused the sinus problems. The sinus problems caused the vision loss. The vision loss requires the glasses. Three pairs. Three versions of the world. He hits .349 in all of them.",
      origin: "Hafey's three pairs of glasses, daily vision fluctuation, sinus problems from 1926 beanings.",
    },
    {
      title: "Point Zero Zero Zero Two",
      type: "Achievement / Precision",
      text: "1931. Three men chase the batting title. Your outfielder: .34889. Bill Terry of the Giants: .34861. Jim Bottomley — your outfielder's own teammate: .34821. Three Hall of Famers within seven ten-thousandths of a point. On the final day, your outfielder needs a hit. He gets it. A single. His last at-bat of the season. The title is his by two ten-thousandths of a point. .0002. This is the closest three-way batting race in baseball history. Your outfielder won it wearing three different pairs of glasses. The man who couldn't see won the race that required the most precise measurement in baseball.",
      origin: "The 1931 NL batting title — Hafey .34889, Terry .34861, Bottomley .34821.",
    },
    {
      title: "The Best There Never Was",
      type: "What-If / Testimony",
      text: "Branch Rickey invented the farm system. He saw thousands of players. He evaluated talent as precisely as anyone in baseball history. Of your outfielder, Rickey said: 'I always thought that if Hafey had been blessed with normal eyesight and good health, he might have been the best right-handed hitter baseball had ever known.' Not one of the best. THE best. Better than Hornsby. Better than anyone. This is Rickey's testimony — the man who never exaggerated, who measured everything, who saw the blueprint behind the player. The blueprint was perfect. The body wasn't built to specification. The best right-handed hitter who ever lived was hidden inside a man who couldn't see straight.",
      origin: "Branch Rickey's famous quote about Hafey's potential.",
    },
    {
      title: "Eighteen Days",
      type: "Coda / Grief",
      text: "1933. The first All-Star Game in baseball history. Your outfielder starts in left field and bats cleanup for the National League. In his first at-bat, facing Lefty Gomez — Hall of Famer — he loops a flyball into short center field. It drops. A single. The first hit in All-Star Game history belongs to your outfielder. Forty years later, 1973, Major League Baseball plans a celebration of that first game. Every surviving player receives an invitation. Your outfielder makes arrangements to attend. He dies eighteen days before the celebration. The first hit. The last absence. The man who couldn't see couldn't see the anniversary either.",
      origin: "Hafey's first All-Star hit (1933) and death 18 days before the 40th anniversary celebration (1973).",
    },
  ],

  art_direction: {
    face: "6'0\" 185 lbs — solid, handsome, QUIET. The face of a man who doesn't speak much. Strong jaw, calm expression, eyes that are SEARCHING — always trying to focus, always adjusting. THE GLASSES — round wire-rimmed spectacles, 1930s style, sitting on his face like they belong to someone else. The glasses should look slightly WRONG on a ballplayer's face — because they were. He was the first star to wear them regularly. The glasses are the card. The face behind them is talent. The talent behind the glasses is grief.",
    attire: "St. Louis Cardinals 1931 home whites — bird-on-bat logo. RIGHT-HANDED batting stance — compact, violent line-drive swing. OR: in left field, rifle arm cocked to throw, glasses glinting in the sunlight. The body should look STRONG but COMPROMISED — powerful build, capable arms, but something slightly off about the stance. The head tilted slightly, adjusting. The glasses catching light.",
    mood: "FOCUSED THROUGH FOG. This card has a quality of PARTIALLY OBSCURED CLARITY — like looking through glasses that aren't quite right. The image should be sharp at the center (the bat, the ball, the contact point) and slightly softer at the edges (the world beyond the batter's box). The mood is DETERMINATION THROUGH LIMITATION — the beauty of a man who cannot fully see the world but hits .349 in it anyway.",
    style: "Full color — Bashers era — CARDINALS RED AND LENS GRAY. Cardinals warm red, spectacle gray, wire-rim silver, cream. The red is warm (this is the Cardinals, the sunshine franchise) but the gray INTRUDES — the color of vision tests, of optometrist offices, of things not quite in focus. The border should be LENS GRAY — the color of ground glass, the medium through which Hafey saw the world. THE LENSES — the card you have to look at twice because the first look isn't quite clear. The most HUMAN card in the Bashers — the card that needs corrective lenses to see itself.",
    reference: "Ruth is the solar system. Hornsby is the blade. Bottomley is the sunshine. Chick Hafey is THE LENSES — the card that sees the world imperfectly and hits it perfectly. He is the Bashers' great WHAT IF — what if the eyes had worked? What if Rickey was right and he was the best? The Lenses are the only card that looks BACK at you — and asks: what would you have done if you could barely see?",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", cardsRed: "#c41e3a", lensGray: "#8e9196", wireRim: "#a8acb0" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.lensGray}15`, border: `1px solid ${C.lensGray}30`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.lensGray, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.cardsRed, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.cardsRed}20`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function ChickHafeyCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = HAFEY_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.lensGray}30 0%, ${C.cardsRed}12 50%, ${C.lensGray}30 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.ink, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.lensGray, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ALL-STAR CARD — Bashers Era — The Lenses</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.lensGray}`, boxShadow: `0 0 0 2px ${C.cardsRed}20, 0 8px 30px rgba(0,0,0,0.3), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.lensGray}, ${C.cardsRed}, ${C.lensGray})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#fff", fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.lensGray}20`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.cream}, ${C.lensGray}05, ${C.cardsRed}03)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>👓</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.lensGray, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE LENSES</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.lensGray, color: "#fff", padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.cardsRed}ee`, color: "#fff", padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.lensGray}dd`, color: "#fff", padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ALL-STAR • 1931 NL BATTING CHAMPION • 2× WS CHAMPION</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.lensGray, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>Three pairs of glasses • Vision varied daily • Berkeley, CA</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.cardsRed} />
              <StatBar label="POW" value={s.pow} max={5} color={C.lensGray} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.sepia} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.cardsRed}, ${C.lensGray})`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: ".349" },{ label: "OPS", val: ".938" },{ label: "HR", val: "16" },{ label: "RBI", val: "95" },{ label: "H", val: "157" },{ label: "R", val: "101" },{ label: "G", val: "122" },{ label: "WAR", val: "5.9" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ background: `${C.lensGray}08`, border: `1px solid ${C.lensGray}20`, borderRadius: 4, padding: 8, marginTop: 10, textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: C.cardsRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>.34889 vs .34861 vs .34821</div>
              <div style={{ fontSize: 10, color: C.ink, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>HAFEY — TERRY — BOTTOMLEY</div>
              <div style={{ fontSize: 9, color: C.sepia, fontStyle: "italic", marginTop: 4 }}>Closest 3-way batting race in history. Won with a hit in his final at-bat.</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.lensGray}06`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.lensGray}12` }}>
              {[{ label: "CAR AVG", val: ".317" },{ label: "CAR HR", val: "164" },{ label: "OPS+", val: "133" },{ label: "GAMES", val: "1,283" },{ label: "WS RINGS", val: "2" },{ label: "GLASSES", val: "3 pair" },{ label: "1ST ASG HIT", val: "1933" },{ label: "HOF", val: "1971" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.lensGray, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 11, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["👓 3 Pairs of Glasses", "🏆 .0002 Batting Title", "💪 Rifle Arm (LF)", "🌾 Rickey's First Star", "⚾ 1st All-Star Hit", "🧠 133 OPS+ (>Gwynn)", "💔 Died 18 Days Before"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.lensGray}08`, border: `1px solid ${C.lensGray}15`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.lensGray, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ALL-STAR DOSSIER — {d.year} — THE LENSES</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.lensGray}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.lensGray : "transparent", color: tab === t.id ? "#fff" : C.medBrown, border: `1px solid ${tab === t.id ? C.lensGray : C.sepia}30`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "tragic_element" ? "👓 THE EYES" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "tragic_element" ? { color: C.lensGray } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.lensGray }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: `${C.lensGray}15`, color: C.lensGray, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.lensGray }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.lensGray}05`, border: `1px solid ${C.lensGray}12`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type.includes("Disability") || a.type.includes("Grief") ? `${C.lensGray}20` : `${C.cardsRed}10`, color: a.type.includes("Disability") || a.type.includes("Grief") ? C.lensGray : C.cardsRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.lensGray}, ${C.cardsRed}, ${C.lensGray})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ALL-STAR #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
