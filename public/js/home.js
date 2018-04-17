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

	for(var i = 0;i<5;i++){
		var chartdiv = "#chartdiv" + i;
		$(chartdiv).hide();
	}
	// $(".modal-body").empty();
	// $(".modal-body").append('<canvas id="detailChart0" class="detailChart"></canvas><canvas id="detailChart1" class="detailChart"></canvas><canvas id="detailChart2" class="detailChart"></canvas><canvas id="detailChart3" class="detailChart"></canvas><canvas id="detailChart4" class="detailChart"></canvas>');
	// $(".detailChart").hide();

});


$(".chart-part").dblclick(function(){
	var id = $(this).attr('id');
	var detailID = "#detailChart" + id.substring(8,9);
	$('#myModal').modal();
	$(".detailChart").hide();
	$(detailID).show();
})


$("#logout").click(function(){
	$.ajax({
		type:'GET',
		url:"/logout",
		success:function(data){
			window.location.reload();
		}
	})
})

$("#openmodal").click(function(){
	$('#myModal').modal();
})

$("#submit").click(function(){

	for(var i = 0;i<5;i++){
		var chartdiv = "#chartdiv" + i;
		var myChart = "myChart" + i;
		$(chartdiv).empty();
		$(chartdiv).append('<canvas id="'+myChart+'" class="myChart"></canvas>');
		$(chartdiv).hide();
	}

	$(".modal-body").empty();
	$(".modal-body").append('<canvas id="detailChart0" class="detailChart"></canvas><canvas id="detailChart1" class="detailChart"></canvas><canvas id="detailChart2" class="detailChart"></canvas><canvas id="detailChart3" class="detailChart"></canvas><canvas id="detailChart4" class="detailChart"></canvas>');
	//$(".detailChart").hide();

	var sDate = $("#sYear").val() + '/' + $("#sMonth").val();
	var eDate = $("#eYear").val() + '/' + $("#eMonth").val();
	var options = {
		icc:0,
		cc:0,
		csce:0,
		tcd:0
	};

	if(eDate <= sDate){
		alert("Invaild Date");
		return ;
	}

	if($("#icc").is(':checked')){
		options.icc = 1;
		//chartNumber ++;
	}
	if($("#cc").is(':checked')){
		options.cc = 1;
		//chartNumber ++;
	}
	if($("#csce").is(':checked')){
		options.csce = 1;
		//chartNumber ++;
	}
	if($("#tcd").is(':checked')){
		options.tcd = 1;
		//chartNumber ++;
	}
	
	var postData = {
		sDate:sDate,
		eDate:eDate
	}

	$.ajax({
		type:'POST',
		url:'/dateOfCFI',
		contentType: "application/json",
		data:JSON.stringify(postData),
		// success:function(data){
		// 	console.log(data);
		// 	console.log(data[1]['Containership (8,000 + TEU) Contracting']);
		// }
		success:function(data){
			dealData(data,options);
		}

	})

});



