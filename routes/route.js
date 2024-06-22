const router = require('express').Router();

const { adminRegister, adminLogIn, getAdminDetail, updateAdmin, deleteAdmin, loginAsAdmin, getSchoolStats, getSchoolStatsbyAdmin } = require('../controllers/userRelated/admin-controller.js');

const { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents, allSclassList, sclassUpdate, classSectionList, searchClass, sclassSectionStudentList } = require('../controllers/class-controller.js');
const { classRoutineCreate, classRoutineList, classRoutineUpdate, teacherRoutineList, teacherRoutineListbyAdmin } = require('../controllers/classroutine-controller.js');
const { complainCreate, complainList } = require('../controllers/complain-controller.js');
const { examGroupCreate, examGroupList, examGroupUpdate } = require('../controllers/examgroup-controller.js');
const { examinationList, examinationCreate, examinationUpdate, allExaminationList } = require('../controllers/examination-controller.js');
const { examScheduleCreate, examScheduleList, examScheduleUpdate, admitCardExamScheduleList, examSubjectList } = require('../controllers/examschedule-controller.js');
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.js');
const { parentLogIn } = require('../controllers/userRelated/parent-controller.js');
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance,
    allStudentList } = require('../controllers/userRelated/student_controller.js');
const { subjectCreate, classSubjectList, deleteSubject, allSubjects, deleteSubjects, subjectUpdate, subjectDetails, subjectList } = require('../controllers/subject-controller.js');
const { superAdminRegister, superAdminLogIn, getSuperAdminDetail, getSchoolLists, loginAsSuperAdmin, getAllSchoolStats } = require('../controllers/userRelated/superadmin-controller.js');
const { teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, teacherAttendance, allTeacherList, assignClassTeacherCreate, assignedClassTeacherList, assignedClassTeacherUpdate } = require('../controllers/userRelated/teacher-controller.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const { marksGradeCreate, marksGradeList, updateMarksGrade, deleteMarksGrade } = require('../controllers/marksGrade-controller.js');

const { admitCardCreate, admitCardUpdate, allAdmitCardList, admitCardPrintDetails } = require('../controllers/admitCard-controller.js');

const { sectionCreate, sectionList, updateSection, deleteSection } = require('../controllers/section-controller.js');
const { subjectGroupCreate, subjectGroupList, subjectGroupUpdate, deleteSubjectGroup, specificSubjectGroupList } = require('../controllers/subjectGroup-controller.js');
const { marksDivisionCreate, marksDivisionList, updateMarksDivision, deleteMarksDivision } = require('../controllers/marksDivision-controller.js');
const { studentExamSubjectProvideMarks, examResultList, examResultDetails, studentExamDetails, examRankList } = require('../controllers/studentExam-controller.js');
const { deleteExamStudent, examStudentUpdate, examStudentList, examStudentCreate } = require('../controllers/examStudentController.js');
const { markSheetCreate, allMarkSheetList, markSheetPrintDetails, markSheetUpdate } = require('../controllers/markSheetController.js');

const { bookCreate, bookList, bookUpdate, deleteBook } = require('../controllers/library-controller.js');
const { deleteAdmissionEnquiry, updateAdmissionEnquiry, createAdmissionEnquiry, admissionEnquiryList } = require('../controllers/frontOfficeRelated/admissionEnquiryController.js');
const { createVisitor, visitorList, updateVisitor, deleteVisitor } = require('../controllers/frontOfficeRelated/visitor-controller.js');
const { createPhoneCallLog, phoneCallLogList, updatePhoneCallLog, deletePhoneCallLog } = require('../controllers/frontOfficeRelated/phoneCallLogController.js');
const { createPostal, postalList, updatePostal, deletePostal } = require('../controllers/frontOfficeRelated/postalController.js');
const { createEnquryComplain, listEnquryComplain, updateEnquryComplain, deleteEnquryComplain } = require('../controllers/enquryComplain-controller.js');
const { createStudentCategory, listStudentCategory, updateStudentCategory, deleteStudentCategory } = require('../controllers/studentCategories-controller.js')
const { createStudentHouse, studentHouseList, updateStudentHouse, deleteStudentHouse } = require('../controllers/studentHouse-controller.js');
const { purposeCreate, purposeList, updatePurpose, deletePurpose } = require('../controllers/frontOfficeRelated/purposeController.js');
const { sourceCreate, sourceList, updateSource, deleteSource } = require('../controllers/frontOfficeRelated/sourceController.js');
const { complaintTypeCreate, complaintTypeList, updateComplaintType, deleteComplaintType } = require('../controllers/frontOfficeRelated/complaintTypeController.js');
const { referenceCreate, referenceList, updateReference, deleteReference } = require('../controllers/frontOfficeRelated/referenceController.js');

const { createIssueItem, updateIssueItem, deleteIssueItem, issuedItemList } = require('../controllers/inventoryRelated/issueItemController.js');
const { itemCategoryCreate, itemCategoryList, updateItemCategory, deleteItemCategory } = require('../controllers/inventoryRelated/itemCategoryController.js');
const { itemCreate, deleteItem, itemUpdate, itemList, specificItemCategoryItemList } = require('../controllers/inventoryRelated/itemController.js');

const { createItemStock, itemStockList, updateItemStock, deleteItemStock } = require('../controllers/inventoryRelated/itemStockController.js');
const { createItemStore, itemStoreList, updateItemStore, deleteItemStore } = require('../controllers/inventoryRelated/itemStoreController.js');
const { createItemSupplier, itemSupplierList, updateItemSupplier, deleteItemSupplier } = require('../controllers/inventoryRelated/itemSupplierController.js');
const { getTeacherLists, getAdminLists } = require('../controllers/systemController.js');

// System

router.get("/getadminLists", authMiddleware, getAdminLists)
router.get("/getteacherLists", authMiddleware, getTeacherLists)

// Super Admin
router.post('/SuperAdminReg', superAdminRegister);
router.post('/SuperAdminLogin', superAdminLogIn);

router.get("/SuperAdmin/:id", getSuperAdminDetail)
router.get("/Schools", getSchoolLists)

router.get("/loginAsSuperAdmin/:id", authMiddleware, loginAsSuperAdmin)

router.get("/getAllSchoolStats", getAllSchoolStats)

// Admin
router.post('/AdminReg', authMiddleware, adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get("/Admin/:id", getAdminDetail)

router.get("/loginAsAdmin/:id", authMiddleware, loginAsAdmin)

router.delete("/deleteAdmin/:id", authMiddleware, deleteAdmin)
router.put("/updateAdmin/:id", authMiddleware, updateAdmin)

router.get("/getSchoolStats/:id", getSchoolStats)
router.get("/getSchoolStatsbyAdmin", authMiddleware, getSchoolStatsbyAdmin)

// router.put("/Admin/:id", updateAdmin)

// Parent
router.post('/ParentLogin', parentLogIn);

// Student

router.post('/StudentReg', authMiddleware, studentRegister);

router.post('/StudentLogin', studentLogIn)

router.get('/allStudentList', authMiddleware, allStudentList);

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsClass/:id", deleteStudentsByClass)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdateExamResult/:id', updateExamResult)

router.put('/StudentAttendance/:id', studentAttendance)

router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance)

// Teacher

router.post('/TeacherReg', authMiddleware, teacherRegister);
router.post('/TeacherLogin', teacherLogIn)

router.get('/allTeacherList', authMiddleware, allTeacherList);

router.get("/Teachers/:id", getTeachers)
router.get("/Teacher/:id", getTeacherDetail)

router.delete("/Teachers/:id", deleteTeachers)
router.delete("/TeachersClass/:id", deleteTeachersByClass)
router.delete("/Teacher/:id", deleteTeacher)

router.put("/TeacherSubject", updateTeacherSubject)

router.post('/TeacherAttendance/:id', teacherAttendance)

// Assigned Class Teacher

router.post('/assignClassTeacherCreate', authMiddleware, assignClassTeacherCreate);
router.get('/assignedClassTeacherList', authMiddleware, assignedClassTeacherList);
router.put("/assignedClassTeacherUpdate/:id", authMiddleware, assignedClassTeacherUpdate)

// Notice

router.post('/NoticeCreate', noticeCreate);

router.get('/noticeList', authMiddleware, noticeList);

router.delete("/Notices/:id", deleteNotices)
router.delete("/Notice/:id", deleteNotice)

router.put("/Notice/:id", updateNotice)

// Complain

router.post('/ComplainCreate', complainCreate);

router.get('/ComplainList/:id', complainList);

// Sclass

router.post('/sclassCreate', authMiddleware, sclassCreate);

router.get('/allSclassList', authMiddleware, allSclassList);

router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail)

