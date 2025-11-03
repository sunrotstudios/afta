# afta

> "You down?"

A fluid, modern social calendar for friends who actually want to make plans happen.

## Vision

afta captures the spontaneity of real-world connection — making it easy, fast, and fun for friends to sync up in the moment. It feels alive, fluid, and effortless to use.

## Design Philosophy

Inspired by:
- **Things 3** - Ultra-smooth motion, lightweight transitions, tactile feel
- **Untitled** - Clean, quiet, minimal, intentional
- **The Face** - Bold typography, editorial confidence, cultural edge

Result: Restrained yet expressive. Timeless yet current. Motion that guides, not distracts.

## Features

- 📅 **Shared Calendar** - See when everyone's free. Sync calendars. Make plans that actually happen.
- 👥 **Friend Circles** - Organize by group. Keep your work friends and weekend crew separate.
- 💬 **Built-in Chat** - Every plan gets its own thread. No more lost messages.
- 📊 **Availability Polls** - Find when everyone's actually down.
- 🎯 **Bucket Lists** - Save ideas. Turn "we should do that" into actual plans.
- 🔔 **Activity Feed** - Stay in the loop. See what friends are up to.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (fluid, spring-based)
- **State:** Zustand
- **UI:** Radix UI (headless, accessible)
- **Database:** Supabase (real-time, auth)
- **Dates:** date-fns

## Design System

**Colors:**
- Refined charcoal palette (not black/white)
- Subtle violet accent for energy moments
- Warm, intentional tones

**Typography:**
- System fonts (SF Pro, Segoe UI)
- Tight tracking on headlines
- Mix of weights for hierarchy

**Motion:**
- Spring animations (cubic-bezier(0.34, 1.56, 0.64, 1))
- Smooth easing (cubic-bezier(0.16, 1, 0.3, 1))
- 200ms transitions
- Tactile interactions (scale, hover)

**Shapes:**
- Soft rounded corners (xl, 2xl)
- Subtle shadows
- Clean borders
- Generous whitespace

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── ui/          # Base UI components (fluid, tactile)
│   ├── calendar/    # Calendar components
│   ├── chat/        # Chat components
│   └── layout/      # Layout components
├── lib/             # Utils and helpers
├── hooks/           # Custom React hooks
├── stores/          # Zustand stores
└── types/           # TypeScript types
```

## Development Principles

- **Clarity first** - Every element carefully placed
- **Responsive always** - Seamless cross-platform
- **Motion with purpose** - Guide, don't distract
- **Modular & clean** - Easy to extend

---

Built for friends who are actually down.
