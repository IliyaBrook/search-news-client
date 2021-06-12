import React, {Fragment} from "react";
import {Button, Navbar } from "react-bootstrap";
import {Link } from "react-router-dom";

const NavBarSecond = (additionalButtonsOp) => {


    return (
        <Fragment>
            <div>
                <Navbar collapseOnSelect bg="dark" variant="dark">
                    <div className="bg-dark" >
                        <Link to="/">
                            <Button  variant="secondary"  active>
                                To Home Page
                            </Button>
                        </Link>
                        { additionalButtonsOp }
                    </div>
                </Navbar>
            </div>
        </Fragment>
    )
}
export default NavBarSecond