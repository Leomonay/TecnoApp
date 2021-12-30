import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { cloneJson } from "../../../utils/utils"
import PeoplePicker from "../../pickers/PeoplePicker"
import './index.css'

export default function AddIntervention(props){
    const {workersList} = useSelector(state=>state.people)
    const [intervention, setIntervention]=useState({})
    const [freon, setFreon]=useState(false)
    const [errors, setErrors] = useState(false)

    useEffect(()=>{
        function checkIntervention(){
            let check = false
            check = !!(intervention.date && intervention.time && intervention.workers && intervention.workers.length>1 && intervention.task)
            if (intervention.refrigerant && intervention.refrigerant[0].cylinder){
                intervention.refrigerant.map(cyl=>(!cyl.cylinder || !cyl.init || !cyl.final)? check=false:'')
            }
            setErrors(check)
        }
        checkIntervention()
    },[intervention])

    function refrigerant(data){
        let gas = cloneJson(intervention.refrigerant || [])
        const {cylinder, init, final}=data
        if (cylinder) gas[data.index].cylinder = cylinder
        if (init) gas[data.index].init = init
        if (final) gas[data.index].final = final
        if (gas[data.index].init &&  gas[data.index].final){
            gas[data.index].total = gas[data.index].init - gas[data.index].final
            document.getElementById(`addIntTotalRefTotal${data.index}`).value= gas[data.index].total
        }
        setIntervention({...intervention, refrigerant: gas})
    }

    function addCylinder(){
        let gas = cloneJson(intervention.refrigerant)
        gas.push({})
        setIntervention({...intervention, refrigerant: gas})
    }
    function removeCylinder(index){
        let gas = cloneJson(intervention.refrigerant)
        gas = gas.filter((e,ind)=>ind!==index)
        gas.map((item,index)=>{
            document.getElementById(`addIntCylinder${index}`).value=item.cylinder
            document.getElementById(`addIntRefInit${index}`).value=item.init
            document.getElementById(`addIntRefFinal${index}`).value=item.final
            document.getElementById(`addIntTotalRefTotal${index}`).value=item.total
            return''
        })
        setIntervention({...intervention, refrigerant: gas})
    }

    function saveIntervention(){
        props.select(intervention)
        props.close()
    }

    function refrigerantCharges(){
        if (!freon && !intervention.refrigerant) setIntervention({...intervention,refrigerant:[{}]})
        if (freon && !intervention.refrigerant.find(e=>e.cylinder)){
            const temp = cloneJson(intervention)
            delete temp.refrigerant
            setIntervention(temp)
        }
        setFreon(!freon)
    }

    return(
        <div className='addInterventionForm'>
            <div className='formTitle'>
                <b>AGREGAR INTERVENCIÓN</b>
                <div className='button formCloseButton'
                    onClick={()=>props.close()}>X</div>
            </div>

            <div className='addInterventionSection'>

                <div className='addInterventionField'>
                    <b>Fecha</b>
                    <input className='formInterventionItemDate'
                        type='date'
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e)=>setIntervention({...intervention, date:e.target.value})}
                    />
                    {(!intervention.date) && <div className='errorMessage'>Debe ingresarse una fecha menor o igual que hoy.</div>}
                </div>

                <div className='addInterventionField'>
                    <b>Hora</b>
                    <input className='formInterventionItemHour'
                    type='time'
                    min='00:00'
                    max={intervention.date===(new Date().toISOString().split("T")[0])?
                        Date().toString().split(' ')[4].substring(0,5)
                        :'23:59'}
                    onChange={(e)=>setIntervention({...intervention, time:e.target.value})}
                    />
                    {(intervention.time)?
                        ( (intervention.date===(new Date().toISOString().split("T")[0]) && 
                            intervention.time > Date().toString().split(' ')[4].substring(0,5))?
                            <div className='errorMessage'>No puede indicar un horario futuro.</div>:
                            ''
                        )
                        :<div className='errorMessage'>Debe ingresar la hora.</div>
                        }
                </div>

                <div className='addInterventionField'>
                    <b>Personal</b>
                    <PeoplePicker name='Intervinientes'
                        options={workersList}
                        update={(idArray)=>setIntervention({...intervention, workers: idArray})}/>
                    {( (!intervention.workers) || intervention.workers.length<2) &&
                        <div className='errorMessage'>Debe ingresar al menos 2 personas.</div>}
                </div>
                
                <div className='addInterventionField'>
                    <b>Tarea Realizada</b>
                    <textarea className='longTextInput'
                        id='addInterventionTask'
                        onChange={(e)=>setIntervention({...intervention, task:e.target.value})}
                        />
                    {(!intervention.task) &&
                        <div className='errorMessage'>Este campo no puede quedar vacío.</div>}
                </div>

            </div>

            <div className='formTitle'>
                <div className={`formOpenSection ${freon?'closeSection':'openSection'}`}
                onClick={()=>refrigerantCharges()}
                >
                Gas</div>
            </div>
            
            {(freon && intervention.refrigerant) && intervention.refrigerant.map((refri,index)=>
            <div className='addInterventionSection' key={index}>
                <label>N° Garrafa:
                    <input
                        id={`addIntCylinder${index}`}
                        className='formInterventionRefrigerant'
                        onChange={(event)=>refrigerant({index: index, cylinder: event.target.value || 0})}/>
                </label>
                
                <label>Peso Inicial:
                    <input  className='formInterventionRefrigerant'
                        id={`addIntRefInit${index}`}
                        placeholder='gas (kg.)'
                        onChange={(event)=>refrigerant({index: index, init: Number(event.target.value) || 0})}
                        />
                        {(intervention.refrigerant && intervention.refrigerant[index].cylinder && !intervention.refrigerant[index].init) &&
                            <div className='errorMessage'>Ingrese cantidad en kg.</div>}
                    </label>
                
                <label>Peso Final:
                    <input  className='formInterventionRefrigerant'
                        id={`addIntRefFinal${index}`}
                        placeholder='gas (kg.)'
                        onChange={(event)=>refrigerant({index: index, final: Number(event.target.value) 
                            || (intervention.refrigerant && intervention.refrigerant.init)
                            || 0})}/>
                        {(intervention.refrigerant && intervention.refrigerant[index].cylinder && !intervention.refrigerant[index].final) &&
                            <div className='errorMessage'>Ingrese cantidad en kg.</div>}
                        </label>
                
                <label>Consumo: 
                    <input  className='formInterventionRefrigerant'
                        id={`addIntTotalRefTotal${index}`}
                        placeholder='gas (kg.)'/>
                                        {(intervention.refrigerant && intervention.refrigerant[index].cylinder && !intervention.refrigerant[index].total) &&
                        <div className='errorMessage'>Este campo se calcula solo</div>}
                </label>


                <button className='button addButton' onClick={()=>addCylinder()}><b>+</b></button>
                <button className='button removeButton' onClick={()=>removeCylinder(index)}/>
            </div>)}

            <div className='addInterventionSection'>
                {errors?
                    <button className='button'
                    onClick={()=>saveIntervention()}>
                        <b>AGREGAR INTERVENCIÓN</b></button>
                    :<button className='disabledButton'>
                        <b>AGREGAR INTERVENCIÓN</b></button>
                        }
            </div>
        </div>
    )

}