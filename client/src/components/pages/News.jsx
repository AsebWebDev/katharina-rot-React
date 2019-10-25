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
                    Recent posts
                    </h2>
                    <p className="text-center w-responsive mx-auto mb-5">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
                    </p>
                    
                    {props.news.map((news,i) => <MaxiNews news={news} i={i} key={i}/>)}

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