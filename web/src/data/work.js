// Facts come from ../../reum (resume/bullet-bank.md, candidate-profile.md).
// Anything still marked TODO there (metrics, links, unconfirmed names) is left out.

// The opening: a pile of papers. The top sheet introduces me; each
// section after it takes a sheet from the pile and folds or cuts it.
export const INTRO = {
  kicker: "Computer Science & AI · McGill University, 2026",
  name: "Ahreum Lee",
  role: "AI Analyst Intern at PATRY Group, Kingston",
  summary:
    "I build with AI, analyse data and lead teams. I like to meet the people I'm building for, I check the work before anyone relies on it, and I build things people keep using."
};

export const SKILLS = [
  {
    id: "ai",
    numeral: "I",
    sheet: "crane",
    heading: "Working with AI",
    trait: "I check AI's work before anyone relies on it.",
    points: [
      "Built AI-powered internal tools at PATRY Group, now used by accounts receivable, property management and paralegal staff.",
      "Evaluated an AI nurse for seniors with an LLM-as-a-judge suite, and caught the judge making mistakes of its own.",
      "Claude Certified Developer – Foundations (Anthropic, 2026). I prototype with Claude, Codex and Gumloop."
    ],
    link: { label: "Read the ADiNA case", href: "#case-adina" }
  },
  {
    id: "data",
    numeral: "II",
    sheet: "earth",
    heading: "Data analysis & research",
    trait: "I go to the source before I trust a result.",
    points: [
      "Collected 2,100+ news articles on Canadian healthcare reform, modelled their topics with BERTopic, and checked the trends against real events.",
      "Built geospatial data pipelines for seismic risk research, and set up the move to a government HPC cluster.",
      "Visited a care home three times to meet the residents and caregivers an AI system was for."
    ],
    link: { label: "Read the OpenQuake spotlight", href: "#case-openquake" }
  },
  {
    id: "software",
    numeral: "III",
    sheet: "house",
    heading: "Building software",
    trait: "I build things people keep using.",
    points: [
      "A Property Inbox and Landlord and Tenant Board tracker at PATRY: React on Vercel, PostgreSQL and auth on Azure, on Yardi data.",
      "A retrofit assessment tool at Reconstruct McGill that the team kept extending (React, Django REST, AWS).",
      "Extensions to OpenQuake, an open-source seismic risk engine, in Python."
    ],
    link: { label: "See everything on the graph", href: "#range" }
  },
  {
    id: "leadership",
    numeral: "IV",
    sheet: "dolls",
    heading: "Leadership",
    trait: "I find a way in, then bring people with me.",
    points: [
      "VP Marketing, GDG on Campus McGill: 100K+ impressions in two months.",
      "Co-President, AKCSE: led a multidisciplinary executive team and secured $2,000 in extra funding.",
      "Product manager for a team of four at McHacks 2026.",
      "Won the ACM CHI 2025 volunteer T-shirt competition, which got me to the conference in Yokohama."
    ],
    link: { label: "See everything on the graph", href: "#range" }
  }
];

