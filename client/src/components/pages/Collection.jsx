import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import api from '../../api';

function Collection(props) {
  let [currentId] = useState(props.match.params.id)
  let [currentCollection, setCurrentCollection] = useState([])
  let [error, setError] = useState(null)

  useEffect(() => {
    api.getOneCollection(currentId)
    .then(result => setCurrentCollection(result.collection))
    .catch (err => setError(err))
  }, [currentId])
  
  return (
      <div>
          <p>Collection</p>
          <p>{currentCollection.title}</p>
          {error && <p>{error}</p>}
      </div>
  )
}

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
    }
  }
  
export default connect(mapStateToProps)(Collection)
