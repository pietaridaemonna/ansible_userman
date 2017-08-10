var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('COOKIE: '+req.cookies);
    if (!req.session.proj_path){
        res.redirect('/');
    } else {
        res.cookie('proj_path',req.session.proj_path ).render('servers', {proj_path: req.session.proj_path});
    }

});

module.exports = router;
