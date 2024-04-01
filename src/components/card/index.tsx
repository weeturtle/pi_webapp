import { useEffect, useState } from 'react';
import './cardstyle.scss';
import ExerciseInputs from './input_handler/exerciseinput';
import GlucoseInputs from './input_handler/glucoseinput';
import NutritionInputs from './input_handler/nutritioninput';
import Visual from './visual/visual';
import { useAuth } from '../../auth/AuthProvider';
import { BASE_URL } from '../../vars';

//probably should have this work in a separate file but icl at this point ive had a enough of dealign with so many different sections smh

//Exercise card
export const ExerciseCard = () => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState('day');
  const { user } = useAuth();

  //SAME THINGF FOR ECVERTHINg
  //need to get the data and have it be poassed back
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/exercise?username=${user}&timeSpan=${timeframe}`); //expectss both username & timeframe (hopefully the timeframe is suitable!)
        const result = await response.json();
        console.log('Fetched data for Exercise:', result.values); //test can delete later tho
        if (result && result.values) {
          setData(result.values);
        } else {
          console.error('Data not found in response', result); //ffs the amount of times I saw this 
        }
      } catch (error) {
        console.error('Error fetching data', error); //never saw this, so fp to srikar and Neev!
      }
    };

    fetchData();
  }, [user, timeframe]); //DONEEEZOOOOO

  return (
    <div className='card_container'>
      <h2 className='card_title'>Exercise</h2>
      {/*Chucking it all back in, dk why datatype is causing issues but oh well*/}
      <Visual data={data} timeframe={timeframe} setTimeframe={setTimeframe} datatype='Exercise' />
      <ExerciseInputs />
    </div>
  );
};

//Nutrition Card
// COPIED THE CODE FROM EXERCISE  TO HERE AND glucose!!
export const NutritionCard = () => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState('day');
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/nutrition?username=${user}&timeSpan=${timeframe}`);
        const result = await response.json();
        console.log('Fetched data for Nutrition:', result.values);
        if (result && result.values) {
          setData(result.values);
        } else {
          console.error('Data not found in response', result);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [user, timeframe]);

  return (
    <div className='card_container'>
      <h2 className='card_title'>Nutrition</h2>
      <Visual data={data} timeframe={timeframe} setTimeframe={setTimeframe} datatype='Nutrition' />
      <NutritionInputs />
    </div>
  );
};

//Gluc...GlUC..glucoseee!
export const GlucoseCard = () => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState('day');
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/glucose?username=${user}&timeSpan=${timeframe}`);
        const result = await response.json();
        console.log('Fetched data for Glucose:', result.values); // WHY IS IT FORMATTED SO WEIRDLY WTF
        if (result && result.values) {
          setData(result.values);
        } else {
          console.error('Data not found in response', result);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [user, timeframe]);

  return (
    <div className='card_container'>
      <h2 className='card_title'>Glucose</h2>
      <Visual data={data} timeframe={timeframe} setTimeframe={setTimeframe} datatype='Glucose' />
      <GlucoseInputs />
    </div>
  );
};
