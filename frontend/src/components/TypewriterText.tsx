import { useEffect, useRef, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export const TypewriterText = ({ text, speed = 20, className }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState(text);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    if (!text) {
      setDisplayedText('');
      return;
    }

    let currentIndex = 0;
    const charactersPerStep = 1;

    const revealNextChunk = () => {
      currentIndex = Math.min(text.length, currentIndex + charactersPerStep);
      setDisplayedText(text.slice(0, currentIndex));

      if (currentIndex < text.length) {
        timeoutRef.current = window.setTimeout(revealNextChunk, speed);
      }
    };

    setDisplayedText('');
    timeoutRef.current = window.setTimeout(revealNextChunk, speed);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed]);

  return (
    <p className={className} aria-live="polite">
      {displayedText}
    </p>
  );
};


