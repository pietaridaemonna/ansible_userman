'use strict'

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.cookies.proj_path){
        res.render('index');
    } else {
        res.render('teams', {proj_path: req.cookies.proj_path});
    }
});

/* SET proj/git PATH */
router.post('/', function (req, res, next) {
    req.cookies('proj_path',  req.body.proj_path, {HttpOnly: true});
    res.render('index', {proj_path: req.cookies.proj_path});
});

module.exports = router;
