import { useState } from 'react'
import { PlantSelector } from '../../../components/dropdown/PlantSelector.js'
import PlanCalendar from '../../../components/plan/Calendar'
import ProgramManagement from '../../../components/plan/ManagePrograms'
import PlanTask from '../../../components/plan/Tasks'
import './index.css'

export default function AdminPlan(){
    const steps = ['Acciones', 'Personal', 'Calendario', 'Programas']
    const [plant, setPlant] = useState('')
    const [step, setStep] = useState(steps[0])

    return(
        <div className='adminOptionSelected'>
            <PlantSelector select={(value)=>setPlant(value)}/>
            <div className="navButtons">
                {steps.map((option, index)=>
                    <button key={index}
                        className="navButton"
                        onClick={()=>setStep(option)}
                        value='actions'>{option}</button>)}
            </div>
            <div className='pageContent'>
            {step===steps[0]&&<PlanTask plant={plant}/>}
            {step===steps[2]&&<PlanCalendar/>}
            {step===steps[3]&&<ProgramManagement plant={plant}/>}
            </div>
        </div>
    )
}