import { useRef, useEffect } from "react";

export default function Canvas({ 
  canvasRef, 
  backgroundImageRef, 
  isDrawing, 
  penColor, 
  startDrawing, 
  draw, 
  stopDrawing 
}) {
  // Load background image when generatedImage changes
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={960}
      height={540}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      className="border-2 border-black w-full hover:cursor-crosshair sm:h-[60vh] h-[30vh] min-h-[320px] bg-white/90 touch-none"
    />
  );
} 