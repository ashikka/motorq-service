import mongoose from 'mongoose';
import { ClassDocSchema } from '../utils/interfaces';

const ClassSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  courseCode: {
    type: String,
    unique: true,
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
