// p5.js interactive service network.
const serviceNodes = [
  { label: "Library", x: .20, y: .30, color: "#e4ad35", targetTitle: "Library & Research", description: "Library services connect students to books, e-resources, research help and study spaces." },
  { label: "e-Learning", x: .50, y: .22, color: "#e4ad35", targetTitle: "e-Learning & Student Portals", description: "Digital learning connects students with online learning and student portal entry points." },
  { label: "Health", x: .18, y: .70, color: "#6fc8b5", targetTitle: "Health Services", description: "Health services provide primary care, health information, counselling and referral guidance." },
  { label: "Student life", x: .50, y: .72, color: "#6fc8b5", targetTitle: "Student Affairs & Campus Life", description: "Student affairs resources help students discover campus-life notices and student representation documents." },
  { label: "Admissions", x: .80, y: .28, color: "#d88770", targetTitle: "Admissions & Applications", description: "Admissions information covers programme discovery, application routes and supporting documents." },
  { label: "Fees", x: .82, y: .70, color: "#d88770", targetTitle: "Bursar & Student Fees", description: "Bursar and fees pages provide official fee schedules and payment guidance." }
];

let selectedNode = -1;
let networkCanvas;

function setup() {
  const host = document.getElementById("p5-canvas");
  if (!host || typeof createCanvas !== "function") return;
  networkCanvas = createCanvas(host.clientWidth || 760, 260);
  networkCanvas.parent("p5-canvas");
  textFont("DM Sans, Arial, sans-serif");
  textAlign(CENTER, CENTER);
  describe("Interactive diagram of six connected student service categories. Click or tap a circle to jump to its service card.");
}

function draw() {
  background("#112b35");
  const pts = serviceNodes.map(n => ({ ...n, px: n.x * width, py: n.y * height }));
  stroke("#3e686b"); 
  strokeWeight(1.5);
  
  const edges = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 3], [2, 3], [3, 5], [4, 5], [1, 5]];
  edges.forEach(([a, b]) => line(pts[a].px, pts[a].py, pts[b].px, pts[b].py));
  
  pts.forEach((p, i) => {
    const r = i === selectedNode ? 57 : 48;
    noStroke(); 
    fill(p.color); 
    circle(p.px, p.py, r);
    
    if (i === selectedNode) { 
      noFill(); 
      stroke("#ffffff"); 
      strokeWeight(2); 
      circle(p.px, p.py, r + 7); 
    }
    
    noStroke(); 
    fill("#102f37"); 
    textStyle(BOLD); 
    textSize(11); 
    text(p.label, p.px, p.py);
  });
  
  noStroke(); 
  fill("#b8cece"); 
  textStyle(NORMAL); 
  textSize(10); 
  text("SELECT A NODE TO NAVIGATE", width / 2, height - 16);
}

function mousePressed() {
  serviceNodes.forEach((node, i) => {
    const px = node.x * width, py = node.y * height;
    if (dist(mouseX, mouseY, px, py) < 34) {
      selectedNode = i;
      
      // Update canvas status message
      const status = document.getElementById("networkStatus");
      if (status) status.textContent = node.description;

      // Scroll smoothly to the matching service card in the grid
      const cards = [...document.querySelectorAll(".service-card")];
      const targetCard = cards.find(card => {
        const h3 = card.querySelector("h3");
        return h3 && h3.textContent.trim() === node.targetTitle;
      });

      if (targetCard) {
        targetCard.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "center"
        });

        // Add a brief glow effect to highlight the card
        targetCard.style.outline = "3px solid var(--gold)";
        setTimeout(() => {
          targetCard.style.outline = "";
        }, 1500);
      }
    }
  });
}

function touchStarted() { 
  mousePressed(); 
  return false; 
}

function windowResized() {
  const host = document.getElementById("p5-canvas");
  if (host && networkCanvas) resizeCanvas(host.clientWidth || 760, 260);
}