router.get('/classSectionList/:id', classSectionList);

router.get("/Sclass/Students/:id", getSclassStudents)
router.get("/sclassSectionStudentList/:classID/:sectionID", sclassSectionStudentList)

router.delete("/Sclasses/:id", deleteSclasses)
router.delete("/Sclass/:id", deleteSclass)

router.put("/sclassUpdate/:id", authMiddleware, sclassUpdate)

router.get('/searchClass', authMiddleware, searchClass)

// Subject

router.post('/subjectCreate', authMiddleware, subjectCreate);

router.get('/subjectList', authMiddleware, subjectList);

router.get('/classSubjectList/:id', classSubjectList);
router.get("/subjectDetails/:id", subjectDetails)

router.get('/AllSubjects/:id', allSubjects);

router.delete("/Subject/:id", deleteSubject)
router.delete("/Subjects/:id", deleteSubjects)

router.put("/subjectUpdate/:id", authMiddleware, subjectUpdate)

//========== Section ==========

router.post('/sectionCreate', authMiddleware, sectionCreate);
router.get('/sectionList', authMiddleware, sectionList);
router.put('/sectionUpdate/:id', authMiddleware, updateSection);
router.delete('/sectionDelete/:id', authMiddleware, deleteSection);
// router.get('/sectionSearch', authMiddleware, searchSection);

