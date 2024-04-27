import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './goalsOverview.scss';

interface GoalsOverviewProps {
  dataCalories: { name: string; value: number }[];
  COLORS: string[];
  timeframe: string;
  setTimeframe: (value: string) => void;
  amount: number;
  setAmount: (value: number) => void;
  handle_goalsubmit: () => void;
}

const GoalsOverview = ({
  dataCalories,
  COLORS,
  timeframe,
  setTimeframe,
  amount,
  setAmount,
  handle_goalsubmit,
}: GoalsOverviewProps) => {
  return (
    <div className="goals-overview">
      <div className="goalglucoverview">
        <h2>Goal Overview</h2>
        <FontAwesomeIcon icon={faBullseye} />
        <p>
          Number of goals completed - <b className="goalscompleted"> 1 / 2</b>
        </p>
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
                {dataCalories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="gaugelabel">
              <p>4.7 out of 6</p>
            </div>
          </div>
        </div>
      </div>
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
            <button className="submit" onClick={handle_goalsubmit}>
              Set Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsOverview;