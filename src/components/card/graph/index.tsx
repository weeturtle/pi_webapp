import './graphstyle.scss';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

//Need to change it fopr each one thointerface NutritionDataItem {
interface NutritionDataItem{
  'food_name': string;
  'quantitiy': number; 
  'calories': number; 
  'date-time': number;
}

interface ExerciseDataItem {
  'exercise_name': string;
  'duration': number; 
  'calories_burnt': number; 
  'exercise_type': string;
  'date-time': number; 
}

interface GlucoseDataItem {
  'glucose-level': number;
  'date-time': number;
  'description': string;
}

//type DataType = 'Glucose' | 'Exercise' | 'Nutrition';
type DataItem = ExerciseDataItem | NutritionDataItem | GlucoseDataItem;

interface GraphData {
  data: DataItem[];
  datatype: string;
  timeframe: string;
}

const Graph: React.FC<GraphData> = ({ data, datatype, timeframe }) => {
  const formatDataForGraph = (data: DataItem[]) => {
    switch (datatype) {
    case 'Exercise':
      return (data as ExerciseDataItem[]).map((item) => ({
        date: formatDate(item['date-time'], timeframe),
        value: item['calories_burnt'],
      }));
    case 'Nutrition':
      return (data as NutritionDataItem[]).map((item) => ({
        date: formatDate(item['date-time'], timeframe),
        value: item['calories'],
      }));
    case 'Glucose':
      return (data as GlucoseDataItem[]).map((item) => ({
        date: formatDate(item['date-time'], timeframe),
        value: item['glucose-level'],
      }));
    default:
      return [];
    }
  };

  const formatDate = (timestamp: number, timeframe: string) => {
    const date = new Date(timestamp);
    switch (timeframe) {
    case 'day':
      return date.toLocaleDateString();
    case 'week':
      return `Week ${getWeekNumber(date)}`;
    case 'month':
      return date.toLocaleString('default', { month: 'long' });
    case 'year':
      return date.getFullYear().toString();
    default:
      return '';
    }
  };

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };


  if (!data) {
    console.error('Data is undefined, cannot format for graph');
    return null;
  }
  
  const formattedData = formatDataForGraph(data);

  return (
    <div className='graph_container'>
      {formattedData.length > 0 ? (
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={formattedData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#ccc" strokeDasharray='5 5' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Line type='monotone' dataKey='value' stroke='#8884d8' activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Graph;