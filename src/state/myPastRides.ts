
import { useQuery } from "@tanstack/react-query";
import { pastRides } from "@/data/rides.json";

export function useMyPastRides() {
  const loadInitialData = () => {
    try {
      const saved = localStorage.getItem("myPastRides");
      return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(pastRides));
    } catch (error) {
      console.error("Error loading myPastRides from localStorage", error);
      return JSON.parse(JSON.stringify(pastRides));
    }
  };

  const myPastRidesData = useQuery({
    queryKey: ["myPastRides"],
    initialData: loadInitialData(),
    staleTime: Infinity,
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(loadInitialData());
        }, 1000);
      });
    },
  });

  return {
    ...myPastRidesData,
  };
}
