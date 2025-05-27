
import { DollarSign, Fuel, MapPin } from "lucide-react";

interface CostBreakdownProps {
  breakdown: {
    totalCost: number;
    perPerson: number;
    fuelCost: number;
    tollsCost: number;
  };
}

export const CostBreakdown = ({ breakdown }: CostBreakdownProps) => {
  return (
    <div className="bg-blue-50 p-3 rounded-lg space-y-2">
      <div className="flex items-center space-x-2 mb-2">
        <DollarSign className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-800">Cost Breakdown</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Cost:</span>
          <span className="font-medium">${breakdown.totalCost}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Per Person:</span>
          <span className="font-medium text-blue-600">${breakdown.perPerson}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Fuel:</span>
          <span className="font-medium">${breakdown.fuelCost}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tolls:</span>
          <span className="font-medium">${breakdown.tollsCost}</span>
        </div>
      </div>
    </div>
  );
};
