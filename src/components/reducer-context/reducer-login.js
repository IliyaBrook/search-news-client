import React, {Fragment, useContext, useEffect, useReducer} from "react";
import {ContextReducerFbLogin} from "./reducer-facebook-login";
import './reducers.scss'


export const ContextReducerLogIn = React.createContext(null)

const LOGIN_ACTIONS = {
    FORM_SUBMITTED_STATE: 'FORM_SUBMITTED_STATE',
    SET_USERNAME: 'SET_USERNAME',
    SET_PASSWORD: 'SET_PASSWORD',
    SET_USER_DATA: 'SET_USER_DATA',
    SET_TOKEN: 'SET_TOKEN',
    SET_LOGOUT: 'SET_LOGOUT'
}


const ReducerLogin = ({children}) => {
    const {fbLoginState} = useContext(ContextReducerFbLogin)
    const fbToken = localStorage.getItem('fblst_1206500839845709')
    const backendDbToken = localStorage.getItem('token')
    useEffect( () => {
        if (!fbToken && backendDbToken) {
            const server_response =  fetch('https://search-news-server.herokuapp.com/token', {
                mode:'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${backendDbToken}`
                    }
                }
            ).then(res => {
                if (res.status === 200) return res.json()
            })
            logInStateDispatch({
                type: LOGIN_ACTIONS.SET_USER_DATA, updateUserData: {
                    user_name: server_response?.user_name,
                    name: localStorage.getItem('name'),
                    email: server_response?.email,
                    loggedIn: true,
                    user_id: server_response?.user_id,
                    token: localStorage.getItem('token')
                }
            })
            logInStateDispatch({type: LOGIN_ACTIONS.SET_TOKEN, token: backendDbToken})
            !localStorage.getItem('token') && logInStateDispatch({
                type: LOGIN_ACTIONS.SET_USER_DATA, updateUserData: {
                    userData: {
                        loggedIn: false
                    }
                }
            })
        }
    }, [backendDbToken, fbToken])


    const loginReducer = (state, action) => {
        switch (action.type) {
            case LOGIN_ACTIONS.FORM_SUBMITTED_STATE:
                return {...state, formSubmitted: action.state}
            case LOGIN_ACTIONS.SET_USERNAME:
                return {...state, formData: action.formUpdate}
            case LOGIN_ACTIONS.SET_PASSWORD:
                return {...state, formData: action.formUpdate}
            case LOGIN_ACTIONS.SET_USER_DATA:
                return {...state, userData: action.updateUserData}
            case LOGIN_ACTIONS.SET_TOKEN:
                return {...state, token: action.token}
            case LOGIN_ACTIONS.SET_LOGOUT:
                if (localStorage.getItem('token')){
                    localStorage.removeItem('token')
                    localStorage.removeItem('name')
                }
                return {
                    formData: {user_name: "", user_password: ""},
                    formSubmitted: false,
                    userData: {
                        email: "",
                        loggedIn: false,
                        name: "",
                        token: "",
                        user_id: "",
                        user_name: ""
                    }
                }
            default:
                return state
        }
    }
    const [logInState, logInStateDispatch] = useReducer(loginReducer, {
        formSubmitted: false,
        formData: {user_name: "", user_password: ""},
        userData: {
            loggedIn: false,
            token: ''
        }
    })
    const userGreeting = () => {
        const name = () => {
            if (logInState.userData?.token) {
                return <div className="userGreeting">{logInState.userData.name}</div>
            } else if (fbLoginState?.token) {
                return (
                    <Fragment>
                        <div className="d-flex w-75 justify-content-center">
                            <div className="userGreeting">{fbLoginState.name}</div>
                            <img className="ml-2 img-thumbnail p-0 greetingImg" src={fbLoginState.picture} alt="Facebook_img"/>
                        </div>
                    </Fragment>
                )
            }
        }
        return name()
    }
    return (
        <ContextReducerLogIn.Provider value={{
            LOGIN_ACTIONS, logInState, logInStateDispatch, userGreeting
        }}>
            {children}
        </ContextReducerLogIn.Provider>
    )

}

export default ReducerLogin