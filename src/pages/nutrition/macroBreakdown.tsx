import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './macroBreakdown.scss';

interface MacroBreakdownProps {
  MacroData: { name: string; value: number }[];
  COLORS: string[];
}

const MacroBreakdown= ({ MacroData, COLORS }: MacroBreakdownProps) => {
  return (
    <div className="box macro-breakdown">
      <h1>Macronutrient Breakdown (Past Week)</h1>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={MacroData}
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#8884d8"
            name="name"
            dataKey="value"
          >
            {MacroData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MacroBreakdown;