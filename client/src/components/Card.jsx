import React from 'react'
import { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBNavLink, MDBBadge } from 'mdbreact';
import api from '../api';


export default function Card(props) {
    let {title, titlePic, pictures, tags, description, _id} = props.collection;
    let [message, setMessage] = useState(null);
    
    let handleDelete = () => {
        api.deleteCollection(_id)
        .then(result => {
            (result.success) 
                ? setMessage(`Your Collection '${title}' has been deleted`)
                : setMessage(`Sorry, your Collection could not be deleted.`)
            setTimeout(() => setMessage(null), 2000)
        }).catch(err => this.setState({ message: err.toString() }));
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
            {message && <h2>{message}</h2>}
        </MDBCol>
    )
}