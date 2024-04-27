import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './goalOverview.scss';


interface gaugeProp {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const GoalOverview = () => {
  /*Gauge*/
  //gauge mock values for calories burnt goal
  const dataCalories = [
    { name: 'Calories', value: 800 },
    { name: 'Remaining', value: 1200 }, 
  ];
  //gauge mock values for activity time goal
  const dataActivity = [
    { name: 'Activity', value: 56 },
    { name: 'Remaining', value: 4 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']; //colours for piechart

  //creates the 180* of the piechart to look like a guage
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

  return (
    <div className="goaloverview">
      <h2>Goal Overview</h2>
      <FontAwesomeIcon icon={faBullseye} />
      <p>Number of goals completed - <b className="goalscompleted"> 1 / 2</b></p>
      <div className="gaugesection">
        <div className="gauge">
          <h3>Calories Burnt</h3>
          <PieChart width={100} height={100}>
            <Pie
              data={dataCalories}
              cx={50}
              cy={50}
              startAngle={180}
              endAngle={0}
              innerRadius={30}
              outerRadius={40}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              name="name"
            >
              {
                dataCalories.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <Tooltip/>
          </PieChart>
          <div className="gaugelabel">
            <p>800 out of 2000</p>
          </div>
        </div>
        <div className="gauge">
          <h3>Activity Time</h3>
          <PieChart width={100} height={100}>
            <Pie
              data={dataActivity}
              cx={50}
              cy={50}
              startAngle={180}
              endAngle={0}
              innerRadius={30}
              outerRadius={40}
              fill="#82ca9d"
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {
                dataActivity.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <Tooltip/>
          </PieChart>
          <div className="gaugelabel">
            <p>56 out of 60</p>
          </div>
        </div>
      </div>
    </div>



  );
};

export default GoalOverview;