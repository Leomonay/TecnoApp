import { useEffect, useState } from 'react'
import { colorByPercent } from '../../../utils/utils'
import './index.css'

export default function WOProgress(props){
    const {defaultValue,select, errorCond, disabled}=props
    const [value, setValue] = useState(props.defaultValue||'0')
    const [style,setStyle] = useState({})
    const [error,setError] = useState(false)

    useEffect(()=>setStyle({'--main-bg-color': colorByPercent(Number(value))}),[value])
    useEffect(()=>setValue(`${props.defaultValue}`),[props.defaultValue])

   
    function handleChange(e){
        const value = `${Math.max(Number(e.target.value), defaultValue)}`
        const obj = {target:{value: value},preventDefault:()=>{}}
        setError(e.target.value<=defaultValue)
        setValue(`${ Math.max(value, defaultValue) }`)
        select(obj)
    }

    return (
        <div className='barContainer'>
            <div className='barData'>
                <input className="WOProgress"
                    key={(style? JSON.stringify(style)[0]:0) }
                    type='range'
                    defaultValue={defaultValue || '0'}
                    onChange={(e)=>handleChange(e)}
                    disabled={disabled}
                    style={style}
                    />
                <label className='WOProgressValue'>{value}%</label>
            </div>
            {errorCond && error && <div className='errorMessage'>{`El avance debe ser mayor que el actual (${defaultValue}%).`}</div>}
        </div>
    )
}