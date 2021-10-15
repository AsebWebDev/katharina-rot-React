import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import Coverflow from 'react-coverflow'
import { calcCoverflow } from '../helpers'
import { coverFlowMedia } from '../configs/coverflow'
import useWindowSize from '../hooks/useWindowSize.jsx'
import api from '../api';

function CoverFlow(props) {
    const size = useWindowSize();
    const { dispatch } = props;
    const parsedPictures = props.collections.map(item => item.titlePic)

    useEffect(() => {
        if (props.collections.length === 0) api.getCollections()
        .then(collections => dispatch({ type: "GET_DATA", collections}))
        .catch (err => console.log(err))
    }, [dispatch, props.collections])

    return (
        <div id="coverflow">
                    <Coverflow
                        width={690}
                        height={400} 
                        displayQuantityOfSide={calcCoverflow(size.width)} 
                        navigation={false}
                        enableHeading={false}
                        media={coverFlowMedia}
                    >
                        <div
                        role="menuitem"
                        tabIndex="1"
                        >
                        {parsedPictures && 
                            <img
                            src={parsedPictures[0]}
                            alt='gallery'
                            style={{ display: 'block', width: '100%' }}
                        />
                        }
                        
                        </div>
                        {parsedPictures && parsedPictures
                            .slice(1,parsedPictures.length)
                            .map((pic, i) => 
                            <img src={pic} alt='gallery' key={i}/>
                            )}
                    </Coverflow>
                </div> 
    )
}

function mapStateToProps(reduxState){
    return {
        collections: reduxState.collections,
    }
  }
  
export default connect(mapStateToProps)(CoverFlow)
