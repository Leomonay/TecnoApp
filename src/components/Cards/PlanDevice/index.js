import { useEffect } from 'react'
import { useState } from 'react'
import { appConfig } from '../../../config'
import { FormInput, FormSelector } from '../../forms/FormInput'
import './index.css'
const {frequencies} = appConfig

export default function PlanDevice(props){
    const {onSave, programs, device} = props
    const [startProgram, setStartProgram] = useState(device.strategy) // programa en el equipo
    const [program, setProgram] = useState(device.strategy?
        programs.find(program=>program.name===device.strategy.name)
        :undefined) //programa elegido de la lista de programas
    const [newProgram, setNewProgram] = useState(device.strategy) // programa nuevo
    const [save, setSave]=useState(false)

    useEffect(()=>setSave( !( JSON.stringify(startProgram) === JSON.stringify(newProgram) ) )
    ,[startProgram,newProgram])
    
    useEffect(()=>setStartProgram( device.strategy ),[device.strategy])
   
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
        setStartProgram(program)
    }

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
                    <div className='deviceItems wrap'>
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
                        <FormSelector label={'Programa'} onSelect={(e)=>handleProgram(e.target.value)}
                            defaultValue={newProgram? newProgram.name : undefined}
                            options={programs ? programs.map(p=>p.name) : []}/>
                    </div>

                    <div className='section justifyCenter'
                        key={newProgram && newProgram.responsible?
                            newProgram.responsible.id+2
                            : 2}>
                        <FormSelector label={'Responsable'}
                            onSelect={(event)=>handleProperty('responsible', program.people.find(worker=>worker.id === Number(event.target.value) ))}
                            defaultValue={newProgram? newProgram.responsible && newProgram.responsible.id : undefined}
                            valueField={'id'}
                            captionField={'name'}
                            options={program ? program.people : []}/>
                    </div>

                    <div className='section justifyCenter'>
                        <FormInput label={'Costo(mU$S)'}
                            defaultValue={newProgram? newProgram.cost : 0}
                            changeInput={(e)=>handleProperty('cost', Number(e.target.value) )}/>
                    </div>

                    <div className='section justifyCenter'
                        key={newProgram && newProgram.frequency?
                            newProgram.frequency+4
                            : 4}
                            >
                        <FormSelector label={'Frecuencia'} onSelect={(e)=>handleProperty('frequency', Number(e.target.value))}
                            defaultValue={newProgram ? newProgram.frequency : undefined}
                            valueField={'weeks'}
                            captionField={'frequency'}
                            options={frequencies}
                        />
                    </div>

                </div>

                <div className='devicePlanComments'>
                    <label className='formLabel'>Comentarios</label>
                    <textarea className='planComments'
                        onBlur={(e)=>handleProperty('observations',e.target.value)}
                        defaultValue={newProgram && newProgram.observations}
                        />
                </div>
                {save&&<button className='button saveButton' onClick={()=>handleSave()}>GUARDAR</button>}
            </div>
        </div>
    )
}