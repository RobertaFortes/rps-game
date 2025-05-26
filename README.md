# Rock Paper Scissors Betting Game

A simple Rock, Paper, Scissors web app built with React, TypeScript, and Zustand. Players start with a balance and can place bets on one or two positions. The game resolves a random outcome and pays out based on configurable multipliers.

 ## Project Structure

    src/
    ├── components/           # React UI components
    │   ├── BetButton/
    │   ├── GameControls/
    │   ├── GameScreen/
    │   ├── Header/
    │   └── PlayClearButton/
    ├── domain/               # Pure game logic and types
    │   ├── gameLogic.ts
    │   └── resolveRound.ts
    ├── store/                # Zustand store
    │   └── gameStore.ts
    ├── utils/                # Utility functions
    │   ├── pickPlayerTitleChoice.ts
    │   └── randomChoice.ts
    ├── assets/               # Static assets (icons, images)
    ├── setupTests.ts         # Testing environment setup
    └── index.html, main.tsx  # App entrypoint

## Getting Started

### Prerequisites
```sh
Node.js ≥ 16
npm
```

### Installation

#### Install dependencies
```sh
npm install
```

#### Development
```sh
npm run dev
```
> Open http://localhost:5173 in your browser

#### Production Build
```sh
npm run build
```

#### Preview locally:
```sh
npm run preview
```

### Testing

Unit tests are written with Vitest and React Testing Library

#### Run tests once
```sh
npm test
```
#### Watch mode
```sh
npm test:watch
```

## Tech Stack

	•	Framework: React
	•	Language: TypeScript (strict)
	•	State: Zustand
	•	Bundler: Vite
	•	Testing: Vitest, React Testing Library
	•	Styling: plain CSS