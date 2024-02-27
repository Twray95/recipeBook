const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "hit ingredient route" });
});

module.exports = router;
