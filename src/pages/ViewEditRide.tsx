import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Clock, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CostInput } from "../components/CostInput";
import { useAdministration } from "@/state/administration";
import { useCreateMyOfferedRideAction } from "@/state/myOfferedRides.ts";
import { useNavigate } from "react-router-dom";
import { useMyOfferedRides } from "@/state/myOfferedRides";
import { useMyBookedRides } from "@/state/myBookedRides";
import { useMyPastRides } from "@/state/myPastRides";
import { isWithinInterval } from "date-fns";

const ViewEditRide = () => {
  const { data: myOfferedRides } = useMyOfferedRides();
  const { data: myBookedRides } = useMyBookedRides();
  const { data: myPastRides } = useMyPastRides();
  const { data: administrationState } = useAdministration();
  const { mutate: createRide, isSuccess } = useCreateMyOfferedRideAction();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: "",
    description: "",
  });

  const [costBreakdown, setCostBreakdown] = useState({
    fuelCost: 0,
    parkingCost: 0,
    tollsCost: 0,
    totalCost: 0,
    perPerson: 0,
  });
  const navigate = useNavigate();

  const isViewMode = window.location.pathname.includes(
    "view-details-of-past-rides"
  );
  const isEditMode = window.location.pathname.includes("edit-ride");

  const resetForm = () => {
    // Reset form
    setFormData({
      from: "",
      to: "",
      date: "",
      time: "",
      seats: "",
      description: "",
    });
    setCostBreakdown({
      fuelCost: 0,
      parkingCost: 0,
      tollsCost: 0,
      totalCost: 0,
      perPerson: 0,
    });
  };

  useEffect(() => {
    const rideId = window.location.pathname.split("/").pop();
    const ride = isEditMode
      ? myOfferedRides.find((r) => r.id === parseInt(rideId))
      : myPastRides.find((r) => r.id === parseInt(rideId)) ||
        myBookedRides.find((r) => r.id === parseInt(rideId));
    if (ride) {
      console.log("Ride found:", ride);
      setFormData({
        from: ride.from,
        to: ride.to,
        date: ride.date,
        time: ride.time,
        seats: ride.seats?.toString() || "",
        description: ride.description || "",
      });
      if (isEditMode) {
        setCostBreakdown({
          fuelCost: ride.costBreakdown.fuelCost || 0,
          parkingCost: ride.costBreakdown.parkingCost || 0,
          tollsCost: ride.costBreakdown.tollsCost || 0,
          totalCost: ride.costBreakdown.totalCost || 0,
          perPerson: ride.costBreakdown.perPerson || 0,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Ride Posted Successfully!",
        description:
          "Your ride has been added and is now visible to other users.",
      });
      navigate("/my-rides");
      resetForm();
    }
  }, [isSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createRide({ ...formData, costBreakdown });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCostUpdate = (costs) => {
    setCostBreakdown(costs);
  };

  const seatCount = parseInt(formData.seats) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isViewMode ? "Previous ride" : "Edit your offered ride"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ride Details</CardTitle>
              {isEditMode && (
                <CardDescription>
                  Fill in the information about your upcoming trip
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Route Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from" className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span>From</span>
                  </Label>
                  <Input
                    id="from"
                    placeholder="Starting location"
                    value={formData.from}
                    onChange={(e) => handleInputChange("from", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to" className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-red-600" />
                    <span>To</span>
                  </Label>
                  <Input
                    id="to"
                    placeholder="Destination"
                    value={formData.to}
                    onChange={(e) => handleInputChange("to", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>Date</span>
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>Departure Time</span>
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Seats */}
              <div className="space-y-2">
                <Label htmlFor="seats" className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span>Available Seats</span>
                </Label>
                <Select
                  value={formData.seats}
                  onValueChange={(value) => handleInputChange("seats", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of seats" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="1">1 seat</SelectItem>
                    <SelectItem value="2">2 seats</SelectItem>
                    <SelectItem value="3">3 seats</SelectItem>
                    <SelectItem value="4">4 seats</SelectItem>
                    <SelectItem value="5">5 seats</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Additional Information</Label>
                <Textarea
                  id="description"
                  placeholder="Any additional details about your ride (meeting point, preferences, etc.)"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Cost Input */}
          {administrationState.costSharing && isEditMode && (
            <CostInput
              onCostUpdate={handleCostUpdate}
              passengerCount={seatCount}
              initialCosts={costBreakdown}
            />
          )}

          {isEditMode && (
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Post Ride
              </Button>
            </div>
          )}
        </form>

        {isEditMode && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Tips for a Great Ride</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Be punctual and communicate any delays</li>
                <li>• Keep your car clean and comfortable</li>
                <li>• Be clear about pickup and drop-off points</li>
                <li>
                  • Respect passengers' preferences (music, temperature, etc.)
                </li>
                <li>• Ensure you have proper insurance coverage</li>
                <li>• Set fair cost sharing to cover your expenses</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ViewEditRide;
