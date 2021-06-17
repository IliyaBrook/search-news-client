import React, {Fragment} from 'react'
import {Route, BrowserRouter as Router} from "react-router-dom"
import Register from "./register/register";
import HomePage from "./home-page/home-page";
import NavBarSecond from "./nav-bars/nav-bar-second/nav-bar-second";
import NavBarMain from "./nav-bars/nav-bar-main/nav-bar-main";
import LogIn from "./login/log-in";
import ContextReducerLogIn from "./reducer-context/reducer-login";
import {FacebookLoginContext} from "./reducer-context/reducer-facebook-login";
import ReducerNewsContext from "./reducer-context/reducer-news";
import ReducerRestContext from "./reducer-context/rest-reducer";


const App = () => {
    return (
        <ReducerRestContext>
            <ReducerNewsContext>
                <FacebookLoginContext>
                    <ContextReducerLogIn>
                        <Fragment>
                            <Router>
                                <Route path="/" exact component={() => <HomePage navBar={NavBarMain}/>}/>
                                <Route path="/register" component={() => <Register navBarSecond={NavBarSecond}/>}/>
                                <Route path="/login" component={() => <LogIn navBarSecond={NavBarSecond}/>}/>
                            </Router>
                        </Fragment>
                    </ContextReducerLogIn>
                </FacebookLoginContext>
            </ReducerNewsContext>
        </ReducerRestContext>
    )
}

export default App
