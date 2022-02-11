const appConfig={
  frequencies:[
    {weeks: 1, frequency: "Semanal"},
    {weeks: 2, frequency: "Quincenal"},
    {weeks: 4, frequency: "Mensual"},
    {weeks: 8, frequency: "Bimestral"},
    {weeks: 12, frequency: "Trimestral"},
    {weeks: 16, frequency: "Cuatrimestral"},
    {weeks: 24, frequency: "Semestral"},
    {weeks: 48, frequency: "Anual"},
    ],
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
  values:{
    startingYear: 2015
  }
}

export{
  appConfig
}