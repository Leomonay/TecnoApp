import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { searchWO } from "../../actions/workOrderActions";
import './index.css'

export default function WODetail(){
    const {code} = useParams()
    const {orderDetail} = useSelector(state=>state.workOrder)
    const dispatch = useDispatch()

    useEffect(()=>dispatch(searchWO(code)))

    if (!orderDetail.code) return(<div className='detailBackground'>
        <div className='waiting'>Buscando</div>
    </div>)

    return(
        <div className='detailBackground'>
            <div className='Title'>{`OT ${code}`}</div>
        </div>
    )
}