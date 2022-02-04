const mongoose = require("mongoose");
const Pin = require("../schemas/pin.schema");


const router = require("express").Router();

router.post("/", async (req, res, next) => {
  const { pinUrl, title, postedBy, description, destination, category } =
    req.body;

  if (
    !pinUrl ||
    !title ||
    !postedBy ||
    !description ||
    !destination ||
    !category
  )
    return res.status(406).json({ response: "Invalid Inputs!" });

  try {
    const pin = new Pin(req.body);

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
    await Pin.updateOne({ _id: id }, { $push: { comments: {postedBy, comment} } });
    res.send(200);
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
