const PickupPoint = require("../../models/transport/pickupPointSchema");
const { sendErrorResponse } = require("../../utils/responseHandler");

exports.createPickupPoint = async (req, res) => {
  try {
    //  pickupPoint already exists
    const existingPickupPoint = await PickupPoint.findOne({
        pickupPoint: req.body. pickupPoint,
        school: req.user.school,
    });

    if (existingPickupPoint) {
      return res.send({ message: "Duplicate  PickupPoint is not allowed" });
    }

    //create new......
    const pickupPoint = new PickupPoint({
      ...req.body,
      school: req.user.school,
    });

    const result = await pickupPoint.save();

    res.send(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

exports.pickupPointList = async (req, res) => {
  try {
    let pickupPoints = await PickupPoint.find({ school: req.user.school })
    .collation({ locale: "en" })
    .sort({  pickupPoint: -1 })

    if (pickupPoints.length > 0) {
      res.send(pickupPoints);
    } else {
      res.send({ message: "No PickupPoint  found" });
    }
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

exports.updatePickupPoint = async (req, res) => {
  try {
    const { id } = req.params;
    const existingPickupPoint = await PickupPoint.findOne({
      _id: { $ne: id },
      data: new RegExp(`^${req.body}$`, "i"),
      school: req.user.school,
    });

    if (existingPickupPoint) {
      return res
        .status(400)
        .json({
          message:
            "Updating to a case-insensitive duplicate  PickupPoint is not allowed.",
        });
    }

    // Update the PickupPoint
    const result = await PickupPoint.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.send(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

exports.searchPickupPoint = async (req, res) => {
  try {
    const data = req.params;
    const result = await PickupPoint.findOne({ data });
    if (result) {
      res.status(200).json({ success: true, data: result });
    } else {
      res.status(404).json({ success: false, message: "Data not found" });
    }
  } catch (error) {
    sendErrorResponse(res, err);
  }
};

exports.deletePickupPoint = async (req, res) => {
  try {
    const result = await PickupPoint.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};
