window.addEventListener("load", function() {

    $('#summernote').summernote({
        placeholder: 'Type your text',
        tabsize: 2
        //Height not set, editable area’s height will change according to contents.
    });

    //const title = document.querySelector('#articleTitle');
    const upload = document.querySelector('#save');
    const titleInner = document.querySelector('#title-inner');
    const articleInner = document.querySelector('#article-inner');
    const editor = document.querySelector('.card-block');
    upload.addEventListener('click', function () {
        let titleValue = document.querySelector('#title').value;
        $("#summernote").val($('#summernote').summernote('code'));
        articleInner.innerHTML = $('#summernote').summernote('code');
        titleInner.innerHTML = titleValue;
        editor.innerHTML="";
        titleValue="";

    });

})