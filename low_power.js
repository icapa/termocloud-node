
module.exports = {
    estado: 1,
    turnOn: null,
    turnOff: null,
    timerLowPower: null,
    tiempoDespierto: 60000, // Un minuto sin actividad 

    configureLowPower(on,off){
        this.turnOn=on;
        this.turnOff=off;
        console.log("Low power activado");
        timerLowPower = setTimeout(()=>this.setLowPower(),this.tiempoDespierto);
    },
    
    setLowPower(){
        console.log("Low Power: Apagamos pantalla");
        if (this.turnOff){
            this.turnOff();
            this.estado=0;
            console.log("Low Power: Apagamos pantalla");
        }
    },
    setNormalPower(){
        console.log("Low Power: Encendemos pantalla");
        if (this.turnOn){
            this.turnOn();
            this.estado=1;
            console.log("Low Power: Encendemos pantalla");
            timerLowPower = setTimeout(()=>{
                    this.setLowPower();
                },this.tiempoDespierto);
        }
    }
}