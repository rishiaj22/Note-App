import express from "express"
import dotenv from "dotenv"
dotenv.config();
import connection from "./Config/connection.db.js";
import {userRouter} from "./Routes/user.route.js"
import { noteRouter } from "./Routes/note.route.js";
import auth from "./Middleware/auth.middleware.js";

const Port = process.env.Port;
const app = express();

app.use(express.json())
app.use("/user",userRouter)
app.use("/note",auth,noteRouter)

app.listen(Port,async()=>{
    try {
        await connection
        console.log(`Server is running on the port ${Port} and connected to the database`)
    } catch (error) {
        console.log(`Error while running the port or connecting to the database ${error}`)
    }
})