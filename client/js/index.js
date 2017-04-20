$(document).ready(() => {
    // Validation for email
    let regEx = /^https?:\/\/(\S+\.)?(\S+\.)(\S+)\S*/;

    // Algorithm to check if url is valid on keyup, paste, then enable botton to be clicked 
    $("input[name='lngUrl']").bind("keyup input", (e) => {
        let value =  $("input[name='lngUrl']").val();

        if(regEx.test(value)){
            $(".lng-url-btn").removeAttr("disabled").css({
                "color": "#000",
                "boxShadow": "0px 0px 5px royalblue",
                "borderStyle": "outset"
            });

            if(e.key ===  "Enter"){
                $.ajax({
                    type: "post",
                    url: "/new",
                    data: {
                        url: value
                    },
                    dataType: "json",
                    success: function (response) {
                        if(response.error && response.shortCode){
                            $(".lng-url-error-msg").html(response.error).css("color", "red");
                            $("input[name='shtUrl']").val(response.shortCode);
                        }else if(response.original && response.shortCode){
                            $(".lng-url-error-msg").html("Url shortened successfully").css("color", "green");
                            $("input[name='shtUrl']").val(response.shortCode);
                        }else{
                            $(".lng-url-error-msg").html(response.error).css("color", "red");
                        }
                        $("input[name='lngUrl']").val("");
                        $("input[name='lngUrl']").removeAttr("disabled");
                    }
                });
                $(".lng-url-btn").attr("disabled","disabled").css({
                    "color": "grey",
                    "backgroundColor": "#fff",
                    "boxShadow": "none",
                    "borderStyle": "solid"
                });
                $("input[name='lngUrl']").attr("disabled","disabled");
            }
        }else{
            $(".lng-url-btn").attr("disabled","disabled").css({
                "color": "grey",
                "backgroundColor": "#fff",
                "boxShadow": "none",
                "borderStyle": "solid"
            });
        }
    });

    // If original url shorten botton is clicked then disable it
    $(".lng-url-btn").click(function (e) { 

        // if botton is already disabled, don't run else run this 
        if(!$(this).attr("disabled")){
            let value =  $("input[name='lngUrl']").val();
            $.ajax({
                type: "post",
                url: "/new",
                data: {
                    url: value
                },
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    if(response.error && response.shortCode){
                            $(".lng-url-error-msg").html(response.error).css("color", "red");
                            $("input[name='shtUrl']").val(response.shortCode);
                    }else if(response.original && response.shortCode){
                        $(".lng-url-error-msg").html("Url shortened successfully").css("color", "green");
                        $("input[name='shtUrl']").val(response.shortCode);
                    }else{
                        $(".lng-url-error-msg").html(response.error).css("color", "red");
                    }
                    $("input[name='lngUrl']").val("");
                    $("input[name='lngUrl']").removeAttr("disabled");
                }
            });
            $(".lng-url-btn").attr("disabled","disabled").css({
                    "color": "grey",
                    "backgroundColor": "#fff",
                    "boxShadow": "none",
                    "borderStyle": "solid"
            });
            $("input[name='lngUrl']").attr("disabled","disabled");
        }
    });


    // [Start] Handling the Go input -----
    
    // Validate input on keyup and paste
    $("input[name='shtUrl']").bind("keyup input", function(e){
        let value = $(this).val();
        
        if(!isNaN(value) && value.trim() !== ""){
            console.log(value);
            $(".sht-url-error-msg").html("").css("color", "red");
             $(".sht-url-btn").removeAttr("disabled").css({
                "color": "#000",
                "boxShadow": "0px 0px 5px royalblue",
                "borderStyle": "outset"
            });

              if(e.key ===  "Enter"){
                  $.ajax({
                    type: "post",
                    url: `/new/check`,
                    data: {
                        id: value
                    },
                    dataType: "json",
                    success: function (response) {
                         if(response.error){
                            $(".sht-url-error-msg").html(response.error).css("color", "red");
                        }else{
                            window.location = response.original;
                        }
                    }
                  });
              }

        }else{
            if(e.key == "Enter"){
                $.ajax({
                    type: "post",
                    url: `/new/check`,
                    data: {
                        id: value
                    },
                    dataType: "json",
                    success: function (response) {
                        $(".sht-url-error-msg").html(response.error+", Insert only numbers into this field").css("color", "red");
                    }
                  });
            }else{
                $(".sht-url-error-msg").html("This field only accepts numbers.").css("color", "red");
            }
            $(".sht-url-btn").attr("disabled","disabled").css({
                "color": "grey",
                "backgroundColor": "#fff",
                "boxShadow": "none",
                "borderStyle": "solid"
            });
        }
    });

    // Botton click 
    $(".sht-url-btn").click(function (e) {
            if(!$(this).attr("disabled")){
                let value = $("input[name='shtUrl']").val();
                console.log(value);
                $.ajax({
                    type: "post",
                    url: `/new/check`,
                    data: {
                        id: value
                    },
                    dataType: "json",
                    success: function (response) {
                        if(response.error){
                            $(".sht-url-error-msg").html(response.error).css("color", "red");
                        }else{
                            window.location = response.original;
                        }
                    }
                  });
            }
        });
    });