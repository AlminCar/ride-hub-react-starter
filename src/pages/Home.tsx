
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Users,
  Car,
  DollarSign,
  TrendingUp,
  UserCheck,
  Zap,
  LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  useMyAvailableRides,
  useUpdateAvailableRides,
} from "@/state/myAvailableRides.ts";
import { useStats } from "../hooks/useStats";
import { useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal.tsx";

const Home = () => {
  const {
    data: availableRides,
    isLoading: ridesLoading,
    error: ridesError,
  } = useMyAvailableRides();
  const { mutate: updateAvailableRides } = useUpdateAvailableRides();
  const { data: stats, isLoading: statsLoading } = useStats();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<any>(null);

  const StatCard = ({
    title,
    value,
    icon: Icon,
    description,
  }: {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {statsLoading ? (
          <Skeleton className="h-8 w-16" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Share the Ride, Share the Cost
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with fellow travelers and make every journey affordable and
            eco-friendly
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/add-ride">
              <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                <Car className="mr-2 h-5 w-5" />
                Offer a Ride
              </Button>
            </Link>
            <Link to="/my-rides">
              <Button variant="outline" size="lg">
                <Users className="mr-2 h-5 w-5" />
                Find a Ride
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Rides"
            value={stats?.totalRides || 0}
            icon={Car}
            description="Rides completed this month"
          />
          <StatCard
            title="Active Users"
            value={stats?.totalUsers || 0}
            icon={UserCheck}
            description="Users joined this month"
          />
          <StatCard
            title="Money Saved"
            value={stats?.totalSavings ? `$${stats.totalSavings}` : "$0"}
            icon={DollarSign}
            description="Total savings this month"
          />
          <StatCard
            title="Active Rides"
            value={stats?.activeRides || 0}
            icon={TrendingUp}
            description="Rides available now"
          />
        </div>

        {/* Available Rides Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Rides
            </h2>
            <Link to="/my-rides">
              <Button variant="outline">View All Rides</Button>
            </Link>
          </div>

          {ridesLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {ridesError && (
            <div className="text-center py-8">
              <p className="text-red-600">
                Error loading available rides. Please try again.
              </p>
            </div>
          )}

          {availableRides && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableRides.slice(0, 6).map((ride) => (
                <Card
                  key={ride.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{ride.driver}</CardTitle>
                    <CardDescription>
                      {new Date(ride.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        From <strong>{ride.from}</strong> to{" "}
                        <strong>{ride.to}</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        Departure: <strong>{ride.time}</strong>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{ride.seats} seats</span>
                      </div>
                      <Badge variant="secondary">${ride.price}</Badge>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedRide(ride);
                        setModalOpen(true);
                      }}
                    >
                      Apply for Ride
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        {modalOpen && selectedRide && (
          <ConfirmationModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={() => {
              const newAvailableRides = availableRides.map((ride) => {
                if (ride.id === selectedRide.id) {
                  return {
                    ...selectedRide,
                    seats: selectedRide.seats - 1,
                  };
                }
                return ride;
              });

              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              updateAvailableRides({ selectedRide, newAvailableRides: [...newAvailableRides]});
              setModalOpen(false);
            }}
            title="Apply for Ride"
            message={`Are you sure you want to apply for the ride from ${selectedRide.from} to ${selectedRide.to}?`}
            breakdown={{
              totalCost: selectedRide.price,
              perPerson: selectedRide.price / selectedRide.seats,
              fuelCost: selectedRide.fuelCost || 0,
              tollsCost: selectedRide.tollsCost || 0,
            }}
          />
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Save Money</h3>
            <p className="text-gray-600">
              Split fuel costs and reduce your travel expenses significantly
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Meet People</h3>
            <p className="text-gray-600">
              Connect with like-minded travelers and build new friendships
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Go Green</h3>
            <p className="text-gray-600">
              Reduce carbon footprint by sharing rides and helping the
              environment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
