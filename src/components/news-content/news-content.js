import React, {Fragment} from "react";
import './new-content.scss'

const NewsContent = (newsData) => {
    return (
        <Fragment>
            <div className="article-wrapper min-vh-100 jumbotron-fluid">
                <div className="container-fluid w-100">
                    <div className="row p-3">
                        <div className="col-sm-4"/>
                        <div className="col-sm-4 article-header">
                            {newsData.name} title
                        </div>
                        <img src={newsData?.image?.thumbnail?.contentUrl} alt="articles_imt" className="img-fluid"/>
                        <div className="col-sm-4"/>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 jumbotron col-article-paragraph">
                            <p className="font-monospace">
                                {newsData?.description}
                            </p>
                            <a href={newsData?.url}>News Source</a>/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default NewsContent;