import { Request, Response, NextFunction } from 'express';
import { generateToken } from '../utils/jsonwebtoken';
// import { isBuffer } from 'util';
import userService from '../services/user.service';
import bcrypt from 'bcrypt';
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
        const value = await userService.find(req.body.username as string);
        if (value === null) {
          res.status(404).json({
              status:"404",
              message:"Account not found"
          })
        }
        if (value !== null) {
          bcrypt.compare(req.body.password, value.password, (errors, result) => {
            if (errors) {
                res.status(404).json({
                    status:"422",
                    message:"Password wrong!"
                })
            }
            else if (result) {
              const { accessToken, refreshToken } = generateToken({
                username: value.username,
                password: value.password
              });
              return res.status(200).json({
                'message': 'Login successfully',
                'access-token': accessToken,
                'refresh-token': refreshToken
              })
            } else {
                res.status(404).json({
                    status:"422",
                    message:"Invalid password"
                })
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
