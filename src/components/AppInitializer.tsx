import { useAdministration } from "@/state/administration";
import { useCostSharing } from "@/state/costSharing";
import { useMaps } from "@/state/map";
import { useMyAvailableRides } from "@/state/myAvailableRides";
import { useMyBookedRides } from "@/state/myBookedRides";
import { useMyOfferedRides } from "@/state/myOfferedRides";
import { useMyPastRides } from "@/state/myPastRides";
import {useMessages} from "@/state/useMessages"

export const AppInitializer =() => {
  useMyAvailableRides();
  useMyBookedRides();
  useMyOfferedRides();
  useMyPastRides();
  useMessages();
  useMaps();
  useCostSharing();
  useAdministration()
  // Initialize other states or perform any setup needed for the app
  // This component can be used to ensure all necessary data is loaded before the app renders
  return null;
}