// Subject Group

router.post('/subjectGroupCreate', authMiddleware, subjectGroupCreate);
router.get('/subjectGroupList', authMiddleware, subjectGroupList);
router.get('/specificSubjectGroupList/:sclassName/:section', authMiddleware, specificSubjectGroupList);
router.put("/subjectGroupUpdate/:id", authMiddleware, subjectGroupUpdate)
router.delete("/deleteSubjectGroup/:id", deleteSubjectGroup)

// Class Routine

router.post('/classRoutineCreate', authMiddleware, classRoutineCreate);
router.get('/classRoutineList/:sclass/:section', authMiddleware, classRoutineList);
router.put("/classRoutineUpdate/:id", authMiddleware, classRoutineUpdate)

// Exam Group

router.post('/examGroupCreate', authMiddleware, examGroupCreate);
router.get('/examGroupList', authMiddleware, examGroupList);
router.put("/examGroupUpdate/:id", authMiddleware, examGroupUpdate)

// Examination

router.post('/examinationCreate', authMiddleware, examinationCreate);
router.get('/examinationList/:examGroup', authMiddleware, examinationList);
router.get('/allExaminationList', authMiddleware, allExaminationList);
router.put("/examinationUpdate/:id", authMiddleware, examinationUpdate)

// Examination

router.post('/examStudentCreate', authMiddleware, examStudentCreate);
router.get('/examStudentList/:sclassName/:sectionName/:sessionYear/:examinationType', authMiddleware, examStudentList);
router.put("/examStudentUpdate/:id", authMiddleware, examStudentUpdate)
router.delete('/deleteExamStudent/:id', authMiddleware, deleteExamStudent);

// Exam Schedule

router.post('/examScheduleCreate', authMiddleware, examScheduleCreate);
router.get('/examScheduleList/:examGroup/:examinationType', authMiddleware, examScheduleList);
router.get('/examSubjectList/:examGroup/:examinationType', authMiddleware, examSubjectList);
router.get('/admitCardExamScheduleList/:examinationType', authMiddleware, admitCardExamScheduleList);
router.get('/teacherRoutineList', authMiddleware, teacherRoutineList);
router.get('/teacherRoutineListbyAdmin/:id', authMiddleware, teacherRoutineListbyAdmin);
router.put("/examScheduleUpdate/:id", authMiddleware, examScheduleUpdate)

// Admit Card

