'use strict'

var express = require('express');
var router = express.Router();
const fs = require('fs-extra')


/* GET home page. */
router.post('/', function (req, res, next) {

    req.cookies.proj_path = req.body.proj_path;
    console.log('--------------CREATING folder public/projects/'+req.body.proj_path);

    try {
        const dir = 'public/projects/'+req.cookies.proj_path;
        fs.ensureDirSync(dir)
        console.log('success!')
    } catch (err) {
        console.error(err)
    }

    res.render('teams', {proj_path: req.cookies.proj_path});
});


module.exports = router;
