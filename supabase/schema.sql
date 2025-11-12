-- Supabase schema that matches the Prisma schema

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Users table
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password text not null,
  name text not null,
  role text default 'USER',
  avatar text,
  bio text,
  location text,
  website text,
  linkedin text,
  twitter text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Pages table
create table if not exists pages (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  content text not null,
  meta_title text,
  meta_desc text,
  published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  author_id uuid references users(id)
);

-- Navigation table
create table if not exists navigation (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  href text,
  order integer default 0,
  parent_id uuid references navigation(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- AI Tools table
create table if not exists ai_tools (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text not null,
  category text not null,
  icon text,
  url text,
  tags text not null,
  featured boolean default false,
  usage_count integer default 0,
  rating numeric default 0,
  review_count integer default 0,
  last_updated timestamp with time zone default now(),
  pricing_model text,
  monthly_price numeric,
  annual_price numeric,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  author_id uuid references users(id)
);

-- Form Submissions table
create table if not exists form_submissions (
  id uuid primary key default uuid_generate_v4(),
  form_type text not null,
  data jsonb not null,
  created_at timestamp with time zone default now()
);

-- Settings table
create table if not exists settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Course Categories table
create table if not exists course_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  icon text not null,
  color text not null,
  created_at timestamp with time zone default now()
);

-- Courses table
create table if not exists courses (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  instructor text not null,
  duration text not null,
  level text not null,
  category_id uuid references course_categories(id),
  thumbnail_url text,
  video_url text,
  price numeric default 0,
  rating numeric default 0,
  students_count integer default 0,
  is_published boolean default false,
  created_by uuid references users(id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Course Lessons table
create table if not exists course_lessons (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references courses(id) on delete cascade,
  title text not null,
  description text not null,
  video_url text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enrollments table
create table if not exists enrollments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  course_id uuid references courses(id),
  progress integer default 0,
  completed boolean default false,
  enrolled_at timestamp with time zone default now(),
  unique(user_id, course_id)
);

-- AI Enrollments table
create table if not exists ai_enrollments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  tool_id uuid references ai_tools(id),
  name text not null,
  email text not null,
  phone text not null,
  linkedin text,
  aadhar text not null,
  pan text not null,
  message text,
  is_verified boolean default false,
  is_paid boolean default false,
  transaction_id text,
  progress integer default 0,
  last_accessed timestamp with time zone default now(),
  certificate_issued boolean default false,
  certificate_url text,
  enrolled_at timestamp with time zone default now()
);

-- Reviews table
create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  tool_id uuid references ai_tools(id),
  course_id uuid references courses(id),
  rating integer not null,
  title text not null,
  content text not null,
  helpful_count integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Learning Paths table
create table if not exists learning_paths (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  category text not null,
  difficulty text not null,
  duration text not null,
  thumbnail text,
  is_published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Learning Path Steps table
create table if not exists learning_path_steps (
  id uuid primary key default uuid_generate_v4(),
  path_id uuid references learning_paths(id),
  title text not null,
  description text not null,
  order_num integer not null,
  content_type text not null,
  content_url text,
  duration integer,
  is_mandatory boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Learning Path Enrollments table
create table if not exists learning_path_enrollments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  path_id uuid references learning_paths(id),
  progress integer default 0,
  completed boolean default false,
  enrolled_at timestamp with time zone default now(),
  completed_at timestamp with time zone,
  unique(user_id, path_id)
);

-- Skills table
create table if not exists skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  category text,
  difficulty text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Lessons table
create table if not exists lessons (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  content text,
  order_num integer not null,
  duration integer,
  video_url text,
  course_id uuid references courses(id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- User Progress table
create table if not exists user_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  lesson_id uuid references lessons(id),
  course_id uuid references courses(id),
  progress integer default 0,
  completed boolean default false,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Achievements table
create table if not exists achievements (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  icon text,
  criteria text,
  created_at timestamp with time zone default now()
);

-- User Stats table
create table if not exists user_stats (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) unique,
  total_courses_completed integer default 0,
  total_lessons_completed integer default 0,
  total_hours_learned integer default 0,
  current_streak integer default 0,
  longest_streak integer default 0,
  last_active_date timestamp with time zone,
  achievements text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Affiliate table
create table if not exists affiliates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) unique,
  affiliate_code text unique,
  commission_rate numeric default 0.1,
  total_earnings numeric default 0,
  total_referrals integer default 0,
  is_active boolean default true,
  joined_at timestamp with time zone default now(),
  last_payment_date timestamp with time zone
);

-- Affiliate Referrals table
create table if not exists affiliate_referrals (
  id uuid primary key default uuid_generate_v4(),
  affiliate_id uuid references affiliates(id),
  referred_user_id uuid references users(id),
  referred_email text,
  commission_earned numeric default 0,
  commission_paid boolean default false,
  referral_date timestamp with time zone default now(),
  conversion_date timestamp with time zone
);

-- Affiliate Payouts table
create table if not exists affiliate_payouts (
  id uuid primary key default uuid_generate_v4(),
  affiliate_id uuid references affiliates(id),
  amount numeric not null,
  payment_method text,
  payment_details text,
  status text default 'pending',
  payout_date timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Blog Posts table
create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  featured_image text,
  author_id uuid references users(id),
  published boolean default false,
  published_at timestamp with time zone,
  tags text,
  views integer default 0,
  likes integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Email Templates table
create table if not exists email_templates (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  subject text not null,
  body text not null,
  type text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Leads table
create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  name text,
  source text,
  status text default 'new',
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Email Sequence Subscribers table
create table if not exists email_sequence_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  sequence_id text not null,
  status text default 'active',
  subscribed_at timestamp with time zone default now(),
  unsubscribed_at timestamp with time zone
);

-- User Notes table
create table if not exists user_notes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  title text not null,
  content text,
  is_private boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- User Bookmarks table
create table if not exists user_bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  title text not null,
  url text not null,
  description text,
  created_at timestamp with time zone default now()
);

-- Referrals table
create table if not exists referrals (
  id uuid primary key default uuid_generate_v4(),
  referrer_id uuid references users(id),
  referred_id uuid references users(id),
  referred_email text,
  reward_points integer default 0,
  claimed boolean default false,
  created_at timestamp with time zone default now()
);

-- Projects table
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  user_id uuid references users(id),
  status text default 'draft',
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  budget numeric,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Project Files table
create table if not exists project_files (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id),
  name text not null,
  url text not null,
  type text,
  size integer,
  uploaded_at timestamp with time zone default now()
);

-- Marketplace Listings table
create table if not exists marketplace_listings (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  price numeric not null,
  user_id uuid references users(id),
  category_id text,
  status text default 'active',
  views integer default 0,
  likes integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Creative Assets table
create table if not exists creative_assets (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  url text not null,
  type text not null,
  tags text,
  user_id uuid references users(id),
  downloads integer default 0,
  likes integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- User Verification table
create table if not exists user_verification (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) unique,
  document_type text not null,
  document_url text not null,
  status text default 'pending',
  verified_at timestamp with time zone,
  rejected_reason text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Business Partners table
create table if not exists business_partners (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  company text,
  website text,
  phone text,
  address text,
  partnership_type text,
  start_date timestamp with time zone default now(),
  end_date timestamp with time zone,
  is_active boolean default true,
  notes text
);

-- AI Agents table
create table if not exists ai_agents (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  capabilities text,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Component Listings table
create table if not exists component_listings (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  code text,
  preview_url text,
  category_id text,
  user_id uuid references users(id),
  downloads integer default 0,
  likes integer default 0,
  is_public boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- User Reputation table
create table if not exists user_reputation (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) unique,
  points integer default 0,
  level text default 'beginner',
  badges text,
  last_updated timestamp with time zone default now()
);

-- Code Reviews table
create table if not exists code_reviews (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id),
  reviewer_id uuid references users(id),
  code_url text not null,
  comments text,
  rating integer,
  status text default 'pending',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Analytics table
create table if not exists analytics (
  id uuid primary key default uuid_generate_v4(),
  entity_type text not null,
  entity_id text not null,
  views integer default 0,
  unique_views integer default 0,
  conversion_rate numeric,
  last_viewed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Domains table
create table if not exists domains (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  user_id uuid references users(id),
  status text default 'active',
  expires_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Security table
create table if not exists security (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) unique,
  two_factor_enabled boolean default false,
  backup_codes text,
  last_login_at timestamp with time zone,
  login_attempts integer default 0,
  locked_until timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Code table
create table if not exists code (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  content text not null,
  language text not null,
  user_id uuid references users(id),
  is_public boolean default false,
  views integer default 0,
  likes integer default 0,
  forks integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create indexes for better performance
create index if not exists idx_users_email on users(email);
create index if not exists idx_pages_slug on pages(slug);
create index if not exists idx_ai_tools_name on ai_tools(name);
create index if not exists idx_ai_tools_category on ai_tools(category);
create index if not exists idx_courses_category on courses(category_id);
create index if not exists idx_courses_published on courses(is_published);
create index if not exists idx_enrollments_user on enrollments(user_id);
create index if not exists idx_enrollments_course on enrollments(course_id);
create index if not exists idx_ai_enrollments_tool on ai_enrollments(tool_id);
create index if not exists idx_reviews_rating on reviews(rating);
create index if not exists idx_blog_posts_slug on blog_posts(slug);
create index if not exists idx_user_notes_user on user_notes(user_id);
create index if not exists idx_user_bookmarks_user on user_bookmarks(user_id);