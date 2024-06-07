//npm i pg --save-dev = pacote node para conexão com banco postgres
const {Pool} = require('pg');

const DBconfig ={
    user:'postgres',
    host:'localhost',
    database:'qax',
    password:'admin123',
    port:'5432'
}
/*
DB_DIALECT=postgres
DB_HOST=localhost
DB_NAME=qax
DB_USER=postgres
DB_PASS=admin123
DB_PORT=5432*/

export async function executeSQL(sqlScript){
    try{
        const pool = new Pool(DBconfig);
        const client = await pool.connect();
        const result = await client.query(sqlScript);
        console.log(result.rows);
    }catch(error){
        console.log('Erro ao executar SQL ' +error);
    }
}

