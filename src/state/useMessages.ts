import { useQuery, useQueryClient } from "@tanstack/react-query";
import { messages } from "@/data/messages.json";

export function useMessages() {
  const queryClient = useQueryClient();

  const messagesData = useQuery({
    queryKey: ["messages"],
    initialData: JSON.parse(JSON.stringify(messages)),
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
