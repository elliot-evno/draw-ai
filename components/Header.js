export default function Header() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-0 leading-tight font-mega">Gemini Co-Drawing</h1>
      <p className="text-sm sm:text-base text-gray-500 mt-1">
        Built with{" "}
        <a className="underline" href="https://ai.google.dev/gemini-api/docs/image-generation" target="_blank" rel="noopener noreferrer">
          Gemini 2.0 native image generation
        </a>
      </p>
      <p className="text-sm sm:text-base text-gray-500 mt-1">
        by{" "}
        <a className="underline" href="https://x.com/trudypainter" target="_blank" rel="noopener noreferrer">
          @trudypainter
        </a>
        {" "}and{" "}
        <a className="underline" href="https://x.com/alexanderchen" target="_blank" rel="noopener noreferrer">
          @alexanderchen
        </a>
      </p>
    </div>
  );
} 