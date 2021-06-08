import {Button, Form} from "react-bootstrap";
import React, {useState, useEffect } from "react";
import {Link} from "react-router-dom"
import './register.scss'
import {useHistory} from "react-router";

const Register = (props) => {
    const [formInputs, setFormInput] = useState({
        "first_name": '',
        "last_name": '',
        "user_name": '',
        "email": '',
        "password": ''
    })
    const [ passErrorCancel, setPassErrorCancel] = useState(false)
    const [ serverResJson , setServerResJson ] = useState({})
    const [ confPasswordValue , setConfPasswordValue ] = useState()
    const [ cancelErrorInput , setCancelErrorInput] = useState(false)

    const effectDepsPassInput = formInputs['password']
    useEffect(() => {
        setPassErrorCancel(false)
    }, [confPasswordValue,  effectDepsPassInput ])

    useEffect(() => {
        setCancelErrorInput(true)
    }, [formInputs])

    const change = (e) => {
        const {name, value} = e.target
        setFormInput((prevState => {
            return {
                ...prevState,
                [name]: value
            }
        }))
    }

    const history = useHistory()
    const submit = async (event) => {
        setPassErrorCancel(true)
        setCancelErrorInput(true)
        event.preventDefault()
            const urlServer = 'https://search-news-server.herokuapp.com/register'
            const request = await fetch(urlServer, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(formInputs)
            }).then((res) => {
                if (res.status === 200) {
                    return res.json()
                }
            })
            setServerResJson(request)
            return request?.post_status && history.push('/login')
    }

    const navBar = () => {
        const additionalBtn = (
            <Link to="/login">
                <Button className="ml-1" variant="secondary" active>
                    Log-in
                </Button>
            </Link>
        )
        return props.navBarSecond(additionalBtn)
    }

    const formAlert = (alertText) => {
        return <div className="font-italic alert-text-style">{alertText}</div>
    }
    const checkPassMatch = () => {
        if (passErrorCancel && formInputs['password'] !== confPasswordValue) {
            return formAlert('Password does not match')
        }
    }
    const emptyInputAlert = (inputJsonKey,errorText) => {
        if (cancelErrorInput && serverResJson?.["form_check"]?.[inputJsonKey]?.['error_blank']) {
            return formAlert(errorText)
        }
    }
    const minLengthInputAlert = (inputJsonKey,inputKeyEmptyCHeckError,errorText) => {
        if (cancelErrorInput && serverResJson?.["form_check"]?.[inputJsonKey]?.[inputKeyEmptyCHeckError]) {
            return formAlert(errorText)
        }
    }
    return (
        <div>
            {navBar()}
            <div className='container content-container-login'>
                <p className='card-title m-2'>Registration Form</p>

                <div className='container-fluid m-5 Login-container-form'>
                    <Form onSubmit={submit}>

                        <div className="form-content">
                            <Form.Group>
                                <span>{passErrorCancel && emptyInputAlert('first_name', 'First name cannot be empty!')}</span>
                                <Form.Control
                                    placeholder="Enter first name"
                                    name="first_name"
                                    onChange={change}
                                />
                            </Form.Group>
                            <Form.Group>
                                <span>{passErrorCancel && emptyInputAlert('last_name', 'Last name cannot be empty!')}</span>
                                <Form.Control placeholder="Enter last name"
                                              name="last_name"
                                              onChange={change}
                                />
                            </Form.Group>

                            <Form.Group>
                                <span>{serverResJson?.['user_name_duplicate'] && formAlert('Username already exists')}</span>
                                <span>{passErrorCancel && minLengthInputAlert('user_name','error_min_length_5','User name min length 5')}</span>
                                <Form.Control placeholder="Enter user name"
                                              name="user_name"
                                              onChange={change}
                                />
                            </Form.Group>
                            <span>{passErrorCancel && emptyInputAlert('user_email', 'Please fill in email address!')}</span>
                            {serverResJson?.['user_email_duplicate'] && formAlert('Email already exists')}
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter email"
                                              name="email"
                                              onChange={change}
                                />
                            </Form.Group>

                            <Form.Group>
                                <span>{passErrorCancel && minLengthInputAlert('password','error_min_length_8','Password min length 8')}</span>
                                <Form.Control type="password" placeholder="Password"
                                              name="password"
                                              onChange={change}
                                />
                            </Form.Group>
                            <Form.Group>
                                {confPasswordValue && checkPassMatch()}

                                <Form.Control type="password" placeholder="Password confirm"
                                              onChange={event => setConfPasswordValue(event.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default Register;
