const express = require("express");
const router = express.Router();
const controller = require("../controllers/album.controller");

router.get("/:id", controller.albumGet);
// router.put("/:id", controller.albumsPut);
// router.delete("/:id", controller.albumsDelete);
router.post("/", controller.albumPost);

module.exports = router;
