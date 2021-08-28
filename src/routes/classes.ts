import express, { Request, Response } from 'express';
import ClassModel from '../models/classes';
import StudentModel from '../models/student';

const router = express.Router();

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

// Post /class/{studentId}:
// o Adds a class to student’s entity if there are no clashes

// router.post('/:studentId', async (req:Request, res: Response) => {
//     try{
//         const { studentId } = req.params;
//     }
// })

router.post('/:studentId/:classId', async (req:Request, res: Response) => {
  try {
    const { studentId, classId } = req.params;
    if (!studentId || !classId) {
      res.json({ success: false, message: 'Required fields cannot be empty' });
    }

    // SEE IF AFTER REMOVING U GET SOMETHING
    const classOfStudent = await StudentModel.findOneAndDelete({
      rollNo: studentId, 'classes.id': classId,
    });
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

router.get('/:studentId', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      res.json({ success: false, message: 'Required fields cannot be empty' });
    }
    const student = await StudentModel.findOne({ studentId });

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

router.post('/classes-on-map/:courseCode', async (req:Request, res: Response) => {
  try {
    const { courseCode } = req.params;
    if (!courseCode) {
      res.json({ success: false, message: 'Required fields cannot be empty' });
    }
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

export default router;
