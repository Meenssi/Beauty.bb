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

app.get('/help', (req, res) => {
    res.render('help', {
        contact1 : contact1,
        contact2 : contact2,
        
    })
})
var contact1 = "ourbeauty.bb@gmail.com" 
var contact2 = "Beauty.BB"

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/profile', (req, res) => {
    res.render('profile')
})

app.get('/additem', (req, res) => {
    res.render('additem')
})


app.get('',(req, res) => {
 
    pool.getConnection((err, connection) => {  //err คือ connect ไม่ได้ or connection คือ connect ได้ บรรทัดที่ 13-20
        if(err) throw err
        console.log("connected id : ?" ,connection.threadId) //ให้ print บอกว่า Connect ได้ไหม
        //console.log(`connected id : ${connection.threadId}`) //ต้องใช้ ` อยู่ตรงที่เปลี่ยนภาษา ใช้ได้ทั้ง 2 แบบ
         
        connection.query('SELECT * FROM product', (err, rows) => { 
            connection.release();
            if(!err){ //ถ้าไม่ error จะใส่ในตัวแปร rows
                //Back-End : Postman Test --> res.send(rows)
                //Front-End :
                //ทำการ Package ข้อมูลที่ต้องการส่ง เพื่อจะให้สามารถส่งข้อมูลไปได้ทั้งชุุด

                //--------- Model of Data ---------//
                obj = { product: rows, Error : err}

                //--------- Controller --------//
                res.render('index', obj)

            } else {
                console.log(err)
            }
         }) 
    })
})

app.get('/product/:id',(req, res) => {
 
    pool.getConnection((err, connection) => {  //err คือ connect ไม่ได้ or connection คือ connect ได้ บรรทัดที่ 13-20
        if(err) throw err
        console.log("connected id : ?" ,connection.threadId) //ให้ print บอกว่า Connect ได้ไหม
        //console.log(`connected id : ${connection.threadId}`) //ต้องใช้ ` อยู่ตรงที่เปลี่ยนภาษา ใช้ได้ทั้ง 2 แบบ
 
        connection.query('SELECT * FROM product WHERE `id` = ?', req.params.id, (err, rows) => { 
            connection.release();
            if(!err){ //ถ้าไม่ error จะใส่ในตัวแปร rows
                //res.send(rows)
                obj = {product : rows, Error : err}
                res.render('product', obj)
            } else {
                console.log(err)
            }
         }) 
    })
})

app.get('/home',(req, res) => {
 
    pool.getConnection((err, connection) => {  //err คือ connect ไม่ได้ or connection คือ connect ได้ บรรทัดที่ 13-20
        if(err) throw err
        console.log("connected id : ?" ,connection.threadId) //ให้ print บอกว่า Connect ได้ไหม
        //console.log(`connected id : ${connection.threadId}`) //ต้องใช้ ` อยู่ตรงที่เปลี่ยนภาษา ใช้ได้ทั้ง 2 แบบ
         
        connection.query('SELECT * FROM product', (err, rows) => { 
            connection.release();
            if(!err){ //ถ้าไม่ error จะใส่ในตัวแปร rows
                //Back-End : Postman Test --> res.send(rows)
                //Front-End :
                //ทำการ Package ข้อมูลที่ต้องการส่ง เพื่อจะให้สามารถส่งข้อมูลไปได้ทั้งชุุด

                //--------- Model of Data ---------//
                obj = { product: rows, Error : err}

                //--------- Controller --------//
                res.render('home', obj)

            } else {
                console.log(err)
            }
         }) 
    })
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


app.post('/register',(req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err
        const params = req.body

            //Check
            pool.getConnection((err, connection2) => {
                connection2.query(`SELECT COUNT(id) AS count FROM user WHERE id = ${params.id}`, (err, rows) => {
                    if(!rows[0].count){
                        connection.query('INSERT INTO user SET ?', params, 
                        (err,rows) => {
                            connection.release()
                            if(!err){
                                //res.send(`${params.name} is complete adding item.`)
                                obj = {Error : err, mesg : `Success adding data ${params.name}`}
                                res.render('register', obj)
                            } else {
                                console.log(err)
                            }
                        })
                    } else {
                        //res.send(`${params.name} do not insert data`)
                        obj = {Error : err, mesg : `Cannot adding data ${params.name}`}
                        res.render('register', obj)
                    }
                })
            })
    }) 
})

app.get('/profile',(req, res) => {
 
    pool.getConnection((err, connection) => {  
        if(err) throw err
        console.log("connected id : ?" ,connection.threadId) 
         
        connection.query('SELECT * FROM user', (err, rows) => { 
            connection.release();
            if(!err){ 
                obj = { user: rows, Error : err}
                res.render('profile', obj)
            } else {
                console.log(err)
            }
         }) 
    })
})



app.listen(port, () => 
    console.log("listen on port : ?", port)
    )