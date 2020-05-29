function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();
            $('#face-image').attr('src', e.target.result);
            $('.file-upload-content').show();

        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
    initTotal();
}
