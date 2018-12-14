var oled = require('oled-js-pi');
var font = require('oled-font-5x7'); 
var opts = {
  width: 128,
  height: 64,
  address: 0x3C
};
 
var oled = new oled(opts);

oled.setCursor(1,25);
oled.writeString(font,2,'Termocloud',1,true);

exports.escribeTemperatura=function(temperatura){
	oled.setCursor(1,1);
	oled.writeString(font,5,temperatura.toFixed(0),1,true)
}

exports.limpiaPantalla=function(){
	oled.turnOnDisplay();
	oled.clearDisplay();
}

exports.pintaCobertura=function(ok){
	oled.drawLine(127,2,118,2,ok);
	oled.drawLine(126,4,119,4,ok);
	oled.drawLine(125,6,120,6,ok);
	oled.drawLine(124,8,121,8,ok);
	oled.drawLine(123,10,122,10,ok);
}
exports.pintaReloj=function(ok){
	oled.drawLine(113,30,104,30,ok);
	oled.drawLine(113,20,104,20,ok);
	oled.drawLine(113,20,113,30,ok);
	oled.drawLine(104,20,104,30,ok);
	oled.drawLine(108,25,111,25,ok);
	oled.drawLine(108,25,108,22,ok);
}
exports.pintaEncendido=function(ok){
	oled.drawLine(127,30,118,30,ok);
	oled.drawLine(127,29,118,29,ok);
	oled.drawLine(125,27,125,24,ok);
	oled.drawLine(122,27,122,24,ok);
	oled.drawLine(119,27,119,24,ok);
	oled.drawLine(126,24,126,21,ok);
	oled.drawLine(123,24,123,21,ok);
	oled.drawLine(120,24,120,21,ok);
}
exports.pintaTemperaturaObjetivo=function(temp){
	oled.setCursor(100,40);
	oled.writeString(font,2,temp.toFixed(0),1,true);
}

exports.apagaPantalla =function(){
	oled.turnOffDisplay();
}
exports.enciendePantalla =function(){
	oled.turnOnDisplay();
}