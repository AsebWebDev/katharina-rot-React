const router = require('express').Router();
const passport = require('passport')
const { isLoggedIn } = require('../middlewares')

//auth logout
router.get('/logout', (req,res) => {
    // handle with passport
    res.send('logging out')
})

// auth with google
router.get('/googlelogin', passport.authenticate('google', {
         scope: ['profile']
    }), () => {
    console.log("Google Login route hit")
});

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log('you reached a callback uri')
    console.log(req.isAuthenticated())
    res.redirect('http://localhost:3000')
})

module.exports = router;