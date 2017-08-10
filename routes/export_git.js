'use strict'

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {

    console.log('COOKIE: '+req.session);
    if (!req.session.proj_path){
        res.redirect('/');
    } else {
        res.cookie('proj_path', req.session.proj_path).render('export', {proj_path: req.session.proj_path});
    }
});

/* SET proj/git PATH */
router.post('/', function (req, res, next) {
    console.log('POST TEAMS: '+req.session.proj_path)
    req.session.proj_path = req.body.proj_path;
    res.cookie('proj_path',req.session.proj_path ).render('export', {proj_path: req.session.proj_path});
});

module.exports = router;
