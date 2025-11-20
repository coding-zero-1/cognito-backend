import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(401).json({ 
                success: false,
                error: "Unauthorized" 
            });
            return;
        }
        // Verify the JWT token
        const decoded = jwt.decode(token as string) as { clerkId: string };
        (req as any).clerkId = decoded?.clerkId;
        next();
    } catch (error:any) {
        console.error("Authentication error:", error);
        res.status(401).json({ 
            success:false,
            error: "Unauthorized" 
        });
    }
}

export default authMiddleware;