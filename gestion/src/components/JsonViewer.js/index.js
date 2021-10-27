import { appConfig } from '../../config'
import './index.css'

export default function JsonViewer(props){
    const {json} = props || {}
    console.log(json)
    const headers = Object.keys(json)

    return(
      <div className='JsonViewerBackground'>
        <div className='JsonViewerTitle'>{props.title}</div>
        {headers.map((header,index)=>
            <div className='JsonViewerLine' key={index}>
                <div className='JsonViewerLineTitle'>{appConfig.headersRef[header] || header}:</div>
                {/* <div className='JsonViewerLineContent'> */}
                {json[header]}
                {/* </div> */}
            </div>
        )}
      </div>
    )
  }