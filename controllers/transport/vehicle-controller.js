const Vehicle = require("../../models/transport/vehicleSchema");
const { sendErrorResponse } = require("../../utils/responseHandler");

exports.createVehicle = async (req, res) => {
  try {
    //  Vehicle already exists
    const existingVehicle = await Vehicle.findOne({
      vehicleNumber: req.body.vehicleNumber,
      school: req.user.school,
    });

    if (existingVehicle) {
      return res.send({ message: "Duplicate  Vehicle is not allowed" });
    }

    //create new..
    const vehicle = new Vehicle({
      ...req.body,
      school: req.user.school,
    });

    const result = await vehicle.save();

    res.send(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

exports.vehicleList = async (req, res) => {
  try {
    let vehicles = await Vehicle.find({ school: req.user.school })
    .collation({ locale: "en" })
    .sort({ vehicleNumber: -1 })

    if (vehicles.length > 0) {
      res.send(vehicles);
    } else {
      res.send({ message: "No Vehicle  found" });
    }
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id:", id);
    const existingVehicle = await Vehicle.findOne({
      _id: { $ne: id },
      data: new RegExp(`^${req.body}$`, "i"),
      school: req.user.school,
    });

    if (existingVehicle) {
      return res
        .status(400)
        .json({
          message:
            "Updating to a case-insensitive duplicate  Vehicle is not allowed.",
        });
    }

    // Update the Vehicle
    const result = await Vehicle.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.send(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

exports.searchVehicle = async (req, res) => {
  try {
    const data = req.params;
    const result = await Vehicle.findOne({ data });
    if (result) {
      res.status(200).json({ success: true, data: result });
    } else {
      res.status(404).json({ success: false, message: "Data not found" });
    }
  } catch (error) {
    sendErrorResponse(res, err);
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const result = await Vehicle.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};
