'use client';

import PageTransition from '@/components/PageTransition';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AboutPage() {
  const router = useRouter();
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsRef.current) return;
    const stars = starsRef.current.querySelectorAll('.star');
    gsap.to(stars, {
      rotation: 360,
      duration: 3,
      ease: 'none',
      repeat: -1,
      stagger: 0.3,
    });
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#FFD700] p-6 relative overflow-hidden">
        {/* Floating stars */}
        <div ref={starsRef} className="absolute inset-0 pointer-events-none">
          {['★', '☆', '✦', '✧', '⭐'].map((star, i) => (
            <span
              key={i}
              className="star absolute text-4xl opacity-30"
              style={{
                left: `${15 + i * 18}%`,
                top: `${10 + (i % 3) * 25}%`,
                fontSize: `${30 + i * 8}px`,
              }}
            >
              {star}
            </span>
          ))}
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <button
            onClick={() => router.push('/')}
            className="btn-sketch bg-white px-4 py-2 mb-6 text-sm font-black"
          >
            ← BACK TO WORLD
          </button>

          <h1
            className="text-6xl font-black mb-6 wobble"
            style={{ fontFamily: "'Comic Sans MS', cursive", textShadow: '4px 4px 0 #111' }}
          >
            ✨ ABOUT
          </h1>

          <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_#111] mb-6">
            <h2
              className="text-3xl font-black mb-3"
              style={{ fontFamily: "'Comic Sans MS', cursive" }}
            >
              KidSuper World
            </h2>
            <p
              className="text-base leading-relaxed font-bold"
              style={{ fontFamily: "'Comic Sans MS', cursive", color: '#444' }}
            >
              KidSuper is a New York-based brand founded by Colm Dillane.
              It blurs the line between fashion, art, and self-expression.
              The KidSuper World is a place where creativity has no limits —
              every building, every wall, every window tells a story.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: 'Founded', value: '2010', emoji: '🗓' },
              { label: 'Based in', value: 'Brooklyn, NYC', emoji: '🌆' },
              { label: 'Collab w/', value: 'basement.studio', emoji: '💻' },
              { label: 'Vibe', value: 'Pure Art', emoji: '🎨' },
            ].map(({ label, value, emoji }) => (
              <div
                key={label}
                className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_#111] text-center"
              >
                <div className="text-3xl mb-1">{emoji}</div>
                <p
                  className="text-xs font-bold uppercase"
                  style={{ fontFamily: "'Comic Sans MS', cursive", color: '#888' }}
                >
                  {label}
                </p>
                <p
                  className="text-sm font-black"
                  style={{ fontFamily: "'Comic Sans MS', cursive" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => router.push('/shop')}
              className="btn-sketch bg-black text-white text-lg font-black px-8 py-3 bounce-slow"
            >
              🛍 SHOP THE WORLD
            </button>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
