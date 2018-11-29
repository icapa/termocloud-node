var moment = require('moment');

module.exports = {
	estado : {
		encendido:-1,
		temperatura:-1,
		fecha:'',
		temperaturaObjetivo:-1

	},

	guardaTemperatura:function(temp){
		this.estado.temperatura = temp;
		this.estado.fecha = moment().format();
	},

	setObjetivo:function(temp){
		this.estado.temperaturaObjetivo = temp;
		this.estado.fecha = moment().format();
	},

	setEncendido:function(encendido,callback){
		console.log('Cambio el estado');
		this.estado.encendido=encendido;
		this.estado.fecha = moment().format();
		callback(encendido);
	}


}
