import {Request, Response, NextFunction} from "express";
import redisClient from "../redis";

export const rateLimiter = (secondsLimit: number, limitAmount: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip;
        const response = await redisClient
            .multi()
            .incr(ip)
            .expire(ip, secondsLimit)
            .exec();

        if (Number(response![0][1]) > limitAmount) {
            res.json({loggedIn: false, status: "Woah! Slow down! Try again in a minute"})
        } else {
            next();
        }
    }
}