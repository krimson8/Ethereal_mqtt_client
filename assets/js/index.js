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

//var txt = document.querySelector('.textfield')
//txt.value = ""
//going to add button event

var client = mqtt.connect(IP); // you add a ws:// url here
client.subscribe("mqtt/demo");


client.on("message", 
	function(topic, payload) 
	{
		row1 = row2;
		row2 = row3;
		row3 = payload.toString();
		//console.log( payload.toString() );
		main.innerHTML = row1 + "<br>" + row2 + "<br>" + row3 + "<br>";
		//txt.value = payload.toString();
		console.log( payload.toString() );
		  
	}
);
var i ;

/*
for( i = 0 ; i < 3 ; i++ )
{
	client.publish( "mqtt/demo", "hello world! " + "lol" + i );
}


setTimeout(
	function()
	{
		console.log("end");
		client.end();
	}, 
50000);
*/


