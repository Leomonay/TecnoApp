import worker from '../../../assets/icons/worker.png'
import './index.css'

export default function UserCard(props, index){
    return(
        <div key={index} className={`userCard ${props.active?'activeUser':'inactiveUser'}`}>
            <img src={worker} alt='' className='cardMainImg'/>
            <div className='cardMainCaption'>{props.name}</div>
            <div><b>{props.range}</b></div>
            <div><b>{props.active?'Activo':'Inactivo'}</b></div>
        </div>
    )
}