import './index.css'
import {appConfig} from "../../../config"
const {headersRef} = appConfig


export function FormInput(props){
    const {label, defaultValue, changeInput, readOnly,placeholder}=props
    return(
        <div className='formField'>
            <label className="formFieldLabel">{label}</label>
            <input className="formFieldInput" defaultValue={defaultValue} readOnly={readOnly} placeholder={placeholder}
                onChange={(e)=>changeInput&&changeInput(e)}/>
        </div>
    )
}

export function FormSelector(props){
    const {label, defaultValue, valueField, captionField, options, onSelect, readOnly, disabled}=props
    return(
        <div className='formField'>
            <label className="formFieldLabel">{headersRef[label] || label}</label>
            <select className="formFieldInput" defaultValue={defaultValue} readOnly={readOnly}
                disabled={disabled}
                onChange={(e)=>onSelect&&onSelect(e)}>
                <option value=''>Seleccionar</option>
                    {options && options.map((element,index)=>
                        <option value={valueField ? element[valueField]  : element} key={index}>
                            {captionField ? element[captionField] : element}
                        </option>)}
                </select>
        </div>
    )
}