import {Modal} from "../Modal/Modal.tsx";
import {IModalContext} from "../Modal/ModalContext.tsx";
import {PencilIcon} from "lucide-react";
import {useTreeContext} from "./TreeContext.tsx";
import {FC, useState} from "react";
import {ITreeItem} from "./ITreeItem.tsx";
import {withStopPropagation} from "../../Utils/WithStopPropagation.ts";

type TRenameTreeNodeFormProps = Pick<IModalContext, "closeModal"> & Pick<ITreeItem, "id" | "name">

const RenameTreeNodeForm = ({closeModal, id, name}: TRenameTreeNodeFormProps) => {
    const {renameNode, getRootNode} = useTreeContext()

    const [inputValue, setInputValue] = useState(name)

    const onSubmit = (e) => {
        renameNode(id, inputValue).then((getRootNode)).then(closeModal)
        e.preventDefault()
    }

    return <form onSubmit={onSubmit}>
        <label htmlFor={"newName"}>{"New Node Name"}</label>
        <input name={"newName"} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button type={"submit"}>{"Submit"}</button>
    </form>
}


const renderTrigger = ({openModal}: IModalContext) => <PencilIcon size={"14"} onClick={withStopPropagation(openModal)}/>

const RenameTreeNode: FC<Pick<ITreeItem, "id" | "name">> = ({id, name}) => {
    return <Modal renderTrigger={renderTrigger}>
        {({closeModal}: IModalContext) => <RenameTreeNodeForm closeModal={closeModal} id={id} name={name}/>}
    </Modal>
}

export {RenameTreeNode}