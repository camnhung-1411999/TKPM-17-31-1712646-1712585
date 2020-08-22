import { Request, Response, NextFunction } from 'express';
import { generateToken } from '../utils/jsonwebtoken';
// import { isBuffer } from 'util';
import userService from '../services/user.service';
import bcrypt from 'bcrypt';
export default class Auth {
    public static async hashPassword(password: string): Promise<string> {
        return new Promise((resolve) => {
            bcrypt.hash(password, 10, (error, hash) => {
                if (error) {
                    throw error;
                }
                resolve(hash);
            });
        });
    }


    public static async password(req: Request, res: Response, next: NextFunction) {
        const value = await userService.find(req.body.username);
        if (value === null) {
            res.status(422).json({
                status: "404",
                error: "Account not found"
            })
        }
        if (value !== null) {
            bcrypt.compare(req.body.password, value.password, (errors, result) => {
                if (errors) {
                    res.status(422).json({
                        status: "422",
                        error: "Invalid password"
                    })
                }
                if (result) {
                    next();
                } else {
                    res.status(422).json({
                        status: 'error',
                        message: 'Invalid password',
                    });
                }
            });
        }
    }

    public static async account(req: Request, res: Response, next: NextFunction) {
        res.clearCookie("checkFail");
        const value = await userService.find(req.body.user as string);
        if (value === null) {
            res.cookie('checkFail', true);
            res.redirect('/auth/login');
        }
        if (value !== null) {
            bcrypt.compare(req.body.password, value.password, (errors, result) => {
                if (errors) {
                    throw errors;
                }
                else {
                    if (result) {
                        const { accessToken, refreshToken } = generateToken({
                            username: value.username,
                            password: value.password
                        });
                        res.cookie('token', accessToken);
                        if (req.body.user === "admin") {
                            res.redirect('/admin');
                        }
                        else {
                            res.redirect('/home');
                        }
                    }

                    else {
                        res.cookie('checkFail', true);
                        res.redirect('/auth/login');
                    }
                }
            });
        }

    }
    public static async User(req: Request, res: Response, next: NextFunction) {
        const value = await userService.find(req.body.username);
        if (value === null) {
            const { accessToken, refreshToken } = generateToken({
                username: req.body.username,
                password: req.body.password
            });
            res.cookie('token', accessToken);
            // res.redirect('/home');
            next();
        } else {
            // signup user existed
            res.status(422).json({
                status: "422",
                error: "Exist value username"
            })
        }
    }
}
