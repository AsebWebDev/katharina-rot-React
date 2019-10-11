import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import SimplaxTest from '../SimplaxTest'
import api from '../../api';

function Collection(props) {
  let [currentId] = useState(props.match.params.id)
  let [currentCollection, setCurrentCollection] = useState(null)
  let [error, setError] = useState(null)
  console.log(currentCollection)

  useEffect(() => {
    api.getOneCollection(currentId)
    .then(result => setCurrentCollection(result.collection))
    .catch (err => setError(err))
  }, [currentId])
  
  if (currentCollection)
    return (
      <div>
          <p>{currentCollection.title}</p>
          <SimplaxTest currentId={currentId}/>
          {/* //TODO: add Lighbox Button and Lightbox */}
          {/* {currentCollection.pictures.length > 0 && currentCollection.pictures.map((img,i) => <img key={i} src={img} alt="art"/>)} */}
      </div>
    )
  else return (error && <p>{error}</p>)
}

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
    }
  }
  
export default connect(mapStateToProps)(Collection)
