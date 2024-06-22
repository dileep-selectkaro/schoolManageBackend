const Admin = require('../../models/userRelated/adminSchema.js');
const SuperAdmin = require('../../models/userRelated/superAdminSchema.js');
const Sclass = require('../../models/sclassSchema.js');
const Student = require('../../models/userRelated/studentSchema.js');
const Teacher = require('../../models/userRelated/teacherSchema.js');
const Subject = require('../../models/subjectSchema.js');
const Notice = require('../../models/noticeSchema.js');
const Complain = require('../../models/complainSchema.js');
const { formatName } = require('../../utils/quickFunctions.js');
const { createNewToken } = require('../../utils/token.js');

// const adminRegister = async (req, res) => {
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPass = await bcrypt.hash(req.body.password, salt);

//         const admin = new SuperAdmin({
//             ...req.body,
//             password: hashedPass
//         });

//         const existingAdminByEmail = await SuperAdmin.findOne({ email: req.body.email });
//         const existingSchool = await SuperAdmin.findOne({ schoolName: req.body.schoolName });

//         if (existingAdminByEmail) {
//             res.send({ message: 'Email already exists' });
//         }
//         else if (existingSchool) {
//             res.send({ message: 'School name already exists' });
//         }
//         else {
//             let result = await admin.save();
//             result.password = undefined;
//             res.send(result);
//         }
//     } catch (err) {
//         console.log(err);
//     }
// };

// const adminLogIn = async (req, res) => {
//     if (req.body.email && req.body.password) {
//         let admin = await SuperAdmin.findOne({ email: req.body.email });
//         if (admin) {
//             const validated = await bcrypt.compare(req.body.password, admin.password);
//             if (validated) {
//                 admin.password = undefined;
//                 res.send(admin);
//             } else {
//                 res.send({ message: "Invalid password" });
//             }
//         } else {
//             res.send({ message: "User not found" });
//         }
//     } else {
//         res.send({ message: "Email and password are required" });
//     }
// };

exports.superAdminRegister = async (req, res) => {
    try {
        const admin = new SuperAdmin({
            ...req.body
        });

        const existingAdminByEmail = await SuperAdmin.findOne({ email: req.body.email });

        if (existingAdminByEmail) {
            res.send({ message: 'Email already exists' });
        }
        else {
            let result = await admin.save();
            result.password = undefined;
            const adminID = result._id
            const token = createNewToken(adminID)

            res.send({
                ...result.toObject(),
                token
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.superAdminLogIn = async (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            let admin = await SuperAdmin.findOne({ email: req.body.email });
            if (admin) {
                if (req.body.password === admin.password) {
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
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.loginAsSuperAdmin = async (req, res) => {
    try {
        let admin = await SuperAdmin.findById(req.params.id);
        if (admin) {
            admin.password = undefined;

            const adminID = admin._id
            const token = createNewToken(adminID)

            res.send({
                ...admin.toObject(),
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

exports.getSuperAdminDetail = async (req, res) => {
    try {
        let admin = await SuperAdmin.findById(req.params.id);
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


exports.getSchoolLists = async (req, res) => {
    try {
        let schools = await Admin.find().collation({ locale: "en" }).sort({ schoolName: 1 });
        if (schools.length > 0) {
            let modifiedSchools = schools.map((school) => {
                return {
                    ...school._doc,
                    password: undefined,
                };
            });
            res.send(modifiedSchools);
        } else {
            res.send({ message: "No schools found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// exports.getTeacherLists = async (req, res) => {
//     try {
//         let teachers = await Teacher.find()
//             .populate("school", "schoolName")
//         if (teachers.length > 0) {
//             let modifiedTeachers = teachers.map((teacher) => {
//                 return {
//                     ...teacher._doc,
//                     password: undefined,
//                     name: formatName(teacher?.teacherName),
//                 };
//             });
//             res.send(modifiedTeachers);
//         } else {
//             res.send({ message: "No teachers found" });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// };

// exports.getStudentLists = async (req, res) => {
//     try {
//         let students = await Student.find()
//             .populate("school", "schoolName")
//         if (students.length > 0) {
//             let modifiedStudents = students.map((student) => {
//                 return {
//                     ...student._doc,
//                     password: undefined,
//                     name: formatName(student?.studentName)
//                 };
//             });
//             res.send(modifiedStudents);
//         } else {
//             res.send({ message: "No students found" });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// };

exports.getAllSchoolStats = async (req, res) => {
    try {
        let schools = await Admin.countDocuments()
        let students = await Student.countDocuments()
        let teachers = await Teacher.countDocuments()

        res.send({
            schools,
            students,
            teachers,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}