import { appConfig } from "../../config"
import './index.css'
const {headersRef} = appConfig

export default function DropdownChoice(item, array, settingFunction){
    return(<div>
      <label className="dropdownLabel">{headersRef[item] || item}</label>
      <select className="dropdownInput" onChange={(e)=>settingFunction(item, e.target.value)}>
        <option value='0'>Sin seleccionar</option>
        {array.map((element, index)=>
        <option key={index} value={element}>
            {headersRef[element] || element}
        </option>)}
      </select>
    </div>)
}