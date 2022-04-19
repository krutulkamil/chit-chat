import {Request, Response} from "express";
import pool from "../../db";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";

export const attemptRegister = async (req: Request, res: Response) => {
    const existingUser = await pool.query('SELECT username FROM users WHERE username=$1',
        [req.body.username]);

    if (existingUser.rowCount === 0) {
        // register
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newUserQuery = await pool.query(
            'INSERT INTO users (username, passhash, userid) VALUES($1, $2, $3) RETURNING id, username, userid',
            [req.body.username, hashedPass, uuidv4()]);

        req.session.user = {
            username: req.body.username,
            id: newUserQuery.rows[0].id,
            userid: newUserQuery.rows[0].userid
        };

        res.json({loggedIn: true, username: req.body.username});

    } else {
        res.json({loggedIn: false, status: "Username taken"});
    }
}