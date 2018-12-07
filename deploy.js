var arguments = process.argv.splice(2);
var ipStartNo = arguments[0];

var mapServerIp = "http://192.168.16.49:6080/";
var webServerIp = "192.168.16.49:8081";

if (ipStartNo == 10) {
	mapServerIp = "http://10.128.71.49:6080/";
	webServerIp = "10.163.200.210:8082";
	console.log('所传递的参数是：', arguments);
}

var fs = require('fs');
var path=require('path');

var apiPathFolder = path.resolve(__dirname+'/dist/_nuxt');
var libMonitorFolder = path.resolve(__dirname+'/dist/lib/monitor');
var proxyFolder = path.resolve(__dirname+'/dist/WEB-INF/classes');

function isDirectory(fileName){
    if(fs.existsSync(fileName)) return fs.statSync(fileName).isDirectory();
}

function isFile(fileName){
  if(fs.existsSync(fileName)) return fs.statSync(fileName).isFile();
}

function readFile(fileName){
 if(fs.existsSync(fileName)) return fs.readFileSync(fileName,"utf-8");
}

if(isDirectory(apiPathFolder)){
	var files = fs.readdirSync(apiPathFolder);
	files.forEach(function(val,key){
		var fileName = path.join(apiPathFolder,val);
		var exc = new RegExp("^app");
		if (isFile(fileName) && exc.test(val)) {
			var data = readFile(fileName);
			
      var res = data.replace(/localhost:8099/g, webServerIp)
      							.replace(/http:\/\/192.168.16.49:6080\//g, mapServerIp);

			fs.writeFileSync(fileName, res);
		}
	})
}

if(isDirectory(libMonitorFolder)){

	var fileName = path.join(libMonitorFolder, "previewVedio.js");
	
	var data = readFile(fileName);
		
  var res = data.replace(/localhost:8099/g, webServerIp);

	fs.writeFileSync(fileName, res);
}

if(isDirectory(proxyFolder)){

	var fileName = path.join(proxyFolder, "proxy.config");
	
	var data = readFile(fileName);
		
  var res = data.replace(/http:\/\/192.168.16.49:6080\//g, mapServerIp);

	fs.writeFileSync(fileName, res);
}

console.log("success!!!");

// fs.readdir(filePath, 'utf8', function (err,data) {

//   data.forEach(function(item, index) {
//     //console.log(item)
//     fs.readFile('./js/'+item,'utf8',function(err,files){
//       //console.log(files)
//       var result = files.replace(/要替换的内容/g, '替换后的内容');

//       fs.writeFile('./js/'+item, result, 'utf8', function (err) {
//            if (err) return console.log(err);
//       });

//     })
//   });

// });
