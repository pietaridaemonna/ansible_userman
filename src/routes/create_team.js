var express = require('express');
var router = express.Router();
const fs = require('fs');
var process = require('process');


/* GET home page. */
router.post('/', function (req, res, next) {

    if (!req.session.proj_path){
        res.redirect('/');
    } else {
        var cdir = process.cwd();
        fs.appendFileSync(cdir + '/public/projects/'+req.session.proj_path+'/vars/teams.yml', '\n  ' + req.body.teamname + ':\n    groups: ' + req.body.nixgroups + '\n    add_keys_to_user: ' + req.body.add_keys_to_user);
        res.cookie('proj_path',req.session.proj_path ).render('teams', {proj_path: req.session.proj_path});
    }

});


module.exports = router;
