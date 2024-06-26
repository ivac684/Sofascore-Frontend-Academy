import { useEffect, useState } from 'react';

const useXSScreenSize = () => {
  
  const [isXSScreen, setIsXSScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsXSScreen(window.innerWidth <= 370);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []); 


  return isXSScreen;
};

export default useXSScreenSize;