// The two projects opened up in full, in the middle of the page.
export const CASES = [
  {
    id: "adina",
    numeral: "I",
    name: "ADiNA",
    subtitle: "An AI digital nurse for seniors with mild cognitive impairment",
    meta: [
      ["Role", "Research Assistant"],
      ["Where", "Shared Reality Lab, McGill"],
      ["When", "Aug 2025 – Jan 2026"],
      ["Tools", "OpenAI Realtime API, RAG on Weaviate, DeepEval, GPT-4o-mini"]
    ],
    sections: [
      {
        heading: "The question",
        body:
          "ADiNA is a voice agent meant to talk with seniors in long-term care. Before it reached anyone, we needed a way to tell whether one version spoke to them better than another."
      },
      {
        heading: "What I built",
        body:
          "A synthetic resident that behaves the way memory loss can: word-finding pauses, repeated questions, sudden shifts in mood. Around it, an LLM-as-a-judge evaluation with five custom metrics (validation, engagement, retrieval relevance, trigger avoidance and memory consistency), run across five care scenarios, four agent versions and 65 interactions."
      },
      {
        heading: "What I found",
        body:
          "The most factual version was the least engaging when a resident was distressed, yet the best in a medical emergency. A single line telling the agent who its users were did as well as a full Validation Therapy prompt. The judge needed checking too: it penalised the agent for avoiding a topic that never came up."
      },
      {
        heading: "What changed it",
        body:
          "Three visits to a care home, to meet caregivers and residents. Residents were uneasy when an assistant knew things they didn't remember telling it, so I proposed keeping conversation and clinical records in separate memories."
      }
    ],
    quote: "The agent didn't need to be taught empathy. It needed to know when to use it.",
    reflection: {
      lead: "Pills, not vitamins.",
      credit: "A line I took from Ivan Zhao.",
      body:
        "Most of the development effort went into adding features, cutting latency and supporting more languages. What helped me was narrowing to the one thing the agent had to do well, the conversation itself, and scoping from there what would help."
    },
    plates: [
      { src: "/images/adina/overview.jpg", caption: "System overview" },
      { src: "/images/adina/detail.jpg", caption: "Evaluation detail" }
    ]
  },
  {
    id: "openquake",
    numeral: "II",
    size: "spotlight",
    name: "OpenQuake",
    subtitle: "Seismic risk calculations at scale",
    meta: [
      ["Role", "Research Intern (SURE)"],
      ["Where", "McGill University"],
      ["When", "May – Sep 2026"],
      ["Tools", "Python, OpenQuake engine, SLURM, geospatial data"]
    ],
    sections: [
      {
        heading: "The work",
        body:
          "I extended the open-source OpenQuake engine in Python for classical seismic risk calculations and built reproducible pipelines for building, population and Vs30 data. I also set up the move from engineering-department computers to a government HPC cluster (SLURM), where a representative calculation runs in about 30 hours instead of 96. The poster won the Best SURE Poster Award (General Category)."
      }
    ],
    reflection: {
      lead: "Inside a researcher's head.",
      body:
        "In earlier labs I assisted with work I already knew. Here I worked closely with my supervisors, analysing the outputs together and brainstorming solutions. It was a chance to see how a researcher thinks through a problem."
    },
    links: [{ label: "Code on GitHub", href: "https://github.com/alee020304/oq-engine" }],
    plates: [{ src: "/images/openquake/poster.jpg", caption: "The SURE poster" }]
  }
];

// The range graph. x = how technical (0–10), y = how creative (0–10).
// The positions are judgement calls: move them freely.
export const KINDS = [
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "project", label: "Projects & courses" },
  { id: "community", label: "Community" }
];

