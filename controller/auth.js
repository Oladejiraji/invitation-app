const asyncHandler = require('express-async-handler')
const { signToken } = require('../middleware/jwt')

const authFailed = asyncHandler(async (req, res)=>{
    res.status(401).json({success: false, msg: 'Google Auth Failed'})
})

const loginSuccess = asyncHandler(async (req, res)=>{
    let token = await signToken(req.query.id)
    res.status(200).json({success: true, token, user: req.user})
})




module.exports = {
    authFailed,
    loginSuccess,
}