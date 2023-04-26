import { CSSProperties, Reducer, createContext, useContext, useReducer } from "react";

export enum Actions {
    FLEX_DIRECTION = 'flexDirection',
    JUSTIFY_CONTENT = 'justifyContent',
    ALIGN_ITEMS = 'alignItems'
}

type ContextState = {
    state: {
        flexDirection: CSSProperties["flexDirection"],
        justifyContent: CSSProperties["justifyContent"],
        alignItems: CSSProperties["alignItems"],
    },
    dispatch: React.Dispatch<{
        action: Actions;
        value: CSSProperties[Actions.FLEX_DIRECTION]
    }>
}

const reducer: Reducer<
    ContextState["state"],
    Parameters<ContextState["dispatch"]>[0]
> = (state, payload) => {
    switch (payload.action) {
        case Actions.FLEX_DIRECTION: {
            return {
                ...state,
                flexDirection: payload.value
            }
        }
        case Actions.ALIGN_ITEMS: {
            return {
                ...state,
                alignItems: payload.value
            }
        }
        case Actions.JUSTIFY_CONTENT: {
            return {
                ...state,
                justifyContent: payload.value
            }
        }
        default: {
            return state
        }
    }
}

const BlockContext = createContext<null | ContextState>(null)

export const BlockContextProvider = (
    {children}: {children: React.ReactNode}
) => {
    const [state, dispatch] = useReducer(reducer, {
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start"
    })
    return (
        <BlockContext.Provider value={{state, dispatch}}>
            {children}
        </BlockContext.Provider>
    )
}

export const useBlockContext = () => {
    const value = useContext(BlockContext);
    if (!value) throw 'Must use context within BlockContext Provider'
    return value
}