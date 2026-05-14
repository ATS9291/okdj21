'use client';

import PageTransition from '@/components/PageTransition';
import { useRouter } from 'next/navigation';

const ARTWORKS = [
  { id: 1, title: 'Brooklyn Dreams', year: '2024', bg: '#FF00FF', emoji: '🌆' },
  { id: 2, title: 'Color Theory', year: '2024', bg: '#00FFFF', emoji: '🎨' },
  { id: 3, title: 'Street Life', year: '2023', bg: '#FFD700', emoji: '🏙' },
  { id: 4, title: 'Super World', year: '2023', bg: '#FF4500', emoji: '🌍' },
  { id: 5, title: 'Neon Nights', year: '2025', bg: '#8A2BE2', emoji: '🌃' },
  { id: 6, title: 'Kid Vision', year: '2025', bg: '#00FF7F', emoji: '👁' },
];

export default function GalleryPage() {
  const router = useRouter();
  return (
    <PageTransition>
      <main className="min-h-screen bg-[#00CED1] p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/')}
            className="btn-sketch bg-white px-4 py-2 mb-6 text-sm font-black"
          >
            ← BACK TO WORLD
          </button>

          <h1
            className="text-6xl font-black mb-2 wobble"
            style={{ fontFamily: "'Comic Sans MS', cursive", textShadow: '4px 4px 0 #111' }}
          >
            🖼 GALLERY
          </h1>
          <p
            className="text-lg font-bold mb-8"
            style={{ fontFamily: "'Comic Sans MS', cursive" }}
          >
            Art from KidSuper universe
          </p>

          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {ARTWORKS.map((art, i) => (
              <div
                key={art.id}
                className="break-inside-avoid bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[6px_6px_0px_#111] hover:shadow-[2px_2px_0px_#111] hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
              >
                <div
                  className="w-full flex items-center justify-center text-7xl border-b-4 border-black"
                  style={{
                    backgroundColor: art.bg,
                    height: i % 3 === 0 ? '180px' : i % 3 === 1 ? '140px' : '200px',
                  }}
                >
                  {art.emoji}
                </div>
                <div className="p-3">
                  <p
                    className="font-black text-sm"
                    style={{ fontFamily: "'Comic Sans MS', cursive" }}
                  >
                    {art.title}
                  </p>
                  <p
                    className="text-xs font-bold"
                    style={{ fontFamily: "'Comic Sans MS', cursive", color: '#888' }}
                  >
                    {art.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
