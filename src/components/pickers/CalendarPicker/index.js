import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setDates } from '../../../actions/planActions'
import './index.css'

export default function CalendarPicker(props){
    const {year, titles, task, yearDates} = props
    const {dates, frequency} = task
    const [taskDates, setTaskDates]=useState([])
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const [stringDates, setStringDates]=useState(taskDates?
        taskDates.map(date=>(new Date(date)).toLocaleDateString())
        : [])
    const dispatch = useDispatch()

    useEffect(()=>setTaskDates(dates.map(date=>new Date(date))),[dates])
    useEffect(()=>setStringDates(taskDates.map(date=>
        date.toLocaleDateString().split(' ')[0])),[taskDates])

    async function setAllDates(event){
        event.preventDefault()
        let index = Number(event.target.value)
        let datesInput = []
        let date = new Date (yearDates[index])
        while (date && date.getMonth()){
            datesInput.push( new Date(date) )
            index+=frequency
            let newDate = new Date(yearDates[index])
            if(newDate && frequency%4===0){
                if (newDate.getMonth()-date.getMonth() < frequency/4){
                    let monthDates = yearDates.filter(e=>( new Date(e) ).getMonth()===newDate.getMonth()+1)
                    if (monthDates[0]) newDate = new Date ( monthDates[0] ) 
                }
            }
            date = newDate
        }

        setTaskDates(datesInput)
        setStringDates(datesInput.map(date=>date.toLocaleDateString().split(' ')[0]))

        dispatch(setDates({
            year,
            strategy: task.strategy,
            device: task.code, 
            dates: datesInput
        }))
    }

    return(
        <div className='calendarSection' id={task.code}>
            <div className='deviceColumn'>
                    <div className='calendarDevItem' title='observaciones'>
                        {titles && <div><b>Nombre de Equipo</b></div>}
                        <div>
                            <b>{task.name}</b>
                            <br/>
                            {task?
                                (`${task.strategy} ${task.responsible? `(${task.responsible.name})`:'' }`)
                                :"SIN PROGRAMA"}</div>
                    </div>
                    <div title='Formato: DD/MM'>
                        {titles && <div className='tinyTitle'>1° Fecha</div>}
                        <input className='ddmm'
                            type='text'
                            placeholder={'dd/mm'} 
                            value={taskDates[0]?
                                `${taskDates[0].getDate()}/${taskDates[0].getMonth()+1 || undefined}`
                                :''}
                            readOnly={true}
                            />
                    </div>
            </div>

            <div className='calendarColumn'>
                <div className='calendarRow'>
                    {months.map((month, index)=>
                        <div key={index} className='monthSection'>
                            {titles && <div className='tinyTitle'>{month}</div>}
                            <div className='spaced section'>
                                {yearDates.filter(date=>(new Date(date)).getMonth() === index).map((element)=>{
                                    const date = ( new Date(element) ).toLocaleDateString()
                                    const weekIndex = yearDates.findIndex(e=>
                                        (new Date ( e )).toLocaleDateString() === date)
                                    
                                    return <button key={weekIndex}
                                        className={`weekButton${stringDates.includes(date)? ' selectedWeek':''}`}
                                        value={weekIndex}
                                        onClick={(e)=>setAllDates(e)}
                                        title={date.split('/').splice(0,2).join('/')}
                                    />
                                })}
                        </div>

                    </div>)}
                </div>
            </div>
        </div>
    )

}