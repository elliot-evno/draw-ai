import { useEffect } from "react";

export function useTouchEvents(canvasRef, isDrawing) {
  useEffect(() => {
    const preventTouchDefault = (e) => {
      if (isDrawing) {
        e.preventDefault();
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('touchstart', preventTouchDefault, { passive: false });
      canvas.addEventListener('touchmove', preventTouchDefault, { passive: false });
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('touchstart', preventTouchDefault);
        canvas.removeEventListener('touchmove', preventTouchDefault);
      }
    };
  }, [canvasRef, isDrawing]);
} 