import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
  // State to store our value
  const [value, setValue] = useState(initialValue);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        const storedValue = item ? JSON.parse(item) : initialValue;
        setValue(storedValue);
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        setValue(initialValue);
      }
    }
  }, [hasMounted, key, initialValue]);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setStoredValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(value) : value;
      // Save state
      setValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [value, setStoredValue];
}
