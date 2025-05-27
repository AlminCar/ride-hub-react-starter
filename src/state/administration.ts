import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type AdministrationStateType = {
  mapIntegration: boolean;
  realTimeMessaging: boolean;
  pushNotifications: boolean;
  costSharing: boolean;
  adminReporting: boolean;
}

export function useAdministration() {
  const administration = useQuery<AdministrationStateType>({
    queryKey: ["administration"],
    initialData: {
        mapIntegration: true,
        realTimeMessaging: true,
        pushNotifications: true,
        costSharing: true,
        adminReporting: true
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

