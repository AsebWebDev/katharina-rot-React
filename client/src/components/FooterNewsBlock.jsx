import React from 'react'
import { connect } from 'react-redux';


function FooterNewsBlock(props) {
    return (
        <div>
          {props.news.map((news,i) => 
            <ul>
              <li className="list-unstyled">
                <a href="www.katharina-rot.de">{news.title}</a>
              </li>
            </ul>
          )}
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
      news: reduxState.news
    }
  }
  
export default connect(mapStateToProps)(FooterNewsBlock)