//Lets require/import the HTTP module
var http = require('http');
var qs = require('querystring');

//Lets define a port we want to listen to
const PORT= process.env.PORT || 5000;
const channelId = 1462997838;
const channelSecret = "0e6392a115a2d65089479eb5334de457";
const MID = "ua9f4a868cf921b7f84075a766320b3ca";

//We need a function which handles requests and send response
function handleRequest(request, response){
if(request.method == "POST"){
      handlePostRequest(request, response);
    return;
}else{
  console.log(request.method);
  response.end("You didn't POST");
}
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on:", PORT);
});

//Handle stuff
function handlePostRequest(req, res){
  var data = new Buffer(0);
  req.on('data', function(chunk){
    data = Buffer.concat([data, chunk], data.length + chunk.length);
  });
  req.on('end', function(chunk){
    data = JSON.parse(data.toString());
    var contentType = data.result[0].content.contentType;
    var to = data.result[0].content.from;
    if(contentType == 1){
      var text = data.result[0].content.text;
      sendRequest(to, text);
    }else{
      var text = "ASJKALJDKWALDKA";
      sendRequest(to, text);
    }
res.writeHead(200, {"Content-type": "text/plain"});
res.end("");
  });
}

function sendRequest(toUser, input){
  var options = {
    host: "125.2.148.106:8080",
    path: "/v1/events",
    headers: {
      "content-type": "application/json; charser=UTF-8",
      "X-Line-ChannelID": "1462997838",
      "X-Line-ChannelSecret": "0e6392a115a2d65089479eb5334de457",
      "X-Line-Trusted-User-With-ACL": "ua9f4a868cf921b7f84075a766320b3ca"
    },
    method: "POST",
  };

  var body = JSON.stringify({
    to: [toUser],
    toChannel: 1383378250,
    eventType: "138311608800106203",
    content: {
      toType: 1,
      contentType: 1,
      text: input
    }
  });

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk.toString());
  });
});
req.write(body);
req.end();

};
