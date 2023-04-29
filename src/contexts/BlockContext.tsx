import { Reducer, createContext, useContext, useReducer } from 'react';
import { ParentFlexPayload } from 'constants/flexProperties';

export enum Actions {
    STYLE,
    GAME_STATE,
    OBJECT_COUNT,
}

type ContextState = {
    state: {
        parent: ParentFlexPayload;
    };
    dispatch: React.Dispatch<{
        action: Actions;
        value: Partial<ParentFlexPayload>;
    }>;
};

const reducer: Reducer<
    ContextState['state'],
    Parameters<ContextState['dispatch']>[0]
> = (state, payload) => {
    switch (payload.action) {
        case Actions.STYLE: {
            return { ...state, ...payload.value };
        }
        default: {
            return state;
        }
    }
};

const BlockContext = createContext<null | ContextState>(null);

export const BlockContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = useReducer(reducer, {
        parent: {
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
    return (
        <BlockContext.Provider value={{ state, dispatch }}>
            {children}
        </BlockContext.Provider>
    );
};

export const useBlockContext = () => {
    const value = useContext(BlockContext);
    if (!value) throw 'Must use context within BlockContext Provider';
    return value;
};
