const Gpio = require('onoff').Gpio;

const button = new Gpio(5, 'in', 'rising', {debounceTimeout: 10});
const button2 = new Gpio(6, 'in', 'rising',{debounceTimeout: 10});

process.on('SIGINT', () => {
  button.unexport();
  button2.unexport();
});

exports.callbackBotones=function(boton5,boton6){
    button.watch(boton5)
    button2.watch(boton6); 
}