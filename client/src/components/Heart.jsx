import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import api from '../api';
import '../styles/Heart.scss'

function Heart(props) {
    
    const {dispatch} = props;
    const [target] = useState(props.target);
    const [hasLiked, setHasLikes] = useState(null);

    useEffect(() => {
        api.hasLiked(target)
        .then(res => setHasLikes(res))
        .catch(err => console.log(err))
    })

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        api.addHeart(target)
        .then(() => {
            if (target.type === "News") 
                api.getNews()
                .then(news => dispatch({ type: "GET_NEWS", news }))
                .catch (err => console.log(err))
            else if (target.type === "Collection") 
                api.getCollections()
                .then(collections => dispatch({ type: "GET_DATA", collections }))
                .catch (err => console.log(err))
        }).catch(err => console.log(err))
    }

    return (
        <div id="heart">
                {/* empty heart, if no like yet */}
            {hasLiked && <span><i onClick={handleClick} className="red-heart fas fa-heart" />{props.target.likes}</span>}    
                {/* filled heart, if already liked */}
            {!hasLiked && <span><i onClick={handleClick} className="far fa-heart" />{props.target.likes}</span>}   
        </div>
    )
}
  
export default connect()(Heart)
