const bcrypt = require('bcrypt');
const Student = require('../../models/userRelated/studentSchema.js');
const Subject = require('../../models/subjectSchema.js');
const Parent = require('../../models/userRelated/parentSchema.js');
const { formatName } = require('../../utils/quickFunctions.js');
const { createNewToken } = require('../../utils/token.js');

exports.studentRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const existingStudent = await Student.findOne({
            rollNum: req.body.rollNum,
            school: req.user.school,
            sclassName: req.body.sclassName,
        });

        if (existingStudent) {
            res.send({ message: 'Roll Number already exists' });
        }
        else {
            const student = new Student({
                ...req.body,
                studentName: req.body.name,
                school: req.user.school,
                password: hashedPass
            });

            let studentResult = await student.save();

            const parentData = req.body.parent;

            if (parentData) {
                const parent = new Parent({
                    name: parentData.name,
                    phone: parentData.phone,
                    email: parentData.email,
                    occupation: parentData.occupation,
                    password: hashedPass,
                    child: studentResult._id,
                    school: req.user.school,
                });

                await parent.save();
            }
            
            res.send({ success: 'Done' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.studentLogIn = async (req, res) => {
    try {
        let student = await Student.findOne({ email: req.body.email });
        if (student) {
            const validated = await bcrypt.compare(req.body.password, student.password);
            if (validated) {
                student = await student.populate("school", "schoolName")
                student = await student.populate("sclassName", "sclassName")
                student.password = undefined;
                student.examResult = undefined;
                student.attendance = undefined;

                const studentID = student._id
                const token = createNewToken(studentID)

                res.send({
                    ...student.toObject(),
                    name: formatName(student?.studentName),
                    token
                })

            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Student not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.allStudentList = async (req, res) => {
    try {
        let students = await Student.find({ school: req.user.school})
            .populate("sclassName", "sclassName")
            .populate("school", "schoolName")

        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return {
                    ...student._doc,
                    password: undefined,
                    name: formatName(student?.studentName)
                };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getStudents = async (req, res) => {
    try {
        let students = await Student.find({ school: req.params.id })
            .populate("sclassName", "sclassName")
            .populate("school", "schoolName")
        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return {
                    ...student._doc,
                    password: undefined,
                    name: formatName(student?.studentName)
                };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getStudentDetail = async (req, res) => {
    try {
        let student = await Student.findById(req.params.id)
            .populate("school", "schoolName")
            .populate("sclassName", "sclassName")
            .populate("examResult.subName", "subName")
            .populate("attendance.subName", "subName sessions");
        if (student) {
            student.password = undefined;
            res.send({
                ...student.toObject(),
                name: formatName(student?.studentName)
            })
        }
        else {
            res.send({ message: "No student found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
} 

exports.deleteStudent = async (req, res) => {
    try {
        const result = await Student.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.deleteStudents = async (req, res) => {
    try {
        const result = await Student.deleteMany({ school: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.deleteStudentsByClass = async (req, res) => {
    try {
        const result = await Student.deleteMany({ sclassName: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
             res.send(result)
        }
    }  catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.updateStudent = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            res.body.password = await bcrypt.hash(res.body.password, salt)
        }
        let result = await Student.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        result.password = undefined;
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.updateExamResult = async (req, res) => {
    const { subName, marksObtained } = req.body;

    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        const existingResult = student.examResult.find(
            (result) => result.subName.toString() === subName
        );

        if (existingResult) {
            existingResult.marksObtained = marksObtained;
        } else {
            student.examResult.push({ subName, marksObtained });
        }

        const result = await student.save();
        return res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.studentAttendance = async (req, res) => {
    const { subName, status, date } = req.body;

    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        const subject = await Subject.findById(subName);

        const existingAttendance = student.attendance.find(
            (a) =>
                a.date.toDateString() === new Date(date).toDateString() &&
                a.subName.toString() === subName
        );

        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            // Check if the student has already attended the maximum number of sessions
            const attendedSessions = student.attendance.filter(
                (a) => a.subName.toString() === subName
            ).length;

            if (attendedSessions >= subject.sessions) {
                return res.send({ message: 'Maximum attendance limit reached' });
            }

            student.attendance.push({ date, status, subName });
        }

        const result = await student.save();
        return res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.clearAllStudentsAttendanceBySubject = async (req, res) => {
    const subName = req.params.id;

    try {
        const result = await Student.updateMany(
            { 'attendance.subName': subName },
            { $pull: { attendance: { subName } } }
        );
        return res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.clearAllStudentsAttendance = async (req, res) => {
    const schoolId = req.params.id

    try {
        const result = await Student.updateMany(
            { school: schoolId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.removeStudentAttendanceBySubject = async (req, res) => {
    const studentId = req.params.id;
    const subName = req.body.subId

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $pull: { attendance: { subName: subName } } }
        );

        return res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


exports.removeStudentAttendance = async (req, res) => {
    const studentId = req.params.id;

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};