import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './goalOverview.scss';
import { useAuth } from '../../auth/AuthProvider';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../vars';

interface Exercise {
  exercise: string;
  duration: number;
  calories_burnt: number;
  date: string;
}

const GoalOverview = () => {
  const { user } = useAuth();
  const [caloriesGoal, setCaloriesGoal] = useState(0);
  const [activityTimeGoal, setActivityTimeGoal] = useState(0);
  const [cumulativeCalories, setCumulativeCalories] = useState(0);
  const [cumulativeTime, setCumulativeTime] = useState(0);
  const [goalsCompleted, setGoalsCompleted] = useState(0);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${BASE_URL}/goal?${new URLSearchParams({
            username: user || '',
            goalType: 'exercise',
            field: 'calories_burnt',
            timeSpan: 'week',
          })}`),
          fetch(`${BASE_URL}/goal?${new URLSearchParams({
            username: user || '',
            goalType: 'exercise',
            field: 'duration',
            timeSpan: 'week',
          })}`)
        ]);
        const [caloriesData, activityTimeData] = await Promise.all(responses.map(res => res.json()));

        setCaloriesGoal(caloriesData.value);
        setActivityTimeGoal(activityTimeData.value);
        console.log('Goals Fetched:', { caloriesData, activityTimeData });
      } catch (error) {
        console.error('Failed to fetch goals:', error);
      }
    };

    const fetchCumulativeData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/exercise?username=${user}&timeSpan=week`);
        const result = await response.json();
        const exerciseData = result.values;

        let cumulativeCalories = 0;
        let cumulativeTime = 0;
        exerciseData.forEach((exercise: Exercise) => {
          cumulativeCalories += exercise.calories_burnt;
          cumulativeTime += exercise.duration;
        });

        setCumulativeCalories(cumulativeCalories);
        setCumulativeTime(cumulativeTime);
        console.log('Cumulative Data:', { cumulativeCalories, cumulativeTime });
        console.table(exerciseData);

        // Calculate completed goals
        const completedGoals = [
          cumulativeCalories >= caloriesGoal ? 1 : 0,
          cumulativeTime >= activityTimeGoal ? 1 : 0
        ].reduce((a, b) => a + b, 0);
        setGoalsCompleted(completedGoals);
      } catch (error) {
        console.error('Failed to fetch cumulative data:', error);
      }
    };

    fetchGoals();
    fetchCumulativeData();
  }, [user]);

  const dataCalories = [
    { name: 'Calories', value: cumulativeCalories },
    { name: 'Remaining', value: Math.max(0, caloriesGoal - cumulativeCalories) },
  ];

  const dataActivity = [
    { name: 'Activity', value: cumulativeTime },
    { name: 'Remaining', value: Math.max(0, activityTimeGoal - cumulativeTime) },
  ];

  const COLOURS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
  
  return (
    <div className="goaloverview">
      <h2>Goal Overview</h2>
      <FontAwesomeIcon icon={faBullseye} />
      <p>Number of goals completed - <b className="goalscompleted"> 1 / 2</b></p>
      <div className="gaugesection">
        <div className="gauge">
          <h3>Calories Burnt</h3>
          <PieChart width={100} height={100}>
            <Pie
              data={dataCalories}
              cx={50}
              cy={50}
              startAngle={180}
              endAngle={0}
              innerRadius={30}
              outerRadius={40}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              name="name"
            >
              {
                dataCalories.map((_, index) => <Cell key={`cell-${index}`} fill={COLOURS[index % COLOURS.length]} />)
              }
            </Pie>
            <Tooltip/>
          </PieChart>
          <div className="gaugelabel">
            <p>{cumulativeCalories} out of {caloriesGoal}</p>
          </div>
        </div>
        <div className="gauge">
          <h3>Activity Time</h3>
          <PieChart width={100} height={100}>
            <Pie
              data={dataActivity}
              cx={50}
              cy={50}
              startAngle={180}
              endAngle={0}
              innerRadius={30}
              outerRadius={40}
              fill="#82ca9d"
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {
                dataActivity.map((_, index) => <Cell key={`cell-${index}`} fill={COLOURS[index % COLOURS.length]} />)
              }
            </Pie>
            <Tooltip/>
          </PieChart>
          <div className="gaugelabel">
            <p>{cumulativeTime} out of {activityTimeGoal}</p>
          </div>
        </div>
      </div>
    </div>



  );
};

export default GoalOverview;