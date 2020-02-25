const router = require('express').Router();
const passport = require('passport')

//auth logout
router.get('/logout', (req,res) => {
    // handle with passport
    res.send('logging out')
})

// auth with google
// router.get('/googlelogin', () => {
//     console.log("route hit")
// });
router.get('/googlelogin', passport.authenticate('google', {
         scope: ['profile']
    }), () => {
    console.log("route hit")
});
// router.get('/googlelogin', passport.authenticate('google', {
//     scope: ['profile']
// }), () => console.log("googleelogin hit"));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log('you reached a callback uri')
})

module.exports = router;