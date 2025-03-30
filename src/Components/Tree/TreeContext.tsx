import {createContext, FC, PropsWithChildren, useContext, useState} from "react";

interface ITreeContext {
    setSelectedId: (id: number) => void
    selectedId: number | null;
    checkIsIdSelected: (id: number) => boolean;
}

const TreeContext = createContext<ITreeContext | null>(null);

const TreeContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [selectedId, setSelectedId] = useState<number | null>(null)

    const value: ITreeContext = {
        setSelectedId,
        selectedId,
        checkIsIdSelected: (id) => selectedId === id,
    }

    return <TreeContext value={value}>
        {children}
    </TreeContext>
}

const useTreeContext = () => {
    const context = useContext(TreeContext);
    if (!context) {
        throw new Error('useTreeContext must be used within TreeContextProvider')
    }

    return context;
}

export {
    TreeContext,
    TreeContextProvider,
    useTreeContext
}