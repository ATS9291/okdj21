import type { Metadata } from "next";
import "./globals.css";
import PostHogInit from '@/components/PostHogInit';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://okdj21.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '옥된장양재점 | 양재역점심 양재역회식 양재역맛집',
    template: '%s | 옥된장양재점',
  },
  description: '양재역 1번출구 도보 7분. 10년 묵은 항아리 된장으로 끓인 깊은 맛. 국내산 재료로 정직하게, 매일 같은 맛으로. 양재역 점심·회식 추천 된장찌개·청국장·순두부찌개·전골·미나리전 전문점.',
  keywords: ['옥된장', '옥된장양재점', '된장찌개', '청국장', '한식당', '전통 된장', '순두부찌개', '미나리전', '한국 음식', '된장', '양재역맛집', '양재역점심', '양재역회식', '양재동맛집', '양재역한식', '서초구맛집', '서초동맛집', '양재역된장찌개', '양재역한정식', '양재역근처맛집'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '옥된장양재점',
    title: '옥된장양재점 | 양재역점심 양재역회식 양재역맛집',
    description: '양재역 1번출구 도보 7분. 10년 묵은 항아리 된장으로 끓인 깊은 맛. 국내산 재료로 정직하게, 매일 같은 맛으로.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '옥된장양재점 | 양재역점심 양재역회식 양재역맛집',
    description: '양재역 1번출구 도보 7분. 10년 묵은 항아리 된장으로 끓인 깊은 맛. 국내산 재료로 정직하게, 매일 같은 맛으로.',
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
  name: '옥된장양재점',
  alternateName: ['옥된장 양재점', '양재역 된장찌개', '양재역 한식당', '양재동 된장집'],
  description: '양재역 1번출구 도보 7분. 10년 묵은 항아리 된장으로 끓인 깊은 맛. 국내산 재료로 정직하게, 매일 같은 맛으로. 양재역 점심·회식 추천 된장찌개·청국장·순두부찌개·전골·미나리전 전문점.',
  url: SITE_URL,
  image: `${SITE_URL}/옥된장메인.svg`,
  servesCuisine: ['한식', 'Korean', '된장찌개', '청국장', '순두부찌개'],
  priceRange: '₩₩',
  currenciesAccepted: 'KRW',
  paymentAccepted: '현금, 신용카드',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '서운로6길 29, 1층',
    addressLocality: '서초구',
    addressRegion: '서울특별시',
    postalCode: '06750',
    addressCountry: 'KR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.4848,
    longitude: 127.0337,
  },
  hasMap: 'https://kko.to/양재역옥된장',
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
  name: '옥된장양재점',
  description: '양재역 1번출구 도보 7분. 양재역 점심·회식 맛집, 정직한 한국 전통 된장 요리 전문점.',
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
        text: '옥된장양재점은 전통 한식 된장 요리 전문점으로, 된장찌개, 청국장, 순두부찌개, 전골, 미나리전 등을 제공합니다. 20년 이상 직접 숙성시킨 항아리 된장을 사용하는 것이 특징입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '옥된장양재점 위치는 어디인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '서울특별시 서초구 서운로6길 29, 1층에 위치합니다. 지하철 3호선 양재역 1번출구에서 도보 약 7분 거리입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '양재역 근처 점심 맛집을 추천해 주세요.',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '양재역 1번출구에서 도보 7분 거리의 옥된장양재점을 추천드립니다. 9,000원대 된장찌개·청국장 등 합리적인 가격에 국내산 재료로 만든 건강한 한식을 즐길 수 있어 양재역 직장인 점심 맛집으로 인기입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '양재역 회식 장소로 좋은 한식당이 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '옥된장양재점은 양재역 인근 회식 장소로 적합합니다. 전골(2인 15,000원~20,000원)과 미나리전 등 단체 메뉴가 있으며, 온라인 예약으로 좌석을 미리 확보하실 수 있습니다.',
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
        <PostHogInit />
        {children}
      </body>
    </html>
  );
}
