export type CategoryId = 'doenjang' | 'sundubu' | 'sukyuk' | 'byeolmi';
export type MenuItem = { name: string; desc: string; price?: string };
export type Category = {
  id: CategoryId;
  label: string;
  en: string;
  image: string;
  tagline: string;
  items: MenuItem[];
};

export const CATEGORIES: Category[] = [
  {
    id: 'doenjang',
    label: '된장전골',
    en: 'DOENJANG JJEONGOL',
    image: '/menu-된장전골.jpg',
    tagline: '20년 숙성 항아리 된장 베이스',
    items: [
      { name: '된장 버섯전골', desc: '국내산 버섯과 항아리 된장으로 끓인 깊고 구수한 전골', price: '22,000원 (2인)' },
      { name: '된장 두부전골', desc: '국산 두부를 넉넉히 넣어 담백하게 끓인 된장 전골', price: '20,000원 (2인)' },
      { name: '된장 해물전골', desc: '싱싱한 해물과 된장이 어우러지는 시원하고 깊은 전골', price: '26,000원 (2인)' },
      { name: '된장 쇠고기전골', desc: '국내산 쇠고기와 묵은 된장의 진한 풍미가 가득한 전골', price: '28,000원 (2인)' },
    ],
  },
  {
    id: 'sundubu',
    label: '순두부전골',
    en: 'SUNDUBU JJEONGOL',
    image: '/menu-순두부전골.png',
    tagline: '부드러운 순두부와 해물의 조화',
    items: [
      { name: '해물 순두부전골', desc: '싱싱한 해물과 부드러운 순두부가 어우러진 얼큰한 전골', price: '24,000원 (2인)' },
      { name: '버섯 순두부전골', desc: '다양한 버섯과 순두부를 넣어 끓인 담백하고 깊은 전골', price: '22,000원 (2인)' },
      { name: '김치 순두부전골', desc: '잘 익은 김치와 부드러운 순두부가 어우러진 얼큰한 전골', price: '22,000원 (2인)' },
      { name: '낙지 순두부전골', desc: '통통한 낙지와 순두부를 넣어 끓인 해물 순두부 전골', price: '26,000원 (2인)' },
    ],
  },
  {
    id: 'sukyuk',
    label: '수육전골',
    en: 'SUYUK JJEONGOL',
    image: '/menu-수육전골.png',
    tagline: '국내산 수육과 된장의 깊은 맛',
    items: [
      { name: '차돌박이 된장전골', desc: '차돌박이와 묵은 된장으로 끓인 풍부하고 진한 전골', price: '30,000원 (2인)' },
      { name: '삼겹 수육전골', desc: '부드럽게 삶은 삼겹수육과 된장 육수의 조화로운 전골', price: '26,000원 (2인)' },
      { name: '돼지 수육전골', desc: '담백하게 삶은 돼지수육과 구수한 된장 육수의 전골', price: '24,000원 (2인)' },
      { name: '수육 모둠전골', desc: '다양한 수육을 한 자리에서 즐기는 푸짐한 모둠 전골', price: '32,000원 (2인)' },
    ],
  },
  {
    id: 'byeolmi',
    label: '별미차림',
    en: 'BYEOLMI CHARIM',
    image: '/menu-별미차림.jpg',
    tagline: '계절 재료로 차린 별미 한상',
    items: [
      { name: '옥된장 정식', desc: '된장찌개, 순두부, 구이, 밑반찬이 함께하는 푸짐한 정식', price: '15,000원' },
      { name: '쌈밥 정식', desc: '직접 담근 된장과 쌈채소, 6가지 밑반찬이 함께하는 정식', price: '13,000원' },
      { name: '미나리전 상차림', desc: '향긋한 미나리전과 된장찌개, 밥, 밑반찬 한 상차림', price: '14,000원' },
      { name: '청국장 정식', desc: '직접 띄운 청국장찌개와 구이, 밑반찬이 함께하는 정식', price: '11,000원' },
    ],
  },
];
