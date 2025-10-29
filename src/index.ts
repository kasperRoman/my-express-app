import express, { NextFunction } from 'express'
import dotenv from 'dotenv'

import { Request, Response } from 'express';
import { ApiError } from './errors/api-error';
import { userRouter } from './routers/user.router';


dotenv.config()
const app = express();

app.use(express.json())


app.use("/users",userRouter)



// app.put('/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = await read();
//     const index = users.findIndex(user => user.id === Number(req.params.userId));
//     const updatedData = req.body;
//     if (index === -1) {
//       return res.status(404).json({ massage: 'Користувача не знайдено' })
//     }
//     let user = users[index];
//     user = { ...user, ...updatedData }

//     await write(users);
//     res.status(201).json({ message: 'Користувача оновлено', user: users[index] });

//   } catch (e) {
//     next(e)
//   }
// })

app.use((error:ApiError , req: Request, res: Response, next: NextFunction) => {
  const status = error.status ?? 500;
  const message = error.message ?? "Something went wrong"
  res.status(status).json({ status , message })
}
)

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);
  process.exit(1);
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});