import mongoose from "mongoose";
import "dotenv/config";

const DATABASE_URL = process.env.DATABASE_URL;
const DB_NAME = process.env.DB_NAME;

if (!DATABASE_URL || !DB_NAME) {
    console.log("Environment variables missing");
    process.exit(1);
}

mongoose.connect(`${DATABASE_URL}${DB_NAME}`)
.then(() => {
    console.log("Connected to database successfully");
})
.catch((err) => {
    console.log("Error connecting to database", err);
});