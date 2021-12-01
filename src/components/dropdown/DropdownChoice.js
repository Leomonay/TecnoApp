import { appConfig } from "../../config"
import './index.css'
const {headersRef} = appConfig

export default function DropdownChoice(item, array, settingFunction){
    return(<div>
      <label className="dropdownLabel">{headersRef[item] || item}</label>
      <select className="dropdownInput" onChange={(e)=>settingFunction(item, e.target.value)}>
        <option value='0'>Sin seleccionar</option>
        {array.map((plant, index)=>
        <option key={index} value={plant}>
            {plant}
        </option>)}
      </select>
    </div>)
}