router.post('/admitCardCreate', authMiddleware, admitCardCreate);
router.get('/allAdmitCardList', authMiddleware, allAdmitCardList);
router.get('/admitCardPrintDetails/:studentID/:acID', authMiddleware, admitCardPrintDetails);
router.put("/admitCardUpdate/:id", authMiddleware, admitCardUpdate)

// Marksheet

router.post('/markSheetCreate', authMiddleware, markSheetCreate);
router.get('/allMarkSheetList', authMiddleware, allMarkSheetList);
router.get('/markSheetPrintDetails/:studentID/:msID', authMiddleware, markSheetPrintDetails);
router.put("/markSheetUpdate/:id", authMiddleware, markSheetUpdate)

//========== Marks Grade ==========

router.post('/marksGradeCreate', authMiddleware, marksGradeCreate);
router.get('/marksGradeList', authMiddleware, marksGradeList);
router.put('/marksGradeUpdate/:id', authMiddleware, updateMarksGrade);
router.delete('/marksGradeDelete/:id', authMiddleware, deleteMarksGrade);

//========== Marks Division ==========

router.post('/marksDivisionCreate', authMiddleware, marksDivisionCreate);
router.get('/marksDivisionList', authMiddleware, marksDivisionList);
router.put('/marksDivisionUpdate/:id', authMiddleware, updateMarksDivision);
router.delete('/marksDivisionDelete/:id', authMiddleware, deleteMarksDivision);

//========== Student Exam ==========

router.post('/studentExamSubjectProvideMarks', authMiddleware, studentExamSubjectProvideMarks);
router.get('/examResultList/:examGroup/:examinationType/:sclass/:section/:sessionYear', authMiddleware, examResultList);
router.get('/examRankList/:examGroup/:examinationType/:sessionYear', authMiddleware, examRankList);
router.get('/examResultDetails/:id', authMiddleware, examResultDetails);
router.get('/studentExamDetails/:studentID/:examinationID/:sessionYear', authMiddleware, studentExamDetails);

//============ Book Librarry========
router.post('/bookCreate', authMiddleware, bookCreate);
router.get('/bookList', authMiddleware, bookList);
router.put('/bookUpdate/:id', authMiddleware, bookUpdate);
router.delete('/deleteBook/:id', authMiddleware, deleteBook);

//============Student Categories ================
router.post('/createStudentCategory', authMiddleware, createStudentCategory);
router.get('/listStudentCategory', authMiddleware, listStudentCategory);
router.put('/updateStudentCategory/:id', authMiddleware, updateStudentCategory);
router.delete('/deleteStudentCategory/:id', authMiddleware, deleteStudentCategory);

//=========== Student House =====================
router.post('/createStudentHouse', authMiddleware, createStudentHouse);
router.get('/studentHouseList', authMiddleware, studentHouseList);
router.put('/updateStudentHouse/:id', authMiddleware, updateStudentHouse);
router.delete('/deleteStudentHouse/:id', authMiddleware, deleteStudentHouse);

{/*__________________________________________*/ }
{/*                INVENTORY                 */ }
{/*__________________________________________*/ }

//============== Item Category ============

router.post('/itemCategoryCreate', authMiddleware, itemCategoryCreate);
router.get('/itemCategoryList', authMiddleware, itemCategoryList);
router.put('/itemCategoryUpdate/:id', authMiddleware, updateItemCategory);
router.delete('/itemCategoryDelete/:id', authMiddleware, deleteItemCategory);

//============== Item ============

router.post('/itemCreate', authMiddleware, itemCreate);
router.get('/itemList', authMiddleware, itemList);
router.get('/specificItemCategoryItemList/:itemCategory', authMiddleware, specificItemCategoryItemList);
router.put('/itemUpdate/:id', authMiddleware, itemUpdate);
router.delete('/deleteItem/:id', authMiddleware, deleteItem);

//============== Issue Item ============

router.post('/createIssueItem', authMiddleware, createIssueItem);
router.get('/issuedItemList', authMiddleware, issuedItemList);
router.put('/updateIssueItem/:id', authMiddleware, updateIssueItem);
router.delete('/deleteIssueItem/:id', authMiddleware, deleteIssueItem);

//===============  Item Store ==================

