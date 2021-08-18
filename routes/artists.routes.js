const express = require('express');
const controller = require('../controllers/artists.controller');
const router = express.Router();


router.get('/all', controller.artistsGet);
// router.get('/:id', controller.artistGet);
router.post('/', controller.artistsPost);

module.exports = router;