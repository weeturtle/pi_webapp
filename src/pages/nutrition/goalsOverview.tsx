import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './goalsOverview.scss';

interface GoalsOverviewProps {
  dataCaloriesConsumed: { name: string; value: number }[];
  dataProtein: { name: string; value: number }[];
  dataCarbs: { name: string; value: number }[];
  COLORS: string[];
}

const GoalsOverview = ({
  dataCaloriesConsumed,
  dataProtein,
  dataCarbs,
  COLORS,
}: GoalsOverviewProps) => {
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
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  name="name"
                >
                  {dataCaloriesConsumed.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
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
                  {dataProtein.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
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
                  {dataCarbs.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <div className="gaugelabel">
                <p>56 out of 74</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsOverview;