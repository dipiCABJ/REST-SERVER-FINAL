process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/MetallicACoffe';
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.URL_DB = urlDB;

/********************
Vencimiento del Token 30 dias
*********************/

process.env.FECHA_VEN_TOKEN = 60 * 60 * 24 * 90;

/***********************
Semilla de autenticacion
************************/
process.env.SEED_AUTENTICATION = process.env.SEED_AUTENTICATION || 'este-es-el-seed-desarrollo';


/***********************
Google Client ID
************************/
process.env.CLIENT_ID = process.env.CLIENT_ID || '66029516411-aus42od7fg0a3jj93r9p8cf40gtq1be3.apps.googleusercontent.com';