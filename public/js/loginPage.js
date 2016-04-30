document.write('<script type="text/javascript" src="./js/sys_config.js"></script>');

$(function() {
     $.idcode.setCode();
     $.idcode.setCode();
     //$.idcodeUp.setCode();

    //表单框居中
    $(".wrap").center();
    $(window).resize(function() {
        $(".wrap").center();
    })

    //注册框和按钮
    var $clsSignUp = $(".clsSignUp");
    var $btnSignUp = $("#btnSignUp");

    //登录框和按钮
    var $clsSignIn = $(".clsSignIn");
    var $btnSignIn = $("#btnSignIn");

    var $titleSignUp = $("#titleSignUp");
    var $titleSignIn = $("#titleSignIn");
    var underline = $("#underline");    

    $clsSignUp.hide();
    $btnSignUp.hide();

    $clsSignIn.show();
    $btnSignIn.show();

    $titleSignIn.addClass("sp1");

    // $titleSignUp.click(function() {
    //     $titleSignIn.removeClass("sp1");
    //     $titleSignUp.addClass("sp1");

    //     $clsSignUp.show();
    //     $btnSignUp.show();
    //     $clsSignIn.hide();
    //     $btnSignIn.hide();

    //     underline.animate({
    //         "left": "60px"
    //     }, 250);

    // });

    // $titleSignIn.click(function() {
    //     $titleSignUp.removeClass("sp1");
    //     $titleSignIn.addClass("sp1");

    //     $clsSignUp.hide();
    //     $btnSignUp.hide();
    //     $clsSignIn.show();
    //     $btnSignIn.show();

    //     underline.animate({
    //         "left": "170px"
    //     }, 250);

    // });
});

 

$("#titleSignUp").click(function() {
    $("#titleSignIn").removeClass("sp1");
    $("#titleSignUp").addClass("sp1");

    $(".clsSignUp").show();
    $("#btnSignUp").show();
    $(".clsSignIn").hide();
    $("#btnSignIn").hide();

    $("#underline").animate({
        "left": "60px"
    }, 250);

});

$("#titleSignIn").click(function() {
    $("#titleSignUp").removeClass("sp1");
    $("#titleSignIn").addClass("sp1");

    $(".clsSignUp").hide();
    $("#btnSignUp").hide();
    $(".clsSignIn").show();
    $("#btnSignIn").show();

    $("#underline").animate({
        "left": "170px"
    }, 250);

});

//注册按钮提交事件
$("#btnSignUp").click(function(){
    console.log("up: "+$.idcode.validateCode());
    var suEmail = $("#suEmail").val();
    var suPwd = $("#suPwd").val();
    var suPwdCfm = $("#suPwdCfm").val();
    var reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(suEmail === ''){
        alert('Please type your e-mail address.');
        return;
    }
    if(suPwd === ''){
        alert('Please type your password.');
        return;
    }
    if(suPwdCfm === ''){
        alert('Please type your password.');
        return;
    }
    if(!reEmail.test(suEmail)){
        alert('Invalid email address.');
        return;
    }
    if(suPwd !== suPwdCfm){
        alert('Entered passwords differ');
        return;
    }
    if(!$.idcode.validateCode()){
        alert('Verification code error');
        return;
    }
    var postData = {
        uEmail:suEmail,
        uPassword:suPwd
    };

    // postData.uEmail = "evercx@evercx.mem";
    // postData.uPassword = "306534137";

    var c=confirm("Are you sure to submit?");
    if (c==true){
        $.ajax({
            type:'POST',
            url:'/register',
            contentType: "application/json",
            data:JSON.stringify(postData),
            success:function(data){
                console.log(data);
                if(data.err){
                    console.log(data.err);
                    alert(data.err);
                    return;
                }else{
                    alert(data.success);
                    $("#siEmail").val(postData.uEmail);
                    $("#siPwd").val(postData.uPassword);
                    $("#titleSignIn").click();
                    //window.location.reload();
                }
            }
        });
    }

});

//登录按钮提交事件
$("#btnSignIn").click(function(){
    var siEmail = $("#siEmail").val();
    var siPwd = $("#siPwd").val();
    var reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(siEmail === ''){
        alert('Please type your e-mail address.');
        return;
    }
    if(siPwd === ''){
        alert('Please type your password.');
        return;
    }
    if(!reEmail.test(siEmail)){
        alert('Invalid email address.');
        return;
    }

    var postData = {
        uEmail:siEmail,
        uPassword:siPwd
    };
    //postData.uEmail = "evercx@evercx.me";
    //postData.uPassword = "306534137";

    $.ajax({
        type:'POST',
        url:'/login',
        contentType: "application/json",
        data:JSON.stringify(postData),
        success:function(data){
            if(data.err){
                console.log(data.err);
            }else{
                window.location.reload();
            }
        }
    });
});
