import type { Request, Response } from "express";
import BrainModel from "../models/brainModel";
import UserModel from "../models/userModel";
import generateRandomString from "../utils/generateRandomString";
import CardModel from "../models/cardModel";

export async function createBrainController(req: Request, res: Response) {
  const clerkId = req.clerkId;
  try {
    const user = await UserModel.findOne({ clerkId });
    if (!user) {
      res.status(404).json({
        msg: "User not found",
        success: false,
      });
      return;
    }
    const existingBrain = await BrainModel.findOne({ clerkId });
    if (existingBrain) {
      res.status(400).json({
        msg: "Brain already exists for this user",
        success: false,
        data: existingBrain.shortCode,
      });
      return;
    }
    const shortCode = generateRandomString(8);
    const newBrain = await BrainModel.create({ clerkId, shortCode });
    res.status(201).json({
      msg: "Brain created successfully",
      data: newBrain.shortCode,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error, Please try again later!",
      success: false,
    });
  }
}

export async function deleteBrainController(req: Request, res: Response) {
  const clerkId = req.clerkId;
  try {
    const user = await UserModel.findOne({ clerkId });
    if (!user) {
      res.status(404).json({
        msg: "User not found",
        success: false,
      });
      return;
    }
    const existingBrain = await BrainModel.findOne({ clerkId });
    if (!existingBrain) {
      res.status(404).json({
        msg: "Brain not found for this user",
        success: false,
      });
      return;
    }
    await BrainModel.deleteOne({ clerkId });
    res.status(200).json({
      msg: "Brain deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error, Please try again later!",
      success: false,
    });
  }
}

export async function getBrainController(req: Request, res: Response) {
  const clerkId = req.clerkId;
  try {
    const user = await UserModel.findOne({ clerkId });
    if (!user) {
      res.status(404).json({
        msg: "User not found",
        success: false,
      });
      return;
    }
    const existingBrain = await BrainModel.findOne({ clerkId });
    if (!existingBrain) {
      res.status(404).json({
        msg: "Brain not found for this user",
        success: false,
      });
      return;
    }
    res.status(200).json({
      msg: "Brain fetched successfully",
      data: existingBrain.shortCode,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error, Please try again later!",
      success: false,
    });
  }
}

export async function shareBrainController(req: Request, res: Response) {
  const { shortCode } = req.params;
  try {
    const brain = await BrainModel.findOne({ shortCode });
    if (!brain) {
      res.status(404).json({
        msg: "Brain not found",
        success: false,
      });
      return;
    }
    const cards = await CardModel.find({ clerkId: brain.clerkId });
    res.status(200).json({
      msg: "Brain fetched successfully",
      data: cards,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error, Please try again later!",
      success: false,
    });
  }
}