const express = require('express')
const app = express();
const port = 3000;
const https = require('https')
const fs = require('fs')
const cors = require('cors');
const enviroment = 'prod';
var indexRouter = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

switch (enviroment) {
    case "dev":
        app.listen(port, () => {
            console.log('Listening... enviroment: ' + enviroment)
        })
        break;
    case "prod":
        https.createServer({
            key: fs.readFileSync('../server.key'),
            cert: fs.readFileSync('../server.cert')
        }, app).listen(port, () => {
            console.log('Listening... enviroment: ' + enviroment)
        })
    default:
        break;
}


