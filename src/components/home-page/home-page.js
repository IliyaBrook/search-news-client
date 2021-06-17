import React, {Fragment, useContext, useEffect, useRef, useState} from "react";
import './home-page.scss'
import NavBarMain from "../nav-bars/nav-bar-main/nav-bar-main";
import NewsContent from "../news-content/news-content";
import SearchingForm from "../searching-form/searching-form";
import {ContextNews} from "../reducer-context/reducer-news";
import {ContextReducerFbLogin} from "../reducer-context/reducer-facebook-login";
import {ContextReducerLogIn} from "../reducer-context/reducer-login";
import AppSpinner from "../hooks/spinner.hook";

const HomePage = () => {
    const {FaceBookBtn, fbLoginState} = useContext(ContextReducerFbLogin)
    const {logInState} = useContext(ContextReducerLogIn)
    const isSpinnerLoading = useRef(null)
    const newsDataIndexRef = useRef(0)
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState()

    const {
        NEWS_ACTIONS: {SET_NEWS_DATA, SET_NEWS_INPUT_VALUE},
        newsDataState: {newsData, newsInputValue},
        newsDispatch
    } = useContext(ContextNews)

    const [dataLoadErr, setDataLoadErr] = useState({
        error: '',
        errorState: false
    })


    const getNewsData = async () => {

        setDataLoadErr(false)
        setIsDataLoaded(true)
        const url = `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsInputValue}&safeSearch=Off&textFormat=Raw&freshness=Day`

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-bingapis-sdk": "true",
                "x-rapidapi-key": "1b72454c45msh40fbb56025a3fc3p11f9cfjsn16b3e675f020",
                "x-rapidapi-host": "bing-news-search1.p.rapidapi.com"
            }
        }).then(res => {
            return res.json()
        }).catch(error => setDataLoadErr({error: error, errorState: true}))

        setIsDataLoaded(false)
        newsDispatch({type: SET_NEWS_DATA, newsDataPayload: response.value})
    }


    const renderArticles = () => {

        let key = 1
        return newsData?.map((elem, index) => {
            newsDataIndexRef.current = index + 1
            key++
            return <div key={key}>{NewsContent(elem)}</div>
        })
    }

    const searchFormRef = useRef()
    const focus = () => searchFormRef.current?.focus()

    useEffect(() => {
        return focus()
    }, [])
    const [placeholder, setPlaceholder] = useState('Which news do you want to search for today')

    const renderNewsContentIfLogin = () => {

        const logInAlertWithSpinner = () => {

            if (!renderArticles().length && !newsDataIndexRef.current &&
                localStorage.getItem('fblst_1206500839845709') !== null) {
                return <AppSpinner/>
            } else if (!renderArticles().length && !newsDataIndexRef.current && localStorage.getItem('token') !== null) {
            } else {
                return <div className="col-md-5 rounded p-3" style={{backgroundColor: 'rgba(17, 172, 243, 0.43)'}}>
                    <FaceBookBtn
                        render={renderProps => (
                            <div onClick={renderProps.onClick} className="fbBtnIfNotAuth rounded">
                                <div className="d-flex align-content-center" style={{color: 'black'}}
                                >Please register,or sign in with
                                </div>
                                <div className="d-flex justify-content-center p-2 ml-2 rounded h-25"
                                     style={{backgroundColor: '#4267B2'}}>Facebook
                                </div>
                            </div>
                        )}/>
                </div>
            }
        }

        const submitNewsForm = (event) => {

            event.preventDefault()
            if (searchFormRef.current.value !== '') {
                setPlaceholder()
                setIsSubmitted(true)
                getNewsData().catch(err => console.log(err))
                searchFormRef.current.value = ''
            } else {
                setPlaceholder('Empty query!')
            }
        }

        if (fbLoginState?.token || logInState?.userData.token) {

            const contentOrSpinner = () => {
                if (isDataLoaded) {
                    isSpinnerLoading.current = true
                    return <AppSpinner/>
                } else {
                    isSpinnerLoading.current = false
                    return renderArticles()
                }
            }
            return (
                <Fragment>
                    {SearchingForm(placeholder, submitNewsForm, (event) => {
                        newsDispatch({type: SET_NEWS_INPUT_VALUE, newsInputValuePayload: event.target.value})
                    }, searchFormRef)}
                    {contentOrSpinner()}
                    {dataLoadErr.errorState && JSON.stringify(dataLoadErr.error)}
                </Fragment>
            )
        } else if (!logInState?.userData.token && !fbLoginState?.token) {
            return (

                <div className="d-flex align-content-center min-vh-100 min-vw-100 jumbotron pt-5">
                    <div className="container-fluid pt-5 ">
                        <div className="row">
                            <div className="col-md-3"/>
                            {logInAlertWithSpinner()}
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <Fragment>
            <NavBarMain/>
            {renderNewsContentIfLogin()}
            {renderArticles().length === 0 && isSubmitted && !isSpinnerLoading.current &&
            <div className="alert-info p-5">
                <h2>
                    Sorry. We did not find any results from your search. Try again.
                </h2>
            </div>}
        </Fragment>
    )
}
export default HomePage