import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import './metricsBreakdown.scss';

interface MetricsBreakdownProps {
  cumulativeCaloriesData: { date: string; cumulativeCalories: number; cumulativeExerciseCalories: number; goal: number }[];
  graphtimeframe: string;
  setGraphtimeframe: (value: string) => void;
}

const MetricsBreakdown = ({
  cumulativeCaloriesData,
  graphtimeframe,
  setGraphtimeframe,
}: MetricsBreakdownProps) => {
  return (
    <div className="box metrics-breakdown">
      <h1>Exercise and Calorie Consumption</h1>
      <div className="timeframe-dropdown">
        <select value={graphtimeframe} onChange={(e) => setGraphtimeframe(e.target.value)}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={cumulativeCaloriesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cumulativeCalories" stroke="#82ca9d" />
          <Line type="monotone" dataKey="cumulativeExerciseCalories" stroke="#8884d8" />
          <Line type="monotone" dataKey="goal" stroke="#ff0000" dot={false} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsBreakdown;