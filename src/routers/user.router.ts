import { Router } from "express";
import { userController } from "../controllers/user.controler";

const router =Router();

router.get("/",userController.getList.bind(userController));
router.post("/",userController.create.bind(userController));

export const  userRouter =router;