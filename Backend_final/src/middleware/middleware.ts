import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined");
}

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        res.status(403).json({
            msg: "Invalid token!",
        });
        return;
    }
    token = token.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "") as jwt.JwtPayload;

        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            res.status(403).json({
                msg: "Incorrect UserId",
            });
        }
    } catch (err) {
        res.status(403).json({
            msg: "Invalid token",
        });
    }
};


export {AuthenticatedRequest}