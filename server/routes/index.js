var express = require('express');
var router = express.Router();
const billController = require('../controllers')

/* GET home page. */
router.get('/', function (req, res) {
    res.status(400).send("unauthorized")
});
router.get('/inv', billController.getInvNum);
router.get('/deldata', billController.deleteData);
router.post('/bill', billController.bill);

module.exports = router;
