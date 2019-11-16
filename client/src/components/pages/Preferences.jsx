import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInputGroup, MDBListGroup, MDBListGroupItem } from "mdbreact";
import Option from '../Option'
import '../../styles/Preferences.scss'

function Preferences(props) {

    let [userSettings, setUserSettings] = useState(
        (localStorage.getItem('user') != null)
        ? JSON.parse(localStorage.getItem('user')).settings
        : null
    )
    console.log("TCL: Preferences -> userSettings INITIAL", userSettings)
    useEffect(() => {
        console.log("UseEffect")
    }, [userSettings])

    let parseType = (val, type) => {
        switch (type){
            case "number": return Number(val);
            case "boolean": return !val;
            default: return val;
        }
    }

    let handleChange = (e, val, settingType, option) => {
        e.preventDefault();
        let newUserSettings = { ...userSettings }
        newUserSettings[settingType][option].val = val
        setUserSettings(newUserSettings)        
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
                                    <h4 className="h5 display-5">{settingType.toString()}</h4>
                                    <div className="preferences">
                                        <MDBListGroup style={{ width: "27rem" }}>
                                            
                                            {/* MAP OVER ALL CATEGORY OPTIONS */}
                                            {Object.entries(settingTypeValue).map(([option,optionValue])=>{
                                                return (
                                                    <MDBListGroupItem>
                                                        <div>{optionValue.name} : </div>       
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
