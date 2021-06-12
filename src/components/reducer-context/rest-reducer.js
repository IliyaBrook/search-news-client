import React, {createContext, useEffect, useReducer} from "react";

export const RestContext = createContext()

const ReducerRestContext = ( { children } ) => {

    const useOutSide = (ref, retFuncIfOutSideClick,...funcArgs) => {
        useEffect(() => {
            const windowEvent = (event) => {
                if(ref.current && !ref.current.contains(event.target)){
                    retFuncIfOutSideClick(...funcArgs)
                }
            }
                window.addEventListener('click',windowEvent)
            return () => window.removeEventListener('click',windowEvent)
        },[funcArgs, ref, retFuncIfOutSideClick])
    }


    const ACTIONS_NAVBAR = {
        NAVBAR_COLLAPSE:'NAVBAR_COLLAPSE',
        NAVBAR_SHOW:'NAVBAR_SHOW',
        NAVBAR_TOGGLE:'NAVBAR_TOGGLE'
    }
    const navBarReducer = ( state , action ) => {
        switch (action.type) {
            case ACTIONS_NAVBAR.NAVBAR_COLLAPSE:
                return {collapse: false}
            case ACTIONS_NAVBAR.NAVBAR_SHOW:
                return {collapse: true}
            case ACTIONS_NAVBAR.NAVBAR_TOGGLE:
                return {collapse:!state.collapse}
            default:
                return state
        }
    }
    const [ navCollapseState , navCollapseDispatch ] = useReducer(navBarReducer, {collapse:false})

    return (
        <RestContext.Provider value={{ navCollapseState , navCollapseDispatch , ACTIONS_NAVBAR , useOutSide }}>
            { children }
        </RestContext.Provider>
    )
}
export default ReducerRestContext