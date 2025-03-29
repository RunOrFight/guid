import {FC, PropsWithChildren, useEffect, useState} from "react";
import {FileIcon, FolderIcon} from "lucide-react";
import {useBoolean} from "../../Utils/UseBoolean.ts";
import classes from "./Tree.module.css";
import clsx from "clsx";
import {TreeContextProvider, useTreeContext} from "./TreeContext.tsx";

const TREE_ID = "{C9232B85-AD10-459C-A44F-70CA30C60E5F}"

const BASE_URL = "https://test.vmarmysh.com";

interface IWithName {
    name: string;
}

interface IWithId {
    id: string;
}

const File: FC<PropsWithChildren & IWithId> = ({children, id}) => {
    const {setSelectedId, checkIsIdSelected} = useTreeContext()

    const onClick = () => {
        setSelectedId(id)
    }

    return <span className={clsx(classes.nodeHead, checkIsIdSelected(id) && classes.selected)} onClick={onClick}>
        <FileIcon/>
        {children}
    </span>
}

const Folder: FC<PropsWithChildren & IWithId & IWithName> = ({children, name, id}) => {
    const {toggle, value} = useBoolean(false)

    const {setSelectedId, checkIsIdSelected} = useTreeContext()

    const onClick = () => {
        toggle()
        setSelectedId(id)
    }

    return <div className={classes.node}>
        <div onClick={onClick} className={clsx(classes.nodeHead, checkIsIdSelected(id) && classes.selected)}>
            <FolderIcon/>
            {name}
        </div>
        {value ? <div className={classes.nodeBody}>
            {children}
        </div> : null}

    </div>
}

interface ITreeItem extends IWithName, IWithId {
    children: ITreeItem[];
}

interface ITreeProps {
    item: ITreeItem
}

const Node: FC<ITreeProps> = ({item}) => {
    if (item.children && item.children.length > 0) {
        return <Folder name={item.name} id={item.id}>
            {item.children.map((child) => <Node item={child} key={child.id}/>)}
        </Folder>
    }

    return <File id={item.id}>{item.name}</File>

}

interface ITreeProps {
    rootItem: ITreeItem
}

const Tree: FC<ITreeProps> = ({rootItem}) => {
    return <TreeContextProvider>
        <div className={classes.tree}>
            <Node item={rootItem}/>
        </div>
    </TreeContextProvider>
}

const EditableTree = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const url = new URL("api.user.tree.get", BASE_URL);

        url.searchParams.append("treeName", TREE_ID)

        fetch(url).then(async (r) => {
            setData((await r.json()))
        })
    }, []);

    return data ? <Tree rootItem={data}/> : null;
}

export {EditableTree}
