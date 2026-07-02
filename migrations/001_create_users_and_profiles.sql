create table if not exists users (
  id text primary key,
  activation_code text unique not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists user_profiles (
  user_id text primary key references users(id) on delete cascade,
  nickname text,
  location text,
  conversation_style text,
  updated_at timestamptz not null default now()
);

create table if not exists activation_codes (
  code text primary key,
  assigned_user_id text references users(id) on delete set null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);
