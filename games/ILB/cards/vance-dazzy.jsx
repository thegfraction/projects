// /cards/players/dazzy-vance.jsx
import { useState } from "react";

const VANCE_DATA = {
  name: "Dazzy Vance",
  nickname: "The Dazzler",
  year: 1924,
  team: "Brooklyn Robins",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'2"',
  weight: "200 lbs",
  born: "March 4, 1891 — Orient, Iowa. Grew up in Nebraska.",
  died: "February 16, 1961 — Homosassa Springs, Florida (age 69). Lied about his age during his career (claimed 1893, born 1891). The Dazzler arrived late and left early.",
  hof: "INDUCTED 1955 — BBWAA (205 of 251 votes). The only pitcher to lead the NL in strikeouts 7 consecutive seasons (1922-1928). The greatest pitching season of the 1920s (1924). The throw-in who became the franchise. The late bloomer who dazzled.",

  real_stats: {
    season: 1924,
    wins: 28,
    losses: 6,
    era: "2.16",
    strikeouts: 262,
    innings: "308.1",
    complete_games: 30,
    shutouts: 5,
    walks: 77,
    hits_allowed: 238,
    war: 10.3,
    note: "PITCHING TRIPLE CROWN + NL MVP. 28 W led NL, 2.16 ERA led NL, 262 K led NL. More K than 2nd + 3rd place combined. Beat Hornsby (.424) for MVP.",
    career_wins: 197,
    career_losses: 140,
    career_era: "3.24",
    career_k: 2045,
    career_seasons: "16 (over 21 years)",
    k_titles: "7 consecutive NL K titles (1922-1928)",
    no_hitter: "Sept 13, 1925 vs Phillies",
    immaculate_inning: "Sept 24, 1924 vs Cubs",
    ml_innings_before_31: 33,
    minor_league_wins: 117,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION — 1924 SEASON
  //
  // STF: 262 K — more than 2nd + 3rd combined. 7 consecutive
  //      K titles. "Cream puff through a battleship."
  //      Overpowering fastball + curve. THE premiere
  //      strikeout pitcher of the entire 1920s.
  //      Immaculate inning. 7 consecutive K (ML record).
  //      STF = 5 (ABSOLUTE MAXIMUM — 262 K in 1924 with
  //      1 of every 13 K in the entire NL. The most dominant
  //      strikeout pitcher of the decade. The ragged shirt
  //      sleeve. The Dazzler. Nobody threw harder or struck
  //      out more in the National League for 7 straight years.)
  //
  // CTL: 77 BB in 308.1 IP = 2.25 BB/9. Decent control
  //      but not elite. The power came with wildness at
  //      times. 30 CG shows durability but the walk rate
  //      was merely adequate for the era.
  //      CTL = 3 (SOLID — 2.25 BB/9 is respectable. 30 CG
  //      confirms he pounded the zone enough. But he was
  //      primarily a power pitcher, not a command artist.
  //      The stuff was the weapon, not the location.)
  //
  // STM: 308.1 IP, 30 CG, 28 W. A 31-year-old rookie
  //      who threw 308 innings is an iron man. But the
  //      late bloom suggests the arm had limited shelf life
  //      before it arrived. Career: 16 seasons over 21 years
  //      — those missing years were the arm being broken.
  //      STM = 3 (STRONG — 308 IP and 30 CG is elite
  //      workload. But the arm history — sore throughout
  //      his 20s, only 33 ML innings before age 31 —
  //      makes this fragile in the long term. The stamina
  //      was real but it arrived late and departed earlier
  //      than expected.)
  //
  // DEF: Pitcher's fielding — adequate. Nothing notable
  //      in the defensive stats. Not a weakness but not
  //      an asset. Three-men-on-third suggests he was
  //      not the greatest baserunner.
  //      DEF = 1 (ADEQUATE — pitcher's fielding, not
  //      a factor.)
  //
  // CLU: Never won a pennant with Brooklyn. The Dodgers
  //      were competitive but never first. Won 1 WS ring
  //      with 1934 Cardinals (age 43) — barely pitched.
  //      No meaningful postseason with his best teams.
  //      CLU = 1 (BELOW AVERAGE — 28-6 with a 2.16 ERA
  //      and no pennant. The greatest pitching season of
  //      the 1920s produced zero October baseball. The
  //      ring came at 43 as a bit player on Frisch's
  //      Gashouse Gang.)
  //
  // OVR: STF×2(10) + CTL×1(3) + STM×1.5(4.5) + DEF×0.5(0.5) + CLU×1.5(1.5) = 19.5 → normalized ~9
  // OVR = 9 (ELITE) — Dazzy Vance. The Dazzler.
  // The greatest strikeout pitcher of the 1920s. The
  // late bloomer who didn't arrive until 31 and then
  // dominated for 7 straight years. The man who beat
  // Hornsby's .424 for the MVP. The ragged shirt sleeve.
  // The throw-in nobody wanted. OVR 9 matches Cuyler,
  // Cochrane, and Coveleski — the elite tier just below
  // the legends. Vance's STF 5 is the MAXIMUM in the set
  // — tied with nobody. The hardest thrower. The most
  // dominant pitcher. On a team that never won.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 9,
    stf: 5,    // ABSOLUTE MAXIMUM. 262 K — more than 2nd + 3rd combined. 7 consecutive K titles. "Cream puff through a battleship." The Dazzler.
    ctl: 3,    // 77 BB in 308.1 IP. 2.25 BB/9. Respectable control but not elite. Power pitcher, not command artist.
    stm: 3,    // 308.1 IP, 30 CG. Iron man workload. But sore arm throughout 20s. Late bloom = limited shelf life. Fragile history, real production.
    def: 1,    // Pitcher's fielding. Adequate. Three-men-on-third suggests baserunning was not a strength.
    clu: 1,    // Never won pennant with Brooklyn. 28-6 / 2.16 / 262 K = 0 postseason. Ring at 43 as bit player. The greatest season with no October.
  },

  stat_justification: {
    stf: "Vance struck out 262 batters in 1924 — more than the second and third-place pitchers COMBINED (Grimes 135 + Luque 86 = 221). He had 1 of every 13 strikeouts in the entire National League. He led the NL in strikeouts for 7 consecutive seasons (1922-1928), the only pitcher to accomplish this. He threw an immaculate inning (Sept 24, 1924) and struck out 7 consecutive batters (then a ML record). Johnny Frederick said he 'could throw a cream puff through a battleship.' He also used a ragged shirt sleeve as a visual distraction — McGraw protested to the NL president, who found no rule against it. The stuff was overpowering: blazing fastball and devastating curve. This is the maximum possible stuff rating. Rating of 5.",
    ctl: "Vance walked 77 batters in 308.1 innings (2.25 BB/9) in 1924. This is respectable but not elite for the era. He completed 30 games, confirming he stayed in the zone enough to go deep. But he was primarily a power pitcher who relied on stuff over command. The strikeouts came from velocity and movement, not pinpoint location. Career: 3.24 ERA with occasional high walk rates. Rating of 3.",
    stm: "Vance threw 308.1 innings with 30 complete games in 1924. This is an elite workload by any standard. However, the context matters: Vance had a chronically sore arm throughout his 20s, logging only 33 ML innings before age 31. The arm was 'broken' for a decade before suddenly recovering. 'My arm came back just as quickly as it went sore on me.' The stamina was real but the history was fragile — the arm had already been through a decade of damage. Rating of 3.",
    def: "Vance was a pitcher — his defensive contribution was adequate but unremarkable. The famous 'three men on third' incident (1926) — where Vance, Fewster, and Babe Herman all ended up on third base — suggests his baserunning awareness was lacking. Defensive fielding stats are not notable. Rating of 1.",
    clu: "Vance never won a pennant with the Brooklyn Robins/Dodgers. His greatest season (1924: 28-6, 2.16 ERA, 262 K, MVP) produced no postseason baseball. Brooklyn was competitive but never first during Vance's prime. He won 1 World Series ring with the 1934 Cardinals (Frisch's Gashouse Gang) at age 43, but barely pitched. The greatest pitching season of the 1920s existed in an October vacuum. Rating of 1.",
  },

  personality: {
    leadership_style: "FUN-LOVING ALPHA. Vance was described as a 'fun-loving flake' — the life of the clubhouse, the ringleader of pranks, the personality who made a losing team bearable. The KKK prank (pillowcases over heads, invading the Braves' sleeping car, demanding signs from the terrified catcher) captures the energy: chaotic, fearless, hilarious, and slightly unhinged. The leadership was ENTERTAINMENT — Vance made losing fun, which is harder than making winning fun.",
    temperament: "THE DAZZLER — JOYFUL DOMINANCE. Vance threw harder than anyone and enjoyed it more than anyone. Unlike Mays's dark intensity or Coveleski's quiet efficiency, Vance's dominance was PLAYFUL. The ragged shirt sleeve was a prank on every batter who faced him. The Dazzler dazzled because he WANTED to dazzle — the showmanship was as much a part of the pitch as the fastball.",
    work_ethic: "PERSISTENCE THROUGH A LOST DECADE. Vance spent his entire 20s in the minor leagues with a sore arm. 117 minor league wins. Only 33 ML innings before age 31. Most pitchers would have quit. Vance kept pitching — in Nebraska, in Memphis, in New Orleans — until the arm came back. 'My arm came back just as quickly as it went sore on me in 1915.' The work ethic was PATIENCE — the willingness to wait a decade for the arm to arrive.",
    lifestyle: "NEBRASKA DAZZLE. Born in Iowa, raised in Nebraska, semipro baseball in the Great Plains. The Dazzler came from the middle of nowhere — and then lit up Brooklyn. The contrast between the flat Nebraska plains and the electric Brooklyn crowds is the life in miniature. After baseball: Homosassa Springs, Florida. Fishing. Died at 69. A shorter, simpler life than many Bashers.",
    era_adaptability: "VERY HIGH. Vance's stuff — overpowering fastball, devastating breaking ball, 262 K in 308 IP — would translate directly to modern baseball. His 7.7 K/9 in 1924 was extraordinary for the era and would be competitive (though not elite) today. His approach — power over command — is the template for modern pitching. He'd be a mid-rotation starter with a 3.30 ERA and 200 K, or a high-leverage reliever with a 2.00 ERA.",
    clubhouse_impact: "MAXIMUM FUN. Vance made the Brooklyn Robins enjoyable to play for despite chronic losing. He was the personality, the entertainer, the man who cut eyeholes in pillowcases. In ILB, Vance provides +2 to team morale on losing teams and +1 on winning teams. The Dazzler shines brightest in the dark.",
    tragic_element: "THE GREATEST SEASON WITH NO OCTOBER. 1924: 28-6, 2.16 ERA, 262 K. NL MVP. Pitching Triple Crown. The greatest single pitching season of the 1920s. And the Brooklyn Robins finished 92-62 — 1.5 games behind the Giants. No pennant. No World Series. The Dazzler dazzled and it didn't matter. Then 1925: led NL in wins again. No pennant. 1926, 1927, 1928 — led NL in K every year. No pennant. Seven consecutive years as the best strikeout pitcher alive, and zero October baseball. The arm that waited a decade to arrive was wasted on a team that couldn't get to the postseason. The Dazzler dazzled for nobody.",
  },

  chemistry_traits: [
    { tag: "The Dazzler", desc: "Overpowering stuff + showmanship. In ILB, Vance has +1 to STF in high-attendance games. The bigger the crowd, the harder he throws. The Dazzler needs an audience." },
    { tag: "The Ragged Sleeve", desc: "Tattered undershirt fluttered on delivery, distracting batters. McGraw protested. NL president found no rule against it. In ILB, Vance has +1 K rate against all batters. The sleeve is the sixth pitch. Opponents may file a protest — d20: on 20, the league bans the sleeve and Vance loses the bonus." },
    { tag: "The Late Bloom", desc: "33 ML innings before age 31. 117 minor league wins. Sore arm for a decade. In ILB, Vance CANNOT be drafted before age 30. He does not exist in the majors until 31. But from 31-38, he is ELITE. The bloom is worth the wait." },
    { tag: "The Throw-In", desc: "Brooklyn wanted catcher Hank DeBerry. New Orleans said: take Vance too. In ILB, Vance costs nothing to acquire — he arrives as a secondary piece in a deal for someone else. The most dominant pitcher in the NL was a package filler." },
    { tag: "Three Men on Third", desc: "1926: Vance, Fewster, and Babe Herman all ended up on third base simultaneously. In ILB, once per season d20: on 1-2, a baserunning catastrophe occurs — runner on base with Vance results in a bizarre out. Brooklyn was chaotic." },
    { tag: "Beat the .424", desc: "1924 NL MVP — beat Rogers Hornsby, who hit .424, for the award. In ILB, Vance receives +1 to all stats when competing for awards against a batter with BA .350+. The pitcher's case was stronger than the greatest BA in modern history." },
    { tag: "Cream Puff Through a Battleship", desc: "Johnny Frederick's description of Vance's fastball. In ILB, Vance's fastball is rated UNHITTABLE on first exposure — batters facing Vance for the first time in a game have -2 to contact. The cream puff penetrates." },
    { tag: "The KKK Prank", desc: "Pillowcases. Eyeholes. The Braves' sleeping car. Demanded catcher O'Neil's signs. Got them. In ILB, Vance has a +1 to sign-reading when facing a team for the first time in a series. The intelligence operation was disguised as comedy." },
  ],

  preferred_locations: [
    { location: "Ebbets Field, Brooklyn", affinity: "MAXIMUM / HOME", note: "1922-1932. Eleven seasons. Seven K titles. The MVP. The no-hitter. The three men on third. The place where the Dazzler dazzled." },
    { location: "The Mound", affinity: "IDENTITY", note: "262 K from the rubber. 30 CG. 308.1 IP. The mound was the stage. The fastball was the performance. The sleeve was the costume." },
    { location: "The Minor Leagues", affinity: "ORIGIN / EXILE", note: "1912-1921. A decade. 117 wins. The sore arm. The buses. Nebraska, Memphis, New Orleans. The wilderness before the bloom." },
    { location: "The Pullman Car", affinity: "CHARACTER", note: "The midnight train. The pillowcases. The invasion of the Braves' car. The signs extracted from O'Neil. This is where you understand Dazzy Vance." },
  ],

  momentum: {
    hot_triggers: [
      "Strikeout streaks — Vance would lock into unhittable stretches. 7 consecutive K (ML record). 15 K in a game. 17 K in 10 innings. When the Dazzler was on, nobody could touch him.",
      "High-stakes pitching — Vance's MVP season came while competing against Hornsby's .424. He elevated when the comparison was most demanding.",
      "First exposure — batters facing Vance for the first time were overwhelmed by the fastball + ragged sleeve combination. The unfamiliar was unhittable.",
      "13-game winning streak (1924) — Vance went on a 13-game win streak that propelled Brooklyn into the pennant race.",
    ],
    cold_triggers: [
      "The arm — Vance's arm had a history of sudden failure. The decade of soreness never fully left. When the arm tired, the stuff dropped dramatically.",
      "Run support — Brooklyn's offense was inconsistent. Vance's losses often came with minimal run support on a team that couldn't score.",
      "Late-season fatigue — after 300+ innings, Vance sometimes faded in September. The workload that created the dominance also eroded it.",
      "Repeat exposure — batters who had multiple at-bats against Vance in a game performed better in later ABs. The Dazzler was most dazzling the first time.",
    ],
    pressure_response: "UNKNOWN BUT TRAGIC. Vance's greatest season (1924) produced no postseason baseball. He never pitched a meaningful October game with his best teams. The one WS ring (1934 Cardinals) came as a bit player at age 43. CLU = 1 reflects not personal failure but structural absence — the greatest pitcher on a team that was never quite good enough.",
  },

  action_card_seeds: [
    {
      title: "The Dazzler's Season",
      type: "Achievement / Apex",
      text: "1924. Your pitcher wins 28 games. He loses 6. His earned run average is 2.16. He strikes out 262 batters — more than the second-place and third-place pitchers in the National League combined. He completes 30 of his starts. He pitches 308 innings. He throws an immaculate inning — nine pitches, three strikeouts. He wins the Most Valuable Player award — over Rogers Hornsby, who is hitting .424, the highest batting average in modern baseball history. Your pitcher's season is the greatest pitching performance of the decade. Your team finishes 92-62, a game and a half behind the Giants. No pennant. No World Series. The Dazzler dazzles. Brooklyn finishes second.",
      origin: "Vance's 1924 pitching Triple Crown + MVP — 28-6, 2.16, 262 K — on a team that finished 1.5 GB.",
    },
    {
      title: "The Throw-In",
      type: "Origin / Destiny",
      text: "Brooklyn wants a catcher. His name is Hank DeBerry. He plays for the New Orleans Pelicans. Brooklyn offers $10,000. New Orleans says: take the pitcher too. The pitcher is thirty years old. He has pitched 33 innings in the major leagues. He has a sore arm that has been sore for a decade. He has won 117 minor league games on buses and in small towns. His name is Charles Arthur Vance. They call him Dazzy. Brooklyn takes the deal. The catcher they wanted is forgotten. The pitcher they didn't want leads the National League in strikeouts for seven consecutive years.",
      origin: "Vance acquired as a throw-in with Hank DeBerry from New Orleans, 1922.",
    },
    {
      title: "The Ragged Sleeve",
      type: "Innovation / Gamesmanship",
      text: "Your pitcher wears a tattered undershirt beneath his uniform. The sleeve is shredded — loose threads hanging from his throwing arm. When he delivers the ball, the threads flutter. The batter sees the ball emerging from a cloud of white motion. The ball is harder to pick up. The fastball arrives before the eye can separate leather from linen. John McGraw — manager of the New York Giants, the smartest man in baseball — complains to the National League president. The president examines the rulebook. There is no rule against ragged shirts. Your pitcher keeps wearing the shirt. Your pitcher keeps striking everyone out. The sleeve is the sixth pitch. Nobody can legislate against it.",
      origin: "Vance's tattered undershirt — McGraw's protest, NL president's ruling, continued dominance.",
    },
    {
      title: "Three Men on Third",
      type: "Comedy / Brooklyn",
      text: "1926. Your pitcher is on second base. Chick Fewster is on first. Babe Herman hits a long ball to right field. The third base coach yells something. Your pitcher, rounding third, hears the yell and goes BACK to third. Fewster arrives at third. Herman, ignoring all instructions, also arrives at third. Three men stand on third base simultaneously. Two of them are out. This is the Brooklyn Robins. This is the team your pitcher pitches for. He strikes out 262 men a year and his baserunners pile up on third like a vaudeville act. He doesn't care. He's Dazzy. He throws a cream puff through a battleship and then runs the bases like a man who has never seen a diamond.",
      origin: "The famous 'three men on third' incident, 1926 — Vance, Fewster, Herman.",
    },
  ],

  art_direction: {
    face: "6'2\" 200 lbs — big, strong, EXUBERANT. The face of a man having the time of his life on a baseball mound. Wide grin or pre-pitch intensity — but even the intensity is JOYFUL, not dark. This is not Mays's black pitch or Coveleski's mineshaft. This is a man who spent a decade in the minor leagues with a sore arm and then struck out 262 batters in a single season and LOVED every minute. Nebraska features — broad, open, sun-weathered. Eyes bright and slightly wild.",
    attire: "Brooklyn Robins 1924 home whites. In full windup — the high leg kick, the driving delivery, the arm coming forward with the ball AND the ragged sleeve fluttering behind it. The sleeve should be VISIBLE — loose threads trailing from the right arm, creating a blur of white around the pitching hand. This is the signature visual: the ball emerging from the flutter. The delivery should look VIOLENT — power pitcher, not finesse. The whole body is involved.",
    mood: "ELECTRIC AND JOYFUL. This card CRACKLES like Frisch's but with MORE WARMTH. The Dazzler dazzles because he LOVES dazzling. The mood is a carnival performer who also happens to be the most dominant pitcher alive. Bright, loud, fast, fun. The tragedy — no pennant, no October — lives underneath the joy, but the joy is on the surface. The card should make you SMILE before it makes you think.",
    style: "Full color — Bashers era — BROOKLYN BLUE AND LIGHTNING WHITE. Deep Brooklyn blue, white-hot lightning, warm cream, leather brown. The blue is ELECTRIC — not Fordham blue (that's Frisch), but BROOKLYN blue — the color of Ebbets Field seats and September afternoons. The border should be LIGHTNING WHITE — the color of the fastball emerging from the fluttering sleeve, the flash of the pitch. THE DAZZLER — the brightest, loudest, most fun pitcher card in the Bashers. The card that crackles with a different electricity than Frisch — Frisch is competitive fire, Vance is joyful lightning. Both electric. Different voltages.",
    reference: "Ruth is the solar system. Hornsby is the blade. Frisch is the flash. Dazzy Vance is THE DAZZLER — the lightning bolt on the mound. The hardest thrower. The loudest personality. The most dominant pitcher on the team that never won. He is the Bashers' great WHAT IF — what if Brooklyn had scored runs? What if the greatest pitching season of the 1920s had produced a pennant? The Dazzler dazzled in the void. The lightning struck and nothing caught fire.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", brooklynBlue: "#1a3a6b", lightningWhite: "#e8eeff", dazzleGold: "#d4a844" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.brooklynBlue}10`, border: `1px solid ${C.brooklynBlue}25`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.brooklynBlue, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.brooklynBlue, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.brooklynBlue}25`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function DazzyVanceCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = VANCE_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.brooklynBlue}30 0%, ${C.lightningWhite}80 50%, ${C.brooklynBlue}30 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.ink, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.brooklynBlue, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ELITE CARD — Bashers Era — The Dazzler</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.brooklynBlue}`, boxShadow: `0 0 0 2px ${C.dazzleGold}40, 0 0 30px ${C.brooklynBlue}12, 0 10px 35px rgba(0,0,0,0.35), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.brooklynBlue}, ${C.dazzleGold}, ${C.brooklynBlue})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#fff", fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.brooklynBlue}20`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.lightningWhite}, ${C.brooklynBlue}06, ${C.dazzleGold}04)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>⚡</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.brooklynBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE DAZZLER</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `linear-gradient(135deg, ${C.brooklynBlue}, ${C.dazzleGold})`, color: "#fff", padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.brooklynBlue}ee`, color: "#fff", padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.brooklynBlue}dd`, color: "#fff", padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ELITE • 1924 NL MVP • TRIPLE CROWN • 7× K LEADER</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.brooklynBlue, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>born Charles Arthur Vance • Orient, Iowa • "Cream puff through a battleship"</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.brooklynBlue} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.dazzleGold} />
              <StatBar label="STM" value={s.stm} max={5} color={C.traitGreen} />
              <StatBar label="DEF" value={s.def} max={3} color={C.sepia} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.medBrown} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.brooklynBlue}, ${C.dazzleGold}aa)`, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: "28-6" },{ label: "ERA", val: "2.16" },{ label: "K", val: "262" },{ label: "CG", val: "30" },{ label: "IP", val: "308" },{ label: "SO", val: "5" },{ label: "BB", val: "77" },{ label: "WAR", val: "10.3" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ background: `${C.brooklynBlue}08`, border: `1px solid ${C.brooklynBlue}20`, borderRadius: 4, padding: 8, marginTop: 10, textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 900, color: C.brooklynBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>PITCHING TRIPLE CROWN + NL MVP</div>
              <div style={{ fontSize: 10, color: C.ink, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>262 K > 2nd + 3rd PLACE COMBINED (221)</div>
              <div style={{ fontSize: 9, color: C.sepia, fontStyle: "italic", marginTop: 4 }}>Beat Rogers Hornsby (.424 BA) for the MVP award.</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.brooklynBlue}06`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.brooklynBlue}10` }}>
              {[{ label: "CAR W-L", val: "197-140" },{ label: "CAR K", val: "2,045" },{ label: "CAR ERA", val: "3.24" },{ label: "K TITLES", val: "7 STR" },{ label: "MLB B4 31", val: "33 IP" },{ label: "MiLB W", val: "117" },{ label: "NO-HIT", val: "1925" },{ label: "HOF", val: "1955" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.brooklynBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.5 }}>{stat.label}</div><div style={{ fontSize: 11, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⚡ 262 K (1924)", "🌾 Late Bloom (age 31)", "👕 Ragged Sleeve", "🏆 NL MVP over .424", "📦 The Throw-In", "🏟️ No Pennant", "😂 Three Men on Third", "🎪 Fun-Loving Flake"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.brooklynBlue}08`, border: `1px solid ${C.brooklynBlue}15`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.brooklynBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ELITE DOSSIER — {d.year} — THE DAZZLER</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.brooklynBlue}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.brooklynBlue : "transparent", color: tab === t.id ? "#fff" : C.medBrown, border: `1px solid ${tab === t.id ? C.brooklynBlue : C.sepia}30`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "tragic_element" ? "⚡ THE GREATEST SEASON WITH NO OCTOBER" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "tragic_element" ? { color: C.brooklynBlue } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.brooklynBlue }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity.includes("HOME") ? `${C.traitGreen}20` : `${C.brooklynBlue}12`, color: l.affinity.includes("HOME") ? C.traitGreen : C.brooklynBlue, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.brooklynBlue }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.brooklynBlue}05`, border: `1px solid ${C.brooklynBlue}12`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: `${C.brooklynBlue}12`, color: C.brooklynBlue, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.brooklynBlue}, ${C.dazzleGold}, ${C.brooklynBlue})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ELITE #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
