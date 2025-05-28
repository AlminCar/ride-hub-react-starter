
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { messages } from "@/data/messages.json";

export function useMessages() {
  const loadInitialData = () => {
    try {
      const saved = localStorage.getItem("messages");
      return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(messages));
    } catch (error) {
      console.error("Error loading messages from localStorage", error);
      return JSON.parse(JSON.stringify(messages));
    }
  };

  const messagesData = useQuery({
    queryKey: ["messages"],
    initialData: loadInitialData(),
    staleTime: Infinity,
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(loadInitialData());
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
