import type { Request, Response } from "express";
import CardModel from "../models/cardModel";
import UserModel from "../models/userModel";
import uploadToCloudinary from "../utils/uploadToCloudinary";

export async function getCardController(req: Request, res: Response) {
  const clerkId = req.clerkId;
  const user = await UserModel.findOne({ clerkId });
  if (!user) {
    return res.status(404).json({
      msg: "User not found",
      success: false,
    });
  }
  const userCards = await CardModel.find({ clerkId });
  if (userCards.length === 0) {
    return res.status(404).json({
      msg: "No cards found for this user",
      success: false,
    });
  }
  return res.status(200).json({
    msg: "Cards fetched successfully",
    data: userCards,
    success: true,
  });
}

export async function createCardController(req: Request, res: Response) {
  const clerkId = req.clerkId;
  const user = await UserModel.findOne({ clerkId });
  if (!user) {
    res.status(404).json({
      msg: "User not found",
      success: false,
    });
    return;
  }
  const { title, description, link, type } = req.body;
  if (!title) {
    res.status(400).json({
      msg: "Title is required",
      success: false,
    });
    return;
  }
  if (!req.file && !link && description) {
    const newCard = await CardModel.create({
      clerkId,
      title,
      description,
      type:"text"
    });
    res.status(201).json({
      msg: "Card created successfully",
      data: newCard,
      success: true,
    });
    return;
  } else if (link && !req.file) {
    const newCard = await CardModel.create({
      clerkId,
      title,
      description,
      link,
      type
    });
    res.status(201).json({
      msg: "Card created successfully",
      data: newCard,
      success: true,
    });
    return;
  } else if (req.file && !link) {
    const imageBuffer = req.file.buffer;
    // Upload to cloudinary
    try {
      const uploadResult = await uploadToCloudinary(imageBuffer, "cards");
      const newCard = await CardModel.create({
        clerkId,
        title,
        description,
        imageUrl: uploadResult.secure_url,
        cloudinaryId: uploadResult.public_id,
        type:"image"
      });
      res.status(201).json({
        msg: "Card created successfully with image",
        data: newCard,
        success: true,
      });
      return;
    } catch (error) {
      res.status(500).json({
        msg: "Failed to upload image",
        success: false,
      });
      return;
    }
  } else {
    res.status(400).json({
      msg: "Either image or link or text is required to create a card",
      success: false,
    });
    return;
  }
}

export async function updateCardController(req: Request, res: Response) {
  const clerkId = req.clerkId;
  const user = await UserModel.findOne({ clerkId });
  if (!user) {
    return res.status(404).json({
      msg: "User not found",
      success: false,
    });
  }
  const { id } = req.params;
  const { title, description, link } = req.body;
  const card = await CardModel.findById(id);
  if (!card) {
    return res.status(404).json({
      msg: "Card not found",
      success: false,
    });
  }
  if (card.clerkId !== clerkId) {
    return res.status(403).json({
      msg: "Unauthorized to update this card",
      success: false,
    });
  }
  await CardModel.findByIdAndUpdate(id, {
    title: title || card.title,
    description: description || card.description,
    link: link || card.link,
  });
  return res.status(200).json({
    msg: "Card updated successfully",
    success: true,
  });
}

export async function deleteCardController(req: Request, res: Response) {
  const clerkId = req.clerkId;
  const user = await UserModel.findOne({ clerkId });
  if (!user) {
    return res.status(404).json({
      msg: "User not found",
      success: false,
    });
  }
  const { id } = req.params;
  const card = await CardModel.findById(id);
  if (!card) {
    return res.status(404).json({
      msg: "Card not found",
      success: false,
    });
  }
  if (card.clerkId !== clerkId) {
    return res.status(403).json({
      msg: "Unauthorized to delete this card",
      success: false,
    });
  }
  await CardModel.findByIdAndDelete(id);
  return res.status(200).json({
    msg: "Card deleted successfully",
    success: true,
  });
}
