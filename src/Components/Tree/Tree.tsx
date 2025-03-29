import {FC, PropsWithChildren} from "react";
import {FileIcon, FolderIcon} from "lucide-react";
import {useBoolean} from "../../Utils/UseBoolean.ts";
import classes from "./Tree.module.css";
import clsx from "clsx";
import {TreeContextProvider, useTreeContext} from "./TreeContext.tsx";
import {useHttpApi} from "../../Api/UseHttpApi.ts";
import {HttpApi} from "../../Api/HttpApi.ts";

const TREE_ID = "{C9232B85-AD10-459C-A44F-70CA30C60E5F}"

interface IWithName {
    name: string;
}

interface IWithId {
    id: number;
}

const Leaf: FC<PropsWithChildren & IWithId> = ({children, id}) => {
    const {setSelectedId, checkIsIdSelected} = useTreeContext()

    const onClick = () => {
        setSelectedId(id)
    }

    return <span className={clsx(classes.nodeHead, checkIsIdSelected(id) && classes.selected)} onClick={onClick}>
        <FileIcon/>
        {children}
    </span>
}

const NodeWithChildren: FC<PropsWithChildren & IWithId & IWithName> = ({children, name, id}) => {
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


const Node: FC<ITreeItem> = (item) => {
    if (item.children && item.children.length > 0) {
        return <NodeWithChildren name={item.name} id={item.id}>
            {item.children.map((child) => <Node {...child} key={child.id}/>)}
        </NodeWithChildren>
    }

    return <Leaf id={item.id}>{item.name}</Leaf>

}

interface ITreeProps {
    rootItem: ITreeItem
}

const Tree: FC<ITreeProps> = ({rootItem}) => {
    return <TreeContextProvider>
        <div className={classes.tree}>
            <Node {...rootItem} name={"Root"}/>
        </div>
    </TreeContextProvider>
}

const EditableTree = () => {
    const {data, loading, error} = useHttpApi(HttpApi.getUserTree, TREE_ID);

    return data ? <Tree rootItem={data}/> : null;
}

export {EditableTree}
