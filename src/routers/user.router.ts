import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";



const router = Router();

router.get("/", userController.getList.bind(userController));

router.post("/",commonMiddleware.validateUserData , userController.create.bind(userController));

router.get('/:userId',commonMiddleware.isIdValid("userId") , userController.getById.bind(userController))

router.put('/:userId',commonMiddleware.validateUserData , userController.update.bind(userController))

router.delete('/:userId', userController.delete.bind(userController))

export const userRouter = router;