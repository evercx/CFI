

module.exports = function(app){
	app.post('/localapi', function(req, res, next) {
	  //res.render('index', { title: 'Express' });
		console.log(req.body);
		console.log(req.body.msg);
		res.json({msg:"hello world"});
	});
}