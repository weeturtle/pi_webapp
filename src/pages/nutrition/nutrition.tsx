import './nutrition.scss';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faBullseye, faArrowTrendUp, faArrowTrendDown} from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell} from 'recharts';


interface Exercise{   
  exercise: string;
  time: number;
  calories: number;
  date: string;
}


interface CalorieIntake {
  food: string;
  quantity: number;
  calories: number;
  date: string;
}


interface MacroEntry {
  date_time: string;
  food_name: string;
  quantity: string;
  calories: number;
  carbs_g: number;
  fat_saturated_g: number;
  fat_total_g: number;
  cholesterol_mg: number;
  fiber_g: number;
  potassium_mg: number;
  protein_g: number;
  sodium_mg: number;
  sugar_g: number;
}

interface gaugeProp {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

interface PieData {
  name: string;
  value: number;
}


const Nutrition = () => {

  const initialmacroData: MacroEntry[] = [
    { date_time: '08:30, 26-04-2024', food_name: 'Chicken Breast', quantity: '200g', calories: 330, carbs_g: 0, fat_saturated_g: 3.5, fat_total_g: 13, cholesterol_mg: 110, fiber_g: 0, potassium_mg: 530, protein_g: 50, sodium_mg: 300, sugar_g: 0 },
    { date_time: '12:15, 25-04-2024', food_name: 'Salmon', quantity: '150g', calories: 340, carbs_g: 0, fat_saturated_g: 5, fat_total_g: 20, cholesterol_mg: 90, fiber_g: 0, potassium_mg: 550, protein_g: 40, sodium_mg: 400, sugar_g: 0 },
    { date_time: '09:45, 25-04-2024', food_name: 'Avocado', quantity: '100g', calories: 160, carbs_g: 9, fat_saturated_g: 2, fat_total_g: 15, cholesterol_mg: 0, fiber_g: 7, potassium_mg: 485, protein_g: 2, sodium_mg: 10, sugar_g: 0 },
    { date_time: '19:00, 24-04-2024', food_name: 'Brown Rice', quantity: '150g', calories: 170, carbs_g: 36, fat_saturated_g: 0.5, fat_total_g: 1.5, cholesterol_mg: 0, fiber_g: 2, potassium_mg: 55, protein_g: 3, sodium_mg: 0, sugar_g: 0 },
    { date_time: '10:30, 24-04-2024', food_name: 'Greek Yogurt', quantity: '200g', calories: 120, carbs_g: 8, fat_saturated_g: 0, fat_total_g: 5, cholesterol_mg: 10, fiber_g: 0, potassium_mg: 240, protein_g: 12, sodium_mg: 50, sugar_g: 6 },
    { date_time: '08:00, 23-04-2024', food_name: 'Egg (boiled)', quantity: '1 large', calories: 70, carbs_g: 1, fat_saturated_g: 1.6, fat_total_g: 5, cholesterol_mg: 185, fiber_g: 0, potassium_mg: 70, protein_g: 6, sodium_mg: 70, sugar_g: 0 },
    { date_time: '13:45, 23-04-2024', food_name: 'Quinoa', quantity: '150g', calories: 170, carbs_g: 30, fat_saturated_g: 1.5, fat_total_g: 2.5, cholesterol_mg: 0, fiber_g: 5, potassium_mg: 240, protein_g: 6, sodium_mg: 5, sugar_g: 0 },
    { date_time: '11:00, 22-04-2024', food_name: 'Broccoli', quantity: '100g', calories: 35, carbs_g: 7, fat_saturated_g: 0, fat_total_g: 0.5, cholesterol_mg: 0, fiber_g: 3, potassium_mg: 320, protein_g: 3, sodium_mg: 30, sugar_g: 2 },
    { date_time: '07:30, 22-04-2024', food_name: 'Almonds', quantity: '30g', calories: 180, carbs_g: 6, fat_saturated_g: 1, fat_total_g: 15, cholesterol_mg: 0, fiber_g: 3, potassium_mg: 200, protein_g: 7, sodium_mg: 0, sugar_g: 1 },
    { date_time: '09:00, 21-04-2024', food_name: 'Spinach', quantity: '100g', calories: 23, carbs_g: 4, fat_saturated_g: 0, fat_total_g: 0.4, cholesterol_mg: 0, fiber_g: 2, potassium_mg: 550, protein_g: 3, sodium_mg: 80, sugar_g: 0 },
    { date_time: '12:30, 21-04-2024', food_name: 'Cottage Cheese', quantity: '150g', calories: 120, carbs_g: 3, fat_saturated_g: 2, fat_total_g: 7, cholesterol_mg: 30, fiber_g: 0, potassium_mg: 150, protein_g: 13, sodium_mg: 360, sugar_g: 3 },
    { date_time: '08:00, 20-04-2024', food_name: 'Apple', quantity: '1 medium', calories: 95, carbs_g: 25, fat_saturated_g: 0, fat_total_g: 0.3, cholesterol_mg: 0, fiber_g: 4, potassium_mg: 195, protein_g: 1, sodium_mg: 2, sugar_g: 19 },
    { date_time: '14:00, 20-04-2024', food_name: 'Blueberries', quantity: '100g', calories: 57, carbs_g: 14, fat_saturated_g: 0, fat_total_g: 0.4, cholesterol_mg: 0, fiber_g: 2, potassium_mg: 77, protein_g: 0.7, sodium_mg: 1, sugar_g: 10 },
    { date_time: '09:30, 19-04-2024', food_name: 'Carrots', quantity: '100g', calories: 41, carbs_g: 10, fat_saturated_g: 0, fat_total_g: 0.2, cholesterol_mg: 0, fiber_g: 2.8, potassium_mg: 320, protein_g: 0.9, sodium_mg: 69, sugar_g: 4.7 },
    { date_time: '12:00, 19-04-2024', food_name: 'Walnuts', quantity: '30g', calories: 200, carbs_g: 4, fat_saturated_g: 1.5, fat_total_g: 20, cholesterol_mg: 0, fiber_g: 2, potassium_mg: 125, protein_g: 5, sodium_mg: 0, sugar_g: 1 },
    { date_time: '07:45, 18-04-2024', food_name: 'Banana', quantity: '1 medium', calories: 105, carbs_g: 27, fat_saturated_g: 0.3, fat_total_g: 0.4, cholesterol_mg: 0, fiber_g: 3.1, potassium_mg: 422, protein_g: 1.3, sodium_mg: 1, sugar_g: 14 },
    { date_time: '13:30, 18-04-2024', food_name: 'Tofu', quantity: '100g', calories: 76, carbs_g: 1.9, fat_saturated_g: 0.3, fat_total_g: 4.8, cholesterol_mg: 0, fiber_g: 0.9, potassium_mg: 121, protein_g: 8, sodium_mg: 7, sugar_g: 0.4 },
    { date_time: '11:15, 17-04-2024', food_name: 'Green Beans', quantity: '100g', calories: 31, carbs_g: 7, fat_saturated_g: 0, fat_total_g: 0.1, cholesterol_mg: 0, fiber_g: 3.4, potassium_mg: 209, protein_g: 1.8, sodium_mg: 6, sugar_g: 3.3 },
    { date_time: '08:45, 17-04-2024', food_name: 'Grapes', quantity: '100g', calories: 67, carbs_g: 17, fat_saturated_g: 0.1, fat_total_g: 0.4, cholesterol_mg: 0, fiber_g: 0.9, potassium_mg: 191, protein_g: 0.6, sodium_mg: 2, sugar_g: 16 },
    { date_time: '14:00, 16-04-2024', food_name: 'Turkey Breast', quantity: '100g', calories: 135, carbs_g: 0, fat_saturated_g: 0.5, fat_total_g: 1, cholesterol_mg: 37, fiber_g: 0, potassium_mg: 250, protein_g: 30, sodium_mg: 52, sugar_g: 0 },
    { date_time: '09:30, 16-04-2024', food_name: 'Lentils', quantity: '100g', calories: 353, carbs_g: 63, fat_saturated_g: 0.4, fat_total_g: 1.1, cholesterol_mg: 0, fiber_g: 10.7, potassium_mg: 955, protein_g: 25, sodium_mg: 2, sugar_g: 2 }
  ];

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


  const calorieData: CalorieIntake[] = [
    { food: 'Eggs', quantity: 155, calories: 155, date: '00:00, 03-10-2023' },
    { food: 'Oatmeal', quantity: 68, calories: 68, date: '00:00, 30-07-2023' },
    { food: 'Yogurt', quantity: 59, calories: 59, date: '00:00, 21-11-2023' },
    { food: 'Apple', quantity: 52, calories: 52, date: '00:00, 18-10-2023' },
    { food: 'Broccoli', quantity: 55, calories: 55, date: '00:00, 01-09-2023' },
    { food: 'Apple', quantity: 52, calories: 52, date: '00:00, 26-11-2023' },
    { food: 'Apple', quantity: 52, calories: 52, date: '00:00, 26-06-2023' },
    { food: 'Yogurt', quantity: 59, calories: 59, date: '00:00, 23-07-2023' },
    { food: 'Eggs', quantity: 155, calories: 155, date: '00:00, 25-03-2023' },
    { food: 'Yogurt', quantity: 59, calories: 59, date: '00:00, 29-01-2023' },
    { food: 'Milk', quantity: 42, calories: 42, date: '00:00, 25-01-2024' },
    { food: 'Yogurt', quantity: 59, calories: 59, date: '00:00, 17-04-2023' },
    { food: 'Broccoli', quantity: 55, calories: 55, date: '00:00, 16-04-2023' },
    { food: 'Chicken Breast', quantity: 165, calories: 165, date: '00:00, 03-01-2024' },
    { food: 'Yogurt', quantity: 59, calories: 59, date: '00:00, 03-02-2023' },
    { food: 'Chicken Breast', quantity: 165, calories: 165, date: '00:00, 16-08-2023' },
    { food: 'Milk', quantity: 42, calories: 42, date: '00:00, 25-12-2023' },
    { food: 'Rice', quantity: 130, calories: 130, date: '00:00, 17-12-2023' },
    { food: 'Almonds', quantity: 579, calories: 579, date: '00:00, 05-08-2023' },
    { food: 'Apple', quantity: 52, calories: 52, date: '00:00, 09-04-2024' },
  ];
  


  const [timeframe, setTimeframe] = useState('day');
  const [graphtimeframe, setGraphtimeframe] = useState('year');
  const [exercisegoaltype, setExercisegoal] = useState('calorie');
  const [amount, setAmount] = useState<number>(0);
  const [filteredExerciseData, setFilteredExerciseData] = useState<Exercise[]>([]);
  const [filteredCalorieData, setFilteredCalorieData] = useState<CalorieIntake[]>([]);
  const [cumulativeCaloriesData, setCumulativeCaloriesData] = useState<{ date: string; cumulativeCalories: number }[]>([]);
  const [goal, setGoal] = useState<number | null>(null);
  const [MacroData, setMacroData] = useState<PieData[]>([]);

  const handle_goalsubmit = async () => {
    //handle the goal buiissioin
    //actuall chuck it all in
    //Ill help with the validation but lowkey you should be fine with (try use toast, uwu)

  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  //gauge
  const dataCaloriesConsumed = [
    { name: 'Calories', value: 1800 },
    { name: 'Remaining', value: 700 }, 
  ];

  const dataProtein = [
    { name: 'Protein', value: 12 },
    { name: 'Remaining', value: 88 },
  ];

  const dataCarbs = [
    { name: 'Carbs', value: 56 },
    { name: 'Remaining', value: 18 },
  ];

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

  //liveupdate of piechart
  useEffect(() => {
    // Filter data for the past week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const filteredData = initialmacroData.filter((entry) => {
      const [time, day] = entry.date_time.split(', ');
      const [dd, mm, yyyy] = day.split('-');
      const entryDate = new Date(+yyyy, +mm - 1, +dd);
      return entryDate >= oneWeekAgo;
    });

    // Calculate total macronutrients
    const totalMacros = filteredData.reduce(
      (total, entry) => {
        total.protein_g += entry.protein_g;
        total.carbs_g += entry.carbs_g;
        total.fat_total_g += entry.fat_total_g;
        total.cholesterol_mg += entry.cholesterol_mg;
        total.fiber_g += entry.fiber_g;
        total.potassium_mg += entry.potassium_mg;
        total.sodium_mg += entry.sodium_mg;
        total.sugar_g += entry.sugar_g;
        return total;
      },
      {
        protein_g: 0,
        carbs_g: 0,
        fat_total_g: 0,
        cholesterol_mg: 0,
        fiber_g: 0,
        potassium_mg: 0,
        sodium_mg: 0,
        sugar_g: 0,
      }
    );

    //gets it format for  data for the pie chart
    const pieData: PieData[] = [
      { name: 'Protein', value: totalMacros.protein_g },
      { name: 'Carbs', value: totalMacros.carbs_g },
      { name: 'Fat', value: totalMacros.fat_total_g },
      { name: 'Cholesterol', value: totalMacros.cholesterol_mg },
      { name: 'Fiber', value: totalMacros.fiber_g },
      { name: 'Potassium', value: totalMacros.potassium_mg },
      { name: 'Sodium', value: totalMacros.sodium_mg },
      { name: 'Sugar', value: totalMacros.sugar_g },
    ];

    setMacroData(pieData);
  }, []);



