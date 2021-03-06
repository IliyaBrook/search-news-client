import {Button, Form} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom"
import {ContextReducerLogIn} from "../reducer-context/reducer-login";
import AppSpinner from "../hooks/spinner.hook";
import useHttp from "../hooks/http.hook";
import './log-in.scss'

const LogIn = (props) => {

    const {logInStateDispatch, logInState, LOGIN_ACTIONS} = useContext(ContextReducerLogIn)
    const history = useHistory()
    const [logInErrors, SetLogInErrors] = useState()
    const {loading, request} = useHttp(logInState)


    const submit = async (event) => {

        event.preventDefault()
        logInStateDispatch({type: LOGIN_ACTIONS.FORM_SUBMITTED_STATE, state: true})
        if (logInState.formData['user_name'] && logInState.formData['user_password']) {
            const url = 'https://search-news-server.herokuapp.com/login'
            const response = await request(url, 'POST', logInState.formData)

            if (response?.token !== undefined) {
                logInStateDispatch({
                    type: LOGIN_ACTIONS.SET_USER_DATA, updateUserData: {
                        user_name: response?.user_name,
                        name: `${response?.first_name} ${response?.last_name}`,
                        email: response?.email,
                        loggedIn: response.loggedIn,
                        user_id: response?.user_id,
                        token: response.token
                    }
                })
                localStorage.setItem('token', response.token)
                localStorage.setItem('name', response.first_name + ' ' + response.last_name)
                response?.loggedIn && history.push('/')
            }
            return !response?.loggedIn && SetLogInErrors(() => {
                return formAlert('Login failed, please check your credentials!', 'alert alert-danger')
            })
        }
    }
    const navBar = () => {

        const additionalBtn = (
            <Link to="/register">
                <Button className="ml-1" variant="secondary" active>
                    Registration
                </Button>
            </Link>
        )
        return props.navBarSecond(additionalBtn)
    }

    const formChange = (e) => {

        const {name, value} = e.target
        logInStateDispatch({
            type: LOGIN_ACTIONS.SET_USERNAME, formUpdate: {
                [name]: value
            }
        })
        logInStateDispatch({
            type: LOGIN_ACTIONS.SET_PASSWORD, formUpdate: {
                ...logInState.formData,
                [name]: value
            }
        })
    }
    const formAlert = (alertText, styles) => {
        return <div className={styles}>{alertText}</div>
    }


    return (
        <div>
            {navBar()}
            <div className='container content-container-login rounded p-1 mt-5 #546e7a blue-grey darken-1'>
                <p className='card-title m-2 text-white'>Log-in Form</p>

                {
                    loading && <div className="mt-5 ">
                        <AppSpinner/>
                    </div>
                }

                {
                    !loading && <div className='container-fluid Login-container-form p-0 mb-4'>
                        <Form onSubmit={submit}>
                            <div className="form-content rounded #eceff1 blue-grey lighten-5 p-2">
                                {logInErrors}
                                <Form.Group>
                                    <span>{logInState.formSubmitted && !logInState.formData['user_name'] &&
                                    formAlert('Please insert user name', 'font-italic alert-text-style')}</span>
                                    <Form.Control placeholder="Enter user name" name="user_name" onChange={formChange}/>
                                </Form.Group>
                                <Form.Group>
                                    <span>{logInState.formSubmitted && !logInState.formData['user_password'] &&
                                    formAlert('Password cannot be empty', 'font-italic alert-text-style')}</span>
                                    <Form.Control type="password" placeholder="Password"
                                                  name="user_password" onChange={formChange}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </div>
                }
            </div>
        </div>
    )
}
export default LogIn;
