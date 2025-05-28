import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type AdministrationStateType = {
  mapIntegration: boolean;
  realTimeMessaging: boolean;
  pushNotifications: boolean;
  costSharing: boolean;
  adminReporting: boolean;
}

export function useAdministration() {
  const loadInitialData = () => {
    try {
      const saved = localStorage.getItem("administration");
      return saved ? JSON.parse(saved) : {
        mapIntegration: true,
        realTimeMessaging: true,
        pushNotifications: true,
        costSharing: true,
        adminReporting: true
      };
    } catch (error) {
      console.error("Error loading administration from localStorage", error);
      return {
        mapIntegration: true,
        realTimeMessaging: true,
        pushNotifications: true,
        costSharing: true,
        adminReporting: true
      };
    }
  };

  const administration = useQuery<AdministrationStateType>({
    queryKey: ["administration"],
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

  return { ...administration };
}

export function useUpdateAdministration() {
  const queryClient = useQueryClient()

  const administration = useMutation({
    mutationFn: (state) => {
      return null;
    },
    onSuccess: (data, newData) => {
      queryClient.setQueryData(['administration'], newData)
    },
  });

  return { ...administration };
}
