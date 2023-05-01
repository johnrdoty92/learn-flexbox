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
    objectCount: number;
  };
  dispatch: React.Dispatch<
    | {
        action: Actions.STYLE;
        value: Partial<ParentFlexPayload>;
      }
    | { action: Actions.OBJECT_COUNT; value: number }
  >;
};

const reducer: Reducer<
  ContextState['state'],
  Parameters<ContextState['dispatch']>[0]
> = (state, payload) => {
  switch (payload.action) {
    case Actions.STYLE: {
      return {
        ...state,
        parent: {
          ...state.parent,
          ...payload.value,
        },
      };
    }
    case Actions.OBJECT_COUNT: {
      const MAX = 10;
      const MIN = 0;
      const newObjectCount = Math.max(state.objectCount + payload.value, MIN);
      return {
        ...state,
        objectCount: Math.min(newObjectCount, MAX),
      };
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
    objectCount: 3,
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
