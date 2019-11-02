import React, { useState, useEffect } from "react";
import api from '../api';
import { Collection } from "mongoose";

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
            {hasLiked && <p><i onClick={handleClick} className="red-heart fas fa-heart" />{likes}</p>}    
                {/* filled heart, if already liked */}
            {!hasLiked && <p><i onClick={handleClick} className="far fa-heart" />{likes}</p>}   
        </div>
    )
}
