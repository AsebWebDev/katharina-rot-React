import React from "react";
import { MDBNotification, MDBContainer} from "mdbreact";

function Notification (props) {
    return (
        <MDBContainer
            // style={{
            //     position: "fixed",
            //     top: "10px",
            //     right: "10px",
            //     zIndex: 9999
            // }}
        >
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

// function Notification (props) {
//     return (
//         <MDBContainer>
//             <MDBNotification
//             show
//             fade
//             iconClassName="text-primary"
//             title="Bootstrap"
//             message={props.notification}
//             text="11 mins ago"
//             style={{
//                 position: "fixed",
//                 top: "10px",
//                 right: "10px",
//                 zIndex: 9999
//             }}
//         />
//         </MDBContainer>
        
//     );
// }

export default Notification;