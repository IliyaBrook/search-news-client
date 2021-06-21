import './news-content.scss'
import React, {Fragment} from "react";

const TestNewsContent = (newsData) => {
    return (
        <Fragment>
            <div className="pl-4 pr-4">
                <div className="container rounded border
                shadow p-xl-5 mt-5 w-auto
                ">
                    <div className="p-4">
                        <div className="row d-inline-flex ">

                            <div className="col col-auto">
                                <img src={newsData?.image?.thumbnail?.contentUrl}
                                     alt="articles_imt"
                                     className="responsive-img rounded shadow"/>
                            </div>

                            <div className="col d-flex flex-column justify-content-around sha">
                                <p className="text-monospace pubDate mb-3">Publication
                                    date: {newsData?.datePublished.slice(0, 10)}</p>
                                <p className="text-monospace articleName m-0 ">
                                    {newsData?.name}
                                </p>
                            </div>
                        </div>

                        <div className="row descriptionText">
                            <div className="col">
                                <div className="col jumbotron rounded #eceff1 blue-grey lighten-5">
                                    <p className="font-monospace flow-text text-start p-2 text-justify
                                    ">{newsData?.description}</p>
                                </div>

                            </div>
                        </div>
                        <div className='btn'>
                            <a href={newsData?.url} className="">
                                <p className="m-0 black-text">
                                    To news Source
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default TestNewsContent;