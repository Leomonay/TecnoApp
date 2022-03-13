import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deviceActions } from "../../../actions/StoreActions";
import { useNavigate } from "react-router-dom";
import DeviceFilters from "../../filters/DeviceFilters";

export default function DeviceList(){
    const {deviceFullList} = useSelector(state=>state.devices)
    const {userData} = useSelector(state=>state.people)
    const [filteredList, setFilteredList] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(deviceFullList[0])return
        dispatch(deviceActions.getFullList(userData.plant))
    },[deviceFullList,userData,dispatch])

    useEffect(()=>setFilteredList(deviceFullList),[deviceFullList])

    function handleSelect(e, code){
        e.preventDefault()
        dispatch(deviceActions.setDevice(deviceFullList.find(device=>device.code === code)))
        navigate(`./${code}`, { replace: true })
    }

    return(
        <div>
            <div className='col'>
                <b>Filtros: </b>
                <DeviceFilters list={deviceFullList} select={setFilteredList}/>
            </div>
            <div>
                <table className="table table-hover" style={{fontSize: '80%'}}>
                    <thead>
                        <tr>
                            <th scope="col">Codigo Eq.</th>
                            <th scope="col">Nombre</th>
                            <th scope="col" className="text-center">Tipo</th>
                            <th scope="col" className="text-center">Potencia [kCal]</th>
                            <th scope="col" className="text-center">Potencia [TR]</th>
                            <th scope="col" className="text-center">Refrigerante</th>
                            <th scope="col" className="text-center">Categoría</th>
                            <th scope="col" className="text-center">Ambiente</th>
                            <th scope="col" className="text-center">Servicio</th>
                            <th scope="col" className="text-center">Antigüedad</th>
                            <th scope="col" className="text-center">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList[0] && filteredList.map((device, index)=>{
                            console.log(device, index)
                            return<tr key={index} style={{cursor:'pointer'}} onClick={(e)=>handleSelect(e,device.code)}>
                                <th style={{minWidth: '5rem'}}>{device.code}</th>
                                <td>{device.name}</td>
                                <td className="text-center">{device.type}</td>
                                <td className="text-center">{device.power}</td>
                                <td className="text-center">{Math.floor(device.power/3000)}</td>
                                <td className="text-center">{device.refrigerant}</td>
                                <td className="text-center">{device.category}</td>
                                <td className="text-center">{device.environment}</td>
                                <td className="text-center">{device.service}</td>
                                <td className="text-center">{device.age} años</td>
                                <td className="text-center">{device.status}</td>
                            </tr>}
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}