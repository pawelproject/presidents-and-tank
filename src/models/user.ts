import mongoose from "mongoose";

export interface IUser {
  email: string;
  fullName: string;
  password: string;
  country: string;
  hasNuclearBomb: boolean;
  tanks: any;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    hasNuclearBomb: {
      type: Boolean,
      required: true,
    },
    tanks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tank",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.tanks;
      },
    },
    toObject: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.tanks;
      },
    },
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
