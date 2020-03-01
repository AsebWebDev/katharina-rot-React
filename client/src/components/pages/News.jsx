import React from 'react'
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody, MDBJumbotron, MDBContainer } from "mdbreact";
import { isInQuery } from '../../helpers'
import EditModal from './EditModal'
import MaxiNews from '../MaxiNews'
import Spinner from '../Spinner'
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
                    {props.news
                    .filter(item => isInQuery(item, props.query))
                    .map((news,i) => <MaxiNews news={news} i={i} key={i}/>)}

                    {/* NO DATA EXISTS */}
                    { props.news && props.news.length === 0 &&
                    <MDBJumbotron className="jumbo-spinner" fluid>
                        <MDBContainer>
                        <h2 className="display-4">Loading content</h2>
                        <p className="lead">No data is yet provided, still loading...</p>
                        <Spinner />
                        </MDBContainer>
                    </MDBJumbotron>}
                    </div>
                </MDBCardBody>
            </MDBCard>
            {props.modal.isOpen && <EditModal />}
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
      news: reduxState.news,
      modal: reduxState.modal,
      query: reduxState.query
    }
  }
  
export default connect(mapStateToProps)(News)