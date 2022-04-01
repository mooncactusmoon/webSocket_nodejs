//import express + ws 套件
const express = require('express')
const SocketServer = require('ws').Server
const PORT = 3000

//創建express物件，綁定監聽port、設定開啟後在console中提示
const server = express().listen(PORT,()=>{
    console.log(`Listen on ${PORT}`);
})
//將express交給SocketServer開啟WebSocket服務
const wss= new SocketServer({server})
//當有client連線成功
wss.on('connection',ws=>{
    console.log('Client connected')
    //當收到client消息
    ws.on('message',data=>{
        //收回來是Buffer格式，要轉成字串
        data=data.toString()
        console.log(data) //可在terminal看收到的訊息

        //發送消息給client
        ws.send(data)

        //發送給所有client
        let clients= wss.clients //取得所有連接中的client
        clients.forEach(client=>{
            client.send(data) //發給每個client
        })
    })
    //當連線關閉
    ws.on('close',()=>{
        console.log('close connected')
    })
})