import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './goalsOverview.scss';
import { BASE_URL } from '../../vars';
import { useAuth } from '../../auth/AuthProvider';

interface GlucoseEntry {
  description: string;
  date_time: string;
  glucose_level: number;
}

interface GoalsOverviewProps {
  COLORS: string[];
}

interface DataGlucoseEntry {
  name: string;
  value: number;
}

const GoalsOverview = ({ COLORS }: GoalsOverviewProps) => {
  const [averageGlucose, setAverageGlucose] = useState(0);
  const [glucoseGoal, setGlucoseGoal] = useState(0);
  const [dataGlucose, setDataGlucose] = useState<DataGlucoseEntry[]>([]);
  const [goalAchieved, setGoalAchieved] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAverageGlucose = async () => {
      const currentDate = new Date();
      const startOfCurrentWeek = new Date(currentDate);
      startOfCurrentWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const startOfLastWeek = new Date(startOfCurrentWeek);
      startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

      const response = await fetch(`${BASE_URL}/glucose?username=${user}&timeSpan=month`);
      const result = await response.json();
      const glucoseData: GlucoseEntry[] = result.success ? result.values : [];

      const thisWeekGlucoseData = glucoseData.filter((entry) => {
        const entryDate = new Date(entry.date_time);
        return entryDate >= startOfCurrentWeek;
      });

      if (thisWeekGlucoseData.length === 0) {
        const lastWeekGlucoseData = glucoseData.filter((entry) => {
          const entryDate = new Date(entry.date_time);
          return entryDate >= startOfLastWeek && entryDate < startOfCurrentWeek;
        });
        const totalGlucose = lastWeekGlucoseData.reduce((sum, entry) => sum + entry.glucose_level, 0);
        const average = totalGlucose / lastWeekGlucoseData.length;
        setAverageGlucose(Number(average.toFixed(1)));
      } else {
        const totalGlucose = thisWeekGlucoseData.reduce((sum, entry) => sum + entry.glucose_level, 0);
        const average = totalGlucose / thisWeekGlucoseData.length;
        setAverageGlucose(Number(average.toFixed(1)));
      }
    };

    const fetchGlucoseGoal = async () => {
      const raw_goal = await fetch(`${BASE_URL}/goal?${new URLSearchParams({
        username: user || '',
        goalType: 'glucose',
        field: 'mmol',
        timeSpan: 'week',
      })}`, {
        method: 'GET'
      });
      const goal_data = await raw_goal.json();
      setGlucoseGoal(goal_data.value);
    };

    fetchAverageGlucose();
    fetchGlucoseGoal();
  }, [user]);
  
  useEffect(() => {
    const newDataGlucose = [
      { name: 'Average Glucose', value: averageGlucose },
      { name: 'Remaining', value: Math.round(Math.max(0, glucoseGoal - averageGlucose)) },
    ];
    setDataGlucose(newDataGlucose);

    const newGoalAchieved = Math.abs(glucoseGoal - averageGlucose) <= 1.0;
    setGoalAchieved(newGoalAchieved);
  }, [averageGlucose, glucoseGoal]);
  
  return (
    <div className="goals-overview">
      <div className="goalglucoverview">
        <h2>Goal Overview</h2>
        <FontAwesomeIcon icon={faBullseye} />
        <p>
          Within Goal level - <b className={`goalscompleted ${goalAchieved ? 'within-goal' : ''}`}>
            {goalAchieved ? 'Yes' : 'No'}
          </b>
        </p>
        <div className="gaugesection">
          <div className="gauge">
            <PieChart width={75} height={75}>
              <Pie
                data={dataGlucose}
                cx={37.5}
                cy={37.5}
                startAngle={180}
                endAngle={0}
                innerRadius={22.5}
                outerRadius={30}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                name="name"
              >
                {dataGlucose.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="gaugelabel">
              <p>{averageGlucose} out of {glucoseGoal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsOverview;