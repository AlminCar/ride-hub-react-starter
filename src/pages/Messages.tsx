
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Search, Phone, Video, MoreVertical } from "lucide-react";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Sarah Wilson",
      lastMessage: "Thanks for the ride! See you tomorrow.",
      time: "2:30 PM",
      unread: 0,
      avatar: "/placeholder-avatar.jpg",
      status: "online",
      rideInfo: "Downtown → Airport"
    },
    {
      id: 2,
      name: "Mike Johnson",
      lastMessage: "What time should we meet?",
      time: "1:45 PM",
      unread: 2,
      avatar: "/placeholder-avatar.jpg",
      status: "away",
      rideInfo: "University → Mall"
    },
    {
      id: 3,
      name: "Alice Brown",
      lastMessage: "Perfect! I'll be waiting at the usual spot.",
      time: "11:20 AM",
      unread: 0,
      avatar: "/placeholder-avatar.jpg",
      status: "offline",
      rideInfo: "Home → Office"
    },
    {
      id: 4,
      name: "David Chen",
      lastMessage: "Can we leave 15 minutes earlier?",
      time: "Yesterday",
      unread: 1,
      avatar: "/placeholder-avatar.jpg",
      status: "online",
      rideInfo: "Mall → Home"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "other",
      content: "Hi! I saw your ride offer for tomorrow. Is it still available?",
      time: "2:15 PM",
      avatar: "/placeholder-avatar.jpg"
    },
    {
      id: 2,
      sender: "me",
      content: "Yes, it's still available! I have 2 seats left.",
      time: "2:18 PM"
    },
    {
      id: 3,
      sender: "other",
      content: "Great! What time are you planning to leave?",
      time: "2:20 PM",
      avatar: "/placeholder-avatar.jpg"
    },
    {
      id: 4,
      sender: "me",
      content: "I'll be leaving at 3:00 PM from Downtown. The pickup point is in front of the mall entrance.",
      time: "2:22 PM"
    },
    {
      id: 5,
      sender: "other",
      content: "Perfect! I'll be there at 3:00 PM sharp. Should I bring anything?",
      time: "2:25 PM",
      avatar: "/placeholder-avatar.jpg"
    },
    {
      id: 6,
      sender: "me",
      content: "Just be on time! Looking forward to meeting you.",
      time: "2:28 PM"
    },
    {
      id: 7,
      sender: "other",
      content: "Thanks for the ride! See you tomorrow.",
      time: "2:30 PM",
      avatar: "/placeholder-avatar.jpg"
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-2">
            Communicate with your carpool partners
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation, index) => (
                  <div
                    key={conversation.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 transition-colors ${
                      selectedChat === index 
                        ? "bg-blue-50 border-l-blue-500" 
                        : "border-l-transparent"
                    }`}
                    onClick={() => setSelectedChat(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(conversation.status)} rounded-full border-2 border-white`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conversation.name}
                          </p>
                          <div className="flex flex-col items-end space-y-1">
                            <span className="text-xs text-gray-500">{conversation.time}</span>
                            {conversation.unread > 0 && (
                              <Badge className="bg-blue-600 text-white text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-blue-600 mb-1">{conversation.rideInfo}</p>
                        <p className="text-sm text-gray-500 truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversations[selectedChat]?.avatar} alt={conversations[selectedChat]?.name} />
                      <AvatarFallback>{conversations[selectedChat]?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(conversations[selectedChat]?.status || 'offline')} rounded-full border-2 border-white`}></div>
                  </div>
                  <div>
                    <h3 className="font-medium">{conversations[selectedChat]?.name}</h3>
                    <p className="text-sm text-blue-600">{conversations[selectedChat]?.rideInfo}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.sender === 'me' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {message.sender === 'other' && (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={message.avatar} alt="User" />
                        <AvatarFallback className="text-xs">{conversations[selectedChat]?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        message.sender === 'me'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
