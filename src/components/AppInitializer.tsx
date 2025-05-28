
import { useEffect } from "react";
import { useMyOfferedRides } from "@/state/myOfferedRides";
import { useAdministration } from "@/state/administration";
import { useMyAvailableRides } from "@/state/myAvailableRides";
import { useMyBookedRides } from "@/state/myBookedRides";
import { useMyPastRides} from "@/state/myPastRides";
import { useMaps } from "@/state/map";
import { useMessages } from "@/state/useMessages";

export const AppInitializer = () => {
  const { data: offeredRides } = useMyOfferedRides();
  const { data: availableRides } = useMyAvailableRides();
  const { data: bookedRides } = useMyBookedRides();
  const { data: pastRides } = useMyPastRides(); 
  const { data: administrationState } = useAdministration();
  const { data: mapsState } = useMaps();
  const { data: messagesState } = useMessages();


  // Save to localStorage when offeredRides changes
  useEffect(() => {
    if (offeredRides !== undefined) {
      try {
        localStorage.setItem("myOfferedRides", JSON.stringify(offeredRides));
        console.log("Saved myOfferedRides to localStorage:", offeredRides);
      } catch (error) {
        console.error("Error saving myOfferedRides to localStorage", error);
      }
    }
  }, [offeredRides]);

  // Save on page unload
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (offeredRides !== undefined) {
        localStorage.setItem("myOfferedRides", JSON.stringify(offeredRides));
      }
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [offeredRides]);

  // ---------------------------------------------------------------------------------
   // Save to localStorage when offeredRides changes
   useEffect(() => {
    if (offeredRides !== undefined) {
      try {
        localStorage.setItem("myAvailableRides", JSON.stringify(availableRides));
        console.log("Saved myOfferedRides to localStorage:", availableRides);
      } catch (error) {
        console.error("Error saving myOfferedRides to localStorage", error);
      }
    }
  }, []);

  // Save on page unload
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (availableRides !== undefined) {
        localStorage.setItem("myAvailableRides", JSON.stringify(availableRides));
      }
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [availableRides]);

  return null;
};