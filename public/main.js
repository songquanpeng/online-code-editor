let editor;
let currentFilename = "";

function setCurrentFilename(filename) {
    currentFilename = filename.trim();
    $("#filename").val(currentFilename);
}

function loadList() {
    $.get("/list", function (data, status) {
        if (status === "success") {
            $("#fileSelect").find('option').remove();
            data.forEach(function (filename) {
                $("#fileSelect").append(`<option value='${filename}'>${filename}</option>`);
            });
            if(currentFilename==="") {
                setCurrentFilename($("#fileSelect option:first").val());
                loadFile();
            }
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
    setCurrentFilename($('#filename').val());
    $.post('/', {
        content: editor.getValue(),
        filename: currentFilename
    }, function (data, status) {
        loadList();
    });
}

function clearEditor() {
    editor.setValue("");
}

function deleteFile() {
    setCurrentFilename($('#filename').val());
    $.ajax({
        url: `/${currentFilename}`,
        type: "DELETE",
        success: function (result) {
            clearEditor();
            setCurrentFilename("untitled");
            loadList();
        }
    });
}

function printInfo() {
    console.log('\x1B[31m%s\x1B[0m', '如果该项目帮到了你，请给个 star： https://github.com/songquanpeng/online-code-editor');
    console.log('\x1B[31m%s\x1B[0m', 'Please star this project if it help you: https://github.com/songquanpeng/online-code-editor');
}

$(document).ready(function () {
    printInfo();
    editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
        lineNumbers: true,
        mode: "javascript",
        indentWithTabs: true,
        smartIndent: true,
        matchBrackets: true,
        theme: "solarized light"
    });
    loadList();
});