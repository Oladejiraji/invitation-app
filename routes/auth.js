const express = require('express')
const passport = require('passport');
const { authFailed, loginSuccess } = require('../controller/auth');
const {  protectRoute } = require('../middleware/jwt')

const router = express.Router()


// google OAuth route
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed', session: false }),
  async function  (req, res) {
    // redirected to this route
    res.redirect(`/v1/auth/success?id=${req.user._id}`)
   
  });
//end of google OAuth route



// route redirected to after successful login
router.get('/success', loginSuccess)


router.get('/failed', authFailed)




module.exports = router