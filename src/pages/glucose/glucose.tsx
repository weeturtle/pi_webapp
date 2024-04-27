import { useState, useEffect } from 'react';
import GlucoseOverview from './glucoseOverview';
import GoalsOverview from './goalsOverview';
import GlucoseTimeline from './glucoseTimeline';
import './glucose.scss';
import { BASE_URL } from '../../vars';
import { useAuth } from '../../auth/AuthProvider';

interface GlucoseEntry {
  description: string;
  date_time: string;
  glucose_level: number;
}

const Glucose = () => {
  const handle_goalsubmit = async () => {

  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  const [amount, setAmount] = useState<number>(0);
  const [graphTimeFrame, setGraphtimeframe] = useState('year');
  const [timeFrame, setTimeframe] = useState('day');
  const [glucoseData, setGlucoseData] = useState<GlucoseEntry[]>([]);
  const [goal, setGoal] = useState<number | null>(null);

  const { user } = useAuth();

  useEffect(() => {  
    const fetchGoal = async () => {
      //fetch goal data for current timeframe
      const raw_goal = await fetch(`${BASE_URL}/goal?${new URLSearchParams({
        username: user || '',
        goalType: 'glucose',
        field: 'calories_burnt',
        timeSpan: graphTimeFrame,
      })}`, {
        method: 'GET'
      });

      const goal_data = await raw_goal.json();
      console.table(goal_data);
      return goal_data.goal;
    };

    const handleChangeTimeFrame = async () => {
      setGoal(await fetchGoal());
    
      const mergedDataWithGoal = glucoseData.map(data => ({
        ...data,
        goal: goal,
      }));

      setGlucoseData(mergedDataWithGoal);
      setGoal(goal);
    };

    handleChangeTimeFrame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphTimeFrame]);


  const dataCalories = [
    { name: 'Calories', value: 800 },
    { name: 'Remaining', value: 1200 },
  ];

  return (
    <div className="glucdashboard">
      <div className="box glucose-everything">
        <GlucoseOverview
          filteredGlucoseData={glucoseData}
          graphtimeframe={graphTimeFrame}
          setGraphtimeframe={setGraphtimeframe}
        />
      </div>
      <div className="box carousel"></div>
      <div className="box goals-overview">
        <GoalsOverview
          dataCalories={dataCalories}
          COLORS={COLORS}
          timeframe={timeFrame}
          setTimeframe={setTimeframe}
          amount={amount}
          setAmount={setAmount}
          handle_goalsubmit={handle_goalsubmit}
        />
      </div>
      <div className="box timeline">
        <GlucoseTimeline glucoseData={glucoseData} />
      </div>
    </div>
  );
};

export default Glucose;