import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import connectToDB from './config/dbConfig';
import userRouter from './routes/userRouter';

config();
const app = express();
const PORT = process.env.PORT
app.use(cors({
    methods:["GET","POST","HEAD","DELETE","PUT"],
    origin:"http://localhost:5173/*"
}));

app.use(express.json());
app.use("/api/v1/users",userRouter);

app.listen(PORT,async()=>{
    await connectToDB();
    console.log(`Server started on PORT: ${PORT}`);
})