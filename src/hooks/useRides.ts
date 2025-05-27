import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  OfferedRide,
  BookedRide,
  PastRide,
  AvailableRide,
} from "../types/rides";
import ridesData from "../data/rides.json";

// Simulate API calls with mock data
const fetchAvailableRides = async (): Promise<AvailableRide[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return ridesData.availableRides;
};

const fetchMyOfferedRides = async (): Promise<OfferedRide[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return ridesData.myOfferedRides;
};

const fetchMyBookedRides = async (): Promise<BookedRide[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return ridesData.myBookedRides;
};

const fetchPastRides = async (): Promise<PastRide[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return ridesData.pastRides;
};

// React Query hooks
export const useAvailableRides = () => {
  return useQuery({
    queryKey: ["availableRides"],
    queryFn: fetchAvailableRides,
  });
};

export const useUpdateAvailableRides = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => {
      console.log("kada dodje", newData);
      return null;
    },
    onSuccess: (data, newData) => {
      console.log(data, newData);
      queryClient.setQueryData(["availableRides"], newData);
    },
  });
};

export const useMyOfferedRides = () => {
  return useQuery({
    queryKey: ["myOfferedRides"],
    queryFn: fetchMyOfferedRides,
  });
};

export const useMyBookedRides = () => {
  return useQuery({
    queryKey: ["myBookedRides"],
    queryFn: fetchMyBookedRides,
  });
};

export const usePastRides = () => {
  return useQuery({
    queryKey: ["pastRides"],
    queryFn: fetchPastRides,
  });
};

// Mutation hooks
export const useApplicantAction = () => {
  const queryClient = useQueryClient();

  const updateSeatsMutation = useMutation({
    mutationFn: async ({
      rideId,
      applicantId,
      action,
    }: {
      rideId: number;
      applicantId: number;
      action: "accept" | "decline";
    }) => {
      console.log(`${action} applicant ${applicantId} for ride ${rideId}`);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { rideId, applicantId, action };
    },
    onSuccess: (data, newData) => {
      queryClient.setQueryData(["administration"], newData);
    },
  });
};

export const useCancelRide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ rideId, type }: { rideId: number; type: string }) => {
      console.log(`Cancelling ${type} ride ${rideId}`);
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { rideId, type };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myOfferedRides"] });
      queryClient.invalidateQueries({ queryKey: ["myBookedRides"] });
    },
  });
};
