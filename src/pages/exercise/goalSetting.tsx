import './goalSetting.scss';
import { useState } from 'react';


interface GoalSettingProps {
  handleGoalSubmit: (timeFrame: string, goalType: string, amount: number) => void;
}

const GoalSetting = ({

  handleGoalSubmit,
}: GoalSettingProps) => {
 
  const [timeFrame, setTimeframe] = useState('day');
  const [goalType, setGoalType] = useState('calories');
  const [amount, setAmount] = useState<number>(0);

  return (
    <div className="goal">
      <div className="goalsetting">
        <h2>Goal Setting</h2>
        <div className="selections">
          <div className="selection-row">
            <div className="selectionstimeframe">
              <label>Goal Timeframe</label>
              <select
                value={timeFrame}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option value="day">Daily</option>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
              </select>
            </div>
            <div className="selectionsvari">
              <label>Goal Type</label>
              <select
                value={goalType}
                onChange={(e) => setGoalType(e.target.value)}
              >
                <option value="calories">Calories Burnt</option>
                <option value="activity_time">Activity Time</option>
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
          <button className='submit' onClick={() => handleGoalSubmit(timeFrame, goalType, amount)}>
            Set Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalSetting;