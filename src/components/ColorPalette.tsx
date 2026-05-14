'use client';

import { useState } from 'react';

const PALETTE = [
  '#FF0000', '#FF4500', '#FF8C00', '#FFD700', '#FFFF00',
  '#ADFF2F', '#00FF00', '#00FA9A', '#00CED1', '#00BFFF',
  '#0000FF', '#8A2BE2', '#FF00FF', '#FF69B4', '#FF1493',
  '#FFFFFF', '#D3D3D3', '#A9A9A9', '#696969', '#000000',
  '#F5E6C8', '#8B7355', '#D2691E', '#8B4513', '#5C3317',
  '#87CEEB', '#4169E1', '#228B22', '#006400', '#FF6B35',
];

interface ColorPaletteProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  onReset: () => void;
}

export default function ColorPalette({ selectedColor, onColorSelect, onReset }: ColorPaletteProps) {
  const [customColor, setCustomColor] = useState('#FF0000');

  return (
    <div
      style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive" }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 bg-white border-4 border-black rounded-2xl p-3 shadow-[6px_6px_0px_#000] flex flex-col gap-2 w-[160px]"
    >
      <p className="text-center text-sm font-black leading-tight">🎨 PICK COLOR</p>

      <div className="grid grid-cols-5 gap-1">
        {PALETTE.map((color) => (
          <button
            key={color}
            onClick={() => onColorSelect(color)}
            className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-125 active:scale-95"
            style={{
              backgroundColor: color,
              borderColor: selectedColor === color ? '#000' : '#666',
              transform: selectedColor === color ? 'scale(1.3)' : undefined,
              boxShadow: selectedColor === color ? '0 0 0 2px white, 0 0 0 4px black' : undefined,
            }}
          />
        ))}
      </div>

      <div className="flex items-center gap-1 mt-1">
        <label className="text-xs font-bold">CUSTOM:</label>
        <input
          type="color"
          value={customColor}
          onChange={(e) => {
            setCustomColor(e.target.value);
            onColorSelect(e.target.value);
          }}
          className="w-8 h-8 rounded border-2 border-black cursor-pointer"
        />
      </div>

      <div
        className="w-full h-8 rounded-lg border-2 border-black flex items-center justify-center text-xs font-black"
        style={{ backgroundColor: selectedColor, color: isLight(selectedColor) ? '#000' : '#fff' }}
      >
        ACTIVE
      </div>

      <button
        onClick={onReset}
        className="w-full py-1 text-xs font-black bg-red-400 border-2 border-black rounded-lg hover:bg-red-500 active:translate-y-0.5 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] transition-all"
      >
        RESET ALL
      </button>
    </div>
  );
}

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}
