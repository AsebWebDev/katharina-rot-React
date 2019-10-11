
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
      {/* <div style={{ marginTop: "15vh" }}>
        <h2>Scroll down</h2>
      </div> */}

      <div style={{ height: "10vh" }} />

    {currentCollection && currentCollection.pictures.map(pic => 
      <Plx parallaxData={parallaxData} style={style}><img alt="art" src={pic} width="300px" /></Plx>
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

// An array of parallax effects to be applied
// const parallaxData = [
//   {
//     start: "self",
//     startOffset: "0",
//     end: "self",
//     endOffset: "100vh",
//     easing: "easeInCirc",
//     properties: [
//         {
//             startValue: -14,
//             endValue: 14,
//             property: "translateX",
//             unit: "vw"
//           },
//         //   {
//         //     startValue: 1,
//         //     endValue: 1.5,
//         //     property: "scale",
//         //     unit: ""
//         //   },
//         //   {
//         //     startValue: 2,
//         //     endValue: 0,
//         //     property: "blur",
//         //     unit: ""
//         //   }
//       ]
//   },
// //   {
// //     start: "self",
// //     startOffset: "20vh",
// //     end: "self",
// //     endOffset: "100vh",
// //     easing: "easeInSine",
// //     properties: [
// //         {
// //             startValue: 2,
// //             endValue: 14,
// //             property: "translateX",
// //             unit: "vw"
// //           },{
// //             startValue: 1.5,
// //             endValue: 1,
// //             property: "scale",
// //             unit: ""
// //           },{
// //             startValue: 0,
// //             endValue: 2,
// //             property: "blur",
// //             unit: ""
// //           }
// //     ]
// //   }
// ];

const parallaxData = [
    {
      start: "self",
      startOffset: "0",
      end: "self",
      endOffset: "50vh",
      easing: "easeInSine",
      properties: [
          {
              startValue: -39,
              endValue: -3,
              property: "translateX",
              unit: "vw"
            },{
              startValue: 1,
              endValue: 2,
              property: "scale",
              unit: ""
            }
        ]
    },
    {
      start: "self",
      startOffset: "60vh",
      end: "self",
      endOffset: "100vh",
      easing: "easeInSine",
      properties: [
          {
              startValue: -3,
              endValue: -39,
              property: "translateX",
              unit: "vw"
            },{
              startValue: 2,
              endValue: 1,
              property: "scale",
              unit: ""
            }
      ]
    }
  ];
  

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
    }
  }
  
export default connect(mapStateToProps)(SimplaxTest)