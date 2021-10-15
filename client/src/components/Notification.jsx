import React from "react";
import { connect } from 'react-redux';
import { MDBNotification, MDBContainer, MDBAnimation} from "mdbreact";
import { PREPAREDELETE_NOTIFICATION, UPDATE_NOTIFICATIONS } from '../actioncreators'
import { returnNotificationColor, returnNotificationSymbol } from '../helpers'
import TimeAgo from 'react-timeago'
import germanStrings from 'react-timeago/lib/language-strings/de'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import '../styles/Notification.scss'

const formatter = buildFormatter(germanStrings)

function Notification (props) {

    // TODO: UNCOMMENT THIS PART WHEN USERSETTIGS ARE IMPLEMENTED
    // TODO: //////////////////////////////////////////////////
    // const handleClick = () => {
    //     props.dispatch({
    //         type: 'CLEAR_NOTIFICATIONS'
    //     })
    // }
    // TODO: //////////////////////////////////////////////////

    const handleNotificationFadeOut = (timestamp) => {
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
                        <div className="notification" key={i}>
                            <MDBAnimation 
                                type={notification.toBeDeleted?"bounce":"fadeOut"} 
                                delay={notification.toBeDeleted?"0s":"4s"}
                                onAnimationEnd={() => handleNotificationFadeOut(notification.created)}>
                            <MDBNotification
                            // autohide={7000} //in build function disabled, wrote my own logic to make notifications disappear and to practice async tasks
                            // pauseOnHover={true}
                            bodyClassName="notification-body"
                            show
                            fade
                            icon={returnNotificationSymbol(notification.typeOfNotification)}
                            iconClassName={returnNotificationColor(notification.typeOfNotification)}
                            title={notification.typeOfNotification}
                            message={notification.notification}
                            text={<TimeAgo date={notification.created} formatter={formatter} />}                        
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
