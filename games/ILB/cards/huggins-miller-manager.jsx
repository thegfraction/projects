import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: MILLER HUGGINS
// Era: 1910 · Archetype: Tactical Purist
// "The Mighty Mite" — Law Degree, Yankee Dynasty, Babe Tamer
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Miller Huggins",
  nickname: "The Mighty Mite",
  year: 1927,
  team: "New York Yankees",
  era: "1910s",
  ilb_team: "Gloves",
  archetype: "Tactical Purist",
  born: "March 27, 1878 — Cincinnati, OH",
  died: "September 25, 1929 — New York, NY (age 51)",
  hof: "Inducted 1964 (Veterans Committee). First Yankee honored with a monument at Yankee Stadium. Monument Park began with him.",
  height: '5\'6"',
  weight: "140 lbs",

  record: {
    career_wins: 1413,
    career_losses: 1134,
    win_pct: ".555",
    pennants: 6,
    world_series: 3,
    seasons_managed: 17,
    ejections: "Rare — schoolmaster composure, not theatrical rage",
    peak_team: "1927 New York Yankees ('Murderers' Row')",
    peak_record: "110-44 (.714), swept Pittsburgh in World Series",
    teams_managed: ["St. Louis Cardinals (1913-17): 346-415", "New York Yankees (1918-29): 1067-719"],
    notable: "Built the original Yankee dynasty. 6 AL pennants in 8 years (1921-23, 1926-28). Tamed Babe Ruth — fined him $5,000 (record) and won the power struggle. Adapted from deadball style to power baseball. Law degree, University of Cincinnati. 'The prototype for the modern manager.' Died at 51 from blood poisoning. First monument in Yankee Stadium.",
    hof_players_managed: ["Babe Ruth", "Lou Gehrig", "Waite Hoyt", "Herb Pennock", "Earle Combs", "Tony Lazzeri", "Joe Sewell", "Rogers Hornsby (Cardinals)"],
  },

  ilb_ratings: {
    tac: 5,  // Maximum. "One of baseball's best minds." Adapted from deadball (speed, bunts, hit-and-run) to power era (Ruth, Gehrig). "Almost like a schoolmaster in the dugout." Tracked count on every batter. Prototype for the modern manager.
    pit: 4,  // Recruited Waite Hoyt and Herb Pennock from rival Red Sox — both became HOFers. "Recruited consistent (as opposed to brilliant) pitchers." Understood staff construction deeply.
    lin: 5,  // Maximum. Built Murderers' Row: Ruth, Gehrig, Meusel, Lazzeri, Combs. The 1927 Yankees are rated by many as the best team in history. Huggins assembled and ordered that lineup.
    adp: 5,  // Maximum. His greatest feat: abandoning his own deadball philosophy when Ruth arrived and reinventing the team around power. "The acquisition of superstar slugger Ruth dictated a change of emphasis towards power and not giving away outs." The rarest kind of intellectual honesty.

    dis: 7,  // High. Fined Ruth $5,000 — the largest fine in baseball history at the time. "There was no goofing off. You watched the game." Enforced through quiet authority, not shouting.
    ego: 8,  // Elite. Managed Babe Ruth, Lou Gehrig, and a parade of prima donnas. Ruth: "He was the only man who knew how to keep me in line." Turned fractious boys into disciplined men.
    har: 7,  // Good. Ruth and Gehrig often didn't speak to each other. Others bickered constantly. Huggins "held the team together with diplomacy, paternal caring, and firm discipline with enough flexibility."
    int: 5,  // Moderate. Not volcanic — cerebral. "Introspective personality." Suffered from neuritis and insomnia. His intensity was intellectual, manifested as tactical precision, not emotional fire.
    str: 8,  // Elite talent evaluator. "There never has been a better judge of raw baseball talent." Opposing teams were hesitant to trade with the Yankees because Huggins always won deals. Turned Red Sox castoffs into HOFers.
    flx: 7,  // High. Abandoned deadball philosophy for power baseball. Managed through WWI, the Roaring Twenties, and the transition to modern baseball. Adapted his style to each player's personality.

    ovr: 12, // Legend tier. 6 pennants, 3 World Series, built the greatest dynasty in baseball history, tamed Ruth, adapted across eras. Only death at 51 prevents Mythic.
  },

  rating_justification: {
    tac: "Maximum. 'Huggins was almost like a schoolmaster in the dugout. There was no goofing off. You watched the game, and you kept track not only of the score and the number of outs, but of the count on the batter. At any moment, Hug might ask you what the situation was.' He was decades ahead in understanding game situations. His willingness to abandon his own deadball philosophy for power baseball was intellectually courageous. Rating of 5.",
    pit: "Traded for Waite Hoyt and Herb Pennock from the Red Sox — both struggled in Boston, both became Hall of Famers in New York. He 'recruited consistent (as opposed to brilliant) pitchers' — understanding that with Murderers' Row, you didn't need aces. You needed reliability. That's advanced pitching management. Rating of 4.",
    lin: "Maximum. He built the most famous lineup in baseball history. Murderers' Row — Ruth, Gehrig, Meusel, Lazzeri, Combs — was assembled piece by piece by Huggins. He benched Wally Pipp for Lou Gehrig, beginning the greatest consecutive games streak in history. He put Ruth at cleanup and built the order around his power. The 1927 Yankees went 110-44. Rating of 5.",
    adp: "Maximum. This is what separates Huggins from other tacticians. His natural style was deadball — speed, bunts, hit-and-run, contact hitting. When Ruth arrived, Huggins recognized that the game had changed and he needed to change with it. He abandoned his own philosophy and built around power. That takes extraordinary intellectual honesty. Most managers would have tried to make Ruth bunt. Rating of 5.",
    dis: "High. The $5,000 fine on Ruth was the most any player had ever been fined. When Ruth raged, Huggins stood firm. Owner Ruppert backed him: 'The fine sticks and the suspension sticks for as long as Huggins wants.' Ruth never publicly questioned his manager again. Huggins disciplined through quiet authority: 'He may be fairly credited with saving Ruth's career when Ruth lost all self-discipline.' Rating of 7.",
    ego: "Elite. Managing Babe Ruth — the most famous, most talented, most undisciplined player in baseball history — is the ultimate ego management challenge. Ruth didn't respect Huggins initially: 'He did not respect Huggins due to his small stature, soft-spoken nature, and inability to fight.' Huggins won through patience, intelligence, and the $5,000 ultimatum. Rating of 8.",
    har: "Good. The clubhouse was fractious — Ruth and Gehrig didn't speak, players bickered, egos clashed. 'Huggins held the team together with diplomacy, a paternal caring for players with problems, and firm discipline with enough flexibility in it for his players' expansive personalities to be expressed.' Not perfect harmony, but functional. Rating of 7.",
    int: "Moderate. Huggins was 'introspective' — quiet, cerebral, sometimes melancholy. He suffered from neuritis and insomnia. He 'seriously debated walking away amidst increasing poor physical and mental health.' His intensity was internal — a slow burn, not an explosion. The schoolmaster's intensity: focused, precise, exhausting in a different way than Evers or Tebeau. Rating of 5.",
    str: "Elite. 'There never has been a better judge of raw baseball talent than Huggins.' He turned Red Sox castoffs (Hoyt, Pennock) into Hall of Famers. He nudged Ruppert to buy Ruth. He replaced Pipp with Gehrig. He developed Tony Lazzeri and Earle Combs. Opposing teams refused to trade with the Yankees because Huggins always came out ahead. Rating of 8.",
    flx: "High. Managed across two radically different eras (deadball → power), two cities (St. Louis → New York), and two types of teams (Cardinals rebuilders → Yankees dynasty). Adapted his style to each player — paternal with Gehrig, firm with Ruth, diplomatic with everyone else. Showed intellectual flexibility in abandoning his own philosophy. Rating of 7.",
  },

  personality: {
    leadership_style: "Intellectual patriarch. Huggins led through knowledge, preparation, and quiet authority. 'Almost like a schoolmaster in the dugout.' He didn't command respect through size or volume — he earned it through being smarter than everyone in the room. When that wasn't enough, he had the moral courage to back it up: the $5,000 fine on Ruth was the moment the tiny manager became the most powerful person on the team.",
    temperament: "Quiet, introspective, and melancholy. 'Some people think I'm a sour, morose crab,' Huggins admitted. But underneath the introversion was iron resolve. He suffered from insomnia and neuritis. He debated quitting multiple times. He nearly died of blood poisoning before finally dying of it. The exterior was calm; the interior was a war zone of pressure, doubt, and determination.",
    work_ethic: "Methodical and obsessive. Huggins studied law at the University of Cincinnati — the analytical mind was trained before baseball. As a player, he led the league in walks four times because he studied pitchers obsessively. As a manager, he tracked every count on every batter and quizzed his players constantly. The preparation was the product.",
    lifestyle: "Bachelor. Never married. Lived alone. His sister Myrtle was his closest companion and inherited his estate. He invested in real estate in St. Petersburg, Florida. He had few friends outside baseball and fewer interests. 'I could have never been happy as anything but a professional baseball player.' Baseball consumed him — and eventually, so did the stress of managing baseball's most famous team.",
    communication_style: "Sparse and precise. Huggins spoke when he had something to say and stayed silent otherwise. Bobby Shantz compared Mack's silence to Stengel's chatter — Huggins was closer to Mack's model. But when he spoke, it mattered. His pregame instructions were detailed and specific. His postgame assessments were cutting. The silence made the words heavier.",
    loyalty_expectations: "Mutual respect. Huggins didn't demand personal devotion — he demanded professional respect. When Ruth disrespected him, the fine was about respect, not discipline. When players gave effort, Huggins gave them patience and development. Gehrig: 'He was more like a father to me than anything else. The squarest shooter I ever knew in baseball.'",
    dark_side: "The toll of managing giants. Huggins was physically small, emotionally private, and chronically ill. Managing Babe Ruth — the most famous human being in America — while being dismissed by the press, undermined by co-owner Huston, and ignored by his own players broke him physically. He died at 51 from a skin infection that became sepsis — a body that had been running on empty for years. In ILB: Huggins carries 'Consumed by the Game' — his devotion is his genius and his destruction.",
  },

  playbook: {
    roster_philosophy: "Assemble the best talent possible, then build the system around what THEY do best — not what you wish they did. Huggins's greatest tactical decision was abandoning his own deadball philosophy when Ruth arrived. He didn't try to make Ruth fit his system; he remade his system to fit Ruth. That intellectual humility — building around your players' strengths rather than your own preferences — is the foundation of modern managing.",
    conflict_response: "RESOLVE THROUGH AUTHORITY. When Ruth challenged him, Huggins didn't back down, didn't escalate, and didn't compromise. He fined Ruth $5,000, suspended him, and waited. When Ruppert backed him, the crisis ended. Huggins resolved conflict through legitimate authority, applied precisely and without theatrics.",
    clique_strategy: "MANAGE AROUND THEM. Ruth and Gehrig didn't speak. Other players bickered. Huggins didn't try to force friendship — he demanded professional performance. The team functioned as a machine with interpersonal tensions walled off from on-field execution. You didn't have to like each other. You had to win.",
    player_types_that_thrive: [
      "Talented players willing to submit to intellectual authority — Huggins was smarter than his players and expected them to accept it",
      "Young, raw talent open to development — Huggins turned Gehrig from shy prospect to legend",
      "Disciplined veterans who respect the game's fundamentals",
      "Power hitters (post-Ruth) — Huggins adapted his entire philosophy to maximize power",
      "Players who respond to paternal care — Gehrig called him 'more like a father'",
    ],
    player_types_that_struggle: [
      "Players who mistake quietness for weakness — Ruth initially did, and it took a $5,000 fine to correct",
      "Undisciplined players who need constant supervision — Huggins expected professional adults",
      "Players who need emotional fire from their manager — Huggins was cerebral, not volcanic",
      "Those who resent intellectual authority — 'he was like a schoolmaster' isn't a compliment for everyone",
      "Players who need to be the center of attention — there's only room for one Babe",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 3,
      max_volatility: "LOW — Huggins maintains a calm, studious atmosphere. High-volatility players disrupt the classroom.",
      discipline_floor: "HIGH — professional conduct is non-negotiable. Huggins will fine you the most money in baseball history if necessary.",
      star_exception: "Stars get patience and development, but they answer to the same authority. Ruth found out the hard way.",
    },
  },

  chemistry_impact: {
    team_fit: { effect: "HIGH", desc: "+2 Team Fit when all starting positions are filled with players who've played 5+ games together. Huggins builds machines — the 1927 Yankees were a machine." },
    volatility: { effect: "STRONGLY REDUCED", desc: "-2 Volatility for all players. The schoolmaster's calm radiates through the dugout. Even Ruth became more disciplined under Huggins." },
    discipline: { effect: "STRONGLY INCREASED", desc: "+2 Discipline for all players. 'There was no goofing off. You watched the game.' The fine on Ruth established the standard for everyone." },
    ego: { effect: "MANAGED", desc: "Ego penalties reduced by 2. Huggins handled Ruth, Gehrig, and a dugout full of Hall of Famers without ego disasters. The paternal authority works." },
    work_habits: { effect: "STRONGLY INCREASED", desc: "+2 Work Habits. Huggins's law-school precision and constant quizzing made his teams the most prepared in baseball." },
    adaptability: { effect: "HIGH", desc: "+2 Adaptability. Huggins proved that the greatest adaptation is abandoning your own philosophy when the evidence demands it." },
  },

  chemistry_traits: [
    { tag: "The Mighty Mite", desc: "Huggins was 5'6\" 140 lbs managing 6'2\" 215 lb Ruth. Size is irrelevant when the mind is large enough. +1 Tactics regardless of opponent's physical stats." },
    { tag: "Murderers' Row", desc: "If your lineup includes 4+ players with OVR 8+, gain +2 Contact and +1 Power for the entire lineup. The most famous batting order in history." },
    { tag: "The $5,000 Fine", desc: "Once per series, Huggins can fine any player for insubordination. That player loses -1 to their highest stat for this game but gains +2 Discipline permanently. Authority has consequences." },
    { tag: "The Schoolmaster", desc: "Huggins quizzed his players on game situations. All players gain +1 Tactics. At any moment, Hug might ask you what the count is." },
    { tag: "Deadball to Power", desc: "Huggins abandoned his own philosophy to build around Ruth. If your team's strategy changes mid-season (shifting from speed to power or vice versa), all penalties are halved. Intellectual flexibility." },
    { tag: "Red Sox Pipeline", desc: "Huggins turned Red Sox castoffs into HOFers. When acquiring players from a rival team, those players gain +1 to their highest stat under Huggins. He sees what their old team couldn't." },
    { tag: "Consumed by the Game", desc: "Huggins's devotion killed him at 51. After 20 games, there's a 5% chance per game of a 'Health Crisis' event that reduces all ratings by 1 for 2 games. The body has limits the mind ignores." },
    { tag: "Monument Park", desc: "Huggins was the first monument in Yankee Stadium. If Huggins is removed from the game (health event or season end), all players gain +2 morale for 5 games. His legacy outlasts his presence." },
  ],

  preferred_locations: [
    { location: "Dugout / Yankee Stadium", affinity: "HIGH", note: "Where Huggins sat like a schoolmaster, in suit and tie, tracking every pitch. The original Yankee Stadium was his classroom." },
    { location: "Front Office / Trade Meetings", affinity: "HIGH", note: "Where Huggins won every deal. 'Opposing teams were hesitant to trade with the Yankees.' His talent evaluation was legendary." },
    { location: "Spring Training / St. Petersburg", affinity: "HIGH", note: "Where Huggins invested in real estate and evaluated young players. The classroom before the season started." },
    { location: "University / Law Library", affinity: "MEDIUM", note: "Law degree from University of Cincinnati. The analytical mind that built Murderers' Row was trained in a law school." },
    { location: "Cincinnati / Home", affinity: "MEDIUM", note: "Born and buried in Cincinnati. Buried at Spring Grove Cemetery. The modest origins of the Mighty Mite." },
    { location: "Hospital / St. Vincent's", affinity: "LOW", note: "Where Huggins died at 51 from blood poisoning. A boil on his face became sepsis. The game consumed him." },
    { location: "Bar / Nightclub", affinity: "LOW", note: "Not Huggins's world. He was the schoolmaster, not the nightlife. Ruth's world, not his." },
  ],

  momentum: {
    hot_triggers: [
      "Dynasty years — when all the pieces fit, Huggins's teams were historically dominant (1927-28)",
      "Player development paying off — watching Gehrig, Lazzeri, Combs emerge into stars",
      "Winning the authority battle — after the Ruth fine, the team became a machine",
      "World Series stage — 3 WS wins including two consecutive sweeps (1927, 1928)",
    ],
    cold_triggers: [
      "Being undermined by ownership (Huston) or press criticism — Huggins took it personally",
      "Player insubordination — the Ruth conflicts before 1925 were existential threats",
      "Health decline — neuritis, insomnia, and the blood poisoning that killed him",
      "Being underestimated — 'in the past Huggins has not shone as a leader of men'",
    ],
    pressure_response: "ELITE AFTER ESTABLISHING AUTHORITY. Huggins lost the 1921 and 1922 World Series to McGraw and was humiliated. But once he won the authority battle with Ruth (1925), he never lost another World Series — sweeping Pittsburgh (1927) and St. Louis (1928). In ILB: Huggins provides -1 Clutch in his first championship appearance. After that: +2 Clutch permanently. The schoolmaster learns from failure.",
  },

  action_card_seeds: [
    {
      title: "Murderers' Row",
      type: "Game Action",
      text: "Your lineup is the most fearsome in baseball history. If 4+ players in your lineup have OVR 8+, all players gain +2 Contact and +1 Power this game. Opposing pitchers have 15% chance of 'Intimidated' before first pitch.",
      origin: "The 1927 Yankees: Ruth (60 HR), Gehrig (175 RBI), Meusel, Lazzeri, Combs. They went 110-44 and swept the World Series. Many consider them the greatest team ever assembled.",
    },
    {
      title: "The $5,000 Fine",
      type: "Action",
      text: "Your manager fines your best player for insubordination. That player loses -2 to their highest stat this game. But they gain +3 Discipline permanently. If owner backs the manager (coin flip): +2 Team Fit for all players. If owner sides with the player: -3 morale for all.",
      origin: "August 29, 1925: Huggins fined Ruth $5,000 — the largest fine in baseball history — for showing up late and hungover. Ruth exploded. Ruppert backed Huggins completely. Ruth never publicly questioned his manager again.",
    },
    {
      title: "Deadball to Dynamite",
      type: "Action",
      text: "Your manager abandons his own philosophy to build around a generational talent. Choose one player — your entire team's strategy shifts to maximize that player's strengths. All players gain +1 to the stat that matches the chosen player's highest stat.",
      origin: "Huggins's natural style was deadball — speed, bunts, contact. When Ruth arrived, Huggins rebuilt the entire team around power. 'The acquisition of superstar slugger Ruth dictated a change of emphasis towards power and not giving away outs.'",
    },
    {
      title: "The Pipp-Gehrig Switch",
      type: "Trade",
      text: "Your manager benches a veteran for a young unknown. The veteran loses his roster spot. The rookie gains +2 to their highest stat permanently and begins a 'Streak' — gaining +1 to a random stat every 5 consecutive games played.",
      origin: "Huggins benched Wally Pipp and inserted Lou Gehrig at first base. Gehrig played 2,130 consecutive games — a record that stood for 56 years. Pipp never reclaimed his position.",
    },
    {
      title: "The Red Sox Pipeline",
      type: "Trade",
      text: "Your manager acquires a struggling player from a rival team. That player gains +2 to their lowest stat immediately. 'He sees what their old team couldn't.'",
      origin: "Huggins traded for Waite Hoyt and Herb Pennock — both struggled in Boston, both became Hall of Famers in New York. He identified talent that other organizations had given up on.",
    },
    {
      title: "Consumed by the Game",
      type: "Drama",
      text: "Your manager's health fails. He is removed from the game. All players weep openly. The team gains +3 morale for the next 5 games as they play for their fallen leader. 'I call him the squarest shooter I ever knew in baseball.'",
      origin: "Huggins died September 25, 1929, at age 51 from blood poisoning. The American League canceled its games. Yankees players wept openly. Gehrig: 'He was more like a father to me than anything else.' 10,000 mourners lined the streets.",
    },
  ],

  art_direction: {
    face: "Small, intense, scholarly. 5'6\" 140 lbs — the smallest Yankee manager. Sharp, intelligent eyes. A face that looks like it's solving a problem while everyone else is watching the game. Clean-shaven. Slightly drawn from chronic illness and insomnia. The face of a law professor who accidentally wandered into a dugout and turned out to be the smartest person in the building.",
    attire: "Yankees uniform, 1927 era — pinstripes. Unlike Mack's suit, Huggins wore the uniform, but it hung on his small frame. He's dwarfed by the dugout, by Yankee Stadium, by Ruth — and yet he's clearly in charge. Possibly holding a lineup card or scorebook. The image should emphasize the size contrast: the smallest man managing the biggest team.",
    mood: "Quiet mastery tinged with exhaustion. The look of a man who has figured out how to build the greatest team in baseball history and is paying for it with his health. There's triumph in the eyes and weariness in the jaw. He's not celebrating — he's calculating the next move while everyone else celebrates.",
    style: "Cool sepia with deep blue undertones — the Tactical Purist palette. Yankee Stadium's original facade suggested in the background, towering over the small figure. Border should feel precise and elegant — clean lines, geometric, institutional. Yankee pinstripe motifs. The card should feel like a blueprint for a dynasty — the architectural plans for Monument Park.",
    reference: "Where Selee's Tactical Purist card is the watch factory engineer, Huggins is the law school graduate who became a baseball architect. Both are quiet geniuses who build systems bigger than any individual. But Huggins had to manage Babe Ruth — the most ungovernable force in sports history — and he did it through sheer intellectual authority. The card should feel like David standing over Goliath — if David were a law professor with insomnia.",
  },
};

