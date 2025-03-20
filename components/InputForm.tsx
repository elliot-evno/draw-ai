import { SendHorizontal, LoaderCircle } from "lucide-react";

interface InputFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export default function InputForm({ 
  prompt, 
  setPrompt, 
  handleSubmit, 
  isLoading 
}: InputFormProps) {
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Add your change..."
          className="w-full p-3 sm:p-4 pr-12 sm:pr-14 text-sm sm:text-base border-2 border-black bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all font-mono"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-none bg-black text-white hover:cursor-pointer hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <LoaderCircle className="w-5 sm:w-6 h-5 sm:h-6 animate-spin" aria-label="Loading" />
          ) : (
            <SendHorizontal className="w-5 sm:w-6 h-5 sm:h-6" aria-label="Submit" />
          )}
        </button>
      </div>
    </form>
  );
} 