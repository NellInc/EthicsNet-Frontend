# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm install          # Install dependencies
npm start            # Start dev server on http://localhost:3000
npm run build        # Build for production (outputs to /build)
npm run preview      # Preview production build
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
```

Docker deployment:
```bash
docker build -t ethics-net-frontend .
docker run -p 80:80 ethics-net-frontend
```

## Architecture Overview

EthicsNet is a React application for annotating images and videos with ethical considerations. It uses Vite as the build tool.

### State Management

Global state uses React Context API with hooks (no Redux). The `Store.jsx` component wraps the app and provides:
- `IsLogged` - Authentication state (synced with localStorage)
- `Loading` - Global loading state
- `Notification` - Toast notifications via Sonner
- `ImageToSave` - Image data being processed
- `VideoInfoContext` - Video data being processed

### API Layer

`src/globals.jsx` exports a configured Axios instance with:
- Bearer token auth from `localStorage.token`
- Automatic error handling via interceptors
- Base URL switches between localhost (dev) and production server

### Routing

Uses React Router with HashRouter. Route protection is handled via wrapper components in `src/RoutesTypes/index.jsx`:
- `PrivateRoute` - Requires `localStorage.isLogged === 'true'`
- `PublicRoute` - Optional redirect for logged-in users when `restricted={true}`
- `AdminRoutes` - Checks `isAdmin` flag from API

### Styling Pattern

Uses `tss-react/mui` (makeStyles) with MUI v7. Each component folder typically has:
- `index.jsx` - Component logic
- `style.jsx` - Exports `useStyles` hook with component styles

Theme defined in `Store.jsx` with primary color `rgb(49, 54, 57)`.

### Testing

Uses Vitest with React Testing Library. Test files use `.test.jsx` extension. Setup file at `src/test/setup.js`.
