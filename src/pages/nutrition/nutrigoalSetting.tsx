import { useState } from 'react';
import './nutrigoalSetting.scss';

interface GoalSettingProps {
  handleGoalSubmit: (timeFrame: string, goalType: string, amount: number) => void;
}

const GoalSetting = ({
  handleGoalSubmit,
}: GoalSettingProps) => {
  const [timeFrame, setTimeFrame] = useState('day');
  const [goalType, setGoalType] = useState('calorie_intake');
  const [amount, setAmount] = useState<number>(0);

  return (
    <div className="box nutrigoals-overview">
      <div className="goalform">
        <div className="goalsetting">
          <h2>Goal Setting</h2>
          <div className="selections">
            <div className="selection-row">
              <div className="selectionstimeframe">
                <label>Goal Timeframe</label>
                <select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
                  <option value="da">Daily</option>
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
              <div className="selectionsvari">
                <label>Goal Type</label>
                <select value={goalType} onChange={(e) => setGoalType(e.target.value)}>
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
                type="number"
                onChange={(e) => setAmount(e.target.value as unknown as number)}
              />
            </div>
            <button className="submit" onClick={() => handleGoalSubmit(timeFrame, goalType, amount)}>
                Set Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalSetting;