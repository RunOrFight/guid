import classes from "./Modal.module.css";
import {IModalContext, ModalContextProvider, useModalContext} from "./ModalContext.tsx";
import {FC, ReactNode} from "react";
import {XIcon} from "lucide-react";
import {createPortal} from "react-dom";
import {stopPropagation} from "../../Utils/WithStopPropagation.ts";

interface IModalProps {
    children: (props: IModalContext) => ReactNode;
    renderTrigger: (props: IModalContext) => ReactNode;
    title?: string;
}

const ModalContent = ({renderTrigger, children, title}: IModalProps) => {
    const context = useModalContext();

    return <>
        {renderTrigger(context)}
        {
            context.isModalOpened ? createPortal(
                <div className={classes.overlay} onClick={stopPropagation}>
                    <div className={classes.modal}>
                        <div className={classes.modalHead}>
                            <div className={classes.headTitle}>{title}</div>
                            <XIcon className={classes.headIcon} onClick={context.closeModal}/>
                        </div>
                        <div className={classes.modalBody}>
                            {children(context)}
                        </div>
                    </div>
                </div>,
                document.body
            ) : null
        }
    </>
}


const Modal: FC<IModalProps> = ({renderTrigger, children, title}) => {
    return <ModalContextProvider>
        <ModalContent renderTrigger={renderTrigger} title={title}>
            {children}
        </ModalContent>
    </ModalContextProvider>
}

export {Modal}