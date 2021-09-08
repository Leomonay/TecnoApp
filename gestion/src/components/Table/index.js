import React from 'react'
import './index.css'
import BASE from '../../precarga'
import { useParams } from 'react-router';

export default function Tabla(){
    const {option} = useParams()
    if (!option)return(<div></div>)
    const origen={
        Reclamo: BASE.OTs.filter(e=>e.Clase=="Reclamo"),
        OT: BASE.OTs.filter(e=>e.Clase!="Reclamo"),
        Equipo: BASE.equipos
    }

    function createTable(objArray){
        const headers = Object.keys(objArray[0])

        function headerCreator(headers){
            return(
                headers.map(e=>
            <th key={e} scope="col">{e}</th>
            ))
        }

        function rowcreator(headers, array){
            return(
                array.map(rowdata=>
                    <tr>
                    {headers.map(header=><td key={header}>{rowdata[header]}</td>)}
                    </tr>
                    )
            )
        }


        return(
            <table className='table'>
                <tbody>
                    <tr>
                        {headerCreator(headers)}
                    </tr>
                        {rowcreator(headers,objArray)}
                </tbody>
            </table>
        )
    }


    return(
        <div className='tableBackground'>
            {createTable(origen[option])}
        </div>
    )
}