import { useState } from "react";
import Head from "next/head";
import Toolbar from "../components/Toolbar";
import Header from "../components/Header";
import InputForm from "../components/InputForm";
import { useCanvas } from "../hooks/useCanvas";
import { useKeyboardEvents } from "../hooks/useKeyboardEvents";
import { useTouchEvents } from "../hooks/useTouchEvents";
import { submitDrawing } from "../utils/api";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  
  const {
    canvasRef,
    isDrawing,
    penColor,
    setPenColor,
    colorInputRef,
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
    setGeneratedImage,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getCoordinates,
  } = useCanvas();

  useKeyboardEvents(undo, redo);
  useTouchEvents(canvasRef as React.RefObject<HTMLCanvasElement>, isDrawing);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPenColor(e.target.value);
  };

  const openColorPicker = () => {
    if (colorInputRef.current) {
      (colorInputRef.current as HTMLInputElement).click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      openColorPicker();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      e.preventDefault();
      undo();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
      e.preventDefault();
      redo();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!canvasRef.current) return;
    
    setIsLoading(true);
    
    try {
      const data = await submitDrawing(prompt, canvasRef.current);
      
      if (data.success && data.imageData) {
        console.log("Received image data:", data.imageData.length, "bytes");
        const imageUrl = `data:image/png;base64,${data.imageData}`;
        console.log("Generated image URL:", imageUrl);
        
        // Test if the image is valid
        const testImage = new Image();
        testImage.src = imageUrl;
        testImage.onload = () => {
          console.log("Image loaded successfully");
          setGeneratedImage(imageUrl);
          
          const newHistory = history.slice(0, historyIndex + 1);
          setHistory([...newHistory, imageUrl]);
          setHistoryIndex(newHistory.length);
        };
        testImage.onerror = (err) => {
          console.error("Failed to load image:", err);
          alert("Generated image is invalid. Please try again.");
        };
      } else {
        console.error("Failed to generate image:", data.error);
        alert("Failed to generate image. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting drawing:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <>
      <Head>
        <title>Gemini Co-Drawing</title>
        <meta name="description" content="Gemini Co-Drawing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen notebook-paper-bg text-gray-900 flex flex-col justify-start items-center">     
        <main className="container mx-auto px-3 sm:px-6 py-5 sm:py-10 pb-32 max-w-5xl w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-2 sm:mb-6 gap-2">
            <Header />
            <Toolbar 
              undo={undo}
              redo={redo}
              historyIndex={historyIndex}
              history={history}
              openColorPicker={openColorPicker}
              penColor={penColor}
              handleKeyDown={handleKeyDown}
              colorInputRef={colorInputRef as unknown as React.RefObject<HTMLInputElement>}
              handleColorChange={handleColorChange}
              clearCanvas={clearCanvas}
              downloadCanvas={downloadCanvas}
            />
          </div>
          
          <div className="w-full mb-6">
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
          </div>
          
          <InputForm 
            prompt={prompt}
            setPrompt={setPrompt}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </main>
      </div>
    </>
  );
}
