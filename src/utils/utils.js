export function getShortDate(stringSystemDate){
    if (stringSystemDate.length===10)return stringSystemDate
    let date = new Date(stringSystemDate)    
    let day = ("0" + (date.getDate())).slice(-2);
    let month = ("0" + (date.getMonth() +　1)).slice(-2)
    let year = date.getYear()+1900
    return day+'/'+month+'/'+year
}
export function getHour(date){
    return date.getHours()+':'+date.getMinutes()
}
export function setDate(stringDate){
    let sections = stringDate.split('/')
    return new Date(sections[1]+'/'+sections[0]+'/'+sections[2])
}
export function cloneJson(json){
    if (typeof json === 'object'){
        if (Array.isArray(json)){
            return json.map(element=>cloneJson(element))
        }else if(json.getDate){
            return new Date(json)
        }else{     
            let obj={}
            const keys = Object.keys(json)
            const values = Object.values(json)
            keys.map((key,index)=>
                obj[key]= cloneJson(values[index] )
            )
            return obj
        }
    }else{
        return json
    }
}

export function BuildFilters(array){

    function BuildFilter(list,field){
        let filter=[]
        list.forEach(element => {
            if (!filter.includes(element[field])) filter.push(element[field])
        })
        return filter.sort();
    }

    if(array.length===0){
        console.error('function BuildFilters - empty array')
        return[]
    }else{
        let filters = {}
        let keys = Object.keys(array[0])
        for (let key of keys){
            filters[key] = BuildFilter(array,key)
            }
        return filters
    }
}

export function capitalize(word){
    return word[0].toUpperCase()+word.slice(1).toLowerCase()
}