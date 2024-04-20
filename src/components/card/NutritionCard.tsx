import './cardstyle.scss';

import { useEffect, useState } from 'react';
import NutritionInputs from './input_handler/nutritioninput';
import Visual from './visual/visual';
import { useAuth } from '../../auth/AuthProvider';
import { BASE_URL } from '../../vars';

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