const RATING_ENGINE = { overall: { tiers: [
  { range: "3-4", label: "Filler" }, { range: "5-6", label: "Solid Skipper" },
  { range: "7-8", label: "Contender" }, { range: "9-10", label: "Elite" },
  { range: "11-12", label: "Legend" }, { range: "13", label: "Mythic" },
]}};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14",
  archBlue: "#5588cc", archDark: "#2a4a7a",
  hotRed: "#c44040", coldBlue: "#4a7a9a", traitGreen: "#5a8a5a",
  archetypes: {
    Authoritarian: "#e05555", "Players' Manager": "#55b877",
    Firebrand: "#e8a030", "Tactical Purist": "#5588cc", Opportunist: "#b070cc",
  },
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
    <span style={{ width: 32, fontSize: 10, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, textAlign: "right" }}>{label}</span>
    <div style={{ flex: 1, height: 12, background: `${C.sepia}30`, borderRadius: 2, overflow: "hidden" }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 2 }} />
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
  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: `${C.archBlue}15`, border: `1px solid ${C.archBlue}30`, color: C.archBlue, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</span>
);

export default function MillerHugginsCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("playbook");
  const d = MANAGER_DATA;
  const r = d.ilb_ratings;
  const archColor = C.archetypes[d.archetype] || C.archBlue;

  const tabs = [
    { id: "playbook", label: "Playbook" }, { id: "personality", label: "Dossier" },
    { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" },
    { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Rating Engine" },
    { id: "art", label: "Art Notes" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Manager Card — {d.ilb_team} Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${archColor}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Playbook ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, #0a1a2a 0%, #1a2a4a 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.15 }}>📋</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>TACTICAL PURIST</div>
              <div style={{ position: "absolute", bottom: 50, left: 12, background: `${C.ink}aa`, color: C.gold, padding: "3px 8px", borderRadius: 2, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.era}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 10, color: archColor, fontFamily: "'Courier Prime', monospace", marginTop: 6, letterSpacing: 3, fontWeight: 900 }}>◆ MANAGER ◆</div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 6, textTransform: "uppercase" }}>Game Management</div>
              <StatBar label="TAC" value={r.tac} max={5} color={archColor} />
              <StatBar label="PIT" value={r.pit} max={5} color={C.gold} />
              <StatBar label="LIN" value={r.lin} max={5} color={C.coldBlue} />
              <StatBar label="ADP" value={r.adp} max={5} color={C.traitGreen} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 6, textTransform: "uppercase" }}>Clubhouse Management</div>
              <ClubhouseBar label="DISCPLN" value={r.dis} color={"#e05555"} />
              <ClubhouseBar label="EGO MGT" value={r.ego} color={C.warmRed} />
              <ClubhouseBar label="HARMONY" value={r.har} color={C.traitGreen} />
              <ClubhouseBar label="INTSITY" value={r.int} color={"#e8a030"} />
              <ClubhouseBar label="STRATGY" value={r.str} color={archColor} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={"#b070cc"} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "WS WINS", val: d.record.world_series },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "HOF PLYR", val: d.record.hof_players_managed.length },
                { label: "BEST W%", val: ".714" },
                { label: "HEIGHT", val: `5'6"` },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER MANAGERIAL RECORD — {d.record.seasons_managed} SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["👑 6 Pennants", "🏆 3 World Series", "⭐ HOF 1964", "🏟️ Monument Park #1", "⚖️ Law Degree", "💪 Tamed Babe Ruth", "📊 TAC/LIN/ADP: MAX", "💔 Died at 51"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${archColor}15`, border: `1px solid ${archColor}30`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: archColor, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 900 }}>CLASSIFIED PLAYBOOK — {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>
              ))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "playbook" && (<>
                <Section title="Roster Philosophy"><p style={{ margin: 0, color: C.medBrown }}>{d.playbook.roster_philosophy}</p></Section>
                <Section title="Conflict Response"><p style={{ margin: 0 }}><span style={{ fontWeight: 900, color: archColor }}>{d.playbook.conflict_response.split(".")[0]}.</span> {d.playbook.conflict_response.split(".").slice(1).join(".")}</p></Section>
                <Section title="Clique Strategy"><p style={{ margin: 0 }}><span style={{ fontWeight: 900, color: archColor }}>{d.playbook.clique_strategy.split(".")[0]}.</span> {d.playbook.clique_strategy.split(".").slice(1).join(".")}</p></Section>
                <Section title="✅ Players Who Thrive">{d.playbook.player_types_that_thrive.map((p, i) => (<div key={i} style={{ padding: "3px 0", color: C.traitGreen, fontSize: 11 }}>▸ {p}</div>))}</Section>
                <Section title="⚠ Players Who Struggle">{d.playbook.player_types_that_struggle.map((p, i) => (<div key={i} style={{ padding: "3px 0", color: C.warmRed, fontSize: 11 }}>▸ {p}</div>))}</Section>
                <Section title="Tolerance Thresholds">{Object.entries(d.playbook.tolerance_thresholds).map(([key, val]) => (<div key={key} style={{ marginBottom: 4 }}><span style={{ fontWeight: 700, color: C.ink, fontSize: 10, textTransform: "uppercase" }}>{key.replace(/_/g, " ")}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{typeof val === "number" ? val : val}</span></div>))}</Section>
              </>)}
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("STRONGLY") ? `${C.traitGreen}20` : effect.includes("HIGH") ? `${C.traitGreen}20` : `${C.gold}20`, color: effect.includes("STRONGLY") ? C.traitGreen : effect.includes("HIGH") ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Huggins's real life, become universal cards playable in any game.</p>
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
                <Section title="🎩 Manager Rating Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Managers use a dual rating system: Game Management (1-5) and Clubhouse Management (1-10).</p>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11, marginBottom: 4 }}>Overall Tier Scale</div>
                    {RATING_ENGINE.overall.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.label}</div>))}
                  </div>
                </Section>
                <Section title="Huggins's Derivation">{Object.entries(d.rating_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB MGR #{d.ilb_team}</span>
          <span>{d.era} • {d.archetype} • OVR {r.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({
  name: d.name, nickname: d.nickname, year: d.year, era: d.era,
  ilb_team: d.ilb_team, archetype: d.archetype,
  game_mgmt: { tac: r.tac, pit: r.pit, lin: r.lin, adp: r.adp },
  clubhouse: { dis: r.dis, ego: r.ego, har: r.har, int: r.int, str: r.str, flx: r.flx },
  ovr: r.ovr,
  chemistry_traits: d.chemistry_traits.map(t => t.tag),
  preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })),
  hot_triggers: d.momentum.hot_triggers,
  cold_triggers: d.momentum.cold_triggers,
  action_seeds: d.action_card_seeds.length,
  hof_players: d.record.hof_players_managed,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
