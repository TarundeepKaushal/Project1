const express = require('express')

const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const newPostController = require('./controllers/newPost')
const homePageController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const validateController = require('./middleware/validationMiddleware')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const authmiddleware = require('./middleware/authmiddleware')
const redirectifAuthentication = require ('./middleware/redirectifAuthentication')
const logoutController = require('./controllers/logout')
const flash = require('connect-flash');

mongoose.connect("mongodb+srv://tkaushal2330:tarun123@cluster0.xvsesy2.mongodb.net/?retryWrites=true&w=majority" , {useNewUrlParser:true});
const app = new express()
global.loggedIn = null;
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/posts/store',validateController)
app.listen(4000, () => {
    console.log('App listening on port 4000')
})
app.use(expressSession({
   secret: 'keyboard cat', 
}))
app.use('*' , (req,res,next) =>{
    loggedIn = req.session.userId;
    next();
})

app.use(flash());

app.get('/', homePageController)
app.post('/posts/store',storePostController)
app.get('/post/new', authmiddleware, newPostController)
app.get('/post/:id',getPostController)
app.get('/auth/register',redirectifAuthentication,newUserController)
app.post('/user/register',redirectifAuthentication,storeUserController)
app.get('/auth/login',redirectifAuthentication,loginController)
app.post('/user/login',redirectifAuthentication,loginUserController)
app.get('/auth/logout',logoutController)
//app.use((req,res) => res.render ('notfound'));
