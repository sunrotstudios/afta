# HOWBOUT

A brutalist social calendar app for planning with friends. Built with bold typography, heavy borders, and unapologetic contrast.

## FEATURES

- **SHARED CALENDAR** - Sync and share calendars with friends
- **FRIEND GROUPS** - Organize events with different friend circles
- **GROUP CHAT** - Built-in chat for every plan
- **AVAILABILITY POLLS** - Find when everyone is free
- **BUCKET LISTS** - Track things you want to do together
- **ACTIVITY FEED** - Stay updated on friends' plans
- **PRIVACY CONTROLS** - Choose who sees what

## TECH STACK

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **State Management:** Zustand
- **Database:** Supabase
- **Date Handling:** date-fns

## DESIGN PHILOSOPHY

Brutalist design aesthetic with:
- **Bold, uppercase typography** - Large headings with tight tracking
- **High contrast** - Pure black and white color palette
- **Heavy borders** - Thick 2px black borders everywhere
- **Geometric shapes** - Angular, no-nonsense layouts
- **Quick transitions** - Snappy 100ms animations
- **Active feedback** - Translate effects on interaction
- **Brutalist scrollbars** - Custom black scrollbars for consistency

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
│   ├── ui/          # Base UI components
│   ├── calendar/    # Calendar-specific components
│   ├── chat/        # Chat components
│   └── layout/      # Layout components
├── lib/             # Utilities and helpers
├── hooks/           # Custom React hooks
├── stores/          # Zustand stores
└── types/           # TypeScript types
```

## Development

Built with love for seamless social planning.
