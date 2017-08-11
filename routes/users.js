'use strict'

var express = require('express');
var router = express.Router();
const yaml = require('js-yaml');
const fs = require('fs');


/* GET home page. */
router.get('/', function (req, res, next) {

    console.log('COOKIE: '+req.session);
    if (!req.session.proj_path){
        res.redirect('/');
    } else {
        var cdir = process.cwd();
        var teamz = [];

        const config = yaml.safeLoad(fs.readFileSync(cdir + '/public/projects/'+req.session.proj_path+'/vars/teams.yml', 'utf8'));
        //const teamz = config.teams;
        for (const team in config.teams) {
            console.log(team);
            teamz.push(team);
        }

        res.cookie('proj_path',req.session.proj_path ).render('users', {proj_path: req.session.proj_path, teams: teamz});
    }
});

// /* SET proj/git PATH */
// router.post('/', function (req, res, next) {
//     console.log('POST TEAMS: '+req.session.proj_path)
//     req.session.proj_path = req.body.proj_path;
//     res.cookie('proj_path',req.session.proj_path ).render('users', {proj_path: req.session.proj_path});
// });

module.exports = router;
