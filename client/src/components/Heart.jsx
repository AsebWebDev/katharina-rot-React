import React, { useState, useEffect } from "react";
import api from '../api';
import '../styles/Heart.scss'

export default function Heart(props) {

    let [target] = useState(props.target);
    let [likes, setLikes] = useState(props.target.likes);
    let [hasLiked, setHasLikes] = useState(null);

    useEffect(() => {
        api.hasLiked(target)
        .then(res => setHasLikes(res))
        .catch(err => console.log(err))
    })

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        api.addHeart(target)
        .then(newLikes => setLikes(newLikes))
        .catch(err => console.log(err))
    }

    return (
        <div id="heart">
                {/* empty heart, if no like yet */}
            {hasLiked && <span><i onClick={handleClick} className="red-heart fas fa-heart" />{likes}</span>}    
                {/* filled heart, if already liked */}
            {!hasLiked && <span><i onClick={handleClick} className="far fa-heart" />{likes}</span>}   
        </div>
    )
}