var dealData = function(data,options) {
	console.log(data);
	if(data.length < 1){
		alert("No Results. Please try again");
		return;
	}

	var chartNumber = 0;
	var CFIDate = [];
	var CFIicc = [];
	var CFIcsce = [];
	var CFItcd = [];
	var CCFI = [];
	var CFIcc = {
		"Containership (12,000 + TEU) Contracting":[],
		"Containership (8,000 + TEU) Contracting":[]
	}

	for(var i = 0; i < data.length;i++){
		CFIDate.push(data[i]["Date"]);
		CFIicc.push(data[i]["Idle Containership Capacity (% of the fleet)"]);
		CFIcsce.push(data[i]["China Seaborne Containerisable Exports"]);
		CFItcd.push(data[i]["Total Containership Demolition"]);
		CCFI.push(data[i]["CCFI"]);
		CFIcc["Containership (12,000 + TEU) Contracting"].push(data[i]["Containership (12,000 + TEU) Contracting"]);
		CFIcc["Containership (8,000 + TEU) Contracting"].push(data[i]["Containership (8,000 + TEU) Contracting"]);
	};

	var chartCCFI = {
		id:"#myChart"+chartNumber,
		xLabels:CFIDate,
		datasets:[{
			label: 'CCFI',
			backgroundColor: randomColor(),
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			data : CCFI
		}],
		chartType:'bar',
		chartTitle:'CCFI Bar Chart',
        ticks: {
            suggestedMin: Math.floor(getMinValue(CCFI)),
            suggestedMax: Math.ceil(getMaxValue(CCFI))
        }
	}
	var chartdiv = "#chartdiv" + chartNumber++;
	$(chartdiv).show();
	renderChart(chartCCFI.id,chartCCFI.xLabels,chartCCFI.datasets,chartCCFI.chartType,chartCCFI.chartTitle,chartCCFI.ticks);
	renderChart("#detailChart"+(chartNumber-1),chartCCFI.xLabels,chartCCFI.datasets,chartCCFI.chartType,chartCCFI.chartTitle,chartCCFI.ticks);

	if(options.icc === 1){
		var charticc = {
			id:"#myChart"+chartNumber,
			xLabels:CFIDate,
			datasets:[{
				label: 'Idle Containership Capacity (% of the fleet)',
				backgroundColor: randomColor(),
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : CFIicc
			}],
			chartType:'bar',
			chartTitle:'Idle Containership Capacity Bar Chart',
	        ticks: {
	            suggestedMin: Math.floor(getMinValue(CFIicc)),
	            suggestedMax: Math.ceil(getMaxValue(CFIicc))
	        }
		}
		var chartdiv = "#chartdiv" + chartNumber++;
		$(chartdiv).show();
		renderChart(charticc.id,charticc.xLabels,charticc.datasets,charticc.chartType,charticc.chartTitle,charticc.ticks);
		renderChart("#detailChart"+(chartNumber-1),charticc.xLabels,charticc.datasets,charticc.chartType,charticc.chartTitle,charticc.ticks);
	}

	if(options.cc === 1){
		var chartcc = {
			id:"#myChart"+chartNumber,
			xLabels:CFIDate,
			datasets:[{
				label: 'Containership (12,000 + TEU) Contracting',
				backgroundColor: randomColor(),
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : CFIcc["Containership (12,000 + TEU) Contracting"]
			},{
				label: 'Containership (8,000 + TEU) Contracting',
				backgroundColor: randomColor(),
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : CFIcc["Containership (8,000 + TEU) Contracting"]
			}],
			chartType:'line',
			chartTitle:'Containership (8,000 + TEU) Contracting Line Chart',
	        ticks: {
	            suggestedMin: Math.floor(getMinValue(CFIcc["Containership (12,000 + TEU) Contracting"])),
	            suggestedMax: Math.ceil(getMaxValue(CFIcc["Containership (12,000 + TEU) Contracting"]))
	        }
		}
		var chartdiv = "#chartdiv" + chartNumber++;
		$(chartdiv).show();
		renderChart(chartcc.id,chartcc.xLabels,chartcc.datasets,chartcc.chartType,chartcc.chartTitle,chartcc.ticks);
		renderChart("#detailChart"+(chartNumber-1),chartcc.xLabels,chartcc.datasets,chartcc.chartType,chartcc.chartTitle,chartcc.ticks);
	}


	if(options.csce === 1){
		var chartcsce = {
			id:"#myChart"+chartNumber,
			xLabels:CFIDate,
			datasets:[{
				label: 'China Seaborne Containerisable Exports',
				backgroundColor: randomColor(),
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : CFIcsce
			}],
			chartType:'radar',
			chartTitle:'China Seaborne Containerisable Exports Radar Chart',
	        ticks: {
	            suggestedMin: Math.floor(getMinValue(CFIcsce)),
	            suggestedMax: Math.ceil(getMaxValue(CFIcsce))
	        }
		}
		var chartdiv = "#chartdiv" + chartNumber++;
		$(chartdiv).show();
		renderChart(chartcsce.id,chartcsce.xLabels,chartcsce.datasets,chartcsce.chartType,chartcsce.chartTitle,chartcsce.ticks);
		renderChart("#detailChart"+(chartNumber-1),chartcsce.xLabels,chartcsce.datasets,chartcsce.chartType,chartcsce.chartTitle,chartcsce.ticks);
	}

	if(options.tcd === 1){
		var charttcd = {
			id:"#myChart"+chartNumber,
			xLabels:CFIDate,
			datasets:[{
				label: 'Total Containership Demolition',
				backgroundColor: randomColor(),
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : CFItcd
			}],
			chartType:'radar',
			chartTitle:'Total Containership Demolition Radar Chart',
	        ticks: {
	            suggestedMin: Math.floor(getMinValue(CFItcd)),
	            suggestedMax: Math.ceil(getMaxValue(CFItcd))
	        }
		}
		var chartdiv = "#chartdiv" + chartNumber++;
		$(chartdiv).show();
		renderChart(charttcd.id,charttcd.xLabels,charttcd.datasets,charttcd.chartType,charttcd.chartTitle,charttcd.ticks);
		renderChart("#detailChart"+(chartNumber-1),charttcd.xLabels,charttcd.datasets,charttcd.chartType,charttcd.chartTitle,charttcd.ticks);
	}

}

var getMaxValue = function(data){
	var max = data[0];

	for(var i = 0; i <data.length;i++){
		if(data[i]>max) 
			max = data[i];
	}

	return max;
}

var getMinValue = function(data){
	var min = data[0];
	
	for(var i = 0; i <data.length;i++){
		if(data[i]<min) 
			min= data[i];
	}

	return min;
}



