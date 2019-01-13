var sensorLib = require('node-dht-sensor');     //引入node-dht-sensor库
sensorLib.initialize(11,12);                    // 使用GPIO12引脚
var interval = setInterval(function(){          // 读取传感器的温湿度值
	read();
},2000);

function read(){
	var readout = sensorLib.read();
	console.log('Temperature:' + readout.temperature.toFixed(2) + 'c,'+ 'humidity:' + readout.humidity.toFixed(2) + '%');
};

process.on("SIGINT",function(){                //释放引脚资源
	clearInterval(interval);
	console.log('bye bye');
	process.exit();
});
