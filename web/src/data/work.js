// Facts come from ../../reum (resume/bullet-bank.md, candidate-profile.md).
// Anything still marked TODO there (metrics, links, unconfirmed names) is left out.

// The opening: a pile of papers. The top sheet introduces me; each
// section after it takes a sheet from the pile and folds or cuts it.
export const INTRO = {
  name: "Ahreum Lee",
  title: "Computer Science & Biotech new grad, McGill University",
  now: "SWE intern, PATRY Group",
  next: "Full-time from Jan 2027",
  // Not shown for now (taken off the left column on request); kept to bring back.
  summary:
    "I studied computer science and AI at McGill, with a minor in biotechnology. During undergrad I worked on AI tools, research projects and student communities. This page is where I keep them."
};

// Journey: the four things I picked up, in the order they started. Each has
// what it taught me and what I did. The graph sits under them.
export const JOURNEY = [
  {
    id: "people",
    since: "2024",
    heading: "Coordinating people",
    lesson:
      "Before I wrote software for anyone, I spent eight months on the BIM side of a battery plant build, keeping engineering firms in step from the project office. Back at McGill I kept doing that for student groups and a hackathon team.",
    points: [
      "Project Coordinator, Techwin Plant Canada: worked with senior project managers to keep 5+ engineering firms aligned on a $1B battery plant.",
      "Co-President, AKCSE: led a multidisciplinary executive team and secured $2,000 in extra funding.",
      "VP Marketing, GDG on Campus McGill: 100K+ impressions in two months.",
      "Product manager for a team of four at McHacks 2026."
    ]
  },
  {
    id: "software",
    since: "2025",
    heading: "Building software",
    lesson:
      "I built web tools for a retrofit research group, a seismic research team and a property company, each from what the people using it asked for.",
    points: [
      "A retrofit assessment tool at Reconstruct McGill, taken as far as testing with industry stakeholders on real data, then handed to the next cohort (React, Django REST, AWS).",
      "Extensions to OpenQuake, an open-source seismic risk engine, in Python.",
      "A Property Inbox at PATRY that brings maintenance requests from email, voicemail, the call exchange and Yardi into one place, and a tracker for Landlord and Tenant Board cases. React on Vercel, PostgreSQL and auth on Azure."
    ]
  },
  {
    id: "research",
    since: "2025",
    heading: "Research",
    lesson:
      "I worked in three research labs during undergrad. They taught me to check a result against what actually happened, and to go and meet the people a system is for.",
    points: [
      "Visited a care home three times to meet the residents and caregivers an AI system was for.",
      "Collected 2,100+ news articles on Canadian healthcare reform, modelled their topics with BERTopic, and checked the trends against real events.",
      "Built geospatial data pipelines for seismic risk research, and set up the move to a government HPC cluster."
    ],
    link: { label: "More on OpenQuake", href: "#post-openquake" }
  },
  {
    id: "ai",
    since: "2025",
    heading: "Working with AI",
    lesson:
      "I worked on an AI nurse for seniors during undergrad and on AI tools at PATRY Group. Both taught me that AI is quick at a first version and needs checking on the details, including the model doing the checking.",
    points: [
      "Evaluated an AI nurse for seniors with an LLM-as-a-judge suite, and caught the judge making mistakes of its own.",
      "Built AI-powered internal tools at PATRY Group, now used by accounts receivable, property management and paralegal staff.",
      "Building a tenant maintenance bot on Claude Haiku that sorts requests, and checking it with an LLM judge against Claude Opus plus manual review of samples.",
      "Claude Certified Developer – Foundations (Anthropic, 2026), covering tool use and MCP. I prototype with Claude, Codex and Gumloop."
    ],
    link: { label: "More on ADiNA", href: "#post-adina" }
  }
];

