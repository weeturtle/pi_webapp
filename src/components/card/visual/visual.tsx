import { useState } from 'react';
import Graph from '../graph';
import Log from '../log';
import './visualstyle.scss';
import { Dispatch, SetStateAction } from 'react'; //new imp

//Same old same old --> realy need to make a file for this lol
interface NutritionDataItem {
  'food_name': string;
  'quantitiy': number; 
  'calories': number; 
  'date_time': number;
}

interface ExerciseDataItem {
  'exercise_name': string;
  'duration': number; 
  'calories_burnt': number; 
  'exercise_type': string;
  'date_time': number; 
}

interface GlucoseDataItem {
  'glucose_level': number;
  'date_time': number;
  'description': string;
}

type DataItem = ExerciseDataItem | NutritionDataItem | GlucoseDataItem;

interface CollectionData {
  data: DataItem[];
  datatype: string;
  timeframe: string;
  setTimeframe: Dispatch<SetStateAction<string>>; //been SO stuck on why this didnt work and appartently its cos I need to set as this -- wish me luck
  //UPDATE - worked i need to watch a yt on wtf it even is lol
}

const Visual = ({ data, datatype, timeframe, setTimeframe }:CollectionData) => {
  const [isGraph, setIsGraph] = useState(true);
  //const [timeframe, setTimeframe] = useState('day'); trying without htis cos already defauly lol and if I passed rthe value correctly shoudlnt need t be ther 

  return (
    <>
      <div className='visual_inner_container'>
        <div className='timeframe-dropdown'> {/*Lol took too long to have the value be passed around and have it be noticed D--)*/}
          <select
            value={timeframe} //just allows user to select 
            onChange={(e) => setTimeframe(e.target.value)}
            style={{ padding: '5px 10px', margin: '10px' }} //idk why only this section of css isnt being picked up so bad practice buut oh well chcukign it here
          > {/*Yeah its all here with --> unuser if i need it for table but oh well its Z-index to 1000 now ! */}
            <option value="day">Day</option> 
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
        {
          isGraph ? <Graph data={data} datatype={datatype} timeframe={timeframe} /> : <Log data={data} datatype={datatype} /> //swiwtching 
        }
      </div>
      {/*need to redo this in the revamp and have it be fully animated with the button part actually moving cos rn it looks shit.*/}
      <div className='switch_container'>
        <button onClick={() => setIsGraph(true)} className={isGraph ? 'active' : ''}>Graph</button> 
        <button onClick={() => setIsGraph(false)} className={isGraph ? '' : 'active'}>Log</button>
      </div>
    </>
  );
};

export default Visual;