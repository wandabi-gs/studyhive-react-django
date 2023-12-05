var express = require('express');
var router = express.Router();

const { register, login } = require('../views/user');
const { authenticate } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);

router.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});


module.exports = router;
