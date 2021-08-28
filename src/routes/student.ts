import express, { Request, Response } from 'express';
import StudentModel from '../models/student';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { rollNo } = req.body;
    const { name } = req.body;
    if (!rollNo || !name) {
      res.json({ success: false, message: 'Required fields cannot be empty' });
      return;
    }
    const student = await StudentModel.create({
      rollNo,
      name,
    });
    res.json({
      success: true,
      message: 'Data posted successfully',
      data: {
        rollNo: student.rollNo,
        name: student.name,
      },
    });
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

router.get('/:rollNo', async (req: Request, res: Response) => {
  try {
    const { rollNo } = req.params;
    if (!rollNo) {
      res.json({ success: false, message: 'Required fields cannot be empty' });
    }
    const student = await StudentModel.findOne({ rollNo });
    if (!student) {
      res.json({ succes: false, message: 'Student cannot be found' });
    } else {
      res.json({
        success: true,
        message: 'Student found successfully',
        data: { rollNo: student.rollNo, student: student.name },
      });
    }
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

export default router;
