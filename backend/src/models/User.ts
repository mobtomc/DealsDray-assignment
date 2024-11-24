import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  f_userName: string;
  f_Pwd: string;
}

const UserSchema: Schema = new Schema({
  f_userName: { type: String, required: true, unique: true },
  f_Pwd: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
