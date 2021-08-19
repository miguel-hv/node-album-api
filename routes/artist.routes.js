const express = require('express');
const controller = require('../controllers/artist.controller');
const router = express.Router();

router.get("/:id", controller.artistGet);
router.post("", controller.artistPost);
router.put("/:id", controller.artistPut);
router.delete("/:id", controller.artistDelete);

module.exports = router;