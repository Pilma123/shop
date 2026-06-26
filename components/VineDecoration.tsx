/** Photorealistic-style SVG botanical vine decorations */

/* ── Reusable SVG elements ── */

function IvyLeaf({ x, y, r = 0, scale = 1, dark = false }: { x: number; y: number; r?: number; scale?: number; dark?: boolean }) {
  const fill = dark ? "#1e4020" : "#2d6030";
  const highlight = dark ? "#254a28" : "#3a7540";
  return (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${scale})`}>
      {/* Main lobe */}
      <path d="M0,0 C-8,-12 -14,-22 -8,-30 C-4,-36 4,-36 8,-30 C14,-22 8,-12 0,0Z"
        fill={fill} />
      {/* Side lobes */}
      <path d="M0,0 C-12,-8 -20,-10 -22,-6 C-24,-2 -20,4 -14,2 C-8,0 0,0 0,0Z"
        fill={highlight} opacity="0.9" />
      <path d="M0,0 C12,-8 20,-10 22,-6 C24,-2 20,4 14,2 C8,0 0,0 0,0Z"
        fill={highlight} opacity="0.9" />
      {/* Vein */}
      <path d="M0,0 L0,-28" stroke="#1a3a1c" strokeWidth="0.8" opacity="0.6" fill="none" />
      <path d="M-2,-14 L-10,-22" stroke="#1a3a1c" strokeWidth="0.5" opacity="0.5" fill="none" />
      <path d="M2,-14 L10,-22" stroke="#1a3a1c" strokeWidth="0.5" opacity="0.5" fill="none" />
      {/* Gloss */}
      <ellipse cx="-3" cy="-20" rx="2.5" ry="4" fill="white" opacity="0.12" transform="rotate(-15,-3,-20)" />
    </g>
  );
}

function SmallFlower({ x, y, r = 0, color = "#d98aa0" }: { x: number; y: number; r?: number; color?: string }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${r})`}>
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse key={angle} cx="0" cy="-7" rx="4" ry="7"
          fill={color} opacity="0.9"
          transform={`rotate(${angle})`} />
      ))}
      <circle cx="0" cy="0" r="3.5" fill="#f5c84a" />
      <circle cx="0" cy="0" r="1.5" fill="#e8b030" />
    </g>
  );
}