router.post('/createItemStore', authMiddleware, createItemStore);
router.get('/itemStoreList', authMiddleware, itemStoreList);
router.put('/updateItemStore/:id', authMiddleware, updateItemStore);
router.delete('/deleteItemStore/:id', authMiddleware, deleteItemStore);

//=============== Item Supplier ==================

router.post('/createItemSupplier', authMiddleware, createItemSupplier);
router.get('/itemSupplierList', authMiddleware, itemSupplierList);
router.put('/updateItemSupplier/:id', authMiddleware, updateItemSupplier);
router.delete('/deleteItemSupplier/:id', authMiddleware, deleteItemSupplier);

//=============== Item Stock ===============

router.post('/createItemStock', authMiddleware, createItemStock);
router.get('/itemStockList', authMiddleware, itemStockList);
router.put('/updateItemStock/:id', authMiddleware, updateItemStock);
router.delete('/deleteItemStock/:id', authMiddleware, deleteItemStock);

{/*__________________________________________*/ }
{/*              FRONT OFFICE                */ }
{/*__________________________________________*/ }

//============== Purpose ============

router.post('/purposeCreate', authMiddleware, purposeCreate);
router.get('/purposeList', authMiddleware, purposeList);
router.put('/purposeUpdate/:id', authMiddleware, updatePurpose);
router.delete('/purposeDelete/:id', authMiddleware, deletePurpose);

//============= Source ===============

router.post('/sourceCreate', authMiddleware, sourceCreate);
router.get('/sourceList', authMiddleware, sourceList);
router.put('/sourceUpdate/:id', authMiddleware, updateSource);
router.delete('/sourceDelete/:id', authMiddleware, deleteSource);

//========== Complaint Type ==========

router.post('/complaintTypeCreate', authMiddleware, complaintTypeCreate);
router.get('/complaintTypeList', authMiddleware, complaintTypeList);
router.put('/complaintTypeUpdate/:id', authMiddleware, updateComplaintType);
router.delete('/complaintTypeDelete/:id', authMiddleware, deleteComplaintType);

//========== Reference ================

router.post('/referenceCreate', authMiddleware, referenceCreate);
router.get('/referenceList', authMiddleware, referenceList);
router.put('/referenceUpdate/:id', authMiddleware, updateReference);
router.delete('/referenceDelete/:id', authMiddleware, deleteReference);

//============  Visitor ================

router.post('/createVisitor', authMiddleware, createVisitor);
router.get('/visitorList', authMiddleware, visitorList);
router.put('/updateVisitor/:id', authMiddleware, updateVisitor);
router.delete('/deleteVisitor/:id', authMiddleware, deleteVisitor);

//========== Admission Enquiry ==========

router.post('/createAdmissionEnquiry', authMiddleware, createAdmissionEnquiry);
router.get('/admissionEnquiryList/:sclass/:source/:admissionEnquiryStatus', authMiddleware, admissionEnquiryList);
router.put('/updateAdmissionEnquiry/:id', authMiddleware, updateAdmissionEnquiry);
router.delete('/deleteAdmissionEnquiry/:id', authMiddleware, deleteAdmissionEnquiry);

//============= Phone Call Log ===========

router.post('/createPhoneCallLog', authMiddleware, createPhoneCallLog);
router.get('/phoneCallLogList', authMiddleware, phoneCallLogList);
router.put('/updatePhoneCallLog/:id', authMiddleware, updatePhoneCallLog);
router.delete('/deletePhoneCallLog/:id', authMiddleware, deletePhoneCallLog);

//============ Postal  ===============

router.post('/createPostal', authMiddleware, createPostal);
router.get('/postalList/:postalType', authMiddleware, postalList);
router.put('/updatePostal/:id', authMiddleware, updatePostal);
router.delete('/deletePostal/:id', authMiddleware, deletePostal);

//============ Enqury Complain ================

router.post('/createEnquryComplain', authMiddleware, createEnquryComplain);
router.get('/listEnquryComplain', authMiddleware, listEnquryComplain);
router.put('/updateEnquryComplain/:id', authMiddleware, updateEnquryComplain);
router.delete('/deleteEnquryComplain/:id', authMiddleware, deleteEnquryComplain);

module.exports = router;