
// context provider

import React, { createContext, useReducer } from 'react';

const initialState = {
    players: [],
    teams: 2,
}

export const SET_PLAYERS = 'SET_PLAYERS';
export const SET_TEAMS = 'SET_TEAMS';

const reducer = (state: typeof initialState, action: any) => {
    switch (action.type) {
        case SET_PLAYERS:
            return { ...state, players: action.payload }
        case SET_TEAMS:
            return { ...state, teams: action.payload }
        default:
            return state;
    }
}

export const Context = createContext<{ state: typeof initialState, dispatch: React.Dispatch<any> }>({
    state: initialState,
    dispatch: () => { }
});


export default function Provider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}

export function useStore() {
    return React.useContext(Context);
}

