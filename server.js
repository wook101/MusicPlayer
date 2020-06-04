var http = require('http');
var fs = require('fs');
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
app.listen(3000);
console.log('Server running  at http://localhost:3000/');