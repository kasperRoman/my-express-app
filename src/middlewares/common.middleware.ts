import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/api-error';
import { isObjectIdOrHexString } from "mongoose"
import { ObjectSchema } from 'joi';

class CommonMiddleware {
    public isIdValid(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id: string = req.params[key];
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(`Invalid id [${key}]`, 400)
                }
                next();
            } catch (e) {
                next(e);
            }

        }
    }
    public validateBody(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body, { abortEarly: false });  //{ abortEarly: false } → збирає всі помилки, а не тільки першу
                next();
            } catch (e) {
                next(e);
            }
        };
    }


}

export const commonMiddleware = new CommonMiddleware();