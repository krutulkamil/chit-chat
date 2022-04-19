import {Request, Response} from "express";
import pool from "../../db";
import bcrypt from "bcrypt";

export const attemptLogin = async (req: Request, res: Response) => {
    const potentialLogin = await pool.query(
        "SELECT id, username, passhash, userid FROM users u WHERE u.username=$1",
        [req.body.username]);

    if (potentialLogin.rowCount > 0) {
        const isSamePass = await bcrypt.compare(req.body.password, potentialLogin.rows[0].passhash);
        if (isSamePass) {
            req.session.user = {
                username: req.body.username,
                id: potentialLogin.rows[0].id,
                userid: potentialLogin.rows[0].userid
            }
            res.json({loggedIn: true, username: req.body.username});
        } else {
            res.json({loggedIn: false, status: "Wrong login or password!"});
        }
    } else {
        res.json({loggedIn: false, status: "Wrong login or password!"});
    }
}