import { HttpApi } from "../../Api/HttpApi.ts";
import { Tree } from "../Tree/Tree.tsx";
import { toPlainComponent } from "../../Utils/ToPlainComponent.ts";

const TREE_ID = "{C9232B85-AD10-459C-A44F-70CA30C60E5F}";

const getRootNode = HttpApi.getUserTree.bind(null, TREE_ID);

const createNode = HttpApi.createUserTreeNode.bind(null, TREE_ID);

const renameNode = HttpApi.renameUserTreeNode.bind(null, TREE_ID);

const deleteNode = HttpApi.deleteUserTreeNode.bind(null, TREE_ID);

const UserTree = toPlainComponent(Tree, {
  createNode,
  renameNode,
  deleteNode,
  getRootNode,
});

export { UserTree };
