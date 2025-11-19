import type { Request, Response } from "express";
import { Webhook } from "svix";
import UserModel from "../models/userModel";

export async function clerkWebhookHandler(req: Request, res: Response) {
  try {
    if (!process.env.CLERK_WEBHOOK_SECRET) {
      return res
        .status(500)
        .json({ msg: "Internal server error, please try again later" });
    }
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await webhook.verify(req.body, req.headers as Record<string, string>);
    const { type, data } = req.body;
    switch (type) {
      case "user.created":
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          photo: data.profile_image_url,
        };
        await UserModel.create(userData);
        res.status(201).json({
          success: true,
          message: "User created successfully",
        });
        break;
      case "user.deleted":
        await UserModel.findOneAndDelete({ clerkId: data.id });
        res.status(200).json({
          success: true,
          message: "User deleted successfully",
        });
        break;
      default:
        console.log("Unhandled event type:", type);
    }
  } catch (error) {
    console.error("Error handling Clerk webhook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}