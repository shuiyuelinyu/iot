var onoff = require("onoff");        //引入onoff库

var Gpio = onoff.Gpio,              //设置GPIO4 为输出引脚
	led = new Gpio(4,'out'),
	interval;
interval = setInterval(function(){          //定时器2s 切换一次led状态
	var value = (led.readSync() + 1) % 2;
	led.write(value,function(){
		console.log("changed led state to:" + value);
	});
},2000);

process.on('SIGINT',function(){             //退出释放资源
	clearInterval(interval);
	led.writeSync(0);
	led.unexport();
	console.log('Bye,bye');
	process.exit();
});

