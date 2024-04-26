import './exercise.scss';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faClock, faDumbbell, faPersonWalking, faBullseye, faArrowTrendUp, faArrowTrendDown} from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell} from 'recharts';

//Exercise interface
interface Exercise{
  exercise: string;
  time: number;
  calories: number;
  date: string;
}

//Exercise type mainly for pie chart
interface ExerciseType{
  name: string;
  value: number;
}

//gauge modification interface to make into half eaten donut --> for the goals tile
interface gaugeProp {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const Exercise = () => {
  const [filteredExerciseData, setFilteredExerciseData] = useState<Exercise[]>([]);//for the graph section generating the data
  const [filteredExerciseTypeData, setFilteredExerciseTypeData] = useState<ExerciseType[]>([]);//graph section again for pie chart

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']; //colours for piechart

  //Mock EXERCSISE DATA -- Link to actual used in mainly the GRAPH section
  const exerciseData: Exercise[] = [
    { exercise: 'Swimming', time: 109, calories: 872, date: '11:06, 28-01-2024' },
    { exercise: 'Running', time: 55, calories: 660, date: '13:12, 14-02-2024' },
    { exercise: 'Running', time: 98, calories: 1176, date: '21:07, 28-02-2024' },
    { exercise: 'Martial Arts', time: 61, calories: 549, date: '01:59, 05-03-2024' },
    { exercise: 'Cycling', time: 82, calories: 820, date: '15:55, 08-03-2024' },
    { exercise: 'Cycling', time: 120, calories: 840, date: '16:57, 13-03-2024' },
    { exercise: 'Martial Arts', time: 91, calories: 455, date: '10:25, 28-03-2024' },
    { exercise: 'Swimming', time: 24, calories: 144, date: '04:40, 05-04-2024' },
    { exercise: 'Running', time: 80, calories: 880, date: '05:43, 06-04-2024' },
    { exercise: 'Other', time: 82, calories: 902, date: '20:02, 15-04-2024' },
    { exercise: 'Running', time: 30, calories: 200, date: '09:00, 01-01-2023' },
    { exercise: 'Cycling', time: 45, calories: 300, date: '10:30, 02-01-2023' },
    { exercise: 'Running', time: 93, calories: 558, date: '13:31, 14-01-2023' },
    { exercise: 'Dance', time: 110, calories: 1210, date: '23:38, 17-01-2023' },
    { exercise: 'Dance', time: 117, calories: 1287, date: '18:25, 21-01-2023' },
    { exercise: 'Other', time: 77, calories: 462, date: '20:39, 11-02-2023' },
    { exercise: 'Martial Arts', time: 83, calories: 830, date: '20:48, 12-02-2023' },
    { exercise: 'Yoga', time: 80, calories: 480, date: '13:44, 15-02-2023' },
    { exercise: 'Yoga', time: 27, calories: 135, date: '23:31, 17-02-2023' },
    { exercise: 'Weightlifting', time: 22, calories: 198, date: '17:01, 01-03-2023' },
  ];
  
  
  //const [exercisetype, setType] = useState<string>();
  //const [Muscle, setMuscle] = useState<string>();
  //const [difficulty, setDifficulty] = useState<string>();
  
  const [timeframe, setTimeframe] = useState('day'); //for the goals section
  const [graphtimeframe, setGraphtimeframe] = useState('year'); //graph specific dropdown
  const [exercisegoaltype, setExercisegoal] = useState('calorie');
  const [amount, setAmount] = useState<number>(0);//goals section again

  const handle_goalsubmit = async () => { //probably will be kept here
    //handle the goal buiissioin

  };


