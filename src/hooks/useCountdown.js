import { useState, useEffect } from 'react';

/**
 * useCountdown — counts down to a target timestamp
 * @param {number|null} targetMs — unix ms timestamp to count down to
 * @returns {{ minutes, seconds, isExpired, totalSecondsLeft }}
 */
export function useCountdown(targetMs) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!targetMs) return;

    function tick() {
      const diff = Math.max(0, targetMs - Date.now());
      setTimeLeft(diff);
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetMs]);

  const totalSeconds = Math.floor(timeLeft / 1000);
  const minutes      = Math.floor(totalSeconds / 60);
  const seconds      = totalSeconds % 60;
  const isExpired    = totalSeconds === 0 && targetMs !== null;

  return { minutes, seconds, isExpired, totalSecondsLeft: totalSeconds };
}
