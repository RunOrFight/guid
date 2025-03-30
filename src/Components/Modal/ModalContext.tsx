import {createContext, FC, PropsWithChildren, useContext} from "react";
import {useBoolean} from "../../Utils/UseBoolean.ts";

interface IModalContext {
    openModal: () => void;
    isModalOpened: boolean
    closeModal: () => void;
}

const ModalContext = createContext<IModalContext | null>(null);

const useModalContext = () => {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error('useModalContext must be used within ModalContextProvider')
    }

    return context;
}

const ModalContextProvider: FC<PropsWithChildren> = ({children}) => {
    const {value: isModalOpened, setTrue, setFalse} = useBoolean(false)

    const value = {
        isModalOpened,
        openModal: setTrue,
        closeModal: setFalse
    }

    return <ModalContext value={value}>
        {isModalOpened ? children : null}
    </ModalContext>
}

export {ModalContextProvider, useModalContext}
export type {IModalContext}
