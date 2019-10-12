
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import Plx from "react-plx";
import api from '../api';
import '../styles/CollectionParallaxLeft.css'
  
function SimplaxTest(props) {

  let [currentId] = useState(props.currentId)
  let [currentCollection, setCurrentCollection] = useState(null)
  // eslint-disable-next-line
  let [error, setError] = useState(null)
  let count = (currentCollection)?currentCollection.pictures.length:null;

  useEffect(() => {
    api.getOneCollection(currentId)
    .then(result => setCurrentCollection(result.collection))
    .catch (err => setError(err))
  }, [currentId])

  return (
    <div id="plx-collection">
      <div id="plx-left" className="plx">
        {currentCollection && currentCollection.pictures.map(pic => {
            let style = { zIndex: count, position: "relative", height: "70vh" }
            count-- //set Index - 1 to let the next one overlap this instance
            return (<Plx parallaxData={parallaxData} style={style}><img alt="art" src={pic} width="400vw"/></Plx>)
        }
          
        )}
      </div>
      <div id="plx-right" className="plx">
        
      </div>
    </div>
  );
}



const parallaxData = [
  {
    start: "self",
    startOffset: "",
    end: "self",
    endOffset: "50vh",
    easing: "easeInSine",
    properties: [
        {
            startValue: -15,
            endValue: 25,
            property: "translateX",
            unit: "vw"
        },
        {
          startValue: 1,
          endValue: 8,
          property: "translateY",
          unit: "vw"
        },
        {
          startValue: 0.5,
          endValue: 1,
          property: "brightness",
          unit: ""
        },
        {
          startValue: 1,
          endValue: 0,
          property: "grayscale",
          unit: ""
        }
      ]
  },
  {
    start: "self",
    startOffset: "50",
    end: "self",
    endOffset: "90vh",
    easing: "easeInSine",
    properties: [
        {
            startValue: 1,
            endValue: 1.5,
            property: "scale",
            unit: "vw"
        },

      ]
  },
  {
    start: "self",
    startOffset: "90vh",
    end: "self",
    endOffset: "100vh",
    easing: "easeInSine",
    properties: [
        {
            startValue: 25,
            endValue: -18,
            property: "translateX",
            unit: "vw"
          },
          {
            startValue: 1.5,
            endValue: 1,
            property: "scale",
            unit: "vw"
          },
          {
            startValue: 1,
            endValue: 0.5,
            property: "brightness",
            unit: ""
          },
          {
            startValue: 0,
            endValue: 1,
            property: "grayscale",
            unit: ""
          }
    ]
  },
  
];

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
    }
  }
  
export default connect(mapStateToProps)(SimplaxTest)