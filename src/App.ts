import express, { Express } from 'express';
import cors from 'cors';
import router from './routes/Router';
import CorsMiddleware from './midleware/CorsMiddleware';

const app: Express = express();
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Request-Headers',
    'Access-Control-Request-Method'
  ],
  optionsSuccessStatus: 200
};

app.enable("trust proxy");
app.use(CorsMiddleware);
app.use(cors(corsOptions));
app.use(express.json());
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: process.env.SESSION_SECRET || 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(router.auth);
app.use(router.city);
app.use(router.user);

export { app };