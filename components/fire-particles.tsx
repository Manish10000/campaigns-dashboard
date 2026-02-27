'use client';

import { useEffect, useRef, useState } from 'react';

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

let idCounter = 0;

function spawnParticle(w: number, h: number) {
  const maxLife = rand(2.5, 7.5);
  return {
    id: idCounter++,
    x: rand(0, w),
    y: h + rand(5, 25),
    vy: -rand(28, 110),
    vx: rand(-6, 6),
    life: 0,
    maxLife,
    size: rand(1.4, 6.5),
    wPhase: rand(0, Math.PI * 2),
    wFreq: rand(0.3, 1.1),
    wAmp: rand(12, 50),
    bPhase: rand(0, Math.PI * 2),
    bFreq: rand(0.5, 2.0),
    hue: 'red',
  };
}

function getColor(_hue: 'red', brightness: number) {
  // Hot red ramp
  return [
    Math.round(lerp(200, 255, brightness)), // R
    Math.round(lerp(16, 40, brightness)),   // G
    Math.round(lerp(16, 32, brightness)),   // B
  ];
}

export function FireParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({
    particles: [] as ReturnType<typeof spawnParticle>[],
    nextSpawn: 0,
    lastTime: null as number | null,
  });

  const [dims, setDims] = useState({ w: 800, h: 600 });

  useEffect(() => {
    const update = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { w, h } = dims;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const s = stateRef.current;

    let raf: number;

    const loop = (ts: number) => {
      const last = s.lastTime ?? ts;
      const dt = clamp((ts - last) / 1000, 0, 0.05);
      s.lastTime = ts;
      const t = ts / 1000;

      // Spawn batch
      if (t >= s.nextSpawn) {
        const count = Math.round(rand(5, 10));
        for (let i = 0; i < count; i++) s.particles.push(spawnParticle(w, h));
        s.nextSpawn = t + rand(0.4, 2.2);
      }

      // Clear transparent canvas
      ctx.clearRect(0, 0, w, h);

      // Remove dead
      s.particles = s.particles.filter((p) => p.life < p.maxLife);

      // Draw particles
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (const p of s.particles) {
        p.life += dt;
        const tf = p.life / p.maxLife;

        const fadeIn = tf < 0.07 ? tf / 0.07 : 1;
        const fadeOut = tf > 0.8 ? 1 - (tf - 0.8) / 0.2 : 1;
        const env = fadeIn * fadeOut;

        const breathe = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * p.bFreq * Math.PI * 2 + p.bPhase));
        const alpha = env * breathe * 0.94;
        if (alpha < 0.015) continue;

        const waveX = Math.sin(t * p.wFreq + p.wPhase) * p.wAmp;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const gx = p.x + waveX;
        const gy = p.y;

        const [r, g, b] = getColor('red', breathe);
        const radius = p.size * (0.75 + 0.25 * breathe);

        const haloR = radius * 7.5;
        const gHalo = ctx.createRadialGradient(gx, gy, 0, gx, gy, haloR);
        gHalo.addColorStop(0, `rgba(${r},${g},${b},${(alpha * 0.22).toFixed(3)})`);
        gHalo.addColorStop(0.5, `rgba(${r},${g},${b},${(alpha * 0.06).toFixed(3)})`);
        gHalo.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(gx, gy, haloR, 0, Math.PI * 2);
        ctx.fillStyle = gHalo;
        ctx.fill();

        const gMid = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius * 3);
        gMid.addColorStop(0, `rgba(${r},${g},${b},${(alpha * 0.7).toFixed(3)})`);
        gMid.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(gx, gy, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gMid;
        ctx.fill();

        const gCore = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius);
        gCore.addColorStop(0, `rgba(255,255,245,${(alpha * 0.98).toFixed(3)})`);
        gCore.addColorStop(0.5, `rgba(${r},${g},${b},${(alpha * 0.65).toFixed(3)})`);
        gCore.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(gx, gy, radius, 0, Math.PI * 2);
        ctx.fillStyle = gCore;
        ctx.fill();
      }

      ctx.restore();

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      s.lastTime = null;
      s.particles = [];
    };
  }, [dims]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5]">
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
