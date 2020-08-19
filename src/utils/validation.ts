import { Request, Response, NextFunction } from 'express';

import Joi = require('joi');


const createSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    confirm: Joi.any().valid(Joi.ref('password')).required(),
});
const editSchema = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
})
const accountSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
});
const editPassword = Joi.object().keys({
    oldPassword: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
});
export default class Validation {
    static user(req: Request, res: Response, next: NextFunction) {
        res.clearCookie('checkFail');
        const checkBody = {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            confirm: req.body.confirm,
        }
        Joi.validate(checkBody, createSchema, (errors) => {
            if (errors) {
                res.cookie('checkFail', true);
                res.redirect('/auth/signup');
            } else {
                next();
            }
        });
    }

    static edit(req: Request, res: Response, next: NextFunction) {
        Joi.validate(req.body, editSchema, (errors) => {
            if (errors) {
                res.status(422).json({
                    status: "Input invalid"
                })
            } else {
                next();
            }
        })
    }
    static account(req: Request, res: Response, next: NextFunction) {
        Joi.validate(req.body, accountSchema, (errors) => {
            if (errors) {
                res.status(422).json({
                    status: 'error',
                    message: 'invalid request data',
                });
            } else {
                next();
            }
        });
    }

    static editPassword(req: Request, res: Response, next: NextFunction) {
        Joi.validate(req.body, editPassword, (errors) => {
            if (errors) {
                res.status(422).json({
                    status: 'error',
                    message: 'invalid request data',
                });
            } else {
                next();
            }
        });
    }
}
