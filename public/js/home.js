$(function() {
    $.ajax({
        type:'GET',
        url:'/getSession',
        success:function(data){
            if(data.err){
                console.log(data.err);
            }else{
            	console.log(data.session);
                $("#wel").text("welcome: "+data.session);
            }
        }

    })
});

$("#logout").click(function(){
	$.ajax({
		type:'GET',
		url:"/logout",
		success:function(data){
			window.location.reload();
		}
	})
})



$("#submit").click(function () {
	var msg=$("#input").val();
	var requestData={
		msg:msg
	};


	// $.ajax({
	// 	type:'post',
	// 	url:'http://localhost:32929/localapi',
	// 	contentType: "application/json",
	// 	data:JSON.stringify(requestData),
	// 	success:function(data){
	// 		console.log(data);
	// 		$("#output").val(data.msg);
	// 	}

	// })

});
