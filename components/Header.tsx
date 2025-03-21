interface HeaderProps {
  darkMode: boolean;
}

export default function Header({ darkMode }: HeaderProps) {
  return (
    <div>
      <h1 className={`text-2xl sm:text-3xl font-bold mb-0 leading-tight font-mega ${darkMode ? 'text-white' : 'text-black'}`}>
        Vibe Drawing
      </h1>
      
      <p className={`text-sm sm:text-base mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        A fork of {" "}
        <a className="underline" href="https://huggingface.co/spaces/Trudy/gemini-codrawing" target="_blank" rel="noopener noreferrer">
        Gemini Co-Drawing
        </a>
       {/* <br />
      
        <a className="underline" href="https://github.com/elliot-evno/draw-ai" target="_blank" rel="noopener noreferrer">
        Github
        </a> */}
      </p>
    </div>
  );
} 