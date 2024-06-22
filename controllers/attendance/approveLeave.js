const ApproveLeave = require("../../models/attendence/approveLeave");
const { sendErrorResponse } = require("../../utils/responseHandler");

exports.createApproveLeave = async (req, res) => {
  try {
    //  ApproveLeave already exists
    const existingApproveLeave = await ApproveLeave.findOne({
      data: req.body,
      school: req.user.school,
    });

    if (existingApproveLeave) {
      return res.send({ message: "Duplicate  ApproveLeave is not allowed" });
    }

    //create new..
    const approveLeave = new ApproveLeave({
      ...req.body,
      school: req.user.school,
    });

    const result = await approveLeave.save();

    res.send(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

exports.approveLeaveList = async (req, res) => {
  try {
    let approveLeaves = await ApproveLeave.find({ school: req.user.school });
    // .collation({ locale: "en" })
    // .sort({ name: -1 })

    if (approveLeaves.length > 0) {
      res.send(approveLeaves);
    } else {
      res.send({ message: "No ApproveLeave  found" });
    }
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

exports.updateApproveLeave = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id:", id);
    const existingApproveLeave = await ApproveLeave.findOne({
      _id: { $ne: id },
      data: new RegExp(`^${req.body}$`, "i"),
      school: req.user.school,
    });

    if (existingApproveLeave) {
      return res
        .status(400)
        .json({
          message:
            "Updating to a case-insensitive duplicate  ApproveLeave is not allowed.",
        });
    }

    // Update the ApproveLeave
    const result = await ApproveLeave.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.send(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

exports.searchApproveLeave = async (req, res) => {
  try {
    const data = req.params;
    console.log("Data:",data);
    const result = await ApproveLeave.findOne({ data });
    if (result) {
      res.status(200).json({ success: true, data: result });
    } else {
      res.status(404).json({ success: false, message: "Data not found" });
    }
  } catch (error) {
    sendErrorResponse(res, err);
  }
};

exports.deleteApproveLeave = async (req, res) => {
  try {
    const result = await ApproveLeave.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};
