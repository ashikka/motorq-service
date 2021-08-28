import mongoose from 'mongoose';
import { StudentDocSchema } from '../utils/interfaces';
import ClassSchema from './classes';

export const StudentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  classes: {
    type: [ClassSchema],
  },
});

const StudentModel = mongoose.model<StudentDocSchema>('Student', StudentSchema);

export default StudentModel;
