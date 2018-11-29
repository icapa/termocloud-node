var moment = require('moment');

module.exports = {
    modo: 'off',
    off : {
        encendido: 0
    },
    on : {
        encendido: 1
    },
    automatico:{
        temperatura: 17
    },

    setModo:function(modo){
        this.modo = modo;
    },

    setTemperatura:function(temperatura){
        this.automatico.temperatura = temperatura;
    },

    setControl:function(control){
        this.modo = control.modo;
        this.on = control.on;
        this.off = control.off;
        this.automatico = control.automatico;
    }

}
