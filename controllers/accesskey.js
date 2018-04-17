var superagent = require('superagent');
var fs = require('fs');

function getAccessKey(accessKey){
	superagent.get('https://cas.shmtu.edu.cn/cas/login')
			.end(function(err,res){
				accessKey = 'hello';
				fs.writeFileSync('key', accessKey);
	});
}

module.exports = getAccessKey;