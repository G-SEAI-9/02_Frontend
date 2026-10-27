// Ein loading.tsx gilt für seinen Ordner und alle Unterordner.
// Dieses hier im app/-Ordner greift also überall, wo es kein näheres loading.tsx gibt (z. B. bei /about).
export default function loading() {
  return <div>WARTE MAL!</div>;
}
