
import { useQuery } from "@tanstack/react-query";
import { pastRides } from "@/data/rides.json";

export function useMyPastRides() {
  const myPastRidesData = useQuery({
    queryKey: ["myPastRides"],
    initialData: JSON.parse(JSON.stringify(pastRides)),
    staleTime: Infinity,
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(JSON.parse(JSON.stringify(pastRides)));
        }, 1000);
      });
    },
  });

  return {
    ...myPastRidesData,
  };
}
