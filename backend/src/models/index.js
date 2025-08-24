import mongoose from "mongoose";
import  initdata  from "./data.js";
import Lead from "./lead.models.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/user";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Lead.deleteMany({});
  await Lead.insertMany(initdata.data);
  console.log("data was initialized");
};

initDB();