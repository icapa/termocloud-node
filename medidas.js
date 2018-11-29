var sensor = require('node-dht-sensor');

let tipoSensor = 11;
let pinSensor = 21;

exports.readSensor = function(callback){
	sensor.read(tipoSensor, pinSensor, callback);
}

