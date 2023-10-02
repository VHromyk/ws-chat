import { WebSocketServer } from 'ws';

const wsServer = new WebSocketServer({
    port: 5000,
})

let socketList = []

wsServer.on('connection', (socket)=> {
    // console.log('WS server connection')

    socketList.push(socket);

    setTimeout(()=> {
        socket.send('Welcome to web-socket server')
    }, 3000)

    socketList.forEach(item => {
        if(item !== socket) {
            item.send(`Now we have ${socketList.length} members`)
        }
    })

    socket.on('close', ()=> {

        const index = socketList.findIndex(item => item === socket);

        socketList.splice(index, 1)
    })
})