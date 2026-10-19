const WORK = [
  {
    id: "openquake",
    name: "OpenQuake",
    type: "experience",
    tags: ["SWE", "Python", "Data", "HPC", "Research", "GIS"],
    x: 25,
    y: 35,
    desc: "Open-source seismic risk engine development, geospatial pipelines, and HPC workflows."
  },
  {
    id: "adina",
    name: "ADiNA",
    type: "experience",
    tags: ["AI", "ML", "HCI", "Voice", "Research"],
    x: 55,
    y: 22,
    desc: "Multimodal conversational AI research using realtime voice, RAG, and evaluation."
  },
  {
    id: "reconstruct",
    name: "Reconstruct",
    type: "experience",
    tags: ["SWE", "Web", "AWS", "HCI", "UX"],
    x: 72,
    y: 45,
    desc: "Full-stack research applications with React, Django REST, and AWS."
  },
  {
    id: "imsf",
    name: "IMSF",
    type: "experience",
    tags: ["ML", "NLP", "Data", "Research"],
    x: 42,
    y: 62,
    desc: "Python data pipelines and NLP analysis across 2,100+ healthcare articles."
  },
  {
    id: "edblock",
    name: "ED Block",
    type: "project",
    tags: ["ML", "NLP", "Web", "Chrome"],
    x: 18,
    y: 72,
    desc: "Real-time transcript classification with Naive Bayes and Logistic Regression."
  },
  {
    id: "future",
    name: "New project",
    type: "project",
    tags: ["AI", "HCI", "Product", "GIS"],
    x: 76,
    y: 78,
    desc: "A space reserved for the next project."
  },
  {
    id: "gdg",
    name: "GDG McGill",
    type: "community",
    tags: ["Community", "Leadership", "Technology"],
    x: 50,
    y: 88,
    desc: "Developer community leadership, events, and communications."
  },
  {
    id: "chi",
    name: "CHI 2025",
    type: "community",
    tags: ["HCI", "Design", "Community"],
    x: 87,
    y: 18,
    desc: "CHI student volunteer; selected after winning the volunteer T-shirt competition."
  }
];

const EDGES = [
  ["openquake", "imsf"],
  ["openquake", "reconstruct"],
  ["openquake", "future"],
  ["adina", "reconstruct"],
  ["adina", "imsf"],
  ["adina", "chi"],
  ["reconstruct", "future"],
  ["imsf", "edblock"],
  ["edblock", "future"],
  ["gdg", "chi"],
  ["gdg", "future"]
];

const tagOrder = ["SWE","AI","ML","HCI","Data","NLP","Web","Research","HPC","GIS","UX","Product","Voice","Chrome","AWS","Python","Leadership","Community","Design","Technology"];

const svg = document.getElementById("map");
const filters = document.getElementById("filters");
const viewLabel = document.getElementById("viewLabel");
const tooltip = document.getElementById("tooltip");

const params = new URLSearchParams(location.search);
let activeTags = new Set((params.get("tags") || "").split(",").filter(Boolean));
const view = params.get("view");

const views = {
  "software-engineering": ["SWE", "Python", "Web", "Data", "AI"],
  "machine-learning": ["ML", "NLP", "AI", "Data", "Research"],
  "hci": ["HCI", "UX", "Design", "AI", "Research"],
  "product": ["Product", "HCI", "AI", "Leadership"]
};

if (view && views[view]) activeTags = new Set(views[view]);

function renderFilters() {
  filters.innerHTML = "";
  tagOrder.forEach(tag => {
    const b = document.createElement("button");
    b.className = "filter" + (activeTags.has(tag) ? " active" : "");
    b.textContent = tag;
    b.onclick = () => {
      if (activeTags.has(tag)) {
        activeTags.delete(tag);
      } else {
        activeTags.add(tag);
      }
      syncUrl();
      render();
    };
    filters.appendChild(b);
  });
}

function syncUrl() {
  const next = new URLSearchParams();
  if (activeTags.size) next.set("tags", [...activeTags].join(","));
  history.replaceState({}, "", `${location.pathname}${next.toString() ? "?" + next : ""}`);
}

function render() {
  renderFilters();
  svg.innerHTML = "";
  const ns = "http://www.w3.org/2000/svg";
  const width = 1000;
  const height = 620;

  EDGES.forEach(([a,b]) => {
    const A = WORK.find(n => n.id === a);
    const B = WORK.find(n => n.id === b);
    const line = document.createElementNS(ns, "line");
    line.setAttribute("x1", A.x * 10);
    line.setAttribute("y1", A.y * 6.2);
    line.setAttribute("x2", B.x * 10);
    line.setAttribute("y2", B.y * 6.2);
    line.setAttribute("class", "edge");
    svg.appendChild(line);
  });

  WORK.forEach(item => {
    const match = !activeTags.size || item.tags.some(t => activeTags.has(t));
    const g = document.createElementNS(ns,"g");
    g.setAttribute("class", "node " + (match ? "match" : "dim"));
    g.setAttribute("transform", `translate(${item.x * 10},${item.y * 6.2})`);
    const circle = document.createElementNS(ns, "circle");
    circle.setAttribute("r", match ? 8 : 6);
    circle.setAttribute(
      "fill",
      item.type === "experience" ? "#151515" : item.type === "community" ? "#8c8c84" : "#5c4bdb"
    );
    const text = document.createElementNS(ns, "text");
    text.setAttribute("x", "13");
    text.setAttribute("y", "4");
    text.textContent = item.name;
    g.appendChild(circle);
    g.appendChild(text);
    g.addEventListener("mouseenter", e => {
      tooltip.hidden = false;
      tooltip.innerHTML = `<strong>${item.name}</strong>${item.desc}<br><br>${item.tags.map(t => "#" + t).join(" ")}`;
      tooltip.style.left = `${Math.min(e.offsetX + 18, svg.clientWidth - 260)}px`;
      tooltip.style.top = `${Math.min(e.offsetY + 18, svg.clientHeight - 150)}px`;
    });
    g.addEventListener("mouseleave", () => (tooltip.hidden = true));
    g.addEventListener("click", () => {
      if (item.id === "openquake") location.href = "./projects/openquake.html";
      if (item.id === "adina") location.href = "./projects/adina.html";
    });
    svg.appendChild(g);
  });

  viewLabel.textContent = activeTags.size
    ? `Showing work connected to: ${[...activeTags].join(" · ")}`
    : "Showing all work";
}

document.getElementById("shareView").onclick = async () => {
  syncUrl();
  try {
    await navigator.clipboard.writeText(location.href);
    document.getElementById("shareView").textContent = "Link copied!";
    setTimeout(() => (document.getElementById("shareView").textContent = "Share this view"), 1500);
  } catch {
    prompt("Copy this link:", location.href);
  }
};

render();
