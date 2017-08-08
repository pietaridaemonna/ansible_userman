'use strict'

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {

    console.log('SERVER COOKIE: '+req.cookies);
    if (!req.cookies.proj_path){
        res.redirect('/');
    } else {
    res.cookie('proj_path',req.cookies.proj_path ).render('servers', {proj_path: req.cookies.proj_path});
    }
});

/* SET proj/git PATH */
router.post('/', function (req, res, next) {
    console.log('POST TEAMS: '+req.cookies.proj_path)
    req.cookies.proj_path = req.body.proj_path;
    res.cookie('proj_path',req.cookies.proj_path ).render('servers', {proj_path: req.cookies.proj_path});
});

module.exports = router;