import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useRides() {
  const queryClient = useQueryClient();

  const myRides = useQuery({
    queryKey: ["myRides"],
    initialData: {},
  });

  return { ...myRides };
}
