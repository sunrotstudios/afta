# Howbout Web

A modern, sleek web-based social calendar app for planning with friends. Built with a focus on minimal design and smooth animations.

## Features

- 📅 **Shared Calendar** - Sync and share calendars with friends
- 👥 **Friend Groups** - Organize events with different friend circles
- 💬 **Group Chat** - Built-in chat for every plan
- 📊 **Availability Polls** - Find when everyone is free
- 🎯 **Bucket Lists** - Track things you want to do together
- 🔔 **Activity Feed** - Stay updated on friends' plans
- 🔒 **Privacy Controls** - Choose who sees what

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** Zustand
- **UI Components:** Radix UI
- **Database:** Supabase
- **Date Handling:** date-fns

## Design Philosophy

Inspired by Things 3 and [untitled] music app:
- Minimal, clean interface
- Smooth, quick animations (100-200ms)
- Generous whitespace
- Subtle shadows and borders
- Typography-focused design

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
