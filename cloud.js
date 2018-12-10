var firebase = require('firebase');
var config = require('./config_firebase');

firebase.initializeApp(config.config);

var database = firebase.database();

firebase.auth().signInWithEmailAndPassword(config.credenciales.user,config.credenciales.pass)
    .catch(function(error){
        console.log(error);
        alert(error.code);
});

exports.manejaAuth = function(callback){
    firebase.auth().onAuthStateChanged(user =>{
        callback(user);
    })   
};

exports.leeEstado = function(callback){
    database.ref('00000000bceb13f1').once('value').then(callback);
    ;
};

exports.escribeEstado = function(estado,callback){
    database.ref('00000000bceb13f1/estado').set(
        {
            encendido: estado.encendido,
            temperatura: estado.temperatura,
            fecha: estado.fecha,
            temperaturaObjetivo: estado.temperaturaObjetivo
        },callback)
}
exports.escribeControl = function(control,callback){
    database.ref('00000000bceb13f1/control').set(
        {
            automatico: control.automatico,
            modo: control.modo,
            on: control.on,
            off: control.off
        },callback)
}
exports.escribeRegistro = function(estado,callback){
    var separao = estado.fecha.split("T");
    var nodo = separao[1].split("+");
    var rrr = nodo[0].substring(0,5);
    database.ref('00000000bceb13f1/registros/'+separao[0]+'/'+rrr).set(
        {
            encendido: estado.encendido,
            temperatura: estado.temperatura,
            fecha: estado.fecha,
            temperaturaObjetivo: estado.temperaturaObjetivo
        },callback)
}

exports.escribeEvento = function(estado,modo,callback){
    var separao = estado.fecha.split("T");
    var nodo = separao[1].split("+");
    var rrr = nodo[0].substring(0,8);
    database.ref('00000000bceb13f1/eventos/'+separao[0]+'/'+rrr).set(
        {
            encendido: estado.encendido,
            temperatura: estado.temperatura,
            temperaturaObjetivo: estado.temperaturaObjetivo,
            modo: modo
        },callback)
}

exports.manejadorControl = function(callback){
    database.ref('00000000bceb13f1/control').on('value',callback);
}

exports.manejadorConfiguracion = function(callback){
    database.ref('00000000bceb13f1/conf').on('value',callback);
}