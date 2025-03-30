import { FC, memo, useCallback } from "react";
import { FileIcon, FolderIcon } from "lucide-react";
import { useBoolean } from "../../Utils/UseBoolean.ts";
import classes from "./Tree.module.css";
import clsx from "clsx";
import {
  ITreeApi,
  TreeContextProvider,
  useTreeContext,
} from "./TreeContext.tsx";
import { CreateTreeNode } from "./Actions/CreateTreeNode.tsx";
import { ITreeItem } from "./ITreeItem.tsx";
import { RenameTreeNode } from "./Actions/RenameTreeNode.tsx";
import { DeleteTreeNode } from "./Actions/DeleteTreeNode.tsx";
import { Error } from "../Error/Error.tsx";

interface INodeProps extends ITreeItem {
  editable?: boolean;
}

interface INodeContentProps extends INodeProps {
  onClick: () => void;
  isSelected: boolean;
  opened: boolean;
}

const NodeContent = memo<INodeContentProps>(
  ({ onClick, isSelected, editable, id, name, opened, children }) => {
    const hasChildren = children.length > 0;

    return (
      <div className={classes.node}>
        <div
          onClick={onClick}
          className={clsx(classes.nodeHead, isSelected && classes.selected)}
        >
          {hasChildren ? (
            <FolderIcon color={"orange"} />
          ) : (
            <FileIcon color={"blue"} />
          )}
          {name}
          {isSelected ? <CreateTreeNode id={id} /> : null}
          {isSelected && editable ? (
            <RenameTreeNode id={id} name={name} />
          ) : null}
          {isSelected && editable ? (
            <DeleteTreeNode id={id} name={name} />
          ) : null}
        </div>
        {hasChildren && opened ? (
          <div className={classes.nodeBody}>
            {children.map((child) => (
              <Node {...child} editable key={child.id} />
            ))}
          </div>
        ) : null}
      </div>
    );
  },
);

const Node = memo<INodeProps>(({ children, name, id, editable = false }) => {
  const { toggle, value } = useBoolean(false);

  const { setSelectedId, checkIsIdSelected } = useTreeContext();

  const onClick = useCallback(() => {
    toggle();
    setSelectedId(id);
  }, [toggle, id, setSelectedId]);

  const isSelected = checkIsIdSelected(id);

  return (
    <NodeContent
      onClick={onClick}
      isSelected={isSelected}
      children={children}
      id={id}
      name={name}
      opened={value}
      editable={editable}
    />
  );
});

const RootNode = memo(() => {
  const { rootNode, treeIsLoading, treeError } = useTreeContext();

  if (treeError) {
    return (
      <div className={classes.node}>
        <Error>{treeError}</Error>
      </div>
    );
  }

  if (treeIsLoading || !rootNode) {
    return <div className={classes.node}>{"..."}</div>;
  }

  return <Node {...rootNode} name={"Root"} />;
});

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
