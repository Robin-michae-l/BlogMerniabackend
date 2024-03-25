//1)import dotenv

require('dotenv').config()

//2)import express
const express=require('express')

//3)import cors

const cors=require('cors')

//import router
const router=require('./Routing/router')

//import connection.js
require('./DBS/connection')

//4)Create server
const blogserver=express()

//5)use of cors by server

blogserver.use(cors())

//6)parsing json
blogserver.use(express.json())

//server using the router

blogserver.use(router)

/* blogserver use upload folder */

blogserver.use('/storeblogs',express.static('./Storeblogs'))

//7)customize port-bydefault-

const PORT=7000 || process.env

//8)run server
blogserver.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})

//get request

blogserver.get('/',(req,res)=>{
res.send(`<h1> Blogserver is running and ready to accept requests </h1>`)
})

//post request
blogserver.post('/',(req,res)=>{
    res.send('Post request')
})

//put request
blogserver.put('/',(req,res)=>{
    res.send('Put request')
})


