const WebSocketServer=require('ws')

const server=new WebSocketServer.Server({port:1234})
server.on("connection",connection=>{
    console.log("client connected");

    connection.on('message',data=>{
        console.log(data.toString());
        connection.send(data.toString()+ " from server")
    })
    connection.on('close',()=>{
        console.log("Client exited");
    })
    connection.on('error',(error)=>{
        console.log("error : "+error)
    })
})
console.log("Running on 1234 port");