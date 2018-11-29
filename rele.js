'use strict';

var gpio = require('rpi-gpio');

let SET_PIN = 38;
let RESET_PIN = 36;
gpio.setup(SET_PIN,gpio.DIR_OUT);
gpio.setup(RESET_PIN,gpio.DIR_OUT);


exports.estadoRele = function(estado){
    if (estado===0){
        setTimeout(function(){
            gpio.write(RESET_PIN,true);
            console.log('Encendiendo');
            setTimeout(function(){
                gpio.write(RESET_PIN,false);
                console.log('Apagando')
            },500)
        },500)
    }
    else if (estado===1){
        setTimeout(function(){
            gpio.write(SET_PIN,true);
            console.log('Encendiendo');
            setTimeout(function(){
                gpio.write(SET_PIN,false);
                console.log('Apagando')
            },500)
        },500)
    }
}

