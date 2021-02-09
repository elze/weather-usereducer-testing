const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.set('port', (process.env.PORT || 8080));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

const forecastsMod = require('./client/api/forecasts');
const tempUnits = require('./client/api/tempUnits');

app.get('/api/ping', function (req, res) {
 return res.send('pong');
});

app.get('/api/date', function (req, res) {
    res.send(new Date());
});

app.get('/api/forecasts', function (req, res) {
	forecastsMod(req, res);
});

app.put('/api/tempUnit', function (req, res) {
	console.log(`app.put: req.body = ${JSON.stringify(req.body)}`);	
	console.log(`app.put: req.temperatureUnit = ${JSON.stringify(req.temperatureUnit)}`);	
	
	tempUnits(req, res);
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.listen(app.get('port'), function() {
  console.log('Express app weather-usereducer React is running on port', app.get('port'));
});
