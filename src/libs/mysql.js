import mysql from 'serverless-mysql'

export const conn = mysql({
    config: {
        host: 'localhost',
        port: 3306,
        database:'products',
        user:'root',
        password:'0208',
    },
})