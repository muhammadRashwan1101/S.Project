import { useState, useEffect } from 'react';

const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1280
};

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width: windowSize.width,
    height: windowSize.height,
    isMobile: windowSize.width <= breakpoints.mobile,
    isTablet: windowSize.width > breakpoints.mobile && windowSize.width <= breakpoints.tablet,
    isDesktop: windowSize.width > breakpoints.tablet && windowSize.width <= breakpoints.desktop,
    isWide: windowSize.width > breakpoints.desktop
  };
};
