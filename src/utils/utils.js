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
//prueba
// const json1 = [{clave1: 1, clave2:'dos'},[3,4,'cinco'],6,new Date('2010 10 21'),'ocho']
// const json2 = json1
// json2[1][1]=5
// console.log('json1',json1, 'json2', json2) // referencia

// const json3 = (cloneJson(json1))
// json3[3] = new Date('1986 05 13')
// console.log('json1',json1,'json3',json3) // independiente



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

export function  filterByWorker (worker, cylinders) {
    let stateFiltered = cylinders.filter((element) => element.assignedTo === worker)
     return stateFiltered;
  };

  export function  filterByRefrigerant (refrigerant, cylinders) {
    let stateFiltered = cylinders.filter((element) => element.refrigerant === refrigerant)
     return stateFiltered;
  };

  export function  filterByStatus (status, cylinders) {
    let stateFiltered = cylinders.filter((element) => element.status === status)
     return stateFiltered;
  };