var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    req.session.proj_path = '';
    res.cookie('proj_path',req.session.proj_path ).render('logout', {proj_path: req.session.proj_path});
});

module.exports = router;
