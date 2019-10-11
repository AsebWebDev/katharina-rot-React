
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import Plx from "react-plx";
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
      <div style={{ height: "11vh" }} />

        {currentCollection && currentCollection.pictures.map(pic => 
        <Plx parallaxData={parallaxData} style={style}><img alt="art" src={pic} width="200vw" /></Plx>
        )}

      <div style={{ height: "100vh" }} />
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