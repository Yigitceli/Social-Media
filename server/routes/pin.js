const mongoose = require("mongoose");
const Pin = require("../schemas/pin.schema");
const verifyToken = require("../services/auth");
const router = require("express").Router();

router.post("/", verifyToken, async (req, res, next) => {
  console.log("TEST");
  const { pinUrl, title, description, destination, category } = req.body;
  if (
    !pinUrl ||
    !title ||    
    !description ||
    !destination ||
    !category
  )
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
    return res
      .status(200)
      .json({ response: "Pin successfully deleted.", payload: pinDeleted });
  } catch (error) {
    res.status(500).json({ response: "Something went wrong!" });
  }
});

router.put("/:id/comment", async (req, res, next) => {
  const { postedBy, comment } = req.body;
  const { id } = req.params;
  try {
    await Pin.updateOne(
      { _id: id },
      { $push: { comments: { postedBy, comment } } }
    );
    res.send(200);
  } catch (error) {
    res.status(500).json({ response: "Something went wrong!" });
  }
});

router.get("/", async (req, res, next) => {
  const { category } = req.query;
  try {
    if (!category) {
      const pins = await Pin.find();
      if (pins.length > 0)
        return res
          .status(200)
          .json({ response: "Pins succesfully found.", payload: pins });

      return res.status(404).json({ response: "Pins can't be found." });
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

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const pin = await Pin.findById(id);
    res.json(pin);
  } catch (error) {
    res.status(500).json({ response: "Something went wrong!" });
  }
});

module.exports = router;
