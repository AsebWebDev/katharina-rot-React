import React, { useState } from 'react';
import { connect } from 'react-redux';
import { MDBJumbotron, MDBBtn, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem } from "mdbreact";
import Option from '../Option'
import '../../styles/Preferences.scss'

function Preferences(props) {

    let [userSettings, setUserSettings] = useState(
        (localStorage.getItem('user') != null)
        ? JSON.parse(localStorage.getItem('user')).settings
        : null
    )

    let handleChange = (e, val, settingType, option) => {
        let newUserSettings = { ...userSettings }
        newUserSettings[settingType][option].val = val
        setUserSettings(newUserSettings)        
    }

    let handleSave = () => {
        console.log("Submit")

    }

    return (
        <MDBContainer id="preferences" className="create-page mt-5 text-center">
            <MDBRow>
                {/* MAP OVER ALL SETTING CATEGORIES */}
                {Object.entries(userSettings)
                    .map(([settingType,settingTypeValue])=>{    // settings category and the concrete option (settingTypeValue)
                        return (
                            <MDBCol>
                                <MDBJumbotron>
                                    <div className="category-header flex-row">
                                        <h4 className="h5 display-5">{settingType.toString()}</h4>
                                        <div id="save-button"><MDBBtn size="sm" onClick={handleSave}  color="light">
                                            <MDBIcon far icon="save" />Save</MDBBtn>
                                        </div>
                                    </div>
                                    <div className="preferences">
                                        <MDBListGroup style={{ width: "27rem" }}>
                                            
                                            {/* MAP OVER ALL CATEGORY OPTIONS */}
                                            {Object.entries(settingTypeValue).map(([option,optionValue])=>{
                                                return (
                                                    <MDBListGroupItem className={(typeof(optionValue.val) === "boolean")?"reverse":''}>
                                                        <div>{optionValue.name}</div>       
                                                        <div>{ 
                                                            <Option 
                                                                settingType={settingType}       // pass in the settings category
                                                                option={option}                 // pass in the concrete option of the category you want to change
                                                                optionValue={optionValue}       // pass in the value of the option you want to change
                                                                handleChange={handleChange}
                                                            /> 
                                                        }</div>
                                                    </MDBListGroupItem>
                                                );
                                                })
                                            }

                                        </MDBListGroup>
                                    </div>
                                </MDBJumbotron>
                            </MDBCol>
                        );
                    })
                }
            </MDBRow>
            <div id="save-button"><MDBBtn onClick={handleSave}  color="success"><MDBIcon fas icon="save" />Save</MDBBtn></div>
        </MDBContainer>
    )
}

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
      notifications: reduxState.notifications,
    }
}
  
export default connect(mapStateToProps)(Preferences)
