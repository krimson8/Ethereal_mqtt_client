var ip_show = document.querySelector('#ip');
var topic_show = document.querySelector('#topic');

var row1 = "";
var row2 = "";
var row3 = "";
var main = document.querySelector('#rec');
var module = document.getElementById("module-id");
main.innerHTML = row1 + "<br>" + "<br>" + row2 + "<br>" + "<br>" + row3 + "<br>" + "<br>";

var client;

var IP;
var topic;
var m_value;
m_value = module.options[module.selectedIndex].text

function init()
{
	var row1 = "";
	var row2 = "";
	var row3 = "";
	main.innerHTML = row1 + "<br>" + "<br>" + row2 + "<br>" + "<br>" + row3 + "<br>" + "<br>";
	m_value = module.options[module.selectedIndex].text
	temp.value = "";
	humid.value = "";
	light.value = "";
	uv.value = "";
	soil.value = "";
	press.value = "";
	stime.value = "";
}

function connect()
{
	// m_value = module.options[module.selectedIndex].text
	IP = ip_show.value;
	topic = topic_show.value;
	client = mqtt.connect(IP);
    /* IN CASE OF SECURITY LOGIN
    client = mqtt.connect({
        host: '140.116.82.42',
        port: 9001,
        username: 'xiongtest',
        password: '123'
    });
    */ 
	client.subscribe(topic);
	
	client.on("message", 
		function(topic, payload) 
		{	
			row1 = row2;
			row2 = row3;
			row3 = payload.toString();

			if(row3.slice(7, 10) == m_value) {
				index_temp = row3.indexOf("Temperature");
				index_humid = row3.indexOf("Humidity");
				index_light = row3.indexOf("Light");
				index_uv = row3.indexOf("UV");
				index_soil = row3.indexOf("Soil");
				index_press = row3.indexOf("Pressure");
				index_status = row3.indexOf("Time");
	
				temp.value = row3.slice(index_temp + 12, index_temp + 17);
				humid.value = row3.slice(index_humid + 9, index_humid + 14);
				light.value = row3.slice(index_light + 6, index_light + 11);
				uv.value = row3.slice(index_uv + 3, index_uv + 8);
				soil.value = row3.slice(index_soil + 5, index_soil + 12);
				press.value = row3.slice(index_press + 9, index_press + 16);
				stime.value = row3.slice(index_status + 5, index_status + 32);
				//console.log( payload.toString() );
				main.innerHTML = row1 + "<br>" + "<br>" + row2 + "<br>" + "<br>" + row3 + "<br>" + "<br>";
			}
			else {
				init();
			}
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


