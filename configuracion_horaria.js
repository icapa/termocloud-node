var moment = require('moment');
const dias=['D','L','M','X','J','V','S'];

/* Funciones internas al modulos */
function coincideElDia(ahora,registro){
    //console.log("Comprobamos:");
    //console.log(registro);
    var pilloDia=false;
    dias.forEach((element,index) => {
        //console.log("Elemento:", element, index)
        //console.log(registro[element]);  
        if (registro[element]===true){
            if (ahora.isoWeekday()===index){
                pilloDia=true;
            }
        }  
        
    });
    return pilloDia;
}
function coincideHora(ahora,registro){
    var fecha = ahora.format().split('T')[0];
    var inicio=fecha+'T'+registro.hh_ii+':00';
    var fin = fecha+'T'+registro.hh_ff+':59';
    console.log(fecha,inicio,fin);
    var result = moment(ahora).isBetween(inicio,fin);
    //console.log("Las horas coinciden: ", result);
    return result;
    
}

module.exports = {
    listaConfiguracion:[],

    actualizaConfiguracion(nuevaConf){
        //this.listaConfiguracion=nuevaConf;
        // Una manera de clonar
        this.listaConfiguracion = JSON.parse(JSON.stringify(nuevaConf));
    },

    coincideElDia(ahora){
        var pillo=null;
        this.listaConfiguracion.forEach(element => {
            if(coincideElDia(ahora,element)===true){
                if (coincideHora(ahora,element)){
                    if (element.enabled===true){
                        pillo=element;
                    }
                }
                else{
                    element.activo=false;
                }
            }else{
                element.activo=false;
            }
        });
        return pillo;
    },
    activoElRegistro(registro){
        if (registro.activo){
            return false;
        }
        else{
            registro.activo=true;
            return true;
        }
    }

}