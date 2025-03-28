import { Trash2, Download, Eraser, Minus, Plus } from "lucide-react";
import Slider from "../components/ui/Slider";

interface ToolbarProps {
  undo: () => void;
  redo: () => void;
  historyIndex: number;
  history: string[]; // Changed from any[] to string[]
  openColorPicker: () => void;
  penColor: string;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  colorInputRef: React.RefObject<HTMLInputElement>;
  handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearCanvas: () => void;
  downloadCanvas: () => void;
  toggleEraser: () => void;
  isEraserActive?: boolean;
  brushSize: number;
  setBrushSize: (size: number) => void;
}

export default function Toolbar({ 
  undo, 
  redo, 
  historyIndex, 
  history, 
  openColorPicker, 
  penColor, 
  handleKeyDown, 
  colorInputRef, 
  handleColorChange, 
  clearCanvas, 
  downloadCanvas,
  toggleEraser,
  isEraserActive = false,
  brushSize,
  setBrushSize
}: ToolbarProps) {
  return (
    <menu className="flex items-center bg-gray-300 rounded-full p-2 shadow-sm self-start sm:self-auto">
      <button
        type="button"
        onClick={undo}
        disabled={historyIndex <= 0}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-[#c7c3c0] shadow-[4px_4px_6px_rgba(0,0,0,0.2),inset_1px_1px_1px_#ffffff,inset_-2px_-2px_4px_#c7c3c0] transition-all hover:scale-105 active:shadow-[0px_0px_0px_rgba(0,0,0,0.2),inset_0.5px_0.5px_2px_#000000,inset_-2px_-2px_4px_#c7c3c0] disabled:opacity-50 disabled:hover:scale-100 group relative"
        aria-label="Undo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#5f5f5f] transition-all active:scale-95" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7v6h6"/>
          <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
        </svg>
        <span className="absolute -bottom-8 text-xs font-medium bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Undo (Ctrl+Z)
        </span>
      </button>
      <button
        type="button"
        onClick={redo}
        disabled={historyIndex >= history.length - 1}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-[#c7c3c0] shadow-[4px_4px_6px_rgba(0,0,0,0.2),inset_1px_1px_1px_#ffffff,inset_-2px_-2px_4px_#c7c3c0] transition-all hover:scale-105 active:shadow-[0px_0px_0px_rgba(0,0,0,0.2),inset_0.5px_0.5px_2px_#000000,inset_-2px_-2px_4px_#c7c3c0] disabled:opacity-50 disabled:hover:scale-100 group relative ml-4"
        aria-label="Redo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#5f5f5f] transition-all active:scale-95" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 7v6h-6"/>
          <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/>
        </svg>
        <span className="absolute -bottom-8 text-xs font-medium bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Redo (Ctrl+Y)
        </span>
      </button>
      <div className="w-px h-8 bg-gray-400 mx-3"></div>
      
      <div className="flex items-center space-x-2 w-32 mx-2">
        <Slider
          min={1}
          max={20}
          step={1}
          value={[brushSize]}
          onValueChange={(value) => {
            setBrushSize(value[0]);
          }}
          className="w-full"
        />
        <span className="text-xs font-medium w-6 text-center">
          {brushSize}
        </span>
      </div>
      
      <div className="w-px h-8 bg-gray-400 mx-3"></div>
      
      <button 
        type="button"
        className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#c7c3c0] shadow-[4px_4px_6px_rgba(0,0,0,0.2),inset_1px_1px_1px_#ffffff,inset_-2px_-2px_4px_#c7c3c0] transition-all hover:scale-105 active:shadow-[0px_0px_0px_rgba(0,0,0,0.2),inset_0.5px_0.5px_2px_#000000,inset_-2px_-2px_4px_#c7c3c0] group relative ${isEraserActive ? '!bg-blue-200' : ''}`}
        onClick={toggleEraser}
        aria-label={isEraserActive ? "Switch to pen" : "Switch to eraser"}
        aria-pressed={isEraserActive}
      >
        <Eraser className="h-5 w-5 text-[#5f5f5f] transition-all active:scale-95" />
      </button>
      <button 
        type="button"
        className="w-10 h-10 rounded-full flex items-center justify-center bg-[#c7c3c0] shadow-[4px_4px_6px_rgba(0,0,0,0.2),inset_1px_1px_1px_#ffffff,inset_-2px_-2px_4px_#c7c3c0] transition-all hover:scale-105 active:shadow-[0px_0px_0px_rgba(0,0,0,0.2),inset_0.5px_0.5px_2px_#000000,inset_-2px_-2px_4px_#c7c3c0] group relative ml-4"
        onClick={openColorPicker}
        onKeyDown={handleKeyDown}
        aria-label="Open color picker"
        style={{ backgroundColor: penColor }}
      >
        <input
          ref={colorInputRef}
          type="color"
          value={penColor}
          onChange={handleColorChange}
          className="opacity-0 absolute w-px h-px"
          aria-label="Select pen color"
        />
      </button>
      <button
        type="button"
        onClick={clearCanvas}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-[#c7c3c0] shadow-[4px_4px_6px_rgba(0,0,0,0.2),inset_1px_1px_1px_#ffffff,inset_-2px_-2px_4px_#c7c3c0] transition-all hover:scale-105 active:shadow-[0px_0px_0px_rgba(0,0,0,0.2),inset_0.5px_0.5px_2px_#000000,inset_-2px_-2px_4px_#c7c3c0] group relative ml-4"
        aria-label="Clear Canvas"
      >
        <Trash2 className="h-5 w-5 text-[#5f5f5f] transition-all active:scale-95" />
      </button>
      <button
        type="button"
        onClick={downloadCanvas}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-[#c7c3c0] shadow-[4px_4px_6px_rgba(0,0,0,0.2),inset_1px_1px_1px_#ffffff,inset_-2px_-2px_4px_#c7c3c0] transition-all hover:scale-105 active:shadow-[0px_0px_0px_rgba(0,0,0,0.2),inset_0.5px_0.5px_2px_#000000,inset_-2px_-2px_4px_#c7c3c0] group relative ml-4"
        aria-label="Download Canvas"
      >
        <Download className="h-5 w-5 text-[#5f5f5f] transition-all active:scale-95" />
      </button>
    </menu>
  );
} 