import { Schema, model } from "mongoose";

let alertSchema = new Schema({
  deviceId: {
    type: String,
    required: [true, "deviceId field required"],
  },
  dateTime: {
    type: String,
    required: [true, "dateTime field required"],
  },
});

export default model["Alert"] || model("Alert", alertSchema);
