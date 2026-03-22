"use client";
import { useState, useEffect, useRef } from "react";

export default function CountUp({ end, suffix = "", className = "" }) {
  const [val, setVal] = useState(0);
  const [go, setGo] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); o.disconnect(); } }, { threshold: 0.1 });
    o.observe(el); return () => o.disconnect();
  }, []);
  useEffect(() => {
    if (!go) return; let c = 0; const s = end / 50;
    const t = setInterval(() => { c += s; if (c >= end) { setVal(end); clearInterval(t); } else setVal(Math.floor(c)); }, 20);
    return () => clearInterval(t);
  }, [go, end]);
  return <span ref={ref} className={className}>{val.toLocaleString()}{suffix}</span>;
}
