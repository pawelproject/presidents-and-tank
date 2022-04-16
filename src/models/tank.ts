import mongoose from "mongoose";

export interface ITank {
  nr: String;
  producer: String;
  tankModel: string; // 'model' is reserved for mongoose
  version: string;
  tankYear: Number; // 1900-current
  releaseDate: Date; //1970-current
  mileage: Number; //positive
  ammo: Number; //positive
  armor: Number; //positive
  ownerId: any; //positive
}

const TankSchema = new mongoose.Schema<ITank>(
  {
    nr: {
      type: String,
      required: true,
    },
    producer: {
      type: String,
      required: true,
    },
    tankModel: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    tankYear: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    ammo: {
      type: Number,
      required: true,
    },
    armor: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        ret.model = ret.tankModel;
        delete ret.tankModel;
        delete ret._id;
      },
    },
  }
);

TankSchema.pre("remove", function (next) {
  this.model("User").updateOne(
    {},
    { $pull: { tanks: this._id } },
    { multi: true },
    next
  );
});

const Tank = mongoose.model<ITank>("Tank", TankSchema);

export default Tank;
