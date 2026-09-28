import { useState } from 'react';
import LightBulb from './components/LightBulb.jsx';

const App = () => {
  // Zwei unabhängige States: ist die Lampe an? und wie oft wurde geschaltet?
  // Eine Komponente darf beliebig viele useState-Aufrufe haben.
  const [isOn, setIsOn] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <>
      <button
        type='button'
        onClick={() => {
          // Ausführliche Version des Umschaltens: Die Updater-Funktion bekommt den
          // vorherigen Zustand und gibt den neuen zurück. Aus true wird false und umgekehrt.
          // setIsOn((vorherigerZustand) => {
          //   if (vorherigerZustand === true) {
          //     return false;
          //   } else {
          //     return true;
          //   }
          // });

          if (count < 10) {
            // Kurzform der Version oben: !p dreht den Boolean einfach um.
            setIsOn((p) => !p);
            // Achtung: isOn ist hier noch der Wert aus diesem Render, also vor dem Umschalten. Bei mehreren gleichzeitigen Statesettern können sich schnell subtile Bugs einschleichen xD
            setCount((c) => (isOn ? c + 1 : c));
          }
          if (count >= 10) {
            alert('Zu oft an- und ausgeschaltet.');
          }
        }}
      >
        Switch {count}
      </button>
      {/* Setzt den Zähler direkt auf 0 – der alte Wert spielt keine Rolle, daher kein Updater nötig */}
      <button type='button' onClick={() => setCount(0)}>
        Reset
      </button>
      {/* Der State wird als Prop weitergegeben; LightBulb entscheidet damit nur, wie sie aussieht */}
      <LightBulb isOn={isOn} />
    </>
  );
};

export default App;
