var express = require('express');
var router = express.Router();
const fs = require('fs');
var process = require('process');



/* GET home page. */
router.post('/', function (req, res, next) {

    if (!req.session.proj_path){
        res.redirect('/');
    } else {
        console.log('CREATE USER: '+req.body.username+' / '+req.body.teams);
        var cdir = process.cwd();
        fs.appendFileSync(cdir + '/public/projects/'+req.session.proj_path+'/vars/users.yml', '\n  - username: '+ req.body.username + ':\n    name: ' + req.body.namecomment + '\n    team: [' + req.body.teams.toString() + ']\n    ssh_keys:\n      - '+req.body.sshkey+'\n');
        res.cookie('proj_path',req.session.proj_path ).render('users', {proj_path: req.session.proj_path});
    }

});


module.exports = router;
