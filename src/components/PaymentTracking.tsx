
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DollarSign, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface PaymentRecord {
  id: number;
  passengerName: string;
  passengerAvatar: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'disputed';
  dueDate: string;
  paidDate?: string;
  method?: string;
}

interface PaymentTrackingProps {
  payments: PaymentRecord[];
  onConfirmPayment: (paymentId: number) => void;
  onDisputePayment: (paymentId: number) => void;
  isDriver: boolean;
}

export const PaymentTracking = ({ payments, onConfirmPayment, onDisputePayment, isDriver }: PaymentTrackingProps) => {
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "disputed":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "disputed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const confirmedAmount = payments
    .filter(p => p.status === 'confirmed')
    .reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          <span>Payment Tracking</span>
        </CardTitle>
        <CardDescription>
          {isDriver ? "Track payments from passengers" : "Track your payment status"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="text-gray-600">Total Expected</p>
              <p className="font-bold text-lg">${totalAmount}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Confirmed</p>
              <p className="font-bold text-lg text-green-600">${confirmedAmount}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Pending</p>
              <p className="font-bold text-lg text-yellow-600">${pendingAmount}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {payments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={payment.passengerAvatar} alt={payment.passengerName} />
                  <AvatarFallback>{payment.passengerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{payment.passengerName}</p>
                  <p className="text-sm text-gray-500">
                    Due: {new Date(payment.dueDate).toLocaleDateString()}
                    {payment.paidDate && (
                      <span className="ml-2">
                        • Paid: {new Date(payment.paidDate).toLocaleDateString()}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-bold">${payment.amount}</p>
                  {payment.method && (
                    <p className="text-xs text-gray-500">{payment.method}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {getStatusIcon(payment.status)}
                  <Badge className={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                </div>

                {isDriver && payment.status === 'pending' && (
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 hover:bg-green-50"
                      onClick={() => onConfirmPayment(payment.id)}
                    >
                      Confirm
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => setSelectedPayment(payment)}
                        >
                          Dispute
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Dispute Payment</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to dispute this payment from {payment.passengerName}?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex space-x-2 pt-4">
                          <Button
                            variant="destructive"
                            className="flex-1"
                            onClick={() => onDisputePayment(payment.id)}
                          >
                            Yes, Dispute
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
