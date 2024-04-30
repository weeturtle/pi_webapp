import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './goalsOverview.scss';
import { BASE_URL } from '../../vars';
import { useAuth } from '../../auth/AuthProvider';

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

interface GoalsOverviewProps {
  COLORS: string[];
}

const GoalsOverview = ({ COLORS }: GoalsOverviewProps) => {
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [proteinGoal, setProteinGoal] = useState(0);
  const [carbsGoal, setCarbsGoal] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNutritionData = async () => {
      const currentDate = new Date();
      const startOfCurrentWeek = new Date(currentDate);
      startOfCurrentWeek.setDate(currentDate.getDate() - currentDate.getDay());

      const response = await fetch(`${BASE_URL}/nutrition?username=${user}&timeSpan=week`);
      const result = await response.json();
      const nutritionData: MacroEntry[] = result.success ? result.values : [];

      const totalMacros = nutritionData.reduce(
        (total, entry) => {
          total.calories += entry.calories;
          total.protein_g += entry.protein_g;
          total.carbs_g += entry.carbs_g;
          return total;
        },
        { calories: 0, protein_g: 0, carbs_g: 0 }
      );

      setTotalCalories(totalMacros.calories);
      setTotalProtein(totalMacros.protein_g);
      setTotalCarbs(totalMacros.carbs_g);
    };

    const fetchGoals = async () => {
      const fetchGoal = async (goalType: string, field: string) => {
        const raw_goal = await fetch(`${BASE_URL}/goal?${new URLSearchParams({
          username: user || '',
          goalType,
          field,
          timeSpan: 'week',
        })}`, {
          method: 'GET',
        });
        const goal_data = await raw_goal.json();
        return goal_data.value;
      };

      const calorieGoal = await fetchGoal('nutrition', 'calories');
      const proteinGoal = await fetchGoal('nutrition', 'protein_intake');
      const carbsGoal = await fetchGoal('nutrition', 'carbohydrate_intake');

      setCalorieGoal(calorieGoal);
      setProteinGoal(proteinGoal);
      setCarbsGoal(carbsGoal);
    };

    fetchNutritionData();
    fetchGoals();
  }, [user]);

  const dataCaloriesConsumed = [
    { name: 'Calories', value: Math.round(Number(totalCalories))},
    { name: 'Remaining', value: Math.round(Math.max(Number(calorieGoal) - Number(totalCalories),0))},
  ];

  console.table(dataCaloriesConsumed);

  const dataProtein = [
    { name: 'Protein', value: Math.round(Number(totalProtein))},
    { name: 'Remaining', value: Math.round(Math.max(Number(proteinGoal) - Number(totalProtein),0))},
  ];
  console.table(dataProtein);

  const dataCarbs = [
    { name: 'Carbs', value: Math.round(Number(totalCarbs))},
    { name: 'Remaining', value: Math.round(Math.max(Number(carbsGoal) - Number(totalCarbs),0))},
  ];

  
  return (
    <div className="box goals-score">
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
                  fill="#82ca9d"
                  paddingAngle={5}
                  dataKey="value"
                  name="name"
                >
                  {dataCaloriesConsumed.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <div className="gaugelabel">
                <p>{Math.round(totalCalories)} out of {calorieGoal}</p>
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
                  {dataProtein.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <div className="gaugelabel">
                <p>{Math.round(totalProtein)} out of {proteinGoal}</p>
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
                  {dataCarbs.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <div className="gaugelabel">
                <p>{Math.round(totalCarbs)} out of {carbsGoal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsOverview;