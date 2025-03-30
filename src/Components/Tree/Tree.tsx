import { FC } from "react";
import { FileIcon, FolderIcon } from "lucide-react";
import { useBoolean } from "../../Utils/UseBoolean.ts";
import classes from "./Tree.module.css";
import clsx from "clsx";
import {
  ITreeApi,
  TreeContextProvider,
  useTreeContext,
} from "./TreeContext.tsx";
import { CreateTreeNode } from "./CreateTreeNode.tsx";
import { ITreeItem } from "./ITreeItem.tsx";
import { useAsync } from "../../Utils/UseAsync.ts";
import { RenameTreeNode } from "./RenameTreeNode.tsx";
import { DeleteTreeNode } from "./DeleteTreeNode.tsx";

interface INodeProps extends ITreeItem {
  editable?: boolean;
}

const Node: FC<INodeProps> = ({ children, name, id, editable = false }) => {
  const { toggle, value } = useBoolean(false);

  const { setSelectedId, checkIsIdSelected } = useTreeContext();

  const onClick = () => {
    toggle();
    setSelectedId(id);
  };

  const isSelected = checkIsIdSelected(id);

  const hasChildren = children.length > 0;

  return (
    <div className={classes.node}>
      <div
        onClick={onClick}
        className={clsx(classes.nodeHead, isSelected && classes.selected)}
      >
        {hasChildren ? <FolderIcon /> : <FileIcon />}
        {name}
        {isSelected ? <CreateTreeNode id={id} /> : null}
        {isSelected && editable ? <RenameTreeNode id={id} name={name} /> : null}
        {isSelected && editable ? <DeleteTreeNode id={id} /> : null}
      </div>
      {hasChildren && value ? (
        <div className={classes.nodeBody}>
          {children.map((child) => (
            <Node {...child} editable key={child.id} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const RootNode = () => {
  const { getRootNode } = useTreeContext();
  const { data, loading, error } = useAsync(getRootNode);

  if (error) {
    return error;
  }

  if (loading) {
    return "...";
  }

  return data ? <Node {...data} name={"Root"} /> : "No data";
};

const Tree: FC<ITreeApi> = ({
  createNode,
  getRootNode,
  renameNode,
  deleteNode,
}) => {
  return (
    <TreeContextProvider
      createNode={createNode}
      getRootNode={getRootNode}
      renameNode={renameNode}
      deleteNode={deleteNode}
    >
      <div className={classes.tree}>
        <RootNode />
      </div>
    </TreeContextProvider>
  );
};

export { Tree };
