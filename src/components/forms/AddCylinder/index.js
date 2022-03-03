import { useEffect, useState } from "react"
import './index.css'

export default function AddCylinder(props){
    const {cylinderList, disabled, create} = props
    const [cylinder, setCylinder]=useState({})
    const [max,setMax]=useState(0)
    const [min]=useState(2.2)
    const [errors, setErrors] = useState(undefined)

    useEffect(() => console.log('FORM cylinderList', cylinderList), [cylinderList])
    

    function setCode(code){
        const cylinder = cylinderList.find(element=>element.code === code)
        setCylinder(code?cylinder:{})
        console.log('max', cylinder.currentStock)
        setMax(cylinder.currentStock)
    }

    function setInit(value){
        const amount = Number(value)
        const newCylinder = {...cylinder}
        delete newCylinder.final
        delete newCylinder.total
        if (amount>max){
            setErrors(`El peso inicial no puede superar el stock (${max} kg.)`)
            delete newCylinder.init
        }else if (amount<min) {
            setErrors(`El peso inicial no puede ser menor a ${min} kg.`)
            delete newCylinder.init            
        }else{
            setErrors(undefined)
            newCylinder.init = amount
        }
        setCylinder(newCylinder)
    }

    function setFinal(value){
        const amount = Number(value)
        const newCylinder = {...cylinder}
        delete newCylinder.total
        delete newCylinder.final
        if (amount>cylinder.init){
            setErrors(`El peso final no puede superar el peso inicial`)
        }else if (amount<min) {
            setErrors(`El peso final no puede ser menor a ${min} kg.`)
        }else{
            setErrors(undefined)
            console.log('amount', amount, 'init', newCylinder.init)
            newCylinder.final = amount
            newCylinder.total = (newCylinder.init - amount).toFixed(1)
        }
        setCylinder(newCylinder)
    }

    function handleClick(e){
        e.preventDefault()
        create && create(cylinder)
        setCylinder({})
    }

    return(
        <div className="formContainer">
            <form className="gasAISection">
                <select className='aIKGInput'
                    onChange={(event)=>setCode(event.target.value)}
                    disabled={disabled}
                    >
                    <option value=''>Elegir garrafa</option>
                    {cylinderList.map(cylinder=>{
                        return<option key={cylinder.code} value={cylinder.code}>
                            {`${cylinder.code} (${cylinder.owner})`}
                        </option>})}
                </select>

                <input type="number"
                    className='aIKGInput'
                    onChange={(event)=>setInit(event.target.value)}
                    defaultValue={cylinder.stock}
                    disabled={!cylinder.code}
                    placeholder='kg'
                    min={min}
                    max={max}
                    step={0.1}/>

                <input type="number"
                    className='aIKGInput'
                    onChange={(event)=>setFinal(event.target.value)}
                    defaultValue={cylinder.final}
                    disabled={!cylinder.init}
                    placeholder='kg'
                    min={min}
                    max={cylinder.init}
                    step={0.1}/>

                <input  className='aIKGInput'
                    readOnly={true}
                    defaultValue={cylinder.total}
                    placeholder='gas (kg.)'/>

                <div className='aIKGInput'>
                    <button className='addCylinder' onClick={(e)=>handleClick(e)} disabled={!cylinder.total}>Agregar</button>
                </div>
            </form>
            {errors && <div className="section">
                <div className="alert alert-warning" role="alert">
                    {errors}
                </div>
            </div>}
        </div>
    )
}