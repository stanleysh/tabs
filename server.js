const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/api/tabs', (request, response) => {
    response.json({info: 'Node.js,, Express, and Postgres API'})
})

app.use('/api/users', require('./routes/api/users'));

app.listen(port, function() {
	console.log(`Express app running on port ${port}`)
});

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
