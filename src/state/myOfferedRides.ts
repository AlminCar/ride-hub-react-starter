import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { myOfferedRides } from "@/data/rides.json";

export function useMyOfferedRides() {
  // Try to load from localStorage first
  const loadInitialData = () => {
    try {
      const saved = localStorage.getItem("myOfferedRides");
      return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(myOfferedRides));
    } catch (error) {
      console.error("Error loading myOfferedRides from localStorage", error);
      return JSON.parse(JSON.stringify(myOfferedRides));
    }
  };

  const myOfferedRidesData = useQuery({
    queryKey: ["myOfferedRides"],
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
    ...myOfferedRidesData,
  };
}

export const useApplicantAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      rideId,
      applicantId,
      action,
    }: {
      rideId: number;
      applicantId: number;
      action: "accept" | "decline";
    }) => {
      return { rideId, applicantId, action };
    },
    onSuccess: (_, { rideId, applicantId, action }) => {
      queryClient.setQueryData(["myOfferedRides"], (old: any[] = []) => {
        return old.map((ride) => {
          if (ride.id === rideId) {
            return {
              ...ride,
              applicants: ride.applicants.map((applicant) => {
                if (applicant.id === applicantId) {
                  return {
                    ...applicant,
                    status: action === "accept" ? "accepted" : "declined",
                  };
                }
                return applicant;
              }),
            };
          }
          return ride;
        });
      });
    },
  });
};

export const useCreateMyOfferedRideAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newOffer: any) => {
      return newOffer;
    },
    onSuccess: (_, newOffer) => {
      queryClient.setQueryData(["myOfferedRides"], (old: any[] = []) => {
        return [...old, newOffer];
      });
    },
  });
};

export const useDeleteMyOfferedRideAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rideId: number) => {
      return rideId;
    },
    onSuccess: (_, rideId) => {
      queryClient.setQueryData(["myOfferedRides"], (old: any[] = []) => {
        return old.filter((ride) => ride.id !== rideId);
      });
    },
  });
};