import Github from "./ui/Github";

interface HeaderProps {
  darkMode: boolean;
}

export default function Header({ darkMode }: HeaderProps) {
  return (
    <div>
      <h1 className={`text-2xl sm:text-3xl font-bold mb-0 leading-tight font-mega ${darkMode ? 'text-white' : 'text-black'}`}>
        Vibe Drawing
      </h1>
      <div className="flex items-center mt-2">
     <Github onClick={() => window.open('https://github.com/elliot-evno/draw-ai', '_blank')}/>
    </div>
    </div>
  );
} 