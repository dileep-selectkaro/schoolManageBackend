const bcrypt = require('bcrypt');
const Admin = require('../../models/userRelated/adminSchema.js');
const Sclass = require('../../models/sclassSchema.js');
const Student = require('../../models/userRelated/studentSchema.js');
const Teacher = require('../../models/userRelated/teacherSchema.js');
const Subject = require('../../models/subjectSchema.js');
const Notice = require('../../models/noticeSchema.js');
const Complain = require('../../models/complainSchema.js');
const { createNewToken } = require('../../utils/token.js');

exports.adminRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const admin = new Admin({
            ...req.body,
            password: hashedPass
        });

        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
        const existingSchool = await Admin.findOne({ schoolName: req.body.schoolName });

        if (existingAdminByEmail) {
            res.send({ message: 'Email already exists' });
        }
        else if (existingSchool) {
            res.send({ message: 'School name already exists' });
        }
        else {
            let result = await admin.save();
            result.password = undefined;
            res.send(result)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.adminLogIn = async (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            let admin = await Admin.findOne({ email: req.body.email });
            if (admin) {
                const validated = await bcrypt.compare(req.body.password, admin.password);
                if (validated) {
                    admin.password = undefined;

                    const adminID = admin._id
                    const token = createNewToken(adminID)

                    res.send({
                        ...admin.toObject(),
                        token
                    })

                } else {
                    res.send({ message: "Invalid password" });
                }
            } else {
                res.send({ message: "User not found" });
            }
        } else {
            res.send({ message: "Email and password are required" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.loginAsAdmin = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id)
        if (admin) {
            admin.password = undefined;

            const adminID = admin._id
            const token = createNewToken(adminID)

            res.send({
                ...admin.toObject(),
                role: "AdminRoot",
                rootID: req.user.userId,
                token
            })
        }
        else {
            res.send({ message: "No admin found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getAdminDetail = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if (admin) {
            admin.password = undefined;
            res.send(admin);
        }
        else {
            res.send({ message: "No admin found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        const result = await Admin.findByIdAndDelete(req.params.id)

        await Sclass.deleteMany({ school: req.params.id });
        await Student.deleteMany({ school: req.params.id });
        await Teacher.deleteMany({ school: req.params.id });
        await Subject.deleteMany({ school: req.params.id });
        await Notice.deleteMany({ school: req.params.id });
        await Complain.deleteMany({ school: req.params.id });

        res.send(result)
    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.updateAdmin = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            res.body.password = await bcrypt.hash(res.body.password, salt)
        }

        let result = await Admin.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        result.password = undefined;
        res.send(result)

    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getSchoolStats = async (req, res) => {
    try {
        let sclasses = await Sclass.countDocuments(
            {
                school: req.params.id,
            }
        )
        let students = await Student.countDocuments(
            {
                school: req.params.id,
            }
        )
        let teachers = await Teacher.countDocuments(
            {
                school: req.params.id,
            }
        )

        res.send({
            sclasses,
            students,
            teachers,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getSchoolStatsbyAdmin = async (req, res) => {
    try {
        let sclasses = await Sclass.countDocuments(
            {
                school: req.user.school,
            }
        )
        let students = await Student.countDocuments(
            {
                school: req.user.school,
            }
        )
        let teachers = await Teacher.countDocuments(
            {
                school: req.user.school,
            }
        )

        res.send({
            sclasses,
            students,
            teachers,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}