import { useEffect } from 'react'
import { useState } from 'react'
import DeviceOptions from '../../dropdown/DeviceOptions'
import MonthPicker from '../../pickers/MonthPicker'
import './index.css'

export default function PlanDevice(props){
    const {onSave, programs} = props
    const [device, setDevice] = useState({...props.device})
    const power = device.power
    const [responsible, setResponsible] = useState(
        (device.program && device.program.responsible )?
            device.program.responsible.id
            :undefined)
    const [program, setProgram]=useState(device.program?
        programs.find(program=>program.name===device.program.name)
        :undefined)
    const [startDevice, setStartDevice] = useState({device:[device.code]})
    const [save,setSave]=useState(false)
    const [planDevice, setPlanDevice] = useState(startDevice)

    useEffect(()=>{
        const device = {...props.device}
        setDevice(device)
        },[props.device])
    
    useEffect(()=>{
        const startDetail = {}
        startDetail.device = [device.code]
        device.program&&Object.keys(device.program).map(key=>
            key==='date'? startDetail.month=(new Date(device.program.date)).getMonth()
            :key==='responsible'? startDetail.responsible=device.program.responsible.id
            :key==='name'? startDetail.program = programs.find(program=>program.name===device.program.name).name
            :startDetail[key]=device.program[key])
        setStartDevice(startDetail)
    },[device,programs])
    
    useEffect(()=>setPlanDevice(startDevice),[startDevice])    

    function handleResponsible(name){
        let newProgram = {...planDevice}
        if(name){
            const id = program.people.find(worker=>worker.name===name).id
            newProgram.responsible= id
            setResponsible(id)
        }else{
            setResponsible('')
            delete newProgram.responsible
        }
        setSave(JSON.stringify(newProgram)!==JSON.stringify(startDevice))
        setPlanDevice(newProgram)
    }
    
    function handleProgram(program){
        let newPlan = {...planDevice}
        if(!program){
            for (let field of ['program', 'year', 'plant'] ) delete (newPlan[field])
        }
        if(program){
            for (let field of ['year', 'plant']) newPlan[field]=program[field]
            newPlan.program=program.name
        }
        setResponsible('')
        delete newPlan.responsible
        setSave(JSON.stringify(newPlan)!==JSON.stringify(startDevice))
        setProgram(program)
        setPlanDevice(newPlan)
    }

    function setNewProgram(item,value){
        const newPlan = {...planDevice}
        if(value === '') {
            delete newPlan[item]
        }else{
            newPlan[item]=value
        }
        setSave(JSON.stringify(newPlan)!==JSON.stringify(startDevice))
        setPlanDevice(newPlan)
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
        setStartDevice(planDevice)
        setSave(false)
        onSave(planDevice)
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
                        {` (${device.type} ${power>7500?
                            Math.floor(power/3000)+'TR'
                            :power+'Frig'}
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
                <div className='deviceCardColumn'>
                    <div className='section justifyCenter'>
                        <label className='formLabel'>Programa</label>
                        <DeviceOptions
                            className='midDropDown'
                            item='Seleccionar'
                            options={programs && programs.map(program=>program.name)}
                            defaultValue={device.program && device.program.name}
                            select={(program,event)=>
                                handleProgram(programs.find(program=>
                                    program.name===event.target.value))
                            }/>
                    </div>

                    <div className='section justifyCenter'>
                        <label className='formLabel'>Responsable</label>
                    <DeviceOptions
                        className='midDropDown'
                        item='SIN ASIGNAR'
                        options={program? program.people.map(e=>e.name):[]}
                        value={(program && responsible)? program.people.find(e=>e.id===responsible).name : ''}
                        disabled={!!planDevice.program}
                        select={(item,event)=>handleResponsible(event.target.value)}
                    />
                    </div>
                    <div className='section justifyCenter'>
                        <label className='formLabel'>Costo(mU$S)</label>
                        <input type='number' className='midDropDown' min='0'
                            defaultValue={planDevice.cost}
                            onChange={(e)=>setNewProgram('cost', Number(e.target.value) )}/>
                    </div>
                </div>
                <div className='sideMonthPicker'>
                    <label className='formLabel'>Calendario</label>
                    <MonthPicker select={(value)=>setNewProgram('month', Number(value) )}
                        selected={planDevice.month}/>
                </div>
                <div className='sideMonthPicker'>
                    <label className='formLabel'>Comentarios</label>
                    <textarea className='planComments'
                        onChange={(e)=>setNewProgram('observations',e.target.value)}
                        defaultValue={startDevice.observations}
                        />
                </div>
                {save&&<button className='saveButton' onClick={()=>handleSave(planDevice)}>GUARDAR</button>}
            </div>
        </div>
    )
}