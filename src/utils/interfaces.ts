import mongoose from 'mongoose';

export interface ClassDocSchema extends mongoose.Document{
  id: string,
  courseCode: string,
  courseName: string,
  faculty: string,
  building: string,
  time: string,
  location: {
    latitude: number,
    longitue: number,
  }
}

export interface StudentDocSchema extends mongoose.Document{
  rollNo: string,
  name: string,
  classes: ClassDocSchema[],
}
