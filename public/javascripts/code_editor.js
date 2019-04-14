var xmlhttp = new XMLHttpRequest();

function submitCode() {
	var data = new Array();
	//console.log(document.getElementsByName('code')[0].value)
	data[0] = document.getElementsByName('code')[0].value;
	data[1] = document.getElementsByName('filename')[0].value;
	data[2] = document.getElementsByName('folder')[0].value;
	console.log("Code:\n" + data[0] + "\nFile name:\n" + data[1] + "\nFolder:\n" + data[2]);
	postData('postcode', data);
}

function clearCode() {
	if (confirm("Warning: Your code will be cleared!")) {
		document.getElementById('code').value = "";
	}
}

function postData(path, data) {  // 已经被废弃
	var form = document.createElement("form");
	form.setAttribute('method', "post");
	form.setAttribute('action', path);
	var dataType = ['code', 'filename', 'folder'];
	for (var i = 0; i < 3; ++i) {
		var input = document.createElement("input");
		input.setAttribute(dataType[i], data[i]);
		form.appendChild(input);
	}
	document.body.appendChild(form);
	form.submit();
}

function showExistingFile() {

}

function loadExistingFileName() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		console.log("Get response.")
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
			//document.getElementById("existingFileName").innerHTML = xmlhttp.responseText;
			var template = '<option value="example">example</option>\n';
			var generateHTML = "";
			var fileNameList = xmlhttp.responseText.split("\n");
			fileNameList.pop();
			console.log(fileNameList);
			for (var i = 0; i < fileNameList.length; i++) {
				generateHTML += template.replace(/example/g, fileNameList[i]);
			}
			console.log("generateHTML: " + generateHTML);

			document.getElementById('existingFileName').innerHTML = generateHTML;
		}
	}
	xmlhttp.open("GET", '/existingFile', true);
	xmlhttp.send();
}


function submitCode() {
	var code = document.getElementById('code').value;
	var filename = document.getElementById('filename').value;
	$.post('/', { 'code': code, 'filename': filename }, function (result) {
		loadExistingFileName();
		console.log("update filename list: " + filename);
	});
	
}


function loadFile() {
	var selectTag = document.getElementById('existingFileName');
	var selectedFileName = selectTag.options[selectTag.selectedIndex].value;
	console.log("Select file: " + selectedFileName);
	$.post('/getFile', { 'filename': selectedFileName }, function (result) {
		console.log("Get file content:" + result);
		document.getElementById('code').value = result;
		document.getElementById('filename').value = selectedFileName;
	});

}



window.onload = function () {
	//this.console.log("All done.")
	loadExistingFileName();
}


//$(document).ready(function () {
//	$("button").click(function () {
//		$.ajax({
//			url: "demo_test.txt", success: function (result) {
//				$("#div1").html(result);
//			}
//		});
//	});
//});


























function submitCode2() {  // 存在问题
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		console.log("Get response after post code")
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("POST", '/', true);
	var code = document.getElementById('code').value;
	var filename = document.getElementById('filename').value;
	var postData = "code=" + code + "&filename=" + filename;
	console.log("Post data: " + postData);
	xmlhttp.send(postData);

}



function loadFile2() {  // 存在问题
	var selectTag = document.getElementById('existingFileName');
	var selectedFileName = selectTag.options[selectTag.selectedIndex].value;
	console.log("Select file: " + selectedFileName);


	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		console.log("Get response.")
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log("Get file content:" + xmlhttp.responseText);
			document.getElementById('code').value = xmlhttp.responseText;
		}
	}
	xmlhttp.open("POST", '/getFile', true);
	var postData = "filename=" + selectedFileName + "&";
	console.log("Post data: " + postData);
	xmlhttp.send(postData);

}