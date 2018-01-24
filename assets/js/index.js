
var ip_show = document.querySelector('#ip');
var topic_show = document.querySelector('#topic');

var row1 = "";
var row2 = "";
var row3 = "";
var main = document.querySelector('#rec');
main.innerHTML = row1 + "<br>" + row2 + "<br>" + row3 + "<br>";

var temp = document.querySelector('#temp');
var humid = document.querySelector('#humid');
var index_temp = 0;
var index_humid = 0;
var client;

var IP;
var topic;

function connect()
{
	IP = ip_show.value;
	topic = topic_show.value;
	
	client = mqtt.connect(IP); 
	client.subscribe(topic);
	
	client.on("message", 
		function(topic, payload) 
		{
			row1 = row2;
			row2 = row3;
			row3 = payload.toString();

			index_temp = row3.indexOf("Temperature");
			index_humid = row3.indexOf("Humidity");
			index_light = row3.indexOf("Light");
			index_uv = row3.indexOf("UV");
			index_soil = row3.indexOf("Soil");
			index_press = row3.indexOf("Pressure");

			temp.value = row3.slice( index_temp + 12, index_temp + 17 );
			humid.value = row3.slice( index_humid + 9, index_humid + 14 )
			light.value = row3.slice( index_light + 6, index_light + 9 )
			uv.value = row3.slice( index_uv + 3, index_uv + 6 )
			soil.value = row3.slice( index_soil + 5, index_soil + 10 )
			press.value = row3.slice( index_press + 9, index_press + 16 )
			//console.log( payload.toString() );
			main.innerHTML = row1 + "<br>" + row2 + "<br>" + row3 + "<br>";
			//txt.value = payload.toString();
			console.log( payload.toString() );
			  
		}
    );
}

function publish()
{
	var cmd = document.querySelector('#message');
	console.log(cmd.value);
	client.publish( topic , cmd.value );
}



/*
setTimeout(
	function()
	{
		console.log("end");
		client.end();
	}, 
50000);
*/


