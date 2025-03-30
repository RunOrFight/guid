import {FC} from "react";
import {FileIcon, FolderIcon, PencilIcon, TrashIcon} from "lucide-react";
import {useBoolean} from "../../Utils/UseBoolean.ts";
import classes from "./Tree.module.css";
import clsx from "clsx";
import {ITreeApi, TreeContextProvider, useTreeContext} from "./TreeContext.tsx";
import {CreateTreeNode} from "./CreateTreeNode.tsx";
import {ITreeItem} from "./ITreeItem.tsx";
import {useAsync} from "../../Utils/UseAsync.ts";

const Node: FC<ITreeItem> = ({children, name, id}) => {
    const {toggle, value} = useBoolean(false)

    const {setSelectedId, checkIsIdSelected} = useTreeContext()

    const onClick = () => {
        toggle()
        setSelectedId(id)
    }

    const isSelected = checkIsIdSelected(id)

    return <div className={classes.node}>
        <div onClick={onClick} className={clsx(classes.nodeHead, isSelected && classes.selected)}>
            {children.length > 0 ? <FolderIcon/> : <FileIcon/>}
            {name}
            {isSelected ? <CreateTreeNode id={id}/> : null}
            {isSelected ? <PencilIcon size={"14"}/> : null}
            {isSelected ? <TrashIcon size={"14"}/> : null}
        </div>
        {
            value ?
                <div className={classes.nodeBody}>
                    {children.map((child) => <Node {...child} key={child.id}/>)}
                </div> : null
        }
    </div>
}

const RootNode = () => {
    const {getRootNode} = useTreeContext()
    const {data, loading, error} = useAsync(getRootNode);

    if (error) {
        return error
    }

    if (loading) {
        return "..."
    }

    return data ? <Node {...data} name={"Root"}/> : "No data"
}

const Tree: FC<ITreeApi> = ({createNode, getRootNode}) => {
    return <TreeContextProvider createNode={createNode} getRootNode={getRootNode}>
        <div className={classes.tree}>
            <RootNode/>
        </div>
    </TreeContextProvider>
}

export {Tree}
