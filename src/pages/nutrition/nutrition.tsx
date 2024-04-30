import { useState, useEffect } from 'react';
import CalorieIntake from './calorieIntake';
import MacroBreakdown from './macroBreakdown';
import GoalOverview from './goalsOverview';
import GoalSetting from './nutrigoalSetting';
import MetricsBreakdown from './metricsBreakdown';
import './nutrition.scss';
import { BASE_URL } from '../../vars';
import { useAuth } from '../../auth/AuthProvider';
import { useToast } from '../../components/toast/toast';
import { setGoal } from '../../util/goal';


interface Exercise {
  exercise: string;
  duration: number;
  calories_burnt: number;
  date_time: string;
}

interface CalorieIntake {
  food: string;
  quantity: number;
  calories: number;
  date: string;
}


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


interface PieData {
  name: string;
  value: number;
}

const Nutrition = () => {
  const [graphTimeFrame, setGraphTimeFrame] = useState('month');
  const [nutritionData, setNutritionData] = useState<MacroEntry[]>([]);
  const [cumulativeCaloriesData, setCumulativeCaloriesData] = useState<{ date: string; cumulativeCalories: number; cumulativeExerciseCalories: number; goal: number }[]>([]);
  const [macroData, setMacroData] = useState<PieData[]>([]);

  const { user } = useAuth();
  const { addToast } = useToast();

  const handleGoalSubmit = async (timeFrame: string, goalType: string, amount: number) => {
    if (!user) {
      addToast('error', 'Please log in to set a goal.');
      return;
    }

    if (!timeFrame || !goalType || !amount) {
      addToast('error', 'Please fill in all the fields.');
      return;
    }

    setGoal(user, 'nutrition', amount, goalType, timeFrame);
    addToast('success', 'Goal set successfully');

  };


  const COLOURS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  const fetchNutrition = async () => {
    //fetch nutrition data for current timeframe

    console.log(`Fetching nutrition data for ${graphTimeFrame}`);

    const response = await fetch(`${BASE_URL}/nutrition?username=${user}&timeSpan=${graphTimeFrame}`); //expectss both username & timeframe (hopefully the timeframe is suitable!)
    const result = await response.json();

    return result.values;
  };

  //useEffect for updating Piechart
  useEffect(() => {
    const handleMacros = async () => {
      setNutritionData(await fetchNutrition());
      // Fetch macros
      //calculate total macronutrients
      const totalMacros = nutritionData.reduce(
        (total, entry) => {
          total.protein_g += entry.protein_g;
          total.carbs_g += entry.carbs_g;
          total.fat_total_g += entry.fat_total_g;
          total.cholesterol_mg += entry.cholesterol_mg;
          total.fiber_g += entry.fiber_g;
          total.potassium_mg += entry.potassium_mg;
          total.sodium_mg += entry.sodium_mg;
          total.sugar_g += entry.sugar_g;
          return total;
        },
        {protein_g: 0, carbs_g: 0, fat_total_g: 0, cholesterol_mg: 0, fiber_g: 0, potassium_mg: 0, sodium_mg: 0, sugar_g: 0,}
      );

      //gets it in appropiate format for data for the pie chart
      const pieData: PieData[] = [
        { name: 'Protein', value: totalMacros.protein_g },
        { name: 'Carbs', value: totalMacros.carbs_g },
        { name: 'Fat', value: totalMacros.fat_total_g },
        { name: 'Cholesterol', value: totalMacros.cholesterol_mg },
        { name: 'Fiber', value: totalMacros.fiber_g },
        { name: 'Potassium', value: totalMacros.potassium_mg },
        { name: 'Sodium', value: totalMacros.sodium_mg },
        { name: 'Sugar', value: totalMacros.sugar_g },
      ];

      setMacroData(pieData);
    };

    handleMacros();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphTimeFrame]);


  //useEffect for updating the graph
  useEffect(() => {
    const fetchGoal = async () => {
      //fetch goal data for current timeframe
      const raw_goal = await fetch(`${BASE_URL}/goal?${new URLSearchParams({
        username: user || '',
        goalType: 'nutrition',
        field: 'calories',
        timeSpan: graphTimeFrame,
      })}`, {
        method: 'GET'
      });

      const goal_data = await raw_goal.json();
      // console.table(goal_data);
      return goal_data.value;
    };

    const fetch_exercise = async () => {
      //fetch exercise data for current timeframe
      console.log('fetching exercise data');
    
      const response = await fetch(`${BASE_URL}/exercise?username=${user}&timeSpan=${graphTimeFrame}`);
      const result = await response.json();
    
      const exerciseData = result.values;
    
      //calculate cumulative exercise calories
      let cumulativeExerciseCalories = 0;
      const cumulativeExerciseCaloriesData = exerciseData.map((exercise:Exercise) => {
        cumulativeExerciseCalories += Number(exercise.calories_burnt);
        return {
          date: exercise.date_time,
          cumulativeExerciseCalories,
        };
      });
    
      return cumulativeExerciseCaloriesData;
    };

    const handleChangeTimeFrame = async () => {
      
      setNutritionData(await fetchNutrition());
      console.log(`Nutrition data for ${graphTimeFrame} fetched`);
      // console.table(nutritionData);
      const goal = await fetchGoal();
      
      
      //calculating the cumulative calorie consumption
      let cumulativeCalories = 0;
      const cumulativeCaloriesData = nutritionData.map((intake) => {
        cumulativeCalories += Number(intake.calories);
        return {
          date: intake.date_time,
          cumulativeCalories,
        };
      });

      const cumulativeExerciseCaloriesData = await fetch_exercise();

      //merge cumulative calorie and exercise data
      const mergedData = cumulativeCaloriesData.map((calorie, index) => ({
        ...calorie,
        cumulativeExerciseCalories: cumulativeExerciseCaloriesData[index]?.cumulativeExerciseCalories,
      }));
    
      const mergedDataWithGoal = mergedData.map(data => ({
        ...data,
        goal: goal || 0,
      }));
    
      setCumulativeCaloriesData(mergedDataWithGoal);
      console.table(mergedDataWithGoal);
      console.table(nutritionData);
    };

    handleChangeTimeFrame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphTimeFrame]);

  return (
    <div className="nutridashboard">
      <CalorieIntake />
      <MacroBreakdown MacroData={macroData} COLORS={COLOURS} />
      <GoalOverview COLORS={COLOURS} />
      <GoalSetting
        handleGoalSubmit={handleGoalSubmit}
      />
      <MetricsBreakdown
        cumulativeCaloriesData={cumulativeCaloriesData}
        graphtimeframe={graphTimeFrame}
        setGraphtimeframe={setGraphTimeFrame}
      />
    </div>
  );
};

export default Nutrition;