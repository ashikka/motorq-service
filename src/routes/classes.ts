import express, { Request, Response } from 'express';
import ClassModel from '../models/classes';
import StudentModel from '../models/student';

const router = express.Router();

// WORKING
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      // eslint-disable-next-line no-unused-vars
      id, courseCode, faculty, building, time, location,
    } = req.body;

    const classOfStudent = await ClassModel.create(req.body);
    if (!classOfStudent) {
      res.json({ success: false, message: 'Class not found' });
    } else {
      res.json({
        success: true,
        message: 'Class removed successfully',
        data: {
          classOfStudent,
        },
      });
    }
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

// WORKING
router.get('/:courseCode', async (req: Request, res: Response) => {
  try {
    const { courseCode } = req.params;

    if (!courseCode) {
      res.json({ success: false, message: 'Required fields cannot be empty' });
    }
    const classes = await ClassModel.findOne({ courseCode });

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

// NOT WORKING PROPERLY
router.post('/:studentId', async (req:Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const {
      // eslint-disable-next-line no-unused-vars
      id, courseCode, faculty, building, time, location,
    } = req.body;
    if (!studentId) {
      res.json({ success: false, message: 'Required fields cannot be empty' });
    }

    const student = await StudentModel.findOne({ rollNo: studentId });

    if (!student) {
      res.json({ success: false, message: 'Student not found' });
    }
    const updatedStudent = await StudentModel.findOneAndUpdate(
      { rollNo: studentId },
      { $addToSet: { classes: req.body } },
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
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

// NOT WORKING PROPERLY
router.post('/:studentId/:classId', async (req: Request, res: Response) => {
  try {
    const { studentId, classId } = req.params;
    if (!studentId || !classId) {
      res.json({ success: false, message: 'Required fields cannot be empty' });
    }

    // SEE IF AFTER REMOVING U GET SOMETHING
    const classOfStudent = await StudentModel.findOneAndDelete({
      rollNo: studentId,
      'classes.id': classId,
    }, { new: true });
    if (!classOfStudent) {
      res.json({ success: false, message: 'Class not found' });
    } else {
      res.json({
        success: true,
        message: 'Class removed successfully',
        data: {
          classOfStudent,
        },
      });
    }
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

// WORKING
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

// WORKING
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

      const classes = await ClassModel.findOne({ courseCode });

      // eslint-disable-next-line no-unused-vars
      const students = await StudentModel.findOne({
        'classes.courseCode': courseCode,
      }).countDocuments();

      if (!classes) {
        res.json({ success: false, message: 'Classes not found' });
      } else {
        res.json({
          success: true,
          message: 'Classes found successfully',
          data: {
            classesId: classes.id,
            courseCode: classes.courseCode,
            building: classes.building,
            studentsRegistered: students,
            time: classes.time,
            location: classes.location,
          },
        });
      }
    } catch (e) {
      res.json({ success: false, message: e });
    }
  },
);

export default router;
