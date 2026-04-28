-- nexchat3 backend schema (Supabase)

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address text UNIQUE NOT NULL,
  username text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_seen timestamp with time zone
);

-- Messages table
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id uuid NOT NULL, -- references conversations(id)
  sender_address text NOT NULL, -- references users(wallet_address)
  receiver_address text NOT NULL, -- references users(wallet_address)
  content text,
  type text DEFAULT 'text', -- 'text' | 'tx' (transaction)
  tx_amount text, -- e.g. "0.5 ETH"
  tx_status text, -- e.g. 'pending', 'success', 'failed'
  tx_hash text,
  timestamp timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Conversations table (for 1on1 chats)
CREATE TABLE conversations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant_1 text NOT NULL, -- references users(wallet_address)
  participant_2 text NOT NULL, -- references users(wallet_address)
  last_message_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(participant_1, participant_2)
);

-- RLS (Row Level Security) Policies

-- Users: Anyone can read profiles
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON users FOR INSERT WITH CHECK (auth.uid()::text = wallet_address);
CREATE POLICY "Users can update their own profile" ON users FOR UPDATE USING (auth.uid()::text = wallet_address);

-- Messages: Only participants can read or insert messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Participants can read messages" ON messages FOR SELECT 
  USING (sender_address = auth.uid()::text OR receiver_address = auth.uid()::text);
CREATE POLICY "Participants can insert messages" ON messages FOR INSERT 
  WITH CHECK (sender_address = auth.uid()::text);

-- Enable realtime features for messages
begin; 
  drop publication if exists supabase_realtime; 
  create publication supabase_realtime; 
commit;
alter publication supabase_realtime add table messages;
