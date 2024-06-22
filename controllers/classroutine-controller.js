const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/userRelated/teacherSchema.js');
const ClassRoutine = require('../models/classRoutineSchema.js');
const { formatName } = require('../utils/quickFunctions.js');

exports.classRoutineCreate = async (req, res) => {
    try {
        const findedSessionDetails = await ClassRoutine.findOne({
            sclassName: req.body.sclassName,
            section: req.body.section,
            dayOfWeek: req.body.dayOfWeek,
            school: req.user.school,
        });

        if (findedSessionDetails) {
            return res.send({ message: "This already exists edit that in the timetable" });
        }
        else {
            const classRoutine = new ClassRoutine({
                ...req.body,
                school: req.user.school,
            });

            const result = await classRoutine.save();
            res.send(result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.classRoutineList = async (req, res) => {
    try {
        const { sclass, section } = req.params

        let classRoutines = await ClassRoutine.find({
            school: req.user.school,
            sclassName: sclass,
            section: section,
        })
            .populate("sclassName", "sclassName")
            .populate("sessionDetails.sessionSubject", "subName subCode")
            .populate("sessionDetails.sessionTeacher", "teacherName")
        // .populate("section", "sectionName")

        if (classRoutines.length > 0) {
            res.send(classRoutines)
        } else {
            res.send({ message: "No class routines found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.teacherRoutineList = async (req, res) => {
    try {

        const teacherID = req.user.userId

        let classRoutines = await ClassRoutine.find({
            school: req.user.school,
            'sessionDetails.sessionTeacher': teacherID,
        })
            .populate("sclassName", "sclassName")
            .populate("sessionDetails.sessionSubject", "subName subCode")
            .populate("sessionDetails.sessionTeacher", "teacherName")
            .populate("section", "sectionName")

        if (classRoutines.length > 0) {

            // for (const classRoutine of classRoutines) {
            //     const filteredSessionDetails = classRoutine?.sessionDetails?.filter(entry => entry?.sessionTeacher?._id.toString() === teacherID);
            //     classRoutine.sessionDetails = filteredSessionDetails
            // }

            // res.send(classRoutines)

            const fullClassRoutines = classRoutines.map((classRoutine) => {
                const filteredSD = classRoutine?.sessionDetails?.filter(entry => entry?.sessionTeacher?._id.toString() === teacherID);

                classRoutine.sessionDetails = filteredSD

                // const extraFiltered = filteredSD.map((session) => {
                //     const subName = session?.sessionSubject?.subName;
                //     const sessionStartTime = session?.sessionStartTime;
                //     const sessionEndTime = session?.sessionEndTime;
                //     const teacherName = formatName(session?.sessionTeacher?.teacherName);
                //     const sessionRoom = session?.sessionRoom
                //     const sclassName = classRoutine?.sclassName?.sclassName;
                //     const section = classRoutine?.section;
                //     const dayOfWeek = classRoutine?.dayOfWeek;

                //     return {
                //         subName,
                //         sessionStartTime,
                //         sessionEndTime,
                //         teacherName,
                //         sessionRoom,
                //         sclassName,
                //         section,
                //         dayOfWeek,
                //     };
                // });

                return {
                    ...classRoutine.toObject(),
                    // extraFiltered
                };
            })

            res.send(fullClassRoutines);
        } else {
            res.send({ message: "No routines found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.teacherRoutineListbyAdmin = async (req, res) => {
    try {

        const teacherID = req.params.id

        let classRoutines = await ClassRoutine.find({
            school: req.user.school,
            'sessionDetails.sessionTeacher': teacherID,
        })
            .populate("sclassName", "sclassName")
            .populate("section", "sectionName")
            .populate("sessionDetails.sessionSubject", "subName subCode")
            .populate("sessionDetails.sessionTeacher", "teacherName")

        if (classRoutines.length > 0) {

            // for (const classRoutine of classRoutines) {
            //     const filteredSessionDetails = classRoutine?.sessionDetails?.filter(entry => entry?.sessionTeacher?._id.toString() === teacherID);
            //     classRoutine.sessionDetails = filteredSessionDetails
            // }

            // res.send(classRoutines)

            const fullClassRoutines = classRoutines.map((classRoutine) => {
                const filteredSD = classRoutine?.sessionDetails?.filter(entry => entry?.sessionTeacher?._id.toString() === teacherID);

                classRoutine.sessionDetails = filteredSD

                // const extraFiltered = filteredSD.map((session) => {
                //     const subName = session?.sessionSubject?.subName;
                //     const sessionStartTime = session?.sessionStartTime;
                //     const sessionEndTime = session?.sessionEndTime;
                //     const teacherName = formatName(session?.sessionTeacher?.teacherName);
                //     const sessionRoom = session?.sessionRoom
                //     const sclassName = classRoutine?.sclassName?.sclassName;
                //     const section = classRoutine?.section;
                //     const dayOfWeek = classRoutine?.dayOfWeek;

                //     return {
                //         subName,
                //         sessionStartTime,
                //         sessionEndTime,
                //         teacherName,
                //         sessionRoom,
                //         sclassName,
                //         section,
                //         dayOfWeek,
                //     };
                // });

                return {
                    ...classRoutine.toObject(),
                    // extraFiltered
                };
            })

            res.send(fullClassRoutines);
        } else {
            res.send({ message: "No routines found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.classRoutineUpdate = async (req, res) => {
    try {

        const sessionDetails = req.body;

        const classRoutine = await ClassRoutine.findById(req.params.id);

        if (!classRoutine) {
            return res.send({ message: 'Class Routine not found' });
        }

        classRoutine.sessionDetails = sessionDetails;

        const result = await classRoutine.save();

        res.send(result);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};