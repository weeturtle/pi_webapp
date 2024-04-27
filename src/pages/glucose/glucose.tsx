import React, { useState, useEffect } from 'react';
import GlucoseOverview from './glucoseOverview';
import GoalsOverview from './goalsOverview';
import GlucoseTimeline from './glucoseTimeline';
import './glucose.scss';

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
    const parseDate = (dateStr: string): Date => {
      const [time, day] = dateStr.split(', ');
      const [hours, minutes] = time.split(':').map(Number);
      const [dd, mm, yy] = day.split('-').map(Number);
      const yyyy = 2000 + yy; 
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
  
    const filteredGlucoseData = glucoseData.filter((entry) => {
      const entryDate = parseDate(entry.date_time);
      const startDate = getStartDate(graphtimeframe);
      const result = entryDate >= startDate && entryDate <= new Date();
      return result;
    });

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

    setFilteredGlucoseData(mergedDataWithGoal);
    setGoal(goal);
  }, [graphtimeframe]);


  const dataCalories = [
    { name: 'Calories', value: 800 },
    { name: 'Remaining', value: 1200 },
  ];

  return (
    <div className="glucdashboard">
      <div className="box glucose-everything">
        <GlucoseOverview
          filteredGlucoseData={filteredGlucoseData}
          graphtimeframe={graphtimeframe}
          setGraphtimeframe={setGraphtimeframe}
        />
      </div>
      <div className="box carousel"></div>
      <div className="box goals-overview">
        <GoalsOverview
          dataCalories={dataCalories}
          COLORS={COLORS}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          amount={amount}
          setAmount={setAmount}
          handle_goalsubmit={handle_goalsubmit}
        />
      </div>
      <div className="box timeline">
        <GlucoseTimeline glucoseData={glucoseData} />
      </div>
    </div>
  );
};

export default Glucose;