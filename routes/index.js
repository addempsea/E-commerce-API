var express = require('express');
var router = express.Router();
var controllers = require('../controllers/accounts');
var controllers2 = require('../controllers/items');
var auth = require('../middleware/token');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/register', controllers.register);
router.post('/api/login', controllers.login);
router.post('/api/add', auth, controllers2.add);
router.get("/api/items", controllers2.items);
router.get("/api/item/:id", controllers2.itemOne);
router.put("/api/edit/:id", auth, controllers2.edit);
router.delete("/api/delete/:id", auth, controllers2.removed);


module.exports = router;