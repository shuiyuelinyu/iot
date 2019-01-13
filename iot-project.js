const cp=require('child_process');  //引入child_process模块，在node.js中调用python程序

var onoff = require('onoff');    //引入onoff库
var Gpio = onoff.Gpio,
led =new Gpio(4,'out');          //将GPIO4初始化为输出引脚


var sensorLib = require('node-dht-sensor');    //引入node-dht-sensor库
sensorLib.initialize(11,12);

const aliyunIot = require('aliyun-iot-device-sdk');
const device = aliyunIot.device({
	productKey: 'a1Spa0Sjcsq', //填写模型下测试设备三元组，激活设备
	deviceName: 'dgcK47xN6biTkFfhJxDz',
	deviceSecret: 'HThS5I5TAiLk36TyWbVHpyKifPHOL3A8'
});

device.on('connect', () => {
console.log('connect succesfully!');        //设备激活成功
const interval = setInterval(() => {
var txt = cp.exec('python get.py',(err,stdout,stderr) =>{      //获取树莓派硬件情况

	console.log('stdout',stdout);
	device.postProps({
		CurrentRaspberrypiState:stdout		
	});
})

var value = (led.readSync()+1)%2;                             //获取LED灯状态
led.write(value,function(){
	console.log('post current led state:'+value);

})
var readout = sensorLib.read();                               //获取温湿度
const t =readout.temperature.toFixed(2); 
const h =readout.humidity.toFixed(2);

console.log(`Post current temperature: ${t}`);
console.log(`Post current humidity: ${h}`);
console.log('post Current raspberrypi state: ${txt}');

device.postProps({                //每5秒刷新一次数据状态
CurrentTemperature: t,
CurrentHumidity: h,
CurrentLedState: value
});

}, 5000);
});
device.on('error', (err) => {        //设备连接上云失败
	console.log(err);
});

