const mongoose = require("mongoose");
const { options } = require("../routes");
const Schema = mongoose.Schema;

/*
Nro_OT	Clase	Prioridad	DescripciÃ³n_OT	Problema_Tipo	Equipo	Solicitante	Telefono	Fecha_EmisiÃ³n	Hora_EmisiÃ³n	Hora_Reclamo	Fecha_Cierre	Hora_Cierre	Supervisor	Status	Causa_Problematica	ClasificaciÃ³n_de_Causa	Tipo_de_Promema_Macro	A Mantenimiento	Lugar de Servicio	Usuario_Alta	Momento_Alta	Usuario_Cierre	Momento_Cierre	Usuario_Ultima_Modif	Momento_Ult_modif	Horas_demandadas	Firma_usuario_conformidad	OT_Siderar	Tarea_Pendiente

*/

const options={class:[],priority:[],cause:[],macroCause:[]}


const WorkOrderSchema = Schema(
  {
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    status:{
        type: Date,
    },
    class: {
      type: String,
      enum: options.class,
      autoPopulate: true,
    },
    cause: {
        type: String,
        enum: options.cause, 
    },
    description:{
        type: String
    },
    clientWO:{
        type: Number
    },
    device:{
        type: Schema.Types.ObjectId,
        ref: 'device'
    },
    servicePoint:{
        type: Schema.Types.ObjectId,
        ref: 'device'
    },
    solicitor:{
        type: String,
    },
    initIssue:{
        date: {type: Date},
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    arrivingDate:{
        type: Date,
    },
    close:{
        date: {type: Date},
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    supervisor:{
        type: Date,
    },
    macroCause:{
        type: String,
        enum: options.macroCause
    },
    hours:{
        type: Number
    },
    pendingIssues:{
        type: String
    },
    clientConforming:{
        conform: {type: Boolean},
        client: {type: String}
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ServicePoints", ServicePointsSchema);