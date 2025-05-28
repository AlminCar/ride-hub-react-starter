
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

  // Save myOfferedRides to localStorage
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

  // Save myAvailableRides to localStorage
  useEffect(() => {
    if (availableRides !== undefined) {
      try {
        localStorage.setItem("myAvailableRides", JSON.stringify(availableRides));
        console.log("Saved myAvailableRides to localStorage:", availableRides);
      } catch (error) {
        console.error("Error saving myAvailableRides to localStorage", error);
      }
    }
  }, [availableRides]);

  // Save myBookedRides to localStorage
  useEffect(() => {
    if (bookedRides !== undefined) {
      try {
        localStorage.setItem("myBookedRides", JSON.stringify(bookedRides));
        console.log("Saved myBookedRides to localStorage:", bookedRides);
      } catch (error) {
        console.error("Error saving myBookedRides to localStorage", error);
      }
    }
  }, [bookedRides]);

  // Save myPastRides to localStorage
  useEffect(() => {
    if (pastRides !== undefined) {
      try {
        localStorage.setItem("myPastRides", JSON.stringify(pastRides));
        console.log("Saved myPastRides to localStorage:", pastRides);
      } catch (error) {
        console.error("Error saving myPastRides to localStorage", error);
      }
    }
  }, [pastRides]);

  // Save administration state to localStorage
  useEffect(() => {
    if (administrationState !== undefined) {
      try {
        localStorage.setItem("administration", JSON.stringify(administrationState));
        console.log("Saved administration to localStorage:", administrationState);
      } catch (error) {
        console.error("Error saving administration to localStorage", error);
      }
    }
  }, [administrationState]);

  // Save map state to localStorage
  useEffect(() => {
    if (mapsState !== undefined) {
      try {
        localStorage.setItem("mapState", JSON.stringify(mapsState));
        console.log("Saved mapState to localStorage:", mapsState);
      } catch (error) {
        console.error("Error saving mapState to localStorage", error);
      }
    }
  }, [mapsState]);

  // Save messages to localStorage
  useEffect(() => {
    if (messagesState !== undefined) {
      try {
        localStorage.setItem("messages", JSON.stringify(messagesState));
        console.log("Saved messages to localStorage:", messagesState);
      } catch (error) {
        console.error("Error saving messages to localStorage", error);
      }
    }
  }, [messagesState]);

  // Save on page unload
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (offeredRides !== undefined) {
        localStorage.setItem("myOfferedRides", JSON.stringify(offeredRides));
      }
      if (availableRides !== undefined) {
        localStorage.setItem("myAvailableRides", JSON.stringify(availableRides));
      }
      if (bookedRides !== undefined) {
        localStorage.setItem("myBookedRides", JSON.stringify(bookedRides));
      }
      if (pastRides !== undefined) {
        localStorage.setItem("myPastRides", JSON.stringify(pastRides));
      }
      if (administrationState !== undefined) {
        localStorage.setItem("administration", JSON.stringify(administrationState));
      }
      if (mapsState !== undefined) {
        localStorage.setItem("mapState", JSON.stringify(mapsState));
      }
      if (messagesState !== undefined) {
        localStorage.setItem("messages", JSON.stringify(messagesState));
      }
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [offeredRides, availableRides, bookedRides, pastRides, administrationState, mapsState, messagesState]);

  return null;
};
