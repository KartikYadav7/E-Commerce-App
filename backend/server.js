import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import userRoutes from './routes/userRoutes.js';

const port = process.env.PORT || 5000;
const app = express();
connectDB();
app.use(cors({
    origin:["http://localhost:5173",""],
    methods:["get","post","put","delete"],
    credentials:true,
}

))
app.use(express.json());


app.use('/', authRoutes);
app.use('/api', userRoutes);
app.get('/',(req,res)=>{
    res.send("Welcome to the server")
})

app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})

