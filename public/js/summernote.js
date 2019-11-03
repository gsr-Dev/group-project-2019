window.addEventListener("load", function() {
    console.log("in summernote.js");

    $('#summernote').summernote({
        placeholder: 'Type your text',
        tabsize: 2
        //Height not set, editable area’s height will change according to contents.
    });

    const title = document.querySelector('#articleTitle');
    const upload = document.querySelector('#save');
    const inner = document.querySelector('#articles-inner');
    const editor = document.querySelector('.card-block');
    upload.addEventListener('click', function () {
        const titleValue = document.querySelector('#title').value;
        $("#summernote").val($('#summernote').summernote('code'));
        inner.innerHTML += $('#summernote').summernote('code');
        title.innerText = titleValue;
        editor.innerHTML = '';
        titleValue = "";
    });

})