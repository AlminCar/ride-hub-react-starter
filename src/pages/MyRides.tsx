import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Clock, Users, Car, MessageCircle, Check, X, DollarSign, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useMyOfferedRides, useMyBookedRides, usePastRides, useApplicantAction, useCancelRide } from "../hooks/useRides";
import { ApplicantManagement } from "../components/ApplicantManagement";
import { CostBreakdown } from "../components/CostBreakdown";

const MyRides = () => {
  const { data: myOfferedRides, isLoading: offeredLoading, error: offeredError } = useMyOfferedRides();
  const { data: myBookedRides, isLoading: bookedLoading, error: bookedError } = useMyBookedRides();
  const { data: pastRides, isLoading: pastLoading, error: pastError } = usePastRides();
  
  const applicantActionMutation = useApplicantAction();
  const cancelRideMutation = useCancelRide();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "full":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
      case "accepted":
        return "bg-green-100 text-green-800";
      case "waitlisted":
        return "bg-yellow-100 text-yellow-800";
      case "declined":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelRide = (rideId: number, type: string) => {
    cancelRideMutation.mutate({ rideId, type });
  };

  const handleApplicantAction = (rideId: number, applicantId: number, action: 'accept' | 'decline') => {
    applicantActionMutation.mutate({ rideId, applicantId, action });
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

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
            {offeredLoading && <LoadingSkeleton />}
            {offeredError && (
              <div className="text-center py-8">
                <p className="text-red-600">Error loading offered rides. Please try again.</p>
              </div>
            )}
            {myOfferedRides && (
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
                      
                      {ride.applicants && ride.applicants.length > 0 && (
                        <ApplicantManagement 
                          applicants={ride.applicants}
                          onAction={handleApplicantAction}
                          rideId={ride.id}
                        />
                      )}
                      
                      <CostBreakdown breakdown={ride.costBreakdown} />
                      
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
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              disabled={cancelRideMutation.isPending}
                            >
                              {cancelRideMutation.isPending && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
                              Cancel
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancel Ride</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to cancel this ride? All accepted passengers will be notified.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Keep Ride</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleCancelRide(ride.id, 'offered')}>
                                Cancel Ride
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="booked" className="space-y-6">
            {bookedLoading && <LoadingSkeleton />}
            {bookedError && (
              <div className="text-center py-8">
                <p className="text-red-600">Error loading booked rides. Please try again.</p>
              </div>
            )}
            {myBookedRides && (
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
                      <CardDescription className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={ride.driverAvatar} alt={ride.driver} />
                          <AvatarFallback className="text-xs">{ride.driver.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>Driver: {ride.driver}</span>
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
                      {ride.status === 'accepted' && (
                        <>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                              Cost Share: <strong>${ride.costShare}</strong>
                            </span>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm text-green-800">
                              <strong>Pickup:</strong> {ride.pickupLocation}
                            </p>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between items-center pt-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="mr-1 h-3 w-3" />
                          Contact Driver
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              Cancel Booking
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to cancel this booking? The driver will be notified.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleCancelRide(ride.id, 'booked')}>
                                Cancel Booking
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastLoading && <LoadingSkeleton />}
            {pastError && (
              <div className="text-center py-8">
                <p className="text-red-600">Error loading past rides. Please try again.</p>
              </div>
            )}
            {pastRides && (
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
                      {ride.earnings && (
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-600">
                            Earned: <strong>${ride.earnings}</strong>
                          </span>
                        </div>
                      )}
                      {ride.costPaid && (
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-blue-600">
                            Paid: <strong>${ride.costPaid}</strong>
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
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyRides;
