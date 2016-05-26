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
                $("#myAccount").text(data.session);
            }
        }
    });

    //$(".right-part").height($(".left-part").height());
});


$(function() {
	//Get context with jQuery - using jQuery's .get() method.
	var ctx = $("#myChart").get(0).getContext("2d");
	//This will get the first returned node in the jQuery collection.
	var data = {
		labels : ["January","February","March","April","May","June","July"],
		datasets : [
			{
				label: 'Dataset 1',
				backgroundColor: randomColor(),
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : [65,59,90,81,56,55,40]
			},
			{
				label: 'Dataset 2',
				backgroundColor: randomColor(),
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : [28,48,40,19,96,27,100]
			}
		]
	}
	var config = {
		type: 'bar',
		data:data,
        options: {
            responsive: true,
            title:{
                display:true,
                text:'Chart.js Line Chart'
            },
            tooltips: {
                mode: 'label'
            },
            hover: {
                mode: 'dataset'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        show: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        show: true,
                        labelString: 'Value'
                    },
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                    }
                }]
            }
        }
	}

	var myNewChart = new Chart(ctx,config);
	console.log(myNewChart);
	//new Chart(ctx).Line(data,{bezierCurve: false});
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


var randomScalingFactor = function() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};
var randomColorFactor = function() {
    return Math.round(Math.random() * 255);
};
var randomColor = function() {
    return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',.7)';
};