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

  // Custom CSS for the toggle with inverted colors
  const toggleStyle = {
    '--toggle-size': '16px',
    fontSize: 'var(--toggle-size)',
    width: '6.25em',
    height: '3.125em',
    // Inverted the gradient colors - dark on left, light on right
    backgroundImage: 'linear-gradient(to right, #2a2a2a 50%, #efefef 50%)',
    backgroundSize: '205%',
    // Also inverted the position logic
    backgroundPosition: darkMode ? '100%' : '0',
    transition: '0.4s',
  } as React.CSSProperties;

  const knobStyle = {
    content: '""',
    width: '2.25em',
    height: '2.25em', 
    position: 'absolute',
    top: '0.438em',
    left: darkMode ? 'calc(100% - 2.25em - 0.438em)' : '0.438em',
    // Inverted the gradient colors for the knob as well
    backgroundImage: 'linear-gradient(to right, #2a2a2a 50%, #efefef 50%)',
    backgroundSize: '205%',
    // Inverted the position logic for the knob
    backgroundPosition: darkMode ? '0' : '100%',
    borderRadius: '50%',
    transition: '0.4s',
  } as React.CSSProperties;

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
          <div 
            style={knobStyle}
          ></div>
        </div>
      </label>
    </div>
  );
} 