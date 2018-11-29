'use strict';

var medidas = require('./medidas');
var pantalla = require('./pantalla');
var estado = require('./status');
var cloud = require ('./cloud');
var control = require ('./control');
var rele = require('./rele');
var botones = require('./botones');
let tiempoMedida=10000;
let tiempoControl=15000;

let minutoEnvio = 30;   // Mandamos datos cada media hora

var estabilidadMedidas=-1;
var primeraMedida=true;

var tempAnterior=-1;

var enviado=false;

var primerControl=true;
var userAutenticado=null;

/* Callback despues de la medida */
function medidasCallback(err,temp,hum){
	if (!err) {
        if (temp == tempAnterior){
            estabilidadMedidas++;
        }else{
            estabilidadMedidas=0;
        }
        tempAnterior=temp;
        if (estabilidadMedidas>=5 || primeraMedida===true){
            primeraMedida=false;
            estado.guardaTemperatura(temp);
            pantalla.escribeTemperatura(temp);
            estabilidadMedidas=0;
            console.log(estado.estado);
        }else{
            estado.guardaTemperatura(temp);
        }


        var ahora = new Date();
        if ((ahora.getMinutes()%minutoEnvio)===0){
            if (enviado===false){
                console.log('30 minutos ... enviamos dato')
                cloud.escribeEstado(estado.estado,function(error){
                if (error){
                    console.log(error)
                    enviado=false;
                }
                else{
                    console.log("Estado enviado OK");
                    enviado=true;
                }
                });
                cloud.escribeRegistro(estado.estado,function(error){
                if (error){
                    console.log(error)
                    enviado=false;
                }
                else{
                    console.log("Estado enviado OK");
                    enviado=true;
                }
                });


            }
        }
        else{
            enviado=false;
        }
    }
}

function controlTemperatura(){

	var actual = estado.estado.temperatura;
	//var objetivo = estado.estado.temperaturaObjetivo;
    var encendido = estado.estado.encendido;
    var objetivo = control.automatico.temperatura;

    console.log('Control modo: ' + control.modo);
    if (control.modo==='off'){
        console.log('Control off: apagado');
        if (encendido!==0){
            estado.setEncendido(0,rele.estadoRele);
            cloud.escribeEvento(estado.estado,control.modo,function(error){console.log(error)});
            cloud.escribeEstado(estado.estado,function(error){console.log(error)});
        }
    }else if (control.modo==='on'){
        console.log('Control on: encendido');
        if (encendido!==1){
            estado.setEncendido(1,rele.estadoRele);
            cloud.escribeEvento(estado.estado,control.modo,function(error){console.log(error)});
            cloud.escribeEstado(estado.estado,function(error){console.log(error)});
        }
    }else if (control.modo==='automatico'){
        console.log('Control automatico: temperatura: ' + control.automatico.temperatura);
        if (actual>=objetivo){
            if (encendido!==0){
                console.log('Apagamos y mandamos evento...');
                estado.setEncendido(0,rele.estadoRele);
                cloud.escribeEvento(estado.estado,control.modo,function(error){console.log(error)});
                cloud.escribeEstado(estado.estado,function(error){console.log(error)});
            }
        }else{
            if (encendido!==1){
                console.log('Encendemos y mandamos evento...');
                estado.setEncendido(1,rele.estadoRele);
                cloud.escribeEvento(estado.estado,control.modo,function(error){console.log(error)});
                cloud.escribeEstado(estado.estado,function(error){console.log(error)});
            }
        }
    }
    pantalla.pintaEncendido(estado.estado.encendido);
    pantalla.pintaTemperaturaObjetivo(objetivo);

}

function manejadorControl(snapshot){
    console.log(snapshot.val());
    control.setControl(snapshot.val());
    estado.setObjetivo(snapshot.val().automatico.temperatura);
    if (primerControl===false){
        cloud.escribeEvento(estado.estado,control.modo,function(error){console.log(error)});
        cloud.escribeEstado(estado.estado,function(error){console.log(error)});
    }
    primerControl=false;

}

function manejadorAuth(user){
    if (user){
        console.log("Auth correcta...ponemos manejadores");
        cloud.manejadorControl(manejadorControl);
        userAutenticado=user;
    }else{
        userAutenticado=null;
    }
}

function manejadorBoton6(err,value){
    var aux=control.automatico.temperatura;
    console.log("Pulsamos el + " + aux);
    control.setTemperatura(aux+1);
    estado.setObjetivo(aux+1);
    pantalla.pintaTemperaturaObjetivo(aux+1);
    cloud.escribeControl(control,function(error){console.log(error)});
    cloud.escribeEstado(estado.estado,function(error){console.log(error)});

}
function manejadorBoton5(err,value){
    var aux=control.automatico.temperatura;
    console.log("Pulsamos el - " + aux);
    control.setTemperatura(aux-1);
    estado.setObjetivo(aux-1);
    pantalla.pintaTemperaturaObjetivo(aux-1);
    cloud.escribeControl(control);
    cloud.escribeEstado(estado.estado);
}

/* Lazo del programa */
botones.callbackBotones(manejadorBoton5,manejadorBoton6);
cloud.manejaAuth(manejadorAuth);


setTimeout(function(){pantalla.limpiaPantalla()},9500);
setInterval(function(){medidas.readSensor(medidasCallback)},tiempoMedida);
setInterval(function(){controlTemperatura()},tiempoControl);
setInterval(function(){
    if (userAutenticado!=null){
        pantalla.pintaCobertura(1);
    }else{
        pantalla.pintaCobertura(0);
    }
},5000)