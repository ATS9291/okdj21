'use client';

import PageTransition from '@/components/PageTransition';
import { useRouter } from 'next/navigation';

const ITEMS = [
  { id: 1, name: 'Brooklyn Hoodie', price: '$120', color: '#FF6B35', emoji: '🧥' },
  { id: 2, name: 'KidSuper Cap', price: '$55', color: '#00CED1', emoji: '🧢' },
  { id: 3, name: 'World Tee', price: '$75', color: '#FFD700', emoji: '👕' },
  { id: 4, name: 'Art Jacket', price: '$280', color: '#8A2BE2', emoji: '🎨' },
  { id: 5, name: 'Paint Pants', price: '$160', color: '#FF1493', emoji: '👖' },
  { id: 6, name: 'NYC Bag', price: '$90', color: '#00FF7F', emoji: '👜' },
];

export default function ShopPage() {
  const router = useRouter();
  return (
    <PageTransition>
      <main className="min-h-screen bg-[#FF6B35] p-6">
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
            🛍 SHOP
          </h1>
          <p
            className="text-lg font-bold mb-8"
            style={{ fontFamily: "'Comic Sans MS', cursive" }}
          >
            Fresh drops from the KidSuper World
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white border-4 border-black rounded-2xl p-4 shadow-[6px_6px_0px_#111] hover:shadow-[2px_2px_0px_#111] hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
              >
                <div
                  className="w-full h-32 rounded-xl border-3 border-black flex items-center justify-center text-5xl mb-3"
                  style={{ backgroundColor: item.color }}
                >
                  {item.emoji}
                </div>
                <p
                  className="font-black text-base leading-tight"
                  style={{ fontFamily: "'Comic Sans MS', cursive" }}
                >
                  {item.name}
                </p>
                <p
                  className="font-bold text-lg mt-1"
                  style={{ fontFamily: "'Comic Sans MS', cursive", color: '#FF4500' }}
                >
                  {item.price}
                </p>
                <button className="btn-sketch w-full mt-2 py-1 text-xs font-black bg-black text-white">
                  ADD TO CART
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
