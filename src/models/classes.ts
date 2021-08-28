import mongoose from 'mongoose';
import { ClassDocSchema } from '../utils/interfaces';

export const ClassSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  courseCode: {
    type: String,
  },
  faculty: {
    type: String,
  },
  building: {
    type: String,
  },
  time: {
    type: String,
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
});

const ClassModel = mongoose.model<ClassDocSchema>('Class', ClassSchema);
export default ClassModel;
