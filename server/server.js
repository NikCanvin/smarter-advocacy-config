require('appmetrics-dash').attach();

const appName = require('./../package').name;
const http = require('http');
const express = require('express');
const log4js = require('log4js');
const localConfig = require('./config/local.json');
const path = require('path');

const logger = log4js.getLogger(appName);
logger.level = process.env.LOG_LEVEL || 'info'
const app = express();
const server = http.createServer(app);

app.use(log4js.connectLogger(logger, { level: logger.level }));
require('./routers/index')(app, server);

// Add your code here
console.log('App started!');

var schedule = require('node-schedule');
 
var j = schedule.scheduleJob('01 * * * *', function(){
  //console.log('The answer to life, the universe, and everything!');
  var request = require('request');
  request('http://getdataeclipsemarketplace-route-default.apps.riffled.os.fyre.ibm.com/get-data', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
});
var j = schedule.scheduleJob('02 * * * *', function(){
  //console.log('The answer to life, the universe, and everything!');
  var request = require('request');
  request('http://getvscode-default.apps.riffled.os.fyre.ibm.com/get-data', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
});

const port = process.env.PORT || localConfig.port;
server.listen(port, function(){
  logger.info(`node listening on http://localhost:${port}`);
});

app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

app.use(function (err, req, res, next) {
	res.sendFile(path.join(__dirname, '../public', '500.html'));
});

module.exports = server;