
import { useQuery } from "@tanstack/react-query";
import { stats } from "@/data/stats.json";

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
      totalRides: stats.userStats.totalRides,
      totalUsers: 150,
      totalSavings: stats.userStats.moneySaved,
      activeRides: stats.userStats.activeRides,
      userStats: stats.userStats
    },
    queryFn: async () => {
      return new Promise<RideStats>((resolve) => {
        setTimeout(() => {
          resolve({
            totalRides: stats.userStats.totalRides,
            totalUsers: 150,
            totalSavings: stats.userStats.moneySaved,
            activeRides: stats.userStats.activeRides,
            userStats: stats.userStats
          });
        }, 1000);
      });
    },
  });
}
