import { useState } from 'react';
import Graph from '../graph';
import Log from '../log';
import './visualstyle.scss';

const Visual = () => {
  const [isGraph, setIsGraph] = useState(true);

  return (
    <>
      <div className='visual_inner_container'>
        {
          isGraph ? <Graph /> : <Log />
        }
      </div>

      <div className='switch_container'>
        <button onClick={() => setIsGraph(true)} className={isGraph ? 'active' : ''}>Graph</button>
        <button onClick={() => setIsGraph(false)} className={isGraph ? '' : 'active'}>Log</button>
      </div>
    </>
  );
};

export default Visual;