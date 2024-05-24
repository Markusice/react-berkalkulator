import React, { useEffect, useState } from "react";

const useLocalStorage = (key) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : null;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // for QuotaExceededError
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
