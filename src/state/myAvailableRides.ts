import { useQuery } from "@tanstack/react-query";
import { availableRides } from "@/data/rides.json";

export function useMyAvailableRides() {
  const myAvailableRidesData = useQuery({
    queryKey: ["myAvailableRides"],
    initialData: JSON.parse(JSON.stringify(availableRides)),
    staleTime: Infinity,
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(JSON.parse(JSON.stringify(availableRides)));
        }, 1000);
      });
    },
  });

  return {
    ...myAvailableRidesData,
  };
}
