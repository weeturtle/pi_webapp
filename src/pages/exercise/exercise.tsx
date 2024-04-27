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
  time: number;
  calories: number;
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

  const { user } = useAuth();

  const handle_goalsubmit = async () => { //probably will be kept here
    //handle the goal buiissioin

  };

  const fetch_exercise = async () => {
    //fetch exercise data for current timeframe
    console.log('fetching exercise data');

    const response = await fetch(`${BASE_URL}/exercise?username=${user}&timeSpan=month`); //expectss both username & timeframe (hopefully the timeframe is suitable!)
    const result = await response.json();

    console.table(result.values);

    
    setExerciseData(result.values);
  };

  useEffect(() => {
    const hande_goal_change = async () => {

      const fetch_exercise = async () => {
        //fetch exercise data for current timeframe
        console.log('fetching exercise data');
  
        const response = await fetch(`${BASE_URL}/exercise?username=${user}&timeSpan=month`); //expectss both username & timeframe (hopefully the timeframe is suitable!)
        const result = await response.json();
  
        console.table(result.values);

        
        setExerciseData(result.values);
      };

      fetch_exercise();

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
        return goal_data.goal;
      };
    
      let cumulativeCalories = 0;
      let cumulativeTime = 0;
      const cumulativeData = exerciseData.map((exercise) => {
        cumulativeCalories += exercise.calories;
        cumulativeTime += exercise.time;
        return {
          ...exercise,
          cumulativeCalories,
          cumulativeTime,
        };
      });
    
      const goal = await fetch_goal();

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
      setExerciseTypeData(getCountedExerciseTypes(exerciseData));
    };

    hande_goal_change();

    console.log('exercise data changed');
    console.table(exerciseData);
  }, [graphTimeFrame]);

  return (
    <div className="exerdashboard">
      <button onClick={fetch_exercise}>Fetch Exercise</button>
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