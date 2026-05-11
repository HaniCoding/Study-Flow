# StudyFlow AI - Production-Ready SaaS Platform

A modern, AI-powered learning platform built with Next.js 15, featuring premium UI/UX inspired by Linear, Notion, and Vercel.

## Features

- **AI-Powered Chat** - Chat with advanced AI models (Groq, Gemini, OpenRouter)
- **Smart Notes** - Create, organize, and enhance notes with AI
- **Quiz Generator** - Generate custom quizzes on any topic
- **Learning Analytics** - Track your progress with detailed insights
- **Multi-Language Support** - Translate content to Hindi and other languages
- **Premium UI/UX** - Modern, responsive design with smooth animations

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: Next.js Server Actions, REST APIs
- **Database**: Supabase PostgreSQL
- **Auth**: Clerk Authentication
- **AI**: Groq API, Gemini API, OpenRouter API
- **State**: Zustand
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Supabase account
- Clerk account
- API keys for Groq/Gemini/OpenRouter

### Environment Variables

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# AI APIs
GROQ_API_KEY=gsk_...
GEMINI_API_KEY=...
OPENROUTER_API_KEY=sk-or-v1-...
```

### Database Setup

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Run the SQL schema from `supabase/schema.sql` in the SQL Editor
4. Copy the URLs and keys to your `.env.local`

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/studyflow-ai.git
cd studyflow-ai

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
studyflow-ai/
├── app/
│   ├── (auth)/           # Authentication pages
│   ├── (dashboard)/      # Dashboard pages
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── dashboard/        # Dashboard components
│   ├── landing/           # Landing page components
│   ├── ui/               # Shadcn UI components
│   └── shared/            # Shared components
├── lib/
│   ├── actions/          # Server actions
│   ├── hooks/            # Custom hooks
│   ├── store/            # Zustand stores
│   └── utils/            # Utility functions
├── types/                # TypeScript types
└── supabase/             # Database schema
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- AWS Amplify
- Railway
- Render
- Fly.io

## API Routes

- `POST /api/chat` - Chat with AI
- `POST /api/notes` - Process notes (summarize, translate)
- `POST /api/quiz` - Generate quizzes
- `GET /api/analytics` - Fetch analytics data
- `POST /api/ai/stream` - Streaming AI responses

## Performance

- Server-side rendering
- Code splitting
- Lazy loading
- Image optimization
- SEO metadata
- Accessibility optimized

## Security

- Clerk authentication
- Protected routes
- API validation
- SQL injection prevention
- XSS protection
- Environment variable isolation

## Future Improvements

1. **AI Model Fine-tuning** - Fine-tune models for educational content
2. **Real-time Collaboration** - Multiple users on same notes
3. **Mobile App** - React Native or Flutter app
4. **Gamification** - Badges, streaks, leaderboards
5. **API Access** - Public API for developers
6. **White-labeling** - Custom branding options
7. **AI Tutor** - Personalized AI study plans

## Monetization Strategy

1. **Freemium Model**
   - Free: 50 messages/month, basic features
   - Pro ($12/mo): Unlimited access, advanced features
   - Team ($29/mo): Collaboration, admin tools

2. **Revenue Streams**
   - Subscription plans
   - API usage fees
   - Team licenses
   - Enterprise deals

3. **Growth Strategy**
   - University partnerships
   - Content partnerships
   - Referral program
   - SEO and content marketing

## License

MIT License - See LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

Built with passion for better learning. 🚀
