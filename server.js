const express = require('express') //install express: Terminal >npm install express --save
const app = express()
const port = 5000

//Set & Call EJS
app.set('view engine','ejs')

//Connect public folder
app.use(express.static('public'))


//Connect index.ejs
app.get('/index', (req,res) =>{
    res.render('index', {
        obj_product : product})
})

//Add product variables
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

//Connect Login.ejs
app.get('/login', (req,res) =>{
    res.render('login')
})

app.get('/profile', (req,res) =>{
    res.render('profile')
})

//Connect Register.ejs
app.get('/register', (req,res) =>{
    res.render('register')
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


//Connect Home.ejs
app.get('/home', (req,res) =>{
    res.render('home', {
        obj_product : product})
})
//Add product variables
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


//Open Server
app.listen(port,() => {
    console.log("Server is Listening on port: ", port)
}) 