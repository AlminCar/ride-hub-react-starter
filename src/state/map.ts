import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useMaps() {
  const queryClient = useQueryClient();

  const map = useQuery({
    queryKey: ["map"],
    initialData: {},
  });

  return { ...map };
}
