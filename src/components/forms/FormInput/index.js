import './index.css'
import {appConfig} from "../../../config"
const {headersRef} = appConfig


export function FormInput(props){
    const {label, type, disabled, defaultValue, min, max, step, changeInput, name, readOnly, placeholder}=props
    return(
        <div className='formField'>
            <label className="formFieldLabel">{label}</label>
            <input className="formFieldInput"
                disabled={disabled}
                defaultValue={defaultValue}
                readOnly={readOnly}
                placeholder={placeholder}
                type={type ||'text'}
                name={name}
                min={type==='number' && min}
                max={type==='number' && max}
                step={type==='number' && step}
                onChange={(e)=>changeInput&&changeInput(e)}/>
        </div>
    )
}

export function FormSelector(props){
    const {label, defaultValue, valueField, name, captionField, options, onSelect, readOnly, disabled}=props
    return(
        <div className='formField'>
            <label className="formFieldLabel">{headersRef[label] || label}</label>
            <select className="formFieldInput" name={name} defaultValue={defaultValue} readOnly={readOnly}
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

export function ButtonPad({label, temp,children}){
    const template = temp.split('-').join('fr ')+'fr'

    return(
        <div className='formField'>
            <div className='buttonPad' style={{gridTemplateColumns: template}}>
                <label className="formFieldLabel">{headersRef[label] || label}</label>
                {children}
            </div>
        </div>
        )
}