// Resume: positions, newest first.
export const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    org: "PATRY Group",
    place: "Kingston, ON",
    when: "Sep 2026 – present",
    body:
      "I build AI-powered internal tools on Yardi data, scoped with Operations. The Property Inbox brings maintenance requests from email, voicemail, the call exchange and Yardi into one place, and a tracker does the same for Landlord and Tenant Board cases. Accounts receivable, property management and paralegal staff use both. Now I'm building a tenant maintenance bot on Claude Haiku, checked with an LLM judge against Claude Opus and manual review."
  },
  {
    role: "Research Intern (SURE)",
    org: "McGill University",
    place: "Montreal, QC",
    when: "May – Sep 2026",
    body:
      "I extended the open-source OpenQuake seismic risk engine in Python and set up our move to a government HPC cluster, where runs take about 30 hours instead of 96.",
    link: { label: "More on OpenQuake", href: "#post-openquake" }
  },
  {
    role: "Research Fellow (part-time)",
    org: "Complex Collaboration Lab, McGill",
    place: "Montreal, QC",
    when: "Aug 2025 – May 2026",
    body:
      "I collected 2,100+ news articles on Canadian healthcare reform, modelled their topics with BERTopic and checked the trends against real events. The results became the structure of the lab's next study."
  },
  {
    role: "Research Assistant",
    org: "Shared Reality Lab, McGill",
    place: "Montreal, QC",
    when: "Aug 2025 – Jan 2026",
    body:
      "I built an LLM-as-a-judge evaluation for ADiNA, an AI nurse for seniors, and visited a care home three times to meet the residents and caregivers it was for.",
    link: { label: "More on ADiNA", href: "#post-adina" }
  },
  {
    role: "Web Developer (NSERC USRA)",
    org: "Reconstruct McGill",
    place: "Montreal, QC",
    when: "May 2025 – Jan 2026",
    body:
      "On a team of two, I built a multi-criteria tool for free building-retrofit assessments, took it as far as testing with industry stakeholders on real data, then handed it to the next cohort. I also built a retrofit cost calculator (React, Django REST, AWS)."
  },
  {
    role: "Project Coordinator",
    org: "Techwin Plant Canada",
    place: "Montreal, QC",
    when: "Jan – Aug 2024",
    body:
      "Eight months in the project office with senior project managers, coordinating 5+ engineering firms on a $1B battery plant through BIM: model reviews in Autodesk Construction Cloud, piping design, value engineering and certification. The team reused my coordination notes."
  }
];

// Resume: what I did outside work and class.
export const EXTRACURRICULARS = [
  {
    role: "VP Marketing",
    org: "GDG on Campus McGill",
    when: "2025 – present",
    body: "I run campaigns for McGill's student developer community: 100K+ impressions in two months."
  },
  {
    role: "Product Manager",
    org: "McHacks 2026",
    when: "2026",
    body: "For a team of four, I defined the users, cut the scope to fit 24 hours and pitched hands-free navigation that gives directions by landmarks."
  },
  {
    role: "Student Volunteer",
    org: "ACM CHI 2025, Yokohama",
    when: "2025",
    body: "I won the student volunteer T-shirt design competition, which got me to the conference."
  },
  {
    role: "Co-President",
    org: "AKCSE",
    when: "2024 – 2025",
    body: "I co-led a multidisciplinary executive team and secured $2,000 in additional funding."
  }
];

// My room: what I do outside work. Space-diary drawings are image files in
// ../space-diary (see the README there).
export const ROOM = {
  running: "I like running outdoors.",
  baking: "I've made macarons and a croquembouche, and I'm growing my own sourdough starter.",
  spaceDiary:
    "I keep a space diary: drawings of spaces, each with the realization it gave me."
};

export const EDUCATION = {
  degree: "B.Sc. Computer Science & Artificial Intelligence, Minor in Biotechnology",
  school: "McGill University",
  when: "May 2026"
};

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
      "On a team of two, I built a multi-criteria tool for free building-retrofit assessments, tested it with industry stakeholders on real data and handed it to the next cohort. Also a retrofit cost calculator (React, Django REST, AWS)."
  },
  {
    id: "patry",
    label: "PATRY: AI tools used by 3 teams",
    short: "PATRY Group",
    kind: "work",
    x: 7.9,
    y: 5.7,
    meta: "Software Engineering Intern, PATRY Group · 2026",
    body:
      "I built a Property Inbox that gathers maintenance requests from email, voicemail, the call exchange and Yardi, and a Landlord and Tenant Board case tracker. Three teams use them. Now I'm building a tenant maintenance bot on Claude Haiku, checked against Claude Opus with an LLM judge and manual review."
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
    label: "Music stored as DNA (COMP 561)",
    short: "Music as DNA",
    kind: "project",
    x: 8.4,
    y: 6.9,
    meta: "Computational Biology course project · team of 3 · Fall 2024",
    body:
      "We encoded classical piano MIDI files as DNA and found the notes again with a hidden Markov model and Viterbi decoding. My part was the model's state diagram and probability matrices. It recovered 60% of the encoded notes."
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
    id: "spam",
    label: "Spam classifier from scratch",
    short: "Spam classifier",
    kind: "project",
    x: 6.4,
    y: 0.7,
    meta: "Applied Machine Learning coursework · Winter 2026",
    body:
      "Logistic regression with mini-batch SGD and L2 regularisation written in NumPy, tuned with 5-fold cross-validation. 86% test accuracy on Spambase from only 230 training emails."
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
    body:
      "I built a Chrome extension that filters YouTube by classifying video transcripts in real time (Naive Bayes, Flask). It was right over 80% of the time on data we labelled by hand.",
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
    meta: "Project Coordinator, Techwin Plant Canada · Jan – Aug 2024",
    body:
      "Eight months in the project office with senior project managers, coordinating 5+ engineering firms on a $1B battery plant through BIM. I tracked 3D model clashes in Autodesk Construction Cloud, and the team reused my coordination notes."
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
