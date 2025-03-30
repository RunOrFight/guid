const BASE_URL = "https://test.vmarmysh.com";

const getUserTreeUrl = new URL("api.user.tree.get", BASE_URL);

const createUserTreeNodeUrl = new URL("api.user.tree.node.create", BASE_URL);

interface IGetUserTreeResponse {
    "id": number,
    "name": string,
    "children": IGetUserTreeResponse[]
}

const HttpApi = {
    getUserTree: async (treeName: string): Promise<IGetUserTreeResponse> => {
        getUserTreeUrl.searchParams.set("treeName", treeName);

        return fetch(getUserTreeUrl, {
            method: "GET",

        }).then(res => res.json());
    },
    createUserTreeNode: async (treeName: string, parentNodeId: number, nodeName: string): Promise<boolean> => {
        createUserTreeNodeUrl.searchParams.set("treeName", treeName);
        createUserTreeNodeUrl.searchParams.set("parentNodeId", parentNodeId.toString());
        createUserTreeNodeUrl.searchParams.set("nodeName", nodeName);

        return fetch(createUserTreeNodeUrl, {
            method: "POST",
        }).then(res => res.ok);
    }
}

export {HttpApi}