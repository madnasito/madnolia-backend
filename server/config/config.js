process.env.PORT = process.env.PORT || 3000

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Vencimiento del token
//60 segundos * 60 minutos * 24 horas * 30 dias
process.env.END_TOKEN = 1000 * 60 * 60 * 24 * 30;

//Seed de autenticación 
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//Google ID
process.env.CLIENT_ID = '817997186963-ifufs7fs14r32cggh1q7360g0hnmav0a.apps.googleusercontent.com'

//Base de datos
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/madnolia';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.urlDB = urlDB;