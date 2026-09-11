// ============================================================
// 1. Header und Navigation erstellen
// ============================================================
// Imperativer Weg: Wir bauen jedes Element einzeln im Speicher,
// hängen es in den DOM-Tree und setzen seine Eigenschaften.

// createElement() erzeugt ein Element, das noch NICHT auf der Seite ist.
const headerEl = document.createElement('header');

// Erst appendChild() hängt es als letztes Kind in den <body> — jetzt ist es sichtbar.
document.body.appendChild(headerEl);

// classList.add() fügt eine CSS-Klasse hinzu, ohne bestehende Klassen zu überschreiben.
headerEl.classList.add('header');

// Dasselbe Muster für die Navigation — sie wird ins <header> gehängt, nicht in den <body>.
// Das Elternteil bestimmt also, wo im DOM das neue Element landet.
const navEl = document.createElement('nav');
headerEl.appendChild(navEl);
navEl.classList.add('nav');

const logoEl = document.createElement('a');

// textContent setzt den reinen Text im Element (HTML würde hier nicht interpretiert).
logoEl.textContent = 'Coffee Shop';

// Zwei Wege, dasselbe Attribut zu setzen:
// logoEl.href = '#';                   // über die JS-Eigenschaft
logoEl.setAttribute('href', '#top'); // über den Attributnamen aus dem HTML
logoEl.classList.add('logo');

// Anhängen
navEl.appendChild(logoEl);

// ============================================================
// 2. Navigationsliste dynamisch erzeugen
// ============================================================
// Der eigentliche Gewinn gegenüber statischem HTML: Die Struktur
// entsteht aus Daten, nicht aus wiederholtem Markup.

const ulEl = document.createElement('ul');
ulEl.classList.add('nav-list');

navEl.appendChild(ulEl);

// Die Daten für die Navigation — hier ein Array, später z. B. aus einer API.
const navContent = ['Home', 'Menu', 'About', 'Contact'];

// Pro Eintrag ein <li> mit einem <a> darin.
// Kommt ein fünfter Menüpunkt dazu, ändert sich nur das Array oben.
for (const navText of navContent) {
  const liEl = document.createElement('li');
  const aEl = document.createElement('a');
  liEl.classList.add('nav-item');
  aEl.textContent = navText;

  // Erst das <a> ins <li>, dann das <li> in die Liste — von innen nach außen.
  liEl.appendChild(aEl);
  ulEl.appendChild(liEl);
}

// ============================================================
// 3. Hero-Sektion einfügen
// ============================================================
// Deklarativer Weg: Wir schreiben das  HTML als Text
// und lassen den Browser daraus die Elemente bauen. Viel kürzer —
// aber wir geben die Kontrolle darüber ab, was in dem Text steckt.

// const openingHours = 'Open daily from 7 AM to 5 PM.';

// Achtung, das ist der Grund für die Vorsicht: Wenn der dynamische Text
// von einem Nutzer kommt oder aus einer fremden Datenquelle, kann er
// solche Angriffe wie hier enhalten. onerror feuert JS-Code, weil das
// img nicht geladen werden kann.
const openingHours = `Open daily from 7 AM to 5 PM.
<img src="x" onerror="alert('angegriffen')" >`;

// Template Literal (Backticks) über mehrere Zeilen.
// ${openingHours} setzt den Wert der Variablen an dieser Stelle ein —
// als HTML-Quelltext. Genau das ist die Lücke:
// das src="x" lädt nicht, der Browser löst onerror aus und führt den Code aus.
// Merke: Fremde Daten nie in HTML-Strings einsetzen — dafür ist textContent da.
// Wenn ihr Kontrolle über alle dynamisch eingesetzten Werte habt,
// ist das allerdings die einfachste Methode
const heroHTML = `
<section class="hero">
    <div class="hero-content">
      <h1>Welcome to Our Coffee Shop</h1>
      <p>Enjoy the best coffee in town.</p>
      <a href="#top" class="btn">Explore Our Menu</a>
      <p>${openingHours}</p>
    </div>
</section>`;

// innerHTML würde den kompletten Inhalt des <body> ersetzen —
// unser Header wäre weg:
// document.body.innerHTML = heroHTML;

// insertAdjacentHTML() fügt stattdessen an einer bestimmten Position ein.
// 'beforeend' heißt: als letztes Kind im <body>, bestehender Inhalt bleibt erhalten.
// (Weitere Positionen: 'beforebegin', 'afterbegin', 'afterend')
document.body.insertAdjacentHTML('beforeend', heroHTML);
