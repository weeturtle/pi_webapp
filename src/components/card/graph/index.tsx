import './graphstyle.scss';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; //importing React Charts so easy to use no CSS --> so bless : DDD

//Need to change it fopr each one thointerface NutritionDataItem {

//Same ones from each file, present in card.tsx, visual.tsx & graph.tsx as well as log.tsx 
interface NutritionDataItem{
  'food_name': string;
  'quantitiy': number; 
  'calories': number; 
  'date_time': number;
}

interface ExerciseDataItem {
  'exercise_name': string;
  'duration': number; 
  'calories_burnt': number; 
  'exercise_type': string;
  'date_time': number; 
}

interface GlucoseDataItem {
  'glucose_level': number;
  'date_time': number;
  'description': string;
}

//type DataType = 'Glucose' | 'Exercise' | 'Nutrition';
type DataItem = ExerciseDataItem | NutritionDataItem | GlucoseDataItem;

interface GraphData {
  data: DataItem[];
  datatype: string;
  timeframe: string; //need timeframe for this one 
}

//Got rid of the React.FC bad practice ofc!
const Graph = ({ data, datatype, timeframe }:GraphData) => {
  //need to select suitable data for use, lowkey can probably make it more intuirtive but that can be saved for hte indiv pages!
  const formatDataForGraph = (data: DataItem[]) => {
    switch (datatype) {
    case 'Exercise':
      return (data as ExerciseDataItem[]).map((item) => ({
        date: formatDate(item['date_time'], timeframe),
        value: item['calories_burnt'],
      }));
    case 'Nutrition':
      return (data as NutritionDataItem[]).map((item) => ({
        date: formatDate(item['date_time'], timeframe),
        value: item['calories'],
      }));
    case 'Glucose':
      return (data as GlucoseDataItem[]).map((item) => ({
        date: formatDate(item['date_time'], timeframe),
        value: item['glucose_level'],
      }));
    default:
      return [];
    }
  };

  //now need to format label on bottom based on timeframe selected by user!
  const formatDate = (timestamp: number, timeframe: string) => {
    const date = new Date(timestamp);
    switch (timeframe) {
    case 'day':
      return date.toLocaleDateString();
    case 'week':
      return `Week ${getWeekNumber(date)}`; //created function to workout week e.g. week1 or week 8 (of the current year ofc)
    case 'month':
      return date.toLocaleString('default', { month: 'long' });
    case 'year':
      return date.getFullYear().toString();
    default:
      return '';
    }
  };

  //IDK why this is so complicated to do in this lang, python so easy, so get GPT to write this ngl 
  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  //Testing one was meant to show instead of data not avaialeable error msg but oh well
  // for sprint 3 need to add error noti popups --> best believe we are doing that and a full design rehaul cos this green & blue aint it chief
  if (!data) {
    console.error('Data is undefined, cannot format for graph');
    return null;
  }
  
  const formattedData = formatDataForGraph(data); //store


  //add dynamic labels
  return (
    <div className='graph_container'> {/*LOook how beautifiul it is! also complementatry colour for line need to change for revamp!*/}
      {formattedData.length > 0 ? (
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={formattedData}  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#ccc" strokeDasharray='5 5' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Line type='monotone' dataKey='value' stroke='#8884d8' activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div>No data available</div> //need  to format this lowkey but at this point lol I CBAAAAA
      )}
    </div>
  );
};

export default Graph;