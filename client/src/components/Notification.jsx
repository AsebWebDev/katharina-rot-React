import React from "react";
import { connect } from 'react-redux';
import { MDBNotification, MDBContainer} from "mdbreact";
import { returnNotificationColor } from '../helpers'

function Notification (props) {

    let handleClick = () => {
        props.dispatch({
            type: 'CLEAR_NOTIFICATIONS'
        })
    }

    return (
        <MDBContainer>
            {props.notifications.length > 1 && <MDBNotification // Erscheint nur bei mehr als einer Notification
                    show
                    fade
                    iconClassName="text-warning"
                    title="Notifications"
                    message="Alle Notifications schließen"
                    onClick={handleClick}
            />}
            {props.notifications.map((notification,i) => // Liste alle Notifications auf
                <MDBNotification
                    key={i}
                    show
                    fade
                    iconClassName={returnNotificationColor(notification.typeOfNotification)}
                    title={notification.typeOfNotification}
                    message={notification.notification}
                    text="11 mins ago"
                />
            )}
        </MDBContainer>
    );
}


function mapStateToProps(reduxState){
    return { notifications: reduxState.notifications }
}

export default connect(mapStateToProps)(Notification)
