import React, {useEffect, useState} from "react";

import NavigateFab from "../../../components/atoms/iconButtons/NavigateFab";

const NavigateFabContainer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 150) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {
        isVisible && <NavigateFab onClick={scrollToTop}/>
      }
    </>
  );
};

export default NavigateFabContainer;
