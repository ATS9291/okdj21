'use client';

import PageTransition from '@/components/PageTransition';
import { useRouter } from 'next/navigation';

const LOOKS = [
  { id: 1, season: 'SS25', name: 'LOOK 01', bg: '#FF1493', emoji: '🌸' },
  { id: 2, season: 'SS25', name: 'LOOK 02', bg: '#FF8C00', emoji: '🌞' },
  { id: 3, season: 'SS25', name: 'LOOK 03', bg: '#ADFF2F', emoji: '🌿' },
  { id: 4, season: 'FW24', name: 'LOOK 04', bg: '#4169E1', emoji: '❄️' },
  { id: 5, season: 'FW24', name: 'LOOK 05', bg: '#8B4513', emoji: '🍂' },
  { id: 6, season: 'FW24', name: 'LOOK 06', bg: '#696969', emoji: '🌫️' },
];

export default function LookbookPage() {
  const router = useRouter();
  return (
    <PageTransition>
      <main className="min-h-screen bg-[#8A2BE2] p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/')}
            className="btn-sketch bg-white px-4 py-2 mb-6 text-sm font-black"
          >
            ← BACK TO WORLD
          </button>

          <h1
            className="text-6xl font-black mb-2 wobble"
            style={{ fontFamily: "'Comic Sans MS', cursive", textShadow: '4px 4px 0 #111', color: 'white' }}
          >
            📖 LOOKBOOK
          </h1>
          <p
            className="text-lg font-bold mb-8 text-white"
            style={{ fontFamily: "'Comic Sans MS', cursive" }}
          >
            Seasonal collections · KidSuper FW24 / SS25
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LOOKS.map((look) => (
              <div
                key={look.id}
                className="bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[8px_8px_0px_#111] hover:shadow-[3px_3px_0px_#111] hover:translate-x-1.5 hover:translate-y-1.5 transition-all cursor-pointer group"
              >
                <div
                  className="w-full h-64 flex items-center justify-center text-9xl border-b-4 border-black transition-transform group-hover:scale-105"
                  style={{ backgroundColor: look.bg }}
                >
                  {look.emoji}
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <span
                      className="stamp text-xs"
                      style={{ fontFamily: "'Comic Sans MS', cursive", color: '#FF4500' }}
                    >
                      {look.season}
                    </span>
                    <p
                      className="font-black text-xl mt-2"
                      style={{ fontFamily: "'Comic Sans MS', cursive" }}
                    >
                      {look.name}
                    </p>
                  </div>
                  <button className="btn-sketch px-3 py-2 text-sm font-black bg-black text-white">
                    VIEW →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
