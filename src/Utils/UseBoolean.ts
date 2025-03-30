import { useCallback, useState } from "react";

const useBoolean = (initialValue: boolean | undefined = false) => {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((v) => !v), []);

  return {
    value,
    setTrue,
    setFalse,
    toggle,
  };
};

export { useBoolean };
