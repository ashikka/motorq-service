import express from 'express';
import studentRouter from './student';
import classRouter from './classes';

const router = express.Router();

router.use('/student', studentRouter);
router.use('/classes', classRouter);

export default router;
