// All facts sourced from ../../reum/resume/versions/base/AhreumLee_Base.tex
// and ../../reum/resume/bullet-bank.md. Lines marked TODO in those sources
// (metrics, links, names not yet confirmed) are intentionally omitted here.

export const WORK = [
  {
    id: "openquake",
    name: "OpenQuake",
    type: "experience",
    org: "SURE · McGill University",
    dates: "May 2026 – Sep 2026",
    tags: ["SWE", "Python", "Data", "HPC", "Research", "GIS"],
    pos: [-3.2, 0, 1.4],
    desc: "Cut end-to-end runtime of large-scale seismic risk calculations from about 96 to 30 hours on HPC with SLURM. Extended the open-source OpenQuake engine in Python for classical seismic risk calculations.",
    links: [{ label: "GitHub", href: "https://github.com/alee020304/oq-engine" }],
    caseStudy: {
      gallery: [
        { caption: "Project overview", src: "/images/openquake/overview.jpg" },
        { caption: "Data or map", src: "/images/openquake/data-map.jpg" },
        { caption: "Research material", src: "/images/openquake/poster.jpg" }
      ],
      notes: [
        {
          title: "Extending OpenQuake",
          body: "Implemented Python functionality for classical seismic risk calculations and integrated damage exceedance outputs into the existing workflow."
        },
        {
          title: "Working with large datasets",
          body: "Built reproducible workflows for geospatial data, including building records, population data, and Vs30 raster data."
        },
        {
          title: "Running calculations on HPC",
          body: "Configured calculations on SLURM-based infrastructure, cutting one representative calculation from about 96 to 30 hours."
        }
      ]
    }
  },
  {
    id: "adina",
    name: "ADiNA",
    type: "experience",
    org: "Shared Reality Lab, McGill University",
    dates: "Aug 2025 – Jan 2026",
    tags: ["AI", "ML", "HCI", "Voice", "Research"],
    pos: [-0.6, 0, -1.8],
    desc: "Built a DeepEval LLM-as-a-judge suite for a RAG voice agent (OpenAI Realtime, Weaviate): 4 versions, 65 interactions. Found the most factual agent least engaging with distressed residents; 3 care-home visits shaped a split-memory design.",
    links: [],
    caseStudy: {
      gallery: [
        { caption: "Project overview", src: "/images/adina/overview.jpg" },
        { caption: "System or interface", src: "/images/adina/interface.jpg" },
        { caption: "Prototype detail", src: "/images/adina/detail.jpg" }
      ],
      notes: [
        {
          title: "Making the interaction feel natural",
          body: "Worked on a multimodal prototype using the OpenAI Realtime API, with voice interaction and retrieval working together in the same experience."
        },
        {
          title: "Testing what the system knows",
          body: "Developed an LLM-as-a-judge evaluation suite with DeepEval: 4 agent versions, 65 interactions, across custom metrics for validation, engagement, RAG relevance, trigger avoidance, and memory consistency."
        },
        {
          title: "What the evaluation found",
          body: "The most factual agent was least engaging with distressed residents. Three care-home visits with caregivers and residents shaped a split-memory design that separates conversational and clinical memory."
        }
      ]
    }
  },
  {
    id: "patry",
    name: "PATRY Group",
    type: "experience",
    org: "AI Analyst Intern · Kingston, ON",
    dates: "Sep 2026 – Dec 2026",
    tags: ["SWE", "AI", "Product"],
    pos: [2.6, 0, 2.2],
    desc: "Built a Property Inbox + Landlord and Tenant Board tracker on Yardi data for AR, property management, and paralegal staff. Building a tenant-facing maintenance bot so tenants across all properties get help faster.",
    links: []
  },
  {
    id: "complex-collaboration",
    name: "Complex Collaboration Lab",
    type: "experience",
    org: "Research Fellow · McGill, Integrated Management Student Fellowship",
    dates: "Aug 2025 – May 2026",
    tags: ["ML", "NLP", "Data", "Research"],
    pos: [0.4, 0, 2.8],
    desc: "Built Python pipelines (Selenium, Pandas) collecting 2,100+ healthcare reform articles; modelled topics with BERTopic. Validated trends against historical events for a supervisor skeptical of AI; findings structured a follow-on study.",
    links: []
  },
  {
    id: "reconstruct",
    name: "Reconstruct",
    type: "experience",
    org: "Web Developer · Reconstruct McGill, NSERC USRA",
    dates: "May 2025 – Jan 2026",
    tags: ["SWE", "Web", "AWS", "HCI", "UX"],
    pos: [3.6, 0, -0.6],
    desc: "Built an MCDA tool for free retrofit assessments (10 priority categories, multi-level criteria); the team kept extending it. Built a cost calculator comparing retrofits with standard renovations, as one of two developers (React, Django REST, AWS).",
    links: []
  },
  {
    id: "nauly",
    name: "Nauly",
    type: "project",
    org: "Product Manager · McHacks 2026 · Gumloop",
    dates: "Jan 2026",
    tags: ["AI", "HCI", "Product", "GIS"],
    pos: [-2.4, 0, -3.4],
    desc: "Defined users (newcomers, non-drivers) for hands-free, landmark-based navigation; scoped it for a team of 4 in 24 hours. Drew the system diagram and presented to judges; first build with Gumloop.",
    links: [{ label: "Devpost", href: "https://devpost.com/software/civi" }]
  },
  {
    id: "building-characteristics-generator",
    name: "Building Characteristics Generator",
    type: "project",
    org: "Google Maps APIs, OpenStreetMap",
    dates: "2025",
    tags: ["SWE", "Data"],
    pos: [1.8, 0, -2.6],
    desc: "Data-challenge experiment: turns an address into building dimensions and energy metrics (U-value, heat loss), with charts.",
    links: [{ label: "GitHub", href: "https://github.com/alee020304/vibe-coding" }]
  },
  {
    id: "edblock",
    name: "ED Block",
    type: "project",
    org: "Chrome extension · NLP",
    dates: "Nov 2023",
    tags: ["ML", "NLP", "Web", "Chrome"],
    pos: [-4.2, 0, -1.2],
    desc: "Real-time transcript classification with Naive Bayes and Logistic Regression, filtering YouTube content.",
    links: [{ label: "GitHub", href: "https://github.com/TaewonHwang02/Akcse_project2024" }]
  },
  {
    id: "gdg",
    name: "GDG on Campus McGill",
    type: "community",
    org: "VP Marketing",
    dates: "Aug 2025 – Present",
    tags: ["Community", "Leadership", "Technology"],
    pos: [4.4, 0, 1.4],
    desc: "Led growth and communications for a developer community, generating 100K+ impressions in two months.",
    links: []
  },
  {
    id: "akcse",
    name: "AKCSE",
    type: "community",
    org: "Co-President (2024–2025)",
    dates: "Dec 2022 – Jun 2025",
    tags: ["Community", "Leadership"],
    pos: [-1.6, 0, 4.2],
    desc: "Led a multidisciplinary executive team at the Association of Korean-Canadian Scientists & Engineers and secured $2,000 in additional funding.",
    links: []
  },
  {
    id: "chi",
    name: "CHI 2025",
    type: "community",
    org: "Student Volunteer",
    dates: "2025",
    tags: ["HCI", "Design", "Community"],
    pos: [3.0, 0, -3.8],
    desc: "ACM CHI 2025 student volunteer, selected after winning the volunteer T-shirt design competition.",
    links: []
  }
];

