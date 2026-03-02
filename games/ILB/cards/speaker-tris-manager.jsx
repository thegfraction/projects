import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: TRIS SPEAKER
// Era: 1920 · Archetype: Firebrand
// "The Grey Eagle" — Fire from Center Field
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Tris Speaker",
  nickname: "The Grey Eagle",
  year: 1920,
  team: "Cleveland Indians",
  era: "1920s",
  ilb_team: "Lumber",
  archetype: "Firebrand",
  born: "April 4, 1888 — Hubbard, TX",
  died: "December 8, 1958 — Lake Whitney, TX (age 70)",
  hof: "Inducted 1937 (7th player elected). First-ballot selection alongside Cy Young, Nap Lajoie, Connie Mack. 'The greatest centerfielder of his day.' Career .345 BA, 792 doubles (all-time record), 3,514 hits.",
  height: '5\'11"',
  weight: "193 lbs",

  // ═══════════════════════════════════════════════════════════════
  // MANAGERIAL RECORD
  // ═══════════════════════════════════════════════════════════════
  record: {
    career_wins: 617,
    career_losses: 520,
    win_pct: ".543",
    pennants: 1,
    world_series: 1,
    seasons_managed: 8,
    ejections: "Frequent — turned blue in heated arguments with umpires",
    peak_team: "1920 Cleveland Indians",
    peak_record: "98-56",
    teams_managed: ["Cleveland Indians (1919-1926)"],
    notable: "Player-manager who led from center field. Won 1920 World Series after Ray Chapman's death. Pioneer of extensive platooning ('triple shift'). Forced to resign in 1926 gambling scandal — exonerated by Landis.",
    playing_career: "22 seasons. .345 career BA (9th all-time). 792 doubles (MLB record). 3,514 hits. 449 career outfield assists (record). 139 outfield double plays (record). 1912 AL MVP. 3× World Series champion (1912, 1915, 1920). Revolutionized center field positioning — played so shallow he made unassisted double plays at second base.",
    innovation: "First manager to platoon extensively — the 'triple shift' at three positions simultaneously (1920-1921)",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB MANAGER RATINGS
  // ═══════════════════════════════════════════════════════════════
  ilb_ratings: {
    // Game Management
    tac: 4,  // Elite — pioneered extensive platooning, the "triple shift" at 3 positions. Far ahead of his time.
    pit: 3,  // Strong — reclaimed Caldwell, discovered Mails, fixed Sothoron. Not a specialist but effective.
    lin: 5,  // Revolutionary — first manager to platoon extensively. Bill James: "first extensive platooning" in history.
    adp: 4,  // Elite — managed through Chapman tragedy, nearly won 1921 pennant with decimated roster. Superb in-season adjustments.

    // Clubhouse Management
    dis: 5,  // Moderate. Led by example from center field, not by rules or systems. Authority was personal, not institutional.
    ego: 7,  // Strong star handler — managed diverse personalities through personal connection and shared competitive fire.
    har: 7,  // Good cohesion builder — rallied team through Chapman death, held 1921 team together through injuries. "Warm and understanding handler."
    int: 9,  // Near-maximum. "A leader who never gives up and never allows his team to give up." Drove mediocre players to his level through sheer force of will.
    str: 8,  // Superb talent evaluator — saw potential in discards (Caldwell, Burns, Jamieson, Mails). "Miracle Man" who converted castoffs into champions.
    flx: 5,  // Moderate. Innovative tactically but fundamentally a product of his era. Less effective after 1921 when his player evaluation declined.

    ovr: 9,  // Elite tier. World Series champion, tactical innovator, player-manager who led from the field. Short career and scandal prevent Legend tier.
  },

  rating_justification: {
    tac: "Speaker was a genuine tactical innovator, not merely competent. He pioneered the first extensive platooning system in baseball history — the 'triple shift' at first base, right field, and left field simultaneously, matching handedness against opposing pitchers. Sportswriter John B. Sheridan attacked the system as 'spoon-feeding' and predicted it would 'destroy young ball players,' but Speaker proved him wrong with back-to-back championship-caliber seasons. He also instituted real batting practice conditions (with a catcher behind the plate) rather than cage work. His tactical intelligence was recognized as elite by contemporaries.",
    pit: "Speaker was not a specialist pitching manager in the Robinson mold, but he had a remarkable eye for reclaiming discarded arms. He signed the alcoholic Ray Caldwell with a contract that required him to get drunk after each start, then run laps the next day — Caldwell went 5-1 with a 1.71 ERA and later won 20 games. He acquired Duster Mails from the minors after two failed stints, and Mails won 7-0 with a 1.85 ERA down the stretch in 1920. He fixed Allan Sothoron mid-season in 1921 after noticing he was tipping his pitches — Sothoron went 12-4. Strong but not elite pitcher management.",
    lin: "Revolutionary. Bill James credits Speaker with instituting 'the first extensive platooning' in baseball. Speaker called it his 'triple shift' — using right-handed hitters against left-handed pitchers and vice versa at three positions simultaneously. The results were dramatic: George Burns went from .268 to .361, Joe Wood hit .366, and the combined platoon production exceeded what any single player could deliver. Speaker platooned everyone except himself — he hit left-handed pitching anyway. This innovation predated widespread adoption by decades.",
    adp: "Speaker showed elite adaptability in crisis. After Ray Chapman's death in August 1920, he purchased 21-year-old Joe Sewell from the minors and personally prepared him with morning batting practice sessions, building the rookie's confidence. Sewell hit .329 in those final weeks. In 1921, with Wambsganss, O'Neill, and Speaker himself injured at various points, he signed Riggs Stephenson directly from the University of Alabama (.330 that year) and kept the team in first most of the season. Stuart Bell wrote that nobody else could have done what Speaker did with that decimated roster.",
    dis: "Speaker's discipline was personal, not institutional. He did not impose McGraw-style rules or Robinson-style Bonehead Clubs. His authority came from being the best player on the field every day. Players followed him because he led by example — 'always in the forefront, working the hardest, covering the most ground.' But when Speaker's playing ability faded or his attention wandered in later seasons, there was no structural discipline to maintain order. The gambling scandal of 1926 exposed how thin the institutional framework was.",
    ego: "Speaker handled diverse personalities effectively through personal connection. He managed his close friend Joe Wood through a position change from pitcher to outfielder. He acquired Larry Gardner, Charlie Jamieson, and Steve O'Neill — all of whom had career years under him. Jamieson later called Speaker 'my best friend.' The key was Speaker's willingness to connect individually: Cobbledick wrote he was 'a warm and understanding handler of the varied temperaments under his command.' He didn't manage egos through submission but through shared purpose.",
    har: "Speaker's greatest harmony achievement was holding the 1920 Indians together after Ray Chapman's death — a devastating mid-season tragedy that could have destroyed the team. He rallied them to their first pennant and World Series victory, then dedicated the achievement to Chapman's memory. After clinching, Speaker sprinted from center field to embrace his mother in the stands. His teams had genuine cohesion. But the gambling scandal and forced resignation in 1926 suggest limits — he ultimately couldn't protect himself or his players from external forces.",
    int: "Near-maximum intensity. Heywood Broun wrote in Vanity Fair: 'He is a leader who never gives up and never allows his team to give up despite the circumstances.' Grantland Rice called him 'an alert, hustling, magnetic leader who can get 100 per cent out of his material.' His competitive fire was legendary — in a crucial late-season game against the White Sox in 1920, Speaker caught a line drive by Shoeless Joe Jackson on a dead run, crashed into a concrete wall, and lay unconscious still holding the ball. His intensity was infectious, not toxic.",
    str: "Superb talent evaluator. Henry P. Edwards of the Cleveland Plain Dealer called Speaker 'the Miracle Man' for his ability to convert discards into valuable assets. He saw potential in Charlie Jamieson (.235 with Washington/Philadelphia, later .303 career with Cleveland), George Burns (dropped by Detroit, later 1926 AL MVP under Speaker), and Steve O'Neill (career .253 hitter who hit .311-.322 under Speaker after receiving three specific batting tips). The acquisitions of Gardner, Jamieson, and Myers cost almost nothing. Speaker built championship teams on bargains.",
    flx: "Speaker showed real innovation in his prime but his flexibility had clear limits. After 1921, his player evaluation declined — he traded away George Burns and Elmer Smith, gave up on Riggs Stephenson (who starred for the Cubs for years), and sent Stan Coveleski to Washington for two obscure players while Coveleski won 34 more games. He also backed off platooning after 1921. His success was concentrated in a brilliant two-year peak, with diminishing returns afterward. The gambling scandal ended his career before he could adapt to a new era.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Magnetic player-manager who led from center field. Speaker's authority was earned on the field every single day — he was not merely a manager who happened to play, but a transcendent player whose competitive fire lifted everyone around him. Gordon Cobbledick: 'There was never any doubt among the players that instructions from him were orders to be obeyed, but he didn't place himself on a pedestal. While the ball game was in progress, he was the boss. When it was over, he was one of the gang.' His power was inspirational, not hierarchical.",
    temperament: "Fiercely competitive Texas roughneck with a paradoxical grace. Grantland Rice compared him to Napoleon Lajoie for his effortless athleticism — 'the smoothness of a summer wind' — but Speaker also turned 'blue in heated arguments with umpires' and played with a physical recklessness that bordered on self-destruction. He broke both arms as a child breaking horses, taught himself to throw left-handed, and built a career on fearlessness. His hair turned prematurely grey, earning the nickname that masked the fire beneath.",
    work_ethic: "Relentless self-improver from boyhood. As a rookie, Speaker had Cy Young hit him fly balls for hours to develop his fielding instincts. He revolutionized center field positioning through obsessive study of hitters, playing so shallow that he made unassisted double plays at second base. Stan Coveleski recalled that when Speaker didn't know something, 'he asked for help' — a rare humility for a star of his caliber. His preparation was practical and specific, rooted in a player's understanding of the game.",
    lifestyle: "Texas through and through. Born in Hubbard, a railroad town of 500 people, to a family whose brothers fought for the Confederacy. Father died when he was 10. Strong attachment to his mother throughout life — after winning the 1920 World Series, his first act was to climb into the stands to embrace her. Later in life: president of a wholesale wine and liquor firm, sales representative for a steel company, chairman of the Cleveland Boxing Commission. A 32nd Degree Mason with strong religious convictions.",
    communication_style: "Direct, warm when off the field, fierce during games. The Washington Times noted Speaker was 'a manager and coacher of temperament as much as instructor of physical skill.' He gave Steve O'Neill three specific batting tips that transformed his career. He connected individually with players, building confidence in young players like Sewell through personal attention. But with umpires and opponents, he was combative and profane.",
    loyalty_expectations: "Give everything on the field. Speaker demanded maximum effort because he gave it himself — every day, every play, every game. He was the first in attack and the last to give up. Players who matched his intensity thrived. Those who couldn't keep up found themselves elsewhere. His loyalty to friends like Joe Wood was deep and sometimes costly — he arranged Wood's purchase at above-market rates and may have been implicated in gambling partly through that friendship.",
    dark_side: "The gambling scandal and the shadow of bigotry. In 1926, Dutch Leonard accused Speaker and Ty Cobb of fixing a game in 1919. Letters from Cobb and Joe Wood provided circumstantial evidence. AL President Ban Johnson forced Speaker to resign. Commissioner Landis exonerated him, but Speaker never managed again. Beyond the scandal, Fred Lieb claimed Speaker confided KKK membership, though biographer Charles Alexander found only 'casual racial prejudices common to the time' rather than active participation. In 1947, at Bill Veeck's request, Speaker coached Larry Doby on his conversion to center field — a complicated act from a complicated man. The Grey Eagle soared higher than any Firebrand before him, but the shadows on his wings were real.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PLAYBOOK PROFILE
  // ═══════════════════════════════════════════════════════════════
  playbook: {
    roster_philosophy: "Find diamonds in the discard pile, then deploy them with scientific precision. Speaker built his championship Indians through bargain acquisitions — Gardner, Jamieson, and Myers cost one temperamental outfielder. Burns and Johnston cost less than $10,000 combined. Then Speaker maximized their value through the platoon system, squeezing production from complementary players that no single player could match. The roster was a puzzle assembled by a genius who saw pieces where others saw junk.",
    conflict_response: "MATCH AND INSPIRE. Speaker didn't suppress conflicts like McGraw or absorb them like Robinson. He matched intensity with intensity, then channeled it toward winning. When Chapman died, Speaker didn't comfort the team with gentle words — he led them to a championship through sheer competitive fury. When injuries decimated 1921, he didn't make excuses — he played hurt and demanded everyone else do the same. His fire was contagious, not destructive.",
    clique_strategy: "UNIFY THROUGH SHARED MISSION. Speaker's teams united around their player-manager's magnetic intensity. There was one standard: match Speaker's effort. He was 'one of the gang' after games, which prevented the hierarchical resentment that plagued more authoritarian managers. But the unity depended on Speaker's physical presence — when his playing declined, the unifying force weakened.",
    player_types_that_thrive: [
      "Discarded talent needing a second chance — Speaker's eye for hidden potential was legendary",
      "High-effort grinders who match Speaker's relentless competitive intensity",
      "Young players who respond to hands-on mentorship and confidence building",
      "Position players willing to accept platoon roles for the good of the team",
      "Veterans with something to prove — Speaker believed in players others had abandoned",
    ],
    player_types_that_struggle: [
      "Low-effort players — Speaker's intensity demands matching effort from everyone",
      "Egotists who resent platooning — the system requires accepting part-time roles",
      "Players who need rigid institutional structure — Speaker leads by example, not by rules",
      "Pitching specialists needing deep analytical development — Speaker's genius is offense and defense",
      "Players sensitive to controversy — the gambling scandal and Speaker's associations create tension",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 3,
      max_volatility: "HIGH — Speaker tolerates volatility because he IS volatile. Fire recognizes fire.",
      discipline_floor: "MEDIUM — Speaker doesn't enforce rules, but his personal example creates a de facto standard. Players who fall below it stand out starkly.",
      star_exception: "Joe Wood was Speaker's one true exception — his best friend from Boston, whose purchase was arranged at inflated cost. Friendship trumped objectivity, and it contributed to the gambling scandal.",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY IMPACT
  // ═══════════════════════════════════════════════════════════════
  chemistry_impact: {
    team_fit: { effect: "STRONGLY INCREASED", desc: "Speaker's magnetic presence creates organic unity. 'One of the gang' after games. Players want to play for him because he plays alongside them. +2 Team Fit while Speaker is active on the roster. If Speaker is injured or benched, Team Fit drops by -2." },
    volatility: { effect: "CHANNELED", desc: "Speaker doesn't suppress or tolerate volatility — he channels it. High-volatility players gain +1 Intensity under Speaker. But if the team is losing, volatility can spiral as Speaker's own fire burns too hot." },
    discipline: { effect: "MODERATE", desc: "No formal discipline system — Speaker leads by example. Effective when he's performing, fragile when he's not. Players maintain discipline through peer pressure and respect, not fear or rules." },
    ego: { effect: "MODERATE TOLERANCE", desc: "Speaker manages egos through personal connection, not confrontation. Stars who share his intensity are handled well. But platooning requires ego sacrifice that some stars won't accept. Max 3 high-ego players." },
    work_habits: { effect: "STRONGLY INCREASED", desc: "Speaker's relentless work ethic is contagious. All position players gain +1 to defensive stats. Pitchers gain confidence from the best defensive outfield in baseball playing behind them." },
    adaptability: { effect: "HIGH (PEAK) / LOW (DECLINE)", desc: "Speaker was brilliantly adaptive in 1920-21 but his innovation stalled after. His adaptability rating drops by 1 for each season beyond his second year managing." },
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "The Grey Eagle", desc: "Speaker's transcendent playing ability IS his managerial authority. While active on the roster hitting .350+, all team ratings gain +1. If Speaker's BA drops below .300, his authority erodes and all clubhouse bonuses are halved. The player-manager's paradox: his power depends on his performance." },
    { tag: "The Triple Shift", desc: "Speaker's revolutionary platoon system. At three positions, right-handed and left-handed hitters alternate based on opposing pitcher's handedness. All platooned players gain +1 to their primary batting stat when facing opposite-handed pitching. But players with Ego >7 refuse to platoon (-2 morale)." },
    { tag: "The Miracle Man", desc: "Speaker converts discards into assets. Any player acquired via trade or free agency who was previously released or below replacement level gains +2 to their lowest stat after 10 games under Speaker. Henry P. Edwards called him the Miracle Man for this pattern." },
    { tag: "For Chappie", desc: "After a teammate tragedy or major setback, Speaker rallies the team through competitive fury, not grief counseling. +3 Intensity and +2 Harmony for the remainder of that season. Based on the 1920 Indians winning the World Series after Ray Chapman's death." },
    { tag: "The Caldwell Contract", desc: "Speaker uses reverse psychology on troubled players. Players with addiction or discipline problems can be managed with unconventional methods: acknowledge the flaw, build the schedule around it, demand performance. 30% chance of full reclamation (+3 stats), 20% chance of total collapse." },
    { tag: "Wall Crasher", desc: "Speaker's physical recklessness in pursuit of victory. In crucial games, 15% chance Speaker makes a legendary defensive play that swings momentum (+2 all ratings this game). But 10% chance he's injured on the play and misses 1-3 games, losing all player-manager bonuses." },
    { tag: "The Dutch Leonard Affair", desc: "Gambling scandal hangs over Speaker's career. 15% chance per season of a 'Scandal Investigation' event that freezes Speaker's tactical bonuses for 5 games while the inquiry plays out. If exonerated (80%), team gains +1 Harmony from shared adversity. If not, Speaker is forced to resign." },
    { tag: "Shallow Center", desc: "Speaker's defensive innovation — playing center field so shallow he could make plays at second base — extends to his managing philosophy: aggressive positioning, calculated risk, trust your instincts. All defensive players gain +1 range. But 10% chance per game of a ball hit over Speaker's head for extra bases (aggressive positioning backfire)." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "League Park / Home Ballpark", affinity: "HIGH", note: "Cleveland's home with its 460-foot center field — built for Speaker's range. He played here 1916-1926 and managed from center field." },
    { location: "Center Field", affinity: "HIGH", note: "Speaker's office. He managed from the outfield, signaling to the bench. His authority radiated from the grass, not the dugout." },
    { location: "Spring Training Camp", affinity: "HIGH", note: "Where Speaker built his teams — morning batting practice with Sewell, evaluating minor leaguers, testing his platoon configurations." },
    { location: "Texas Ranch / Countryside", affinity: "MEDIUM", note: "Born in Hubbard, TX. Broke horses as a child, learned toughness from the land. Died at Lake Whitney, not far from home." },
    { location: "Hotel / Player Quarters", affinity: "MEDIUM", note: "'One of the gang when the game was over.' Speaker socialized with players as an equal, building loyalty through proximity." },
    { location: "Banquet Hall / Public Event", affinity: "MEDIUM", note: "A regular on the banquet circuit after retirement. President of Tris Speaker, Inc. Chairman of the Cleveland Boxing Commission. The Grey Eagle capitalized on being Tris Speaker." },
    { location: "Commissioner's Office", affinity: "LOW", note: "The site of Speaker's exoneration — and his exile. Landis cleared him but insisted he resign. Speaker never managed in the majors again." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Team adversity — Speaker's teams rose after Chapman's death, after injuries in 1921, after every setback that would break other teams",
      "Late-season pennant pressure — the Indians were at their best in September, feeding on Speaker's relentless intensity",
      "Speaker on a hitting tear — when the player-manager is hitting .388, the whole team catches fire",
      "Platoon matchups clicking — when the triple shift produces exactly the results Speaker predicted, team confidence soars",
    ],
    cold_triggers: [
      "Speaker injured or slumping — the player-manager's authority depends on performance, and when it fades, everything fades",
      "Gambling scandal pressure — external investigations freeze the team's competitive focus",
      "Post-1921 decline — Speaker's player evaluation skills deserted him after his brilliant peak, leading to bad trades",
      "Institutional confrontation — Speaker thrived as a field leader but struggled against front-office politics and league investigations",
    ],
    pressure_response: "TRANSCENDENT IN CRISIS, VULNERABLE TO EROSION. Speaker was at his absolute best when the stakes were highest and the situation most desperate — winning the 1920 World Series after Chapman's death, nearly winning the 1921 pennant with half his roster injured. His competitive fire burned brightest in the darkest moments. But sustained, slow-building pressure — the gambling investigation, his declining playing skills, deteriorating player evaluation — eroded him. He was a Firebrand who could win any battle but lost the longer war. In ILB: +2 all ratings in elimination games and do-or-die situations. -1 all ratings in seasons 3+ of his tenure as accumulated problems mount.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Wall Catch",
      type: "Game Action",
      text: "Your player-manager makes a spectacular defensive play in a crucial moment — catching a ball on a dead run and crashing into the outfield wall. Team gains +2 Intensity and +1 Momentum for the rest of the game. But roll for injury: 25% chance your manager misses the next series.",
      origin: "In a crucial late-season 1920 game against the White Sox, Speaker caught a line drive by Shoeless Joe Jackson on a dead run, leaping into a concrete wall. He lay unconscious but still held the ball. The catch helped clinch the pennant.",
    },
    {
      title: "The Caldwell Gambit",
      type: "Action",
      text: "Your manager signs a troubled player with an unconventional contract that accommodates his vices rather than fighting them. Player must 'get drunk' after each start, then run laps, then pitch batting practice, then pitch again. 60% chance the player delivers a 20-win season. 20% chance he flames out entirely. 20% chance of no-hitter.",
      origin: "Speaker signed the alcoholic Ray Caldwell with a contract requiring him to drink after starts, run laps, throw batting practice, then pitch. Caldwell went 5-1 with a 1.71 ERA, threw a no-hitter against the Yankees, survived a lightning strike mid-game, and won 20 the next year.",
    },
    {
      title: "For Chappie",
      type: "Drama",
      text: "A devastating tragedy strikes your team mid-season. Your manager channels grief into fury. All players gain +2 Intensity for the rest of the season. Team dedicates the season to the fallen teammate. If you win the championship, the moment becomes permanent legend — +1 OVR for your franchise history.",
      origin: "Ray Chapman died on August 17, 1920, after being hit by a pitch from Carl Mays. Speaker rallied the devastated Indians, brought up 21-year-old Joe Sewell as a replacement, and led the team to their first World Series championship. Chapman had said he wanted to help Speaker win before retiring.",
    },
    {
      title: "The Triple Shift",
      type: "Game Action",
      text: "Your manager implements an aggressive platoon system at three positions simultaneously. All platooned positions gain +1 offensive rating when facing opposite-handed pitching. But any player forced into a platoon role with Ego >6 has 30% chance of demanding a trade.",
      origin: "Speaker's revolutionary 1920-1921 platoon system matched right-handed hitters against left-handed pitchers at first base, right field, and left field simultaneously. George Burns went from .268 to .361. Critics called it 'spoon-feeding' and predicted it would 'destroy young ball players.'",
    },
    {
      title: "The Dutch Leonard Letter",
      type: "Drama",
      text: "A disgruntled former player produces letters implicating your manager in game-fixing. Your manager is suspended pending investigation. All tactical bonuses frozen for 5 games. If exonerated (70%), your team gains +2 Harmony from shared adversity. If found guilty (30%), manager is banned for life.",
      origin: "In 1926, Dutch Leonard accused Speaker and Ty Cobb of fixing a September 1919 game. Letters from Cobb and Joe Wood provided circumstantial evidence. Ban Johnson forced Speaker to resign. Landis exonerated him, but Speaker never managed again. Billy Evans called the accusations 'purely a matter of personal revenge.'",
    },
    {
      title: "Nobody But Speaker",
      type: "Action",
      text: "Your manager holds a depleted, injury-ravaged team together through sheer will and personal performance. For the rest of the season, your manager's personal stats are added as team bonuses: +1 Intensity, +1 Harmony, +1 Strategy. But your manager's body breaks down — 20% chance of season-ending injury.",
      origin: "In 1921, with Wambsganss, O'Neill, and Speaker himself injured at various points, Speaker kept the Indians in first most of the season. Stuart Bell of the Cleveland Plain Dealer: 'He piloted an almost pitcherless and for two months an almost catcherless ball club. Nobody but Tris Speaker could have done it.'",
    },
    {
      title: "The Spark Plug Arrives",
      type: "Trade",
      text: "Your manager acquires a player who 'other members of the team needed: confidence.' The acquired player gives +1 morale to every teammate. All players within 2 positions gain +1 to their primary stat. The roster gels around the newcomer's energy.",
      origin: "When Speaker arrived in Cleveland in 1916, Fielder Jones observed: 'His coming has given a number of other members of the team the one thing they lacked: confidence. Speaker is as necessary to the Cleveland club as a spark plug to an automobile.'",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Lean, athletic, 5'11\" and 193 lbs — a Texan built for speed and collision. Prematurely grey hair that gave him the 'Grey Eagle' nickname, but the face beneath is young and fierce. Sharp, intelligent eyes scanning the field for the next play. Clean-shaven, angular jaw. Not pretty but magnetic. The look of a man who taught himself to throw left-handed after breaking both arms falling off horses.",
    attire: "Cleveland Indians uniform, 1920 era. Speaker managed in uniform — he was a player first and always. Cap worn straight, glove in hand or tucked under arm. Standing in shallow center field at League Park, 460 feet from home plate, impossibly close to the infield. The uniform is worn and dirty — Speaker played every game like it was his last.",
    mood: "Magnetic intensity. Not volcanic rage like McGraw, not cold calculation like Selee — a warm, fierce, forward-leaning energy that pulls everyone in his orbit toward the same goal. The look of a man sprinting toward a concrete wall to catch a baseball, knowing the collision is coming, going anyway. Grace and violence inseparable. The smoothness of a summer wind that could knock down a barn.",
    style: "Warm amber and burnt orange palette — the Firebrand color, but with more gold than previous Firebrands. League Park in the background, the vast center field stretching behind Speaker. Dust in the air, late afternoon light, the golden hour of the 1920s. Less sepia than the Authoritarian cards, more saturated — this is the live-ball era, color is creeping in. Texas heat underneath Cleveland steel.",
    reference: "Third Firebrand in the ILB spectrum, and the first to break the Contender ceiling. Tebeau burned through physical violence (7 OVR) — the Firebrand as Thug. Evers burned through intellectual violence (7 OVR) — the Firebrand as Agitator. Speaker burns through magnetic competitive fire (9 OVR) — the Firebrand as Inspiration. Where Tebeau destroyed and Evers corroded, Speaker elevates. This card proves the archetype can produce elite results when the fire inspires rather than consumes. The Grey Eagle should feel like a wildfire that clears deadwood and leaves the forest stronger.",
  },
};

// ═══════════════════════════════════════════════════════════════
// MANAGER RATING ENGINE
// ═══════════════════════════════════════════════════════════════
const RATING_ENGINE = {
  game_management: {
    tactics: { metric: "Strategic innovation & in-game control", scale: "1-5", tiers: [
      { range: "1", label: "Passive — lets players decide" },
      { range: "2", label: "Conventional — standard moves" },
      { range: "3", label: "Strong — consistent tactical edge" },
      { range: "4", label: "Elite — pioneering strategy" },
      { range: "5", label: "Revolutionary — rewrote the playbook" },
    ]},
    pitching: { metric: "Bullpen/starter management", scale: "1-5" },
    lineup: { metric: "Batting order, platoons, matchup exploitation", scale: "1-5" },
    adaptability: { metric: "Mid-game/mid-series adjustment ability", scale: "1-5" },
  },
  clubhouse_management: {
    discipline: { metric: "Structure enforcement & rule adherence", scale: "1-10" },
    ego_mgmt: { metric: "Star handling & hierarchy management", scale: "1-10" },
    harmony: { metric: "Conflict resolution & cohesion building", scale: "1-10" },
    intensity: { metric: "Motivational pressure & competitive fire", scale: "1-10" },
    strategy: { metric: "Role optimization & roster efficiency", scale: "1-10" },
    flexibility: { metric: "Personality/era tolerance & adaptability", scale: "1-10" },
  },
  overall: {
    formula: "(TAC+PIT+LIN+ADP)/4 × 1.5 + (DIS+EGO+HAR+INT+STR+FLX)/60 × 8.5, normalized 3-13",
    tiers: [
      { range: "3-4", label: "Filler" },
      { range: "5-6", label: "Solid Skipper" },
      { range: "7-8", label: "Contender" },
      { range: "9-10", label: "Elite" },
      { range: "11-12", label: "Legend" },
      { range: "13", label: "Mythic" },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════
// THEME COLORS
// ═══════════════════════════════════════════════════════════════
const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14",
  // Firebrand archetype accent
  fireOrange: "#e8a030",
  fireDark: "#b07020",
  hotRed: "#c44040", coldBlue: "#4a7a9a", traitGreen: "#5a8a5a",
  archetypes: {
    Authoritarian: "#e05555",
    "Players' Manager": "#55b877",
    Firebrand: "#e8a030",
    "Tactical Purist": "#5588cc",
    Opportunist: "#b070cc",
  },
};

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════
const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
    <span style={{ width: 32, fontSize: 10, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, textAlign: "right" }}>{label}</span>
    <div style={{ flex: 1, height: 12, background: `${C.sepia}30`, borderRadius: 2, overflow: "hidden", position: "relative" }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 2, transition: "width 0.3s" }} />
    </div>
    <span style={{ width: 18, fontSize: 11, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "center" }}>{value}</span>
  </div>
);

const ClubhouseBar = ({ label, value, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
    <span style={{ width: 60, fontSize: 9, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{label}</span>
    <div style={{ flex: 1, height: 8, background: `${C.sepia}20`, borderRadius: 2, overflow: "hidden" }}>
      <div style={{ width: `${(value / 10) * 100}%`, height: "100%", background: color, borderRadius: 2 }} />
    </div>
    <span style={{ width: 14, fontSize: 9, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace" }}>{value}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

const ChemTag = ({ tag }) => (
  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: `${C.fireOrange}15`, border: `1px solid ${C.fireOrange}30`, color: C.fireOrange, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</span>
);

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function TrisSpeakerCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("playbook");
  const d = MANAGER_DATA;
  const r = d.ilb_ratings;
  const archColor = C.archetypes[d.archetype] || C.fireOrange;

  const tabs = [
    { id: "playbook", label: "Playbook" },
    { id: "personality", label: "Dossier" },
    { id: "chemistry", label: "Chemistry" },
    { id: "momentum", label: "Momentum" },
    { id: "actions", label: "Action Seeds" },
    { id: "engine", label: "Rating Engine" },
    { id: "art", label: "Art Notes" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Manager Card — {d.ilb_team} Era</div>
      </div>

      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${archColor}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        {/* Flip Button */}
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Playbook ▼" : "▲ Flip Card — View Front ▲"}
        </button>

        {side === "front" ? (
          <div style={{ padding: 20 }}>
            {/* Portrait Area */}
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${C.darkBrown} 0%, #5a3a1a 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.15 }}>🦅</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              {/* OVR Badge */}
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              {/* Archetype Badge */}
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.archetype.toUpperCase()}</div>
              {/* Era Badge */}
              <div style={{ position: "absolute", bottom: 50, left: 12, background: `${C.ink}aa`, color: C.gold, padding: "3px 8px", borderRadius: 2, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.era}</div>
            </div>

            {/* Name & Identity */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 10, color: archColor, fontFamily: "'Courier Prime', monospace", marginTop: 6, letterSpacing: 3, fontWeight: 900 }}>◆ PLAYER-MANAGER ◆</div>
            </div>

            {/* Game Management Stats */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 6, textTransform: "uppercase" }}>Game Management</div>
              <StatBar label="TAC" value={r.tac} max={5} color={archColor} />
              <StatBar label="PIT" value={r.pit} max={5} color={C.gold} />
              <StatBar label="LIN" value={r.lin} max={5} color={C.coldBlue} />
              <StatBar label="ADP" value={r.adp} max={5} color={C.traitGreen} />
            </div>

            {/* Clubhouse Management Stats */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 6, textTransform: "uppercase" }}>Clubhouse Management</div>
              <ClubhouseBar label="DISCPLN" value={r.dis} color={archColor} />
              <ClubhouseBar label="EGO MGT" value={r.ego} color={C.warmRed} />
              <ClubhouseBar label="HARMONY" value={r.har} color={C.traitGreen} />
              <ClubhouseBar label="INTSITY" value={r.int} color={"#e8a030"} />
              <ClubhouseBar label="STRATGY" value={r.str} color={C.coldBlue} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={"#b070cc"} />
            </div>

            {/* Managerial Record Strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "WS", val: d.record.world_series },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "BA", val: ".345" },
                { label: "DOUBLES", val: "792" },
                { label: "PEAK", val: d.record.peak_record },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: stat.val && stat.val.length > 8 ? 9 : 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>PLAYER-MANAGER RECORD — {d.record.seasons_managed} SEASONS</div>

            {/* Awards Row */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {[
                "🏆 1920 World Series",
                "⭐ HOF 1937",
                "🔄 Platoon Pioneer",
                "🦅 .345 Career BA",
                "📊 792 Doubles (Record)",
                "🏟️ 1912 AL MVP",
                "⚾ 3× WS Champion",
              ].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${archColor}15`, border: `1px solid ${archColor}30`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          /* ══════════ BACK OF CARD ══════════ */
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: archColor, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 900 }}>CLASSIFIED PLAYBOOK — {d.year}</div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500,
                  background: tab === t.id ? C.darkBrown : "transparent",
                  color: tab === t.id ? C.gold : C.medBrown,
                  border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`,
                  borderRadius: 3, cursor: "pointer",
                  fontFamily: "'Courier Prime', monospace", letterSpacing: 1,
                }}>{t.label}</button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>

              {/* PLAYBOOK TAB */}
              {tab === "playbook" && (<>
                <Section title="Roster Philosophy">
                  <p style={{ margin: 0, color: C.medBrown }}>{d.playbook.roster_philosophy}</p>
                </Section>
                <Section title="Conflict Response">
                  <p style={{ margin: 0 }}><span style={{ fontWeight: 900, color: archColor }}>{d.playbook.conflict_response.split(".")[0]}.</span> {d.playbook.conflict_response.split(".").slice(1).join(".")}</p>
                </Section>
                <Section title="Clique Strategy">
                  <p style={{ margin: 0 }}><span style={{ fontWeight: 900, color: archColor }}>{d.playbook.clique_strategy.split(".")[0]}.</span> {d.playbook.clique_strategy.split(".").slice(1).join(".")}</p>
                </Section>
                <Section title="✅ Players Who Thrive">
                  {d.playbook.player_types_that_thrive.map((p, i) => (
                    <div key={i} style={{ padding: "3px 0", color: C.traitGreen, fontSize: 11 }}>▸ {p}</div>
                  ))}
                </Section>
                <Section title="⚠ Players Who Struggle">
                  {d.playbook.player_types_that_struggle.map((p, i) => (
                    <div key={i} style={{ padding: "3px 0", color: C.warmRed, fontSize: 11 }}>▸ {p}</div>
                  ))}
                </Section>
                <Section title="Tolerance Thresholds">
                  {Object.entries(d.playbook.tolerance_thresholds).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, color: C.ink, fontSize: 10, textTransform: "uppercase" }}>{key.replace(/_/g, " ")}:</span>{" "}
                      <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span>
                    </div>
                  ))}
                </Section>
              </>)}

              {/* PERSONALITY TAB */}
              {tab === "personality" && (<>
                {Object.entries(d.personality).map(([key, val]) => (
                  <Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}>
                    <p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p>
                  </Section>
                ))}
              </>)}

              {/* CHEMISTRY TAB */}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Impact">
                  {Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (
                    <div key={key} style={{ marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span>
                        <span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("STRONG") ? `${C.traitGreen}20` : effect.includes("LOW") ? `${C.warmRed}20` : `${C.gold}20`, color: effect.includes("STRONG") ? C.traitGreen : effect.includes("LOW") ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span>
                      </div>
                      <p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p>
                    </div>
                  ))}
                </Section>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                    {d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}
                  </div>
                  {d.chemistry_traits.map((t, i) => (
                    <div key={i} style={{ marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span>{" "}
                      <span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span>
                    </div>
                  ))}
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

              {/* MOMENTUM TAB */}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}

              {/* ACTION SEEDS TAB */}
              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Speaker's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (
                    <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                        <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : a.type === "Trade" ? `${C.traitGreen}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : a.type === "Trade" ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span>
                      </div>
                      <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                      <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                    </div>
                  ))}
                </Section>
              </>)}

              {/* RATING ENGINE TAB */}
              {tab === "engine" && (<>
                <Section title="🎩 Manager Rating Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Managers use a dual rating system: Game Management (1-5) and Clubhouse Management (1-10).</p>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11, marginBottom: 4 }}>Overall Tier Scale</div>
                    {RATING_ENGINE.overall.tiers.map((t, i) => (
                      <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.label}</div>
                    ))}
                  </div>
                </Section>
                <Section title="Speaker's Derivation">
                  {Object.entries(d.rating_justification).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}
                      <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span>
                    </div>
                  ))}
                </Section>
              </>)}

              {/* ART NOTES TAB */}
              {tab === "art" && (
                <Section title="Visual Art Direction">
                  {Object.entries(d.art_direction).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: 10 }}>
                      <span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}
                      <span style={{ color: C.medBrown }}>{val}</span>
                    </div>
                  ))}
                </Section>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB MGR #{d.ilb_team}</span>
          <span>{d.era} • {d.archetype} • OVR {r.ovr}</span>
        </div>
      </div>

      {/* JSON Export Preview */}
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({
  name: d.name,
  nickname: d.nickname,
  year: d.year,
  era: d.era,
  ilb_team: d.ilb_team,
  archetype: d.archetype,
  game_mgmt: { tac: r.tac, pit: r.pit, lin: r.lin, adp: r.adp },
  clubhouse: { dis: r.dis, ego: r.ego, har: r.har, int: r.int, str: r.str, flx: r.flx },
  ovr: r.ovr,
  chemistry_traits: d.chemistry_traits.map(t => t.tag),
  preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })),
  hot_triggers: d.momentum.hot_triggers,
  cold_triggers: d.momentum.cold_triggers,
  action_seeds: d.action_card_seeds.length,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
