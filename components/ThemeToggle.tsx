import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  className?: string;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export default function ThemeToggle({ className = '', darkMode, setDarkMode }: ThemeToggleProps) {
  useEffect(() => {
    // Check if user has a preference saved
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, [setDarkMode]);

  const toggleTheme = () => {
    if (darkMode) {
      // Switch to light mode
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      // Switch to dark mode
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  // Custom CSS for the toggle with inverted colors and smaller size
  const toggleStyle = {
    '--toggle-size': '12px',
    fontSize: 'var(--toggle-size)',
    width: '5em',
    height: '2.5em',
    backgroundImage: 'linear-gradient(to right, #2a2a2a 50%, #efefef 50%)',
    backgroundSize: '205%',
    backgroundPosition: darkMode ? '100%' : '0',
    transition: '0.4s',
  } as React.CSSProperties;

  const knobStyle = {
    width: '1.8em',
    height: '1.8em',
    position: 'absolute',
    top: '0.35em',
    left: darkMode ? 'calc(100% - 1.8em - 0.35em)' : '0.35em',
    backgroundImage: 'linear-gradient(to right, #2a2a2a 50%, #efefef 50%)',
    backgroundSize: '205%',
    backgroundPosition: darkMode ? '0' : '100%',
    borderRadius: '50%',
    transition: '0.4s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties;

  // Emoji styling
  const emojiStyle = {
    fontSize: '1.2em',
    lineHeight: 1,
    position: 'relative',
    top: '-0.05em', // Small adjustment to vertically center the emoji
  };

  return (
    <div className={`${className}`}>
      <label className="relative inline-block">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={toggleTheme}
          className="sr-only"
        />
        <div 
          className="rounded-full relative cursor-pointer"
          style={toggleStyle}
        >
          {/* The knob with emoji */}
          <div style={knobStyle}>
            {/* Use emoji instead of SVG */}
            <span style={emojiStyle}>
              {darkMode ? '🌝' : '🌞'}
            </span>
          </div>
        </div>
      </label>
    </div>
  );
}

