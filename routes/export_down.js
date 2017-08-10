'use strict'

var express = require('express');
var router = express.Router();
var zipFolder = require('zip-folder');
var process = require('process');


/* GET home page. */
router.get('/', function (req, res, next) {

    var today = new Date();
    var ms = today.getMilliseconds();

    var cpath = process.cwd();
    console.log('Export_down COOKIE: '+req.session.proj_path+' '+cpath);
    if (!req.session.proj_path){
        res.redirect('/');
    } else {

        console.log('ZIPPING:   '+cpath+'/public/projects'+req.session.proj_path+'/');
        zipFolder(cpath+'/public/projects/'+req.session.proj_path+'/', 'public/archives/'+req.session.proj_path+ms+'_archive.zip', function(err) {
            if(err) {
                console.log('oh no!', err);
            } else {
                console.log('EXCELLENT and DONE....,');
            }
        });

        res.cookie('proj_path',req.session.proj_path ).render('export_down', {proj_path: req.session.proj_path, zippath: 'archives/'+req.session.proj_path+ms+'_archive.zip'});
    }
});

module.exports = router;
