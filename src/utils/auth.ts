import { Request, Response, NextFunction } from 'express';
// import { isBuffer } from 'util';
import userService from '../services/user.service';
import bcrypt = require('bcrypt');
export default class Auth {
    public static async hashPassword(password: string): Promise<string> {
        return new Promise((resolve) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) { throw err; }
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) { throw err; }
                    resolve(hash);
                });
            });
            //   bcrypt.hash(password, 10, (error, hash) => {
            //     if (error) {
            //       throw error;
            //     }
            //     resolve(hash);
            //   });
        });
    }


    public static async account(req: Request, res: Response, next: NextFunction) {
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

    public static async User(req: Request, res: Response, next: NextFunction) {
        const value = await userService.find(req.body.username);
        if (value === null) {
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
