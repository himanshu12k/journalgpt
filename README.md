# TradingJournalApp

If you see this build error:

```
Failed to resolve import "recharts" from "src/TradingJournalApp.jsx"
```

it means the `recharts` package is not installed in your React project.

## Fix

```bash
npm install recharts
```

If your project also doesn't yet have React dependencies installed:

```bash
npm install react react-dom recharts
```

## Usage

1. Put `TradingJournalApp.jsx` inside your project's `src/` folder.
2. Import and render it from `src/main.jsx` or `src/App.jsx`.

Example:

```jsx
import TradingJournalApp from './TradingJournalApp';

export default function App() {
  return <TradingJournalApp />;
}
```
