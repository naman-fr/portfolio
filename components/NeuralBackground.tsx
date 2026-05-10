"use client";

import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────────────────────────────────

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  pulsePhase: number;
  pulseSpeed: number;
  cluster: number;
  type: "hub" | "relay" | "standard";
  depth: number; // 0 = background, 1 = foreground
  signalStrength: number;
}

interface DataPacket {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  colorKey: ColorKey;
  size: number;
  trail: Array<{ x: number; y: number }>;
}

interface BinaryDrop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number;
  length: number;
}

interface PulseRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  colorKey: ColorKey;
}

interface CircuitTrace {
  points: Array<{ x: number; y: number }>;
  progress: number;
  speed: number;
  opacity: number;
  colorKey: ColorKey;
  lineWidth: number;
  totalLen: number;
  segLens: number[];
}

interface HexCell {
  cx: number;
  cy: number;
  pulse: number;
  pulseSpeed: number;
  active: boolean;
  colorKey: ColorKey;
}

interface FloatingWord {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  fontSize: number;
  colorKey: ColorKey;
  life: number;
  maxLife: number;
}

interface GlitchBar {
  y: number;
  h: number;
  opacity: number;
  life: number;
}

type ColorKey = "primary" | "secondary" | "accent" | "purple";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const RGBA: Record<ColorKey, (a: number) => string> = {
  primary: (a) => `rgba(0,255,136,${a})`,
  secondary: (a) => `rgba(0,200,255,${a})`,
  accent: (a) => `rgba(255,107,53,${a})`,
  purple: (a) => `rgba(168,85,247,${a})`,
};

const ALL_KEYS: ColorKey[] = ["primary", "secondary", "accent", "purple"];

const TECH_WORDS = [
  "O(log n)", "O(n²)", "BFS", "DFS", "Dijkstra", "A*", "Kruskal",
  "AVL Tree", "B-Tree", "Red-Black", "Trie", "Segment Tree", "Fenwick",
  "malloc()", "free()", "nullptr", "#include", "sizeof()", "template<T>",
  "async/await", "Promise", "useEffect", "useState", "Redux", "GraphQL",
  "REST API", "gRPC", "WebSocket", "OAuth 2.0", "JWT", "HTTPS",
  "git push", "docker run", "kubectl", "terraform", "CI/CD", "nginx",
  "TCP/IP", "UDP", "HTTP/3", "DNS", "BGP", "TLS 1.3",
  "CNN", "LSTM", "Transformer", "backprop", "∇Loss", "softmax",
  "mutex", "semaphore", "deadlock", "ACID", "CAP", "CRDT",
  "0x4A2F", "0b10110", "0xFF", "NaN", "Inf", "ε ≈ 2.2e-16",
  "SELECT *", "JOIN", "INDEX", "EXPLAIN", "VACUUM", "SHARD",
  "P vs NP", "∀x∃y", "Turing", "λ-calc", "Church", "Curry",
  "200 OK", "404", "503", "429", "ETag", "CORS",
  "Rust ♥", "Go routines", "Erlang", "Lisp", "Haskell", "Prolog",
];

const HEX_SIZE = 58;
const NODE_COUNT = 90;
const CLUSTER_COUNT = 6;
const CONNECT_DIST = 150;
const BINARY_CHARS = "01アイウエカキクサシスタチツ01011010";
const PACKET_COUNT = 18;

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

const randBetween = (a: number, b: number) => a + Math.random() * (b - a);
const randColorKey = (): ColorKey => ALL_KEYS[Math.floor(Math.random() * ALL_KEYS.length)];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function buildHex(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const ang = (Math.PI / 3) * i - Math.PI / 6;
    const px = cx + r * Math.cos(ang);
    const py = cy + r * Math.sin(ang);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function computeTraceLengths(pts: Array<{ x: number; y: number }>) {
  let total = 0;
  const segs: number[] = [0];
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    total += d;
    segs.push(total);
  }
  return { total, segs };
}

// ─────────────────────────────────────────────────────────────────────────────
// Factory Functions
// ─────────────────────────────────────────────────────────────────────────────

