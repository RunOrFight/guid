import classes from "./Modal.module.css";
import {IModalContext, ModalContextProvider, useModalContext} from "./ModalContext.tsx";
import {FC, ReactNode} from "react";
import {XIcon} from "lucide-react";

interface IModalProps {
    renderContent: (props: IModalContext) => ReactNode;
    title?: string;
}

const ModalContent = ({renderContent, title}: IModalProps) => {
    const context = useModalContext();

    return <>
        <div className={classes.modalHead}>
            <div className={classes.headTitle}>{title}</div>
            <XIcon className={classes.headIcon} onClick={context.closeModal}/>
        </div>
        <div className={classes.modalBody}>
            {renderContent(context)}
        </div>
    </>;
}


const Modal: FC<IModalProps> = ({renderContent, title}) => {
    return <ModalContextProvider>
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <ModalContent renderContent={renderContent} title={title}/>
            </div>
        </div>
    </ModalContextProvider>
}

export {Modal}