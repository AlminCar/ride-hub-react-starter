import { useQuery } from "@tanstack/react-query";
import { myBookedRides } from "@/data/rides.json";

export function useMyBookedRides() {
  const myBookedRidesData = useQuery({
    queryKey: ["myBookedRides"],
    initialData: JSON.parse(JSON.stringify(myBookedRides)),
    staleTime: Infinity,
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(JSON.parse(JSON.stringify(myBookedRides)));
        }, 1000);
      });
    },
  });

  return {
    ...myBookedRidesData,
  };
}
