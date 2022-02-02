import { useEffect } from 'react'
import { useState } from 'react'
import { appConfig } from '../../../config'
import './index.css'
const {frequencies} = appConfig

export default function PlanDevice(props){
    const {onSave, programs, device} = props
    const [startProgram, setStartProgram] = useState(device.program) // programa en el equipo
    const [program, setProgram] = useState(device.program?
        programs.find(program=>program.name===device.program.name)
        :undefined) //programa elegido de la lista de programas
    const [newProgram, setNewProgram] = useState(device.program) // programa nuevo
    const [save, setSave]=useState(false)

    useEffect(()=>setSave( !( JSON.stringify(startProgram) === JSON.stringify(newProgram) ) )
    ,[startProgram,newProgram])
    
    useEffect(()=>setStartProgram( device.program ),[device.program])
   
    function handleProperty(key, value){
        let program = {...newProgram}
        if (value === ''){
            delete program[key]
        }else{
            if(!program) program = {}
            program[key]=value
        }
        setNewProgram(program)
    }

    function handleProgram(value){
        const program = programs.find(program=>program.name===value)
        setProgram(program)
        setNewProgram(value==='' ?
            undefined :
            {name: value, year:program.year, plant:program.plant})
    }

    function DeviceItem(props){
        const {color, title, value, font}=props
        return(
            <div className={`iconFrame`} style={{background: color}}>
                <div className='iconTitle' style={{fontSize:'70%'}}>{title}</div>
                <div className='iconValue inner' style={{fontSize:font}}>{value}</div>
            </div>
        )
    }

    function handleSave (){
        let program = {...newProgram}
        if (!program.frequency) program.frequency=48
        onSave({device: [device.code], program})
    }

    // useEffect(()=>console.log('newProgram',newProgram),[newProgram])

    return(
        <div className='deviceListLI'>
            <input type='checkbox'
                className='planListCheck'
                id={device.code}
                defaultChecked={props.checked}
                onChange={(e)=>props.onCheck(e)}
                />
            <div className='deviceCard'>
                <div className='deviceCardColumn'>
                    <div className='wrap section'>
                        <b>{device.name}</b>
                        {` (${device.type} ${device.power>7500?
                            Math.floor(device.power/3000)+'TR'
                            :device.power+'Frig'}
                            ${device.refrigerant})`}
                        
                    </div>
                    <div className='deviceData'>
                        <b>{`${device.plant} > ${device.area} > ${device.line}`}</b>
                    </div>
                    <div className='deviceItems'>
                        <DeviceItem title='CATEGORIA' value={device.category} color='paleturquoise' font='70%'/>
                        <DeviceItem title='AMBIENTE'  value={device.environment} color='peachpuff' font='70%'/>
                        <DeviceItem title='SERVICIO' value={device.service} color='lavender' font='70%'/>
                        <DeviceItem title='ESTADO' value={device.status} color='lightgreen' font='70%'/>
                        <DeviceItem title='ANTIGÜEDAD' 
                            value={device.age+' años'}
                            color='lavenderblush'
                            font='90%'/>
                        <DeviceItem title='RECLAMOS' value={device.reclaims} color='salmon' font='90%'/>
                    </div>
                </div>
                <div className='deviceCardColumn'
                    key={newProgram && newProgram.name?
                        newProgram.name.length+1
                        : 1}>
                    <div className='section justifyCenter'>
                        <label className='formLabel'>Programa</label>
                        <select className='midDropDown'
                            defaultValue={newProgram && newProgram.name}
                            onChange={(event)=>handleProgram(event.target.value)}>
                            <option value=''>Sin Seleccionar</option>
                            {programs && programs.map( (program, index)=>
                                <option key={index} value={program.name}>{program.name}</option>
                            )}
                        </select> 
                    </div>

                    <div className='section justifyCenter'
                        key={newProgram && newProgram.responsible?
                            newProgram.responsible.id+2
                            : 2}>
                        <label className='formLabel'>Responsable</label>
                        <select className='midDropDown' 
                            onChange={(event)=>handleProperty(
                                'responsible', 
                                program.people.find(worker=>worker.id === Number(event.target.value) )
                                )}
                            defaultValue={(newProgram && newProgram.responsible)?
                                ''+newProgram.responsible.id
                                :''}>
                            <option value=''>Sin Asignar</option>
                            {program && program.people.map(worker=>
                                <option key={worker.id} value={worker.id}>{worker.name}</option>
                            )}
                        </select>
                    </div>

                    <div className='section justifyCenter'
                        key={newProgram && newProgram.cost?
                            newProgram.cost+3
                            : 3}>
                        <label className='formLabel'>Costo(mU$S)</label>
                        <input type='number' className='midDropDown' min='0'
                            value={newProgram && newProgram.cost}
                            onChange={(e)=>handleProperty('cost', Number(e.target.value) )}/>
                    </div>

                    <div 
                        key={newProgram && newProgram.frequency?
                            newProgram.frequency+4
                            : 4}
                            >
                        <label className='formLabel'>Frecuencia</label>
                        <select className='midDropDown'
                            defaultValue={(newProgram && newProgram.frequency) || '48'}
                            onChange={(event)=>handleProperty('frequency', Number(event.target.value))}
                            >
                            {frequencies.map((element, index)=>
                            <option key={index} value={element.weeks}>{element.frequency}</option>)}
                        </select>
                    </div>

                </div>

                <div className='devicePlanComments'>
                    <label className='formLabel'>Comentarios</label>
                    <textarea className='planComments'
                        onChange={(e)=>handleProperty('observations',e.target.value)}
                        defaultValue={newProgram && newProgram.observations}
                        />
                </div>
                {save&&<button className='saveButton' onClick={()=>handleSave()}>GUARDAR</button>}
            </div>
        </div>
    )
}