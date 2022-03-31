import {Request, Response} from "express";
import pool from "../db";
import bcrypt from "bcrypt";

interface User {
    username: string;
    id: number;
}

declare module 'express-session' {
    interface SessionData {
        user: User;
    }
}

export const handleLogin = async (req: Request, res: Response) => {
    if (req.session.user && req.session.user.username) {
        res.json({ loggedIn: true, username: req.session.user.username });
    } else {
        res.json({ loggedIn: false});
    }
};

export const attemptLogin = async (req: Request, res: Response) => {
    const potentialLogin = await pool.query(
        "SELECT id, username, passhash FROM users u WHERE u.username=$1",
        [req.body.username]);

    if (potentialLogin.rowCount > 0) {
        const isSamePass = await bcrypt.compare(req.body.password, potentialLogin.rows[0].passhash);
        if (isSamePass) {
            req.session.user = {
                username: req.body.username,
                id: potentialLogin.rows[0].id
            }
            res.json({loggedIn: true, username: req.body.username});
        } else {
            res.json({loggedIn: false, status: "Wrong login or password!"});
        }
    } else {
        res.json({loggedIn: false, status: "Wrong login or password!"});
    }
}

export const attemptRegister = async (req: Request, res: Response) => {
    const existingUser = await pool.query('SELECT username FROM users WHERE username=$1',
        [req.body.username]);

    if (existingUser.rowCount === 0) {
        // register
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newUserQuery = await pool.query(
            'INSERT INTO users (username, passhash) VALUES($1, $2) RETURNING id, username',
            [req.body.username, hashedPass]);

        req.session.user = {
            username: req.body.username,
            id: newUserQuery.rows[0].id
        };

        res.json({loggedIn: true, username: req.body.username});
    } else {
        res.json({loggedIn: false, status: "Username taken"});
    }
}