const express = require("express");
const router = express.Router();
const { listAction, viewAction, insertAction, updateAction, removeAction, removeAllAction} = require("./movie.controller");
router.get("/", listAction);
router.get("/:id", viewAction);
router.post('/', insertAction);
router.put("/:id", updateAction);
router.delete("/clear", removeAllAction);
router.delete("/:id", removeAction);

module.exports = router;
