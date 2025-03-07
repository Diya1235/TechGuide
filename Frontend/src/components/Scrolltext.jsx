// ScrollText.jsx
import React, { useEffect, useState } from 'react';

const ScrollText = ({ imageSrc, title, description }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    // Adjust the threshold as needed for visibility
    setIsVisible(scrollY > 100); // Change 100 to the desired scroll position
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Determine if text should be visible
  const shouldShowText = isVisible || isHovered;

  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-between p-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <img src={imageSrc} alt={title} className="w-full h-auto rounded-lg" />
      </div>

      {/* Text Section */}
      <div
        className={`transition-opacity duration-500 ${
          shouldShowText ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ height: shouldShowText ? 'auto' : '0', overflow: 'hidden' }} // Control height for smooth transition
      >
        <h2 className="text-xl font-bold text-gray-900 mt-4 lg:mt-0 lg:ml-4">
          {title}
        </h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default ScrollText;
