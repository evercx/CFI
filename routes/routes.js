var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	if (req.session.uEmail) {
		res.render('home');
	}else{
        res.redirect('/login');
        return;
    }

});

router.get('/login', function(req, res, next) {

    if (req.session.uEmail) {
        res.redirect('/');
    }else{
      res.render('login');
    }

});

router.get('/logout',function(req,res){
	delete req.session.uEmail;
    res.redirect('/');
});

router.get('/getSession',function(req,res){
    if (req.session.uEmail) {
    	console.log(req.session.uEmail);
        res.json({"session":req.session.uEmail});
        res.end();
    }else{
	    res.json({"err":"invalid user"});
	    res.end();
    }
})



module.exports = router;


