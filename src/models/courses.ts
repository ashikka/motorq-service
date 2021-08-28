import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
});

export default CourseSchema;
