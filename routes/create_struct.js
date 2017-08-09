'use strict'

var express = require('express');
var router = express.Router();
const fs = require('fs-extra')


/* GET home page. */
router.post('/', function (req, res, next) {

    req.cookies.proj_path = req.body.proj_path;
    //console.log('--------------CREATING folder public/projects/'+req.body.proj_path+'/vars');

    try {
        const dir = 'public/projects/'+req.cookies.proj_path+'/vars';
        fs.ensureDirSync(dir)
        console.log('success!');
    } catch (err) {
        console.error(err);
    }

    try{
        const servers = 'public/projects/'+req.body.proj_path+'/vars/servers.yaml';
        const teams = 'public/projects/'+req.body.proj_path+'/vars/teams.yaml';
        const users = 'public/projects/'+req.body.proj_path+'/vars/users.yaml';

        console.log('creating servers...')
        fs.outputFileSync(users, '---\nusers:\n  - username: myuser\n    name: some admin\n    team: [samplegroup]\n    ssh_keys:\n      - ssh-rsa FJDLJS:FJ:SDJ:F:FDSFKJDSF\n');
        fs.outputFileSync(teams, '---\nteams:\n  samplegroup:\n    groups: [somegroup]\n      add_keys_to_user: [somegroup]');
        fs.outputFileSync(servers, '---\nservers:\n  mysamplehost:\n    name: samplehost\n    teams: [samplegroup]');
    } catch (err){
        console.error(err);
    }

// create files
// ├── main.yml
// ├── servers.yml
// ├── teams.yml
// └── users.yml

    res.cookie('proj_path',req.cookies.proj_path ).render('create_struct', {proj_path: req.cookies.proj_path});
});


module.exports = router;
