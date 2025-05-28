
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

type MapStateType = {
  center: { lat: number; lng: number };
  zoom: number;
  selectedRide: any;
  showRoutes: boolean;
}

export function useMaps() {
  const mapData = useQuery<MapStateType>({
    queryKey: ["mapState"],
    initialData: {
      center: { lat: 40.7128, lng: -74.0060 },
      zoom: 12,
      selectedRide: null,
      showRoutes: true
    },
    staleTime: Infinity,
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            center: { lat: 40.7128, lng: -74.0060 },
            zoom: 12,
            selectedRide: null,
            showRoutes: true
          });
        }, 1000);
      });
    },
  });

  return { ...mapData };
}

export function useUpdateMapState() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newState: Partial<MapStateType>) => {
      return null;
    },
    onSuccess: (_, newState) => {
      queryClient.setQueryData(["mapState"], (old: MapStateType) => ({
        ...old,
        ...newState
      }));
    },
  });
}
