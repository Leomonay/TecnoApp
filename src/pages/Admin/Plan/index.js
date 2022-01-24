import { useEffect, useState } from 'react'
import { PlantSelector } from '../../../components/dropdown/PlantSelector.js'
import PlanCalendar from '../../../components/plan/Calendar'
import ProgramManagement from '../../../components/plan/ManagePrograms'
import PlanTask from '../../../components/plan/Tasks'
import './index.css'

export default function AdminPlan(){
    const steps = ['Acciones', 'Calendario', 'Programas']
    const [plant, setPlant] = useState('')
    const [step, setStep] = useState(steps[0])
    const thisYear = (new Date()).getFullYear()
    const [years, setYears] = useState([])
    const [year, setYear] = useState(thisYear)

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
            <div className='section'>
                <PlantSelector select={(value)=>setPlant(value)}/>
                <label  className='formLabel short'>Año</label>
                {years[0] && <select defaultValue={thisYear} onChange={(event)=>setYear(event.target.value)}>
                    {years.map( (year, index)=>
                        <option key={index} value={year}>{year}</option>
                    )}
                </select>}
            </div>

            <div className="navButtons">
                {steps.map((option, index)=>
                    <button key={index}
                        className="navButton"
                        onClick={()=>setStep(option)}
                        value='actions'>{option}</button>)}
            </div>
            {step===steps[0]&&<PlanTask plant={plant} year={year}/>}
            {step===steps[1]&&<PlanCalendar plant={plant} year={year} key={plant+year}/>}
            {step===steps[2]&&<ProgramManagement plant={plant}/>}
        </div>
    )
}