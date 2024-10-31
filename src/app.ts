import express from 'express';
import morgan from 'morgan';
import mainRoutes from './routes/main.routes';
import cors from 'cors';

const app = express();



app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use("/api/V1",mainRoutes);



export default app
