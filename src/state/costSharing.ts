import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useCostSharing() {
  const queryClient = useQueryClient();

  const costSharing = useQuery({
    queryKey: ["costSharing"],
    initialData: {},
  });

  return { ...costSharing };
}
