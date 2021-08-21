const express = require("express");
const router = express.Router();
const controller = require("../controllers/album.controller");

router.get("/:id", controller.albumGet);
router.post("/", controller.albumPost);
router.put("/:id", controller.albumPut);
router.delete("/:id", controller.albumDelete);

module.exports = router;
