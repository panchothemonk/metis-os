"use client";
import { useEffect, useRef } from "react";

interface Particle { x: number; y: number; vx: number; vy: number; size: number; opacity: number; life: number; maxLife: number; }

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let particles: Particle[] = []; let animationId: number; let lastSpawn = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const spawn = (): Particle => ({ x: Math.random() * canvas.width, y: canvas.height + 10, vx: (Math.random() - 0.5) * 0.5, vy: -(Math.random() * 0.5 + 0.3), size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.5 + 0.2, life: 0, maxLife: Math.random() * 400 + 200 });
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (time - lastSpawn > 80 && particles.length < 60) { particles.push(spawn()); lastSpawn = time; }
      particles = particles.filter(p => { p.life++; if (p.life > p.maxLife) return false; p.x += p.vx; p.y += p.vy; const r = 1 - p.life / p.maxLife; const a = p.opacity * r; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(200,150,62,${a})`; ctx.fill(); ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2); ctx.fillStyle = `rgba(59,47,128,${a * 0.2})`; ctx.fill(); return true; });
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />;
}
