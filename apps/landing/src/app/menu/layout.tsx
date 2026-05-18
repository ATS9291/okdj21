import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://okdoenjang.com';

export const metadata: Metadata = {
  title: '메뉴',
  description: '옥된장 대표 메뉴 - 된장찌개, 청국장, 순두부찌개, 전골, 미나리전. 모두 국내산 재료로 정직하게 만든 한식.',
  openGraph: {
    title: '옥된장 메뉴',
    description: '된장찌개, 청국장, 순두부찌개, 전골, 미나리전. 국내산 재료로 정직하게 만든 한식 메뉴.',
    url: `${SITE_URL}/menu`,
  },
  alternates: {
    canonical: `${SITE_URL}/menu`,
  },
};

const menuSchema = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  '@id': `${SITE_URL}/menu#menu`,
  name: '옥된장 메뉴',
  url: `${SITE_URL}/menu`,
  inLanguage: 'ko-KR',
  hasMenuSection: [
    {
      '@type': 'MenuSection',
      '@id': `${SITE_URL}/menu#section-doenjang`,
      name: '된장',
      description: '직접 담근 10년 묵은 항아리 된장으로 만든 정통 된장 메뉴',
      hasMenuItem: [
        {
          '@type': 'MenuItem',
          name: '옥된장찌개',
          description: '10년 묵은 항아리 된장으로 끓인 깊은 맛의 찌개. 두부와 호박이 어우러집니다.',
          offers: { '@type': 'Offer', price: '9000', priceCurrency: 'KRW' },
          suitableForDiet: 'https://schema.org/VegetarianDiet',
        },
        {
          '@type': 'MenuItem',
          name: '청국장찌개',
          description: '직접 띄운 청국장으로 끓인 구수하고 진한 찌개입니다.',
          offers: { '@type': 'Offer', price: '9000', priceCurrency: 'KRW' },
          suitableForDiet: 'https://schema.org/VegetarianDiet',
        },
        {
          '@type': 'MenuItem',
          name: '된장 비빔밥',
          description: '제철 나물과 묵은 된장 소스를 곁들인 정갈한 비빔밥.',
          offers: { '@type': 'Offer', price: '10000', priceCurrency: 'KRW' },
          suitableForDiet: 'https://schema.org/VegetarianDiet',
        },
        {
          '@type': 'MenuItem',
          name: '된장 쌈밥 정식',
          description: '직접 담근 된장과 쌈채소, 밑반찬이 함께 나오는 정식.',
          offers: { '@type': 'Offer', price: '13000', priceCurrency: 'KRW' },
        },
      ],
    },
    {
      '@type': 'MenuSection',
      '@id': `${SITE_URL}/menu#section-soondubu`,
      name: '순두부',
      description: '부드러운 국내산 순두부로 만든 찌개와 덮밥',
      hasMenuItem: [
        {
          '@type': 'MenuItem',
          name: '해물 순두부찌개',
          description: '싱싱한 해물과 부드러운 순두부가 만나는 얼큰하고 시원한 찌개.',
          offers: { '@type': 'Offer', price: '10000', priceCurrency: 'KRW' },
        },
        {
          '@type': 'MenuItem',
          name: '버섯 순두부찌개',
          description: '다양한 버섯을 넣어 깊은 풍미를 낸 순두부찌개.',
          offers: { '@type': 'Offer', price: '9500', priceCurrency: 'KRW' },
          suitableForDiet: 'https://schema.org/VegetarianDiet',
        },
        {
          '@type': 'MenuItem',
          name: '순두부 덮밥',
          description: '부드러운 순두부와 양념장을 밥 위에 올린 간편한 한 그릇 요리.',
          offers: { '@type': 'Offer', price: '9000', priceCurrency: 'KRW' },
          suitableForDiet: 'https://schema.org/VegetarianDiet',
        },
      ],
    },
    {
      '@type': 'MenuSection',
      '@id': `${SITE_URL}/menu#section-jeongol`,
      name: '전골',
      description: '깊은 육수에 끓이는 전골 요리 (2인 기준)',
      hasMenuItem: [
        {
          '@type': 'MenuItem',
          name: '버섯 전골',
          description: '표고·느타리·팽이버섯을 가득 넣어 끓인 깔끔한 전골.',
          offers: { '@type': 'Offer', price: '16000', priceCurrency: 'KRW' },
          suitableForDiet: 'https://schema.org/VegetarianDiet',
        },
        {
          '@type': 'MenuItem',
          name: '두부 전골',
          description: '국내산 두부와 각종 채소를 넣어 끓이는 담백한 전골.',
          offers: { '@type': 'Offer', price: '15000', priceCurrency: 'KRW' },
          suitableForDiet: 'https://schema.org/VegetarianDiet',
        },
        {
          '@type': 'MenuItem',
          name: '된장 해물 전골',
          description: '묵은 된장 육수에 해물과 두부를 풍성하게 담은 전골.',
          offers: { '@type': 'Offer', price: '20000', priceCurrency: 'KRW' },
        },
      ],
    },
    {
      '@type': 'MenuSection',
      '@id': `${SITE_URL}/menu#section-minari`,
      name: '미나리전',
      description: '향긋한 미나리를 활용한 계절 메뉴',
      hasMenuItem: [
        {
          '@type': 'MenuItem',
          name: '미나리전',
          description: '향긋한 미나리를 듬뿍 넣어 노릇하게 구운 계절 전. 막걸리와 찰떡 궁합.',
          offers: { '@type': 'Offer', price: '11000', priceCurrency: 'KRW' },
          suitableForDiet: 'https://schema.org/VegetarianDiet',
        },
        {
          '@type': 'MenuItem',
          name: '미나리 해물파전',
          description: '미나리와 신선한 해물이 어우러진 바삭한 파전.',
          offers: { '@type': 'Offer', price: '13000', priceCurrency: 'KRW' },
        },
        {
          '@type': 'MenuItem',
          name: '미나리 도토리묵무침',
          description: '탱글한 도토리묵과 미나리를 새콤달콤하게 무친 반찬.',
          offers: { '@type': 'Offer', price: '8000', priceCurrency: 'KRW' },
          suitableForDiet: 'https://schema.org/VegetarianDiet',
        },
        {
          '@type': 'MenuItem',
          name: '미나리 나물',
          description: '데친 미나리를 들기름에 무친 담백하고 향긋한 나물.',
          offers: { '@type': 'Offer', price: '5000', priceCurrency: 'KRW' },
          suitableForDiet: 'https://schema.org/VegetarianDiet',
        },
      ],
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: '메뉴', item: `${SITE_URL}/menu` },
  ],
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
