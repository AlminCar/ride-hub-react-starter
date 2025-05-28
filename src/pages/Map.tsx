import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Search, Car, Users, Clock } from "lucide-react";

import ridesData from "../data/rides.json";
import OSMap from "@/components/ui/os_map";
import { AvailableRide } from "@/types/rides";
import { LatLngTuple } from "leaflet";

const Map = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  const { availableRides } = ridesData;
  const [showRoutes, setShowRoutes] = useState(false);

  // Mock map pins based on ride data
  const rides = availableRides.map(
    (ride, index) =>
      ({
        ...ride,
        fromCoordinates: [
          37.7749 + index * 0.01,
          -122.4194 + index * 0.01,
        ] as LatLngTuple, // Mock coordinates
        toCoordinates: [
          37.7749 - index * 0.01 - 0.05,
          -122.4194 - index * 0.01 - 0.05,
        ] as LatLngTuple, // Mock coordinates
      } as AvailableRide)
  );

  const handlePinClick = (ride) => {
    setSelectedRide(ride);
  };

  const handleApplyFromMap = (rideId: number) => {
    console.log("Applying for ride from map:", rideId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ride Map</h1>
          <p className="text-gray-600">
            Find rides near you on the interactive map
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Controls */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Enter address or location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Navigation className="mr-2 h-4 w-4" />
                Use Current Location
              </Button>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-3">
                  Available Rides ({availableRides.length})
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {availableRides.map((ride) => (
                    <div
                      key={ride.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedRide?.id === ride.id
                          ? "bg-blue-50 border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedRide(ride)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm">
                          {ride.driver}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {ride.seats} seats
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {ride.from} → {ride.to}
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <Clock className="h-3 w-3 mr-1" />
                          {ride.time}
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-sm font-medium text-blue-600">
                            ${ride.price}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApplyFromMap(ride.id);
                            }}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Area */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Interactive Map</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowRoutes(!showRoutes)}
                >
                  <Car className="mr-2 h-4 w-4" />
                  {showRoutes ? "Hide Routes" : "Show Routes"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                {/* <div className="text-center"> */}
                {/* <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" /> */}
                <OSMap
                  onPinClick={handlePinClick}
                  rides={rides}
                  selectedRide={selectedRide}
                  showRoutes={showRoutes}
                />
                {/* Mock pins display */}
                {/* <div className="grid grid-cols-3 gap-4 mt-6 max-w-sm mx-auto">
                  {mapPins.map((pin) => (
                    <div
                      key={pin.id}
                      className={`p-2 bg-white rounded-lg shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                        selectedRide?.id === pin.id
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => handlePinClick(pin)}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-blue-600 rounded-full mb-1"></div>
                        <span className="text-xs text-gray-600">
                          {pin.ride.from}
                        </span>
                      </div>
                    </div>
                  ))}
                </div> */}
              </div>
              {/* </div> */}

              {/* Selected Ride Popup */}
              {selectedRide && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-900 mb-2">
                    Selected Ride
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-800">
                        Driver: {selectedRide.driver}
                      </span>
                      <Badge className="bg-blue-100 text-blue-800">
                        {selectedRide.seats} seats
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-blue-700">
                      <MapPin className="h-4 w-4 mr-1" />
                      {selectedRide.from} → {selectedRide.to}
                    </div>
                    <div className="flex items-center text-sm text-blue-700">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedRide.time}
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-bold text-blue-900">
                        ${selectedRide.price}
                      </span>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Apply for Ride
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Map;
