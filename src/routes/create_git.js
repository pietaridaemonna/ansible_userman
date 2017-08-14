'use strict'

var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET home page. */
router.post('/', function (req, res, next) {
    fs.readFile('/doesnt/exist', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });

    req.session.proj_path = req.body.proj_path;
    res.cookie('proj_path',req.session.proj_path ).render('create_struct', {proj_path: req.session.proj_path});
});


module.exports = router;
