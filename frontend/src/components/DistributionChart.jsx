import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const DistributionChart = ({ data, colors }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Distribuție Produse</h2>
        <span className="text-indigo-600 font-medium">După vânzări</span>
      </div>
      
      {/* Current month indicator */}
      <div className="text-xs text-gray-500 mb-2">
        Date pentru luna <span className="font-bold text-gray-700">{new Date().toLocaleString('ro-RO', { month: 'long' })}</span>
      </div>
      
      {/* Chart - small with fixed height */}
      <div style={{ height: 180, marginBottom: '1rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={65}
              innerRadius={0}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, 'Procent']}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend as a simple list below the chart */}
      <div>
        {data.map((entry, index) => (
          <div key={index} className="text-black flex items-center mb-1">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            <span className="text-sm">{entry.name} ({entry.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistributionChart;