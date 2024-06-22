const bcrypt = require('bcrypt');
const Teacher = require('../../models/userRelated/teacherSchema.js');
const Subject = require('../../models/subjectSchema.js');
const { createNewToken } = require('../../utils/token.js');
const { formatName } = require('../../utils/quickFunctions.js');
const AssignedClassTeacher = require('../../models/assignedClassTeacherSchema.js');

exports.teacherRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const existingTeacher = await Teacher.findOne({
            email: req.body.email,
            school: req.user.school,
        });

        if (existingTeacher) {
            res.send({ message: 'Teacher with same email already exists' });
        }
        else {
            const teacher = new Teacher({
                ...req.body,
                teacherName: req.body.name,
                school: req.user.school,
                password: hashedPass
            });

            await teacher.save();

            res.send({ success: 'Done' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.teacherLogIn = async (req, res) => {
    try {
        let teacher = await Teacher.findOne({ email: req.body.email });
        if (teacher) {
            const validated = await bcrypt.compare(req.body.password, teacher.password);
            if (validated) {
                teacher = await teacher.populate("school", "schoolName")
                teacher.password = undefined;

                const teacherID = teacher._id
                const token = createNewToken(teacherID)

                res.send({
                    // ...teacher.toObject(),
                    role: teacher.role,
                    school: teacher.school,
                    name: formatName(teacher?.teacherName),
                    token
                })
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Teacher not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.allTeacherList = async (req, res) => {
    try {
        let teachers = await Teacher.find({ school: req.user.school }).collation({ locale: "en" }).sort({ teacherName: 1 })
            .populate("school", "schoolName")
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
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getTeachers = async (req, res) => {
    try {
        let teachers = await Teacher.find({ school: req.params.id })
            .populate("school", "schoolName")
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
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getTeacherDetail = async (req, res) => {
    try {
        let teacher = await Teacher.findById(req.params.id)
            .populate("school", "schoolName")
        if (teacher) {
            teacher.password = undefined;
            res.send({
                ...teacher.toObject(),
                name: formatName(teacher?.teacherName)
            })
        }
        else {
            res.send({ message: "No teacher found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// Assigned Class Teacher

exports.assignClassTeacherCreate = async (req, res) => {
    try {
        const assignedClassTeacher = new AssignedClassTeacher({
            ...req.body,
            school: req.user.school
        });

        const result = await assignedClassTeacher.save();

        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.assignedClassTeacherList = async (req, res) => {
    try {
        let assignedClassTeachers = await AssignedClassTeacher.find({ school: req.user.school })
            .populate("sections", "sectionName")
            .populate("teachers", "teacherName")
            .populate("sclassName", "sclassName")
            .populate({
                path: 'sclassName',
                select: 'sclassName',
                populate: {
                    path: 'sections',
                    select: 'sectionName',
                }
            })

        if (assignedClassTeachers.length > 0) {
            res.send(assignedClassTeachers)
        } else {
            res.send({ message: "No assignedClassTeachers found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.assignedClassTeacherUpdate = async (req, res) => {
    try {
        let result = await AssignedClassTeacher.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)

    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
}

// Old Code

exports.updateTeacherSubject = async (req, res) => {
    const { teacherId, teachSubject } = req.body;
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            { teachSubject },
            { new: true }
        );

        await Subject.findByIdAndUpdate(teachSubject, { teacher: updatedTeacher._id });

        res.send(updatedTeacher);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

        res.send(deletedTeacher);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.deleteTeachers = async (req, res) => {
    try {
        const deletionResult = await Teacher.deleteMany({ school: req.params.id });

        const deletedCount = deletionResult.deletedCount || 0;

        if (deletedCount === 0) {
            res.send({ message: "No teachers found to delete" });
            return;
        }

        res.send(deletionResult);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.deleteTeachersByClass = async (req, res) => {
    try {
        const deletionResult = await Teacher.deleteMany({ sclassName: req.params.id });

        const deletedCount = deletionResult.deletedCount || 0;

        if (deletedCount === 0) {
            res.send({ message: "No teachers found to delete" });
            return;
        }

        res.send(deletionResult);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.teacherAttendance = async (req, res) => {
    const { status, date } = req.body;

    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.send({ message: 'Teacher not found' });
        }

        const existingAttendance = teacher.attendance.find(
            (a) =>
                a.date.toDateString() === new Date(date).toDateString()
        );

        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            teacher.attendance.push({ date, status });
        }

        const result = await teacher.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error)
    }
};