var jwt = require('jsonwebtoken');

const signToken = async(id)=>{
    let token = await jwt.sign({id}, process.env.JWT_SECRET)
    return {token, expiresIn: +process.env.JWT_EXPIRATION_HOURS * 60 * 60}
}

const verifyToken = async(token)=>{
    try {
        let verify = await jwt.verify(token, process.env.JWT_SECRET)
        return verify
    } catch (error) {
        console.log(error);
        return false
    }
}



const protectRoute = async(req, res, next)=>{
    let bearer = req.header['authorization'] 
    if(!bearer){
        res.status(401).json({success: false, msg: 'No token was sent'})
    }else{
        let token = bearer.split(' ')[1] || 'hshsah'
        let data = await verifyToken(token)
        if(data){
            req.userData = data
            return next()
        }else{
            res.status(401).json({success: false, msg: 'Bad Token'})
        }
    }

   
}

module.exports ={
    signToken,
    verifyToken,
    protectRoute
}