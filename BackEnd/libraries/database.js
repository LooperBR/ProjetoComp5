import mysql from 'mysql2/promise';
// create the connection
const connection = await mysql.createConnection({host:'localhost', user: 'root', password: '123456', database: 'agenda_atividades'});
// query database

async function query(sql,parametros=[]){
    const results = await connection.execute(sql,parametros);
    return results
}

export{query}