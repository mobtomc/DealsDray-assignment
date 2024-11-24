import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  f_Image: string;
  f_Name: string;
  f_Email: string;
  f_Mobile: string;
  f_Designation: string;
  f_gender: string;
  f_Course: string[];
  f_Createdate: Date;
}

const EmployeeSchema: Schema = new Schema({
  f_Image: { type: String, required: true },
  f_Name: { type: String, required: true },
  f_Email: { type: String, required: true ,unique:true},
  f_Mobile: { type: String, required: true },
  f_Designation: { type: String, required: true },
  f_gender: { type: String, required: true },
  f_Course: { type: [String], required: true },
  f_Createdate: { type: Date, default: Date.now },
});

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);
