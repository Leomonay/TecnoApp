import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlantName, setYear } from '../../../actions/dataActions.js'
import { PlantSelector } from '../../../components/dropdown/PlantSelector.js'
import { FormSelector } from '../../../components/forms/FormInput/index.js'
import PlanCalendar from '../../../components/plan/Calendar'
import ProgramManagement from '../../../components/plan/ManagePrograms'
import PlanTask from '../../../components/plan/Tasks'
import './index.css'

export default function AdminPlan(){
    const steps = ['Acciones', 'Calendario', 'Programas']
    const {plant, year} = useSelector(state=>state.data)
    
    const [step, setStep] = useState(steps[0])
    const [years, setYears] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        const thisYear = (new Date()).getFullYear()
        let years = []
        for (let i = 2020; i<= thisYear+1; i++){
            years=([...years, i])
        }
        setYears(years)
    },[])
    
    return(
        <div className='adminOptionSelected'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3'>
                        <PlantSelector select={(value)=>dispatch(setPlantName(value))}/>
                    </div>
                    <div className='col-md-3'>
                        <FormSelector label='Año' name='year'
                            defaultValue={''+year}
                            options={years}
                            onSelect={(e)=>dispatch(setYear(e.target.value))}/> 
                    </div>
                </div>
            </div>

            <div className="navButtons">
                {steps.map((option, index)=>
                    <button key={index}
                        className="navButton"
                        onClick={()=>setStep(option)}
                        value='actions'>{option}</button>)}
            </div>
            {step===steps[0]&&<PlanTask year={year}/>}
            {step===steps[1]&&<PlanCalendar plant={plant} year={year} key={plant+year}/>}
            {step===steps[2]&&<ProgramManagement plant={plant}/>}
        </div>
    )
}