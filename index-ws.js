const express = require("express");
const http = require('http')
const app = express()
const server = http.createServer()
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})
server.on('request', app)
server.listen(3000, () => console.log('server runnig'))
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ server: server })
wss.on('connection', function connection(ws) {
    const numClient = wss.clients.size
    console.log('Clients connected', numClient);
    wss.broadcast(`Current visitors ${numClient}`)
    ws.readyState === ws.OPEN ? ws.send('Welcome to my server') : null
    ws.on('close', function close() {
        console.log('A client has disconnected');
    })
})
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(client => {
        client.send(data)
    })
}
