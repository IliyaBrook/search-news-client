import React, {createContext, useReducer, useRef} from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {SocialIcon} from 'react-social-icons';

export const ContextReducerFbLogin = createContext(null)


export const FacebookLoginContext = ({children}) => {
    const changeLogin = 'changeLogin'
    const SET_LOGOUT = 'SET_LOGOUT'

    const fbReducer = (state, action) => {
        switch (action?.type) {
            case changeLogin:
                return {...state, ...action.fbSetData}
            case SET_LOGOUT:
                if (sessionStorage?.getItem('fbssls_1206500839845709') || localStorage?.getItem('fblst_1206500839845709')) {
                    sessionStorage.removeItem('fbssls_1206500839845709')
                    localStorage.removeItem('fblst_1206500839845709')
                    window.FB.logout()
                }
                return {
                    email: '',
                    id: '',
                    name: '',
                    picture: '',
                    token: ''
                }
            default:
                return state
        }
    }


    const fbBtnElemRef = useRef()
    const FaceBookBtn = ({
                             btnClassNames,
                             render = renderProps => (<SocialIcon onClick={renderProps.onClick} network="facebook"/>)
                         }) => {
        const responseFacebook = (res) => {
            fbStateDispatch({
                type: changeLogin, fbSetData: {
                    name: res.name,
                    email: res.email,
                    picture: res?.picture?.data?.url,
                    id: res.id,
                    token: res.accessToken
                }
            })
        }


        return (
            <div className={btnClassNames}>
                <div className="fbBtnMedium">
                    <FacebookLogin
                        appId="1206500839845709"
                        cookie={true}
                        xfbml={true}
                        isMobile={true}
                        autoLoad={true}
                        status={true}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        render={render}
                        disableMobileRedirect={true}
                        redirectUri="https://search-news-client.netlify.app/"
                    />
                </div>

            </div>
        )
    }


    const [fbLoginState, fbStateDispatch] = useReducer(fbReducer, {
        name: '',
        email: '',
        picture: '',
        id: '',
        token: ''
    })


    return (
        <ContextReducerFbLogin.Provider value={{FaceBookBtn, fbLoginState, fbStateDispatch, fbBtnElemRef}}>
            {children}
        </ContextReducerFbLogin.Provider>
    )
}
