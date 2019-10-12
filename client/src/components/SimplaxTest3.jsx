
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { Parallax, Background } from 'react-parallax';
import Plx from "react-plx";
import api from '../api';
import './SimplaxTest3.css'
import { relative } from 'path';
  
function SimplaxTest(props) {

  let [currentId] = useState(props.currentId)
  let [currentCollection, setCurrentCollection] = useState(null)
  let [error, setError] = useState(null)
  // let [count, setCount] = useState(0)
  let count = 10

  useEffect(() => {
    api.getOneCollection(currentId)
    .then(result => setCurrentCollection(result.collection))
    .catch (err => setError(err))
  }, [currentId])

  let countUp = () => {
    // setCount(count + 1)
  }




  return (
    <div id="plx-collection">
      <div id="plx-left" className="plx">
        {currentCollection && currentCollection.pictures.map(pic => {
            console.log(count)
            let style = { zIndex: count, position: "relative" }
            count--
            // countUp();
            return (<Plx parallaxData={parallaxData} style={style}><img alt="art" src={pic} width="400vw"/></Plx>)
        }
          
        )}
      </div>
      <div id="plx-right" className="plx">
        right
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
          startValue: 4,
          endValue: 8,
          property: "translateY",
          unit: "vw"
      },
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
            endValue: 1.3,
            property: "scale",
            unit: "vw"
        },
      //   {
      //     startValue: 1,
      //     endValue: 1.3,
      //     property: "scale",
      //     unit: "vw"
      // }
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
            startValue: 1.3,
            endValue: 1,
            property: "scale",
            unit: "vw"
        }
    ]
  },
  
];


// ============================================================
// REACT-PARALLAX
// ============================================================

// {currentCollection && currentCollection.pictures.map(pic => 
//   <Parallax
//     blur={0}
//     bgImage={pic}
//     bgImageAlt="the cat"
//     strength={-200}
//     opacity='0'
//   >
//     <div style={{ height: '100vh'}} />
//   </Parallax>
// )}  



function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
    }
  }
  
export default connect(mapStateToProps)(SimplaxTest)