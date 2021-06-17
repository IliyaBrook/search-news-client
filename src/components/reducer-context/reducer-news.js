import {Fragment, createContext, useReducer} from "react";

export const ContextNews = createContext(null)

const ReducerNewsContext = ({children}) => {

    const NEWS_ACTIONS = {
        SET_NEWS_DATA: 'SET_NEWS_DATA',
        SET_NEWS_INPUT_VALUE: 'SET_NEWS_INPUT_VALUE'
    }

    const newsReducer = (state, action) => {
        switch (action.type) {
            case NEWS_ACTIONS.SET_NEWS_DATA:
                return {...state, newsData: action.newsDataPayload}
            case NEWS_ACTIONS.SET_NEWS_INPUT_VALUE:
                return {...state, newsInputValue: action.newsInputValuePayload}
            default:
                return state
        }
    }
    const [newsDataState, newsDispatch] = useReducer(newsReducer, {
        newsData: [],
        newsInputValue: '',
    })


    return (
        <Fragment>
            <ContextNews.Provider value={{NEWS_ACTIONS, newsDataState, newsDispatch}}>
                {children}
            </ContextNews.Provider>
        </Fragment>
    )
}
export default ReducerNewsContext;