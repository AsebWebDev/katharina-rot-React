import React from "react";
import { connect } from 'react-redux';
import { MDBNotification, MDBContainer, MDBAnimation} from "mdbreact";
import moment from 'moment';
import { PREPAREDELETE_NOTIFICATION, UPDATE_NOTIFICATIONS, updateNotifications, prepareDeleteNotification } from '../actioncreators'
import { returnNotificationColor, returnNotificationSymbol } from '../helpers'

function Notification (props) {

    // TODO: UNCOMMENT THIS PART WHEN USERSETTIGS ARE IMPLEMENTED
    // TODO: //////////////////////////////////////////////////
    // let handleClick = () => {
    //     props.dispatch({
    //         type: 'CLEAR_NOTIFICATIONS'
    //     })
    // }
    // TODO: //////////////////////////////////////////////////

    let handleNotificationFadeOut = (timestamp) => {
        props.dispatch({type:PREPAREDELETE_NOTIFICATION,timestamp})
        setTimeout(() => props.dispatch({type:UPDATE_NOTIFICATIONS, timestamp}), 2000)
    }
    return (
        <MDBContainer>
            {/* TODO: UNCOMMENT THIS PART WHEN USERSETTIGS ARE IMPLEMENTED */}
            {/* TODO: ////////////////////////////////////////////////// */}
            {/* {props.notifications.filter(item=>item.toBeDeleted !== true).length > 1 
            && props.notifications.length > 0
            && <MDBNotification // Erscheint nur bei mehr als einer Notification
                    show
                    fade
                    iconClassName="text-warning"
                    title="Notifications"
                    message="Alle Notifications schließen"
                    onClick={handleClick}
            />} */}
            {/* TODO: ////////////////////////////////////////////////// */}

                {props.notifications.map((notification,i) => {
                    if (notification.toBeDeleted) return (<div key={i}/>)
                    else return (
                        // Liste alle Notifications auf
                        <div className="notification" key={i}>
                        {/* <MDBAnimation type="bounce" onAnimationEnd={() => handleNotificationFadeOut(notification.created)}> */}
                        <MDBAnimation 
                            type={notification.toBeDeleted?"bounce":"fadeOut"} 
                            delay={notification.toBeDeleted?"0s":"4s"}
                            onAnimationEnd={() => handleNotificationFadeOut(notification.created)}>
                        <MDBNotification
                        show
                        fade
                        icon={returnNotificationSymbol(notification.typeOfNotification)}
                        iconClassName={returnNotificationColor(notification.typeOfNotification)}
                        title={notification.typeOfNotification}
                        message={notification.notification}
                        text={moment(notification.created).calendar()}
                        // text={moment(notification.created).startOf(notification.created).fromNow()} //TODO: implement relativ time
                        
                        />
                        </MDBAnimation>
                        </div>
                    )
                }   
            )}
        </MDBContainer>
    );
}


function mapStateToProps(reduxState){
    return { notifications: reduxState.notifications }
}

export default connect(mapStateToProps)(Notification)
