$(function() {
    var App = {

        /**
         * Init Function
         */
        init: function() {
            App.General();
            App.Currency();
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
                        $(this).closest('.form-edit').find('button').css('display','block');
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
        },

        Currency: function(){
            $("input[data-type='currency']").on({
                keyup: function() {
                  formatCurrency($(this));
                },
                blur: function() { 
                  formatCurrency($(this), "blur");
                }
            });


            function formatNumber(n) {
              // format number 1000000 to 1,234,567
              return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }


            function formatCurrency(input, blur) {
              // appends $ to value, validates decimal side
              // and puts cursor back in right position.
              
              // get input value
              var input_val = input.val();
              
              // don't validate empty input
              if (input_val === "") { return; }
              
              // original length
              var original_len = input_val.length;

              // initial caret position 
              var caret_pos = input.prop("selectionStart");
                
              // check for decimal
              if (input_val.indexOf(".") >= 0) {

                // get position of first decimal
                // this prevents multiple decimals from
                // being entered
                var decimal_pos = input_val.indexOf(".");

                // split number by decimal point
                var left_side = input_val.substring(0, decimal_pos);
                var right_side = input_val.substring(decimal_pos);

                // add commas to left side of number
                left_side = formatNumber(left_side);

                // validate right side
                right_side = formatNumber(right_side);
                
                // On blur make sure 2 numbers after decimal
                if (blur === "blur") {
                  right_side += "00";
                }
                
                // Limit decimal to only 2 digits
                right_side = right_side.substring(0, 2);

                // join number by .
                // input_val = "$" + left_side + "." + right_side;

              } else {
                // no decimal entered
                // add commas to number
                // remove all non-digits
                input_val = formatNumber(input_val);
                // input_val = "$" + input_val;
                
                // final formatting
                if (blur === "blur") {
                  input_val += ".00";
                }
              }
              
              // send updated string to input
              input.val(input_val);

              // put caret back in the right position
              var updated_len = input_val.length;
              caret_pos = updated_len - original_len + caret_pos;
              input[0].setSelectionRange(caret_pos, caret_pos);
            }
        }
    };

    $(function() {
        App.init();
    });

});