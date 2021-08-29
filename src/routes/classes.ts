/* eslint-disable no-unused-vars */
import express, { Request, Response } from 'express';
import ClassModel from '../models/classes';
import StudentModel from '../models/student';

const router = express.Router();

/* ----------------------- Sample route ------------------------------*/
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      id, courseCode, courseName, faculty, building, time, location,
    } = req.body;

    const classOfStudent = await ClassModel.create(req.body);
    if (!classOfStudent) {
      res.json({ success: false, message: 'Class not found' });
    } else {
      res.json({
        success: true,
        message: 'Class created successfully',
        data: {
          classOfStudent,
        },
      });
    }
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

/* ----------------------- Get classes for given courseCode ------------------------------*/
router.get('/:courseCode', async (req: Request, res: Response) => {
  try {
    const { courseCode } = req.params;

    if (!courseCode) {
      res.json({ success: false, message: 'Required fields cannot be empty' });
    }
    const classes = await ClassModel.find({ courseCode });

    if (!classes) {
      res.json({ success: false, message: 'Classes not found' });
    } else {
      res.json({
        success: true,
        message: 'Classes found successfully',
        data: {
          classes,
        },
      });
    }
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

/* ----------------------- Add new class to student if no clashes ------------------------------*/

router.post('/:studentId', async (req:Request, res: Response) => {
  try {
    const { studentId } = req.params;
    // const {
    //   id, courseCode, courseName, faculty, building, time, location,
    // } = req.body;
    if (!studentId) {
      res.json({ success: false, message: 'Required fields cannot be empty' });
    }

    const student = await StudentModel.findOne({
      rollNo: studentId,
      'classes.time': req.body.courseDetails.time,
    });

    if (!student) {
      const updatedStudent = await StudentModel.findOneAndUpdate(
        { rollNo: studentId },
        { $push: { classes: req.body.courseDetails } },
        { new: true },
      );
      if (updatedStudent) {
        res.json({
          success: true,
          message: 'Classes updated successfully',
          data: {
            student: {
              rollNo: updatedStudent.rollNo,
              name: updatedStudent.name,
              classes: updatedStudent.classes,
            },
          },
        });
      }
    } else {
      res.json({ success: false, message: 'Classes are clashing' });
    }
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

/* ------------- Deletes a class with the given classId from the student’s entity ---------------*/

router.post('/:studentId/:classId', async (req: Request, res: Response) => {
  try {
    const { studentId, classId } = req.params;
    if (!studentId || !classId) {
      res.json({ success: false, message: 'Required fields cannot be empty' });
    }

    const classOfStudent = await StudentModel.findOneAndUpdate({ rollNo: studentId },
      { $pull: { classes: { id: classId } } });

    if (!classOfStudent) {
      res.json({ success: false, message: 'Class not found' });
    } else {
      const updatedClasses = await StudentModel.findOne({ rollNo: studentId });
      if (updatedClasses) {
        res.json({
          success: true,
          message: 'Class removed successfully',
          data: {
            classes: updatedClasses.classes,
          },
        });
      }
    }
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

/* -------------- Gets all the classes registered by the student with rollNo ----------------*/

router.get('/student/:studentId', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      res.json({ success: false, message: 'Required fields cannot be empty' });
    }
    const student = await StudentModel.findOne({ rollNo: studentId });

    if (!student) {
      res.json({ success: false, message: 'Student not found' });
    } else {
      res.json({
        success: true,
        message: 'Classes found successfully',
        data: {
          classes: student.classes,
        },
      });
    }
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

/* -------------- Get an array of classes of the given courseCode on map ----------------*/

router.get(
  '/classes-on-map/:courseCode',
  async (req: Request, res: Response) => {
    try {
      const { courseCode } = req.params;
      if (!courseCode) {
        res.json({
          success: false,
          message: 'Required fields cannot be empty',
        });
      }

      const classes = await ClassModel.find({ courseCode });

      const students = await StudentModel.findOne({
        'classes.courseCode': courseCode,
      }).countDocuments();

      if (!classes) {
        res.json({ success: false, message: 'Classes not found' });
      } else {
        res.json({
          success: true,
          message: 'Classes found successfully',
          data: classes.map((c) => ({
            classesId: c.id,
            courseCode: c.courseCode,
            courseName: c.courseName,
            faculty: c.faculty,
            building: c.building,
            studentsRegistered: students,
            time: c.time,
            location: c.location,
          })),
        });
      }
    } catch (e) {
      res.json({ success: false, message: e });
    }
  },
);

export default router;
