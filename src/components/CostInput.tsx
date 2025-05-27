import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Fuel, ParkingCircle, Calculator } from "lucide-react";

interface CostInputProps {
  onCostUpdate: (costs: CostBreakdown) => void;
  initialCosts?: CostBreakdown;
  passengerCount: number;
}

interface CostBreakdown {
  fuelCost: number;
  parkingCost: number;
  tollsCost: number;
  totalCost: number;
  perPerson: number;
}

export const CostInput = ({
  onCostUpdate,
  initialCosts,
  passengerCount,
}: CostInputProps) => {
  console.log("CostInput", initialCosts, passengerCount);
  const [fuelCost, setFuelCost] = useState(initialCosts?.fuelCost || 0);
  const [parkingCost, setParkingCost] = useState(
    initialCosts?.parkingCost || 0
  );
  const [tollsCost, setTollsCost] = useState(initialCosts?.tollsCost || 0);

  useEffect(() => {
    if (initialCosts) {
      setFuelCost(initialCosts.fuelCost || 0);
      setParkingCost(initialCosts.parkingCost || 0);
      setTollsCost(initialCosts.tollsCost || 0);
    }
  }, [initialCosts]);

  const calculateCosts = (fuel: number, parking: number, tolls: number) => {
    const total = fuel + parking + tolls;
    const perPerson =
      passengerCount > 0
        ? Math.min(total / (passengerCount + 1), total * 0.5)
        : 0;

    const breakdown: CostBreakdown = {
      fuelCost: fuel,
      parkingCost: parking,
      tollsCost: tolls,
      totalCost: total,
      perPerson: Math.round(perPerson * 100) / 100,
    };

    return breakdown;
  };

  const handleFuelChange = (value: string) => {
    const fuel = parseFloat(value) || 0;
    setFuelCost(fuel);
    const breakdown = calculateCosts(fuel, parkingCost, tollsCost);
    onCostUpdate(breakdown);
  };

  const handleParkingChange = (value: string) => {
    const parking = parseFloat(value) || 0;
    setParkingCost(parking);
    const breakdown = calculateCosts(fuelCost, parking, tollsCost);
    onCostUpdate(breakdown);
  };

  const handleTollsChange = (value: string) => {
    const tolls = parseFloat(value) || 0;
    setTollsCost(tolls);
    const breakdown = calculateCosts(fuelCost, parkingCost, tolls);
    onCostUpdate(breakdown);
  };

  const currentBreakdown = calculateCosts(fuelCost, parkingCost, tollsCost);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          <span>Cost Breakdown</span>
        </CardTitle>
        <CardDescription>
          Specify the costs for this ride. Passengers will pay maximum 50% of
          total cost.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fuel" className="flex items-center space-x-2">
              <Fuel className="h-4 w-4 text-green-600" />
              <span>Fuel Cost</span>
            </Label>
            <Input
              id="fuel"
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={fuelCost || ""}
              onChange={(e) => handleFuelChange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parking" className="flex items-center space-x-2">
              <ParkingCircle className="h-4 w-4 text-blue-600" />
              <span>Parking Cost</span>
            </Label>
            <Input
              id="parking"
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={parkingCost || ""}
              onChange={(e) => handleParkingChange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tolls" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              <span>Tolls Cost</span>
            </Label>
            <Input
              id="tolls"
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={tollsCost || ""}
              onChange={(e) => handleTollsChange(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Cost:</span>
              <span className="font-medium">${currentBreakdown.totalCost}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Per Passenger:</span>
              <span className="font-medium text-blue-600">
                ${currentBreakdown.perPerson}
              </span>
            </div>
          </div>
          {passengerCount > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              Cost is capped at 50% of total cost ($
              {(currentBreakdown.totalCost * 0.5).toFixed(2)}) per passenger
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
