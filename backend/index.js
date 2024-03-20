let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./database/db'),
    path = require('path'),
    expressSession = require('express-session'),
    flash = require('connect-flash');

// Express Route 
const studentRoute = require('../backend/routes/student.route');
const activityRoute = require('../backend/routes/Activity.route');
const userRoute = require('../backend/routes/User.route');
const imageRoute = require('../backend/routes/TestImage.route');
const notiRoute = require('../backend/routes/Notification.route');

// Connecting MongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(()=>{
    console.log('Database successfully connected');
},err =>{
    console.log('Could not connect to database: ' + err);
})

// Global variable
global.loggedIn = null;

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}))
app.use(cors());
app.use(flash());
app.use(expressSession({
    secret: "node secret"
}))
// Keep userId to session
app.use("*", (req, res, next)=>{
    loggedIn = req.session.userId;
    next();
})

// Route path
app.use('/students', studentRoute);
app.use('/activity', activityRoute);
app.use('/user', userRoute);
app.use('/image', imageRoute);
app.use('/notification', notiRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, ()=>{
    console.log(('Connected to port ' + port));
})

// 404 Error
app.use((req, res, next)=>{
    next(createError(404))
})

// Error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})