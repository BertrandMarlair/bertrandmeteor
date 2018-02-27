var express        = require('express');  
var app            = express();  
var httpServer = require("http").createServer(app);  
var five = require("johnny-five");  
var io=require('socket.io')(httpServer);
 
var port = 3000; 
 
app.use(express.static(__dirname + '/public'));
 
app.get('/', function(req, res) {  
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/on', function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var relais = JSON.parse(body);
        console.log(relais)
        ledOn(relais)
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});

app.get('/off', function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var relais = JSON.parse(body);
        console.log(relais)
        ledOff(relais)
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});

httpServer.listen(port);  
console.log('Server available at http://localhost:' + port);  
var led;
 
//Arduino board connection
 
var board = new five.Board();  
board.on("ready", function() {  
    console.log('Arduino connected');
    relais1 = new five.Led(2);
    relais2 = new five.Led(3);
    relais3 = new five.Led(4);
    relais4 = new five.Led(5);
    relais5 = new five.Led(6);
    relais6 = new five.Led(7);
    relais7 = new five.Led(8);
    relais8 = new five.Led(9);
    relais9 = new five.Led(10);
    relais10 = new five.Led(11);
    relais11 = new five.Led(12);
    relais12 = new five.Led(13);
    relais1.on();
    relais2.on();
    relais3.on();
    relais4.on();
    relais5.on();
    relais6.on();
    relais7.on();
    relais8.on();
    relais9.on();
    relais10.on();
    relais11.on();
    relais12.on();
});

//Socket connection handler
io.on('connection', function (socket) {  
        var relai = 'relais';
        console.log(socket.id);
 
        socket.on('led:on', function (data) {
            console.log(data.value);
            ledOn(data.value)
        });
        
        socket.on('led:off', function (data) {
            console.log(data.value);
            ledOff(data.value);
        });
    });
 
    function ledOff(data){
        console.log("switch " + data)
        switch(data) {
            case 2:
                relais1.on()
                break;
            case 3:
                relais2.on()
                break;
            case 4:
                relais3.on()
                break;
            case 5:
                relais4.on()
                break;
            case 6:
                relais5.on()
                break;
            case 7:
                relais6.on()
                break;
            case 8:
                relais7.on()
                break;
            case 9:
                relais8.on()
                break;
            case 10:
                relais9.on()
                break;
            case 11:
                relais10.on()
                break;
            case 12:
                relais11.on()
                break;
            case 13:
                relais12.on()
                break;
            default:
                console.log('ERROR Off');
        }
    }

    function ledOn(data){
        switch(data) {
            case 2:
                relais1.off()
                break;
            case 3:
                relais2.off()
                break;
            case 4:
                relais3.off()
                break;
            case 5:
                relais4.off()
                break;
            case 6:
                relais5.off()
                break;
            case 7:
                relais6.off()
                break;
            case 8:
                relais7.off()
                break;
            case 9:
                relais8.off()
                break;
            case 10:
                relais9.off()
                break;
            case 11:
                relais10.off()
                break;
            case 12:
                relais11.off()
                break;
            case 13:
                relais12.off()
                break;
            default:
                console.log('ERROR On');
        }
    }

console.log('Waiting for connection');