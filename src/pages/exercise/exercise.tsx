import { useState, useEffect } from 'react';
import ExerciseOverview from './exerciseOverview';
import GoalOverview from './goalOverview';
import GoalSetting from './goalSetting';
import ExerciseGraph from './exerciseGraph';
import './exercise.scss';
import { BASE_URL } from '../../vars';
import { useAuth } from '../../auth/AuthProvider';

interface Exercise {
  exercise: string;
  duration: number;
  calories_burnt: number;
  date: string;
}

interface ExerciseType {
  name: string;
  value: number;
}

const Exercise = () => {
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
  const [exerciseTypeData, setExerciseTypeData] = useState<ExerciseType[]>([]);
  const [timeFrame, setTimeframe] = useState('day');
  const [graphTimeFrame, setGraphTimeFrame] = useState('year');
  const [exerciseGoalType, setExerciseGoalType] = useState('calorie');
  const [amount, setAmount] = useState<number>(0);
  const { user, setGoal } = useAuth();

  const handle_goalsubmit = async () => {
    try {
      await setGoal(user || '', 'exercise', amount, exerciseGoalType, timeFrame);
      // Reset form fields or show success message
    } catch (error) {
      console.error('Error setting goal:', error);
      // Show error message
    }
  };

  useEffect(() => {
    const fetch_exercise = async () => {
      //fetch exercise data for current timeframe
      console.log('fetching exercise data');

      const response = await fetch(`${BASE_URL}/exercise?username=${user}&timeSpan=${graphTimeFrame}`); //expectss both username & timeframe (hopefully the timeframe is suitable!)
      const result = await response.json();

      return result.values;
    };

    const fetch_goal = async () => {
      //fetch goal data for current timeframe
      const raw_goal = await fetch(`${BASE_URL}/goal?${new URLSearchParams({
        username: user || '',
        goalType: 'exercise',
        field: 'calories_burnt',
        timeSpan: graphTimeFrame,
      })}`, {
        method: 'GET'
      });

      const goal_data = await raw_goal.json();
      console.table(goal_data);
      return goal_data.value;
    };

    const hande_goal_change = async () => {
      const tempExerciseData = await fetch_exercise() as Exercise[];
      const goal = await fetch_goal();
      console.log(goal);

      let cumulativeCalories = 0;
      let cumulativeTime = 0;
      const cumulativeData = tempExerciseData.map((exercise) => {
        cumulativeCalories += exercise.calories_burnt;
        cumulativeTime += Number(exercise.duration);
        return {
          ...exercise,
          cumulativeCalories,
          cumulativeTime,
        };
      });

      console.table(cumulativeData);
      

      const mergedDataWithGoal = cumulativeData.map((data) => ({
        ...data,
        caloriesGoal: goal,
      }));

      const getCountedExerciseTypes = (filteredData: Exercise[]): ExerciseType[] => {
        const countMap: Record<string, number> = {};
        filteredData.forEach(exercise => {
          countMap[exercise.exercise] = (countMap[exercise.exercise] || 0) + 1;
        });
        return Object.keys(countMap).map(name => ({ name, value: countMap[name] }));
      };

      setExerciseData(mergedDataWithGoal);
      setExerciseTypeData(getCountedExerciseTypes(tempExerciseData));
    };

    hande_goal_change();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphTimeFrame]);

  return (
    <div className="exerdashboard">
      <ExerciseOverview />
      <div className="box goals">
        <div className="exerdashcont">
          <GoalOverview />
          <GoalSetting
            timeframe={timeFrame}
            setTimeframe={setTimeframe}
            exercisegoaltype={exerciseGoalType}
            setExercisegoal={setExerciseGoalType}
            amount={amount}
            setAmount={setAmount}
            handle_goalsubmit={handle_goalsubmit}
          />
        </div>
      </div>
      <div className="box graph">
        <ExerciseGraph
          exerciseData={exerciseData}
          exerciseTypeData={exerciseTypeData}
          graphtimeframe={graphTimeFrame}
          setGraphtimeframe={setGraphTimeFrame}
        />
      </div>
    </div>
  );
};

export default Exercise;