import { useState, useRef, useEffect } from "react";

export function useCanvas() {
  const canvasRef = useRef(null);
  const backgroundImageRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const colorInputRef = useRef(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Load background image when generatedImage changes
  useEffect(() => {
    if (generatedImage && canvasRef.current) {
      const img = new window.Image();
      img.onload = () => {
        backgroundImageRef.current = img; 
        drawImageToCanvas();
      };
      img.src = generatedImage;
    }
  }, [generatedImage]);

  // Initialize canvas with white background when component mounts
  useEffect(() => {
    if (canvasRef.current) {
      initializeCanvas();
    }
  }, []);

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHistory([canvas.toDataURL()]);
    setHistoryIndex(0);
  };

  const drawImageToCanvas = () => {
    if (!canvasRef.current || !backgroundImageRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImageRef.current, 0, 0, canvas.width, canvas.height);
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.nativeEvent.offsetX || (e.nativeEvent.touches?.[0]?.clientX - rect.left)) * scaleX,
      y: (e.nativeEvent.offsetY || (e.nativeEvent.touches?.[0]?.clientY - rect.top)) * scaleY
    };
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getCoordinates(e);
    if (e.type === 'touchstart') e.preventDefault();
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    if (e.type === 'touchmove') e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getCoordinates(e);
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = penColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (isDrawing) saveCanvasState();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setGeneratedImage(null);
    backgroundImageRef.current = null;
    saveCanvasState();
  };

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL();
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, image]);
    setHistoryIndex(newHistory.length);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      restoreCanvasState(history[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      restoreCanvasState(history[newIndex]);
    }
  };

  const restoreCanvasState = (imageSrc) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new window.Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      if (imageSrc.startsWith('data:image/png;base64')) {
        setGeneratedImage(imageSrc);
      } else {
        setGeneratedImage(null);
      }
    };
    img.src = imageSrc;
  };

  return {
    canvasRef,
    isDrawing,
    penColor,
    setPenColor,
    colorInputRef,
    generatedImage,
    setGeneratedImage,
    history,
    setHistory,
    historyIndex,
    setHistoryIndex,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    undo,
    redo,
    getCoordinates
  };
} 