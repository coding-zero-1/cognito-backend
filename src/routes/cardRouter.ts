// All the card related routes are defined in this file
import { Router, type Request, type Response } from "express";
import upload from "../config/multerConfig";
import { getCardController, createCardController, deleteCardController, updateCardController } from "../controllers/cardController";

const cardRouter = Router();

cardRouter.get("/all-cards", getCardController);
cardRouter.post("/create-card",upload.single("image"), createCardController);
cardRouter.put("/update-card/:id", updateCardController);
cardRouter.delete("/delete-card/:id", deleteCardController);

export default cardRouter;
