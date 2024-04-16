import {useState} from "react";

export const useIncrement = () => {

  const [number, setNumber] = useState(1);

  const increment = () => {
    setNumber(number + 1);
  };

  return {number, increment};
}
