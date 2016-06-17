var express = require('express');
var router = express.Router();
var superagent = require('superagent');
/* GET testagent page. */
router.post('/', function(req, res, next) {
	console.log(req.body);
	superagent.post('http://localhost:6655/getDataForCFI')
			  .send(req.body)
			  .end(function(err,response){
			  	 if (err) return next(err);
			  	 //console.log(response.body);
			  	 res.json(response.body);
			  });
});


module.exports = router;