# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
This is "Traxbox", a React Native movie discovery app built with Expo and styled with NativeWind (Tailwind CSS). The app fetches movie data from The Movie Database (TMDB) API and features a tab-based navigation structure.

## Development Commands

### Setup and Installation
```bash
# Install dependencies
npm install

# Start the development server
npm start
# or
npx expo start
```

### Platform-specific Development
```bash
# Run on Android emulator/device
npm run android
# or
npx expo start --android

# Run on iOS simulator/device  
npm run ios
# or
npx expo start --ios

# Run on web
npm run web
# or
npx expo start --web
```

### Code Quality
```bash
# Run linter
npm run lint
# or
npx expo lint

# Reset project (moves starter code to app-example)
npm run reset-project
```

### Testing Individual Components
To test specific screens or components during development:
- Navigate to specific routes using Expo dev tools
- Use React DevTools for component inspection
- Test on multiple platforms simultaneously

## Architecture Overview

### File-based Routing Structure
The app uses Expo Router with file-based routing:
- `app/_layout.tsx` - Root layout with navigation stack
- `app/(tabs)/` - Tab-based navigation screens
  - `index.tsx` - Home screen with trending movies
  - `search.tsx` - Movie search functionality
  - `saved.tsx` - Saved movies
  - `profile.tsx` - User profile
- `app/movies/[id].tsx` - Dynamic movie details screen

### Key Architectural Patterns

#### Service Layer
- `services/api.ts` - TMDB API configuration and movie fetching logic
- `services/useFetch.ts` - Generic React hook for API calls with loading/error states

#### Type System
- `interfaces/interfaces.d.ts` - TypeScript interfaces for Movie, MovieDetails, TrendingMovie
- Global type definitions accessible throughout the app

#### Component Structure
- `components/MovieCard.tsx` - Reusable movie display component
- `components/SearchBar.tsx` - Search input component
- Components follow Movie interface props structure

#### Styling Architecture
- NativeWind (Tailwind CSS for React Native) integration
- Custom color palette defined in `tailwind.config.js`
- Global styles in `app/global.css`
- Metro config handles NativeWind compilation

### State Management
- React hooks for local state management
- Custom `useFetch` hook for API state (loading, error, data)
- No global state management library (Redux/Zustand) currently implemented

### Navigation Pattern
- Expo Router for declarative routing
- Tab navigation with custom tab bar styling
- Stack navigation for movie details overlay

## Environment Setup

### Required Environment Variables
```bash
EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

### Development Dependencies
- TypeScript for type safety
- ESLint with Expo config for code quality
- Babel configuration with NativeWind and worklets support

## API Integration
- TMDB API for movie data
- Bearer token authentication
- Image URLs constructed with TMDB's image service
- Search and discover endpoints implemented

## Key Configuration Files
- `app.json` - Expo configuration including app metadata, plugins, and build settings
- `metro.config.js` - Metro bundler with NativeWind integration
- `babel.config.js` - Babel presets for Expo and NativeWind
- `tsconfig.json` - TypeScript config with path mapping for `@/` imports

## Development Notes
- App name in config is "traxbox" but folder is "mobile_movie_app"
- Uses Expo SDK 54 with new architecture enabled
- Supports iOS, Android, and web platforms
- Custom tab bar with highlight animation for active states
- Image handling through expo-image for better performance