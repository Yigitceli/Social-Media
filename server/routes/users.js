var express = require("express");
const { Mongoose } = require("mongoose");
const User = require("../schemas/user.schema");
const admin = require("../firebaseconfig");
const verifyToken = require("../services/auth");
const { default: axios } = require("axios");

var router = express.Router();

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

router.post("/refresh-token", async function (req, res, next) {
  const { refreshToken } = req.body;

  try {
    const { data } = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${process.env.API_KEY}`,
      { grant_type: "refresh_token", refresh_token: refreshToken }
    );
    return res
      .status(200)
      .json({ response: "Token renewed.", payload: data.access_token });
  } catch (error) {
   
    return res.status(500).send("Something Gone Wrong!");
  }
});

router.get("/:googleId", async (req, res, next) => {
  const { googleId } = req.params;
  try {
    const user = await User.findOne({ googleId });

    if (user) {      
      return res
        .status(202)
        .json({ response: "User sucessfully found.", payload: user });
    }

    return res.status(404).json({ response: "User does not exist." });
  } catch (error) {
    return res.status(500).send("Something Gone Wrong!");
  }
});

router.put("/pin-save", verifyToken, async (req, res, next) => {
  const { item } = req.body;

  try {
    const user = await User.findOne({ googleId: req.user.uid });

    if (!user.saved.some((item2) => item2._id == item._id)) {
      await User.updateOne(
        { googleId: req.user.uid },
        { $push: { saved: item } }
      );
    }

    return res.status(200).json({ response: "Ping succesfully saved." });
  } catch (error) {
    return res.status(500).send("Something Gone Wrong!");
  }
});

module.exports = router;
