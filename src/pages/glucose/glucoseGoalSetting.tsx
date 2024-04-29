import { useState } from 'react';
import './glucose.scss';

interface GlucoseGoalSettingProps {
  handleGoalSubmit: (timeFrame: string, goalType: string, amount: number) => void;
}

const GlucoseGoalSetting = ({
  handleGoalSubmit
}: GlucoseGoalSettingProps) => {
  const [timeframe, setTimeframe] = useState('day');
  const [amount, setAmount] = useState<number>(0);
  


  return (
    <div className="goal">
      <div className="glucgoalsetting">
        <h2>Goal Setting</h2>
        <div className="selections">
          <div className="selection-row">
            <div className="selectionstimeframe">
              <label>Goal Timeframe</label>
              <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
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
              type="number"
              onChange={(e) => setAmount(e.target.value as unknown as number)}
            />
          </div>
          <button className="submit" onClick={() => handleGoalSubmit(timeframe, 'mmol', amount)}>
              Set Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlucoseGoalSetting;