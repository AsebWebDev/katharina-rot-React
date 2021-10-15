import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../styles/InputTag.css'

function InputTag (props) {
  const [tags, setTags] = useState(props.tags)
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    setTags(props.tags)
  }, [props.tags])

  
  const removeTag = (i) => {
    const newTags = [ ...tags ];
    newTags.splice(i, 1);
    setTags(newTags);
    props.updateTags(newTags)
  }

  const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags([...tags, val]);
      props.updateTags([...tags, val])
      setTagInput('');
    } else if (e.key === 'Backspace' && !val) {
      removeTag(tags.length - 1);
    }
  }

  return (
    <div className="input-tag">
      <ul className="input-tag__tags">
        { tags.map((tag, i) => (
          <li key={tag}>
            {tag}
            <button type="button" onClick={() => { removeTag(i); }}>+</button>
          </li>
        ))}
        <li className="input-tag__tags__input"><input type="text" placeholder="New Tag..." onKeyDown={inputKeyDown} onChange={e => setTagInput(e.target.value)} value={tagInput}/></li>
      </ul> 
    </div>
  );

}

  function mapStateToProps(reduxState){
    return {
      modal: reduxState.modal,
      uploadedPictures: reduxState.uploadedPictures,
      uploadedTitlePic: reduxState.uploadedTitlePic
    }
  }
  
  export default connect(mapStateToProps)(InputTag)