import React from "react";
import { MDBNotification, MDBContainer} from "mdbreact";

function Notification (props) {
    return (
        <MDBContainer>
            {props.notifications.map((notification,i) => 
                <MDBNotification
                    key={i}
                    show
                    fade
                    iconClassName="text-primary"
                    title="Bootstrap"
                    message={notification}
                    text="11 mins ago"
                />
            )}
        </MDBContainer>
    );
}

export default Notification;