require('dotenv').config();

//set online telegram bot
    //const bot = require('./src/telegramBot');
//load config
const {appConfig, dbConfig} = require ('./config');
const server = require('./src/server');
//import database connection:
const connectDb = require('./src/db/mongodb');

async function initApp(appConfig, dbConfig){
  try{
    await connectDb(dbConfig);
    server.listen(appConfig.port, ()=> {
      console.log(`Servidor web escuchando en el puerto ${appConfig.port}`);
    });  
  }catch(e){
    console.error(e);
    process.exit(0);
  }
}
initApp(appConfig,dbConfig);