var express = require('express');
var router = express.Router();
const fs = require('fs');
var process = require('process');


/* GET home page. */
router.post('/', function (req, res, next) {

    console.log('CREATE SERVER: '+req.body.hostname+' / '+req.body.teams);
    if (!req.session.proj_path){
        res.redirect('/');
    } else {
        var cdir = process.cwd();
        fs.appendFileSync(cdir + '/public/projects/'+req.session.proj_path+'/vars/servers.yml', '\n  ' + req.body.hostname + ':\n    name: ' + req.body.aliasname + '\n    teams: [' + req.body.teams.toString()+']');
        res.cookie('proj_path',req.session.proj_path ).render('servers', {proj_path: req.session.proj_path});
    }

});


module.exports = router;
