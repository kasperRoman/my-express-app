import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";



const router = Router();

router.get("/", userController.getList.bind(userController));

router.post("/",commonMiddleware.validateBody(UserValidator.create), userController.create.bind(userController));

router.get('/:userId',commonMiddleware.isIdValid("userId") , userController.getById.bind(userController))

router.put('/:userId',commonMiddleware.validateBody(UserValidator.update) , userController.update.bind(userController))

router.delete('/:userId',commonMiddleware.isIdValid("userId") , userController.delete.bind(userController))

export const userRouter = router;