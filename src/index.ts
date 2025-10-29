import express, { NextFunction } from 'express'
import dotenv from 'dotenv'

import { Request, Response } from 'express';
import { ApiError } from './errors/api-error';
import { userRouter } from './routers/user.router';


dotenv.config()
const app = express();

app.use(express.json())


app.use("/users",userRouter)

app.use((error:ApiError , req: Request, res: Response, next: NextFunction) => {
  const status = error.status ?? 500;
  const message = error.message ?? "Something went wrong"
  res.status(status).json({ status , message })
}
)

process.on("uncaughtException", (err) => {
  console.error(" Uncaught Exception:", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error(" Unhandled Rejection:", reason);
  process.exit(1);
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});