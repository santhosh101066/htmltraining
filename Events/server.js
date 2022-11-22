const express=require('express')
const bodyphraser=require('body-parser')
const cors = require('cors');
const app = express()
app.use(bodyphraser.urlencoded({extended:false}))

app.get('/',(request,response)=>{
response.sendFile(__dirname+'/index.html')
})

app.post('/', (request,response)=>{
    console.log(request.body.message);
    client.forEach(clients=>clients.response.write("data:"+request.body.message+"\n\n"))
    response.redirect('/')
})
let client=[]
let count=0

app.get('/event',(request,response)=>{
    response.setHeader('Content-Type','text/event-stream')
    response.setHeader('Access-Control-Allow-Origin','*')
    response.setHeader('connection','keep-alive')
    response.setHeader('Cache-Control','no-cache')
    response.status(200)

//     response.writeHead(200,{'Content-Type':'text/event-stream',
//     'Access-Control-Allow-Origin': '*',
//     'connection':'keep-alive',
//     'Cache-Control':'no-cache'
// })
response.write(`\ndata:Connected on ${new  Date()}\n\n`)
count++
const clients={
    id:count,
    response
}
client.push(clients)

console.log("Client connected id: "+clients.id);
request.on('close',()=>{
    
    console.log("client id : "+clients.id+" is closed");
    client=client.filter(cli=>{ cli!==clients })
    
})
})

app.get('/clients',(request,response)=>{
    response.json({clients:client.length})
})

app.get('/clientdetails',(request,response)=>{
    response.json({data: 'hi'})
})

app.listen(4000,()=>{
    console.log("Server on http://localhost:4000");
})
