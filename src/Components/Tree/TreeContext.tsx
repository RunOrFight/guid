import {createContext, FC, PropsWithChildren, useContext, useState} from "react";

interface ITreeContext {
    setSelectedId: (id: string) => void
    selectedId: string | null;
    checkIsIdSelected: (id: string) => boolean;
}

const TreeContext = createContext<ITreeContext | null>(null);

const TreeContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const value: ITreeContext = {
        setSelectedId,
        selectedId,
        checkIsIdSelected: (id) => selectedId === id
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