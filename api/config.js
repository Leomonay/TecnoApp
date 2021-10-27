const config = {
    appConfig:{
        host: process.env.APP_HOST,
        port: process.env.APP_PORT
    },
    dbConfig:{
        dbName: process.env.DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
    },
}
module.exports=config