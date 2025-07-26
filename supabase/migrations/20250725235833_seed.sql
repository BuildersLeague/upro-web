-- Seed data for UPro Soccer Platform
-- This file contains sample data for development and testing

-- Store Items (Avatars, Profile Banners, Equipment, etc.)
INSERT INTO store_items (name, description, upro_gold_cost, is_active) VALUES
-- Avatars
('Classic Player Avatar', 'Traditional soccer player avatar with basic uniform', 50.0, true),
('Elite Striker Avatar', 'Premium striker avatar with golden boots', 150.0, true),
('Goalkeeper Pro Avatar', 'Professional goalkeeper avatar with gloves and gear', 120.0, true),
('Retro Legend Avatar', 'Vintage soccer legend style avatar', 200.0, true),
('Future Star Avatar', 'Futuristic soccer player avatar', 180.0, true),

-- Profile Banners
('Champions League Banner', 'Prestigious Champions League themed banner', 75.0, true),
('World Cup Glory Banner', 'World Cup championship celebration banner', 100.0, true),
('Local Hero Banner', 'Community soccer hero themed banner', 30.0, true),
('Rising Star Banner', 'Banner for up-and-coming players', 45.0, true),
('Team Captain Banner', 'Leadership themed banner', 80.0, true),

-- Training Equipment
('Pro Soccer Ball', 'Professional quality soccer ball for training', 25.0, true),
('Speed Cones Set', 'Set of 10 training cones for agility drills', 15.0, true),
('Goalkeeper Gloves', 'High-quality goalkeeper gloves', 35.0, true),
('Training Jersey', 'Moisture-wicking training jersey', 40.0, true),
('Shin Guards', 'Protective shin guards for safe play', 20.0, true),

-- Power-ups and Boosts
('XP Boost (2x)', 'Double experience points for 1 hour', 60.0, true),
('Training Boost', 'Enhanced training session rewards', 45.0, true),
('Gold Rush', 'Extra U-Pro Gold from completed activities', 75.0, true),
('Skill Accelerator', 'Faster skill progression for training', 90.0, true);

-- Badges for achievement system
INSERT INTO badges (xp_amount, name, description) VALUES
(0, 'First Steps', 'Welcome to UPro! Complete your first training session'),
(100, 'Getting Started', 'Earn your first 100 XP'),
(500, 'Training Enthusiast', 'Complete 10 training sessions'),
(1000, 'Dedicated Player', 'Reach 1,000 total XP'),
(2500, 'Rising Star', 'Achieve 2,500 XP and show real commitment'),
(5000, 'Elite Trainee', 'Reach 5,000 XP - you are becoming elite'),
(10000, 'Pro Level', 'Hit 10,000 XP - professional level achieved'),
(25000, 'Legend', 'Accumulate 25,000 XP - legendary status'),
(50000, 'Master', 'Reach 50,000 XP - true mastery of the game'),
(100000, 'Champion', 'Ultimate achievement: 100,000 XP');

-- Training Sessions (Soccer drills, skill tutorials, game tactics)
INSERT INTO training_sessions (title, description, experience_reward, duration_minutes) VALUES
-- Basic Skills
('Ball Control Basics', 'Learn fundamental ball control techniques with stationary ball exercises', 25.0, 15),
('First Touch Training', 'Improve your first touch with various receiving exercises', 30.0, 20),
('Passing Accuracy', 'Practice short and medium range passing with precision', 35.0, 25),
('Shooting Fundamentals', 'Master basic shooting technique and accuracy', 40.0, 30),

-- Intermediate Skills  
('Dribbling Moves', 'Learn essential dribbling moves to beat defenders', 45.0, 25),
('Crossing and Finishing', 'Practice crossing from wide positions and finishing in the box', 50.0, 35),
('Defensive Positioning', 'Learn proper defensive stance and positioning', 40.0, 30),
('Goalkeeper Basics', 'Fundamental goalkeeper training - catching, diving, distribution', 55.0, 40),

-- Advanced Skills
('Advanced Ball Mastery', 'Complex ball control exercises for advanced players', 60.0, 45),
('Tactical Awareness', 'Understanding field positioning and game reading', 65.0, 50),
('Set Piece Specialist', 'Master free kicks, corners, and penalty techniques', 70.0, 40),
('Speed and Agility', 'High-intensity training for pace and quick direction changes', 55.0, 35),

-- Team Tactics
('Formation Play', 'Learn different formations and their applications', 75.0, 60),
('Counter Attack', 'Master the art of quick counter-attacking football', 70.0, 50),
('Possession Football', 'Practice maintaining possession and patient build-up play', 80.0, 55),
('Pressing and High Line', 'Advanced defensive tactics - coordinated pressing', 85.0, 65);

-- Sample Clubs
INSERT INTO clubs (name, description) VALUES
('Barcelona Academy', 'Elite youth development program focused on technical skills and tactical understanding'),
('Manchester United Youth', 'Prestigious academy known for developing well-rounded players'),
('Local Soccer Club', 'Community-based club welcoming players of all skill levels'),
('Street Football Collective', 'Urban soccer community emphasizing creativity and flair'),
('Elite Performance Center', 'High-performance training facility for serious athletes'),
('Grassroots United', 'Inclusive club promoting soccer for everyone in the community'),
('Pro Development Academy', 'Professional pathway program for aspiring elite players'),
('Technical Skills Institute', 'Specialized training focused on ball mastery and technique');

-- Note: User data will be created when users sign up through the application
-- The accounts table will be populated automatically via the trigger when auth.users are created
-- Users, training results, friendships, etc. will be generated through app usage 