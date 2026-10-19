-- Enable pgcrypto for server-side envelope encryption
create extension if not exists pgcrypto;

create table if not exists public.user_api_credentials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  provider text not null check (provider in ('gemini', 'openai', 'anthropic', 'openrouter', 'groq')),
  encrypted_key bytea not null,
  updated_at timestamptz default now(),
  unique(user_id, provider)
);

alter table public.user_api_credentials enable row level security;

create policy "Users manage own encrypted keys"
  on public.user_api_credentials
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
