import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useAdministration() {
  const queryClient = useQueryClient();

  const administration = useQuery({
    queryKey: ["administration"],
    initialData: {},
  });

  return { ...administration };
}
