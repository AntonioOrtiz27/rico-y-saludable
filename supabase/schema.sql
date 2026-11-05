create table if not exists products (
  id bigint generated always as identity primary key,
  name text not null,
  category text not null,
  image_url text,
  prices jsonb not null default '{}',   -- {"250g": 5000, "1/2kg": 2200}
  active boolean not null default true,
  sort int not null default 0,
  updated_at timestamptz not null default now()
);
alter table products enable row level security;
create policy "lectura publica" on products for select using (true);
create policy "solo admin escribe" on products for all to authenticated using (true) with check (true);
