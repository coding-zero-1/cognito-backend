import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { createBrainController, deleteBrainController, getBrainController, shareBrainController } from "../controllers/brainControllers";

const brainRouter = Router();

brainRouter.post("/create-brain",authMiddleware, createBrainController);
brainRouter.delete("/delete-brain",authMiddleware, deleteBrainController);
brainRouter.get("/get-brain",authMiddleware, getBrainController);
brainRouter.get("/share/:shortCode", shareBrainController);

export default brainRouter;