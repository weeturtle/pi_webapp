import React, { useState, useEffect } from 'react';
import ExerciseOverview from './exerciseOverview';
import GoalOverview from './goalOverview';
import GoalSetting from './goalSetting';
import ExerciseGraph from './exerciseGraph';
import './exercise.scss';

interface Exercise {
  exercise: string;
  time: number;
  calories: number;
  date: string;
}

interface ExerciseType {
  name: string;
  value: number;
}

const Exercise = () => {
  const [filteredExerciseData, setFilteredExerciseData] = useState<Exercise[]>([]);
  const [filteredExerciseTypeData, setFilteredExerciseTypeData] = useState<ExerciseType[]>([]);
  const [timeframe, setTimeframe] = useState('day');
  const [graphtimeframe, setGraphtimeframe] = useState('year');
  const [exercisegoaltype, setExercisegoal] = useState('calorie');
  const [amount, setAmount] = useState<number>(0);

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

  const handle_goalsubmit = async () => { //probably will be kept here
    //handle the goal buiissioin

  };


  useEffect(() => {
    const parseDate = (dateStr: string): Date => {
      const [time, day] = dateStr.split(', ');
      const [hours, minutes] = time.split(':').map(Number);
      const [dd, mm, yyyy] = day.split('-').map(Number);
      return new Date(yyyy, mm - 1, dd, hours, minutes);
    };

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


    const filteredData = exerciseData.filter((exercise) => {
      const exerciseDate = parseDate(exercise.date);
      const startDate = getStartDate(graphtimeframe);
      return exerciseDate >= startDate && exerciseDate <= new Date();
    });


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

    const mergedDataWithGoal = cumulativeData.map((data) => ({
      ...data,
      caloriesGoal: goal.calories,
    }));

    const getCountedExerciseTypes = (filteredData: Exercise[]): ExerciseType[] => {
      const countMap: Record<string, number> = {};
      filteredData.forEach(exercise => {
        countMap[exercise.exercise] = (countMap[exercise.exercise] || 0) + 1;
      });
      return Object.keys(countMap).map(name => ({ name, value: countMap[name] }));
    };

    setFilteredExerciseData(mergedDataWithGoal);
    setFilteredExerciseTypeData(getCountedExerciseTypes(filteredData));

  }, [graphtimeframe]);

  return (
    <div className="exerdashboard">
      <ExerciseOverview />
      <div className="box goals">
        <div className="exerdashcont">
          <GoalOverview />
          <GoalSetting
            timeframe={timeframe}
            setTimeframe={setTimeframe}
            exercisegoaltype={exercisegoaltype}
            setExercisegoal={setExercisegoal}
            amount={amount}
            setAmount={setAmount}
            handle_goalsubmit={handle_goalsubmit}
          />
        </div>
      </div>
      <div className="box graph">
        <ExerciseGraph
          filteredExerciseData={filteredExerciseData}
          filteredExerciseTypeData={filteredExerciseTypeData}
          graphtimeframe={graphtimeframe}
          setGraphtimeframe={setGraphtimeframe}
        />
      </div>
    </div>
  );
};

export default Exercise;