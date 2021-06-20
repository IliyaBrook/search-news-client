import React, {Fragment} from "react";
import {Button, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavBarSecond = (additionalButtonsOp) => {

    return (
        <Fragment>
            <div>
                <Navbar collapseOnSelect bg="#424242 grey darken-3" variant="dark">
                    <div className="#424242 grey darken-3">
                        <Link to="/">
                            <Button variant="secondary" active>
                                To Home Page
                            </Button>
                        </Link>
                        {additionalButtonsOp}
                    </div>
                </Navbar>
            </div>
        </Fragment>
    )
}
export default NavBarSecond