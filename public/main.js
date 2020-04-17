let editor;
let currentFilename = "";

function setCurrentFilename(filename) {
    currentFilename = filename.trim();
    $("#filename").val(currentFilename);
}

function loadList() {
    $.get("/list", function (data, status) {
        if (status === "success") {
            data.forEach(function (filename) {
                $("#fileSelect").append(`<option value='${filename}'>${filename}</option>`);
            })
        }
    });
}

function loadFile() {
    setCurrentFilename($('#fileSelect').find(":selected").text());
    $.get(`/${currentFilename}`, function (data, status) {
        if (status === "success") {
            editor.setValue(data);
        }
    });
}

function submit() {
    $.post('/', {
        content: editor.getValue(),
        filename: currentFilename
    }, function (data, status) {
        console.log(status);
    });
}

function clearEditor() {
    editor.setValue("");
    console.log(editor.getValue())
}

function printInfo() {
    console.log('\x1B[31m%s\x1B[0m', '如果该项目帮到了你，请给个 star： https://github.com/songquanpeng/online-code-editor');
    console.log('\x1B[31m%s\x1B[0m', 'Please star this project if it help you: https://github.com/songquanpeng/online-code-editor');
}

$(document).ready(function () {
    printInfo();
    editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
        lineNumbers: true
    });
    loadList();
    setCurrentFilename("untitled");
});