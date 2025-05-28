
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

type MapStateType = {
  center: { lat: number; lng: number };
  zoom: number;
  selectedRide: any;
  showRoutes: boolean;
}

export function useMaps() {
  const loadInitialData = () => {
    try {
      const saved = localStorage.getItem("mapState");
      return saved ? JSON.parse(saved) : {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12,
        selectedRide: null,
        showRoutes: true
      };
    } catch (error) {
      console.error("Error loading mapState from localStorage", error);
      return {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12,
        selectedRide: null,
        showRoutes: true
      };
    }
  };

  const mapData = useQuery<MapStateType>({
    queryKey: ["mapState"],
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
