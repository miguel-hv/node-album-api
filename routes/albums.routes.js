const express = require('express');
const router = express.Router();
const controller = require('../controllers/albums.controller');

router.get("/all", controller.albumsGet);
router.post("/", controller.albumsPost);

module.exports = router;