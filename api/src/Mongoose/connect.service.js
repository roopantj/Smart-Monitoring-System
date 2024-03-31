import mongoose from "mongoose";

export const mongoConnect = async (pcb) => {
  try {
    if (mongoose.connection.readyState === 1) {
      if (pcb) pcb();
      return;
    }
    await mongoose.connect(process.env.DB_CONNECTION_URL);
    if (pcb) pcb();
  } catch (err) {
    console.log(err);
    console.log("Error reaching MongoServer");
  }
};

export const mongoDisconnect = async () => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.log("Error in disconnecting MongoServer");
  }
};
