const express = require("express");
const apiCache = require("apicache");
const Member = require("../../controllers/memberController");

const router = express.Router();

const cache = apiCache.middleware;

router.get("/", cache("2 minutes"), Member.getAllMembers);
router.get("/:memberId", Member.getOneMember);
router.post("/", Member.createMember);
router.patch("/:memberId", Member.updateMember);
router.delete("/:memberId", Member.deleteMember);

module.exports = router;
