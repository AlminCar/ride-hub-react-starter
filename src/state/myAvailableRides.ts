import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { availableRides } from "@/data/rides.json";

export function useMyAvailableRides() {

   const loadInitialData = () => {
    try {
      const saved = localStorage.getItem("myAvailableRides");
      return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(availableRides));
    } catch (error) {
      console.error("Error loading myOfferedRides from localStorage", error);
      return JSON.parse(JSON.stringify(availableRides));
    }
  };

  const myAvailableRidesData = useQuery({
    queryKey: ["myAvailableRides"],
    initialData: loadInitialData(),
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
