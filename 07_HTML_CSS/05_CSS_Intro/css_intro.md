---
theme: catppuccin-mocha
theme_overrides:
  fonts:
    title: Cascadia Code
    body: Cascadia Code
    code: Cascadia Code, Consolas, monospace
  logo: /home/stephan/Pictures/wbsc.png
  header:
    show: true
    text: CSS Intro
---

# CSS: Styling the Web

G-SEAI | 07 HTML/CSS



---

## Agenda

1. Geschichte
2. Was bedeutet CSS?
3. Wie werden Styles angewendet?
4. Syntax
5. Einfache Selektoren und Spezifität
6. Compound und Complex Selectors

---

## Geschichte

![bg left](https://commons.wikimedia.org/wiki/Special:FilePath/H%C3%A5kon-Wium-Lie-2009-03.jpg)

**CSS** wurde 1994 von **Håkon Wium Lie** vorgeschlagen. Als das Web zu wachsen begann, wurde der Bedarf an einer eigenen Sprache zum Stylen von Websites offensichtlich. CSS wurde entwickelt, um **Content** (geschrieben in HTML) **von der Presentation** (kontrolliert durch CSS) **zu trennen**.

Diese Trennung ermöglicht mehr Flexibilität und macht Web Development zu einem deutlich klareren Prozess.

???

Håkon Wium Lie hat CSS gemeinsam mit Tim Berners-Lee und Robert Cailliau am CERN entwickelt — quasi im selben Umfeld, in dem auch HTML entstanden ist.

---

## Was bedeutet CSS?

![bg left](https://css-tricks.com/wp-content/uploads/2024/06/layers-tall-outlines3.svg)

**CSS** steht für **Cascading Style Sheets**. Der Begriff "cascading" bezieht sich auf das Priority-Scheme, das bestimmt, welche Style Rule angewendet wird, wenn mehr als eine Rule auf ein Element zutrifft.

Dieser Mechanismus erlaubt es, dass **mehrere Stylesheets** das Aussehen einer Site beeinflussen — mit einer **klaren Hierarchie**, die festlegt, welche Rules Vorrang haben.

---

## Wie werden Styles angewendet?

CSS kann auf drei Arten mit HTML verbunden werden:

- **Inline Styles**, direkt innerhalb eines HTML-Tags über das **style**-Attribut.
- **Internal Styles**, innerhalb des **`<style>`**-Elements in einem HTML-Dokument.
- **External Styles**, durch Verlinken einer externen CSS-Datei über das **`<link>`**-Element im **`<head>`** eines HTML-Dokuments.

Jede Methode hat ihren Anwendungsfall— **External Stylesheets** sind aber die gängigste und **bevorzugte Methode**, um größere Websites zu pflegen, wegen ihrer Skalierbarkeit und einfacherer Wartbarkeit.

---

## Syntax

```css
selector {
  property: value;
}
```

|||

Eine CSS Regel besteht aus einem **Selektor** und einem **Declaration Block**. Der Selektor zeigt auf das HTML-Element, das gestylt werden soll, während der Declaration Block eine oder mehrere Declarations enthält, getrennt durch Semikolons.

Jede Declaration besteht aus einem CSS Property-Namen und einem Value, getrennt durch einen Doppelpunkt.

---

## Syntax

```css
p {
  color: blue;
}
```

|||

In diesem einfachen Beispiel targeten wir alle Paragraph-Elements und setzen die Text-Color-Property auf Blau.

---

## Syntax

```html
<!doctype html>
<html>
<head>
  <title>My Simple Page</title>
</head>
<body>
  <p>Hello there</p>
</body>
</html>
```

|||

```css
p {
  color: blue;
}
```

**Ergebnis:** ein blauer Text "Hello there" — mehr nicht, aber ehrlich verdient. 🙂

???

Schönes Beispiel, um zu zeigen: Selektor `p` matcht das `<p>`-Element, die Declaration `color: blue;` bestimmt die Darstellung.

---

## Einfache Selektoren und Spezifität

- Ein **Einfache Selektoren** ist ein Selektor mit einer einzigen Komponente, um ein bestimmtes Element aus dem Dokument herauszugreifen. Die Idee dabei: das Element, das wir stylen wollen, so gut wie möglich beschreiben, damit unser Selektor triff / matcht.

- Spezifität (**Specificity**) ist ein zentrales Konzept in CSS: Sie bestimmt, welche Style-Regeln auf ein Element angewendet werden, wenn mehrere Regeln zutreffen könnten. Spezifität wird anhand der verwendeten Selektor-Typen berechnet, mit folgender Hierarchie:
  - **Inline Styles** (höchste Spezifität)
  - **IDs**
  - **Classes, Attributes und Pseudo-Classes**
  - **Elements und Pseudo-Elements**

---

## Einfache Selektoren und Spezifität

**Inline Styles**

```html
<p style="color: blue;">Hello there!</p>
```

|||

**ID Selektor**

```html
<p id="my-paragraph">Hello there!</p>
```

```css
#my-paragraph {
  color: blue;
}
```

---

## Simple Selectors und Specificity

**Classes, Attributes und Pseudo-Classes**

```html
<p class="blue-paragraphs">Hello there!</p>
```

```css
.blue-paragraphs {
  color: blue;
}
```

|||

**Elemente und Pseudo-Elemente**

```html
<p>Hello there!</p>
```

```css
p {
  color: blue;
}
```

---

## Compound und Complex Selectors

- Wenn zwei Regeln kollidieren, gewinnt die mit der höheren Spezifität. Bei gleicher Spezifität zählt die zuletzt definierte Regel. Selektoren lassen sich kombinieren, um die Spezifität zu erhöhen und Kollisionen zu vermeiden.

- **Compound Selectors**
  - Eine Sequenz von Einfachen Selektoren, die **nicht** getrennt sind.
  - Sie bilden mehrere gleichzeitig geltende Bedingungen auf einem einzigen Element.

---

## Compound und Complex Selectors

- **Complex Selectors**
  - Eine Folge Einfacher Selektoren, getrennt durch einen **Combinator** — eine Möglichkeit, die Beziehung eines Elements zu umliegenden Elements zu beschreiben:
    - **Descendant Combinator** (Whitespace)
    - **Child Combinator** (`>`)
    - **Subsequent-Sibling Combinator** (`~`)
    - **Next-Sibling Combinator** (`+`)

---

## Pro Tipp! 💡

Im Text Editor könnt ihr über einen Selektor hovern, um die berechnete Spezifität zu sehen:

```css
p {
  /* Specificity: (0, 0, 1) */
}

p.special-paragraph {
  /* Specificity: (0, 1, 1) */
}
```

Die drei Werte entsprechen der **ID-Spalte**, der **Class-Spalte** und der **Type-Spalte**.

???

Gute Gelegenheit, direkt im Editor der Klasse zu zeigen, wie sich Specificity live ablesen lässt.

