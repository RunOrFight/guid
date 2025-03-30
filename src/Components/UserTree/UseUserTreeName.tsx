import { useLayoutEffect, useRef, useState } from "react";
import { ClientStorageApi } from "../../Api/ClientStorageApi.ts";

const useUserTreeName = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [treeName, setTreeName] = useState<string | null>(null);

  const onSubmit = () => {
    const value = inputRef.current?.value ?? null;
    setTreeName(value);
    ClientStorageApi.saveRecord("treeName", value);
  };

  useLayoutEffect(() => {
    const treeName = ClientStorageApi.getRecord("treeName");
    if (!treeName) {
      return;
    }
    setTreeName(treeName);

    if (inputRef.current) {
      inputRef.current.value = treeName;
    }
  }, []);

  return { inputRef, onSubmit, treeName };
};

export { useUserTreeName };
