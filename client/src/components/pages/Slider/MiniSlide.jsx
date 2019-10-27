import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact";

const MiniSlide = (props) => {
  return (
    <MDBContainer>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={false}
        showIndicators={false}
        className="z-depth-1"
        slide
      >
        <MDBCarouselInner>
          {props.pictures.map((pic,i) => 
            <MDBCarouselItem key={i} itemId={i}>
                <MDBView>
                <img
                    className="d-block w-100"
                    src={pic}
                    alt="Slide"
                />
                </MDBView>
            </MDBCarouselItem>
          )}
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
}

export default MiniSlide;