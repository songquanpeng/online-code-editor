'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function (req, res) {
	res.render('index');
});

router.post('/', function (req, res) {
	var code = req.body.code;
	var filename = req.body.filename;
	var folder = req.body.folder;
	var dirPath = process.cwd() + '/public/data/';
	var filePath = dirPath + filename;
	fs.writeFile(filePath, code, function () {
		res.sendFile(process.cwd() + '/index.ejs');
		//res.send("Successfully storing data.");
	});
});

// app.get("/existingFile", function (req, res) {
// 	var responceText = '';
// 	const targetDir = process.cwd() + '/public/data';
// 	console.log("Taregt dir: " + targetDir);
// 	fs.readdir(targetDir, (err, files) => {
// 		files.forEach(file => {
// 			const temp = file + '\n';
// 			responceText += temp;
// 		});
// 		res.send(responceText);
// 	});
// });
//
//
// app.post('/getFile', function (req, res) {
// 	const targetDir = process.cwd() + '/public/data/';
// 	const targetFile = targetDir + req.body.filename;
// 	fs.readFile(targetFile, 'utf-8', function (err, data) {
// 		if (err) {
// 		} else {
// 			res.send(data);
// 		}
// 	})
// });

module.exports = router;
