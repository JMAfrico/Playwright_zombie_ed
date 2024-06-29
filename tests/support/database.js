//npm i pg --save-dev = pacote node para conexão com banco postgres
const {Pool} = require('pg');

//npm install dotenv = pacote node .env para criar varias ambientes de teste
require('dotenv').config();

const DBconfig ={
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASS,
    port:process.env.DB_PORT
}

/*COMO ESTAVA SEM O DOTENV
const DBconfig ={
    user:'postgres',
    host:'localhost',
    database:'qax',
    password:'admin123',
    port:'5432'
}*/
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

