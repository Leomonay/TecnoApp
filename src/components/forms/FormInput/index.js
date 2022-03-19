import './index.css'
import {appConfig} from "../../../config"
const {headersRef} = appConfig

export function FormInput(props){
    const {label, type, disabled, defaultValue, min, max, step, changeInput, name, readOnly, placeholder}=props
    return(
        <div className='input-group'>
            <span className="input-group-text col-3 ps-1 pe-1 is-flex justify-content-center" style={{minWidth: 'fit-content'}}>
                {headersRef[label] || label}
            </span>
            <input className="form-control"
                disabled={disabled}
                defaultValue={defaultValue}
                readOnly={readOnly}
                placeholder={placeholder}
                type={type ||'text'}
                name={name}
                min={type==='number' ? min : undefined}
                max={type==='number' ? max : undefined}
                step={type==='number' ? step : undefined}
                onChange={(e)=>changeInput&&changeInput(e)}/>
        </div>
    )
}

export function FormSelector(props){
    const {label, defaultValue, valueField, name, captionField, options, onSelect, readOnly, disabled}=props
    return(
        <div className='input-group'>
            <label className="input-group-text col-3 ps-1 pe-1 is-flex justify-content-center" style={{minWidth: 'fit-content'}}>
                {headersRef[label] || label}
            </label>
            <select className="form-select" name={name}
                defaultValue={defaultValue} readOnly={readOnly}
                disabled={disabled}
                onChange={(e)=>onSelect && onSelect(e)}>
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
                <label className="formFieldLabel" style={{height: '100%'}}>{headersRef[label] || label}</label>
                {children}
            </div>
        </div>
        )
}

export function FormTextArea({label, disabled, defaultValue, changeInput, name, readOnly, placeholder}){
    // const {label, disabled, defaultValue, changeInput, name, readOnly, placeholder}=props
    return(
        <div className='input-group'>
            <span className="input-group-text col-3 ps-1 pe-1 is-flex justify-content-center" style={{minWidth: 'fit-content'}}>
                {headersRef[label] || label}
            </span>
            <textarea className="form-control"
                disabled={disabled}
                defaultValue={defaultValue}
                readOnly={readOnly}
                placeholder={placeholder}
                type={'text'}
                name={name}
                onChange={(e)=>changeInput&&changeInput(e)}/>
        </div>
    )
}
