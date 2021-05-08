const express = require('express');
const routes = express.Router();

routes.get('/',(req, res)=> {
    res.send('welcome to my API')
})

routes.get('/books', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('select * from books', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/books', (req, res)=>{
    req.getConnection((err, conn) => {
        if(err) return res.send(err)

        conn.query('INSERT INTO books set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err);

            res.send('Books Added!')
        } );
    })
})


routes.get('/products', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('select * from products', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


module.exports = routes