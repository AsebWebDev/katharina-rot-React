import React, { useState, useEffect } from 'react';
import { MDBInput } from "mdbreact";

export default function Option(props) {
    const { handleChange } = props
    let [optionVal, setOptionVal] = useState(props.optionValue.val)
    const option = props.option
    const settingType = props.settingType

    useEffect(() => {
        setOptionVal(props.optionValue.val)
    }, [props.optionValue.val])

    switch (typeof(optionVal)) {
        case 'number' : return ( 
            <MDBInput 
                type="number"
                onChange={(e) => handleChange(e, Number(e.target.value), settingType, option)}
                label={optionVal ? '' : 'Enter Number...'} 
                value={optionVal ? optionVal : ''} 
                size="sm" 
            />
        );

        case 'string' : return ( 
            <select 
                className="browser-default custom-select" 
                onChange={(e) => handleChange(e, e.target.value, settingType, option)}>
                <option>Choose your option</option>
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
                <option value="Winter">Winter</option>
            </select>
        );

        case 'boolean' : return ( 
            <input 
                onChange={(e) => handleChange(e, e.target.checked, settingType, option)}
                checked={optionVal}
                type="checkbox"
            />
        ); 

        default: return ( <div><p>options</p></div> ); 
    }
}