function makeNode(i: number, w: number, h: number): Node {
  const cluster = i % CLUSTER_COUNT;
  const angle = (cluster / CLUSTER_COUNT) * Math.PI * 2;
  const radius = Math.min(w, h) * 0.28;
  const cx = w / 2 + Math.cos(angle) * radius;
  const cy = h / 2 + Math.sin(angle) * radius;
  const isHub = i % 18 === 0;
  const isRelay = i % 8 === 0 && !isHub;
  return {
    x: cx + randBetween(-w * 0.18, w * 0.18),
    y: cy + randBetween(-h * 0.18, h * 0.18),
    vx: randBetween(-0.25, 0.25),
    vy: randBetween(-0.25, 0.25),
    size: isHub ? randBetween(3.5, 5) : isRelay ? randBetween(2, 3) : randBetween(0.8, 2),
    pulsePhase: Math.random() * Math.PI * 2,
    pulseSpeed: randBetween(0.015, 0.04),
    cluster,
    type: isHub ? "hub" : isRelay ? "relay" : "standard",
    depth: Math.random() > 0.4 ? 1 : 0,
    signalStrength: Math.random(),
  };
}

function makePacket(nodes: Node[]): DataPacket {
  const from = Math.floor(Math.random() * nodes.length);
  let to = Math.floor(Math.random() * nodes.length);
  while (to === from) to = Math.floor(Math.random() * nodes.length);
  return {
    fromIdx: from,
    toIdx: to,
    progress: 0,
    speed: randBetween(0.0025, 0.008),
    colorKey: randColorKey(),
    size: randBetween(1.2, 2.8),
    trail: [],
  };
}

function makeBinaryDrop(w: number, h: number): BinaryDrop {
  const len = Math.floor(randBetween(10, 28));
  return {
    x: randBetween(0, w),
    y: randBetween(-h, 0),
    speed: randBetween(0.6, 2.2),
    chars: Array.from({ length: len }, () =>
      BINARY_CHARS[Math.floor(Math.random() * BINARY_CHARS.length)]
    ),
    opacity: randBetween(0.025, 0.07),
    length: len,
  };
}

function makeCircuitTrace(w: number, h: number): CircuitTrace {
  const pts: Array<{ x: number; y: number }> = [];
  let x = Math.random() * w;
  let y = Math.random() * h;
  pts.push({ x, y });
  const segs = Math.floor(randBetween(3, 7));
  for (let s = 0; s < segs; s++) {
    if (Math.random() > 0.5) x = Math.max(0, Math.min(w, x + randBetween(-250, 250)));
    else y = Math.max(0, Math.min(h, y + randBetween(-180, 180)));
    pts.push({ x, y });
  }
  const { total, segs: segLens } = computeTraceLengths(pts);
  return {
    points: pts,
    progress: 0,
    speed: randBetween(0.0012, 0.004),
    opacity: randBetween(0.04, 0.14),
    colorKey: Math.random() > 0.5 ? "primary" : "secondary",
    lineWidth: Math.random() > 0.65 ? 1.2 : 0.4,
    totalLen: total,
    segLens,
  };
}

