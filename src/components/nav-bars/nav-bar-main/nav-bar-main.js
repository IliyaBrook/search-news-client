import React, {useContext, useRef} from "react";
import {Nav, Navbar} from "react-bootstrap";
import './nav-bar.scss'
import {Link} from "react-router-dom"
import {ContextReducerFbLogin} from "../../reducer-context/reducer-facebook-login";
import {ContextReducerLogIn} from "../../reducer-context/reducer-login";
import {RestContext} from "../../reducer-context/rest-reducer";



const NavBarMain = () => {
    const {FaceBookBtn, fbLoginState, fbStateDispatch} = useContext(ContextReducerFbLogin)
    const {userGreeting, logInState, logInStateDispatch} = useContext(ContextReducerLogIn)

    const { useOutSide , navCollapseState:{ collapse }, navCollapseDispatch , ACTIONS_NAVBAR:{
        NAVBAR_COLLAPSE,NAVBAR_TOGGLE
    }} = useContext(RestContext)

    const logOutBtn = () => {
        if (fbLoginState?.token || logInState?.userData.token) {
            return <div className="logOutBtnWrapper">
                <div onClick={() => {
                    logInStateDispatch({type: 'SET_LOGOUT'})
                    fbStateDispatch({type: 'SET_LOGOUT'})
                }} className="my-links-styles text-danger btn logoutBtn">Logout
                </div>
            </div>
        }
    }

    const registrationBtn = () => {
        return <div className="my-links-styles"><Link to="/register">Registration</Link></div>
    }

    const LoginBtn = () => {
        return <div className="my-links-styles nav-link active">
            <Link to="/login">Login</Link>
        </div>
    }

    const navRef = useRef()

    useOutSide( navRef, navCollapseDispatch,{type:NAVBAR_COLLAPSE} )

    return (
        <div  className="navbar-wrapper ">
            <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" expanded={ collapse } ref={navRef}>
                <div className="my-links-styles">
                    <Link to="/">Home Page</Link>
                </div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => navCollapseDispatch({type:NAVBAR_TOGGLE}) }/>
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="mr-auto">
                        {logOutBtn()}
                    </Nav>
                    <Nav>
                        {!logInState.userData?.token && !fbLoginState?.token && LoginBtn()}
                        {!logInState.userData?.token && !fbLoginState?.token && registrationBtn()}
                        {!logInState.userData?.token && !fbLoginState?.token && <FaceBookBtn btnClassNames={"d-none d-lg-block"}/>}
                        {/*if size MEDIUM*/}
                        {!logInState.userData?.token && !fbLoginState?.token && <FaceBookBtn btnClassNames={'d-sm-block d-md-block d-lg-none'}
                                                            render={renderProps => (
                                                                <div onClick={renderProps.onClick} style={{
                                                                    color:'#4267B2',
                                                                    backgroundColor:'#343a40'
                                                                }}>With facebook</div>
                                                            )}
                        />}
                        {userGreeting()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
export default NavBarMain