import React from 'react'
import { MDBJumbotron, MDBContainer } from "mdbreact";
import Spinner from './Spinner'

export default function LoadingInfo(props) {
    const {title, text, hasSpinner} = props;
    return (
        <MDBJumbotron className="jumbo-spinner" fluid>
            <MDBContainer>
                <h2 className="display-4">{title}</h2>
                <p className="lead">{text}</p>
                {hasSpinner ? <Spinner /> : <div></div>}
            </MDBContainer>
        </MDBJumbotron>
    )
}
