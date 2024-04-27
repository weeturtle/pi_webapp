import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import './glucoseOverview.scss';

interface GlucoseEntry {
  description: string;
  date_time: string;
  glucose_level: number;
}

interface GlucoseOverviewProps {
  filteredGlucoseData: GlucoseEntry[];
  graphtimeframe: string;
  setGraphtimeframe: (value: string) => void;
}

const GlucoseOverview = ({
  filteredGlucoseData,
  graphtimeframe,
  setGraphtimeframe,
}: GlucoseOverviewProps) => {
  return (
    <div className="glucose-everything">
      <h1>Glucose Levels</h1>
      <div className="timeframe-dropdown">
        <select value={graphtimeframe} onChange={(e) => setGraphtimeframe(e.target.value)}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={filteredGlucoseData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date_time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="glucose_level" stroke="#8884d8" />
          <Line type="monotone" dataKey="goal" stroke="#ff0000" dot={false} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GlucoseOverview;