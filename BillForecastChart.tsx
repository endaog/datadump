import React from 'react';
import { Info } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BillForecastChartProps {
  title?: string;
  currentAmount: number;
  currency: string;
  comparison: {
    value: number;
    period: string;
  };
  currentDay: number;
  chartData: {
    current: number[];
    previous: number[];
  };
  xAxisLabels: (string | number)[];
  className?: string;
}

const BillForecastChart: React.FC<BillForecastChartProps> = ({
  title = "Bill forecast",
  currentAmount,
  currency,
  comparison,
  currentDay,
  chartData,
  xAxisLabels,
  className = ""
}) => {
  const data = {
    labels: xAxisLabels,
    datasets: [
      {
        label: 'Spent this bill',
        data: chartData.current,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        borderWidth: 3,
        pointBackgroundColor: xAxisLabels.map((label, index) => 
          label === currentDay ? '#3b82f6' : 'transparent'
        ),
        pointBorderColor: xAxisLabels.map((label, index) => 
          label === currentDay ? '#3b82f6' : 'transparent'
        ),
        pointRadius: xAxisLabels.map((label, index) => 
          label === currentDay ? 6 : 0
        ),
        pointHoverRadius: 8,
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Previous bill',
        data: chartData.previous,
        borderColor: '#9ca3af',
        backgroundColor: '#9ca3af',
        borderWidth: 3,
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        pointRadius: 0,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const isPositiveChange = comparison.value >= 0;
  const changePrefix = isPositiveChange ? '+' : '';

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
      {/* Title */}
      <h3 className="text-gray-600 text-sm font-medium mb-4">{title}</h3>
      
      {/* Current Amount */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-3xl font-bold text-pink-600">
            {currency}{currentAmount.toFixed(2)}
          </p>
          <Info className="w-5 h-5 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">
          {changePrefix} {currency}{Math.abs(comparison.value).toFixed(2)} on {comparison.period}
        </p>
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Spent this bill</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <span className="text-sm text-gray-600">Previous bill</span>
        </div>
      </div>
      
      {/* Chart */}
      <div className="h-32">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default BillForecastChart;

