import type { ComponentProps } from 'react';

// Variante 1: Jeden Prop, den der Button annehmen soll, selbst typisieren.
type ButtonProps = {
  // React.ReactNode = alles, was React rendern kann (Text, JSX, Zahlen, null, ...).
  children?: React.ReactNode;
  type: 'button' | 'reset' | 'submit';
  // Einfache Variante: eine Funktion ohne Parameter und ohne Rückgabewert.
  // onClick: () => void;
  // Genauer: Reacts eigener Typ für Klick-Handler auf einem <button>.
  // Dadurch ist der Event-Parameter (e) im Handler korrekt typisiert.
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

// export default function Button({ children, type, onClick }: ButtonProps) {
//   return (
//     <button type={type} onClick={onClick}>
//       {children}
//     </button>
//   );
// }

// Variante 2: ComponentProps<'button'> liefert alle Props eines normalen <button>
// (type, onClick, className, style, disabled, ...), ohne sie einzeln aufzuschreiben.
// Mit "&" (Intersection) ergänzen wir eigene Props – hier username.
type MyButtonProps = ComponentProps<'button'> & { username: string };

// "...rest" sammelt alle übrigen Props ein, die wir nicht einzeln herausgezogen haben.
export default function Button({ children, username, ...rest }: MyButtonProps) {
  return (
    // {...rest} gibt alle diese Props an das echte <button>-Element weiter.
    // type und onClick stecken damit schon in rest – die einzelne Angabe davor ist doppelt.
    <button type={rest.type} onClick={rest.onClick} {...rest}>
      <span>{username}</span>
      {children}
    </button>
  );
}
