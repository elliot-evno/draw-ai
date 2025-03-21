import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";

interface InputFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  darkMode: boolean;
}

export default function InputForm({ 
  prompt, 
  setPrompt, 
  handleSubmit, 
  isLoading,
  darkMode 
}: InputFormProps) {
  useEffect(() => {
    console.log("Dark mode changed:", darkMode);
  }, [darkMode]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        <div className={`relative w-full h-16 opacity-90 overflow-hidden rounded-2xl z-10 ${
          darkMode ? 'bg-black' : 'bg-white'
        }`}>
          <div className={`absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-2xl inset-0.5 ${
            darkMode ? 'bg-black' : 'bg-white'
          }`}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Add your change..."
              className={`input focus:outline-none h-full opacity-90 w-full px-4 py-3 placeholder:text-xl rounded-2xl ${
                darkMode 
                  ? 'bg-black text-white placeholder:text-[#D3CCD4]' 
                  : 'bg-white text-black placeholder:text-gray-500'
              }`}
              required
            />
          </div>
          
          <div className={`absolute group-hover:-left-[5px] group-hover:-top-[170px] transition-all duration-300 ease-out w-56 h-48 blur-[20px] -left-[150px] -top-[150px] ${
            darkMode ? 'bg-[#e4a9dd]' : 'bg-pink-200'
          }`}></div>
          <div className={`absolute group-hover:-right-[5px] group-hover:-bottom-[170px] transition-all duration-300 ease-out w-56 h-48 blur-[20px] -right-[150px] -bottom-[150px] ${
            darkMode ? 'bg-[#ADA2E8]' : 'bg-indigo-200'
          }`}></div>
        </div>
        
        <div className={`absolute w-32 rotate-6 h-10 rounded-full blur-[8px] -left-0 top-1 ${
          darkMode ? 'bg-[#CE25A2]' : 'bg-pink-400'
        }`}></div>
        <div className={`absolute w-32 rotate-6 h-10 group-hover:w-44 transition-all duration-300 ease-out rounded-2xl blur-[10px] -right-0 bottom-1 ${
          darkMode ? 'bg-[#5241c9]' : 'bg-indigo-400'
        }`}></div>
        <div className={`absolute w-32 h-14 group-hover:h-6 group-hover:blur-[40px] group-hover:w-56 transition-all ease-out duration-300 rounded-full blur-[50px] -left-5 -top-1 ${
          darkMode ? 'bg-[#CE25A2]' : 'bg-pink-400'
        }`}></div>
        <div className={`absolute w-32 h-14 group-hover:h-6 group-hover:blur-[40px] group-hover:w-56 transition-all ease-out duration-300 rounded-full blur-[50px] -right-3 -bottom-2 ${
          darkMode ? 'bg-[#5241c9]' : 'bg-indigo-400'
        }`}></div>
      </div>
    </form>
  );
} 