const jwt = require('jsonwebtoken');
const Admin = require('../models/userRelated/adminSchema');
const Student = require('../models/userRelated/studentSchema');
const Teacher = require('../models/userRelated/teacherSchema');
const Parent = require('../models/userRelated/parentSchema');
const SuperAdmin = require('../models/userRelated/superAdminSchema');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token not found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        let superAdmin = await SuperAdmin.findById(req.user.userId)
        let admin = await Admin.findById(req.user.userId)

        let student = await Student.findById(req.user.userId)
            .populate("sclassName", "sclassName")
            .populate("school", "schoolName")

        let teacher = await Teacher.findById(req.user.userId)
            .populate("school", "schoolName")

        let parent = await Parent.findById(req.user.userId)
            .populate("school", "schoolName")

        if (superAdmin) {
            superAdmin.password = undefined;

            req.user.data = superAdmin;
            next();
        }

        else if (admin) {
            admin.password = undefined;

            req.user.data = admin;
            req.user.school = admin?._id;
            next();
        }

        else if (student) {
            student.password = undefined;

            req.user.data = student;
            req.user.school = student?.school?._id;

            next();
        }

        else if (teacher) {
            teacher.password = undefined;

            req.user.data = teacher;
            req.user.school = teacher?.school?._id;
            next();
        }

        else if (parent) {
            parent.password = undefined;

            req.user.data = parent;
            req.user.school = parent?.school?._id;
            next();
        }

        else {
            return res.send({ message: 'User not found' });
        }

    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;