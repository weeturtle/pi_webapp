import { useState } from 'react';
import Graph from '../graph';
import Log from '../log';
import './visualstyle.scss';
import { Dispatch, SetStateAction } from 'react';


interface NutritionDataItem {
  'food_name': string;
  'quantitiy': number; 
  'calories': number; 
  'date-time': number;
}

interface ExerciseDataItem {
  'exercise_name': string;
  'duration': number; 
  'calories_burnt': number; 
  'exercise_type': string;
  'date-time': number; 
}

interface GlucoseDataItem {
  'glucose-level': number;
  'date-time': number;
  'description': string;
}

type DataItem = ExerciseDataItem | NutritionDataItem | GlucoseDataItem;

interface CollectionData {
  data: DataItem[];
  datatype: string;
  timeframe: string;
  setTimeframe: Dispatch<SetStateAction<string>>;
}


const Visual: React.FC<CollectionData> = ({ data, datatype, timeframe, setTimeframe }) => {
  const [isGraph, setIsGraph] = useState(true);
  //const [timeframe, setTimeframe] = useState('day');

  return (
    <>
      <div className='visual_inner_container'>
        <div className='timeframe-dropdown'>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            style={{ padding: '5px 10px', margin: '10px' }}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
        {
          isGraph ? <Graph data={data} datatype={datatype} timeframe={timeframe} /> : <Log data={data} datatype={datatype} />
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