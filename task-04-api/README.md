# WikiDash

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Architecture Overview](#architecture-overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Important Dependencies](#important-dependencies)
- [Design Decisions / Project Structure](#design-decisions--project-structure)
- [Screenshots / Demo](#screenshots--demo)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

WikiDash is a React + Vite dashboard that fetches live data from Wikipedia and Wikimedia APIs for a user-supplied page title. It presents a concise, searchable summary of page metadata, revision details, pageviews, links, backlinks, and language availability in a clean Tailwind-styled interface.

The app is frontend-only: it calls public APIs directly from the browser and does not use a custom backend or database.

## Key Features

- Search for any Wikipedia page title from a top search bar.
- Fetch page metadata such as page ID, page length, revision ID, protection status, and creation date.
- Show the page summary and thumbnail image from the Wikipedia REST API.
- Display the latest editor, unique editor count, and available language count.
- Plot pageviews for the last 30 days using a responsive area chart.
- Render scrollable lists of linked pages and backlinks.
- Include loading, empty, and error states for a smoother user experience.
- Support local development with Vite and optional Docker-based startup.

## Tech Stack

- **React 18** — UI and component structure
- **Vite 5** — development server and build tool
- **Tailwind CSS 3** — utility-first styling
- **Recharts** — pageviews chart
- **Lucide React** — icons
- **PostCSS + Autoprefixer** — CSS processing

## Folder Structure

```text
task-04-api/
├── Dockerfile
├── docker-compose.yml
├── index.html
├── index.css
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── components/
    │   ├── LinkedPagesList.jsx
    │   ├── PageViewsChart.jsx
    │   ├── SearchBar.jsx
    │   ├── StatsGrid.jsx
    │   └── SummarySection.jsx
    ├── hooks/
    │   └── useWikipediaData.js
    ├── services/
    │   └── wikipediaApi.js
    └── utils/
        └── formatters.js
```

### What each major folder does

- `src/components/` contains the presentational UI blocks for the dashboard.
- `src/hooks/` contains the custom hook that coordinates fetching and state.
- `src/services/` contains all Wikipedia/Wikimedia API calls.
- `src/utils/` contains formatting helpers for dates, numbers, bytes, and protection labels.
- The root config files define the build, styling, and local runtime setup.

## Architecture Overview

The application uses a simple data flow:

1. `App.jsx` keeps the search input state and decides which UI state to render.
2. When the user searches, `App.jsx` calls `search()` from `useWikipediaData.js`.
3. `useWikipediaData.js` runs all independent API calls in parallel with `Promise.all`.
4. `src/services/wikipediaApi.js` performs the actual requests to the Wikipedia and Wikimedia endpoints.
5. The returned data is merged into one dashboard object and passed down to the UI components.
6. Components render their section and use `src/utils/formatters.js` for human-friendly output.

This separation keeps the UI small, makes the API logic easy to update, and avoids mixing data fetching with rendering logic.

## Installation

### Prerequisites

- Node.js 18+ (Node 20 is also supported by the included Dockerfile)
- npm

### Local setup

```bash
git clone https://github.com/heyvarchas/tsg-web-sec-tasks.git
cd task-04-api
npm install
npm run dev
```

The app will start on:

```bash
http://localhost:3000
```

### Build for production

```bash
npm run build
npm run preview
```

### Run with Docker

The repository includes a Dockerfile and Docker Compose setup for local development.

```bash
docker compose up --build
```

Then open:

```bash
http://localhost:3000
```

## Configuration

### Environment variables

No environment variables are required for the current implementation.

### Build and runtime configuration

| File | Purpose |
| --- | --- |
| `vite.config.js` | Runs the dev server on port `3000` and opens the browser automatically. |
| `tailwind.config.js` | Adds the custom WikiDash color palette and fonts. |
| `postcss.config.js` | Enables Tailwind CSS and Autoprefixer. |
| `docker-compose.yml` | Builds the app container, maps port `3000`, and mounts the source for live development. |
| `Dockerfile` | Installs dependencies and starts the Vite dev server inside a container. |

### npm scripts

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `vite` | Starts the development server. |
| `build` | `vite build` | Creates a production build. |
| `preview` | `vite preview` | Serves the production build locally. |

## Usage

1. Enter a Wikipedia page title in the search bar, for example `Albert Einstein`.
2. Press **Enter** or click **Search**.
3. Wait for the dashboard to load.
4. Review the summary, statistics, pageviews chart, linked pages, and backlinks.
5. Use the **X** button in the search field to clear the current page and reset the dashboard.

## API Endpoints

WikiDash reads from public Wikipedia/Wikimedia APIs only.

| Data | Endpoint | Notes |
| --- | --- | --- |
| Page metadata, links, backlinks, contributors, languages | `https://en.wikipedia.org/w/api.php` | Used through MediaWiki query parameters. |
| Page summary and thumbnail | `https://en.wikipedia.org/api/rest_v1/page/summary/{title}` | Returns the intro extract and thumbnail image. |
| Pageviews (last 30 days) | `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/.../daily/.../...` | Daily pageview data for the English Wikipedia article. |

## Important Dependencies

- **react / react-dom** — core UI rendering.
- **recharts** — renders the pageviews area chart.
- **lucide-react** — search, clear, book, and loading icons.
- **vite** — fast development and production builds.
- **@vitejs/plugin-react** — JSX and React refresh support.
- **tailwindcss / postcss / autoprefixer** — styling pipeline.

## Design Decisions / Project Structure

- The project is intentionally frontend-only, so all data is fetched directly from public APIs without a backend.
- The dashboard is split into focused components (`SummarySection`, `StatsGrid`, `PageViewsChart`, and `LinkedPagesList`) to keep each section easy to maintain.
- The custom hook (`useWikipediaData`) centralizes loading and error handling, which keeps `App.jsx` focused on layout and state transitions.
- Parallel fetching improves responsiveness because independent API requests do not wait on one another.
- Utility functions in `src/utils/formatters.js` keep formatting rules consistent across the UI.
- The styling uses Tailwind CSS with a small set of custom classes in `index.css` for reusable card and list patterns.

## Screenshots / Demo

## Known Limitations

- The app currently targets **English Wikipedia** only.
- Linked pages and backlinks are limited to the first **100** items returned by the API.
- Unique editors are counted from the contributors endpoint with a limit of **500** entries, so very large pages may not be fully represented.
- Pageviews are calculated only for the **last 30 days**.
- There is no caching layer, so repeated searches always trigger fresh network requests.
- There is no test suite or lint script in the provided project files.

## Future Improvements

- Add pagination or “load more” support for linked pages and backlinks.
- Add search history or recently viewed pages.
- Cache API responses to reduce repeat requests.
- Support more robust error details and retry actions.
- Add automated tests and linting.
- Allow choosing other Wikipedia language editions.
- Add skeleton loaders or richer empty states.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-change
   ```
3. Make your changes and test them locally.
4. Commit with a clear message.
5. Open a pull request.

Please keep changes aligned with the existing architecture and avoid introducing unrelated dependencies.

## License

MIT License.

## Acknowledgements

- Wikipedia and Wikimedia APIs for the public data used by the dashboard.
- React, Vite, Tailwind CSS, Recharts, and Lucide React for the frontend tooling and UI primitives.
