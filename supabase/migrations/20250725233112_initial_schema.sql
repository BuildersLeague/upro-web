-- The account that owns the profiles (a parent would make this while signing up)
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    auth_user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- If the account is premium or free
CREATE TABLE subscription_types (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL UNIQUE
);

INSERT INTO subscription_types (id, type) VALUES
(1, 'freemium'),
(2, 'premium');

-- Items users can buy
CREATE TABLE store_items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    upro_gold_cost FLOAT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT upro_gold_cost_check CHECK (upro_gold_cost >= 0.0)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    account_id INTEGER NOT NULL,
    gender TEXT NOT NULL,
    age_group INTEGER NOT NULL,
    weight FLOAT,
    height FLOAT,
    dominant_foot BOOLEAN, -- true == right foot, false == left foot
    playing_position TEXT, -- 'Forward', 'Midfielder', 'Defender', 'Goalkeeper' etc
    experience_total FLOAT DEFAULT 0.0 NOT NULL,
    subscription_type INTEGER DEFAULT 1 NOT NULL,
    upro_gold FLOAT DEFAULT 0.0 NOT NULL,
    profile_picture TEXT, -- put url here?
    equipped_avatar_id INT, -- The profiles 3d avatar
    equipped_profile_banner_id INT, -- Like Call of Duty calling card
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (subscription_type) REFERENCES subscription_types(id) ON DELETE RESTRICT,
    FOREIGN KEY (equipped_avatar_id) REFERENCES store_items(id) ON DELETE SET NULL,
    FOREIGN KEY (equipped_profile_banner_id) REFERENCES store_items(id) ON DELETE SET NULL,
    CONSTRAINT upro_gold_debt_check CHECK (upro_gold >= 0.0)
);

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    requester_id INTEGER NOT NULL,
    addressee_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'accepted', 'rejected', 'blocked'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (requester_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (addressee_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT no_self_friendship CHECK (requester_id != addressee_id),
    CONSTRAINT valid_friendship_status CHECK (status IN ('pending', 'accepted', 'rejected', 'blocked')),
    UNIQUE(requester_id, addressee_id)
);

-- Badges awarded at X amount of xp
CREATE TABLE badges (
    id SERIAL PRIMARY KEY,
    xp_amount FLOAT DEFAULT 0.0,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL
);

-- Its a soccer club...
CREATE TABLE clubs (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users will be associated to the clubs
CREATE TABLE club_members (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    club_id INTEGER NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role TEXT DEFAULT 'member', -- 'member', 'admin', 'owner'
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    UNIQUE(user_id, club_id)
);

-- Training sessions, Soccer dirlls, skill tutorials, Game Tactics
CREATE TABLE training_sessions (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    experience_reward FLOAT NOT NULL DEFAULT 0.0,
    duration_minutes INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT positive_xp CHECK (experience_reward >= 0.0)
);

-- How the user did for some training session
CREATE TABLE training_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    training_session_id INTEGER NOT NULL,
    xp_amount FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (training_session_id) REFERENCES training_sessions(id) ON DELETE CASCADE,
    CONSTRAINT positive_xp_result CHECK (xp_amount >= 0.0)
);

-- Badges the user currently has
CREATE TABLE user_badges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    badge_id INTEGER NOT NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE,
    UNIQUE(user_id, badge_id)
);

-- Purchases a user has made with the U-Pro marketplace
CREATE TABLE store_purchases (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    store_item_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    total_cost FLOAT NOT NULL,
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (store_item_id) REFERENCES store_items(id) ON DELETE RESTRICT,
    CONSTRAINT positive_quantity CHECK (quantity > 0),
    CONSTRAINT positive_cost CHECK (total_cost >= 0.0)
);







/*

THE BELOW SECTION IS NOT RELEVANT

*/
-- Account creation trigger
CREATE OR REPLACE FUNCTION public.handle_new_account()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.accounts (auth_user_id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ===============================
-- ROW LEVEL UTIL FUNCTIONS
-- ===============================

-- Trigger to run on new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_account();

-- Helper function to get current account ID
CREATE OR REPLACE FUNCTION public.get_current_account_id()
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT id FROM accounts
    WHERE auth_user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user belongs to current account
CREATE OR REPLACE FUNCTION public.user_belongs_to_account(user_id INTEGER)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users u
    JOIN accounts a ON u.account_id = a.id
    WHERE u.id = user_id AND a.auth_user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===============================
-- ROW LEVEL SECURITY POLICIES
-- ===============================

-- Enable RLS on all user-related tables
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_purchases ENABLE ROW LEVEL SECURITY;

-- Public tables (readable by all authenticated users)
ALTER TABLE subscription_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_sessions ENABLE ROW LEVEL SECURITY;

-- ACCOUNTS TABLE POLICIES
CREATE POLICY "Users can view own account" ON accounts
  FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own account" ON accounts
  FOR UPDATE USING (auth.uid() = auth_user_id);

-- USERS TABLE POLICIES
CREATE POLICY "Account owners can manage their users" ON users
  FOR ALL USING (account_id = get_current_account_id());

-- FRIENDSHIPS TABLE POLICIES
-- Users can see friendships involving their own users
CREATE POLICY "Account owners can manage friendships for their users" ON friendships
  FOR ALL USING (
    user_belongs_to_account(requester_id) OR
    user_belongs_to_account(addressee_id)
  );

-- CLUB MEMBERS TABLE POLICIES
CREATE POLICY "Account owners can manage club memberships for their users" ON club_members
  FOR ALL USING (user_belongs_to_account(user_id));

-- TRAINING RESULTS TABLE POLICIES
CREATE POLICY "Account owners can manage training results for their users" ON training_results
  FOR ALL USING (user_belongs_to_account(user_id));

-- USER BADGES TABLE POLICIES
CREATE POLICY "Account owners can view and manage badges for their users" ON user_badges
  FOR ALL USING (user_belongs_to_account(user_id));

-- STORE PURCHASES TABLE POLICIES
CREATE POLICY "Account owners can view and manage purchases for their users" ON store_purchases
  FOR ALL USING (user_belongs_to_account(user_id));

-- PUBLIC/REFERENCE TABLE POLICIES
-- These tables should be readable by all authenticated users

CREATE POLICY "Authenticated users can view subscription types" ON subscription_types
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view store items" ON store_items
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view badges" ON badges
  FOR SELECT USING (auth.role() = 'authenticated');

-- Clubs should be viewable by all, but manageable by admins/owners only
CREATE POLICY "Authenticated users can view clubs" ON clubs
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can create clubs" ON clubs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Training sessions should be viewable by all authenticated users
CREATE POLICY "Authenticated users can view training sessions" ON training_sessions
  FOR SELECT USING (auth.role() = 'authenticated');
