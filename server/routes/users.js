var express = require("express");
const { Mongoose } = require("mongoose");
const User = require("../schemas/user.schema");

var router = express.Router();

/* GET users listing. */
router.post("/login", async function (req, res, next) {
  const { googleId, displayName, photoUrl } = req.body;

  try {
    if (!googleId || !displayName || !photoUrl)
      return res.status(406).json({ response: "Missing inputs!" });

    const checkUser = await User.findOne({ googleId });

    if (!!checkUser) {
      return res
        .status(200)
        .json({ response: "Successfully logged in!", payload: checkUser });
    }

    const user = new User({ googleId, displayName, photoUrl });
    await user.save();
    res
      .status(200)
      .json({ response: "Successfully logged in!", payload: user });
  } catch (error) {
    return res.status(500).send("Something Gone Wrong!");
  }
});

router.get("/:googleId", async (req, res, next) => {
  const { googleId } = req.params;
  try {
    const user = await User.findOne({ googleId });
    if (user)
      return res
        .status(200)
        .json({ response: "User sucessfully found.", payload: user });
    return res.status(404).json({ response: "User does not exist." });
  } catch (error) {
    return res.status(500).send("Something Gone Wrong!");
  }
});

module.exports = router;
