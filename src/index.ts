import express, { NextFunction } from 'express'
import dotenv from 'dotenv'

import { Request, Response } from 'express';
import { ApiError } from './errors/api-error';
import { userRouter } from './routers/user.router';


dotenv.config()
const app = express();

app.use(express.json())


// app.get('/', (req: Request, res: Response) => {
//   res.send('Привіт, Express!');
// });
app.use("/users",userRouter)


// app.get('/users', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const users = await read();
//     res.json(users);
//   } catch (e) {
//     next(e)
//   }
// });


// app.post('/users', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     if (!req.body.name || req.body.name.length < 3) {
//       throw new ApiError(" Name is required and should be minimum 3 symbols", 400);
//     }
//     if (!req.body.phone) {
//       throw new ApiError("Phone number is required", 400);
//     }
//     if (req.body.phone.length < 10) {
//       throw new ApiError("Phone number must be at least 10 digits", 400);
//     }
//     if (!/^(\+?38)?0\d{9}$/.test(req.body.phone)) {
//       throw new ApiError("Phone number must be a valid Ukrainian format", 400);
//     }
//     if (!req.body.password || req.body.password.length < 8) {
//       throw new ApiError("Password is required and should be minimum 8 sumbols", 400)
//     }
//     const users = await read();
//     const newUser = {
//       id: users.length ? users[users.length - 1].id + 1 : 1,
//       name: req.body.name,
//       phone: req.body.phone,
//       password: req.body.password
//     };
//     users.push(newUser);
//     await write(users)
//     res.status(201).json(newUser);
//   } catch (e) {
//     next(e)
//   }
// });


// app.get('/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = await read();
//     const user = users.find(u => u.id === parseInt(req.params.userId));

//     if (user) {
//       res.json(user);
//     } else {
//      throw new ApiError("User not found",404)
//     }
//   } catch (e) {
//     next(e)
//   }
// });


// app.delete('/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = await read();
//     const index = users.findIndex(u => u.id === parseInt(req.params.userId));
//     if (index === -1) {
//       throw new ApiError("User not found", 404)
//     }
//     const deletedUser = users.splice(index, 1)[0];
//     await write(users)
//     res.json({ message: 'Користувача видалено', user: deletedUser });

//   } catch (e) {
//     next(e)
//   }
// });

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