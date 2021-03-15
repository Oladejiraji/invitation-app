const express = require('express')
const { deleteUser } = require('../controller/user')


const router = express.Router()



// route for deleting user
router.get('/:id', deleteUser)
























module.exports = router