function makeHexGrid(w: number, h: number): HexCell[] {
  const cells: HexCell[] = [];
  const colW = HEX_SIZE * Math.sqrt(3);
  const rowH = HEX_SIZE * 1.5;
  const cols = Math.ceil(w / colW) + 2;
  const rows = Math.ceil(h / rowH) + 2;
  const keys: ColorKey[] = ["primary", "secondary", "purple"];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const offset = row % 2 === 0 ? 0 : colW / 2;
      cells.push({
        cx: col * colW + offset - colW * 0.5,
        cy: row * rowH - rowH * 0.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: randBetween(0.004, 0.012),
        active: Math.random() > 0.82,
        colorKey: keys[Math.floor(Math.random() * keys.length)],
      });
    }
  }
  return cells;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // ── Resize ──────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── State ────────────────────────────────────────────────────────────────
    let animId: number;
    let frame = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    // ── Nodes ────────────────────────────────────────────────────────────────
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) =>
      makeNode(i, canvas.width, canvas.height)
    );

    // ── Packets ──────────────────────────────────────────────────────────────
    const packets: DataPacket[] = Array.from({ length: PACKET_COUNT }, () =>
      makePacket(nodes)
    );

    // ── Binary Rain ──────────────────────────────────────────────────────────
    const dropCount = Math.floor(canvas.width / 22);
    const drops: BinaryDrop[] = Array.from({ length: dropCount }, () =>
      makeBinaryDrop(canvas.width, canvas.height)
    );

    // ── Pulse Rings ──────────────────────────────────────────────────────────
    const rings: PulseRing[] = [];

    // ── Circuit Traces ───────────────────────────────────────────────────────
    const traces: CircuitTrace[] = Array.from({ length: 22 }, () =>
      makeCircuitTrace(canvas.width, canvas.height)
    );

    // ── Hex Grid ─────────────────────────────────────────────────────────────
    let hexCells: HexCell[] = makeHexGrid(canvas.width, canvas.height);

    // ── Floating Words ────────────────────────────────────────────────────────
    function makeWord(): FloatingWord {
      const maxLife = randBetween(220, 500);
      return {
        text: TECH_WORDS[Math.floor(Math.random() * TECH_WORDS.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: randBetween(-0.25, 0.25),
        vy: randBetween(-0.2, 0),
        opacity: 0,
        fontSize: randBetween(8, 14),
        colorKey: randColorKey(),
        life: 0,
        maxLife,
      };
    }
    let words: FloatingWord[] = Array.from({ length: 25 }, () => makeWord());

    // ── Glitch Bars ───────────────────────────────────────────────────────────
    const glitchBars: GlitchBar[] = [];

    // ── Mouse Handlers ────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onMouseLeave = () => { mouse.active = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    // ── Offscreen: fine grid ──────────────────────────────────────────────────
    const gridCanvas = document.createElement("canvas");
    const rebuildGrid = () => {
      gridCanvas.width = canvas.width;
      gridCanvas.height = canvas.height;
      const gc = gridCanvas.getContext("2d")!;
      gc.strokeStyle = "rgba(0,200,255,0.022)";
      gc.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 38) {
        gc.beginPath(); gc.moveTo(x, 0); gc.lineTo(x, canvas.height); gc.stroke();
      }
      for (let y = 0; y < canvas.height; y += 38) {
        gc.beginPath(); gc.moveTo(0, y); gc.lineTo(canvas.width, y); gc.stroke();
      }
    };
    const handleResize = () => {
      resize();
      rebuildGrid();
      hexCells = makeHexGrid(canvas.width, canvas.height);
    };

    rebuildGrid();
    window.addEventListener("resize", handleResize);
    window.removeEventListener("resize", rebuildGrid); // Clean up the old listener if it was added

    // ─────────────────────────────────────────────────────────────────────────
    // Draw Layers
    // ─────────────────────────────────────────────────────────────────────────

    // Layer 0: Deep background gradient
    function drawBackground() {
      const grad = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.45, 0,
        canvas.width * 0.5, canvas.height * 0.45, canvas.width * 0.9
      );
      grad.addColorStop(0, "rgba(0,12,30,0.95)");
      grad.addColorStop(0.45, "rgba(0,6,20,0.98)");
      grad.addColorStop(1, "rgba(0,2,10,1)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Layer 1: Hex grid
    function drawHexGrid() {
      hexCells.forEach((cell) => {
        cell.pulse += cell.pulseSpeed;
        const s = Math.sin(cell.pulse);
        const base = cell.active ? 0.035 + s * 0.025 : 0.008 + s * 0.004;

        buildHex(ctx, cell.cx, cell.cy, HEX_SIZE * 0.88);
        ctx.strokeStyle = RGBA[cell.colorKey](base);
        ctx.lineWidth = 0.5;
        ctx.stroke();

        if (cell.active && s > 0.75) {
          buildHex(ctx, cell.cx, cell.cy, HEX_SIZE * 0.88);
          ctx.fillStyle = RGBA[cell.colorKey](0.015);
          ctx.fill();
        }
      });
    }

    // Layer 2: Fine grid (offscreen blit)
    function drawGrid() {
      ctx.drawImage(gridCanvas, 0, 0);
    }

    // Layer 3: Binary rain
    function drawBinaryRain() {
      ctx.save();
      ctx.font = "11px 'Courier New', monospace";
      drops.forEach((drop) => {
        drop.y += drop.speed;
        if (Math.random() > 0.96) {
          const pos = Math.floor(Math.random() * drop.chars.length);
          drop.chars[pos] = BINARY_CHARS[Math.floor(Math.random() * BINARY_CHARS.length)];
        }
        drop.chars.forEach((ch, idx) => {
          const cy = drop.y - idx * 13;
          if (cy < -20 || cy > canvas.height + 20) return;
          const fade = 1 - idx / drop.chars.length;
          const alpha = idx === 0
            ? drop.opacity * 5
            : drop.opacity * fade * 0.9;
          ctx.fillStyle = idx === 0
            ? `rgba(180,255,230,${Math.min(alpha, 0.9)})`
            : RGBA.primary(alpha);
          ctx.fillText(ch, drop.x, cy);
        });
        if (drop.y - drop.chars.length * 13 > canvas.height) {
          drop.y = randBetween(-200, -20);
          drop.x = randBetween(0, canvas.width);
        }
      });
      ctx.restore();
    }

    // Layer 4: Circuit traces
    function drawCircuitTraces() {
      traces.forEach((trace, ti) => {
        trace.progress += trace.speed;
        if (trace.progress >= 1) {
          traces[ti] = makeCircuitTrace(canvas.width, canvas.height);
          return;
        }

        const drawLen = trace.progress * trace.totalLen;
        ctx.beginPath();
        ctx.moveTo(trace.points[0].x, trace.points[0].y);
        let headX = trace.points[0].x;
        let headY = trace.points[0].y;
        let drawnHead = false;

        for (let i = 1; i < trace.points.length; i++) {
          if (trace.segLens[i] <= drawLen) {
            ctx.lineTo(trace.points[i].x, trace.points[i].y);
            headX = trace.points[i].x;
            headY = trace.points[i].y;
          } else {
            const seg = drawLen - trace.segLens[i - 1];
            const segLen = trace.segLens[i] - trace.segLens[i - 1];
            const frac = seg / segLen;
            headX = lerp(trace.points[i - 1].x, trace.points[i].x, frac);
            headY = lerp(trace.points[i - 1].y, trace.points[i].y, frac);
            ctx.lineTo(headX, headY);
            drawnHead = true;
            break;
          }
        }

        ctx.strokeStyle = RGBA[trace.colorKey](trace.opacity);
        ctx.lineWidth = trace.lineWidth;
        ctx.stroke();

        // Glowing dot at head
        if (drawnHead || trace.progress > 0.98) {
          const grad = ctx.createRadialGradient(headX, headY, 0, headX, headY, 5);
          grad.addColorStop(0, RGBA[trace.colorKey](0.9));
          grad.addColorStop(1, RGBA[trace.colorKey](0));
          ctx.beginPath();
          ctx.arc(headX, headY, 5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Corner junction dots
        trace.points.forEach((p, i) => {
          if (trace.segLens[i] < drawLen) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = RGBA[trace.colorKey](trace.opacity * 3);
            ctx.fill();
          }
        });
      });
    }

    // Layer 5: Node connections
    function drawConnections() {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= CONNECT_DIST) continue;

          const ratio = 1 - dist / CONNECT_DIST;
          const sameCluster = a.cluster === b.cluster;
          const depthFactor = (a.depth + b.depth) / 2;

          let alpha: number;
          let colorKey: ColorKey;

          if (sameCluster) {
            alpha = ratio * 0.25 * depthFactor;
            colorKey = "primary";
          } else if (a.type === "hub" || b.type === "hub") {
            alpha = ratio * 0.18 * depthFactor;
            colorKey = "secondary";
          } else {
            alpha = ratio * 0.1 * depthFactor;
            colorKey = "purple";
          }

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = RGBA[colorKey](alpha);
          ctx.lineWidth = sameCluster ? 0.7 : 0.4;
          ctx.stroke();
        }
      }
    }

    // Layer 6: Nodes
    function drawNodes(t: number) {
      nodes.forEach((node) => {
        // Mouse repulsion
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const f = ((130 - dist) / 130) * 0.9;
            node.vx -= (dx / dist) * f;
            node.vy -= (dy / dist) * f;
          }
        }

        node.x += node.vx;
        node.y += node.vy;
        
        // Jitter to keep it alive
        node.vx += (Math.random() - 0.5) * 0.01;
        node.vy += (Math.random() - 0.5) * 0.01;

        node.vx *= 0.975;
        node.vy *= 0.975;
        node.pulsePhase += node.pulseSpeed;

        // Soft bounce
        if (node.x < 0) { node.vx = Math.abs(node.vx) * 0.6; node.x = 0; }
        if (node.x > canvas.width) { node.vx = -Math.abs(node.vx) * 0.6; node.x = canvas.width; }
        if (node.y < 0) { node.vy = Math.abs(node.vy) * 0.6; node.y = 0; }
        if (node.y > canvas.height) { node.vy = -Math.abs(node.vy) * 0.6; node.y = canvas.height; }

        const pulse = 0.5 + Math.sin(node.pulsePhase) * 0.5;
        const depthAlpha = 0.5 + node.depth * 0.5;

        if (node.type === "hub") {
          // Outer atmospheric glow
          const outerGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 12);
          outerGrad.addColorStop(0, RGBA.primary(0.12 * pulse * depthAlpha));
          outerGrad.addColorStop(0.5, RGBA.primary(0.04 * pulse * depthAlpha));
          outerGrad.addColorStop(1, RGBA.primary(0));
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 12, 0, Math.PI * 2);
          ctx.fillStyle = outerGrad;
          ctx.fill();

          // Animated orbit ring
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 5, 0, Math.PI * 2);
          ctx.strokeStyle = RGBA.primary(0.2 * pulse * depthAlpha);
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Dashed orbit ring (rotates via t)
          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.rotate(t * 0.4);
          ctx.setLineDash([4, 8]);
          ctx.beginPath();
          ctx.arc(0, 0, node.size * 3.5, 0, Math.PI * 2);
          ctx.strokeStyle = RGBA.secondary(0.15 * depthAlpha);
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();

          // Core
          const coreGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size);
          coreGrad.addColorStop(0, `rgba(200,255,240,${0.95 * depthAlpha})`);
          coreGrad.addColorStop(0.6, RGBA.primary(0.9 * depthAlpha));
          coreGrad.addColorStop(1, RGBA.primary(0.4 * depthAlpha));
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fillStyle = coreGrad;
          ctx.fill();

          // Signal strength bars (3 bars around hub)
          const barCount = 3;
          for (let b = 0; b < barCount; b++) {
            const ang = (b / barCount) * Math.PI * 2 + t * 0.6;
            const filled = b < Math.ceil(node.signalStrength * barCount);
            const bx = node.x + Math.cos(ang) * (node.size + 5);
            const by = node.y + Math.sin(ang) * (node.size + 5);
            ctx.beginPath();
            ctx.arc(bx, by, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = filled
              ? RGBA.primary(0.8 * depthAlpha)
              : RGBA.primary(0.15 * depthAlpha);
            ctx.fill();
          }

        } else if (node.type === "relay") {
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 7);
          glow.addColorStop(0, RGBA.secondary(0.1 * pulse * depthAlpha));
          glow.addColorStop(1, RGBA.secondary(0));
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 7, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          const core = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size);
          core.addColorStop(0, `rgba(200,240,255,${0.9 * depthAlpha})`);
          core.addColorStop(1, RGBA.secondary(0.5 * depthAlpha));
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fillStyle = core;
          ctx.fill();

        } else {
          const a = (0.15 + pulse * 0.5) * depthAlpha;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fillStyle = RGBA.primary(a);
          ctx.fill();
        }
      });
    }

    // Layer 7: Data packets
    function drawPackets() {
      packets.forEach((pkt, pi) => {
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets[pi] = makePacket(nodes);
          return;
        }

        const from = nodes[pkt.fromIdx];
        const to = nodes[pkt.toIdx];
        const px = lerp(from.x, to.x, pkt.progress);
        const py = lerp(from.y, to.y, pkt.progress);

        // Record trail
        pkt.trail.push({ x: px, y: py });
        if (pkt.trail.length > 14) pkt.trail.shift();

        // Draw trail
        pkt.trail.forEach((tp, ti) => {
          const frac = ti / pkt.trail.length;
          const r = pkt.size * frac;
          if (r < 0.2) return;
          const grad = ctx.createRadialGradient(tp.x, tp.y, 0, tp.x, tp.y, r * 2.5);
          grad.addColorStop(0, RGBA[pkt.colorKey](frac * 0.5));
          grad.addColorStop(1, RGBA[pkt.colorKey](0));
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        });

        // Head glow
        const headGrad = ctx.createRadialGradient(px, py, 0, px, py, pkt.size * 4);
        headGrad.addColorStop(0, RGBA[pkt.colorKey](0.8));
        headGrad.addColorStop(0.4, RGBA[pkt.colorKey](0.3));
        headGrad.addColorStop(1, RGBA[pkt.colorKey](0));
        ctx.beginPath();
        ctx.arc(px, py, pkt.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = headGrad;
        ctx.fill();

        // Core bright dot
        ctx.beginPath();
        ctx.arc(px, py, pkt.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(240,255,250,0.95)";
        ctx.fill();
      });
    }

    // Layer 8: Pulse rings
    function drawPulseRings() {
      if (frame % 55 === 0) {
        const hubNodes = nodes.filter((n) => n.type === "hub");
        const src = hubNodes[Math.floor(Math.random() * hubNodes.length)] ?? nodes[0];
        rings.push({
          x: src.x,
          y: src.y,
          radius: 0,
          maxRadius: randBetween(90, 180),
          opacity: 0.7,
          colorKey: Math.random() > 0.5 ? "primary" : "secondary",
        });
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.radius += 1.8;
        ring.opacity -= 0.007;
        if (ring.opacity <= 0) { rings.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = RGBA[ring.colorKey](ring.opacity * 0.4);
        ctx.lineWidth = 0.8;
        ctx.stroke();
        // Inner echo ring
        if (ring.radius > 20) {
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.radius * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = RGBA[ring.colorKey](ring.opacity * 0.15);
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }

    // Layer 9: Floating tech words
    function drawWords() {
      if (frame % 70 === 0 && words.length < 35) words.push(makeWord());

      ctx.save();
      for (let i = words.length - 1; i >= 0; i--) {
        const w = words[i];
        w.life++;
        w.x += w.vx;
        w.y += w.vy;
        const r = w.life / w.maxLife;
        w.opacity = r < 0.12 ? (r / 0.12) * 0.07 : r > 0.78 ? ((1 - r) / 0.22) * 0.07 : 0.07;
        if (w.life >= w.maxLife) { words.splice(i, 1); continue; }
        ctx.font = `${w.fontSize}px 'Courier New', monospace`;
        ctx.fillStyle = RGBA[w.colorKey](w.opacity);
        ctx.fillText(w.text, w.x, w.y);
      }
      ctx.restore();
    }

    // Layer 10: Scan lines
    function drawScanLines(t: number) {
      // Fast primary scan
      const s1y = ((t * 45) % (canvas.height + 60)) - 30;
      const sg1 = ctx.createLinearGradient(0, s1y - 25, 0, s1y + 25);
      sg1.addColorStop(0, RGBA.primary(0));
      sg1.addColorStop(0.5, RGBA.primary(0.045));
      sg1.addColorStop(1, RGBA.primary(0));
      ctx.fillStyle = sg1;
      ctx.fillRect(0, s1y - 25, canvas.width, 50);

      // Slow secondary scan (upward)
      const s2y = canvas.height - ((t * 18) % (canvas.height + 60)) + 30;
      const sg2 = ctx.createLinearGradient(0, s2y - 18, 0, s2y + 18);
      sg2.addColorStop(0, RGBA.secondary(0));
      sg2.addColorStop(0.5, RGBA.secondary(0.022));
      sg2.addColorStop(1, RGBA.secondary(0));
      ctx.fillStyle = sg2;
      ctx.fillRect(0, s2y - 18, canvas.width, 36);

      // Vertical scan
      const s3x = ((t * 12) % (canvas.width + 60)) - 30;
      const sg3 = ctx.createLinearGradient(s3x - 20, 0, s3x + 20, 0);
      sg3.addColorStop(0, RGBA.secondary(0));
      sg3.addColorStop(0.5, RGBA.secondary(0.012));
      sg3.addColorStop(1, RGBA.secondary(0));
      ctx.fillStyle = sg3;
      ctx.fillRect(s3x - 20, 0, 40, canvas.height);
    }

    // Layer 11: CRT scanlines & vignette
    function drawCRTOverlay() {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 1.5);
      }
      // Vignette
      const vig = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.15,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.85
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,10,0.65)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Layer 12: Corner HUD decorations
    function drawHUD(t: number) {
      const hp = 0.45 + Math.sin(t * 1.8) * 0.3;
      const cw = canvas.width;
      const ch = canvas.height;
      const size = 72;

      const corners = [
        { x: 0, y: 0, sx: 1, sy: 1 },
        { x: cw, y: 0, sx: -1, sy: 1 },
        { x: 0, y: ch, sx: 1, sy: -1 },
        { x: cw, y: ch, sx: -1, sy: -1 },
      ];

      corners.forEach(({ x, y, sx, sy }) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(sx, sy);

        // L-bracket
        ctx.strokeStyle = RGBA.primary(0.45 * hp);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, size);
        ctx.lineTo(0, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();

        // Corner square fill
        ctx.fillStyle = RGBA.primary(0.7 * hp);
        ctx.fillRect(0, 0, 5, 5);

        // Tick marks
        [16, 32, 48].forEach((o) => {
          ctx.fillStyle = RGBA.primary(0.4 * hp);
          ctx.fillRect(o - 0.5, -2, 1, 4);
          ctx.fillRect(-2, o - 0.5, 4, 1);
        });

        // Bracket diamond accent
        ctx.strokeStyle = RGBA.secondary(0.3 * hp);
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(size + 12, 0);
        ctx.lineTo(size + 20, 6);
        ctx.lineTo(size + 12, 12);
        ctx.lineTo(size + 4, 6);
        ctx.closePath();
        ctx.stroke();

        // Mini bar graph (top-left and top-right corners only)
        if (sy === 1) {
          for (let b = 0; b < 6; b++) {
            const bh = (Math.sin(t * 1.5 + b * 0.7) * 0.5 + 0.5) * 22;
            const bAlpha = 0.25 * hp;
            const bKey: ColorKey = b % 2 === 0 ? "primary" : "secondary";
            ctx.fillStyle = RGBA[bKey](bAlpha);
            ctx.fillRect(size + 28 + b * 8, 24 - bh, 5, bh);
          }
          // Label
          ctx.font = "7px monospace";
          ctx.fillStyle = RGBA.secondary(0.3 * hp);
          ctx.fillText("SYS", size + 28, 28);
        }

        // Status dot trio
        ["primary", "secondary", "accent"].forEach((k, i) => {
          ctx.beginPath();
          ctx.arc(8 + i * 14, size + 14, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = RGBA[k as ColorKey](0.55 * hp);
          ctx.fill();
        });

        ctx.restore();
      });

      // Center top: horizontal ruler bar
      const rw = 200;
      const rx = cw / 2 - rw / 2;
      ctx.strokeStyle = RGBA.primary(0.18 * hp);
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(rx, 8);
      ctx.lineTo(rx + rw, 8);
      ctx.stroke();
      for (let tick = 0; tick <= 10; tick++) {
        const tx = rx + (tick / 10) * rw;
        const th = tick % 5 === 0 ? 6 : 3;
        ctx.beginPath();
        ctx.moveTo(tx, 8);
        ctx.lineTo(tx, 8 + th);
        ctx.stroke();
      }
      // Moving cursor on ruler
      const cursorX = rx + ((Math.sin(t * 0.5) * 0.5 + 0.5) * rw);
      ctx.fillStyle = RGBA.primary(0.5 * hp);
      ctx.fillRect(cursorX - 1, 6, 2, 10);
    }

    // Layer 13: Occasional glitch effect
    function drawGlitch(t: number) {
      if (frame % 180 === 0 && Math.random() > 0.6) {
        const barCount = Math.floor(randBetween(2, 6));
        for (let g = 0; g < barCount; g++) {
          glitchBars.push({
            y: Math.random() * canvas.height,
            h: randBetween(2, 14),
            opacity: randBetween(0.04, 0.15),
            life: 0,
          });
        }
      }
      for (let i = glitchBars.length - 1; i >= 0; i--) {
        const gb = glitchBars[i];
        gb.life++;
        if (gb.life > 8) { glitchBars.splice(i, 1); continue; }
        const shift = randBetween(-15, 15);
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = RGBA.secondary(gb.opacity);
        ctx.fillRect(shift, gb.y, canvas.width - shift, gb.h);
        ctx.restore();
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Main Loop
    // ─────────────────────────────────────────────────────────────────────────
    const draw = () => {
      frame++;
      const t = Date.now() / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBackground();     // 0. bg gradient
      drawHexGrid();        // 1. hex cells
      drawGrid();           // 2. fine grid
      drawBinaryRain();     // 3. binary rain
      drawCircuitTraces();  // 4. circuit traces
      drawConnections();    // 5. node connections
      drawNodes(t);         // 6. nodes
      drawPackets();        // 7. data packets
      drawPulseRings();     // 8. pulse rings
      drawWords();          // 9. floating words
      drawScanLines(t);     // 10. scan lines
      drawCRTOverlay();     // 11. CRT + vignette
      drawHUD(t);           // 12. corner HUD
      drawGlitch(t);        // 13. glitch bars

      animId = requestAnimationFrame(draw);
    };

    draw();

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50"
      style={{ background: "transparent" }}
    />
  );
}