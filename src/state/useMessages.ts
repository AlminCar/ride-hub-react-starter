
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { messages } from "@/data/messages.json";

export function useMessages() {
  const messagesData = useQuery({
    queryKey: ["messages"],
    initialData: JSON.parse(JSON.stringify(messages)),
    staleTime: Infinity,
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(JSON.parse(JSON.stringify(messages)));
        }, 1000);
      });
    }
  });

  return { ...messagesData };
}

export function useUpdateMessages() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newMessages: any) => {
      return null;
    },
    onSuccess: (_, newMessages) => {
      queryClient.setQueryData(["messages"], newMessages);
    },
  });
}
