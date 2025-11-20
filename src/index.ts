import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import connectToDB from './config/dbConfig';
import userRouter from './routes/userRouter';
import configureCloudinary from './config/cloudinaryConfig';
import authMiddleware from './middleware/authMiddleware';
import cardRouter from './routes/cardRouter';

config();
const app = express();
const PORT = process.env.PORT
app.use(cors({
    methods:["GET","POST","HEAD","DELETE","PUT"],
    origin:["http://localhost:5173/*"]
}));

app.use(express.json());

app.use("/api/v1/users",userRouter);
app.use("/api/v1/card",authMiddleware,cardRouter)

app.listen(PORT,async()=>{
    await connectToDB();
    await configureCloudinary();
    console.log(`Server started on PORT: ${PORT}`);
})