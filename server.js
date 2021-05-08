const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const cors = require('cors')


const routes = require('./routes');



const app = express();
app.set('port', process.env.PORT || 9000);
const dbOptions = {
    host: 'rm1jsy8upbkcjn1.caakqzl0ieh3.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'test',
    password: 'password',
    database:'test'
}

// middleware ---------------------
app.use(myconn(mysql, dbOptions, 'single'));
app.use(express.json());
app.use(cors())


// routes -----------
app.use('/api', routes)



app.listen(app.get('port'),()=>{
    console.log('server running on port', app.get('port'));
})