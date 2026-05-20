import { notFound } from 'next/navigation';
import { cache } from 'react';
import type { Metadata } from 'next';
import { supabase, type BlogPost } from '@/lib/supabase';
import BlogPostClient from './BlogPostClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://okdj21.com';

const getPost = cache(async (slug: string): Promise<BlogPost | null> => {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  return data ?? null;
});

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: '포스트를 찾을 수 없습니다' };

  const description = post.excerpt ?? post.content.slice(0, 160);

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.created_at,
      locale: 'ko_KR',
      images: post.cover_image_url ? [{ url: post.cover_image_url, alt: post.title }] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ?? post.content.slice(0, 160),
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.created_at,
    dateModified: post.created_at,
    inLanguage: 'ko-KR',
    author: {
      '@type': 'Organization',
      name: '옥된장',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: '옥된장',
      url: SITE_URL,
    },
    ...(post.cover_image_url && {
      image: { '@type': 'ImageObject', url: post.cover_image_url },
    }),
    keywords: post.category,
    articleSection: post.category,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: '블로그', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
