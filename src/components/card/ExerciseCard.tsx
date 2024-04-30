import './cardstyle.scss';

import { useEffect, useState } from 'react';
import ExerciseInputs from './input_handler/exerciseinput';
import Visual from './visual/visual';
import { useAuth } from '../../auth/AuthProvider';
import { BASE_URL } from '../../vars';

export const ExerciseCard = () => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState('week');
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/exercise?username=${user}&timeSpan=${timeframe}`); //expectss both username & timeframe (hopefully the timeframe is suitable!)
        const result = await response.json();
        console.log('Fetched data for Exercise:', result.values); //test can delete later tho
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
      <h2 className='card_title'>Exercise</h2>
      <Visual data={data} timeframe={timeframe} setTimeframe={setTimeframe} datatype='Exercise' />
      <ExerciseInputs />
    </div>
  );
};
