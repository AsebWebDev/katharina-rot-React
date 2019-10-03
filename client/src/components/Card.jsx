import React from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBNavLink } from 'mdbreact';

export default function Card(props) {
    let handleDelete = () => {
        console.log("handle")
    }
    let {title, titlePic, pictures, tags, description, _id} = props.art;
    return (
        <MDBCol>
            <MDBCard style={{ width: "22rem" }}>
                <MDBNavLink to={"/collection/"+ _id}>
                    <MDBCardImage className="img-fluid" src={titlePic} waves />
                </MDBNavLink>
                <MDBCardBody>
                    <MDBCardTitle>{title}</MDBCardTitle>
                    <MDBCardText>
                        {description}
                    </MDBCardText>
                    <MDBBtn onClick={handleDelete} href="#">MDBBtn</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}