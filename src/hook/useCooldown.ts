"use client";

import { useState, useEffect } from "react";

export function useCooldown(onCooldownStart?: () => void) {
  const COOLDOWN_DURATION = 60;
  const STORAGE_KEY = "resendCooldownStart";

  const [disabled, setDisabled] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  
  const startCooldown = () => {
    const now = Date.now();
    localStorage.setItem(STORAGE_KEY, now.toString());

    setDisabled(true);
    setSecondsLeft(COOLDOWN_DURATION);
    onCooldownStart?.();
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const savedTime = parseInt(saved, 10);
      const elapsed = Math.floor((Date.now() - savedTime) / 1000);
      const remaining = COOLDOWN_DURATION - elapsed;

      if (remaining > 0) {
        setDisabled(true);
        setSecondsLeft(remaining);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (!disabled) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setDisabled(false);
          localStorage.removeItem(STORAGE_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disabled]);

  return {
    disabled,
    secondsLeft,
    startCooldown,
  };
}
