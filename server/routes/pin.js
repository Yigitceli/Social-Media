const mongoose = require("mongoose");
const User = require("../schemas/user.schema");
const Pin = require("../schemas/pin.schema");
const verifyToken = require("../services/auth");
const router = require("express").Router();

router.post("/", verifyToken, async (req, res, next) => {
  const { pinUrl, title, description, destination, category } = req.body;
  if (!pinUrl || !title || !description || !destination || !category)
    return res.status(406).json({ response: "Invalid Inputs!" });

  try {
    const pin = new Pin({ ...req.body, postedBy: req.user });

    await pin.save();
    return res
      .status(200)
      .json({ response: "Pin is successfully created.", payload: pin });
  } catch (error) {
    res.status(500).json({ response: "Something went wrong!" });
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const pinDeleted = await Pin.findByIdAndDelete(id);
    const pinSavedDeleted = await User.updateMany(
      {},
      {
        $pull: {
          saved: { _id: id },
        },
      }
    );
    return res
      .status(200)
      .json({ response: "Pin successfully deleted.", payload: pinDeleted });
  } catch (error) {
    res.status(500).json({ response: "Something went wrong!" });
  }
});

router.put("/:id/comment", verifyToken, async (req, res, next) => {
  const { comment } = req.body;
  const { id } = req.params;
  const postedBy = req.user;
  try {
    const pin = await Pin.findByIdAndUpdate(
      id,
      {
        $push: { comments: { postedBy, comment, createdAt: Date.now() } },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ response: "Comment successfully was made.", payload: pin });
  } catch (error) {
    res.status(500).json({ response: "Something went wrong!" });
  }
});

router.get("/", async (req, res, next) => {
  const { category, userId } = req.query;
  try {
    if (!category && !userId) {
      const pins = await Pin.find();
      if (pins.length > 0)
        return res
          .status(200)
          .json({ response: "Pins succesfully found.", payload: pins });

      return res.status(404).json({ response: "Pins can't be found." });
    }

    if (userId) {
      const pins = await Pin.find({
        "postedBy.uid": userId,
      });

      if (pins.length <= 0)
        return res.status(404).json({ response: "No pins found!" });

      return res.status(200).json({ response: "Pins found!", payload: pins });
    }

    const pins = await Pin.find({ category });
    if (pins.length > 0)
      return res
        .status(200)
        .json({ response: "Pins succesfully found.", payload: pins });
    return res.status(404).json({ response: "Can't find pins." });
  } catch (error) {
    res.status(500).json({ response: "Something went wrong!" });
  }
});

router.get("/search", verifyToken, async (req, res, next) => {
  var { query } = req.query;
  query = query.toLowerCase();
  try {
    if (query) {
      const pins = await Pin.find({
        $or: [
          { category: query },
          { title: query },
          { description: { $regex: query } },
          { "postedBy.name": { $regex: query } },
        ],
      });
      if (pins.length <= 0)
        return res.status(404).json({ response: "No pin found!" });
      return res.status(200).json({ response: "Pins found!", payload: pins });
    } else {
      const pins = await Pin.find();
      if (pins.length > 0)
        return res
          .status(200)
          .json({ response: "Pins succesfully found.", payload: pins });

      return res.status(404).json({ response: "Pins can't be found." });
    }
  } catch (error) {
    return res.status(500).json({ response: "Something went wrong!" });
  }
});

router.get("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;
  try {
    const pin = await Pin.findById(id);
    res.json(pin);
  } catch (error) {
    res.status(500).json({ response: "Something went wrong!" });
  }
});

module.exports = router;
