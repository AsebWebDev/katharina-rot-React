
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import Plx from "react-plx";
import { Parallax, Background } from 'react-parallax';
import api from '../api';

// import "./styles.css";
  
function SimplaxTest(props) {

  let [currentId] = useState(props.currentId)
  console.log("TCL: SimplaxTest -> currentId", currentId)
  let [currentCollection, setCurrentCollection] = useState(null)
  let [error, setError] = useState(null)
  console.log(currentCollection)

  useEffect(() => {
    api.getOneCollection(currentId)
    .then(result => setCurrentCollection(result.collection))
    .catch (err => setError(err))
  }, [currentId])

  return (
    <div>

        {currentCollection && currentCollection.pictures.map(pic => 
        <Parallax
        blur={{ min: 10, max: 0 }}
        bgImage={pic}
        bgImageAlt="the cat"
        strength={200}
        opacity='0'
      >
        <img alt="art" src={pic} style={{ width:"500px", marginTop: '150px' }} />
        <div style={{ height: '60vh'}} />
      </Parallax>
        )}

      
    </div>
  );
}

let style = {
    height: "20vw",
    width: "20vw",
    margin: "auto",
  }

  const parallaxData = [
    {
      start: "self",
      startOffset: "0",
      end: "self",
      endOffset: "50vh",
      easing: "easeInSine",
      properties: [
        {
                startValue: -60,
                endValue: 90,
                property: "translateX",
                unit: "vw"
        },{
                startValue: 1,
                endValue: 2,
                property: "scale",
                unit: ""
        },{
                startValue: 0.8,
                endValue: 1,
                property: "brightness",
                unit: ""
        },{
            startValue: 1,
            endValue: 0,
            property: "grayscale",
            unit: ""
        }
        ]
    },
    // {
    //   start: "self",
    //   startOffset: "60vh",
    //   end: "self",
    //   endOffset: "100vh",
    //   easing: "easeInSine",
    //   properties: [
    //       {
    //           startValue: 6,
    //           endValue: -40,
    //           property: "translateX",
    //           unit: "vw"
    //         },{
    //           startValue: 2,
    //           endValue: 1,
    //           property: "scale",
    //           unit: ""
    //         },{
    //             startValue: 1,
    //             endValue: 0.8,
    //             property: "brightness",
    //             unit: ""
    //           },{
    //           startValue: 0,
    //           endValue: 1,
    //           property: "grayscale",
    //           unit: ""
    //         }
    //   ]
    // }
  ];
  

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
    }
  }
  
export default connect(mapStateToProps)(SimplaxTest)