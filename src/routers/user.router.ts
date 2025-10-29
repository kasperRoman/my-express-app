import { Router } from "express";
import { userController } from "../controllers/user.controler";

const router = Router();

router.get("/", userController.getList.bind(userController));
router.post("/", userController.create.bind(userController));
router.get('/:userId', userController.getById.bind(userController))
router.delete('/:userId', userController.delete.bind(userController))
router.put('/:userId', userController.update.bind(userController))

export const userRouter = router;