export const RANGE = [
  {
    id: "openquake",
    label: "OpenQuake: seismic risk engine",
    short: "OpenQuake",
    kind: "research",
    x: 9.2,
    y: 2.6,
    meta: "SURE Research Intern, McGill · 2026",
    body:
      "I extended the open-source OpenQuake engine in Python, and set up our move from engineering computers to a government HPC cluster, where runs take about 30 hours instead of 96. The poster won Best SURE Poster.",
    caseId: "openquake"
  },
  {
    id: "reconstruct",
    label: "Reconstruct: retrofit assessment tool",
    short: "Reconstruct",
    kind: "work",
    x: 7.7,
    y: 3.9,
    meta: "Web Developer, NSERC USRA · 2025–26",
    body:
      "I built a multi-criteria tool for free building-retrofit assessments that the team kept extending, and a retrofit cost calculator (React, Django REST, AWS)."
  },
  {
    id: "patry",
    label: "PATRY: AI tools used by 3 teams",
    short: "PATRY Group",
    kind: "work",
    x: 7.9,
    y: 5.7,
    meta: "AI Analyst Intern, PATRY Group · 2026",
    body:
      "I built a Property Inbox and Landlord and Tenant Board tracker that accounts receivable, property management and paralegal staff use. Now I'm building a tenant maintenance bot. React on Vercel, PostgreSQL and auth on Azure."
  },
  {
    id: "adina",
    label: "ADiNA: evaluating an AI nurse",
    short: "ADiNA",
    kind: "research",
    x: 6.7,
    y: 7.5,
    meta: "Research Assistant, Shared Reality Lab · 2025–26",
    body:
      "I built an LLM-as-a-judge evaluation for an AI nurse for seniors, then visited a care home three times. What residents told me changed how its memory was designed.",
    caseId: "adina"
  },
  {
    id: "dna",
    label: "DNA data storage (COMP 561)",
    short: "DNA storage",
    kind: "project",
    x: 8.4,
    y: 6.9,
    meta: "Computational Biology course project",
    body: "I encoded digital data as DNA sequences and measured the error rates of encoding and decoding."
  },
  {
    id: "complex-collaboration",
    label: "Healthcare reform: 2,100+ articles",
    short: "Reform study",
    kind: "research",
    x: 6.0,
    y: 4.6,
    meta: "Research Fellow, Complex Collaboration Lab · 2025–26",
    body:
      "I scraped 2,100+ news articles, found their topics with BERTopic, and checked the trends against history for a supervisor sceptical of AI. The results became the structure of the lab's next study."
  },
  {
    id: "sentiment",
    label: "Headline sentiment: 5 models",
    short: "Sentiment",
    kind: "project",
    x: 6.2,
    y: 1.5,
    meta: "Natural Language Processing course project",
    body: "I compared Naive Bayes, SVM, random forest, MLP and BERT on news headline sentiment. BERT did best."
  },
  {
    id: "building",
    label: "Address → building energy",
    short: "Building tool",
    kind: "project",
    x: 5.2,
    y: 6.3,
    meta: "Side project · 2025",
    body:
      "I built a tool that turns an address into building dimensions and energy estimates (U-value, heat loss) from Google Maps and OpenStreetMap data.",
    href: "https://github.com/alee020304/vibe-coding"
  },
  {
    id: "edblock",
    label: "ED Block: YouTube filter",
    short: "ED Block",
    kind: "project",
    x: 4.5,
    y: 3.2,
    meta: "Chrome extension · 2023",
    body: "I built a Chrome extension that filters YouTube by classifying video transcripts in real time (Naive Bayes, Flask).",
    href: "https://github.com/TaewonHwang02/Akcse_project2024"
  },
  {
    id: "nauly",
    label: "Nauly: PM at McHacks 2026",
    short: "Nauly",
    kind: "project",
    x: 3.6,
    y: 7.7,
    meta: "Product Manager · McHacks 2026",
    body:
      "As PM for a team of four, I defined the users, cut the scope to fit 24 hours and pitched hands-free navigation that gives directions by landmarks."
  },
  {
    id: "techwin",
    label: "Techwin: BIM coordination",
    short: "Techwin",
    kind: "work",
    x: 2.8,
    y: 2.1,
    meta: "Project Coordinator, Techwin Plant Canada · 2024",
    body: "I tracked 3D model clashes between engineering firms on a battery plant project. The team reused my coordination notes."
  },
  {
    id: "akcse",
    label: "AKCSE Co-President",
    short: "AKCSE",
    kind: "community",
    x: 1.6,
    y: 4.7,
    meta: "Association of Korean-Canadian Scientists & Engineers · 2024–25",
    body: "I co-led a multidisciplinary executive team and secured $2,000 in additional funding."
  },
  {
    id: "gdg",
    label: "GDG: 100K+ impressions",
    short: "GDG",
    kind: "community",
    x: 2.1,
    y: 6.9,
    meta: "VP Marketing, GDG on Campus McGill · 2025–",
    body: "I ran campaigns for McGill's student developer community: 100K+ impressions in two months."
  },
  {
    id: "chi",
    label: "CHI 2025 in Yokohama",
    short: "CHI 2025",
    kind: "community",
    x: 1.1,
    y: 9.0,
    meta: "ACM CHI 2025 · Student Volunteer",
    body:
      "I found my own way to a global conference: I won the student volunteer T-shirt design competition and volunteered at CHI."
  }
];

export const AWARDS = [
  { title: "Best SURE Poster Award, General Category", issuer: "McGill SURE", year: "2026" },
  { title: "Claude Certified Developer – Foundations", issuer: "Anthropic", year: "2026" },
  { title: "NSERC Undergraduate Student Research Award", issuer: "NSERC", year: "2025" },
  { title: "Best Young Generation Chapter Award", issuer: "CKC 2025", year: "2025" },
  { title: "Best Volunteer Award", issuer: "CKC 2025", year: "2025" },
  { title: "Volunteer T-Shirt Design Winner", issuer: "ACM CHI 2025", year: "2025" },
  { title: "2nd Place & Best UI", issuer: "WinterHacks", year: "2024" }
];

export const CONTACT = {
  email: "ahreuml0304@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ahreum-lee-1190a7215/" },
    { label: "GitHub", href: "https://github.com/alee020304" }
  ]
};
