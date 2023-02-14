const express = require('express');
const body = require('body-parser')
const cookie = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql');
const connection = require('express-myconnection');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(body.urlencoded({exteded:true}));
app.use(cookie());
app.use(session({
secret:'Passw0rd',
cookie: { expires: 6000000 },
resave:true,
saveUnintialized:true
}));
app.use(connection(mysql, {
    host: '192.168.100.66',
    user: 'root',
    password: 'Passw0rd',
    port: 3307,
    database: 'assessment'
}, 'single'));

const registerRoute = require('./routes/registerRoute');
app.use('/', registerRoute);
const hrRoute = require('./routes/hrRoute');
app.use('/', hrRoute);
const adminRoute = require('./routes/adminRoute');
app.use('/', adminRoute);
const loginRoute = require('./routes/loginRoute');
app.use('/', loginRoute);
const employeeRoute = require('./routes/employeeRoute');
app.use('/', employeeRoute);
const leaderRoute = require('./routes/leaderRoute');
app.use('/', leaderRoute);
const evaluateColleaguesRoute = require('./routes/evaluateColleaguesRoute');
app.use('/', evaluateColleaguesRoute);
const otRoute = require('./routes/otRoute');
app.use('/', otRoute);

app.listen(8080,"192.168.100.66");