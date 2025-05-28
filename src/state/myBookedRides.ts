
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { myBookedRides } from "@/data/rides.json";

export function useMyBookedRides() {
  const loadInitialData = () => {
    try {
      const saved = localStorage.getItem("myBookedRides");
      return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(myBookedRides));
    } catch (error) {
      console.error("Error loading myBookedRides from localStorage", error);
      return JSON.parse(JSON.stringify(myBookedRides));
    }
  };

  const myBookedRidesData = useQuery({
    queryKey: ["myBookedRides"],
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
    ...myBookedRidesData,
  };
}

export const useUpdateMyBookedRides = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => {
      return null;
    },
    onSuccess: (_, newData) => {
      queryClient.setQueryData(["myBookedRides"], newData);
    },
  });
};

export const useCancelMyBookedRideRide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ rideId, type }: { rideId: number; type: string }) => {
      return { rideId, type };
    },
    onSuccess: (_, { rideId, type }) => {
      queryClient.setQueryData(["myBookedRides"], (old: any[] = []) => {
        return old.filter((ride) => ride.id !== rideId);
      });

      if (type === "cancel") {
        queryClient.setQueryData(["myAvailableRides"], (old: any[] = []) => {
          return [
            ...old,
            {
              id: rideId,
              status: "available",
              // other properties as needed
            },
          ];
        });
      }
    },
  });
};