export const EDGES = [
  ["openquake", "complex-collaboration"],
  ["openquake", "reconstruct"],
  ["adina", "reconstruct"],
  ["adina", "complex-collaboration"],
  ["adina", "chi"],
  ["patry", "reconstruct"],
  ["patry", "nauly"],
  ["reconstruct", "building-characteristics-generator"],
  ["complex-collaboration", "edblock"],
  ["nauly", "building-characteristics-generator"],
  ["edblock", "building-characteristics-generator"],
  ["gdg", "chi"],
  ["gdg", "akcse"]
];

export const TAG_ORDER = [
  "SWE", "AI", "ML", "HCI", "Data", "NLP", "Web", "Research", "HPC", "GIS",
  "UX", "Product", "Voice", "Chrome", "AWS", "Python", "Leadership",
  "Community", "Design", "Technology"
];

export const VIEWS = {
  "software-engineering": ["SWE", "Python", "Web", "Data", "AI"],
  "machine-learning": ["ML", "NLP", "AI", "Data", "Research"],
  "hci": ["HCI", "UX", "Design", "AI", "Research"],
  "product": ["Product", "HCI", "AI", "Leadership"]
};

export const AWARDS = [
  { title: "Best SURE Poster Award – General Category", issuer: "McGill SURE", year: "2026" },
  { title: "NSERC USRA", issuer: "NSERC", year: "2025" },
  { title: "Best Young Generation Chapter Award", issuer: "CKC 2025", year: "2025" },
  { title: "Best Volunteer Award", issuer: "CKC 2025", year: "2025" },
  { title: "Volunteer T-Shirt Design Winner", issuer: "ACM CHI 2025", year: "2025" },
  { title: "2nd Place & Best UI", issuer: "WinterHacks 2024", year: "2024" }
];

export const CERTIFICATIONS = [
  { title: "Claude Certified Developer – Foundations (CCDV-F)", issuer: "Anthropic", year: "2026" }
];
