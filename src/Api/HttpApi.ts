const BASE_URL = "https://test.vmarmysh.com";

const getUserTreeUrl = new URL("api.user.tree.get", BASE_URL);

const createUserTreeNodeUrl = new URL("api.user.tree.node.create", BASE_URL);

const renameUserTreeNodeUrl = new URL("api.user.tree.node.rename", BASE_URL);

const deleteUserTreeNodeUrl = new URL("api.user.tree.node.delete", BASE_URL);

interface IGetUserTreeResponse {
  id: number;
  name: string;
  children: IGetUserTreeResponse[];
}

const transformResponse = (res: Response) => {
  if (res.ok) {
    return "Ok";
  }
  return res
    .json()
    .then((json) => Promise.reject(json?.data?.message ?? "Something wrong"));
};

const HttpApi = {
  getUserTree: async (treeName: string): Promise<IGetUserTreeResponse> => {
    getUserTreeUrl.searchParams.set("treeName", treeName);

    return fetch(getUserTreeUrl, {
      method: "GET",
    }).then((res) => res.json());
  },
  createUserTreeNode: async (
    treeName: string,
    parentNodeId: number,
    nodeName: string,
  ): Promise<string> => {
    createUserTreeNodeUrl.searchParams.set("treeName", treeName);
    createUserTreeNodeUrl.searchParams.set(
      "parentNodeId",
      parentNodeId.toString(),
    );
    createUserTreeNodeUrl.searchParams.set("nodeName", nodeName);

    return fetch(createUserTreeNodeUrl, {
      method: "POST",
    }).then(transformResponse);
  },
  renameUserTreeNode: async (
    treeName: string,
    nodeId: number,
    newNodeName: string,
  ): Promise<string> => {
    renameUserTreeNodeUrl.searchParams.set("treeName", treeName);
    renameUserTreeNodeUrl.searchParams.set("nodeId", nodeId.toString());
    renameUserTreeNodeUrl.searchParams.set("newNodeName", newNodeName);

    return fetch(renameUserTreeNodeUrl, {
      method: "POST",
    }).then(transformResponse);
  },
  deleteUserTreeNode: async (
    treeName: string,
    nodeId: number,
  ): Promise<string> => {
    deleteUserTreeNodeUrl.searchParams.set("treeName", treeName);
    deleteUserTreeNodeUrl.searchParams.set("nodeId", nodeId.toString());

    return fetch(deleteUserTreeNodeUrl, {
      method: "POST",
    }).then(transformResponse);
  },
};

export { HttpApi };
