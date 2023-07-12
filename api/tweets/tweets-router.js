const router = require('express').Router();

// role: admin
router.get('/tweets', (req, res, next) => {
    res.json({ message: "all tweets" })
})

module.exports = router;