import {Button, Form} from "react-bootstrap";
import React, { useContext } from "react";
import {Link, useHistory } from "react-router-dom"
import {ContextReducerLogIn} from "../reducer-context/reducer-login";

const LogIn = (props) => {
    const { logInStateDispatch , logInState ,LOGIN_ACTIONS } = useContext(ContextReducerLogIn)
    const history = useHistory()
    const submit = async (event) => {
        event.preventDefault()
        logInStateDispatch({type: LOGIN_ACTIONS.FORM_SUBMITTED_STATE,state:true})
        if (logInState.formData['user_name'] && logInState.formData['user_password']) {
            const url = 'https://search-news-server.herokuapp.com/login'
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logInState.formData)
            }).then(res => {
                if (res.status === 200) {
                    return res.json()
                }
            }).catch((error) => console.log(error))
            if(response?.token !== undefined){
                logInStateDispatch({
                    type: LOGIN_ACTIONS.SET_USER_DATA,updateUserData:{
                        user_name:response?.user_name,
                        name: `${response?.first_name} ${response?.last_name}`,
                        email:response?.email,
                        loggedIn: true,
                        user_id: response?.user_id,
                        token:response.token
                    }})
                localStorage.setItem('token',response.token)
                localStorage.setItem('name', response.first_name + ' ' + response.last_name)
                console.log(response)
                console.log(logInState)

            }
            response?.loggedIn && history.push('/')
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
    const formAlert = (alertText,styles) => {
        return <div className={styles}>{alertText}</div>
    }


    return (
        <div onClick={() => logInStateDispatch({type: LOGIN_ACTIONS.FORM_SUBMITTED_FALSE})}>
            {navBar()}

            <div className='container content-container-login'>
                <p className='card-title m-2'>Log-in Form</p>
                <div className='container-fluid m-5 Login-container-form'>
                    <Form onSubmit={submit}>
                        <div className="form-content">
                            {logInState.userData.loggedIn === false && logInState.formSubmitted &&
                            formAlert('Login failed, please check your credentials!','alert alert-danger')}
                            <Form.Group>
                                <span>{logInState.formSubmitted && !logInState.formData['user_name'] &&
                                formAlert('Please insert user name','font-italic alert-text-style')}</span>
                                <Form.Control placeholder="Enter user name" name="user_name" onChange={formChange}/>
                            </Form.Group>
                            <Form.Group>
                                <span>{logInState.formSubmitted && !logInState.formData['user_password'] &&
                                formAlert('Password cannot be empty','font-italic alert-text-style')}</span>
                                <Form.Control type="password" placeholder="Password"
                                              name="user_password" onChange={formChange}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>

                </div>
            </div>
        </div>
    )
}
export default LogIn;
