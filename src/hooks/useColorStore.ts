import { useState, useCallback, useEffect } from 'react';

export type ColorMap = Record<string, string>;

const STORAGE_KEY = 'kidsuper-building-colors';

const DEFAULT_COLORS: ColorMap = {
  'sky': '#87CEEB',
  'ground': '#8B7355',
  'building-main': '#F5E6C8',
  'building-shadow': '#E8D5A3',
  'roof-main': '#D4453B',
  'roof-trim': '#8B0000',
  'door-frame': '#5C3317',
  'door-panel': '#8B4513',
  'door-glass': '#87CEEB',
  'window-1': '#87CEEB',
  'window-2': '#87CEEB',
  'window-3': '#87CEEB',
  'window-4': '#87CEEB',
  'window-5': '#87CEEB',
  'window-6': '#87CEEB',
  'sign-board': '#FF6B35',
  'sign-text-bg': '#FFF',
  'fire-escape': '#666666',
  'water-tower': '#B8860B',
  'awning': '#CC2200',
  'sidewalk': '#C0B090',
  'flower-pot-1': '#FF4444',
  'flower-pot-2': '#FF8844',
  'graffiti-1': '#FF00FF',
  'graffiti-2': '#00FFFF',
  'graffiti-3': '#FFFF00',
  'pillar-left': '#DDD',
  'pillar-right': '#DDD',
  'balcony': '#AAA',
  'chimney': '#888',
};

export function useColorStore() {
  const [colors, setColors] = useState<ColorMap>(DEFAULT_COLORS);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setColors({ ...DEFAULT_COLORS, ...JSON.parse(saved) });
      } catch {}
    }
  }, []);

  const setZoneColor = useCallback((zoneId: string, color: string) => {
    setColors(prev => {
      const next = { ...prev, [zoneId]: color };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetColors = useCallback(() => {
    setColors(DEFAULT_COLORS);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { colors, setZoneColor, resetColors };
}
