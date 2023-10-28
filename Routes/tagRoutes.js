const express = require('express');
const { getTagCon,insertTagCon,updateTagCon,deleteTagCon } = require("../Controllers/tagController");

const router = express.Router();

router.get("/conTag", getTagCon )
router.post("/conTag", insertTagCon )
router.put("/conTag", updateTagCon )
router.delete("/conTag", deleteTagCon )

module.exports = router

