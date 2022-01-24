import { useEffect, useState } from 'react'
import DeviceOptions from '../../dropdown/DeviceOptions'
import { PlantSelector } from '../../dropdown/PlantSelector.js'
import './index.css'

export default function ProgramForm(props){
    const {selection, programList, year, save, onClose}=props
    const [planDevice, setPlanDevice]=useState({year: year, device:selection.map(e=>e.code)})

    useEffect(() => console.log('selection',selection), [selection])
    
    function setNewProgram(item, value){
        const newProgram = {...planDevice}
        if(value===''){
            delete newProgram[item]
            if(item==='program')delete newProgram.responsible
        }else{
            newProgram[item]= item === 'responsible'?
                programList.find(p=>p.name===planDevice.program).people.find(w=>w.name===value).id
                :value
        }
        setPlanDevice(newProgram)
    }

    function handlePlant(value){
        const newProgram = {...planDevice}
        newProgram.plant = value
        newProgram.device = selection.filter(dev=>dev.plant === value).map(dev=>dev.code)
        setPlanDevice(newProgram)
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(planDevice)
        save && save(planDevice)
        onClose && onClose()
    }

    return(
        <div className="modal">
            <form className='programForm' onSubmit={(e)=>handleSubmit(e)}>
                <button className='closeButton' onClick={()=>props.onClose()}>X</button>
                <div className='title'>Programar grupo de equipos</div>

                <b>Lista de Equipos</b>
                <div className='formItemList'>
                    {selection.map((device, index)=>
                        <div key={index} className={`${planDevice.plant&&planDevice.plant!==device.plant&&'discard'}`}>
                            {`(${device.code}) ${device.name}
                            - ${device.power.magnitude>7500 ? 
                                Math.floor(device.power.magnitude/3000)+' TR':
                                device.power.magnitude+' Frigorías'}
                            `}
                            {planDevice.plant&&planDevice.plant!==device.plant&&
                            <div className='errorMessage'>Este equipo no pertenece a esa planta</div>
                            }
                        </div>)}
                </div>

                <div className='section'>
                    {!props.plant && <PlantSelector select={(value)=>handlePlant(value)}/>}
                    {!planDevice.plant && <div className='errorMessage'>Debe seleccionar uno</div>}
                </div>

                <div className='section'>
                    <label className='formLabel'>Programa</label>
                    <DeviceOptions
                        className='midDropDown'
                        item='Seleccionar'
                        options={[...programList.map(e=>e.name)]}
                        defaultValue={undefined}
                        select={(program,event)=>setNewProgram('program', event.target.value)
                        }/>
                    {!planDevice.program && <div className='errorMessage'>Debe seleccionar uno</div>}
                </div>

                <b>El mes deberá asignarse manualmente en la pestaña "Calendario"</b>

                <div className='section'>
                    <label className='formLabel'>Responsable</label>
                    <DeviceOptions
                        className='midDropDown'
                        item='SIN ASIGNAR'
                        options={planDevice.program && planDevice.program!=='unassigned'?
                            programList.find(e=>e.name===planDevice.program).people.map(e=>e.name)
                            :[]}
                        defaultValue={'SIN ASIGNAR' }
                        disabled={!!planDevice.program}
                        select={(item,event)=>setNewProgram('responsible',event.target.value)}
                    />
                </div>

                <div className='section'>
                        <label className='formLabel'>Comentarios</label>
                        <textarea className='planComments'
                            onChange={(e)=>setNewProgram('observations',e.target.value)}/>
                    </div>
                
                <div className='section' style={{justifyContent:'center'}}>
                    <button className={planDevice.program?undefined:'disabledButton'}
                        type='submit'
                        disabled={!planDevice.program}>
                        GUARDAR PLAN
                    </button>
                </div>
            </form>
        </div>
    )
}