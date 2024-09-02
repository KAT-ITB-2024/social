import React, { useState, useEffect } from 'react';

interface LoadingTextProps {
  text: string;
  interval?: number;
}

const LoadingText = ({ text, interval = 100 }: LoadingTextProps) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, interval);
      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayText('');
        setCurrentIndex(0);
      }, interval);
      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex, interval, text]);

  return <h3 className="text-center text-blue-500">{displayText}</h3>;
};

export default LoadingText;
