// LightBulb hat keinen eigenen State. Sie bekommt isOn als Prop und leitet daraus nur ab,
// welche CSS-Klassen gesetzt werden. Der State selbst lebt in App.
const LightBulb = ({ isOn }) => {
  // Schritt 1 der Herleitung: Klassenname in einer Variablen vorbereiten
  // und per if ergänzen. Funktioniert, ist aber recht lang.
  // let containerClassName = 'container';

  // if (isOn) {
  //   containerClassName = 'container night';
  // }

  return (
    // Schritt 1 benutzt: die vorbereitete Variable einsetzen.
    // <div className={containerClassName}>
    // Schritt 2: Ternary-Operator direkt im JSX – Bedingung ? wennWahr : wennFalsch.
    // <div className={isOn ? 'container night' : 'container'}>
    // Schritt 3 (aktiv): Template-String. 'container' steht immer da,
    // nur 'night' wird je nach isOn angehängt – so wiederholen wir 'container' nicht.
    <div className={`container ${isOn ? 'night' : ''}`}>
      {/* Ab hier reines Markup/CSS für die Glühbirne – für useState nicht relevant */}
      <div className='bulb-light'>
        <div id='light' />
        <div id='bulb'>
          <div className='bulb-top'>
            <div className='reflection' />
          </div>
          <div className='bulb-middle-1' />
          <div className='bulb-middle-2' />
          <div className='bulb-middle-3' />
          <div className='bulb-bottom' />
        </div>

        <div id='base'>
          <div className='screw-top' />
          <div className='screw-a' />
          <div className='screw-b' />
          <div className='screw-a' />
          <div className='screw-b' />
          <div className='screw-a' />
          <div className='screw-b' />
          <div className='screw-c' />
          <div className='screw-d' />
        </div>
      </div>
    </div>
  );
};

export default LightBulb;
