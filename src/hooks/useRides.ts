
import { useQuery } from "@tanstack/react-query";
import { availableRides, myOfferedRides, myBookedRides, pastRides } from "@/data/rides.json";
import { AvailableRide, OfferedRide, BookedRide, PastRide } from "@/types/rides";

export function useAvailableRides() {
  return useQuery({
    queryKey: ["availableRides"],
    initialData: availableRides as AvailableRide[],
    queryFn: async () => {
      return new Promise<AvailableRide[]>((resolve) => {
        setTimeout(() => {
          resolve(availableRides as AvailableRide[]);
        }, 1000);
      });
    },
  });
}

export function useMyOfferedRides() {
  return useQuery({
    queryKey: ["myOfferedRides"],
    initialData: myOfferedRides as OfferedRide[],
    queryFn: async () => {
      return new Promise<OfferedRide[]>((resolve) => {
        setTimeout(() => {
          resolve(myOfferedRides as OfferedRide[]);
        }, 1000);
      });
    },
  });
}

export function useMyBookedRides() {
  return useQuery({
    queryKey: ["myBookedRides"],
    initialData: myBookedRides as BookedRide[],
    queryFn: async () => {
      return new Promise<BookedRide[]>((resolve) => {
        setTimeout(() => {
          resolve(myBookedRides as BookedRide[]);
        }, 1000);
      });
    },
  });
}

export function useMyPastRides() {
  return useQuery({
    queryKey: ["myPastRides"],
    initialData: pastRides as PastRide[],
    queryFn: async () => {
      return new Promise<PastRide[]>((resolve) => {
        setTimeout(() => {
          resolve(pastRides as PastRide[]);
        }, 1000);
      });
    },
  });
}
