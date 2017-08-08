var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {

    req.cookies.proj_path = '';
    //res.cookie("proj_path", "", { expires: new Date(0) });
    //res.clearCookie('proj_path');


    //res.render('exit', {proj_path: ''});
    res.cookie('proj_path',req.cookies.proj_path ).render('logout', {proj_path: req.cookies.proj_path});
    //res.render('logout');

});

module.exports = router;
