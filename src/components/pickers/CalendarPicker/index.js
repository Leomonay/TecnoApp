import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updatePlan } from '../../../actions/planActions'
import './index.css'

export default function CalendarPicker(props){
    const {year, titles, device} = props
    const [program,setProgram] = useState({...device.program,planned: device.program.planned.map(plan=>({...plan,date:new Date(plan.date)}))})
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const [dates, setDates]=useState((program.planned && program.planned.map(plan=>new Date(plan.date))) ||[])
    const dispatch = useDispatch()

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
    useEffect(()=>setDates(program.planned.map(plan=>plan.date.toLocaleString().split(' ')[0])), [program.planned])
    useEffect(()=>setProgram({
        ...device.program,
            planned: device.program.planned.map(plan=>({...plan,date:new Date(plan.date)}))}),[device])

    async function setAllDates(event){
        event.preventDefault()
        let value = Number(event.target.value)
        let indexes = []
        let dates = []
        let week = weeks.find(week=>week.index===value)

        if (!program.planned[0] || program.planned[0].date.toLocaleDateString()!== (new Date (week.date)).toLocaleDateString()){
            while (value<=48){
                indexes.push(value)
                value += program.frequency
            }
            dates=weeks.filter(week=>indexes.includes(week.index)).map(week=>new Date(week.date))
        }
        let newProgram = {...program, planned:dates.map(date=>({date}))} 
        setProgram(newProgram)
        dispatch(updatePlan({device:[device.code],program:newProgram}))
    }

    return(
        <div className='calendarSection' id={device.code}>
            <div className='deviceColumn'>
                    <div className='calendarDevItem' title='observaciones'>
                        {titles && <div><b>Nombre de Equipo</b></div>}
                        <div>
                            <b>{device.name}</b>
                            <br/>
                            {device.program?
                                (`${device.program.name} ${device.program.responsible? `(${device.program.responsible.name})`:'' }`)
                                :"SIN PROGRAMA"}</div>
                    </div>
                    <div title='Formato: DD/MM'>
                        {titles && <div className='tinyTitle'>1° Fecha</div>}
                        <input className='ddmm'
                            type='text'
                            placeholder={'dd/mm'} 
                            value={program.planned[0]?
                                `${(program.planned[0].date).getDate() || undefined}/${program.planned[0].date.getMonth()+1 || undefined}`
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
                                return <button key={program.planned[0] ? program.planned[0].date+subIndex : subIndex}
                                    className={`weekButton${dates.includes(date)? ' selectedWeek':''}`}
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