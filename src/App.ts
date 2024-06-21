import express, { Express } from 'express';
import cors from 'cors';
import router from './routes/Router';

const app: Express = express();
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));
app.use(express.json());

app.use(router.city);
app.use(router.user);

export { app };