import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
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
