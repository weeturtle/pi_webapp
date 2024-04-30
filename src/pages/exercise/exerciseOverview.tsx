import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faClock, faDumbbell, faPersonWalking, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';
import './exerciseOverview.scss';
import { BASE_URL } from '../../vars';
import { useAuth } from '../../auth/AuthProvider';


interface Exercise {
  exercise_type: string;
  duration: number;
  calories_burnt: number;
  date_time: string;
}

const ExerciseOverview = () => {
  const [caloriesBurnt, setCaloriesBurnt] = useState<number>(0);
  const [caloriesBurntChange, setCaloriesBurntChange] = useState<number>(0);
  const [totalActivityTime, setTotalActivityTime] = useState<number>(0);
  const [totalActivityTimeChange, setTotalActivityTimeChange] = useState<number>(0);
  const [workoutsLogged, setWorkoutsLogged] = useState<number>(0);
  const [workoutsLoggedChange, setWorkoutsLoggedChange] = useState<number>(0);
  const [exerciseDiversity, setExerciseDiversity] = useState<number>(0);
  const [exerciseDiversityChange, setExerciseDiversityChange] = useState<number>(0);

  const { user } = useAuth();

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {                         
        const processData = (exercises: Exercise[]) => {
          let totalCalories = 0;
          let totalTime = 0;
          let workouts = 0;
          const exerciseTypes = new Set();
  
          exercises.forEach(exercise => {
            totalCalories += exercise.calories_burnt;
            totalTime += Number(exercise.duration);
            workouts++;
            exerciseTypes.add(exercise.exercise_type);
          });
  
          return {
            caloriesBurnt: totalCalories,
            totalActivityTime: totalTime,
            workoutsLogged: workouts,
            exerciseDiversity: exerciseTypes.size
          };
        };
        const responseMonth = await fetch(`${BASE_URL}/exercise?username=${user}&timeSpan=month`);
        const monthResult = await responseMonth.json();
        const dataMonth = monthResult.success ? monthResult.values : [];

        const currentDate = new Date();
        const currentWeekDay = currentDate.getDay();
        const startOfCurrentWeek = new Date();
        startOfCurrentWeek.setDate(currentDate.getDate() - currentWeekDay);
        const startOfLastWeek = new Date();
        startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);


        console.log(currentDate);
        console.log(currentWeekDay);
        console.log(startOfCurrentWeek);
        console.log(startOfLastWeek);

        const thisWeekExercises = dataMonth.filter((exercise: Exercise) => {
          const exerciseDate = new Date(exercise.date_time);
          return exerciseDate >= startOfCurrentWeek;
        });

        const previousWeekExercises = dataMonth.filter((exercise: Exercise)=> {
          const exerciseDate = new Date(exercise.date_time);
          return exerciseDate < startOfCurrentWeek && exerciseDate >= startOfLastWeek;
        });

        console.log('Previous weeks shit',previousWeekExercises);

        // Process the current and previous week's exercises
        const thisWeekData = processData(thisWeekExercises);
        console.log(thisWeekData);
        const lastWeekData = processData(previousWeekExercises);
        console.log(lastWeekData);

        // Set the state with the processed data
        setCaloriesBurnt(thisWeekData.caloriesBurnt);
        setCaloriesBurntChange(calculateChange(thisWeekData.caloriesBurnt, lastWeekData.caloriesBurnt));
        setTotalActivityTime(thisWeekData.totalActivityTime);
        setTotalActivityTimeChange(calculateChange(thisWeekData.totalActivityTime, lastWeekData.totalActivityTime));
        setWorkoutsLogged(thisWeekData.workoutsLogged);
        setWorkoutsLoggedChange(calculateChange(thisWeekData.workoutsLogged, lastWeekData.workoutsLogged));
        setExerciseDiversity(thisWeekData.exerciseDiversity);
        setExerciseDiversityChange(calculateChange(thisWeekData.exerciseDiversity, lastWeekData.exerciseDiversity));
      } catch (error) {
        console.error('Error fetching exercise overview data:', error);
      }
    };
  
    fetchExerciseData();
  }, [user]);

  const calculateChange = (currentValue: number, previousValue: number): number => {
    if (previousValue === 0) {
      return 0;
    }
    const change = ((currentValue - previousValue) / previousValue) * 100;
    return +change.toFixed(0);
  };


  return (
    <>
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
                <p className="actualvalue">{caloriesBurnt}</p>
                <p className="calslabel">cals</p>
              </div>
              <div className="change">
                {caloriesBurntChange !== 0 && (
                  <>
                    <p>{caloriesBurntChange > 0 ? 'Up' : 'Down'} {Math.abs(caloriesBurntChange)}% from last week!</p>
                    <FontAwesomeIcon icon={caloriesBurntChange > 0 ? faArrowTrendUp : faArrowTrendDown} />
                  </>
                )}
              </div>
            </div>
            <div className="Activetime">
              <div className="header">
                <h2>Total Activity Time:</h2>
              </div>
              <div className="boldvalue">
                <FontAwesomeIcon icon={faClock} />
                <p className="actualvalue">{totalActivityTime}</p>
                <p className="minslabel">mins</p>
              </div>
              <div className="change">
                {totalActivityTimeChange !== 0 && (
                  <>
                    <p>{totalActivityTimeChange > 0 ? 'Up' : 'Down'} {Math.abs(totalActivityTimeChange)}% from last week!</p>
                    <FontAwesomeIcon icon={totalActivityTimeChange > 0 ? faArrowTrendUp : faArrowTrendDown} />
                  </>
                )}
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
                <p className="actualvalue">{workoutsLogged}</p>
                <p className="excomplabel">workouts</p>
              </div>
              <div className="change">
                {workoutsLoggedChange !== 0 && (
                  <>
                    <p>{workoutsLoggedChange > 0 ? 'Up' : 'Down'} {Math.abs(workoutsLoggedChange)}% from last week!</p>
                    <FontAwesomeIcon icon={workoutsLoggedChange > 0 ? faArrowTrendUp : faArrowTrendDown} />
                  </>
                )}
              </div>
            </div>
            <div className="Exerciserating">
              <div className="header">
                <h2>Exercise Diversity:</h2>
              </div>
              <div className="boldvalue">
                <FontAwesomeIcon icon={faPersonWalking} />
                <p className="actualvalue">{exerciseDiversity}</p>
                <p className="divlabel">exercises</p>
              </div>
              <div className="change">
                {exerciseDiversityChange !== 0 && (
                  <>
                    <p>{exerciseDiversityChange > 0 ? 'Up' : 'Down'} {Math.abs(exerciseDiversityChange)}% from last week!</p>
                    <FontAwesomeIcon icon={exerciseDiversityChange > 0 ? faArrowTrendUp : faArrowTrendDown} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExerciseOverview;