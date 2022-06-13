import React from "react";

const Alert = ({ alert }) => {
    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i class='fa fa-info-circle' aria-hidden='true'></i> {alert.msg}
            </div>
        )
    );
};

export default Alert;
