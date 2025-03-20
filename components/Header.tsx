export default function Header() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-0 leading-tight font-mega">Vibe Drawing</h1>
   
    
      <p className="text-sm sm:text-base text-gray-500 mt-1">
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