/* ════════════════════════════════════════
   DESKTOP S-VINE — for collection section
════════════════════════════════════════ */
export function DesktopVine() {
  return (
    <svg
      viewBox="0 0 1100 620"
      className="absolute inset-0 w-full h-full pointer-events-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {/* ── Main vine — S-curve across the page ── */}
      <path
        className="vine-path"
        d="M 80 60
           C 180 20, 320 120, 440 100
           C 560 80, 640 40, 760 80
           C 860 110, 920 60, 1050 90"
        stroke="#5c3d1e"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Lower branch */}
      <path
        className="vine-path"
        d="M 100 420
           C 220 380, 380 460, 520 430
           C 660 400, 780 460, 960 410"
        stroke="#5c3d1e"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        style={{ animationDelay: "0.5s" }}
      />
      {/* Connecting tendril */}
      <path
        className="vine-path"
        d="M 540 100 C 560 200, 540 320, 520 430"
        stroke="#6b4a22"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        style={{ animationDelay: "0.8s" }}
      />
      {/* Small tendrils */}
      <path d="M 200 55 C 210 30, 230 20, 220 10" stroke="#6b4a22" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 440 98 C 450 70, 470 60, 465 45" stroke="#6b4a22" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 760 78 C 770 50, 790 40, 785 25" stroke="#6b4a22" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 300 440 C 310 415, 330 405, 325 390" stroke="#6b4a22" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 700 415 C 710 388, 730 378, 725 362" stroke="#6b4a22" strokeWidth="1.5" strokeLinecap="round" />

      {/* ── Ivy leaves along top vine ── */}
      <IvyLeaf x={140} y={48}  r={-25} scale={0.9} />
      <IvyLeaf x={200} y={42}  r={20}  scale={1.0} dark />
      <IvyLeaf x={280} y={72}  r={-15} scale={1.1} />
      <IvyLeaf x={350} y={55}  r={30}  scale={0.85} dark />
      <IvyLeaf x={440} y={90}  r={-20} scale={1.0} />
      <IvyLeaf x={540} y={68}  r={10}  scale={0.9} dark />
      <IvyLeaf x={620} y={52}  r={-30} scale={1.1} />
      <IvyLeaf x={720} y={62}  r={25}  scale={0.95} />
      <IvyLeaf x={820} y={72}  r={-15} scale={1.0} dark />
      <IvyLeaf x={900} y={52}  r={20}  scale={0.9} />
      <IvyLeaf x={990} y={78}  r={-10} scale={1.0} />

      {/* ── Ivy leaves along lower vine ── */}
      <IvyLeaf x={160} y={408} r={15}  scale={0.9} dark />
      <IvyLeaf x={260} y={425} r={-25} scale={1.0} />
      <IvyLeaf x={380} y={448} r={20}  scale={0.95} dark />
      <IvyLeaf x={480} y={420} r={-10} scale={1.1} />
      <IvyLeaf x={600} y={408} r={30}  scale={0.9} />
      <IvyLeaf x={700} y={428} r={-20} scale={1.0} dark />
      <IvyLeaf x={810} y={415} r={15}  scale={0.95} />
      <IvyLeaf x={900} y={400} r={-25} scale={1.0} />

      {/* ── Flowers ── */}
      <SmallFlower x={180}  y={30}  color="#d98236" />
      <SmallFlower x={440}  y={60}  color="#d98aa0" />
      <SmallFlower x={760}  y={50}  color="#d98236" r={30} />
      <SmallFlower x={1020} y={70}  color="#d98aa0" r={-15} />
      <SmallFlower x={280}  y={408} color="#d98aa0" r={20} />
      <SmallFlower x={560}  y={395} color="#d98236" r={-30} />
      <SmallFlower x={840}  y={390} color="#d98aa0" r={15} />
    </svg>
  );
}

