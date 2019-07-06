$(function() {
    var App = {

        /**
         * Init Function
         */
        init: function() {
            App.General();
        },

        General: function() {
            $(function() {

                $('.editor').click(function() {
                    $(this).each(function(n) {
                        $(this).closest('.form-edit').find('input').removeAttr('readonly');
                        $(this).closest('.form-edit').find('textarea').removeAttr('readonly');
                        $(this).closest('.form-edit').find('input').removeClass('form-control-plaintext').addClass('form-control');
                        $(this).closest('.form-edit').find('textarea').removeClass('form-control-plaintext').addClass('form-control');
                        $(this).closest('.form-edit').find('.field-icon').show();
                        $(this).closest('.form-edit').find('.select2').removeAttr('disabled');
                        $(this).closest('.form-edit').find('.selectpicker').removeAttr('disabled');
                        $(this).closest('.form-edit').find('.bootstrap-select').removeClass('disabled');
                        $(this).closest('.form-edit').find('.bootstrap-select button').removeClass('disabled');
                    })
                });

                $(".toggle-password").click(function() {
                    $(this).toggleClass("fa-eye fa-eye-slash");
                    var input = $($(this).attr("toggle"));
                    if (input.attr("type") == "password") {
                        input.attr("type", "text");
                    } else {
                        input.attr("type", "password");
                    }
                });

                $("[data-type=replyMsg]").click(function(){
                    $('#msgModal').modal('hide');
                });


                var readURL = function(input) {
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();

                        reader.onload = function (e) {
                            $('.avatar').attr('src', e.target.result);
                        }
                
                        reader.readAsDataURL(input.files[0]);
                    }
                }
                

                $(".file-upload").on('change', function(){
                    readURL(this);
                });

                $('#btn-upload').click(function(){ $('.file-upload').trigger('click'); });

                $('.sidebar-toggle .dropdown').on('show.bs.dropdown', function(e){
                    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
                });

                $('.sidebar-toggle .dropdown').on('hide.bs.dropdown', function(e){
                    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
                });

                $(".navbar-toggler").click(function(e) {
                    e.preventDefault();
                    var elem = document.getElementById("sidebar-wrapper");
                    left = window.getComputedStyle(elem,null).getPropertyValue("left");
                    if(left == "200px"){
                        document.getElementsByClassName("sidebar-toggle")[0].style.left="-200px";
                    }
                    else if(left == "-200px"){
                        document.getElementsByClassName("sidebar-toggle")[0].style.left="200px";
                    }
                });

                function getPageHeight(){
                    var height = (window.innerHeight > 0) ? window.innerHeight : document.documentElement.clientHeight;
                    $('.sidebar-nav').css('height',height-90);
                }
                window.onresize = getPageHeight();
                getPageHeight();
            });
        }
    };

    $(function() {
        App.init();
    });

});