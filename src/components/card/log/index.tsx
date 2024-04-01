import './logstyle.scss';

//Need to change it fopr each one tho

//now made all as unique callings of each field in mongoDB database
interface NutritionDataItem { //based upn mongdb  --> got to get Neev & Srikar to have it sent proper
  'food_name': string;
  'quantitiy': number; //mispelt quantity in the db need to brought this up to Neev
  'calories': number; 
  'date-time': number; //for some reason they added "date-time" instead of date_time oh well
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

type DataItem = ExerciseDataItem | NutritionDataItem | GlucoseDataItem; //probably more efficient to create a file with all this data but at this point I CBAAA 

interface LogData {
  data: DataItem[];
  datatype: string;
}

const Log = ({ data, datatype}:LogData) => {
  let tableHeaders: string[] = []; 
  let tableData: (ExerciseDataItem | NutritionDataItem | GlucoseDataItem)[] = [];

  switch (datatype) { //made a switch type
  case 'Exercise': 
    tableHeaders = ['Date', 'Exercise Name', 'Duration', 'Calories Burnt', 'Exercise Type'];
    tableData = data as ExerciseDataItem[];
    break;
  case 'Nutrition':
    tableHeaders = ['Date', 'Food Name', 'Quantity', 'Calories'];
    tableData = data as NutritionDataItem[];
    break;
  case 'Glucose':
    tableHeaders = ['Date', 'Glucose Level', 'Description']; 
    tableData = data as GlucoseDataItem[]; 
    break;
  default:
    return null; //nothing tehr
  }

  return (
    <div className='log_container'>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((item, index) => (
              console.log('Raw date_time value:', item['date-time']),
              <tr key={index}>
                {datatype === 'Exercise' && (
                  <>
                    <td>{new Date(item['date-time']).toLocaleDateString()}</td>
                    {/*<td>{new Date((item as ExerciseDataItem).(item as ExerciseDataItem)['date-time']).toLocaleDateString()}</td>*/}
                    <td>{(item as ExerciseDataItem)['exercise_name']}</td>
                    <td>{(item as ExerciseDataItem)['duration']}</td>
                    <td>{(item as ExerciseDataItem)['calories_burnt']}</td>
                    <td>{(item as ExerciseDataItem)['exercise_type']}</td>
                  </>
                )}
                {datatype === 'Nutrition' && (
                  <>
                    <td>{new Date(item['date-time']).toLocaleDateString()}</td>
                    {/*<td>{new Date((item as NutritionDataItem).(item as NutritionDataItem)['date-time']).toLocaleDateString()}</td>*/}
                    <td>{(item as NutritionDataItem)['food_name']}</td>
                    <td>{(item as NutritionDataItem)['quantitiy']}</td>
                    <td>{(item as NutritionDataItem)['calories']}</td>
                  </>
                )}
                {datatype === 'Glucose' && (
                  <>
                    <td>{new Date(item['date-time']).toLocaleDateString()}</td>
                    {/*<td>{!isNaN(parseFloat(item['glucose-level'])) ? parseFloat(item['glucose-level']) : 'Invalid Level'}</td>*/}
                    {/*<td>{new Date((item as GlucoseDataItem).(item as GlucoseDataItem)['date-time']).toLocaleDateString()}</td>*/}
                    {/*<td>{(item as GlucoseDataItem).(item as GlucoseDataItem)['glucose-level']}</td>*/}
                    <td>{(item as GlucoseDataItem)['glucose-level']}</td>
                    <td>{(item as GlucoseDataItem)['description']}</td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHeaders.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Log;