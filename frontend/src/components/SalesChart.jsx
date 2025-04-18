
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const SalesChart = ({ data, onPeriodChange, selectedPeriod }) => {
  // Verificăm dacă avem date
  const chartData = data?.length > 0 ? data : [];
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Evoluție Vânzări</h2>
        <select 
          className="bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedPeriod}
          onChange={onPeriodChange}
        >
          <option value="6luni">Ultimele 6 luni</option>
          <option value="1an">Ultimul an</option>
        </select>
      </div>
      
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          Nu există date disponibile
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart 
            data={chartData}
            margin={{ top: 10, right: 30, left: 20, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" // Schimbat de la "luna" la "name" pentru a se potrivi cu datele API-ului
              axisLine={false} 
              tickLine={false}
              height={70}
              tick={(props) => {
                const { x, y, payload, index } = props;
                const dataItem = chartData[index]; // Obținem direct elementul din array folosind indexul
                
                // Afișăm doar prima și ultima lună pentru a evita suprapunerea
                // și câteva puncte intermediare în funcție de cantitatea de date
                const dataLength = chartData.length;
                const shouldShow = 
                  index === 0 || 
                  index === dataLength - 1 || 
                  (dataLength > 6 && index % Math.floor(dataLength / 3) === 0);
                
                if (!shouldShow && dataLength > 6) {
                  return null;
                }
                
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize={12}>
                      {payload.value}
                    </text>
                    {dataItem && dataItem.an && (
                      <text x={0} y={0} dy={32} textAnchor="middle" fill="#666" fontSize={10}>
                        {dataItem.an}
                      </text>
                    )}
                  </g>
                );
              }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              domain={[
                dataMin => dataMin > 0 ? Math.floor(dataMin / 500) * 500 - 500 : 0, 
                dataMax => Math.ceil(dataMax / 500) * 500 + 500
              ]}
              tickFormatter={(value) => value.toLocaleString('ro-RO')}
            />
            <Tooltip 
              formatter={(value, name) => {
                if (name === "Vânzări" || name === "Target") {
                  return [value.toLocaleString('ro-RO') + ' RON', name];
                }
                return [value, name];
              }}
              labelFormatter={(label, items) => {
                const dataItem = items.length > 0 ? 
                  chartData.find(d => d.name === label) : null;
                return dataItem ? `${label} ${dataItem.an}` : label;
              }}
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="vanzari" 
              stroke="#6366f1" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2 }} 
              activeDot={{ r: 7 }} 
              name="Vânzări" 
              isAnimationActive={false}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#e5e7eb" 
              strokeWidth={2} 
              strokeDasharray="5 5" 
              dot={false} 
              name="Target" 
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SalesChart;