  //live update graph
  useEffect(() => {
    // Parse the date from the string
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

    // Filter the exercise data based on the selected timeframe
    const filteredExerciseData = exerciseData.filter((exercise) => {
      const exerciseDate = parseDate(exercise.date);
      const startDate = getStartDate(graphtimeframe);
      return exerciseDate >= startDate && exerciseDate <= new Date();
    });

    // Filter the calorie data based on the selected timeframe
    const filteredCalorieData = calorieData.filter((intake) => {
      const intakeDate = parseDate(intake.date);
      const startDate = getStartDate(graphtimeframe);
      return intakeDate >= startDate && intakeDate <= new Date();
    });

    // Calculate cumulative calorie consumption
    let cumulativeCalories = 0;
    const cumulativeCaloriesData = filteredCalorieData.map((intake) => {
      cumulativeCalories += intake.calories;
      return {
        date: intake.date,
        cumulativeCalories,
      };
    });


    // Calculate cumulative exercise calories
    let cumulativeExerciseCalories = 0;
    const cumulativeExerciseCaloriesData = filteredExerciseData.map((exercise) => {
      cumulativeExerciseCalories += exercise.calories;
      return {
        date: exercise.date,
        cumulativeExerciseCalories,
      };
    });

    // Merge cumulative calorie and exercise data
    const mergedData = cumulativeCaloriesData.map((calorie, index) => ({
      ...calorie,
      ...cumulativeExerciseCaloriesData[index],
    }));


    // Set the goal based on the selected timeframe
    const getGoal = (timeframe: string) => {
      switch (timeframe) {
      case 'day':
        return 2500;
      case 'week':
        return 17500;
      case 'year':
        return 1750;
      default:
        return null;
      }
    };

    const goal = getGoal(graphtimeframe);

    // Assuming goal is a number and not an array
    const mergedDataWithGoal = mergedData.map(data => ({
      ...data,
      goal: goal,
    }));

    // Update state with the filtered data
    setFilteredExerciseData(filteredExerciseData);
    setFilteredCalorieData(filteredCalorieData);
    //setCumulativeCaloriesData(mergedData);
    setCumulativeCaloriesData(mergedDataWithGoal);
    setGoal(goal);
  }, [graphtimeframe]);  


