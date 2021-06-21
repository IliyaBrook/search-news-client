import {Spinner} from "react-bootstrap";
import React from "react";

const AppSpinner = ({spinnerOff = false}) => {
    if (!spinnerOff) {
        return <div className="d-flex w-100 justify-content-center align-items-center">
            <Spinner className="p-5" animation="border"/>
        </div>
    }
}
export default AppSpinner