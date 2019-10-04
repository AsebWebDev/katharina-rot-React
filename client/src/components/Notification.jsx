import React from "react";
import { MDBNotification } from "mdbreact";

function Notification (props) {
    return (
        <MDBNotification
            show
            fade
            iconClassName="text-primary"
            title="Bootstrap"
            message={props.notification}
            text="11 mins ago"
            style={{
                position: "fixed",
                top: "10px",
                right: "10px",
                zIndex: 9999
            }}
        />
    );
}

export default Notification;