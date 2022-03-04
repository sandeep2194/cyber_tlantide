const express = require('express')
const app = express();
const port = 3000;
const cors = require('cors');

var indexRouter = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);


app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
});
