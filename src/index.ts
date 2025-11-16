import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

config();

const app = express();
const PORT = process.env.PORT
app.use(cors({
    methods:["GET","POST","HEAD","DELETE","PUT"],
    origin:"http://localhost:5173/*"
}));
app.use(express.json());

app.get("/",(req,res)=>{
    return res.json({
        msg:"Hello how are you?"
    })
})

app.listen(PORT,()=>{
    console.log(`Server started on PORT: ${PORT}`);
})