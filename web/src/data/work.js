// Facts come from ../../reum (resume/bullet-bank.md, candidate-profile.md).
// Anything still marked TODO there (metrics, links, unconfirmed names) is left out.

// The opening sequence: one project per paper technique.
export const FORMS = [
  {
    id: "folded",
    numeral: "I",
    technique: "Folded",
    caseId: "adina",
    title: "An AI nurse, tested before it met anyone.",
    body:
      "For an AI voice companion for seniors with memory loss, I built a simulated resident and an LLM judge to test it. Then I went to a care home three times to meet the people it was for.",
    caption: "ADiNA · Shared Reality Lab, McGill · 2025–26",
    note: "The crane is a long-life symbol in East Asian paper folding."
  },
  {
    id: "collage",
    numeral: "II",
    technique: "Collage",
    rangeId: "complex-collaboration",
    title: "Two thousand articles, cut into patterns.",
    body:
      "For a study of Canadian healthcare reform, I gathered 2,100+ news articles and let a topic model sort them. My supervisor was sceptical of AI, so before anyone relied on the patterns, I checked them against what actually happened.",
    caption: "Complex Collaboration Lab, McGill · Research Fellow · 2025–26"
  },
  {
    id: "cut",
    numeral: "III",
    technique: "Cut",
    caseId: "openquake",
    title: "Four days, cut to thirty hours.",
    body:
      "I extended OpenQuake, an open-source seismic risk engine, and moved its largest calculations onto a computing cluster. A run that took about ninety-six hours now finishes in thirty.",
    caption: "OpenQuake · SURE, McGill · 2026"
  },
  {
    id: "woven",
    numeral: "IV",
    technique: "Woven",
    rangeId: "patry",
    title: "One tool, woven through three teams.",
    body:
      "At PATRY Group I built a Property Inbox and Landlord and Tenant Board tracker on the company's Yardi data. Accounts receivable, property management and paralegal staff all work in it. Now I'm building a maintenance bot for tenants across every property.",
    caption: "PATRY Group · AI Analyst Intern · 2026 · React, Azure, Vercel"
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
    plates: [
      { src: "/images/adina/overview.jpg", caption: "System overview" },
      { src: "/images/adina/detail.jpg", caption: "Evaluation detail" }
    ]
  },
  {
    id: "openquake",
    numeral: "II",
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
        heading: "The question",
        body:
          "Classical seismic risk calculations over a large region took about four days to run, and the engine lacked parts of the workflow the research needed."
      },
      {
        heading: "What I built",
        body:
          "Python functionality in the open-source OpenQuake engine for classical seismic risk calculations, with damage-exceedance outputs fed into the existing workflow. Reproducible pipelines for the inputs: building records, population data and Vs30 rasters."
      },
      {
        heading: "What I found",
        body:
          "Configured for a SLURM computing cluster, a representative calculation went from about ninety-six hours to thirty."
      },
      {
        heading: "Recognition",
        body: "The poster won the Best SURE Poster Award (General Category), 2026."
      }
    ],
    figure: { from: "96 h", to: "30 h" },
    links: [{ label: "Code on GitHub", href: "https://github.com/alee020304/oq-engine" }],
    plates: [
      { src: "/images/openquake/data-map.jpg", caption: "Hazard or exposure map" },
      { src: "/images/openquake/poster.jpg", caption: "The SURE poster" }
    ]
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
    label: "OpenQuake: 96 h → 30 h",
    short: "OpenQuake",
    kind: "research",
    x: 9.2,
    y: 2.6,
    meta: "SURE Research Intern, McGill · 2026",
    body:
      "I cut large seismic risk calculations from about 96 hours to 30 on a computing cluster, and extended the open-source OpenQuake engine in Python. The poster won Best SURE Poster.",
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
