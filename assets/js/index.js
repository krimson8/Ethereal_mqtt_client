//Uncomment this section to enable user input broker ip
//default will be USCCLAB server broker , built with mosquitto 

/*var IP = prompt("IP of broker ?");

while( IP === "null" || IP == "") 
	IP = prompt("Error , what is ur IP again?");


var port = prompt("Which port to connect ?");

while( port === "null" || port == "")
	port = prompt("Error , what is ur port again?");


IP = "ws://" + IP + ":" + port;
*/

var IP = "ws://140.116.82.42:9001";
var sentences = "You are connecting to broker at : " + "<br>" + IP;

var ip_show = document.querySelector('#ip');
ip_show.value = IP;

var row1 = "";
var row2 = "";
var row3 = "";
var main = document.querySelector('#rec');
main.innerHTML = row1 + "<br>" + row2 + "<br>" + row3 + "<br>";

var temp = document.querySelector('#temp');
var humid = document.querySelector('#humid');
var index_temp = 0;
var index_humid = 0;

var client = mqtt.connect(IP); // you add a ws:// url here
client.subscribe("mqtt/demo");

client.on("message", 
	function(topic, payload) 
	{
		row1 = row2;
		row2 = row3;
		row3 = payload.toString();

		index_temp = row3.indexOf("Temperature");
		index_humid = row3.indexOf("Humidity");

		temp.value = row3.slice( index_temp + 12, index_temp + 18 );
		humid.value = row3.slice( index_humid + 9, index_humid + 14 )
		//console.log( payload.toString() );
		main.innerHTML = row1 + "<br>" + row2 + "<br>" + row3 + "<br>";
		//txt.value = payload.toString();
		console.log( payload.toString() );
		  
	}
);

/*
setTimeout(
	function()
	{
		console.log("end");
		client.end();
	}, 
50000);
*/


