import {HttpApi} from "../../Api/HttpApi.ts";
import {Tree} from "../Tree/Tree.tsx";

const TREE_ID = "d380ed42-75e7-4116-8b84-300937cc3260"

const getRootNode = () => HttpApi.getUserTree(TREE_ID)

const createNode = (parentNodeId: number, nodeName: string) =>
    HttpApi.createUserTreeNode(TREE_ID, parentNodeId, nodeName)

const renameNode = (nodeId: number, newNodeName: string) =>
    HttpApi.renameUserTreeNode(TREE_ID, nodeId, newNodeName)

const UserTree = () => <Tree getRootNode={getRootNode} createNode={createNode} renameNode={renameNode}/>

export {UserTree}