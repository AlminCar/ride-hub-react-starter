import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useMessages() {
  const queryClient = useQueryClient();

  const messages = useQuery({
    queryKey: ["messages"],
    initialData: {},
  });

  return { ...messages };
}
