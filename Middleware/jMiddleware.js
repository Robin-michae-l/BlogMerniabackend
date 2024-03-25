//import jwt

const jwt=require('jsonwebtoken')

const jMiddleware=(req,res,next)=>{

    console.log('inside jwt middleware');
   const token=req.headers['authorization'].split(' ')[1]
    console.log(token);
    try {
        const jwtResponse=jwt.verify(token,"secckey770")
        console.log(jwtResponse);
        req.uid=jwtResponse.userid
        next()

    } catch (err) {
        res.status(401).json('Authorization failed...Please login')
    }
    
}
module.exports=jMiddleware