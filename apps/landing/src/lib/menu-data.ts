export type CategoryId = 'doenjang' | 'sundubu' | 'sukyuk' | 'byeolmi';
export type PriceTier = { label: string; price: string };
export type MenuItem = { name: string; desc: string; price?: string; prices?: PriceTier[] };
export type Category = {
  id: CategoryId;
  label: string;
  en: string;
  image: string;
  imagePosition?: string;
  imageScale?: number;
  tagline: string;
  items: MenuItem[];
};

export const CATEGORIES: Category[] = [
  {
    id: 'doenjang',
    label: '된장전골',
    en: 'DOENJANG JJEONGOL',
    image: '/menu-된장전골-detail.jpg',
    imagePosition: '30% 70%',
    tagline: '50년 비밀 된장 레시피',
    items: [
      { name: '들깨미역 된장전골', desc: '들깨와 미역을 넣어 끓인 고소하고 구수한 된장전골', price: '12,000원' },
      { name: '소고기삼겹 된장전골', desc: '소고기와 삼겹살을 넣어 끓인 진하고 풍부한 된장전골', price: '13,000원' },
      { name: '우렁 된장전골', desc: '우렁을 넣어 끓인 담백하고 깊은 된장전골', price: '13,000원' },
      { name: '오징어 된장전골', desc: '오징어를 넣어 끓인 쫄깃하고 시원한 된장전골', price: '13,000원' },
      { name: '표고버섯 된장전골', desc: '표고버섯을 넣어 끓인 향긋하고 구수한 된장전골', price: '13,000원' },
      { name: '스지 된장전골', desc: '소 힘줄을 넣어 끓인 진하고 깊은 된장전골', price: '13,000원' },
      { name: '바지락 된장전골', desc: '바지락을 넣어 끓인 시원하고 감칠맛 나는 된장전골', price: '13,000원' },
    ],
  },
  {
    id: 'sundubu',
    label: '순두부전골',
    en: 'SUNDUBU JJEONGOL',
    image: '/menu-순두부전골-detail.jpg',
    imageScale: 1.20,
    tagline: '칼칼함과 부드러움의 만남',
    items: [
      { name: '바지락 순두부전골', desc: '바지락을 넣어 끓인 시원하고 감칠맛 나는 순두부전골', price: '13,000원' },
      { name: '소고기삼겹 순두부전골', desc: '소고기와 삼겹살을 넣어 끓인 진하고 풍부한 순두부전골', price: '13,000원' },
      { name: '우렁 순두부전골', desc: '우렁을 넣어 끓인 담백하고 깊은 순두부전골', price: '13,000원' },
      { name: '오징어 순두부전골', desc: '오징어를 넣어 끓인 쫄깃하고 시원한 순두부전골', price: '13,000원' },
      { name: '표고버섯 순두부전골', desc: '표고버섯을 넣어 끓인 향긋하고 부드러운 순두부전골', price: '13,000원' },
      { name: '스지 순두부전골', desc: '소 힘줄을 넣어 끓인 진하고 깊은 순두부전골', price: '14,000원' },
    ],
  },
  {
    id: 'sukyuk',
    label: '수육전골',
    en: 'SUYUK JJEONGOL',
    image: '/menu-수육전골-detail.jpg',
    imagePosition: 'center 42%',
    tagline: '술안주 겸 해장까지 가능한 혜자메뉴',
    items: [
      { name: '모둠수육전골', desc: '다양한 수육을 한 자리에서 즐기는 푸짐한 전골', prices: [{ label: '소', price: '25,000원' }, { label: '중', price: '38,000원' }, { label: '대', price: '55,000원' }] },
      { name: '소갈비수육전골', desc: '소갈비를 넣어 끓인 깊고 진한 수육전골', prices: [{ label: '중', price: '55,000원' }, { label: '대', price: '85,000원' }] },
      { name: '소꼬리전골', desc: '소꼬리를 넣어 끓인 진하고 풍부한 전골', prices: [{ label: '중', price: '65,000원' }, { label: '대', price: '95,000원' }] },
    ],
  },
  {
    id: 'byeolmi',
    label: '별미차림',
    en: 'BYEOLMI CHARIM',
    image: '/menu-별미차림-detail.jpg',
    imagePosition: 'center 55%',
    tagline: '안먹어본 사람은 있어도 한번먹어본사람은 없는 메뉴',
    items: [
      { name: '오징어미나리전', desc: '오징어와 향긋한 미나리를 넣어 부친 바삭한 전', price: '20,000원' },
      { name: '보리새우미나리전', desc: '보리새우와 미나리를 넣어 고소하게 부친 전', price: '17,000원' },
      { name: '우렁미나리전', desc: '우렁과 미나리를 넣어 담백하게 부친 전', price: '15,000원' },
      { name: '오징어제육두루치기', desc: '오징어와 제육을 넣어 매콤하게 볶은 두루치기', price: '29,000원' },
      { name: '불스지볶음', desc: '스지를 넣어 매콤하게 볶은 안주', price: '15,000원' },
      { name: '소고기삼겹두부김치', desc: '소고기, 삼겹살과 잘 익은 김치를 두부와 함께 볶은 요리', price: '15,000원' },
      { name: '모둠수육무침', desc: '다양한 수육을 새콤달콤 양념에 버무린 무침', price: '25,000원' },
      { name: '오징어미나리초무침', desc: '오징어와 미나리를 새콤달콤하게 버무린 초무침', price: '22,000원' },
    ],
  },
];
