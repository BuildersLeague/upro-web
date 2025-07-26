# Builders Next UPro

A modern Next.js application built with TypeScript, Supabase authentication, and Tailwind CSS for the Builders League UPro Soccer platform.

## Getting Started

### Prerequisites

- [Node.js 18.0 or later](https://nodejs.org/en/download)
- npm, yarn, or pnpm package manager
- A Supabase account

### Installation

1. **Fork the Repository**

   Fork this repository from the original source at `BuildersLeague/upro-web` to your own GitHub account.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/upro-web.git
   cd upro-web
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **shadcn/ui Setup**

   The project uses shadcn/ui for UI components with the "new-york" style variant. The components are already configured via `components.json` and available in the `src/components/ui/` directory. If you need to add new components:

   ```bash
   npx shadcn@latest add [component-name]
   ```

### Supabase Setup

> 📋 **Quick Setup**: Check out our detailed [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) guide (recommended if you want to use CLI, if not the one below works fine)

1. **Create a Supabase Account**

   Visit [supabase.com](https://supabase.com) and create a free account.

2. **Create a New Project**
   - Click "New Project"
   - Choose your organization
   - Enter a project name
   - Create a secure database password
   - Select a region close to your users

3. **Get Your Environment Variables**

   Navigate to your project settings:
   - Go to Settings > API
   - Copy your Project URL
   - Copy your anon/public key

4. **Setup schema**

   In your supabase project:
   - On the left side bar open `SQL Editor`
   - Click new SQL Snippet
   - Paste the contents of the [schema](https://raw.githubusercontent.com/BuildersLeague/upro-web/refs/heads/main/supabase_schema.sql)
   - Click run at the bottom right

5. **Setup database sample data**

   In your supabase project:
   - On the left side bar open `SQL Editor`
   - Click new SQL Snippet (or click the new tab button near the `Tab Title`)
   - Paste the contents of the [seed file](https://raw.githubusercontent.com/BuildersLeague/upro-web/refs/heads/main/seed_data.sql)
   - Click run at the bottom right

### Environment Configuration

1. **Create Environment File**

   Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

2. **Configure Environment Variables**

   Edit `.env.local` with your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Running the Application

1. **Development Mode**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Production Build**

   ```bash
   npm run build
   npm run start
   ```

## Project Structure

### File Organization

```
src/
├── app/                    # Next.js App Router pages
│   ├── (protected)/       # Protected routes requiring authentication
│   │   ├── dashboard/     # User dashboard
│   │   ├── profile/       # User profile management
│   │   ├── settings/      # Application settings
│   │   └── data-demo/     # Data demonstration page
│   ├── auth/              # Authentication pages
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── auth/             # Authentication-related components
│   └── ui/               # Base UI components (buttons, cards, etc.)
├── contexts/             # React contexts for state management
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries and configurations
├── providers/            # React providers
└── types/                # TypeScript type definitions
```

### Protected vs Public Routes

**Protected Routes** (`/src/app/(protected)/`)

- Require user authentication
- Automatically redirect to auth page if not logged in
- Include: dashboard, profile, settings, data-demo

**Public Routes**

- Accessible without authentication
- Include: home page, auth page

## Technology Stack

### Core Framework

- **Next.js 15.4.3** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety and developer experience

### Authentication & Database

- **Supabase** - Backend as a service with authentication
- **@supabase/supabase-js** - Supabase JavaScript client

### State Management & Data Fetching

- **@tanstack/react-query** - Server state management
- **@tanstack/react-query-devtools** - Development tools for React Query
- **@tanstack/react-table** - Table building library
- **Axios** - HTTP client for API requests

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library built on Tailwind CSS
- **Lucide React** - Icon library
- **class-variance-authority** - CSS class variants
- **clsx & tailwind-merge** - Conditional CSS classes

### Development Tools

- **ESLint** - Code linting
- **@eslint/eslintrc** - ESLint configuration
- **eslint-config-next** - Next.js specific ESLint rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality
- **lint-staged** - Run linters on staged files

### Utilities

- **Zod** - Schema validation
- **UUID** - Unique identifier generation
- **dotenv** - Environment variable management

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint code analysis
- `npm run lint:fix` - Run ESLint and automatically fix issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted

## Code Quality & Git Hooks

This project uses Husky for Git hooks to ensure code quality:

### Pre-commit Hook

- Runs `lint-staged` on staged files
- Automatically fixes ESLint issues and formats code with Prettier
- Only processes files that are staged for commit

### Pre-push Hook

- Runs full lint check on the entire codebase
- Verifies all files are properly formatted
- Prevents pushing if there are linting errors or formatting issues

### Manual Commands

```bash
# Format all files
npm run format

# Check formatting without changing files
npm run format:check

# Run linting and fix issues
npm run lint:fix
```

## Authentication Flow

The application uses Supabase for authentication with the following flow:

1. Users can sign up or log in through the `/auth` page
2. Authentication state is managed through `AuthContext`
3. Protected routes use the `useRequireAuth` hook to verify authentication
4. Unauthenticated users are redirected to the auth page

## Development Guidelines

1. **Component Structure**: Follow the established pattern of separating UI components from business logic
2. **Type Safety**: Use TypeScript interfaces and types defined in `src/types/`
3. **State Management**: Use React Query for server state and React Context for client state
4. **Styling**: Use Tailwind CSS classes and maintain consistency with the design system
5. **Authentication**: Always protect sensitive routes using the provided authentication hooks

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes locally
5. Submit a pull request

## Support

For issues and questions, please open an issue in the repository or contact the Builders League team.
