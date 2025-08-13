import React from 'react';
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

interface EnergyUsageChartProps {
  title?: string;
  currentUsage: number;
  unit: string;
  comparison: {
    value: number;
    period: string;
  };
  chartData: number[];
  chartColor?: string;
  grayColor?: string;
  transitionPoint?: number; // Index where color changes from chartColor to grayColor
  className?: string;
}

const EnergyUsageChart: React.FC<EnergyUsageChartProps> = ({
  title = "Energy used",
  currentUsage,
  unit,
  comparison,
  chartData,
  chartColor = "#ec4899",
  grayColor = "#9ca3af",
  transitionPoint,
  className = ""
}) => {
  // Create datasets for red and gray portions
  const createDatasets = () => {
    if (transitionPoint === undefined || transitionPoint >= chartData.length - 1) {
      // No transition, use single color
      return [
        {
          data: chartData,
          borderColor: chartColor,
          backgroundColor: chartColor,
          borderWidth: 3,
          pointBackgroundColor: chartData.map((_, index) => 
            index === chartData.length - 1 ? chartColor : chartColor
          ),
          pointBorderColor: chartData.map((_, index) => 
            index === chartData.length - 1 ? chartColor : chartColor
          ),
          pointRadius: chartData.map((_, index) => 
            index === chartData.length - 1 ? 4 : 4
          ),
          pointHoverRadius: 6,
          tension: 0.4,
          fill: false,
        },
      ];
    }

    // Create red portion (from start to transition point)
    const redData = [...chartData];
    for (let i = transitionPoint + 1; i < redData.length; i++) {
      redData[i] = null;
    }

    // Create gray portion (from transition point to end)
    const grayData = new Array(chartData.length).fill(null);
    for (let i = transitionPoint; i < chartData.length; i++) {
      grayData[i] = chartData[i];
    }

    return [
      {
        data: redData,
        borderColor: chartColor,
        backgroundColor: chartColor,
        borderWidth: 3,
        pointBackgroundColor: redData.map((value, index) => 
          value !== null ? chartColor : 'transparent'
        ),
        pointBorderColor: redData.map((value, index) => 
          value !== null ? chartColor : 'transparent'
        ),
        pointRadius: redData.map((value, index) => 
          value !== null ? 4 : 0
        ),
        pointHoverRadius: 6,
        tension: 0.4,
        fill: false,
        spanGaps: false,
      },
      {
        data: grayData,
        borderColor: grayColor,
        backgroundColor: grayColor,
        borderWidth: 3,
        pointBackgroundColor: grayData.map((value, index) => 
          value !== null ? grayColor : 'transparent'
        ),
        pointBorderColor: grayData.map((value, index) => 
          value !== null ? grayColor : 'transparent'
        ),
        pointRadius: grayData.map((value, index) => 
          value !== null ? 4 : 0
        ),
        pointHoverRadius: 6,
        tension: 0.4,
        fill: false,
        spanGaps: false,
      },
    ];
  };

  const data = {
    labels: chartData.map((_, index) => index + 1),
    datasets: createDatasets(),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
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
        hoverRadius: 0,
      },
    },
    interaction: {
      intersect: false,
    },
  };

  const isPositiveChange = comparison.value >= 0;
  const changePrefix = isPositiveChange ? '+' : '';

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
      {/* Title */}
      <h3 className="text-gray-600 text-sm font-medium mb-4">{title}</h3>
      
      {/* Current Usage */}
      <div className="mb-2">
        <p className="text-3xl font-bold text-pink-600 mb-1">
          {currentUsage} {unit}
        </p>
        <p className="text-sm text-gray-500">
          {changePrefix}{comparison.value} {unit} on {comparison.period}
        </p>
      </div>
      
      {/* Chart */}
      <div className="h-24 mt-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default EnergyUsageChart;

