import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
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

export const useUpdateAvailableRides = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => {
      return null;
    },
    onSuccess: (_, newData: any) => {
      queryClient.setQueryData(["myAvailableRides"], newData.newAvailableRides);

      queryClient.setQueryData(["myBookedRides"], (old: any[] = []) => [
          ...old,
          {
            ...newData.selectedRide,
            driverAvatar: "/placeholder-avatar.jpg",
            status: "waitlisted",
            appliedAt: new Date().toISOString(),
            costShare: 0,
            pickupLocation: "",
          },
        ]
      );
    },
  });
};
