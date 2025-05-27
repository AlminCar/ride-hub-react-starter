
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Calendar, DollarSign, Car, Users, TrendingUp, MapPin } from "lucide-react";

const Analytics = () => {
  // Sample data for charts
  const monthlyRides = [
    { month: "Jan", offered: 12, taken: 8 },
    { month: "Feb", offered: 15, taken: 10 },
    { month: "Mar", offered: 18, taken: 12 },
    { month: "Apr", offered: 20, taken: 15 },
    { month: "May", offered: 22, taken: 18 },
    { month: "Jun", offered: 25, taken: 20 },
  ];

  const savingsData = [
    { month: "Jan", savings: 120 },
    { month: "Feb", savings: 180 },
    { month: "Mar", savings: 220 },
    { month: "Apr", savings: 280 },
    { month: "May", savings: 320 },
    { month: "Jun", savings: 380 },
  ];

  const routeData = [
    { route: "Home ↔ Office", rides: 45, percentage: 40 },
    { route: "Downtown ↔ Airport", rides: 25, percentage: 22 },
    { route: "University ↔ Mall", rides: 20, percentage: 18 },
    { route: "Other Routes", rides: 22, percentage: 20 },
  ];

  const pieColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Track your carpool activity, savings, and environmental impact
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Money Saved</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,245</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+18%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Reduced</CardTitle>
              <div className="text-green-600">♻</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245 kg</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+25%</span> environmental impact
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">People Met</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8</span> new connections
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Rides Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Monthly Ride Activity</span>
              </CardTitle>
              <CardDescription>
                Rides offered vs rides taken over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRides}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="offered" fill="#3B82F6" name="Rides Offered" />
                  <Bar dataKey="taken" fill="#10B981" name="Rides Taken" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Savings Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Savings Trend</span>
              </CardTitle>
              <CardDescription>
                Cumulative money saved through carpooling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={savingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Savings']} />
                  <Line 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Route Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Popular Routes Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Popular Routes</span>
              </CardTitle>
              <CardDescription>
                Distribution of your most frequent routes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={routeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percentage }) => `${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="rides"
                  >
                    {routeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {routeData.map((route, index) => (
                  <div key={route.route} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: pieColors[index] }}
                      />
                      <span>{route.route}</span>
                    </div>
                    <span className="font-medium">{route.rides} rides</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Your latest carpool activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Offered ride to Airport</p>
                    <p className="text-xs text-gray-500">2 passengers • Yesterday</p>
                  </div>
                  <span className="text-xs text-green-600 font-medium">+$25</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Took ride to Downtown</p>
                    <p className="text-xs text-gray-500">With Sarah M. • 3 days ago</p>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">-$12</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Offered ride to University</p>
                    <p className="text-xs text-gray-500">3 passengers • 1 week ago</p>
                  </div>
                  <span className="text-xs text-green-600 font-medium">+$36</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Ride cancelled</p>
                    <p className="text-xs text-gray-500">Downtown to Mall • 1 week ago</p>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">$0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
