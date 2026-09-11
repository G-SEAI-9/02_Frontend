// ============================================================
// Die Fetch API
// ============================================================

// fetch() holt Daten von einem Server – über HTTP, genau wie der Browser
// beim Laden einer Seite, aber hier greifen wir sie mit JS ab.

// console.log('fetching...');

// Hier soll später der Wechselkurs landen. Am Anfang ist noch nichts da,
// deshalb null – die Daten sind noch nicht da.
let eurToUSD = null;

// ============================================================
// Variante 1: fetch mit Promise-Kette (.then)
// ============================================================

// Wichtig: fetch ist asynchron. Der Code läuft nicht von oben nach unten
// durch. JS schickt die Anfrage los und führt alle übrigen Zeilen darunter weiter aus.

// console.log('vor dem fetch');

// function showRates() {
//   console.log('aktuelle Wechselrate: ', eurToUSD);
// }

// fetch() gibt sofort ein Promise zurück: ein Versprechen auf ein Ergebnis,
// das irgendwann später eintrifft. Mit .then() hängen wir eine Funktion an,
// die ausgeführt wird, sobald das Versprechen eingelöst ist.
fetch('https://api.frankfurter.dev/v2/rate/eur/us')
  .then((response) => {
    console.log('daten sind da, müssen noch geparsed werden');

    //     // response ist noch NICHT der Inhalt, sondern die Antworthülle:
    //     // Statuscode, Header, und der Body als Rohdaten-Stream.
    console.log(response);

    //     // response.ok ist true bei Status 200-299. Achtung, typische Falle:
    //     // fetch wirft bei 404 oder 500 keinen Fehler – die Anfrage hat
    //     // technisch geklappt. Den Fehler müssen wir selbst werfen.
    if (!response.ok) {
      throw new Error('Fetching failed');
    }

    // .json() liest den Body aus und wandelt den JSON-Text in ein JS-Objekt.
    // Auch das dauert und gibt wieder ein Promise zurück – deshalb return,
    // damit das nächste .then() darauf warten kann.
    return response.json();
  })
  .then((data) => {
    // Erst hier haben wir das fertige JS-Objekt
    console.log(data);
    eurToUSD = data.rate;
    showRates();
  })
  // .catch() fängt alles ab, was in der Kette schiefgeht: kein Netz,
  //   // kaputtes JSON, oder unser selbst geworfener Error von oben.
  .catch(() => {
    console.log('Der Wechselkus ist gerade nicht verfügbar. Versuche später nochmal');
  });

// console.log('nach dem fetch');

// Hier ist eurToUSD noch null. Der fetch ist zu diesem Zeitpunkt
// garantiert noch nicht fertig.
// console.log('aktuelle Wechselrate: ', eurToUSD);

// Kurzform derselben Kette – ohne Fehlerprüfung, nur zur Anschauung
// fetch('https://api.frankfurter.dev/v2/rate/eur/usd')
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err.message));

//

// ============================================================
// Variante 2: dasselbe mit async / await
// ============================================================

// async/await macht genau das, was die .then()-Kette oben macht –
// es sieht nur aus wie normaler Code von oben nach unten.

// 'async' markiert die Funktion als asynchron und erlaubt, darin 'await' zu benutzen
async function getCurrencyRate() {
  // try/catch ist hier das Gegenstück zu .catch() in der Promise-Kette
  try {
    // 'await' pausiert nur diese Funktion, bis die Antwort da ist.
    // Der Rest der Seite läuft weiter – nichts friert ein.
    const response = await fetch('https://api.frankfurter.dev/v2/rate/eur/us');
    // Zweites await: JSON parsen dauert auch
    const data = await response.json();
    // Fehlerbehandlung
    // Je nach API lohnt es sich, zuerst zu parsen, so kommen wir an die
    // Fehlermeldung, die der Server im Body mitschickt.
    if (!response.ok) {
      throw new Error(`status: ${response.status}, message: "${data.message}"`);
    }
    // Daten bearbeiten und anzeigen
    // Destructuring: holt die Eigenschaft 'rate' aus dem data-Objekt
    const { rate } = data;
    eurToUSD = rate;
  } catch (error) {
    // Hier landet alles: Netzwerkfehler UND unser throw von oben
    console.log(error);
  }
}

// Aufruf der async-Funktion. Sie gibt selbst wieder ein Promise zurück –
// wir warten hier  nicht darauf, sondern stoßen sie nur an.
getCurrencyRate();
