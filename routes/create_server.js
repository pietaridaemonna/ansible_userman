var express = require('express');
var router = express.Router();
const fs = require('fs');
var process = require('process');


/* GET home page. */
router.post('/', function (req, res, next) {

    //req.session.proj_path = req.body.proj_path;
    console.log(req.session.proj_path+'   CREATE_SERVER ------------>');
    console.log('WRITING STUF::');
    console.log('\n  ' + req.body.hostname + ':\n    name:' + req.body.aliasname + '\n    teams: []'); // + req.body.teams);

    if (!req.session.proj_path){
        res.redirect('/');
    } else {
        var cdir = process.cwd();
        fs.appendFileSync(cdir + '/public/projects/'+req.session.proj_path+'/vars/servers.yaml', '\n  ' + req.body.hostname + ':\n    name:' + req.body.aliasname + '\n    teams: ' + req.body.teams);
        res.cookie('proj_path',req.session.proj_path ).render('servers', {proj_path: req.session.proj_path});
    }

});


module.exports = router;
