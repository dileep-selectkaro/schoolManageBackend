const Route = require("../../models/transport/routesSchema");
const { sendErrorResponse } = require("../../utils/responseHandler");

exports.createRoute = async (req, res) => {
  try {
    //  Route already exists
    const existingRoute = await Route.findOne({
      routeTitle: req.body. routeTitle,
      school: req.user.school,
    });

    if (existingRoute) {
      return res.send({ message: "Duplicate  Route is not allowed" });
    }

    //create new..
    const route = new Route({
      ...req.body,
      school: req.user.school,
    });

    const result = await route.save();

    res.send(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

exports.routeList = async (req, res) => {
  try {
    let routes = await Route.find({ school: req.user.school })
    .collation({ locale: "en" })
    .sort({  routeTitle: -1 })

    if (routes.length > 0) {
      res.send(routes);
    } else {
      res.send({ message: "No Route  found" });
    }
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

exports.updateRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const existingRoute = await Route.findOne({
      _id: { $ne: id },
      data: new RegExp(`^${req.body}$`, "i"),
      school: req.user.school,
    });

    if (existingRoute) {
      return res
        .status(400)
        .json({
          message:
            "Updating to a case-insensitive duplicate  Route is not allowed.",
        });
    }

    // Update the Route
    const result = await Route.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.send(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

exports.searchRoute = async (req, res) => {
  try {
    const data = req.params;
    const result = await Route.findOne({ data });
    if (result) {
      res.status(200).json({ success: true, data: result });
    } else {
      res.status(404).json({ success: false, message: "Data not found" });
    }
  } catch (error) {
    sendErrorResponse(res, err);
  }
};

exports.deleteRoute = async (req, res) => {
  try {
    const result = await Route.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};
