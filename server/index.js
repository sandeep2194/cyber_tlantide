const express = require('express')
const app = express();
const port = 3000;

var indexRouter = require('./routes');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);


app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
});
