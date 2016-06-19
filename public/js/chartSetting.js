$(function(){
	// renderChart("#myChart0");
	// renderChart("#myChart1");
	// renderChart("#myChart2");
	// renderChart("#myChart3");
	// renderChart("#myChart4");
})

var renderChart = function(id,xLabels,datasets,chartType,chartTitle,ticks) {
	var ctx = $(id).get(0).getContext("2d");
	var data = {
		labels : xLabels,
		datasets : datasets
	}
	var config = {
		type: chartType,
		data:data,
        options: {
            responsive: true,
            title:{
                display:true,
                text:chartTitle
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
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        show: true,
                        labelString: 'Value'
                    },
                    ticks: ticks
                }]
            }
        }
	}


	new Chart(ctx,config);
}




var randomScalingFactor = function() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};
var randomColorFactor = function() {
    return Math.round(Math.random() * 255);
};
var randomColor = function() {
    return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',.7)';
};