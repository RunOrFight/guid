import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ITreeItem } from "./ITreeItem.tsx";
import { useAsync } from "../../Utils/UseAsync.ts";

interface ITreeApi {
  getRootNode: () => Promise<ITreeItem>;
  createNode: (parentNodeId: number, nodeName: string) => Promise<boolean>;
  renameNode: (nodeId: number, newNodeName: string) => Promise<boolean>;
  deleteNode: (nodeId: number) => Promise<boolean>;
}

interface ITreeContext extends Omit<ITreeApi, "getRootNode"> {
  setSelectedId: (id: number) => void;
  selectedId: number | null;
  checkIsIdSelected: (id: number) => boolean;
  rootNode: ITreeItem | null;
  treeIsLoading: boolean;
  treeError: string | null;
  refreshTree: () => void;
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
  const { data, loading, error, trigger } = useAsync(getRootNode);

  useEffect(() => {
    trigger();
  }, [trigger]);

  const value: ITreeContext = {
    setSelectedId,
    selectedId,
    checkIsIdSelected: (id) => selectedId === id,
    createNode,
    renameNode,
    deleteNode,
    refreshTree: trigger,
    treeIsLoading: loading,
    treeError: error,
    rootNode: data,
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
