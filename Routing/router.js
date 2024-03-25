//to set up path to resolve request

//1)import express.

const express=require('express')

//import controller
const usrController=require('../controllers/usrController')
const blogsController = require('../controllers/blogsController')



//import middleware
const jMiddleware=require('../Middleware/jMiddleware')

//import multer

const multerConfig=require('../Middleware/MMiddleware')

//2)create an object for router() class in the express module.
const router=new express.Router()

//3)path to resolve the request

//syntax-router.httpreq('path',()=>{how to solve})

//a)register
router.post('/user/register',usrController.register)

//b)login
router.post('/user/login',usrController.login)

//c add blogs
router.post('/blogs/add',jMiddleware,multerConfig.single('blogimg'),blogsController.addBlogs)

//d) home blogs

router.get('/blogs/homeblogs', blogsController.getblogshome)

//e all blogs
router.get('/blogs/allhomeblogs',jMiddleware, blogsController.getallblogshome)
//f

router.get('/user/usrproject',jMiddleware,blogsController.getUsrblogs)

//g)edit project

router.put('/blogs/edit:id',jMiddleware,multerConfig.single('blogimg'),blogsController.editUserproject)

//g)delete blogs

router.delete('/blogs/pop:id',jMiddleware,blogsController.deleteuserblogs)


//4)export router
module.exports=router