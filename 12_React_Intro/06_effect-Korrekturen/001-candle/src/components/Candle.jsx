import { useState } from 'react';
import './Candle.css';
import { useEffect } from 'react';

const Candle = () => {
  const [height, setHeight] = useState(85);

  useEffect(() => {
    const timerId = setInterval(() => {
      console.log('Aus dem interval');
      // setHeight((h) => {
      //   if (h <= 10) {
      //     return 85;
      //   }

      //   return h - 1;
      // });
      setHeight((h) => (h <= 10 ? 95 : h - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className='exercise'>
      <div className='candleContainer'>
        <div className='candle' style={{ height: `${height}%` }}>
          <div className='flame'>
            <div className='shadows' />
            <div className='top' />
            <div className='middle' />
            <div className='bottom' />
          </div>
          <div className='wick' />
          <div className='wax' />
        </div>
      </div>
    </div>
  );
};

export default Candle;
