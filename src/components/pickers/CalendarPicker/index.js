import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setDates } from '../../../actions/planActions'
import './index.css'

export default function CalendarPicker(props){
    const {year, titles, task} = props
    const {dates, frequency} = task
    const [taskDates, setTaskDates]=useState([])
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const [stringDates, setStringDates]=useState(taskDates?
        taskDates.map(date=>(new Date(date)).toLocaleDateString())
        : [])
    const dispatch = useDispatch()

    // useEffect(()=>console.log('taskDates', taskDates),[taskDates])
    // useEffect(()=>console.log('stringDates', stringDates),[stringDates])

    function weekIndex() {
        let weeks = []
        for (let i=1; i<=48;i++){
            const month = Math.floor((i-1)/4)+1
            weeks.push({
                index: i,
                month, 
                week: (i-1)%4+1,
                date: `${year}/${month}/${(i-1)%4*7+1}`
            })
        }
        return weeks
    }
    const [weeks]=useState(weekIndex())
    useEffect(()=>setTaskDates(dates.map(date=>new Date(date))),[dates])
    useEffect(()=>setStringDates(taskDates.map(date=>
        date.toLocaleDateString().split(' ')[0])),[taskDates])

    async function setAllDates(event){
        event.preventDefault()
        let value = Number(event.target.value)
        let indexes = []
        let datesInput = []
        let week = weeks.find(week=>week.index===value)

        if(!taskDates[0]
            || taskDates[0].toLocaleDateString() !== (new Date (week.date)).toLocaleDateString()){
            while (value<=48){
                indexes.push(value)
                value += frequency
            }
            datesInput=weeks.filter(week=>indexes.includes(week.index)).map(week=>new Date(week.date))
        }
 
        setTaskDates(datesInput)
        setStringDates(datesInput.map(date=>date.toLocaleDateString().split(' ')[0]))

        dispatch(setDates({
            year,
            strategy:task.strategy,
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
                            {Array.from(Array(4).keys()).map((element,subIndex)=>{
                                const week = weeks.find(week=>week.month===index+1 && week.week===subIndex+1)
                                const date = (new Date(week.date)).toLocaleDateString()
                                return <button key={taskDates[0] ? taskDates[0].getDate()+subIndex : subIndex}
                                    className={`weekButton${stringDates.includes(date)? ' selectedWeek':''}`}
                                    value={week.index}
                                    onClick={(e)=>setAllDates(e)}
                                    />})}
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )

}