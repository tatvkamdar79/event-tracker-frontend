import { useState, useEffect } from "react";
import { useWindowDimensions, Platform } from "react-native";

const useScreenSize = () => {
  const { width } = useWindowDimensions();

  const getInitialSize = () => {
    if (Platform.OS === "web") {
      return window.innerWidth < 1100;
    }
    return true;
  };

  const [isMobile, setIsMobile] = useState(getInitialSize);

  useEffect(() => {
    setIsMobile(width < 1100);
  }, [width]);

  return isMobile;
};

export default useScreenSize;
