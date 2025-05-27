
import { useQuery } from '@tanstack/react-query';
import statsData from '../data/stats.json';

interface RideStats {
  totalRides: number;
  totalUsers: number;
  totalSavings: number;
  activeRides: number;
}

const fetchStats = async (): Promise<RideStats> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return statsData;
};

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
