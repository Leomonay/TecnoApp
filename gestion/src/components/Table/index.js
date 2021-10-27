import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import './index.css'
import { appConfig } from '../../config'
// import {selectWorkOrder} from '../../actions/workOrderActions'

export default function Table(props){
    const [activeRow, setActiveRow]=useState('')
    const {array, headers, clickFunction, name, attrib} = props

    function handleClick(index, code){
        setActiveRow(index)
        clickFunction(code)
    }

    return(
      <table className='tableBackground'>

            <thead className='tableHead'>
                <tr className='tableHeadRow'>
                    <th className='tableHeader'>Index</th>
                    {headers.map(header=>
                        <th className='tableHeader' key={header}>
                            {(appConfig.headersRef[header] || header).toUpperCase()}
                        </th>
                        )}
                </tr>
            </thead>

            <tbody className='tableBody'>
                {array.map((element,index)=>
                    <tr className={`tableBodyRow ${activeRow===index?'activeRow':''}`} key={index} onClick={()=>handleClick(index,element[attrib])}>
                        <td className='tableValue'><b>{index+1}</b></td>
                        {headers.map((header,index)=>
                           <td className='tableValue' key={index}>{element[header]}</td>
                        )}
                    </tr>)}
            </tbody>

      </table>
    )
  }