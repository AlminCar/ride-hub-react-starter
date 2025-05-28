export interface Applicant {
  id: number;
  name: string;
  avatar: string;
  status: "accepted" | "pending" | "declined";
  appliedAt: string;
  message: string;
}

export interface CostBreakdown {
  totalCost: number;
  perPerson: number;
  fuelCost: number;
  tollsCost: number;
  parkingCost?: number;
}

export interface Payment {
  id: number;
  passengerName: string;
  passengerAvatar: string;
  amount: number;
  status: "confirmed" | "pending";
  dueDate: string;
  paidDate?: string;
  method?: string;
}

export interface OfferedRide {
  id: number;
  from: string;
  to: string;
  date: string;
  time: string;
  seats: number;
  booked: number;
  status: "active" | "full" | "cancelled";
  applicants: Applicant[];
  costBreakdown: CostBreakdown;
  payments: Payment[];
  fromCoordinates?: [number, number];
  toCoordinates?: [number, number];
}

export interface BookedRide {
  id: number;
  from: string;
  to: string;
  date: string;
  time: string;
  driver: string;
  driverAvatar: string;
  status: "accepted" | "waitlisted" | "declined" | "pending";
  appliedAt: string;
  costShare: number;
  pickupLocation: string;
  fromCoordinates?: [number, number];
  toCoordinates?: [number, number];
}

export interface PastRide {
  id: number;
  from: string;
  to: string;
  date: string;
  time: string;
  type: "offered" | "booked";
  passengers?: number;
  earnings?: number;
  driver?: string;
  costPaid?: number;
  fromCoordinates?: [number, number];
  toCoordinates?: [number, number];
}

export interface AvailableRide {
  id: number;
  from: string;
  to: string;
  time: string;
  seats: number;
  driver: string;
  price: number;
  date: string;
  fromCoordinates?: [number, number];
  toCoordinates?: [number, number];
}
