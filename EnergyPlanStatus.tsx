import React from 'react';
import { Check } from 'lucide-react';

interface EnergyPlanStatusProps {
  title?: string;
  isOnBestPlan: boolean;
  message: string;
  currentPlanLabel?: string;
  currentPlan: string;
  className?: string;
}

const EnergyPlanStatus: React.FC<EnergyPlanStatusProps> = ({
  title = "My energy plan",
  isOnBestPlan,
  message,
  currentPlanLabel = "Current plan",
  currentPlan,
  className = ""
}) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
      {/* Title */}
      <h3 className="text-gray-600 text-sm font-medium mb-4">{title}</h3>
      
      {/* Status Message with Icon */}
      <div className="flex items-start gap-3 mb-6">
        {isOnBestPlan && (
          <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
            <Check className="w-4 h-4 text-green-600" />
          </div>
        )}
        <div className="flex-1">
          <p className={`text-lg font-semibold leading-tight ${
            isOnBestPlan ? 'text-green-600' : 'text-gray-800'
          }`}>
            {message}
          </p>
        </div>
      </div>
      
      {/* Current Plan Info */}
      <div>
        <p className="text-gray-500 text-sm mb-1">{currentPlanLabel}</p>
        <p className="text-gray-800 font-medium">{currentPlan}</p>
      </div>
    </div>
  );
};

export default EnergyPlanStatus;

