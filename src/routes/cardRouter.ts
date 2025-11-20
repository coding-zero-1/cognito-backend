// All the card related routes are defined in this file
import { Router, type Request, type Response } from "express";

const cardRouter = Router();

cardRouter.get("/all-cards", (req: Request, res: Response) => {
  res.send("Get all cards");
});

cardRouter.post("/create-card", (req: Request, res: Response) => {
  res.send("Create a new card");
});
cardRouter.put("/update-card/:id", (req: Request, res: Response) => {
  res.send(`Update card with id ${req.params.id}`);
});
cardRouter.delete("/delete-card/:id", (req: Request, res: Response) => {
  res.send(`Delete card with id ${req.params.id}`);
});

export default cardRouter;
