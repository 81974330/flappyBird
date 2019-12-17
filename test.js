let webSocket = require('ws');
let wss = new webSocket.Server({
    port:4000
});

wss.on('connection',function connection(ws){
    ws.on('message',function incoming(message){
        console.log('received: '+message);
    })
    ws.send('something');
})
