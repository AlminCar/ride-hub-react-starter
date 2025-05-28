
import { useQuery } from "@tanstack/react-query";

export interface RideStats {
  totalRides: number;
  totalUsers: number;
  totalSavings: number;
  activeRides: number;
  userStats?: {
    activeRides: number;
    moneySaved: number;
    co2Saved: number;
    totalRides: number;
    driverRating: number;
    passengerRating: number;
  };
}

export function useStats() {
  return useQuery<RideStats>({
    queryKey: ["stats"],
    initialData: {
      totalRides: 245,
      totalUsers: 150,
      totalSavings: 2340,
      activeRides: 12,
      userStats: {
        activeRides: 2,
        moneySaved: 450,
        co2Saved: 120,
        totalRides: 15,
        driverRating: 4.8,
        passengerRating: 4.9
      }
    },
    queryFn: async () => {
      return new Promise<RideStats>((resolve) => {
        setTimeout(() => {
          resolve({
            totalRides: 245,
            totalUsers: 150,
            totalSavings: 2340,
            activeRides: 12,
            userStats: {
              activeRides: 2,
              moneySaved: 450,
              co2Saved: 120,
              totalRides: 15,
              driverRating: 4.8,
              passengerRating: 4.9
            }
          });
        }, 1000);
      });
    },
  });
}
