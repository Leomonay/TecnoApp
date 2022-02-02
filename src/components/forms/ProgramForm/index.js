import { useEffect, useState } from 'react'
import { PlantSelector } from '../../dropdown/PlantSelector.js'
import './index.css'
import { appConfig } from '../../../config'
import { useDispatch, useSelector } from 'react-redux'
import { getPrograms } from '../../../actions/planActions'
const {frequencies} = appConfig

export default function ProgramForm(props){
    const {selection, year, save, onClose}=props
    const fullProgramList = useSelector(state => state.plan.programList)
    const [programList, setProgramList] = useState(props.programList)
    const [planProgram, setPlanProgram] = useState({})
    const [program, setProgram] = useState(undefined)
    const dispatch = useDispatch()

    useEffect(()=>setProgramList(fullProgramList),[fullProgramList])

    function selectProgram(name){
        const program = programList.find(program=>program.name===name)
        setPlanProgram(program?
            {name:name, year: program.year, plant: program.plant}
            :undefined)
        setProgram(program)
    }

    function setProgramItem(item, value){
        const newProgram = {...planProgram}
        if (value==='') {
            delete newProgram[item]
        }else{
            newProgram[item]=value
        }
        setPlanProgram(newProgram)
    }
    
    function handlePlant(value){
        const newProgram = {...planProgram}
        newProgram.plant = value
        newProgram.device = selection.filter(dev=>dev.plant === value).map(dev=>dev.code)
        dispatch(getPrograms({plant:value, year:year}))
        setPlanProgram(newProgram)
    }

    function handleSubmit(e){
        e.preventDefault()
        save && save({device:selection.map(dev=>dev.code), program:planProgram})
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
                        <div key={index} className={`${planProgram.plant&&planProgram.plant!==device.plant&&'discard'}`}>
                            {`(${device.code}) ${device.name}
                            - ${device.power.magnitude>7500 ? 
                                Math.floor(device.power.magnitude/3000)+' TR':
                                device.power.magnitude+' Frigorías'}
                            `}
                            {planProgram.plant&&planProgram.plant!==device.plant&&
                            <div className='errorMessage'>Este equipo no pertenece a esa planta</div>
                            }
                        </div>)}
                </div>

                <div className='section'>
                    {!props.plant && <PlantSelector select={(value)=>handlePlant(value)}/>}
                    {!planProgram.plant && <div className='errorMessage'>Debe seleccionar uno</div>}
                </div>

                <div className='section'>
                    <label className='formLabel'>Programa</label>
                    <select className='midDropDown'
                        disabled={!planProgram.plant || planProgram.plant===''}
                        onChange={(e)=>selectProgram(e.target.value)}>
                        <option value=''>Sin Seleccionar</option>
                        {programList && programList.map(program=>program.name).map((name, index)=>
                            <option key={index} value={name}>{name}</option>
                        )}
                    </select>
                    {!planProgram.name && <div className='errorMessage'>Debe seleccionar uno</div>}
                </div>

                <div>
                    <label className='formLabel'>Frecuencia</label>
                    <select className='midDropDown'
                        defaultValue={'48'}
                        disabled={!planProgram.name || planProgram.name===''}
                        onChange={(event)=>setProgramItem('frequency', Number(event.target.value))}
                        >
                        {frequencies.map((element, index)=>
                        <option key={index} value={element.weeks}>{element.frequency}</option>)}
                    </select>
                </div>

                <div className='section'>
                    <label className='formLabel'>Responsable</label>
                    <select className='midDropDown' 
                        disabled={!planProgram.name || planProgram.name===''}
                        onChange={(e)=>{
                        const worker = program.people.find(worker=>worker.id===Number(e.target.value))
                        setProgramItem( 'responsible' , (worker ?
                            {id:worker.id , name:worker.name}
                            : '' ) )
                    }}>
                        <option value=''>Sin Seleccionar</option>
                        {program&&program.people.map( (worker, index) =>
                            <option key={index} value={worker.id}>{worker.name}</option>
                        )}
                    </select>
                </div>

                <div className='section'>
                        <label className='formLabel'>Comentarios</label>
                        <textarea className='planComments'
                            onChange={(e)=>setProgramItem('observations',e.target.value)}/>
                    </div>
                
                <div className='section' style={{justifyContent:'center'}}>
                    <button className={planProgram.name?undefined:'disabledButton'}
                        type='submit'
                        disabled={!planProgram.name}>
                        GUARDAR PLAN
                    </button>
                </div>
            </form>
        </div>
    )
}