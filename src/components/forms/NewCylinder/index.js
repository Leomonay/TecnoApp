import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './index.css'
import { ButtonPad, FormInput, FormSelector } from "../FormInput";
import { addCylinder, updateCylinder } from "../../../actions/StoreActions.js";

const NewCylinder = ({cylinder, onClose, statuses}) => {
  const dispatch = useDispatch();
  const [inputCylinder, setInputCylinder] = useState({...cylinder} || {})
  const { workers, refrigerants } = useSelector((state) => state.adminCylinders);
  const [errors, setErrors] = useState(true);
  const [ableStatuses, setStatuses] = useState(['Seleccionar Destino'])
  const [alarm, setAlarm] = useState(false)
  
  const handleChange = (event) => {
    event.preventDefault()
    setAlarm(false)
    const {name, value} = event.target
    const cylinder = {...inputCylinder}
    value? cylinder[name] = value : delete cylinder[name]
    let errorList = []
    if(!cylinder.code) errorList.push('Falta ingresar código')
    if(!cylinder.refrigerant) errorList.push('Falta ingresar refrigerante')
    if( name === 'assignedTo' ) delete cylinder.status
    if(!cylinder.initialStock) errorList.push('Falta asignar peso inicial')
    if(!cylinder.status) errorList.push('Falta asignar estado')
    setErrors(errorList[0] ? errorList : false)
    setInputCylinder(cylinder)
  };

  //Función para agregar una garrafa
  const handleSubmitCylinder = async (event) => {
    event.preventDefault();
    if(errors[0]){
      setAlarm(true)
    }else if (inputCylinder.id){
      dispatch(updateCylinder(inputCylinder))
    }else{
      dispatch(addCylinder(inputCylinder))
    }
  };

  useEffect(()=>setStatuses( inputCylinder.assignedTo ?
    statuses.filter( e => e !== "Nueva")
    :statuses.filter(e=>e !== "En uso")),[inputCylinder.assignedTo, statuses])

  //Fin de la función para agregar una garrafa

  const handleClose = () => {
    setInputCylinder({})
    onClose(false);
  };

  return (
    <div className="formModal">
      <form onSubmit={(e) => handleSubmitCylinder(e)} id="addCylinder" className="formBody" style={{alignItems: 'center'}}>
        <div className="section">
          <div className="formTitle" style={{marginTop: '1rem'}}>Agregar nueva garrafa</div>
          <button className='button closeButton' style={{margin: '0'}} onClick={() => handleClose()}>X</button>
        </div>
        
        <FormInput label='Código' changeInput={(e)=>handleChange(e)} name='code'
          defaultValue={inputCylinder.code} placeholder="Ingrese el código..."/>
        
        <FormSelector label='Freon' name='refrigerant' options={refrigerants}
          valueField='id'
          defaultValue={inputCylinder.refrigerant} 
          captionField='refrigerante'
          disabled={!inputCylinder.code}
          onSelect={(e) => handleChange(e)}/>
        
        <FormInput label='Peso Inicial' name="initialStock"
          defaultValue={inputCylinder.initialStock} 
          type='number' min='0' max='16' step='.1' placeholder='Peso [kg]'
          disabled={!inputCylinder.refrigerant}
          changeInput={(e)=>handleChange(e)}/>
        
        {inputCylinder.currentStock && <FormInput label='Peso Actual' name="currentStock"
          defaultValue={inputCylinder.currentStock} 
          type='number' min='0' max='16' step='.1' placeholder='Peso [kg]'
          disabled={!inputCylinder.refrigerant}
          changeInput={(e)=>handleChange(e)}/>}

        <FormSelector key={workers.length} label='Destino' name="assignedTo" valueField='id' captionField='name'
          defaultValue={inputCylinder.assignedTo}
          disabled={!inputCylinder.initialStock}
          options={workers}
          onSelect={(e) => handleChange(e)}/>
        
        <ButtonPad temp={ableStatuses.length >1 ? '1-1-1-1' : '1-3'} label='Estado' key={inputCylinder.status || 0}>
          {ableStatuses && ableStatuses.map(value=>
            <button className={`cylinderStatus ${inputCylinder.status===value && 'selectedCylinderStatus'} `}
            disabled={!inputCylinder.initialStock}
            name={'status'}
            value={value}
            onClick={(e)=>handleChange(e)}>{value}</button>)}
        </ButtonPad>
        
        <div className="formField">
          <button className='button' type='submit' disabled={!inputCylinder.status}>GUARDAR GARRAFA</button>
        </div>
        {alarm && <div class="alert alert-danger" role="alert">
          {errors.join(' - ')}
        </div>}
      </form>
    </div>
  );
};

export default NewCylinder;
