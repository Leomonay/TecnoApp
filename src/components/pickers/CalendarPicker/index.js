import './index.css'

export default function CalendarPicker(props){
    const {year} = props
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const orders = Array.from(Array(12).keys())

    return(
        <div>
            <div className='title'>Calendario {year}</div>
            <div className='monthGrid'>
                {months.map((month, index)=>
                    <div className='monthLi'>
                        <div className='monthTitle'>{month}</div>
                        <div className='monthContent'>
                            {Array.from(Array(4).keys()).map(element=>
                                <div key={element}
                                    className='monthWeek'
                                    onDrop={()=>{}}>
                                        Semana {element+1}
                                    </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

}