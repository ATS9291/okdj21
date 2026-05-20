-- reservations 테이블
create table if not exists reservations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  date text not null,
  time text not null,
  party_size int not null,
  notes text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- blog_posts 테이블
create table if not exists blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  category text not null,
  excerpt text,
  content text not null,
  cover_image_url text,
  published boolean default false,
  created_at timestamptz default now()
);

-- anon 키로 insert/select 허용 (RLS 비활성화)
alter table reservations disable row level security;
alter table blog_posts disable row level security;
