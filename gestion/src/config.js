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

const navOptions={
  Reclamo: {url:'/reclamos/', text:'Gestión de Reclamos'},
  Equipo: {url:'/equipos/', text:'Gestión de Equipos'},
  OT: {url:'/OT/', text:'Gestión de OT'}
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




export{opcionesPanel, permisos, getAccesos, navOptions}