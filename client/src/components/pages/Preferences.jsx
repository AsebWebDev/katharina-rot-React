import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { MDBJumbotron, MDBBtn, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem } from "mdbreact";
import { newNotification } from '../../actioncreators'
import Option from '../Option'
import api from '../../api';
import '../../styles/Preferences.scss'

function Preferences(props) {
    const localStorageUser = (localStorage.getItem('user') != null)
        ? JSON.parse(localStorage.getItem('user'))
        : null
    
    const localStorageSettings = localStorageUser.settings

    let {dispatch} = props;
    let [userSettings, setUserSettings] = useState(props.userSettings)

    let handleChange = (e, val, settingType, option) => {
        let newUserSettings = { ...userSettings }
        newUserSettings[settingType][option].val = val
        setUserSettings(newUserSettings)        
    }

    let handleSave = (settingType) => {
        api.saveUserSettings(localStorageUser._id, userSettings, settingType )
        .then(settings => {
            dispatch({ type: "UPDATE_USER_SETTINGS", settings})
            dispatch(newNotification(`Your ${settingType}-Preferences have been updated`, 'Updated'))
        }).catch(err => dispatch(newNotification(err.toString())));
    }

    return (
        <MDBContainer id="preferences" className="create-page mt-5 text-center">
            <MDBRow>
                {/* MAP OVER ALL SETTING CATEGORIES */}
                {Object.entries(props.userSettings)
                    .map(([settingType,settingTypeValue],i)=>{    // settings category and the concrete option (settingTypeValue)
                        return (
                            <MDBCol key={i}>
                                <MDBJumbotron>
                                    <div className="category-header flex-row">
                                        <h4 className="h5 display-5">{settingType}</h4>
                                        <div id="save-button"><MDBBtn size="sm" onClick={() => handleSave(settingType)}  color="light">
                                            <MDBIcon far icon="save" />Save</MDBBtn>
                                        </div>
                                    </div>
                                    <div className="preferences">
                                        <MDBListGroup style={{ width: "27rem" }}>
                                            
                                            {/* MAP OVER ALL CATEGORY OPTIONS */}
                                            {Object.entries(settingTypeValue).map(([option,optionValue],i)=>{
                                                return (
                                                    <MDBListGroupItem key={i} className={(typeof(optionValue.val) === "boolean")?"reverse":''}>
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
            <div id="save-button"><MDBBtn onClick={handleSave} color="success"><MDBIcon icon="save" />Save</MDBBtn></div>
        </MDBContainer>
    )
}

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
      notifications: reduxState.notifications,
      userSettings: reduxState.userSettings
    }
}
  
export default connect(mapStateToProps)(Preferences)
