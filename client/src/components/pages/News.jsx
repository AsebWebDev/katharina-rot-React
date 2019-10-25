import React from 'react'
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody } from "mdbreact";
import MaxiNews from '../MaxiNews'
import '../../styles/News.scss'

function News(props) {
    return (
        <div id="news">
            <MDBCard className="my-5 px-5 pb-5">
                <MDBCardBody>
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                    News
                    </h2>
                    <p className="text-center w-responsive mx-auto mb-5">
                    Hier kannst du dich über meine neusten Projekte, Events und Veröffentlichungen informieren.
                    </p>
                    <div id="maxi-news-container">
                    {props.news.map((news,i) => <MaxiNews news={news} i={i} key={i}/>)}
                    </div>

                </MDBCardBody>
            </MDBCard>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
      news: reduxState.news
    }
  }
  
export default connect(mapStateToProps)(News)