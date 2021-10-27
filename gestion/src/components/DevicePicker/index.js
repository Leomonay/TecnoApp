import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ListGroup } from "reactstrap"
import { getDeviceList } from "../../actions/deviceActions"
import {appConfig} from "../../config"
import { BuildFilters } from "../../utils/utils"
import Table from "../Table"
const {code} = appConfig.plantConfig

export default function DevicePicker(){
    const {deviceFullList} = useSelector(state=>state.devices)
    const dispatch = useDispatch()
    const [areas, setAreas]=useState([])
    const [lines, setLines]=useState([])
    const [filters, setFilters]=useState([])
    const [conditions, setConditions]=useState([])

    useEffect(()=>{if (deviceFullList[0]){
        const filters = BuildFilters(deviceFullList)
        setFilters(filters)
    }},[deviceFullList])
    useEffect(()=>dispatch(getDeviceList(code)),[dispatch])

    useEffect(()=>console.log(filters),[filters])

    function selectOption(e){
        const cond = e.target.className.split(' ')[1]
        console.log(cond)
        setConditions({...conditions, [cond] : e.target.value})
    }

    function DeviceFilters(props){
        const {filterArray} = props
        console.log('filterArray',filterArray)
        return Object.keys(filterArray).map((filter,index)=>
            <div className='devicePickerFilterOption' key={index}>
                <label>{filter}</label>
                <select onChange={(e)=>selectOption(e)} className={`devicePickerSelect ${filter}`}>
                <option value='none'>Sin seleccionar</option>
                    {filterArray[filter].map((filterOption, index)=>
                        <option key={index} value={filterOption} onClick={(e)=>selectOption(e)}>
                            {filterOption}
                        </option>)}
                </select>
            </div>
        )
    }

    

    return(
        <div className='devicePickerBackground'>
            FILTROS
                <div className='dataPickerfilters'>
                    {Object.keys(filters)&&<DeviceFilters filterArray={filters}/>}
                </div>
                {
                }
            {/* <div>
                {deviceFullList.filter(e=e.area===)}
            </div> */}
        </div>
    )
}