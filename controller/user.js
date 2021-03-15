const asyncHandler = require('express-async-handler')
const User = require('../models/User')



const deleteUser = asyncHandler(async (req, res)=>{
    let id = req.params.id
    try {
        let user = await User.findById(id)
        await user.delete()
        res.status(200).json({success: true, msg: 'Deleted successfully'})
    } catch (error) {
        res.status(404).json({success: false, msg: 'User not found'})
    }
})


module.exports = {
    deleteUser,
}