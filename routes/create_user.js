var express = require('express');
var router = express.Router();
const fs = require('fs');
var process = require('process');
const yaml = require('js-yaml');



/* GET home page. */
router.post('/', function (req, res, next) {

    if (!req.session.proj_path){
        res.redirect('/');
    } else {
        var cdir = process.cwd();
        var teamz = [];
        console.log('CREATE USER: '+'\n  - username: '+ req.body.username + '\n    name: ' + req.body.namecomment + '\n    team: [' + req.body.teams.toString() + ']\n    ssh_keys:\n      - '+req.body.sshkey+'\n');


        const config = yaml.safeLoad(fs.readFileSync(cdir + '/public/projects/' + req.session.proj_path + '/vars/teams.yml', 'utf8'));

        for (const team in config.teams) {
            console.log(team);
            teamz.push(team);
        }

        fs.appendFileSync(cdir + '/public/projects/'+req.session.proj_path+'/vars/users.yml', '\n  - username: '+ req.body.username + '\n    name: ' + req.body.namecomment + '\n    team: [' + req.body.teams.toString() + ']\n    ssh_keys:\n      - '+req.body.sshkey+'\n');
        res.cookie('proj_path',req.session.proj_path ).render('users', {proj_path: req.session.proj_path, teams: teamz});
    }

});


module.exports = router;
