
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Car, Phone, Mail, Calendar, Shield, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Friendly commuter who loves sharing rides and meeting new people. I've been carpooling for over 3 years and believe in making transportation more sustainable and social.",
    location: "San Francisco, CA",
    carInfo: "2020 Honda Civic - Blue",
    joinDate: "January 2021"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const reviews = [
    {
      id: 1,
      reviewer: "Sarah Wilson",
      rating: 5,
      comment: "Great driver! Very punctual and friendly. The car was clean and comfortable.",
      date: "2 weeks ago",
      rideInfo: "Downtown → Airport"
    },
    {
      id: 2,
      reviewer: "Mike Johnson",
      rating: 5,
      comment: "Excellent communication and very reliable. Would definitely ride with John again!",
      date: "1 month ago",
      rideInfo: "University → Mall"
    },
    {
      id: 3,
      reviewer: "Alice Brown",
      rating: 4,
      comment: "Good ride, arrived on time. Music was a bit loud but overall a pleasant experience.",
      date: "2 months ago",
      rideInfo: "Home → Office"
    }
  ];

  const achievements = [
    { icon: Award, title: "5-Star Driver", description: "Maintained 5-star rating for 6 months" },
    { icon: Car, title: "Eco Warrior", description: "Saved 500kg of CO₂ through carpooling" },
    { icon: Shield, title: "Verified Driver", description: "Profile and documents verified" },
    { icon: Calendar, title: "Regular Commuter", description: "Completed 100+ rides" }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your profile information and view your carpool history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                    <AvatarFallback className="text-2xl bg-blue-600 text-white">JD</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{profileData.name}</CardTitle>
                <CardDescription className="flex items-center justify-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profileData.location}</span>
                </CardDescription>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <div className="flex">
                    {renderStars(5)}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">4.9 (127 reviews)</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Member since {profileData.joinDate}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Car className="h-4 w-4 text-gray-500" />
                  <span>{profileData.carInfo}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge className="bg-green-100 text-green-800">Verified Driver</Badge>
                  <Badge className="bg-blue-100 text-blue-800">5★ Rating</Badge>
                  <Badge className="bg-purple-100 text-purple-800">100+ Rides</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 p-2 rounded-lg bg-gray-50">
                      <Icon className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">{achievement.title}</p>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Profile Details & Reviews */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your profile information
                      </CardDescription>
                    </div>
                    <Button
                      variant={isEditing ? "outline" : "default"}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>Phone</span>
                        </Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="carInfo">Car Information</Label>
                      <Input
                        id="carInfo"
                        value={profileData.carInfo}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData(prev => ({ ...prev, carInfo: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        rows={4}
                      />
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews & Ratings</CardTitle>
                    <CardDescription>
                      See what other users say about your rides
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Rating Summary */}
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold">4.9</div>
                        <div className="flex justify-center">
                          {renderStars(5)}
                        </div>
                        <div className="text-sm text-gray-600">Overall Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">127</div>
                        <div className="text-sm text-gray-600">Total Reviews</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">98%</div>
                        <div className="text-sm text-gray-600">Positive</div>
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{review.reviewer}</span>
                                <div className="flex">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                              <span className="text-sm text-blue-600">{review.rideInfo}</span>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-sm text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
