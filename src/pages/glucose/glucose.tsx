import './glucose.scss';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye} from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,CartesianGrid, PieChart, Pie, Cell} from 'recharts';
import { Chrono } from 'react-chrono';

interface GlucoseEntry {    
  description: string;
  date_time: string;
  glucose_level: number;
}

const Glucose = () => {

  const glucoseData: GlucoseEntry[] = [
    { description: 'Before lunch', date_time: '14:10, 26-03-24', glucose_level: 2.2 },
    { description: 'After dinner', date_time: '20:30, 26-03-24', glucose_level: 7.8 },
    { description: 'Before breakfast', date_time: '07:15, 27-03-24', glucose_level: 4.5 },
    { description: 'After lunch', date_time: '13:20, 27-03-24', glucose_level: 8.0 },
    { description: 'Before dinner', date_time: '18:45, 27-03-24', glucose_level: 6.1 },
    { description: 'After breakfast', date_time: '09:10, 28-03-24', glucose_level: 9.2 },
    { description: 'Before lunch', date_time: '12:10, 28-03-24', glucose_level: 3.6 },
    { description: 'After dinner', date_time: '19:55, 28-03-24', glucose_level: 7.4 },
    { description: 'Before breakfast', date_time: '08:05, 29-03-24', glucose_level: 4.9 },
    { description: 'After lunch', date_time: '14:30, 29-03-24', glucose_level: 5.8 },
    { description: 'Before dinner', date_time: '17:50, 29-03-24', glucose_level: 5.1 },
    { description: 'After breakfast', date_time: '09:30, 30-03-24', glucose_level: 10.0 },
    { description: 'Before lunch', date_time: '11:45, 30-03-24', glucose_level: 3.5 },
    { description: 'After dinner', date_time: '20:00, 30-03-24', glucose_level: 7.9 },
    { description: 'Before breakfast', date_time: '06:50, 31-03-24', glucose_level: 4.3 },
    { description: 'After lunch', date_time: '13:40, 31-03-24', glucose_level: 6.7 },
    { description: 'Before dinner', date_time: '18:30, 31-03-24', glucose_level: 5.4 },
    { description: 'After breakfast', date_time: '08:20, 01-04-24', glucose_level: 8.6 },
    { description: 'Before lunch', date_time: '12:30, 01-04-24', glucose_level: 3.8 },
    { description: 'After dinner', date_time: '19:45, 01-04-24', glucose_level: 7.2 },
    { description: 'After jogging', date_time: '07:00, 24-04-24', glucose_level: 6.0 },
    { description: 'Before judo', date_time: '17:30, 24-04-24', glucose_level: 5.2 },
    { description: 'Post meditation', date_time: '06:45, 25-04-24', glucose_level: 5.9 },
    { description: 'After cycling', date_time: '14:15, 25-04-24', glucose_level: 7.1 },
    { description: 'Pre yoga', date_time: '18:50, 25-04-24', glucose_level: 4.6 },
    { description: 'After swimming', date_time: '07:20, 26-04-24', glucose_level: 6.3 },
    { description: 'Before bed', date_time: '22:00, 26-04-24', glucose_level: 5.5 }
  ];


  const handle_goalsubmit = async () => {
    //handle the goal buiissioin
    //actuall chuck it all in
    //Ill help with the validation but lowkey you should be fine with (try use toast, uwu)

  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  const [amount, setAmount] = useState<number>(0);
  const [graphtimeframe, setGraphtimeframe] = useState('year');
  const [timeframe, setTimeframe] = useState('day');
  const [filteredGlucoseData, setFilteredGlucoseData] = useState<GlucoseEntry[]>([]);
  const [goal, setGoal] = useState<number | null>(null);

  useEffect(() => {
    // Parse the date from the string -- different approach cos for some reason methdo used ib other 2 was playing up
    const parseDate = (dateStr: string): Date => {
      const [time, day] = dateStr.split(', ');
      const [hours, minutes] = time.split(':').map(Number);
      const [dd, mm, yy] = day.split('-').map(Number);
      const yyyy = 2000 + yy; 
      return new Date(yyyy, mm - 1, dd, hours, minutes);
    };
  
    // Get the start date based on the selected timeframe
    const getStartDate = (timeframe: string): Date => {
      const now = new Date();
      switch (timeframe) {
      case 'day':
        return new Date(now.setHours(0, 0, 0, 0));
      case 'week':
        return new Date(now.setDate(now.getDate() - 7));
      case 'month':
        return new Date(now.setMonth(now.getMonth() - 1));
      case 'year':
        return new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        return now;
      }
    };
  
    // Filter the glucose data based on the selected timeframe
    const filteredGlucoseData = glucoseData.filter((entry) => {
      const entryDate = parseDate(entry.date_time);
      const startDate = getStartDate(graphtimeframe);
      const result = entryDate >= startDate && entryDate <= new Date();
      return result;
    });


    // Set the goal based on the selected timeframe
    const getGoal = (timeframe: string) => {
      switch (timeframe) {
      case 'day':
        return 6.0;
      case 'week':
        return 5.5;
      case 'month':
        return 5.0;
      case 'year':
        return 4.5;
      default:
        return null;
      }
    };
  
    const goal = getGoal(graphtimeframe);
  
    const mergedDataWithGoal = filteredGlucoseData.map(data => ({
      ...data,
      goal: goal,
    }));

    // Update state with the filtered data and goal
    setFilteredGlucoseData(mergedDataWithGoal);
    setGoal(goal);
  }, [graphtimeframe]);


  //gauge mock data
  const dataCalories = [
    { name: 'Calories', value: 800 },
    { name: 'Remaining', value: 1200 }, 
  ];

  //Timeline  Stuff
  //converting date
  const formatDate = (dateString: string, glucoseLevel: number, description: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', weekday: 'long' };
    const [time, day] = dateString.split(', ');
    const [dd, mm, yy] = day.split('-').map(Number);
    const date = new Date(2000 + yy, mm - 1, dd);
    const formattedDate = date.toLocaleDateString('en-US', options);
    return `${formattedDate} - ${glucoseLevel} (${description})`;
  };
  //Formatting so title has essential info
  const getTimelineItems = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    //filtering to only this week
    const filteredData = glucoseData.filter((entry) => {
      const [time, day] = entry.date_time.split(', ');
      const [dd, mm, yy] = day.split('-').map(Number);
      const entryDate = new Date(2000 + yy, mm - 1, dd);
      return entryDate >= oneWeekAgo;
    });
  
    return filteredData.map((entry) => ({
      title: formatDate(entry.date_time, entry.glucose_level, entry.description),
      cardDetailedText: entry.description,
    }));
  };


  return (
    <div className="glucdashboard">
      <div className="box glucose-everything">
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
            <Line type="monotone" dataKey="goal" stroke="#ff0000" dot={false} strokeDasharray="5 5"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="box carousel"></div>
      <div className="box goals-overview">
        <div className="goalglucoverview">
          <h2>Goal Overview</h2>
          <FontAwesomeIcon icon={faBullseye} />
          <p>Number of goals completed - <b className="goalscompleted"> 1 / 2</b></p>
          <div className="gaugesection">
            <div className="gauge">
              <PieChart width={75} height={75}>
                <Pie
                  data={dataCalories}
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
                  {
                    dataCalories.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                  }
                </Pie>
                <Tooltip/>
              </PieChart>
              <div className="gaugelabel">
                <p>4.7 out of 6</p>
              </div>
            </div>
          </div>
        </div>
        <div className="goal">
          <div className="goalsetting">
            <h2>Goal Setting</h2>
            <div className="selections">
              <div className="selection-row">
                <div className="selectionstimeframe">
                  <label>Goal Timeframe</label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                  >
                    <option value="da">Daily</option>
                    <option value="week">Weekly</option>
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                  </select>
                </div>
              </div>
              <div className="selectionsamo">
                <label>Select Glucose Goal</label>
                <input
                  value={amount ? amount : ''}
                  type='number'
                  onChange={(e) => setAmount(e.target.value as unknown as number)}
                />
              </div>
              <button className='submit' onClick={handle_goalsubmit}>
                Set Goal
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="box timeline">
        <div className="Gluctimeline">
          <Chrono items={getTimelineItems()} mode="HORIZONTAL" />
        </div>
      </div>
    </div>
  );
};

export default Glucose;