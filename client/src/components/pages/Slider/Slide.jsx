import React, { useState } from 'react'

function Slide (props) {
  
  let [slide, setSlide] = useState(React.createRef())
  
  let handleMouseMove = (event) => {
    const el = slide.current
    const r = el.getBoundingClientRect()

    el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)))
    el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)))
  }

  let handleMouseLeave = (event) => {    
    slide.current.style.setProperty('--x', 0)
    slide.current.style.setProperty('--y', 0)
  }

  let handleSlideClick = (event) => {
    props.handleSlideClick(props.slide.index)
  }

  let imageLoaded = (event) => {
    event.target.style.opacity = 1
  }

  const { src, button, headline, index } = props.slide
  const current = props.current
  let classNames = 'slide'
  
  if (current === index) classNames += ' slide--current'
  else if (current - 1 === index) classNames += ' slide--previous'
  else if (current + 1 === index) classNames += ' slide--next'
      
  return (
    <li 
      ref={slide}
      className={classNames} 
      onClick={handleSlideClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="slide__image-wrapper">
        <img 
          className="slide__image"
          alt={headline}
          src={src}
          onLoad={imageLoaded}
          key={index}
        />
      </div>
      
      <article className="slide__content">
        <h2 className="slide__headline">{headline}</h2>
        {/* <button className="slide__action btn">{button}</button> */}
      </article>
    </li>
  )
}

export default Slide

