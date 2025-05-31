import { useEffect, useState } from "react";

type NotificationState = {
  message?: string;
} | null;

export function useNotification(state: NotificationState, duration = 3000) {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (state?.message) {
      // console.log("Notification message:", state.message);
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), duration);
      return () => clearTimeout(timer);
    }
  }, [state, duration]);

  return { showNotification };
}
