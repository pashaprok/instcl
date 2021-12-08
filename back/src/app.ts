import express, { Application } from 'express';
import { catchErrors } from './middlewares/catchErrors';

const app: Application = express();
app.use(express.json());
app.use(catchErrors);

export default app;
