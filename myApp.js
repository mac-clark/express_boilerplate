require('dotenv').config();

let bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to log requests
app.use('/', (req, res, next) => {
    const { method, path, ip } = req;
    console.log(`${method} ${path} - ${ip}`);
    next();
});

// Serve static files
app.use('/public', express.static(__dirname + '/public'));

// Route to handle form submission
app.post('/name', (req, res) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    const fullName = `${firstName} ${lastName}`;
    res.json({ name: fullName });
});

// Route to serve HTML front page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Route to handle JSON response
app.get('/json', (req, res) => {
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message = message.toUpperCase();
    }
    res.json({ message: message });
});

// Route to add current time to the request object
app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({ time: req.time });
});

// Route to echo the word in the URL
app.get('/:word/echo', (req, res) => {
    const echoedWord = req.params.word;
    res.json({ echo: echoedWord });
});

// Route to handle GET request with query string
app.get('/name', (req, res) => {
    const firstName = req.query.first;
    const lastName = req.query.last;
    const fullName = `${firstName} ${lastName}`;
    res.json({ name: fullName });
});

module.exports = app;
