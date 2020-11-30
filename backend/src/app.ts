import express from 'express';
import linksRouter from './routes/links';
import cors from 'cors';

const app = express();
app.use(express.json());//using json 
app.use(cors());//permissao cors entre sites
app.use(linksRouter);

export default app;
