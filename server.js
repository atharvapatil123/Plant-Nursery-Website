const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
const passport = require('passport');

const JWT_SECRET = 'fajbgu;ph1rh801yWJLOHQ5469#%@&*@(&#JBAWUJH*()*^*%*&()*)FAEKEBJF64+6598+*/+3034663F1aG'//Must be kept really secret

mongoose.connect('mongodb+srv://Atharva:atharvapatil123@cluster0.ymchp.mongodb.net/User?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use('/',express.static(path.join(__dirname,'static')))
app.use(bodyParser.json())
app.use(passport.initialize())

app.get('/',checkAuthenticated, (req,res)=>{
    res.render('index.html');
})
app.get('/login',checkNotAuthenticated,(req,res)=>{
    res.render('login.html');
})
app.get('/register',checkNotAuthenticated,(req,res)=>{
    res.render('register.html');
})

app.post('/api/change-password',async (req,res)=>{
    const { username, newpassword: plainTextPassword } = req.body
    const user = await User.findOne({ username }).lean()
    if(!user){
        return res.json({status: 'error', error: 'Invalid Username/Password'})
    }

    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if(!plainTextPassword || typeof plainTextPassword !== 'string' ){
        return res.json({status: 'error', error: 'Invalid Password'})
    }

    if(plainTextPassword.length < 5){
        return res.json({
            status: 'error',
            error: "Password too small. Should be at least 6 characters long."
        })
    }
    if(plainTextPassword.length >16){
        return res.json({
            status: 'error',
            error: "Password too long. Should be at most 15 characters long."
        })
    }
    if(!regularExpression.test(plainTextPassword)) {
        return res.json({
            status: 'error',
            error: "Password must consist of atleast one uppercase character, special charater, lowercase character and a number !"
        })
    }
    try{
        // const user = jwt.verify(token, JWT_SECRET)//Gives the middle part, i.e. actual object, so ignores signature and payload of token
        // const user_id = user.id
        // var ObjectID = require('mongodb').ObjectID;
        // console.log(ObjectID(user_id))
        
        const user_password = await bcrypt.hash(plainTextPassword,10)
        console.log("Hi")
        await User.updateOne(
            {"username": username},
            {
                $set:{"password": user_password}
            }
        )
        console.log('User')
        res.json({status:'ok', URL:'/login.html'})
    }catch(error){
        res.json({status:'error',error:':(('})
    }
})

app.post('/api/login',async(req,res)=>{
    const {username, password}= req.body
    // console.log(password)
    const user = await User.findOne({ username }).lean()
    // console.log(user.password)
    if(!user){
        return res.json({status: 'error', error: 'Invalid Username/Password'})
    }
    // console.log(bcrypt.compare(password, user.password))
    await bcrypt.compare(password, user.password,function(err,response){
        if(err){
            return res.json({status:'error',error:'Wrong password'})
        }
        if(response){
            //the username, password combination is successfull, as the passwords are comparable
            const token = jwt.sign(
                {
                    id: user._id, 
                    username: user.username
                }, 
                JWT_SECRET
            )//Public information using atob , and btoa
            return res.json({status:'ok',data:token, URL:'/'})
        }
        else{
            return res.json({status:'error',error:'Passwords do not match'})
        }
    })
})

app.post('/api/register',async(req,res)=>{
    // console.log(req.body)//Initially, it's empty as express doesn't parse json, so we use body-parser
    // res.json({status:'ok'})
    const {username, password: plainTextPassword} = req.body
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(!username || typeof username !== 'string' ){
        return res.json({status: 'error', error: 'Invalid Username'})
    }
    if(!plainTextPassword || typeof plainTextPassword !== 'string' ){
        return res.json({status: 'error', error: 'Invalid Password'})
    }

    if(plainTextPassword.length < 5){
        return res.json({
            status: 'error',
            error: "Password too small. Should be at least 6 characters long."
        })
    }
    if(plainTextPassword.length >16){
        return res.json({
            status: 'error',
            error: "Password too long. Should be at most 15 characters long."
        })
    }
    if(!regularExpression.test(plainTextPassword)) {
        return res.json({
            status: 'error',
            error: "Password must consist of atleast one uppercase character, special charater, lowercase character and a number !"
        })
    }
    password = await bcrypt.hash(plainTextPassword,10)//10 is number of iterations to produce the hashed password, even for same passwords we get different hashed passwords 
    // console.log(password);

    try{
        const response = await User.create({//Addig data in mongodb
            username,
            password
        })
        // console.log(response);
        // console.log('first1')
        // return res.redirect('/login.html')
        // console.log('first')
        res.json({status:'ok', URL:'/login.html'})
        // success
        // alert("Success")
    }catch(error){
        if(error.code===11000){//duplicate key
            return res.json({status:'error', error:'Username already in use'})
        }
        throw error
        // console.log(JSON.stringify(error))
        // alert("User already exists!")
    }
    // res.redirect('/login.html')
})

function checkAuthenticated(req,res, next){//Middleware function, next is used after we r authenticated
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/login.html')
}
function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

app.listen(100,()=>{
    console.log("Server has been set usp at port 100")
})