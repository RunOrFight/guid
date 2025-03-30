import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { ITreeItem } from "./ITreeItem.tsx";

interface ITreeApi {
  getRootNode: () => Promise<ITreeItem>;
  createNode: (parentNodeId: number, nodeName: string) => Promise<boolean>;
  renameNode: (nodeId: number, newNodeName: string) => Promise<boolean>;
  deleteNode: (nodeId: number) => Promise<boolean>;
}

interface ITreeContext extends ITreeApi {
  setSelectedId: (id: number) => void;
  selectedId: number | null;
  checkIsIdSelected: (id: number) => boolean;
}

const TreeContext = createContext<ITreeContext | null>(null);

const TreeContextProvider: FC<PropsWithChildren<ITreeApi>> = ({
  children,
  createNode,
  getRootNode,
  renameNode,
  deleteNode,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const value: ITreeContext = {
    setSelectedId,
    selectedId,
    checkIsIdSelected: (id) => selectedId === id,
    createNode,
    getRootNode,
    renameNode,
    deleteNode,
  };

  return <TreeContext value={value}>{children}</TreeContext>;
};

const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error("useTreeContext must be used within TreeContextProvider");
  }

  return context;
};

export { TreeContext, TreeContextProvider, useTreeContext };

export type { ITreeApi };
