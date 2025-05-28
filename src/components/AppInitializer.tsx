
import { useEffect } from "react";
import { useMyOfferedRides } from "@/state/myOfferedRides";

export const AppInitializer = () => {
  const { data: offeredRides } = useMyOfferedRides();

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

  return null;
};
