# SoulStack // 32

## Overview

SoulStack // 32 is a personality assessment application that identifies users across 8 core archetypes (Seer, Architect, Sovereign, Guardian, Catalyst, Explorer, Weaver, Alchemist) and generates one of 32 possible subtype combinations based on dominant and secondary traits. Users complete a Likert-scale questionnaire across three layers, receive scored results, and can archive their sessions for future reference.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and bundling
- **Routing**: Hash-based routing (`useHashRoute` custom hook) for SPA navigation without server config
- **State Management**: React `useState`/`useMemo` for local component state; no external state library

### Application Structure
```
src/
├── core/           # Business logic and data
│   ├── data/       # Type definitions, archetypes, questions
│   ├── storage/    # LocalStorage persistence
│   ├── scoring.ts  # Assessment scoring algorithm
│   └── subtype.ts  # Subtype derivation logic
├── pages/          # Route-level components (Home, Test, Results, Library, Archive)
├── ui/             # Reusable UI components (Card, Button, Progress, etc.)
└── main.tsx        # App entry point
```

### Scoring System
- 8 core archetypes with associated questions across 3 layers (L1, L2, L3)
- Questions have polarity (+1/-1) affecting score calculation
- Dominant and secondary cores determined by sorting scores
- 32 subtypes generated as `${dominant}-${secondary}` combinations

### Data Persistence
- **Storage**: Browser LocalStorage only (no backend database)
- **Keys**: `soulstack.latestSession` for current result, `soulstack.archive` for history
- **Format**: JSON-serialized session objects with flexible schema

### Styling
- CSS custom properties (variables) for theming
- Dark theme with gradient backgrounds and glassmorphism effects
- No CSS framework; vanilla CSS in `styles.css`

## External Dependencies

### Runtime Dependencies
- `react` / `react-dom`: UI framework

### Dev Dependencies
- `vite`: Build tool and dev server
- `@vitejs/plugin-react`: React Fast Refresh support
- `typescript`: Type checking

### External Services
- None currently configured
- No backend API, database, or third-party integrations
- All data stored client-side in LocalStorage

## Deployment

To deploy this application on Replit:
1. **Build Command**: `npm install && npm run build`
2. **Run Command**: `npm start`
3. **Primary Port**: 5000 (for the frontend preview)

Note: This is a hybrid app with a Vite frontend and a simple Node.js server for potential future API expansion. For static-only deployment, use `dist` as the publish directory.