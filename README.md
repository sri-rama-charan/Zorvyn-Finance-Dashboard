# Zorvyn Dashboard

Zorvyn is a finance dashboard UI built with React and Vite. It includes a responsive layout, rich data visuals, and a light/dark theme driven by CSS variables.

## Features

- Dashboard overview with KPIs, balances, spend limits, and charts
- Transactions table with filters, pagination, and edit actions
- Insights views with comparisons, heatmaps, and observations
- Admin/Viewer roles with modal-based edits
- Theme toggle (light/dark) persisted in localStorage

## Tech Stack

- React 19 + React Router
- Vite
- Tailwind CSS
- d3-shape for custom chart paths

## Getting Started

```bash
npm install
npm run dev
```

Open the dev server URL printed in the terminal.

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Structure

```
src/
	components/        # UI components (dashboard, insights, transactions)
	context/           # App state context (theme, role, data)
	data/              # Sample data
	hooks/             # Data/logic helpers
	pages/             # Route pages
	utils/             # Formatting utilities
	index.css          # Global styles + theme variables
```

## Theming

- Theme is stored in localStorage under `zorvyn-theme`.
- The root `dark` class is applied on initial load to avoid flash.
- UI colors are driven by `--app-*` CSS variables in [src/index.css](src/index.css).

## Notes

- This is a UI-focused project with local sample data (no backend).
- Routes include `/`, `/transactions`, and `/insights`.
