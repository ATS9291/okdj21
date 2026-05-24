import type { Metadata } from "next";
import "./globals.css";
import PostHogInit from '@/components/PostHogInit';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://okdj21.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '옥된장 양재점',
    template: '%s | 옥된장 양재점',
  },
  description: '10년 묵은 항아리 된장으로 끓인 깊은 맛. 국내산 재료로 정직하게, 매일 같은 맛으로. 된장찌개, 청국장, 순두부찌개, 전골, 미나리전 전문점.',
  keywords: ['옥된장', '된장찌개', '청국장', '한식당', '전통 된장', '순두부찌개', '미나리전', '한국 음식', '된장'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '옥된장',
    title: '옥된장 양재점',
    description: '10년 묵은 항아리 된장으로 끓인 깊은 맛. 국내산 재료로 정직하게, 매일 같은 맛으로.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '옥된장 양재점',
    description: '10년 묵은 항아리 된장으로 끓인 깊은 맛. 국내산 재료로 정직하게, 매일 같은 맛으로.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${SITE_URL}/#restaurant`,
  name: '옥된장',
  description: '10년 묵은 항아리 된장으로 끓인 깊은 맛. 국내산 재료로 정직하게, 매일 같은 맛으로. 된장찌개, 청국장, 순두부찌개, 전골, 미나리전 전문점.',
  url: SITE_URL,
  image: `${SITE_URL}/옥된장메인.svg`,
  servesCuisine: ['한식', 'Korean', '된장찌개', '청국장'],
  priceRange: '₩₩',
  currenciesAccepted: 'KRW',
  paymentAccepted: '현금, 신용카드',
  // NOTE: 아래 주소/전화번호를 실제 정보로 업데이트하세요
  // address: {
  //   '@type': 'PostalAddress',
  //   streetAddress: '실제 주소',
  //   addressLocality: '서울특별시',
  //   addressCountry: 'KR',
  // },
  // telephone: '+82-0-0000-0000',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '11:30',
      closes: '21:00',
    },
  ],
  hasMenu: `${SITE_URL}/menu`,
  acceptsReservations: `${SITE_URL}/reservation`,
  menu: `${SITE_URL}/menu`,
  sameAs: [
    'https://www.instagram.com/',
    'https://www.youtube.com/',
    'https://www.threads.net/',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: '옥된장',
  description: '정직한 한국 전통 된장 맛집',
  inLanguage: 'ko-KR',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '옥된장의 영업 시간은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '화요일~일요일 오전 11:30 ~ 오후 9:00 영업합니다. 매주 월요일은 정기 휴무입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '옥된장에서 예약이 가능한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 온라인 예약이 가능합니다. 홈페이지 예약 페이지에서 날짜, 시간, 인원을 선택하여 예약하실 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '옥된장의 대표 메뉴는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '10년 묵은 항아리 된장으로 끓인 옥된장찌개(9,000원), 직접 띄운 청국장찌개(9,000원), 해물 순두부찌개(10,000원), 미나리전(11,000원)이 대표 메뉴입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '옥된장의 재료는 어디서 구하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '모든 메뉴는 100% 국내산 재료를 사용합니다. 된장은 직접 20년 이상 숙성시킨 항아리 된장을 사용합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '옥된장의 가격대는 어떻게 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '단품 메뉴는 5,000원~13,000원, 전골류(2인)는 15,000원~20,000원 선입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '옥된장은 어떤 음식을 전문으로 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '옥된장은 전통 한식 된장 요리 전문점으로, 된장찌개, 청국장, 순두부찌개, 전골, 미나리전 등을 제공합니다. 20년 이상 직접 숙성시킨 항아리 된장을 사용하는 것이 특징입니다.',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <PostHogInit />
      </body>
    </html>
  );
}
