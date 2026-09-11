// ============================================================
// Beispiel: zufälligen xkcd-Comic von einer API holen
// ============================================================

// Die beiden Elemente, mit denen wir arbeiten: der Container, in den der
// Comic gerendert wird, und der Button, der einen neuen Comic anfordert.
const containerEl = document.getElementById('comic-container');
const button = document.getElementById('get-comic');

// let rageClickCounter = 0

// ------------------------------------------------------------
// Anzeige-Funktionen (kein fetch – nur DOM)
// ------------------------------------------------------------

// Bekommt das fertige Daten-Objekt von der API und baut daraus HTML.
// Das Rendern bewusst getrennt vom Datenholen: eine Funktion, eine Aufgabe.
function renderComic(comicData) {
  // Destructuring: wir holen uns nur die Felder aus der API-Antwort,
  // die wir wirklich brauchen. Die Namen kommen von der API (deshalb safe_title).
  const { img, safe_title, alt, year, month, day } = comicData;

  console.log(year, month, day);

  const date = new Date(year, month, day);
  console.log(date);

  // Intl.DateTimeFormat formatiert das Datum passend zur Sprache des Browsers.
  // 'undefined' als Locale heißt: nimm die Einstellung des Nutzers.
  const formattedDate = Intl.DateTimeFormat(undefined).format(date);

  // Template Literal: wir bauen den HTML-String und setzen die Daten
  // mit ${...} an den richtigen Stellen ein.
  const html = `
        <figure class="h-full">
          <img class="h-full w-full" src="${img}"
            alt="${alt}" />
          <figcaption class="contain-inline-size flex justify-between">
            <span>${safe_title}</span>
            <time datetime="${year}-${month}-${day}">${formattedDate}</time>
          </figcaption>
        </figure>`;

  // containerEl.innerHTML = '';
  // replaceChildren() ohne Argumente leert den Container – sauberer und
  // schneller als innerHTML = '', weil kein HTML neu geparst werden muss.
  containerEl.replaceChildren();
  // 'beforeend' hängt das neue HTML als letztes Kind in den Container
  containerEl.insertAdjacentHTML('beforeend', html);
}

// Gleiches Prinzip, nur für den Fehlerfall: der Nutzer soll sehen,
// dass etwas schiefgelaufen ist.
function renderError(errorMessage) {
  const html = `
  <p class="p-3 bg-slate-800 border border-b-red-500">${errorMessage}</p>`;

  // containerEl.innerHTML = '';
  containerEl.replaceChildren();
  containerEl.insertAdjacentHTML('beforeend', html);
}

// Daten fetchen
async function getComic() {
  // Button sperren, solange die Anfrage läuft – sonst startet ein
  // ungeduldiger Klick zehn Anfragen parallel.
  button.disabled = true;
  try {
    // await: hier wartet nur diese Funktion auf die Antwort des Servers
    const res = await fetch('https://xkcd-api-ridvanaltun.vercel.app/api/comics/random');

    // fetch wirft bei 404 oder 500 keinen Fehler von selbst –
    // wir prüfen res.ok und werfen ihn bei Bedarf selbst.
    if (!res.ok) throw new Error('Failed to get a comic. Try again later.');

    // .json() liest den Body und macht aus dem JSON-Text ein JS-Objekt
    const data = await res.json();

    console.log(data);
    renderComic(data);
  } catch (error) {
    // Fängt beides ab: kein Netz und unser throw von oben
    console.log(error.message);
    renderError(error.message);
  } finally {
    // finally läuft immer – egal ob erfolgreich oder Fehler.
    // Genau richtig, um den Button wieder freizugeben.
    button.disabled = false;
  }
}

// Main

// Einmal direkt beim Laden der Seite
getComic();

// Und danach bei jedem Klick auf den Button erneut
button.addEventListener('click', getComic);
