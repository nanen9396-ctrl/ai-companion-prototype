create table if not exists devices (
  id text primary key,
  user_id text not null references users(id) on delete cascade,
  device_name text not null,
  device_type text not null,
  status text not null default 'off',
  location text,
  external_device_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists devices_user_id_idx on devices(user_id);
create unique index if not exists devices_user_name_idx on devices(user_id, lower(device_name));
