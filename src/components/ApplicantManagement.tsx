
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, X, MessageCircle, Users } from "lucide-react";

interface Applicant {
  id: number;
  name: string;
  avatar: string;
  status: 'pending' | 'accepted' | 'declined';
  appliedAt: string;
  message: string;
}

interface ApplicantManagementProps {
  applicants: Applicant[];
  onAction: (rideId: number, applicantId: number, action: 'accept' | 'decline') => void;
  rideId: number;
}

export const ApplicantManagement = ({ applicants, onAction, rideId }: ApplicantManagementProps) => {
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const pendingApplicants = applicants.filter(a => a.status === 'pending');
  const acceptedApplicants = applicants.filter(a => a.status === 'accepted');

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Users className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium">
          Applicants ({applicants.length}) - {acceptedApplicants.length} accepted, {pendingApplicants.length} pending
        </span>
      </div>
      
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {applicants.map((applicant) => (
          <div key={applicant.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={applicant.avatar} alt={applicant.name} />
                <AvatarFallback className="text-xs">{applicant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{applicant.name}</p>
                <p className="text-xs text-gray-500">
                  Applied {new Date(applicant.appliedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(applicant.status)}>
                {applicant.status}
              </Badge>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => setSelectedApplicant(applicant)}>
                    <MessageCircle className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Message from {applicant.name}</DialogTitle>
                    <DialogDescription>
                      Applied on {new Date(applicant.appliedAt).toLocaleDateString()}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm">{applicant.message}</p>
                  </div>
                  {applicant.status === 'pending' && (
                    <div className="flex space-x-2 pt-4">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => onAction(rideId, applicant.id, 'accept')}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Accept
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => onAction(rideId, applicant.id, 'decline')}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Decline
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
              
              {applicant.status === 'pending' && (
                <div className="flex space-x-1">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-7 w-7 p-0 text-green-600 hover:bg-green-50"
                    onClick={() => onAction(rideId, applicant.id, 'accept')}
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-7 w-7 p-0 text-red-600 hover:bg-red-50"
                    onClick={() => onAction(rideId, applicant.id, 'decline')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
