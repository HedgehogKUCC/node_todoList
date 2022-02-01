// plugins
const express = require('express');
const bp = require('body-parser');
const path = require('path');

// customized modules
const indexRouter = require('./routes/index'); // display view
const todoRouter = require('./routes/todo'); // pass data

// build server
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

// middleware
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

// import static source
app.use(express.static(path.join(__dirname, 'public')));

// build router
app.use('/', indexRouter);
app.use('/api', todoRouter);

app.listen(PORT, () => {
    console.log('Server is listening on port: ', PORT);
});
