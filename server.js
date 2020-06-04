var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 3000;
var app = http.createServer(function(request,response){
    var url = request.url;
    if(url == '/'){
      url = '/main.html';
    }
    if(url == '/favicon.ico'){
      return response.writeHead(404);
    }
    if (url == '/newPlayer'){
      url = '/newPlayer.html';
    }
    
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));
    
 
});
app.listen(port);
console.log(`Server running  at http://localhost:${port}/`)