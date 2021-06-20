import React, {useContext, useRef, useEffect} from "react";
import './nav-bar.scss'
import {Link} from "react-router-dom"
import {ContextReducerFbLogin} from "../../reducer-context/reducer-facebook-login";
import {ContextReducerLogIn} from "../../reducer-context/reducer-login";
import {RestContext} from "../../reducer-context/rest-reducer";

const NavBarMain = () => {
    const {FaceBookBtn, fbLoginState, fbStateDispatch} = useContext(ContextReducerFbLogin)
    const {logInState, logInStateDispatch} = useContext(ContextReducerLogIn)
    const {
        useOutSide, navCollapseDispatch, ACTIONS_NAVBAR: {
            NAVBAR_COLLAPSE,
        }
    } = useContext(RestContext)

    const logOutBtn = () => {
        if (fbLoginState?.token || logInState?.userData.token) {
            return (
                <div className="btn-pointer" onClick={() => {
                    logInStateDispatch({type: 'SET_LOGOUT'})
                    fbStateDispatch({type: 'SET_LOGOUT'})
                }}>Logout
                </div>
            )
        }
    }

    const registrationBtn = () => {
        if (!logInState.userData?.token && !fbLoginState?.token) {
            return (
                <div>
                    <Link to="/register">Registration</Link>
                </div>
            )
        }
    }

    const LoginBtn = () => {
        if (!logInState.userData?.token && !fbLoginState?.token) {
            return (
                <div className="logInBtnStyles">
                    <Link to="/login">Login</Link>
                </div>
            )
        }
    }

    const navRef = useRef()

    useOutSide(navRef, navCollapseDispatch, {type: NAVBAR_COLLAPSE})


    const sidenav = useRef()
    useEffect(() => {
        window.M.Sidenav.init(sidenav.current, {})
    }, [])

    const userNamesGreetingFromFb = () => {
        return (
            <div className="col justify-content-end d-flex mt-1">
                <div className="shadow card-panel  userName d-none d-md-flex justify-content-center p-2">
                    <div className="userName">
                        {logInState.userData.name}
                        {fbLoginState.name}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <nav className="#424242 grey darken-3 navBarStyles">
                <div className="container navControls shadow">

                    <div className="row d-flex align-items-center m-0">

                        <div data-target="slide-out" className="sidenav-trigger col p-1 d-md-none draggable">
                            <i className="material-icons">menu</i>
                        </div>

                        <div className="col d-none d-md-inline-flex ">

                            <div className="container  d-flex w-100 h-100 mt-3">
                                <div className="row w-100 h-100">
                                    <div className="col">
                                        {logOutBtn()}
                                        {LoginBtn()}
                                    </div>
                                    <div className="col s1 d-none d-md-flex">
                                        {!logInState.userData?.token && !fbLoginState?.token &&
                                        registrationBtn()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {[...Array(4)].map((_, index) => <div key={index} className="col"/>)}

                        {logInState.userData?.token && userNamesGreetingFromFb()}
                        {fbLoginState?.token && userNamesGreetingFromFb()}

                        {
                            !logInState.userData?.token && <div className="p-2 d-none d-md-flex">
                                <div className="">
                                    {!logInState.userData?.token && !fbLoginState?.token &&
                                    <FaceBookBtn/>}
                                </div>
                                {fbLoginState?.token &&
                                <img className="circle" src={fbLoginState.picture} alt="Facebook_img"/>}
                            </div>
                        }
                    </div>
                </div>
            </nav>

            <ul id="slide-out" className="sidenav #eceff1 blue-grey lighten-5" ref={sidenav}>
                <li>
                    <div className="user-view">
                        {fbLoginState?.token && <img className="border border-dark" src={fbLoginState.picture}
                                                     alt="Facebook_img"/>}
                    </div>
                    <div>
                        <h5 className="left-align pl-3 ">
                            {logInState.userData.name}
                            {fbLoginState.name}
                        </h5>
                    </div>
                    <div className="divider"/>
                </li>
                <div className="container w-100 p-0 p-1">
                    <div className="row">
                        <div className="col-12 text-info w-100 p-4">
                            <div className="waves-effect waves-light btn-small btn-color btn-pointer">
                                {logOutBtn()}
                                {LoginBtn()}
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    )
}
export default NavBarMain