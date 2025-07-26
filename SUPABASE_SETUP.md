# 🚀 Supabase Migration Setup Guide

This guide will help you set up the UPro Soccer Platform database using Supabase migrations, whether you're working locally or deploying to production.

## 📋 Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
- A Supabase account and project
- Node.js and npm installed
- Git access to this repository

## 🛠️ Supabase CLI Installation

### Option 1: npm (Recommended)

```bash
npm install -g supabase
```

### Option 2: Homebrew (macOS)

```bash
brew install supabase/tap/supabase
```

### Option 3: Direct Download

Visit [Supabase CLI releases](https://github.com/supabase/cli/releases) and download for your platform.

### Verify Installation

```bash
supabase --version
```

## 🏗️ Initial Setup

### 1. Create a New Supabase Project

1. Visit [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Set project name: `upro-soccer-platform`
5. Set a strong database password (save this!)
6. Choose your preferred region

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
   - **Project Reference ID** (e.g., `abcdefgh`)
   - **anon public key** (long JWT token)

### 3. Set Up Environment Variables

Create `.env` in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_PROJECT_ID=your-project-id
```

**⚠️ Important**: Replace the placeholder values with your actual Supabase credentials.

## 🔄 Migration Workflow

### Option A: Fresh Setup (New Project)

If you're setting up a completely new project:

#### 1. Login to Supabase CLI

```bash
supabase login
```

#### 2. Link Your Project (make sure that is in the same folder that your project is)

```bash
supabase link
```

Then select your project in the terminal

#### 3. Push the Migration

```bash
supabase db push
```

_(Should show no differences if everything worked)_

## 📊 Using the Seed Data

Our migration includes comprehensive seed data for development and testing.

### What's Included:

- **Store Items**: Avatars, banners, equipment, power-ups
- **Badges**: Achievement system with XP thresholds
- **Training Sessions**: Soccer drills and skill development
- **Sample Clubs**: Various types of soccer clubs

### 1. Deploy Migration

```bash
# Link to production project
supabase link

# Push migration
supabase db push --linked
```

### 2. Verify Data is there

1. Check your Supabase dashboard
2. Verify all tables are created (in the sidebar look for `Table Editor`)

## 🔧 Useful Commands

### Supabase Commands

```bash
# Connect to account
supabase login

# Link folder to the project
supabase link

# Create a new migration
supabase migration new migration_name

# Push migrations to remote
supabase db push

# Pull remote schema to local
supabase db pull
```

## 🐛 Troubleshooting

### Common Issues

#### "Project not found" Error

```bash
# Re-link your project
supabase link --project-ref your-project-id
```

#### Migration Conflicts

```bash
# Pull latest remote state
supabase db pull

# Resolve conflicts manually, then
supabase db push
```

#### Permission Denied

```bash
# Check you're logged in
supabase status

# Re-login if needed
supabase login
```

## 🔄 Team Workflow

### For New Team Members:

1. Clone repository
2. Install Supabase CLI
3. Set up environment variables
4. Run `supabase link --project-ref team-project-id`
5. Run `supabase db reset` for local development

### For Existing Team Members:

1. Pull latest changes
2. Run `supabase db pull` to sync schema changes
3. Run `supabase db reset` if needed

---

**Need Help?** Contact the development team or check our internal documentation for project-specific guidelines.
