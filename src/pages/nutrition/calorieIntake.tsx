import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';
import './calorieIntake.scss';
import { BASE_URL } from '../../vars';
import { useAuth } from '../../auth/AuthProvider';

interface MacroEntry {
  date_time: string;
  food_name: string;
  quantity: string;
  calories: number;
  carbs_g: number;
  fat_saturated_g: number;
  fat_total_g: number;
  cholesterol_mg: number;
  fiber_g: number;
  potassium_mg: number;
  protein_g: number;
  sodium_mg: number;
  sugar_g: number;
}

const CalorieIntake = () => {
  const [caloriesConsumed, setCaloriesConsumed] = useState<number>(0);
  const [caloriesConsumedChange, setCaloriesConsumedChange] = useState<number>(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCalorieIntakeData = async () => {
      try {
        const currentDate = new Date();
        const startOfCurrentWeek = new Date(currentDate);
        startOfCurrentWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const startOfLastWeek = new Date(startOfCurrentWeek);
        startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

        const response = await fetch(`${BASE_URL}/nutrition?username=${user}&timeSpan=month`);
        const result = await response.json();
        const nutritionData: MacroEntry[] = result.success ? result.values : [];

        const thisWeekNutritionData = nutritionData.filter((entry) => {
          const entryDate = new Date(entry.date_time);
          return entryDate >= startOfCurrentWeek;
        });

        const lastWeekNutritionData = nutritionData.filter((entry) => {
          const entryDate = new Date(entry.date_time);
          return entryDate >= startOfLastWeek && entryDate < startOfCurrentWeek;
        });

        const thisWeekCalories = thisWeekNutritionData.reduce((sum, entry) => sum + entry.calories, 0);
        const lastWeekCalories = lastWeekNutritionData.reduce((sum, entry) => sum + entry.calories, 0);

        setCaloriesConsumed(thisWeekCalories);
        setCaloriesConsumedChange(calculateChange(thisWeekCalories, lastWeekCalories));
      } catch (error) {
        console.error('Error fetching calorie intake data:', error);
      }
    };

    fetchCalorieIntakeData();
  }, [user]);

  const calculateChange = (currentValue: number, previousValue: number): number => {
    if (previousValue === 0) {
      return 0;
    }
    const change = ((currentValue - previousValue) / previousValue) * 100;
    return +change.toFixed(0);
  };

  return (
    <div className="box calorie-intake">
      <h1>This Week's Calorie Intake</h1>
      <div className="line"></div>
      <div className="atefoodpart">
        <div className="Caloriesate">
          <div className="header">
            <h2>Calories Consumed:</h2>
          </div>
          <div className="boldvalue">
            <FontAwesomeIcon icon={faBowlFood} />
            <p className="actualvalue">{caloriesConsumed}</p>
            <p className="atecalslabel">calories</p>
          </div>
          <div className="change">
            {caloriesConsumedChange !== 0 && (
              <>
                <p>{caloriesConsumedChange > 0 ? 'Up' : 'Down'} {Math.abs(caloriesConsumedChange)}% from last week!</p>
                <FontAwesomeIcon icon={caloriesConsumedChange > 0 ? faArrowTrendUp : faArrowTrendDown} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieIntake;