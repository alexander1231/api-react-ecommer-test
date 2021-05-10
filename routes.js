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

routes.get('/cart', (req, res)=>{
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('select * from products t1 inner join cart t2 on t1.id_product = t2.id_product', (err, rows) =>{
            if (err) return res.send(err);

            res.json(rows)
        })
    })
})

routes.delete('/cart/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);        

        conn.query('DELETE FROM cart WHERE id_cart = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err);

            res.send('Cart excluded!')
        })
    })
})

routes.post('/cartEmpty', (req, res)=> {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('delete from cart' , (err, rows) => {
            if (err) return res.send(err);

            res.json(rows)
        })
    })
})

routes.put('/quantyCart/:id', (req, res)=>{
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('Update cart set ? where id_cart = ?', [req.body, req.params.id], (err, req) => {
            if(err) return res.send(err)

            res.send('book excluded!')
        })
    })
})


module.exports = routes