/* ════════════════════════════════════════
   MOBILE VINE — vertical winding
════════════════════════════════════════ */
export function MobileVine() {
  return (
    <svg
      viewBox="0 0 380 1500"
      className="absolute inset-0 w-full h-full pointer-events-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {/* Main vertical winding vine */}
      <path
        className="vine-path"
        d="M 190 0
           C 230 100, 150 200, 190 320
           C 230 440, 150 540, 190 660
           C 230 780, 150 880, 190 1000
           C 230 1120, 150 1220, 190 1350
           C 210 1420, 190 1480, 190 1500"
        stroke="#5c3d1e"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Side tendrils */}
      {[150, 320, 490, 660, 830, 1000, 1170, 1340].map((y, i) => (
        <path
          key={i}
          d={`M 190 ${y} C ${i % 2 === 0 ? '220' : '160'} ${y - 20}, ${i % 2 === 0 ? '240' : '140'} ${y - 40}, ${i % 2 === 0 ? '230' : '150'} ${y - 55}`}
          stroke="#6b4a22"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}

      {/* Ivy leaves */}
      {[100, 220, 360, 490, 620, 740, 870, 990, 1120, 1250].map((y, i) => (
        <IvyLeaf
          key={i}
          x={i % 2 === 0 ? 215 : 165}
          y={y}
          r={i % 2 === 0 ? 35 : -35}
          scale={0.85}
          dark={i % 3 === 0}
        />
      ))}

      {/* Flowers */}
      {[80, 310, 540, 770, 1000, 1230].map((y, i) => (
        <SmallFlower
          key={i}
          x={i % 2 === 0 ? 230 : 150}
          y={y}
          color={i % 2 === 0 ? "#d98236" : "#d98aa0"}
          r={i * 20}
        />
      ))}
    </svg>
  );
}

/* ════════════════════════════════════════
   HERO BOTANICAL DECOR — flowers, bird overlay
════════════════════════════════════════ */
export function HeroBotanicalDecor() {
  return (
    <svg
      viewBox="0 0 1200 700"
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ zIndex: 3 }}
    >
      {/* Pink peony — top left */}
      <g transform="translate(-20, 40)">
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => (
          <ellipse key={i}
            cx="120" cy="140"
            rx={28 + i * 2} ry={22 + i * 1.5}
            fill={i < 6 ? "#d4638a" : "#c0547a"}
            opacity={0.75 - i * 0.03}
            transform={`rotate(${a} 120 140)`}
          />
        ))}
        {[0,45,90,135,180,225,270,315].map((a, i) => (
          <ellipse key={i}
            cx="120" cy="140"
            rx={14} ry={10}
            fill="#e882a2"
            opacity="0.85"
            transform={`rotate(${a} 120 140)`}
          />
        ))}
        <circle cx="120" cy="140" r="10" fill="#f0a0bc" opacity="0.9" />
      </g>

      {/* Orange flower — top right area */}
      <g transform="translate(680, 160)">
        {[0,60,120,180,240,300].map((a, i) => (
          <ellipse key={i}
            cx="0" cy="-16" rx="6" ry="14"
            fill="#d98236"
            opacity="0.9"
            transform={`rotate(${a})`}
          />
        ))}
        <circle cx="0" cy="0" r="5" fill="#f5c040" />
      </g>

      {/* Small orange flower — right */}
      <g transform="translate(980, 280)">
        {[0,60,120,180,240,300].map((a, i) => (
          <ellipse key={i}
            cx="0" cy="-12" rx="5" ry="11"
            fill="#d97040"
            opacity="0.85"
            transform={`rotate(${a})`}
          />
        ))}
        <circle cx="0" cy="0" r="4" fill="#f5b830" />
      </g>

      {/* Small pink wildflowers — bottom */}
      {[[90,620],[160,640],[230,610]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          {[0,60,120,180,240,300].map((a, j) => (
            <ellipse key={j} cx="0" cy="-5" rx="2.5" ry="5"
              fill="#c878a0" opacity="0.75" transform={`rotate(${a})`} />
          ))}
          <circle cx="0" cy="0" r="2" fill="#f5d040" />
        </g>
      ))}

      {/* Robin bird — top right */}
      <g transform="translate(920, 80) scale(0.9)">
        {/* Body */}
        <ellipse cx="0" cy="0" rx="14" ry="10" fill="#5a4020" />
        {/* Head */}
        <circle cx="12" cy="-6" r="8" fill="#5a4020" />
        {/* Orange breast */}
        <ellipse cx="2" cy="3" rx="9" ry="7" fill="#c86020" />
        {/* Eye */}
        <circle cx="15" cy="-8" r="2.5" fill="white" />
        <circle cx="16" cy="-8" r="1.5" fill="#1a1008" />
        <circle cx="16.5" cy="-8.5" r="0.5" fill="white" />
        {/* Beak */}
        <path d="M20,-6 L26,-5 L20,-4Z" fill="#8a7020" />
        {/* Tail */}
        <path d="M-14,0 L-26,8 L-22,2 L-26,-2 L-14,-2Z" fill="#4a3515" />
        {/* Wing detail */}
        <path d="M-8,-4 C0,-10 10,-8 8,-2" stroke="#3a2810" strokeWidth="1.5" fill="none" opacity="0.6" />
        {/* Legs */}
        <line x1="0" y1="10" x2="-2" y2="20" stroke="#8a7020" strokeWidth="1.5" />
        <line x1="4" y1="10" x2="6" y2="20" stroke="#8a7020" strokeWidth="1.5" />
      </g>

      {/* Ivy vines along top edge */}
      <path d="M 0 0 C 100 20, 200 10, 300 30 C 400 50, 500 20, 600 40 C 700 60, 800 30, 900 50 C 1000 70, 1100 40, 1200 55"
        stroke="#3a5c2e" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      {[80,180,280,420,560,700,840,980,1100].map((x, i) => (
        <IvyLeaf key={i} x={x} y={i % 2 === 0 ? 18 : 35} r={i % 2 === 0 ? -20 : 20} scale={0.7} dark={i % 2 === 0} />
      ))}
    </svg>
  );
}
