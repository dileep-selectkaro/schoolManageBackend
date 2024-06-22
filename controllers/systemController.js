const Admin = require("../models/userRelated/adminSchema");
const Student = require("../models/userRelated/studentSchema");
const Teacher = require("../models/userRelated/teacherSchema");
const { formatName } = require("../utils/quickFunctions");
const { sendErrorResponse } = require("../utils/responseHandler");

exports.getAdminLists = async (req, res) => {
    try {
        let admins = await Admin.find({
            _id: req.user.school
        })

        if (admins.length > 0) {
            let modifiedAdmins = admins.map((admin) => {
                return {
                    ...admin._doc,
                    password: undefined,
                };
            });
            res.send(modifiedAdmins);
        } else {
            res.send({ message: "No admins found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.getTeacherLists = async (req, res) => {
    try {
        let teachers = await Teacher.find({
            school: req.user.school
        })

        if (teachers.length > 0) {
            let modifiedTeachers = teachers.map((teacher) => {
                return {
                    ...teacher._doc,
                    password: undefined,
                    name: formatName(teacher?.teacherName),
                };
            });
            res.send(modifiedTeachers);
        } else {
            res.send({ message: "No teachers found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};