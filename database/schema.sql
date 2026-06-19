create table if not exists public.wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  balance numeric(12,2) not null default 0,
  currency text not null default 'NGN',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null check (type in ('credit', 'debit')),
  amount numeric(12,2) not null,
  balance_before numeric(12,2) not null,
  balance_after numeric(12,2) not null,
  currency text not null default 'NGN',
  reference text not null unique,
  description text,
  status text not null default 'completed',
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  order_number text not null unique,
  status text not null default 'pending',
  payment_status text not null default 'pending',
  payment_method text not null default 'wallet',
  subtotal_amount numeric(12,2) not null,
  shipping_fee numeric(12,2) not null default 0,
  total_amount numeric(12,2) not null,
  currency text not null default 'NGN',
  shipping_address jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  product_name_snapshot text not null,
  image_url_snapshot text,
  category_snapshot text,
  unit_price numeric(12,2) not null,
  quantity integer not null check (quantity > 0),
  line_total numeric(12,2) not null,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  amount numeric(12,2) not null,
  currency text not null default 'NGN',
  payment_method text not null,
  provider text not null,
  provider_reference text not null unique,
  status text not null default 'completed',
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_cart_items_user_id on public.cart_items(user_id);
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_wallet_transactions_user_id on public.wallet_transactions(user_id);
create index if not exists idx_payments_user_id on public.payments(user_id);
