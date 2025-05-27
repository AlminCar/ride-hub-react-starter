
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Car, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const MyRides = () => {
  const myOfferedRides = [
    {
      id: 1,
      from: "Downtown",
      to: "Airport",
      date: "2024-01-15",
      time: "2:30 PM",
      seats: 3,
      booked: 1,
      status: "active"
    },
    {
      id: 2,
      from: "Home",
      to: "Office",
      date: "2024-01-16",
      time: "8:00 AM",
      seats: 2,
      booked: 2,
      status: "full"
    }
  ];

  const myBookedRides = [
    {
      id: 3,
      from: "University",
      to: "Shopping Center",
      date: "2024-01-17",
      time: "3:00 PM",
      driver: "Sarah Wilson",
      status: "confirmed"
    }
  ];

  const pastRides = [
    {
      id: 4,
      from: "Airport",
      to: "Downtown",
      date: "2024-01-10",
      time: "6:00 PM",
      type: "offered",
      passengers: 2
    },
    {
      id: 5,
      from: "Mall",
      to: "Home",
      date: "2024-01-08",
      time: "9:30 PM",
      type: "booked",
      driver: "Mike Johnson"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "full":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Rides</h1>
          <Link to="/add-ride">
            <Button className="bg-green-600 hover:bg-green-700">
              <Car className="mr-2 h-4 w-4" />
              Add New Ride
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="offered" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="offered">Rides I'm Offering</TabsTrigger>
            <TabsTrigger value="booked">Rides I've Booked</TabsTrigger>
            <TabsTrigger value="past">Past Rides</TabsTrigger>
          </TabsList>

          <TabsContent value="offered" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myOfferedRides.map((ride) => (
                <Card key={ride.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Your Ride Offer</CardTitle>
                      <Badge className={getStatusColor(ride.status)}>
                        {ride.status === "full" ? "Full" : "Available"}
                      </Badge>
                    </div>
                    <CardDescription>
                      {new Date(ride.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        From <strong>{ride.from}</strong> to <strong>{ride.to}</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        Departure: <strong>{ride.time}</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>{ride.booked}</strong> of <strong>{ride.seats}</strong> seats booked
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="mr-1 h-3 w-3" />
                          Messages
                        </Button>
                      </div>
                      <Button variant="destructive" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="booked" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myBookedRides.map((ride) => (
                <Card key={ride.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Booked Ride</CardTitle>
                      <Badge className={getStatusColor(ride.status)}>
                        {ride.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      Driver: {ride.driver}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        From <strong>{ride.from}</strong> to <strong>{ride.to}</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>{new Date(ride.date).toLocaleDateString()}</strong> at <strong>{ride.time}</strong>
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="mr-1 h-3 w-3" />
                        Contact Driver
                      </Button>
                      <Button variant="destructive" size="sm">
                        Cancel Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pastRides.map((ride) => (
                <Card key={ride.id} className="opacity-75">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {ride.type === "offered" ? "Ride You Offered" : "Ride You Took"}
                    </CardTitle>
                    <CardDescription>
                      {ride.type === "booked" && `Driver: ${ride.driver}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        From <strong>{ride.from}</strong> to <strong>{ride.to}</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>{new Date(ride.date).toLocaleDateString()}</strong> at <strong>{ride.time}</strong>
                      </span>
                    </div>
                    {ride.type === "offered" && (
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          <strong>{ride.passengers}</strong> passengers
                        </span>
                      </div>
                    )}
                    <div className="flex justify-end pt-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyRides;
