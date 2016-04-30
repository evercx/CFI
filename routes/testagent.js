var express = require('express');
var router = express.Router();
var superagent = require('superagent');
/* GET testagent page. */
router.get('/', function(req, res, next) {
	superagent.get('http://localhost:30653/t')
			  .end(function(err,response){
			  	 if (err) return next(err);
			  	 console.log(response.body.hello);
			  	 res.json(response.body);
			  })
});


module.exports = router;