import { useState } from 'react'
import './index.css'

export default function Paginate(props){
    const {length, select, size, min, step, defaultValue} = props
    const [current, setCurrent] = useState(1)
    const pages = parseInt(props.pages) //not destructured in order to use same variable name
    const delta = Math.floor(length/2)
    let indexes = []

    let first

    if(current<=delta+1){
        first = 1
    }else if(current>=pages-delta){
        first = pages-delta*2
    }else{
        first = current-delta
    }
    const last = Math.min(pages,first + 2*delta)

    for(let i=first;i<=last;i++){ 
        indexes.push(i)
    }

    function EdgeButton(page, caption, pageTo){
        return (
        <button className='col-auto btn btn-outline-primary py-0 px-1'
            title={pageTo}
            onClick={(e)=>handleClick(e)}
            disabled={current===page}
            value={pageTo}>
                {caption}
        </button>)
    }

    function handleClick(e){
        e.preventDefault()
        setCurrent(parseInt(e.target.value))
        select(e.target.value)
    }

    return(
        <div className='container-fluid p-0 d-flex align-content-center justify-content-center'>
            <div className='row m-auto justify-content-center'>
                            {/* <nav aria-label="Page navigation example">
                <ul class="pagination m-0">
                    <li class="page-item"><a class="page-link pe-2 ps-2" href="#">{'<<'}</a></li>
                    <li class="page-item">
                        <a class="page-link pe-2 ps-2" href="#" aria-label="Previous">
                            <span aria-hidden="true">{'<'}</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link pe-2 ps-2" href="#">1</a></li>
                    <li class="page-item"><a class="page-link pe-2 ps-2" href="#">2</a></li>
                    <li class="page-item"><a class="page-link pe-2 ps-2" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link pe-2 ps-2" href="#" aria-label="Next">
                            <span aria-hidden="true">{'>'}</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link pe-2 ps-2" href="#">{'>>'}</a></li>
                </ul>
                <div className='d-flex'>
                    <select className='form-select p-0'>
                        <option>Ir a pág</option>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                    <select className='form-select p-0'>
                        <option>Items/pág</option>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                </div>
            </nav> */}


                {EdgeButton(1,'<<', 1)}
                {indexes.map((index,key)=>
                    <button key={key} 
                        className={`col-auto btn px-1 py-0 ${index===current?'btn-info':'btn-outline-info'}`}
                        style={{minWidth: '1.5rem'}}
                        disabled={index===current}
                        onClick={(e)=>handleClick(e)}
                        value={index}>
                            {index}
                    </button>
                )}
                {EdgeButton(last,'>>', pages)}
                {size && 
                    <select className='form-select py-0 ps-1 pe-4'
                        defaultValue={defaultValue || 10}
                        onBlur={(e)=>size(e.target.value)}
                        style={{width: 'fit-content'}}>
                        <option disabled>items/pág</option>
                        {[10,15,20,30,50,100,200,500,1000].map(items=>
                            <option key={items} value={items}>{`${items}/pág`}</option>)}
                    </select>
                }
            </div>
        </div>
    )
}