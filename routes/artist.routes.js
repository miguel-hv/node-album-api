const express = require('express');
const controller = require('../controllers/artist.controller');
const router = express.Router();

router.get("/:id", controller.artistGet);
router.post('', controller.artistPost);

module.exports = router;