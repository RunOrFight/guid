import { HttpApi } from "../../Api/HttpApi.ts";
import { memo, useCallback } from "react";
import { Form } from "../Form/Form.tsx";
import classes from "./UserTree.module.css";
import { Field } from "../Field/Field.tsx";
import { Tree } from "../Tree/Tree.tsx";
import { Button } from "../Button/Button.tsx";
import { useUserTreeName } from "./UseUserTreeName.tsx";

interface IUserTreeApiProps {
  treeName: string;
}

const UserTreeApi = memo<IUserTreeApiProps>(({ treeName }) => {
  const getRootNode = useCallback(
    () => HttpApi.getUserTree(treeName),
    [treeName],
  );

  const createNode = useCallback(
    (parentNodeId: number, nodeName: string) =>
      HttpApi.createUserTreeNode(treeName, parentNodeId, nodeName),
    [treeName],
  );

  const renameNode = useCallback(
    (nodeId: number, newNodeName: string) =>
      HttpApi.renameUserTreeNode(treeName, nodeId, newNodeName),
    [treeName],
  );

  const deleteNode = useCallback(
    (nodeId: number) => HttpApi.deleteUserTreeNode(treeName, nodeId),
    [treeName],
  );

  return (
    <Tree
      key={treeName}
      getRootNode={getRootNode}
      createNode={createNode}
      renameNode={renameNode}
      deleteNode={deleteNode}
    />
  );
});

const UserTree = () => {
  const { treeName, onSubmit, inputRef } = useUserTreeName();
  
  return (
    <>
      <Form className={classes.showForm} onSubmit={onSubmit}>
        <Field label={"Tree Name"} id={"treeName"} inputRef={inputRef} />
        <Button type={"submit"} value={"Show"} />
      </Form>
      {treeName ? <UserTreeApi treeName={treeName} /> : null}
    </>
  );
};

export { UserTree };
