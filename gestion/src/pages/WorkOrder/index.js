import { Form } from 'reactstrap'
import DevicePicker from '../../components/DevicePicker'
import './index.css'

// code: bring from server
// device: choose from list
// servicePoint: choose from list
// status:
// class:
// initIssue:
// solicitor: name, phone
// registration: date, user
// clientWO:
// supervisor: userID
// interventions:
// clientConforming
// closed: user,date

export default function WorkOrders(){

    return(
        <div className='PanelBackground'>
            <div>CRUD BUTTONS</div>
            <Form className='workOrderCreation'>
                <div className='formField'>
                    <div className='button'>Elegir Equipo</div>
                        <DevicePicker/>
                    <label className='formLabel' id='deviceLabel'>Equipo</label>
                    <input className='formInput' id='deviceInput'/>
                </div>
            </Form>
        </div>
    )
}