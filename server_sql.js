const express = require('express')
const bodyParser = require('body-parser')
 
const mysql = require('mysql')
 
const app = express()
const port = process.env.PORT || 5000;
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//View
app.set('view engine','ejs')
//Public
app.use(express.static('public'))
 
//MySQL Connect phpMyAdmin
const pool = mysql.createPool({
    connectionLimit : 10,
    connectionTimeout : 20,
    host : 'localhost', //www.google.com/sql or Server IP Address
    user : 'root',
    password : '',
    database : 'nodejs_beautybb' //Connect Database from beers.sql (Import to phpMyAdmin)
})

var obj = {}

app.get('', (req,res) =>{
    res.render('index', {
        obj_product : product})
})
app.get('/index', (req,res) =>{
    res.render('index', {
        obj_product : product})
})
app.get('/product', (req,res) =>{
    res.render('product', {
        obj_product : product})
})

var product = [
    {font1 : "Lipstick",
    img1 : "/img-product/lip1.jpg",
    img2 : "/img-product/lip2.jpg",
    img3 : "/img-product/lip3.jpg",
    img4 : "/img-product/lip4.jpg",
    img5 : "/img-product/lip1.jpg",
    img6 : "/img-product/lip2.jpg"},

    {font1 : "Foundation",
    img1 : "/img-product/foundation1.jpg",
    img2 : "/img-product/foundation2.jpg",
    img3 : "/img-product/foundation1.jpg",
    img4 : "/img-product/foundation2.jpg",
    img5 : "/img-product/foundation1.jpg",
    img6 : "/img-product/foundation2.jpg"},

    {font1 : "Eyeshadow",
    img1 : "/img-product/eyeshadow1.jpg",
    img2 : "/img-product/eyeshadow2.jpg",
    img3 : "/img-product/eyeshadow3.jpg",
    img4 : "/img-product/eyeshadow1.jpg",
    img5 : "/img-product/eyeshadow2.jpg",
    img6 : "/img-product/eyeshadow3.jpg"}
]
app.get('',(req, res) => {
 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log("connected id : ?" ,connection.threadId)
         
        connection.query('SELECT * FROM product', (err, rows) => { 
            connection.release();
            if(!err){
                obj = { product: rows, Error : err}
                res.render('index', obj)
            } else {
                console.log(err)
            }
         }) 
    })
})

app.get('/help', (req, res) => {
    res.render('help')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/home', (req, res) => {
    res.render('home')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/profile', (req, res) => {
    res.render('register')
})

app.get('/additem', (req, res) => {
    res.render('additem')
})

app.post('/additem',(req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err
        const params = req.body

            //Check
            pool.getConnection((err, connection2) => {
                connection2.query(`SELECT COUNT(id) AS count FROM product WHERE id = ${params.id}`, (err, rows) => {
                    if(!rows[0].count){
                        connection.query('INSERT INTO product SET ?', params, 
                        (err,rows) => {
                            connection.release()
                            if(!err){
                                //res.send(`${params.name} is complete adding item.`)
                                obj = {Error : err, mesg : `Success adding data ${params.name}`}
                                res.render('additem', obj)
                            } else {
                                console.log(err)
                            }
                        })
                    } else {
                        //res.send(`${params.name} do not insert data`)
                        obj = {Error : err, mesg : `Cannot adding data ${params.name}`}
                        res.render('additem', obj)
                    }
                })
            })
    }) 
})


app.listen(port, () => 
    console.log("listen on port : ?", port)
    )