  return (
    <div className="nutridashboard">
      <div className="box calorie-intake">
        <h1>This Week's Calorie Intake</h1>
        <div className="line"></div>
        <div className="atefoodpart">
          <div className="Caloriesate">
            <div className="header">
              <h2>Calories Consumed:</h2>
            </div>
            <div className="boldvalue">
              <FontAwesomeIcon icon={faBowlFood} />
              <p className="actualvalue">576</p>
              <p className="atecalslabel">calories</p>
            </div>
            <div className="change">
              <p>Up 10% from last week!</p>
              <FontAwesomeIcon icon={faArrowTrendUp} />
            </div>
          </div>
        </div>
      </div>
      <div className="box macro-breakdown">
        <h1>Macronutrient Breakdown (Past Week)</h1>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={MacroData}
              cx="50%"
              cy="50%"
              outerRadius={70}
              fill="#8884d8"
              name="name"
              dataKey="value"
            >
              {MacroData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="box goals-score">
        <div className="goalscorecont">
          <div className="nutridashcont">
            <div className="goalscore">
              <h2>Goal Overview</h2>
              <FontAwesomeIcon icon={faBullseye} />
              <p>Goals completed - <b className="goalscompleted"> 2 / 3</b></p>
              <div className="gaugesection">
                <div className="gauge">
                  <h3>Calorie Intake</h3>
                  <PieChart width={75} height={75}>
                    <Pie
                      data={dataCaloriesConsumed}
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
                        dataCaloriesConsumed.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                      }
                    </Pie>
                    <Tooltip/>
                  </PieChart>
                  <div className="gaugelabel">
                    <p>1800 out of 2500</p>
                  </div>
                </div>
                <div className="gauge">
                  <h3>Protein Intake</h3>
                  <PieChart width={75} height={75}>
                    <Pie
                      data={dataProtein}
                      cx={37.5}
                      cy={37.5}
                      startAngle={180}
                      endAngle={0}
                      innerRadius={22.5}
                      outerRadius={30}
                      fill="#82ca9d"
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                    >
                      {
                        dataProtein.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                      }
                    </Pie>
                    <Tooltip/>
                  </PieChart>
                  <div className="gaugelabel">
                    <p>12 out of 100</p>
                  </div>
                </div>
                <div className="gauge">
                  <h3>Carbohydrate Intake</h3>
                  <PieChart width={75} height={75}>
                    <Pie
                      data={dataCarbs}
                      cx={37.5}
                      cy={37.5}
                      startAngle={180}
                      endAngle={0}
                      innerRadius={22.5}
                      outerRadius={30}
                      fill="#82ca9d"
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                    >
                      {
                        dataCarbs.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                      }
                    </Pie>
                    <Tooltip/>
                  </PieChart>
                  <div className="gaugelabel">
                    <p>56 out of 74</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box goals-overview">
        <div className="goalform">
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
                    <option value="calorie_intake">Calorie Intake</option>
                    <option value="carbohydrate_intake">Carbohydrate Intake</option>
                    <option value="protein_intake">Protein Intake</option>
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
            <Line type="monotone" dataKey="goal" stroke="#ff0000" dot={false} strokeDasharray="5 5"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Nutrition;