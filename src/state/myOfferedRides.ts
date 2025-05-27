import { useQuery } from "@tanstack/react-query";
import { myOfferedRides } from "@/data/rides.json";

export function useMyOfferedRides() {
  const myOfferedRidesData = useQuery({
    queryKey: ["myOfferedRides"],
    initialData: JSON.parse(JSON.stringify(myOfferedRides)),
    staleTime: Infinity,
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(JSON.parse(JSON.stringify(myOfferedRides)));
        }, 1000);
      });
    },
  });

  return {
    ...myOfferedRidesData,
  };
}
