'use strict'

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {

    console.log('EXIT =-=------------------>');
    response.cookie("express.sid", "", { expires: new Date(0) });
    //res.render('exit', {proj_path: ''});
    res.redirect('/', {proj_path: ''});

});

module.exports = router;
