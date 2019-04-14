'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    //res.render('index', { title: 'Express' });
	console.log("Request homepage.");
	res.sendFile(process.cwd()+'/editor.html');
});

router.post('/', function (req, res) {
	var code = req.body.code;
	var filename = req.body.filename;
	var folder = req.body.folder;
	console.log("Code:\n" + code + "\nFile name: " + filename + "\nFolder: " + folder);
	var dirPath = process.cwd() + '/public/data/';
	var filePath = dirPath + filename;
	console.log("Save data at: " + filePath);
	fs.writeFile(filePath, code, function () {
		res.sendFile(process.cwd() + '/editor.html');
		//res.send("Successfully storing data.");
	});

});

module.exports = router;
