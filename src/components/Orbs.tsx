"use client";
import { useEffect, useRef } from "react";

/** Decorative blurred gradient orbs that drift with the cursor. Purely visual (aria-hidden). */
export function Orbs() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, tx = 0, ty = 0, x = 0, y = 0;
    const move = (e: MouseEvent) => { tx = e.clientX / window.innerWidth - 0.5; ty = e.clientY / window.innerHeight - 0.5; };
    const tick = () => {
      x += (tx - x) * 0.06; y += (ty - y) * 0.06;
      el.style.setProperty("--mx", `${x * 70}px`);
      el.style.setProperty("--my", `${y * 50}px`);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
      <div className="absolute inset-0" style={{ transform: "translate(var(--mx,0), var(--my,0))" }}>
        <div className="orb orb-a -left-24 -top-24 h-[28rem] w-[28rem]" style={{ background: "radial-gradient(circle at 30% 30%, #8be9f7, #b6f542 70%)" }} />
      </div>
      <div className="absolute inset-0" style={{ transform: "translate(calc(var(--mx,0) * -1.4), calc(var(--my,0) * -1.4))" }}>
        <div className="orb orb-b -right-20 top-10 h-[24rem] w-[24rem]" style={{ background: "radial-gradient(circle at 60% 40%, #8b7bff, #5ec8ff 70%)", opacity: 0.55 }} />
        <div className="orb orb-a left-1/3 top-1/2 h-[26rem] w-[34rem]" style={{ background: "radial-gradient(circle, #d7ff8a, transparent 70%)", opacity: 0.8 }} />
      </div>
    </div>
  );
}
