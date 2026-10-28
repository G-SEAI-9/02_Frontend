// Fallback-Error-Boundary für alle Routen ohne eigene error.tsx
'use client';
export default function GlobalErrorBoundary({ error, retry }: { error: unknown; retry: () => void }) {
  return <div>Global Error</div>;
}
