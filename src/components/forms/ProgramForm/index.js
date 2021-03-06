import { useEffect, useState } from 'react'
import { PlantSelector } from '../../dropdown/PlantSelector.js'
import './index.css'
import { appConfig } from '../../../config'
import { useDispatch, useSelector } from 'react-redux'
import { getStrategies } from '../../../actions/planActions'
import { FormSelector } from '../FormInput/index.js'
const {frequencies} = appConfig

export default function ProgramForm(props){
    const {selection, save, onClose}=props
    
    const {plant, year} = useSelector(state=>state.data)
    const fullProgramList = useSelector(state => state.plan.programList) // allPrograms

    const [programList, setProgramList] = useState(props.programList) //filtered Program List
    const [planProgram, setPlanProgram] = useState({})
    const [program, setProgram] = useState({})
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
    
    useEffect(()=>{
        if(!(plant && year && selection))return
        const newProgram = {plant}
        newProgram.device = selection.filter(dev=>dev.plant === plant).map(dev=>dev.code)
        dispatch(getStrategies({plant, year}))
        setPlanProgram(newProgram)
    },[plant,selection,year,dispatch])

    function handlePeople(e){
        e.preventDefault()
        const worker = program.people.find(worker=>worker.id===Number(e.target.value))
        setProgramItem( 'responsible' , (worker ? {id:worker.id , name:worker.name} : '' ) )
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
                                device.power.magnitude+' Frigor??as'}
                            `}
                            {planProgram.plant&&planProgram.plant!==device.plant&&
                            <div className='errorMessage'>Este equipo no pertenece a esa planta</div>
                            }
                        </div>)}
                </div>

                <PlantSelector key={plant}/>
                {!planProgram.plant && <div className='errorMessage'>Debe seleccionar una planta</div>}

                <FormSelector label='Programa' defaultValue={program.name}
                    options={programList?programList.map(p=>p.name):[]}
                    disabled={!planProgram.plant}
                    onSelect={(e)=>selectProgram(e.target.value)}/>
                {!planProgram.name && <div className='errorMessage'>Debe seleccionar un programa</div>}

                <FormSelector label='Frecuencia' defaultValue={program.name}
                    options={frequencies || []}
                    disabled={!planProgram.name}
                    valueField={'weeks'}
                    captionField={'frequency'}
                    onSelect={(e)=>setProgramItem('frequency', Number(e.target.value))} />
                {!planProgram.frequency && <div className='errorMessage'>Debe seleccionar una frecuencia</div>}

                <FormSelector label='Responsable' defaultValue={program.name}
                    options={program? program.people : []}
                    disabled={!planProgram.frequency}
                    valueField={'id'}
                    captionField={'name'}
                    onSelect={(e)=>handlePeople(e)} />
                {!planProgram.responsible && <div className='errorMessage'>Debe seleccionar un responsable</div>}

                <div className='section'>
                        <label className='formLabel'>Comentarios</label>
                        <textarea className='planComments'
                            placeholder='Descripci??n o resumen de actividades, recomendaciones, etc.'
                            onBlur={(e)=>setProgramItem('observations',e.target.value)}/>
                    </div>
                
                <div className='section' style={{justifyContent:'center'}}>
                    <button className='button'
                        type='submit'
                        disabled={!planProgram.name}>
                        GUARDAR PLAN
                    </button>
                </div>
            </form>
        </div>
    )
}