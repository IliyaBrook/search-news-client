import React, {Fragment, useCallback, useContext, useEffect, useRef, useState} from "react";
import './home-page.scss'
import NavBarMain from "../nav-bars/nav-bar-main/nav-bar-main";
import NewsContent from "../news-content/news-content";
import SearchingForm from "../searching-form/searching-form";
import {ContextNews} from "../reducer-context/reducer-news";
import {Spinner} from "react-bootstrap";
import {ContextReducerFbLogin} from "../reducer-context/reducer-facebook-login";

const HomePage = () => {
    const {FaceBookBtn} = useContext(ContextReducerFbLogin)

    const NewsSpinner = () => {
        return (
            <div className="d-flex w-100 justify-content-center align-items-center">
                <Spinner className="p-5" animation="border"/>
            </div>
        )
    }

    const {
        NEWS_ACTIONS: {SET_NEWS_DATA, SET_NEWS_INPUT_VALUE},
        newsDataState: {newsData, newsInputValue},
        newsDispatch
    } = useContext(ContextNews)
    const time = new Date()
    const twoDayBefore = `from=${time.getFullYear()}-${time.getUTCMonth() + 1}-${time.getUTCDate() - 2}&`
    const newsApiKey = process.env.REACT_APP_NEWSAPI
    const url = 'https://newsapi.org/v2/everything?' +
        `q=${newsInputValue}&` +
        twoDayBefore +
        'sortBy=popularity&' +
        `apiKey=${newsApiKey}`;

    const [dataLoadErr, setDataLoadErr] = useState({
        error: '',
        errorState: false
    })
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const getNewsData = useCallback(async () => {
        setDataLoadErr(false)
        setIsDataLoaded(true)
        const response = await fetch(url).then(res => {
            return res.json()
        }).catch(error => setDataLoadErr({error: error, errorState: true}))

        setIsDataLoaded(false)
        newsDispatch({type: SET_NEWS_DATA, newsDataPayload: response.articles})
    }, [SET_NEWS_DATA, newsDispatch, url])

    const renderArticles = useCallback(
        () => {
            let key = 1
            return newsData.map(elem => {
                key++
                return <div key={key}>{NewsContent(elem)}</div>
            })
        }
        , [newsData])

    const searchFormRef = useRef()
    const focus = () => searchFormRef.current?.focus()
    useEffect(() => {
        return focus()
    },[])
    let submitFormRef = useRef(false)
    const [ placeholder , setPlaceholder ] = useState('Which news do you want to search for today')
    const renderNewsContentIfLogin = () => {
        const submitNewsForm = (event) => {
            event.preventDefault()
            if (searchFormRef.current.value !== '') {
                setPlaceholder()
                submitFormRef.current = true
                getNewsData().catch(err => console.log(err))
                searchFormRef.current.value = ''
            }else {
                setPlaceholder('Empty query!')
            }
        }
        if (localStorage.getItem('token') || localStorage.getItem('fblst_1206500839845709')) {
            return (
                <Fragment>
                    {SearchingForm( placeholder , submitNewsForm,  (event) => {
                            newsDispatch({type: SET_NEWS_INPUT_VALUE, newsInputValuePayload: event.target.value})
                        }, searchFormRef)}
                    {isDataLoaded ? <NewsSpinner/> : renderArticles()}
                    {dataLoadErr.errorState && JSON.stringify(dataLoadErr.error)}
                </Fragment>
            )
        } else if (!localStorage.getItem('token') || !localStorage.getItem('fblst_1206500839845709')) {
            return (
                <div className="d-flex align-content-center min-vh-100 min-vw-100 jumbotron pt-5">

                    <div className="container-fluid pt-5 ">

                        <div className="row">
                            <div className="col-md-3"/>
                            <div className="col-md-5 rounded p-3" style={{backgroundColor: 'rgba(17, 172, 243, 0.43)'}}>
                                <FaceBookBtn
                                    render={renderProps => (
                                        <div onClick={renderProps.onClick} className="fbBtnIfNotAuth rounded">
                                            <div className="d-flex align-content-center" style={{color:'black'}}
                                            >Please register,or sign in with</div>
                                            <div className="d-flex justify-content-center p-2 ml-2 rounded h-25"
                                                 style={{backgroundColor: '#4267B2'}}>Facebook</div>
                                        </div>
                                    )}/>
                            </div>
                        </div>

                    </div>

                </div>
            )
        } else {
            return (
                <div className="alert-info p-5">
                    <h2>
                        Sorry not found,Please try again
                    </h2>
                </div>
            )
        }


    }

    return (
        <Fragment>
            <NavBarMain/>
            {renderNewsContentIfLogin()}
        </Fragment>
    )
}
export default HomePage