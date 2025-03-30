import { HttpApi } from "../../Api/HttpApi.ts";
import { Tree } from "../Tree/Tree.tsx";

const TREE_ID = "d380ed42-75e7-4116-8b84-300937cc3260";

const getRootNode = HttpApi.getUserTree.bind(null, TREE_ID);

const createNode = HttpApi.createUserTreeNode.bind(null, TREE_ID);

const renameNode = HttpApi.renameUserTreeNode.bind(null, TREE_ID);

const deleteNode = HttpApi.deleteUserTreeNode.bind(null, TREE_ID);

const UserTree = () => (
  <Tree
    getRootNode={getRootNode}
    createNode={createNode}
    renameNode={renameNode}
    deleteNode={deleteNode}
  />
);

export { UserTree };
