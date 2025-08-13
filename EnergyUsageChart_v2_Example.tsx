import React from 'react';
import EnergyUsageChart from './EnergyUsageChart_v2';

const EnergyUsageExample: React.FC = () => {
  // Example data that matches the original image
  const sampleData = {
    currentUsage: 23,
    unit: "kWh",
    comparison: {
      value: 3.27,
      period: "last period"
    },
    // Chart data: first 5 points are red (actual), last 2 are gray (projected)
    chartData: [15, 18, 20, 22, 25, 28, 23],
    transitionPoint: 4 // Transition from red to gray at index 4
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Energy Usage Chart v2 Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Example 1: With red-to-gray transition */}
        <div>
          <h2 className="text-lg font-semibold mb-4">With Red-to-Gray Transition</h2>
          <EnergyUsageChart
            currentUsage={sampleData.currentUsage}
            unit={sampleData.unit}
            comparison={sampleData.comparison}
            chartData={sampleData.chartData}
            transitionPoint={sampleData.transitionPoint}
          />
          <p className="text-sm text-gray-600 mt-2">
            Red line shows actual usage, gray shows projected usage
          </p>
        </div>

        {/* Example 2: Single color (v1 behavior) */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Single Color (v1 Behavior)</h2>
          <EnergyUsageChart
            currentUsage={sampleData.currentUsage}
            unit={sampleData.unit}
            comparison={sampleData.comparison}
            chartData={sampleData.chartData}
            // No transitionPoint = single color
          />
          <p className="text-sm text-gray-600 mt-2">
            Single pink line for all data points
          </p>
        </div>

        {/* Example 3: Custom colors */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Custom Colors</h2>
          <EnergyUsageChart
            currentUsage={sampleData.currentUsage}
            unit={sampleData.unit}
            comparison={sampleData.comparison}
            chartData={sampleData.chartData}
            transitionPoint={3}
            chartColor="#10b981" // Green
            grayColor="#6b7280" // Darker gray
          />
          <p className="text-sm text-gray-600 mt-2">
            Custom green-to-gray transition at index 3
          </p>
        </div>

        {/* Example 4: Different transition point */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Early Transition</h2>
          <EnergyUsageChart
            currentUsage={sampleData.currentUsage}
            unit={sampleData.unit}
            comparison={sampleData.comparison}
            chartData={sampleData.chartData}
            transitionPoint={2} // Earlier transition
          />
          <p className="text-sm text-gray-600 mt-2">
            Transition from red to gray at index 2
          </p>
        </div>
      </div>

      {/* Code examples */}
      <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Code Examples</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Basic Red-to-Gray Transition:</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`<EnergyUsageChart
  currentUsage={23}
  unit="kWh"
  comparison={{ value: 3.27, period: "last period" }}
  chartData={[15, 18, 20, 22, 25, 28, 23]}
  transitionPoint={4} // Changes color at index 4
/>`}
            </pre>
          </div>

          <div>
            <h3 className="font-medium mb-2">Custom Colors:</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`<EnergyUsageChart
  currentUsage={23}
  unit="kWh"
  comparison={{ value: 3.27, period: "last period" }}
  chartData={[15, 18, 20, 22, 25, 28, 23]}
  transitionPoint={3}
  chartColor="#10b981" // Green
  grayColor="#6b7280"  // Dark gray
/>`}
            </pre>
          </div>

          <div>
            <h3 className="font-medium mb-2">Single Color (v1 Compatible):</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`<EnergyUsageChart
  currentUsage={23}
  unit="kWh"
  comparison={{ value: 3.27, period: "last period" }}
  chartData={[15, 18, 20, 22, 25, 28, 23]}
  // No transitionPoint = single color line
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyUsageExample;

