import { useState } from 'react';
import './Candle.css';

const Candle = () => {
  const [height, setHeight] = useState(85);

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