  //For the graph generating the lines and goal line
  useEffect(() => {
    // Parse the date from the string.
    const parseDate = (dateStr: string): Date => {
      const [time, day] = dateStr.split(', ');
      const [hours, minutes] = time.split(':').map(Number);
      const [dd, mm, yyyy] = day.split('-').map(Number);
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

    // Filter the data based on the selected timeframe
    const filteredData = exerciseData.filter((exercise) => {
      const exerciseDate = parseDate(exercise.date);
      const startDate = getStartDate(graphtimeframe);
      return exerciseDate >= startDate && exerciseDate <= new Date();
    });

    //calculating cumulative calories burnt and time
    let cumulativeCalories = 0;
    let cumulativeTime = 0;
    const cumulativeData = filteredData.map((exercise) => {
      cumulativeCalories += exercise.calories;
      cumulativeTime += exercise.time;
      return {
        ...exercise,
        cumulativeCalories,
        cumulativeTime,
      };
    });

    //set the goal based on the selected timeframe
    const getGoal = (timeframe: string) => {
      switch (timeframe) {
      case 'day':
        return { calories: 100};
      case 'week':
        return { calories: 350};
      case 'month':
        return { calories: 500};
      case 'year':
        return { calories: 1800};
      default:
        return { calories: 0};
      }
    };

    const goal = getGoal(graphtimeframe);

    //mergikng the goal point to the cumulative data to make line
    const mergedDataWithGoal = cumulativeData.map((data) => ({
      ...data,
      caloriesGoal: goal.calories,
    }));

    //counting exercise types for the pie chart
    const getCountedExerciseTypes = (filteredData: Exercise[]): ExerciseType[] => {
      const countMap: Record<string, number> = {};
      filteredData.forEach(exercise => {
        countMap[exercise.exercise] = (countMap[exercise.exercise] || 0) + 1;
      });
      return Object.keys(countMap).map(name => ({ name, value: countMap[name] }));
    };

    //now creates the goal and time 
    setFilteredExerciseData(mergedDataWithGoal);
    setFilteredExerciseTypeData(getCountedExerciseTypes(filteredData));

  }, [graphtimeframe]);



  /*Gauge*/
  //gauge mock values for calories burnt goal
  const dataCalories = [
    { name: 'Calories', value: 800 },
    { name: 'Remaining', value: 1200 }, 
  ];
  //gauge mock values for activity time goal
  const dataActivity = [
    { name: 'Activity', value: 56 },
    { name: 'Remaining', value: 4 },
  ];

  //creates the 180* of the piechart to look like a guage
  //copied from yt guy it splits the piechart in half!
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }: gaugeProp) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


  return (
    <div className="exerdashboard">
      <div className="box fitness">
        <div className="exerdashcont">
          <h1>Weekly Fitness Overview</h1>
          <div className="line"></div>
          <div className="fitnesspart">
            <div className="Caloriesburnt">
              <div className="header">
                <h2>Calories Burnt:</h2>
              </div>
              <div className="boldvalue">
                <FontAwesomeIcon icon={faFire} />
                <p className="actualvalue">800</p>
                <p className="calslabel">cals</p>
              </div>
              <div className="change">
                <p>Up 5% from last week!</p>
                <FontAwesomeIcon icon={faArrowTrendUp} />
              </div>
            </div>
            <div className="Activetime">
              <div className="header">
                <h2>Total Activity Time:</h2>
              </div>
              <div className="boldvalue">
                <FontAwesomeIcon icon={faClock} />
                <p className="actualvalue">56</p>
                <p className="minslabel">mins</p>
              </div>
              <div className="change">
                <p>Down 12% from last week!</p>
                <FontAwesomeIcon icon={faArrowTrendDown} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box exercise">
        <div className="exerdashcont">
          <h1>Weekly Exercise Overview</h1>
          <div className="line"></div>
          <div className="exercisepart">
            <div className="Exercisescompleted">
              <div className="header">
                <h2>Workouts logged:</h2>
              </div>
              <div className="boldvalue">
                <FontAwesomeIcon icon={faDumbbell} />
                <p className="actualvalue">2</p>
                <p className="excomplabel">workouts</p>
              </div>
              <div className="change">
                <p>Down 7% from last week!</p>
                <FontAwesomeIcon icon={faArrowTrendDown} />
              </div>
            </div>
            <div className="Exerciserating">
              <div className="header">
                <h2>Exercise Diversity:</h2>
              </div>
              <div className="boldvalue">
                <FontAwesomeIcon icon={faPersonWalking} />
                <p className="actualvalue">8</p>
                <p className="divlabel">exercises</p>
              </div>
              <div className="change">
                <p>Up 50% from last week!</p>
                <FontAwesomeIcon icon={faArrowTrendUp} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box goals">
        <div className="exerdashcont">
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
                      dataCalories.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                  </Pie>
                  <Tooltip/>
                </PieChart>
                <div className="gaugelabel">
                  <p>800 out of 2000</p>
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
                      dataActivity.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                  </Pie>
                  <Tooltip/>
                </PieChart>
                <div className="gaugelabel">
                  <p>56 out of 60</p>
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
                  <div className="selectionsvari">
                    <label>Goal Type</label>
                    <select
                      value={exercisegoaltype}
                      onChange={(e) => setExercisegoal(e.target.value)}
                    >
                      <option value="calorie">Calories Burnt</option>
                      <option value="activitytime">Activity Time</option>
                    </select>
                  </div>
                </div>
                <div className="selectionsamo">
                  <label>Select Goal</label>
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
      </div>
      <div className="box graph">
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
                {filteredExerciseData.length > 0 ? (
                  <LineChart data={filteredExerciseData}>
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
                {filteredExerciseTypeData.length > 0 ? (
                  <PieChart>
                    <Pie
                      data={filteredExerciseTypeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                    >
                      {filteredExerciseTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
      </div>
    </div>
  );
};

export default Exercise;