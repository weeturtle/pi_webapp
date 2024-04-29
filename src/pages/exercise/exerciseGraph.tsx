import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './exerciseGraph.scss';

interface Exercise {
  exercise_type: string;
  duration: number;
  calories_burnt: number;
  date_time: string;
}

interface ExerciseType {
  name: string;
  value: number;
}

interface ExerciseGraphProps {
  exerciseData: Exercise[];
  exerciseTypeData: ExerciseType[];
  graphtimeframe: string;
  setGraphtimeframe: (value: string) => void;
}


const ExerciseGraph = ({
  exerciseData,
  exerciseTypeData,
  graphtimeframe,
  setGraphtimeframe
}: ExerciseGraphProps) => {
  const COLOURS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  return (
    <div className="exerdashcont">
      <div className="mainexerciselabel">
        <h1>Exercise Infographics</h1>
      </div>
      <div className="graphdropdown">
        <select value={graphtimeframe} onChange={(e) => setGraphtimeframe(e.target.value)}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
      <div className="graphcontainer">
        <div className="mainexercisegraph">
          <ResponsiveContainer width="100%" height={300}>
            {exerciseData.length > 0 ? (
              <LineChart data={exerciseData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cumulativeCalories" stroke="#8884d8" />
                <Line type="monotone" dataKey="cumulativeTime" stroke="#82ca9d" />
                <Line type="monotone" dataKey="caloriesGoal" stroke="#ff0000" dot={false} strokeDasharray="5 5" />
              </LineChart>
            ) : (
              <p>No data available</p>
            )}
          </ResponsiveContainer>
        </div>
        <div className="mainexercisedonut">
          <ResponsiveContainer width={200} height={200}>
            {exerciseTypeData.length > 0 ? (
              <PieChart>
                <Pie
                  data={exerciseTypeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {exerciseTypeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLOURS[index % COLOURS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            ) : (
              <p>No data available</p>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ExerciseGraph;