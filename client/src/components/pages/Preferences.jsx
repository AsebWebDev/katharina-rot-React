import React, { useState } from 'react';
import { connect } from 'react-redux';
import { MDBJumbotron, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem } from "mdbreact";
import Button from '@material-ui/core/Button';
import { newNotification } from '../../actioncreators'
import Option from '../Option'
import api from '../../api';
import '../../styles/Preferences.scss'

function Preferences(props) {
    const localStorageUser = (localStorage.getItem('user') != null)
        ? JSON.parse(localStorage.getItem('user'))
        : null
    
    let {dispatch} = props;
    let [userSettings, setUserSettings] = useState(props.userSettings)
    
    let handleChange = (e, val, settingType, option) => {
        let settings = { ...userSettings } // new User Settings need to be called "settings", because dispatch is asking for this wording
        settings[settingType][option].val = val
        setUserSettings(settings)
        dispatch({ type: "UPDATE_USER_SETTINGS", settings})     
    }

    let handleSave = (settingType) => {
        api.saveUserSettings(localStorageUser._id, userSettings, settingType )
        .then(settings => {
            dispatch({ type: "UPDATE_USER_SETTINGS", settings})
            dispatch(newNotification(`Your ${settingType}-Preferences have been updated`, 'Updated'))
            setUserSettings(settings)
        }).catch(err => dispatch(newNotification(err.toString())));
    }

    return (
        <MDBContainer id="preferences" className="create-page mt-5 text-center">
            <MDBRow>
                {/* MAP OVER ALL SETTING CATEGORIES */}
                {props.userSettings && Object.entries(props.userSettings)
                    .map(([settingType,settingTypeValue],i)=>{    // settings category and the concrete option (settingTypeValue)
                        return (
                            <MDBCol key={i}>
                                <MDBJumbotron>
                                    <div className="category-header flex-row">
                                        <h4 className="h5 display-5">{settingType}</h4>
                                        <div id="save-button">
                                            <Button size="small" onClick={() => handleSave(settingType)} color="primary">
                                                <MDBIcon far icon="save" />Save
                                            </Button>
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
            <div id="save-button"><Button onClick={() => handleSave('Global')} variant="outlined" color="primary"><MDBIcon icon="save" />Save all</Button></div>
        </MDBContainer>
    )
}

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
      notifications: reduxState.notifications,
      userSettings: reduxState.userSettings,
    }
}
  
export default connect(mapStateToProps)(Preferences)
