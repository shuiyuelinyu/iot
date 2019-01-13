var exec = require('child_process').exec;      //引入child_process库

exec ('python get.py',(err,stdout,stderr) => {   //调用get.py 程序
	var txt = stdout;
	console.log(txt);
});


