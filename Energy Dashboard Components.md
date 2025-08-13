# Energy Dashboard Components

Three reusable React TypeScript components with Chart.js that replicate energy dashboard cards.

## Components

### 1. EnergyPlanStatus
Displays energy plan status with checkmark and plan details.

**Props:**
- `title?: string` - Card title (default: "My energy plan")
- `isOnBestPlan: boolean` - Whether user is on the best plan
- `message: string` - Status message to display
- `currentPlanLabel?: string` - Label for current plan (default: "Current plan")
- `currentPlan: string` - Name of the current plan
- `className?: string` - Additional CSS classes

**Example:**
```tsx
<EnergyPlanStatus
  isOnBestPlan={true}
  message="You are on the best plan"
  currentPlan="Smart All Day Dual Fuel"
/>
```

### 2. EnergyUsageChart
Shows energy usage with trend chart using Chart.js.

**Props:**
- `title?: string` - Card title (default: "Energy used")
- `currentUsage: number` - Current usage value
- `unit: string` - Unit of measurement (e.g., "kWh")
- `comparison: { value: number, period: string }` - Comparison data
- `chartData: number[]` - Array of data points for the chart
- `chartColor?: string` - Chart line color (default: "#ec4899")
- `className?: string` - Additional CSS classes

**Example:**
```tsx
<EnergyUsageChart
  currentUsage={23}
  unit="kWh"
  comparison={{ value: 3.27, period: "last period" }}
  chartData={[15, 18, 20, 22, 25, 28, 23]}
/>
```

### 3. BillForecastChart
Displays bill forecast with dual-line comparison chart.

**Props:**
- `title?: string` - Card title (default: "Bill forecast")
- `currentAmount: number` - Current bill amount
- `currency: string` - Currency symbol (e.g., "€", "$")
- `comparison: { value: number, period: string }` - Comparison data
- `currentDay: number` - Current day to highlight on chart
- `chartData: { current: number[], previous: number[] }` - Chart data for both lines
- `xAxisLabels: (string | number)[]` - Labels for x-axis
- `className?: string` - Additional CSS classes

**Example:**
```tsx
<BillForecastChart
  currentAmount={78.97}
  currency="€"
  comparison={{ value: 13.27, period: "last period" }}
  currentDay={23}
  chartData={{
    current: [10, 15, 25, 35, 45, 55, 65, 78.97],
    previous: [8, 12, 20, 30, 40, 50, 60, 65.70]
  }}
  xAxisLabels={[1, 5, 10, 15, 20, 23, 25, 30]}
/>
```

## Installation

1. Install required dependencies:
```bash
npm install chart.js react-chartjs-2 lucide-react
# or
pnpm add chart.js react-chartjs-2 lucide-react
```

2. Copy the component files to your project:
- `EnergyPlanStatus.tsx`
- `EnergyUsageChart.tsx`
- `BillForecastChart.tsx`

3. Import and use the components in your React application.

## Features

- **Fully TypeScript**: Complete type safety with proper interfaces
- **Reusable**: Components accept props to customize data and appearance
- **Responsive**: Built with Tailwind CSS for responsive design
- **Chart.js Integration**: Professional charts with smooth animations
- **Accessible**: Proper semantic HTML and ARIA attributes
- **Modern Design**: Clean, modern styling matching the original designs

## Dependencies

- React 18+
- TypeScript
- Chart.js 4+
- react-chartjs-2 5+
- lucide-react (for icons)
- Tailwind CSS (for styling)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use in your projects!

