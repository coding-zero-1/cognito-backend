// All the user related routes are defined in this file
import { Router } from "express";
import { clerkWebhookHandler } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/webhooks", clerkWebhookHandler);

export default userRouter;