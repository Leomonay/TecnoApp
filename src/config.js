const appConfig={
  // url: 'http://localhost:3001/v1',
  url: 'https://tecnoserver.herokuapp.com/v1',

  headersRef : {
    //Work Orders
    code: 'Código',
    class: 'Clase',
    status: 'Estado',
    device: 'Equipo',
    description: 'Descripción',
    solicitor: 'Solicitante',
    registration: 'Alta',
    clientWO: 'OT Cliente',
    closed: 'Cierre',
    cause: 'Causa',
    issue: 'Problema',
    line: 'Línea',
    area: 'Área',
    macroCause: 'Causa Macro',
    supervisor: 'Supervisor',
    idNumber: 'DNI',
    phone: 'Teléfono',

    //Devices
    plant: 'Planta',
    plantName: 'Planta',
    name: 'Nombre',
    type: 'Tipo',
    types: 'Tipos',
    powerKcal: 'Pot Kcal',
    powerTnRef: 'Pot TnRef',
    refrigerant: 'Gas',
    service: 'Servicio',
    category: 'Categoría',
    regDate: 'Fecha Alta',
    environment: 'Ambiente',
    servicePoints: 'Puntos de Servicio',
    power:'Potencia',
    age: 'Antigüedad',

    //AdminUsers
    charge: 'Cargo',
    access: 'Acceso',
    View: 'Vista',
    Client: 'Usuario',
    Worker: 'Técnico',
    Internal: 'Interno',

    //Plan
    program: 'Programa',
    reclaims: 'Reclamos',
    responsible: 'Responsable'
  },
  plantConfig:{
    code: 'SSN'
  }
}


const opcionesPanel={
        Reclamo:{iniciar: "Iniciar reclamo", consultar: "Consultar reclamo", modificar: "Modificar reclamo", conformidad: "Dar conformidad"},
        Equipo:{area: "Crear área", linea: 'Crear línea', crearLS: "Crear lugar de servicio", crearEquipo: "Crear equipo", consultarEquipo: "Consultar Equipo", modEquipo: "Modificar equipo", solEquipo: "Solicitar equipo", apEquipo:"Aprobar Equipo"},
        OT:{crear: "Crear OT", modificar: "Modificar OT", aprobar: "Aprobar cambios", cerrar:"Cerrar OT"}
      }
const Reclamo = opcionesPanel.Reclamo
const Equipo= opcionesPanel.Equipo
const OT= opcionesPanel.OT

function getSuper(){
    let all=[]
    for (const e in opcionesPanel){
      for (const i in opcionesPanel[e]){
        all.push(opcionesPanel[e][i])
      }
    }
    return all
  }

const permisos={
  interno:[Reclamo.iniciar, Reclamo.consultar, Reclamo.modificar, Equipo.consultarEquipo],
  cliente:[Reclamo.iniciar, Reclamo.consultar, Reclamo.conformidad, OT.aprobar],
  superadmin:getSuper(),
  supervisor:[Reclamo.consultar, OT.crear, OT.modificar, OT.cerrar] ,
}



function getAccesos(perfil){
    let accesos=[]
    for (const e in opcionesPanel){
      for (const i in opcionesPanel[e]){
        if(permisos[perfil].includes(opcionesPanel[e][i])&&
          !accesos.includes(e)){          
          accesos.push(e)
        }
      }
    }
    return accesos
}
getAccesos('cliente')




export{opcionesPanel, permisos, getAccesos, appConfig}