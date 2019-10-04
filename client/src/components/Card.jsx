import React from 'react'
import { connect } from 'react-redux';

import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBNavLink, MDBBadge } from 'mdbreact';
import Notification from './Notification'
import api from '../api';

const Card = function (props) {
    // let [message, setMessage] = useState(null);
    let {title, titlePic, pictures, tags, description, _id} = props.collection;
    let {dispatch} = props;
    
    let dispatchNotification = (message) => {
        dispatch({
            type: "ADD_NOTIFICATION",
            notification: message
        })
    }
    
    let handleDelete = () => {
        api.deleteCollection(_id)
        .then(result => {
            dispatchNotification((result.success) 
                ? `Your Collection '${title}' has been deleted`
                : `Sorry, your Collection could not be deleted.`
            )
            api.getCollections()
                .then(collections => {
                    dispatch({
                        type: "GET_DATA", 
                        collections
                    })
                })
                .catch (err => console.log(err))

        })
        .catch(err => dispatchNotification(err.toString()));
    }

    return (
        <MDBCol>
            <MDBCard style={{ width: "22rem" }}>
                <MDBNavLink to={"/collection/"+ _id}>
                    <MDBCardImage className="img-fluid" src={titlePic} waves />
                </MDBNavLink>
                <MDBCardBody>
                    <MDBCardTitle>{title} 
                        {api.isLoggedIn() && <MDBBadge onClick={handleDelete} color="danger">Delete</MDBBadge>}
                    </MDBCardTitle>
                    <MDBCardText>
                        {description}
                    </MDBCardText>
                    <MDBBtn href="#">MDBBtn</MDBBtn>
                </MDBCardBody>
            </MDBCard>
            {/* {message && <Notification message={message}/>} */}
        </MDBCol>
    )
}

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
      notifications: reduxState.notifications
    }
}

export default connect(mapStateToProps)(Card)

// export default Card